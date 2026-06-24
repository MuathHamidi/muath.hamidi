"""
=============================================================================
  CeIn3 DFT+μ MASTER PIPELINE — The Branching Orchestrator
  Run with:  python run_pipeline.py [--parallel]
=============================================================================
This script executes the individual standalone files exactly as they appear in 
the educational app, dynamically passing PKs and coordinates between them.
It branches after Phase 2 to run all muon site configurations in parallel
or sequentially, maintaining isolated branch subdirectories for logs and exports.
"""
import os, time, sys, json, subprocess, re

# Strictly isolate data directories to avoid AiiDA internal conflicts
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
LOGS_DIR = os.path.join(BASE_DIR, '..', 'logs')
EXPORTS_DIR = os.path.join(BASE_DIR, '..', 'exports')
CK_FILE = os.path.join(BASE_DIR, 'checkpoint.json')
CK_SHARED_FILE = os.path.join(BASE_DIR, 'checkpoint_shared.json')

os.makedirs(LOGS_DIR, exist_ok=True)
os.makedirs(EXPORTS_DIR, exist_ok=True)

class MasterLogger(object):
    def __init__(self, filename):
        self.terminal = sys.stdout
        self.log = open(filename, "a", encoding="utf-8")

    def write(self, message):
        self.terminal.write(message)
        self.log.write(message)
        self.log.flush()

    def flush(self):
        self.terminal.flush()
        self.log.flush()

sys.stdout = MasterLogger(os.path.join(LOGS_DIR, "pipeline_master.log"))
sys.stderr = sys.stdout  # Capture any errant stderr output as well

def get_log_dir(branch_id=None):
    if branch_id:
        path = os.path.join(LOGS_DIR, branch_id)
    else:
        path = os.path.join(LOGS_DIR, 'shared')
    os.makedirs(path, exist_ok=True)
    return path

def get_export_dir(branch_id=None):
    if branch_id:
        path = os.path.join(EXPORTS_DIR, branch_id)
    else:
        path = os.path.join(EXPORTS_DIR, 'shared')
    os.makedirs(path, exist_ok=True)
    return path

def log_output(step_name, text, branch_id=None, is_error=False):
    filename = f"{step_name}_ERROR.log" if is_error else f"{step_name}.log"
    path = os.path.join(get_log_dir(branch_id), filename)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    return path

def run_subprocess_safe(cmd_list, step_name, branch_id=None):
    """Executes a command, providing perfect error reporting if it crashes."""
    try:
        # Run process, capturing stdout and stderr
        result = subprocess.run(cmd_list, capture_output=True, text=True, cwd=BASE_DIR)
        
        # If the script itself crashed (e.g., Python syntax error, DB offline)
        if result.returncode != 0:
            error_report = f"COMMAND: {' '.join(cmd_list)}\n\n--- STDOUT ---\n{result.stdout}\n\n--- STDERR ---\n{result.stderr}"
            log_path = log_output(step_name, error_report, branch_id=branch_id, is_error=True)
            print(f"\n[FATAL ERROR] {step_name} script crashed for branch {branch_id if branch_id else 'shared'}!")
            print(f"Details securely logged to: {log_path}")
            sys.exit(1)
            
        # Success! Log stdout safely
        log_output(step_name, result.stdout, branch_id=branch_id)
        return result.stdout
        
    except Exception as e:
        print(f"\n[FATAL ERROR] Failed to execute {step_name}: {str(e)}")
        sys.exit(1)

def wait_for_pks(pks_dict, step_name, allowed_codes=[0, 322]):
    """Polls AiiDA for multiple PKs in parallel. Handles failures, OOM, walltime."""
    if not pks_dict:
        return
    
    print(f"[{step_name}] Waiting for supercomputer jobs (PKs: {list(pks_dict.values())}) to finish...")
    for branch_id, pk in pks_dict.items():
        subprocess.run(['verdi', 'group', 'add-nodes', '-g', 'muon_hyperfine', str(pk)], capture_output=True)

    start_time = time.time()
    active_branches = list(pks_dict.keys())
    
    while active_branches:
        still_active = []
        for branch_id in active_branches:
            pk = pks_dict[branch_id]
            output = subprocess.run(['verdi', 'process', 'show', str(pk)], capture_output=True, text=True).stdout
            
            # Determine the current state from verdi process show
            current_state = "UNKNOWN"
            jobstate_match = re.search(r"(?i)jobstate\s+([a-zA-Z]+)", output)
            if jobstate_match:
                current_state = jobstate_match.group(1).upper()
            else:
                state_match = re.search(r"(?i)state\s+([a-zA-Z]+)", output)
                if state_match:
                    current_state = state_match.group(1).upper()
                
            elapsed = int(time.time() - start_time)
            mins, secs = divmod(elapsed, 60)
            hours, mins = divmod(mins, 60)
            elapsed_str = f"{hours:02d}:{mins:02d}:{secs:02d}"
            
            # Print progress update
            print(f"  [{time.strftime('%H:%M:%S')}] Branch: {branch_id} | PK {pk} State: {current_state} | Elapsed: {elapsed_str}")

            # Try to extract real-time progress from the remote output file
            try:
                from aiida.orm import load_node
                node = load_node(pk)
                if 'remote_folder' in node.outputs:
                    remote_folder = node.outputs.remote_folder
                    remote_path = remote_folder.get_remote_path()
                    computer = remote_folder.computer
                    with computer.get_transport() as transport:
                        import os
                        # Read the last few kilobytes of aiida.out
                        output_file = os.path.join(remote_path, 'aiida.out')
                        if transport.isfile(output_file):
                            size = transport.getsize(output_file)
                            offset = max(0, size - 20000)
                            with transport.open(output_file, 'r') as f:
                                f.seek(offset)
                                tail_content = f.read()
                            
                            # Parse information from the tail
                            iter_match = re.findall(r"(?i)iteration\s*#\s*(\d+)", tail_content)
                            energy_match = re.findall(r"(?i)total energy\s*=\s*([\-\d\.]+)\s*Ry", tail_content)
                            accuracy_match = re.findall(r"(?i)estimated scf accuracy\s*<\s*([\d\.E\-]+)\s*Ry", tail_content)
                            
                            progress_info = []
                            if iter_match:
                                progress_info.append(f"Iteration: {iter_match[-1]}")
                            if energy_match:
                                progress_info.append(f"Energy: {energy_match[-1]} Ry")
                            if accuracy_match:
                                progress_info.append(f"Accuracy: {accuracy_match[-1]} Ry")
                                
                            if progress_info:
                                print(f"     [{branch_id} HPC Progress] {' | '.join(progress_info)}")
                                
                            eig_warn = re.findall(r"(\d+)\s+eigenvalues not converged", tail_content)
                            if eig_warn:
                                print(f"     [{branch_id} HPC Warning] {eig_warn[-1]} eigenvalues not converged.")
            except Exception as e:
                # Silently pass if AiiDA DB is busy or transport connection is not open yet
                pass

            if "Finished" in output:
                match = re.search(r"Finished\s*\[(\d+)\]", output)
                exit_code = int(match.group(1)) if match else 0
                if exit_code in allowed_codes:
                    print(f"[{step_name}] Branch {branch_id} Completed Successfully on Supercomputer!")
                else:
                    report = subprocess.run(['verdi', 'process', 'report', str(pk)], capture_output=True, text=True).stdout
                    stdout_tail = subprocess.run(['verdi', 'calcjob', 'outputcat', str(pk)], capture_output=True, text=True).stdout
                    if stdout_tail:
                        lines = stdout_tail.split('\n')
                        stdout_tail_summary = '\n'.join(lines[-100:])
                        report += f"\n\n*** RAW STDOUT TAIL (Last 100 lines) ***\n{stdout_tail_summary}"
                    
                    log_path = log_output(f"{step_name}_SUPERCOMPUTER", report, branch_id=branch_id, is_error=True)
                    print(f"\n[SUPERCOMPUTER ERROR] {step_name} failed or crashed for branch {branch_id}!")
                    print(f"AiiDA Error Report saved to: {log_path}")
                    sys.exit(1)
                
            elif "Excepted" in output or "Failed" in output:
                report = subprocess.run(['verdi', 'process', 'report', str(pk)], capture_output=True, text=True).stdout
                stdout_tail = subprocess.run(['verdi', 'calcjob', 'outputcat', str(pk)], capture_output=True, text=True).stdout
                if stdout_tail:
                    lines = stdout_tail.split('\n')
                    stdout_tail_summary = '\n'.join(lines[-100:])
                    report += f"\n\n*** RAW STDOUT TAIL (Last 100 lines) ***\n{stdout_tail_summary}"
                    
                log_path = log_output(f"{step_name}_SUPERCOMPUTER", report, branch_id=branch_id, is_error=True)
                print(f"\n[SUPERCOMPUTER ERROR] {step_name} was killed or excepted for branch {branch_id}!")
                print(f"AiiDA Error Report saved to: {log_path}")
                sys.exit(1)
            else:
                still_active.append(branch_id)
                
        active_branches = still_active
        if active_branches:
            time.sleep(60)

def extract_pk(output_text):
    match = re.search(r"PK:\s*(\d+)", output_text)
    if match:
        return int(match.group(1))
    raise ValueError(f"Could not find PK in output: {output_text}")

def load_shared_ck():
    if os.path.exists(CK_SHARED_FILE):
        with open(CK_SHARED_FILE, 'r') as f:
            return json.load(f)
    # Heuristically check if old checkpoint.json can seed the shared checkpoint
    if os.path.exists(CK_FILE):
        try:
            with open(CK_FILE, 'r') as f:
                old = json.load(f)
            shared = {}
            if 'step1_pk' in old:
                shared['step1_pk'] = old['step1_pk']
            if 'void_coords' in old:
                shared['void_coords'] = old['void_coords']
            if shared:
                with open(CK_SHARED_FILE, 'w') as f:
                    json.dump(shared, f, indent=4)
                return shared
        except Exception:
            pass
    return {}

def save_shared_ck(ck):
    with open(CK_SHARED_FILE, 'w') as f:
        json.dump(ck, f, indent=4)

def load_branch_ck(branch_id):
    branch_ck_file = os.path.join(BASE_DIR, f'checkpoint_{branch_id}.json')
    if os.path.exists(branch_ck_file):
        with open(branch_ck_file, 'r') as f:
            return json.load(f)
    # For the edge_jitter1 (original) branch, seed from old checkpoint.json if possible
    if branch_id == 'edge_jitter1' and os.path.exists(CK_FILE):
        try:
            with open(CK_FILE, 'r') as f:
                old = json.load(f)
            branch_ck = {}
            for k in ['step3_pk', 'relaxed', 'distortion_checked', 'step5_pk', 'step6_pk', 'cube_extracted', 'fields_calculated']:
                if k in old:
                    branch_ck[k] = old[k]
            if branch_ck:
                with open(branch_ck_file, 'w') as f:
                    json.dump(branch_ck, f, indent=4)
                return branch_ck
        except Exception:
            pass
    return {}

def save_branch_ck(branch_id, ck):
    branch_ck_file = os.path.join(BASE_DIR, f'checkpoint_{branch_id}.json')
    with open(branch_ck_file, 'w') as f:
        json.dump(ck, f, indent=4)

def start_daemon():
    import shutil
    if shutil.which("verdi") is None:
        print("\n[FATAL ERROR] The 'verdi' command was not found in your system PATH!")
        print("Please ensure you have activated your AiiDA environment (e.g., `conda activate aiida`)")
        print("or that you are running this directly on the supercomputer node/container.\n")
        sys.exit(1)
        
    print("[SYSTEM] Checking AiiDA daemon...")
    output = subprocess.run(['verdi', 'daemon', 'status'], capture_output=True, text=True).stdout
    if "is running" not in output:
        print("[SYSTEM] Starting AiiDA daemon...")
        subprocess.run(['verdi', 'daemon', 'start'], check=True)

def main():
    print("=========================================================")
    print("  CeIn3 muSR Branching Pipeline (Scientific Logging Mode)")
    print("=========================================================")
    start_daemon()
    
    # Parse options
    is_parallel = '--parallel' in sys.argv
    print(f"[CONFIG] Parallel execution: {is_parallel}")
    
    # Load branches configurations
    branches_path = os.path.join(BASE_DIR, 'branches.json')
    if not os.path.exists(branches_path):
        print(f"[FATAL ERROR] branches.json not found at {branches_path}")
        sys.exit(1)
    with open(branches_path, 'r') as f:
        branches_data = json.load(f)
    branches = branches_data['branches']
    
    shared_ck = load_shared_ck()

    # PHASE 1 & 2: Shared Steps
    # STEP 1
    if 'step1_pk' not in shared_ck:
        print("\n--- PHASE 1: Pristine Lattice & Electrostatic Void Scanning ---")
        res = run_subprocess_safe(['verdi', 'run', 'phase1_pristine_scf.py'], 'step1_pristine', branch_id=None)
        print(res.strip())
        pk = extract_pk(res)
        wait_for_pks({'shared': pk}, 'Phase 1: Pristine SCF')
        shared_ck['step1_pk'] = pk
        save_shared_ck(shared_ck)

    # STEP 2
    if 'void_coords' not in shared_ck:
        print("\n--- PHASE 2: Geometric Void Extraction ---")
        res1 = run_subprocess_safe(['verdi', 'run', 'phase2a_extract_cube.py', str(shared_ck['step1_pk'])], 'extract_cube', branch_id=None)
        res2 = run_subprocess_safe(['verdi', 'run', 'phase2b_void_topography.py'], 'step2_void', branch_id=None)
        print(res2.strip())
        
        match = re.search(r"x=([0-9.]+),\s*y=([0-9.]+),\s*z=([0-9.]+)", res2)
        if match:
            shared_ck['void_coords'] = [match.group(1), match.group(2), match.group(3)]
            save_shared_ck(shared_ck)
        else:
            print("[FATAL ERROR] Failed to safely parse void coordinates!")
            sys.exit(1)

    print(f"\n[SHARED STATE] Pristine PK: {shared_ck['step1_pk']}, Void Coords: {shared_ck['void_coords']}")

    # PHASE 3: Muon Relaxation (Branching)
    pks_to_wait = {}
    for b in branches:
        bid = b['id']
        b_ck = load_branch_ck(bid)
        if 'step3_pk' not in b_ck:
            print(f"\n--- BRANCH [{bid}]: PHASE 3: Submitting Muon Implantation & Supercell Relaxation ---")
            site_frac = b.get('site_frac', shared_ck['void_coords'])
            coords = [str(x) for x in site_frac]
            jitter = [str(x) for x in b.get('jitter_ang', [0.0, 0.0, 0.0])]
            export_dir = get_export_dir(bid)
            
            res = run_subprocess_safe([
                'verdi', 'run', 'phase3_muon_relaxation.py',
                coords[0], coords[1], coords[2],
                jitter[0], jitter[1], jitter[2],
                export_dir
            ], 'step3_relax_submit', branch_id=bid)
            print(res.strip())
            pk = extract_pk(res)
            b_ck['step3_pk'] = pk
            save_branch_ck(bid, b_ck)
            pks_to_wait[bid] = pk
            
            if not is_parallel:
                wait_for_pks({bid: pk}, f'Phase 3: Muon Relaxation ({bid})')
                pks_to_wait.pop(bid, None)
                
    if is_parallel and pks_to_wait:
        wait_for_pks(pks_to_wait, 'Phase 3: Parallel Muon Relaxation')

    # PHASE 4: Extract Geometry & Distortion (Runs locally, fast)
    for b in branches:
        bid = b['id']
        b_ck = load_branch_ck(bid)
        export_dir = get_export_dir(bid)
        
        cif_relaxed = os.path.join(export_dir, 'cein3_relaxed_muon.cif')
        cif_pre = os.path.join(export_dir, 'cein3_pre_relax.cif')
        if 'relaxed' not in b_ck or not os.path.exists(cif_relaxed) or not os.path.exists(cif_pre):
            print(f"\n--- BRANCH [{bid}]: PHASE 4: Extract Relaxed Geometry ---")
            res = run_subprocess_safe([
                'verdi', 'run', 'phase4_extract_geometry.py',
                str(b_ck['step3_pk']),
                export_dir
            ], 'step4_geometry', branch_id=bid)
            print(res.strip())
            b_ck['relaxed'] = True
            save_branch_ck(bid, b_ck)
            
        distortion_log = os.path.join(get_log_dir(bid), 'step4b_distortion.log')
        if 'distortion_checked' not in b_ck or not os.path.exists(distortion_log):
            print(f"\n--- BRANCH [{bid}]: PHASE 4b: Crystal Lattice Distortion Analysis ---")
            res = run_subprocess_safe([
                'verdi', 'run', 'phase4b_analyze_distortion.py',
                str(b_ck['step3_pk']),
                export_dir
            ], 'step4b_distortion', branch_id=bid)
            print(res.strip())
            b_ck['distortion_checked'] = True
            save_branch_ck(bid, b_ck)

    # PHASE 5: AFM SCF (Branching)
    pks_to_wait = {}
    for b in branches:
        bid = b['id']
        b_ck = load_branch_ck(bid)
        if 'step5_pk' not in b_ck:
            print(f"\n--- BRANCH [{bid}]: PHASE 5: Submitting AFM SCF ---")
            res = run_subprocess_safe([
                'verdi', 'run', 'phase5_afm_scf.py',
                str(b_ck['step3_pk'])
            ], 'step5_afm_submit', branch_id=bid)
            print(res.strip())
            pk = extract_pk(res)
            b_ck['step5_pk'] = pk
            save_branch_ck(bid, b_ck)
            pks_to_wait[bid] = pk
            
            if not is_parallel:
                wait_for_pks({bid: pk}, f'Phase 5: AFM SCF ({bid})', allowed_codes=[0, 300, 310, 312, 322])
                pks_to_wait.pop(bid, None)
                
    if is_parallel and pks_to_wait:
        wait_for_pks(pks_to_wait, 'Phase 5: Parallel AFM SCF', allowed_codes=[0, 300, 310, 312, 322])

    # PHASE 6: Spin Density Extraction (Branching)
    pks_to_wait = {}
    for b in branches:
        bid = b['id']
        b_ck = load_branch_ck(bid)
        if 'step6_pk' not in b_ck:
            print(f"\n--- BRANCH [{bid}]: PHASE 6: Submitting Spin Density Extraction ---")
            res = run_subprocess_safe([
                'verdi', 'run', 'phase6_spin_extraction.py',
                str(b_ck['step5_pk'])
            ], 'step6_ppx_submit', branch_id=bid)
            print(res.strip())
            pk = extract_pk(res)
            b_ck['step6_pk'] = pk
            save_branch_ck(bid, b_ck)
            pks_to_wait[bid] = pk
            
            if not is_parallel:
                wait_for_pks({bid: pk}, f'Phase 6: Spin PP.x ({bid})')
                pks_to_wait.pop(bid, None)
                
    if is_parallel and pks_to_wait:
        wait_for_pks(pks_to_wait, 'Phase 6: Parallel Spin PP.x')

    # PHASE 7-10: Spin map download, contact field, dipolar field, compiler (Runs locally/fast)
    for b in branches:
        bid = b['id']
        b_ck = load_branch_ck(bid)
        export_dir = get_export_dir(bid)
        log_dir = get_log_dir(bid)
        
        if 'cube_extracted' not in b_ck:
            print(f"\n--- BRANCH [{bid}]: PHASE 7: High-Resolution Spin Map Download ---")
            res = run_subprocess_safe([
                'verdi', 'run', 'phase7_download_spin_map.py',
                str(b_ck['step6_pk']),
                export_dir
            ], 'step7_cube_dl', branch_id=bid)
            print(res.strip())
            b_ck['cube_extracted'] = True
            save_branch_ck(bid, b_ck)
            
        if 'fields_calculated' not in b_ck:
            print(f"\n--- BRANCH [{bid}]: PHASE 8 & 9: Local Hyperfine Fields & Dipolar Coupling ---")
            res8 = run_subprocess_safe([
                'verdi', 'run', 'phase8_contact_field.py',
                export_dir
            ], 'step8_bc', branch_id=bid)
            res9 = run_subprocess_safe([
                'verdi', 'run', 'phase9_dipolar_field.py',
                export_dir
            ], 'step9_bdip', branch_id=bid)
            print(res8.strip())
            print("-" * 30)
            print(res9.strip())
            b_ck['fields_calculated'] = True
            save_branch_ck(bid, b_ck)
            
        print(f"\n--- BRANCH [{bid}]: PHASE 10: Scientific Report Compilation ---")
        res10 = run_subprocess_safe([
            'verdi', 'run', 'phase10_compile_report.py',
            log_dir,
            export_dir
        ], 'step10_compiler', branch_id=bid)
        print(res10.strip())
        
    print("\n[ INFO ] Exporting DFT calculation energies...")
    run_subprocess_safe(['verdi', 'run', 'extract_energies.py'], 'extract_energies', branch_id=None)
    
    print("\n[ COMPLETE ] Automated pipeline successfully logged all scientific data for all branches.")

if __name__ == '__main__':
    main()
