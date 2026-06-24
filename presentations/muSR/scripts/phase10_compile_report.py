import sys
import os

# Accept branch-specific directories
logs_dir = sys.argv[1] if len(sys.argv) > 1 else '../logs'
export_dir = sys.argv[2] if len(sys.argv) > 2 else '../exports'

# We'll parse the data from the log files the pipeline created!
try:
    with open(f"{logs_dir}/step2_void.log", "r") as f:
        void_data = f.read()
except FileNotFoundError:
    # Shared logs may be in a different directory
    shared_logs = os.path.join(os.path.dirname(logs_dir), 'shared')
    try:
        with open(f"{shared_logs}/step2_void.log", "r") as f:
            void_data = f.read()
    except FileNotFoundError:
        void_data = "(Void data not available)"

try:
    with open(f"{logs_dir}/step4b_distortion.log", "r") as f:
        dist_data = f.read()
except FileNotFoundError:
    dist_data = "(Distortion data not available)"

try:
    with open(f"{logs_dir}/step8_bc.log", "r") as f:
        bc_data = f.read()
except FileNotFoundError:
    bc_data = "(Contact field data not available)"

try:
    with open(f"{logs_dir}/step9_bdip.log", "r") as f:
        bdip_data = f.read()
except FileNotFoundError:
    bdip_data = "(Dipolar field data not available)"

report = f"""====================================================
       CeIn3 DFT+mu FINAL SCIENTIFIC REPORT
====================================================

1. INITIAL VOID LOCATION
----------------------------------------------------
{void_data.strip()}

2. MUON RELAXATION & LATTICE DISTORTION
----------------------------------------------------
{dist_data.strip()}

3. FERMI CONTACT FIELD (Quantum Spin Density)
----------------------------------------------------
{bc_data.strip()}

4. CLASSICAL DIPOLAR FIELD (AFM Host Lattice)
----------------------------------------------------
{bdip_data.strip()}

====================================================
"""

os.makedirs(export_dir, exist_ok=True)
with open(os.path.join(export_dir, 'final_muSR_results.txt'), 'w') as f:
    f.write(report)

print(f"Success! Consolidated scientific report saved to '{export_dir}/final_muSR_results.txt'")
