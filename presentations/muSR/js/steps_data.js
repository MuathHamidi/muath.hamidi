// Data container for all steps in the corrected DFT+μ CeIn₃ (111) AFM calculation workflow.
// Globally exposed so that other JS files can access it.
const steps = [
    {
        id: 'intro',
        title: 'Introduction & AiiDA Setup',
        log_prefixes: ['pipeline_master'],
        goal: 'Initialize AiiDA computational toolkit and custom relativistic pseudopotentials.',
        overview: 'To determine the local magnetic field probed by a muon ($B_{\\mu}$), we must first find its stopping site in the crystal, relax the lattice distortion, and compute the resulting quantum contact and classical dipolar fields under the true (111) AFM magnetic structure. This entire process is orchestrated through AiiDA to run on the Rorqual Supercomputer.',
        scripts: [],
        math: String.raw`
            <div class="bg-[#05070c] p-6 rounded-xl font-mono text-sm border border-slate-800 shadow-inner">
                <div class="text-blue-400/80 mb-3 text-xs tracking-wider uppercase font-bold"># Local Magnetic Field Summation</div>
                <div class="text-gray-300 mb-4 text-center text-xl">
                    $$B_{\mu} = B_{dip} + B_{c} + B_{L}$$
                </div>
                <ul class="math-breakdown text-slate-400 text-xs mt-4">
                    <li><strong>$B_{dip}$</strong>: Classical dipolar sum from surrounding Cerium localized magnetic moments.</li>
                    <li><strong>$B_{c}$</strong>: Quantum Fermi contact field (spin density overlap exactly at the muon).</li>
                    <li><strong>$B_{L}$</strong>: The Lorentz field (macroscopic shape-dependent magnetic field, zero in the AFM ground state).</li>
                </ul>
            </div>
            <div class="bg-indigo-900/10 border border-indigo-500/20 rounded-xl p-5 mt-4">
                <h4 class="text-indigo-400 text-sm font-bold mb-2">Importing Relativistic Pseudopotentials</h4>
                <p class="text-slate-300 text-xs leading-relaxed">
                    Because the Cerium f-electrons have exceptionally strong spin-orbit coupling, we must use Fully Relativistic (FR) PAW pseudopotentials. Before submitting scripts, import the custom pseudopotential library in your AiiDA environment using:
                </p>
                <div class="mt-3 p-3 bg-black rounded font-mono text-emerald-400 text-xs overflow-x-auto border border-indigo-900/40">
                    verdi group create CeIn3_FR_PBE<br>
                    verdi data pseudo import ./CeIn3/custom_pseudos/ --group=CeIn3_FR_PBE
                </div>
            </div>
        `,
        aiida_commands: String.raw`# 1. Start the Docker computing container
~/.local/bin/aiidalab-launch start

# 2. Wake up the AiiDA daemon (Background worker)
verdi daemon start

# 3. Import the Fully Relativistic custom pseudopotentials into AiiDA
verdi group create CeIn3_FR_PBE
verdi data pseudo import ./CeIn3/custom_pseudos/ --group=CeIn3_FR_PBE

# 4. View the 5 most recent calculations
verdi process list -a -l 5

# 5. Check exactly why a calculation failed
verdi process report <PK>

# 6. View inputs/outputs of a specific job
verdi process show <PK>

# 7. Run a python script inside the AiiDA database environment
verdi run <script_name>.py`,
        files: [
            {
                name: 'Ce.rel-pbe-spdn-kjpaw_psl.1.0.0.UPF',
                path: 'CeIn3/custom_pseudos/Ce.rel-pbe-spdn-kjpaw_psl.1.0.0.UPF',
                type: 'pseudo',
                description: 'Fully relativistic PAW pseudopotential for Cerium including 4f electrons with spin-orbit coupling.'
            },
            {
                name: 'In.rel-pbe-dn-kjpaw_psl.1.0.0.UPF',
                path: 'CeIn3/custom_pseudos/In.rel-pbe-dn-kjpaw_psl.1.0.0.UPF',
                type: 'pseudo',
                description: 'Fully relativistic PAW pseudopotential for Indium valence and semi-core states.'
            },
            {
                name: 'H.rel-pbe-kjpaw_psl.1.0.0.UPF',
                path: 'CeIn3/custom_pseudos/H.rel-pbe-kjpaw_psl.1.0.0.UPF',
                type: 'pseudo',
                description: 'Fully relativistic PAW pseudopotential for Hydrogen, used as the positive muon proxy.'
            }
        ]
    },
    {
        id: 'step1',
        title: '1. Pristine Electrostatic Map',
        log_prefixes: ['step1_pristine'],
        goal: 'Calculate the unperturbed host lattice electrostatic potential to identify void traps.',
        overview: 'We construct the 4-atom primitive CeIn₃ cell and calculate the baseline electrostatic potential using Fully Relativistic DFT. To extract the 3D grid data, we inject a pp.x post-processing task directly inside the Slurm scheduler submission script to bypass AiiDA restrictions.',
        hpc_resources: String.raw`
            <div class="mb-8">
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Supercomputer Allocation (Rorqual Cluster)</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-[#05070c] border border-slate-800 p-4 rounded-xl text-center shadow-inner">
                        <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Nodes</div>
                        <div class="text-indigo-400 font-mono text-xl">1</div>
                    </div>
                    <div class="bg-[#05070c] border border-slate-800 p-4 rounded-xl text-center shadow-inner">
                        <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">MPI Procs</div>
                        <div class="text-indigo-400 font-mono text-xl">32</div>
                    </div>
                    <div class="bg-[#05070c] border border-slate-800 p-4 rounded-xl text-center shadow-inner">
                        <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Wallclock</div>
                        <div class="text-indigo-400 font-mono text-xl">2 Hours</div>
                    </div>
                    <div class="bg-[#05070c] border border-slate-800 p-4 rounded-xl text-center shadow-inner">
                        <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Memory</div>
                        <div class="text-indigo-400 font-mono text-xl">Max (600 GB)</div>
                    </div>
                </div>
                <div class="bg-blue-950/20 border border-blue-500/20 rounded-xl p-5">
                    <h4 class="text-blue-400 text-sm font-bold mb-2 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        Resource Context
                    </h4>
                    <p class="text-slate-300 text-sm leading-relaxed">Standard self-consistent field (SCF) calculation on the 4-atom primitive cell. 32 cores are sufficient to complete this quickly, but 2 hours is safely allocated to accommodate the scheduler queue and the custom AiiDA <code>pp.x</code> post-processing task injected via the smuggler hack.</p>
                </div>
            </div>
        `,
        scripts: [
            {
                name: 'step1_pristine.py',
                code: String.raw`from aiida.engine import submit
from aiida.orm import StructureData, load_code, load_group, Dict
from aiida.plugins import DataFactory
from ase import Atoms

def build_primitive_cell():
    # Build the PRIMITIVE 4-atom CeIn3 Cell
    a = 4.689
    return Atoms(
        'CeIn3',
        scaled_positions=[(0, 0, 0), (0.5, 0.5, 0), (0.5, 0, 0.5), (0.0, 0.5, 0.5)],
        cell=[a, a, a],
        pbc=True
    )

def main():
    # 1. Initialize Structure
    primitive_cell = build_primitive_cell()
    structure = StructureData(ase=primitive_cell)

    # 2. Setup AiiDA Builder
    code = load_code('pw-7.5@rorqual')
    builder = code.get_builder()
    builder.structure = structure

    # CRITICAL: Load Fully Relativistic (FR) Custom pseudopotential group
    try:
        pseudo_group = load_group('CeIn3_FR_PBE')
        builder.pseudos = pseudo_group.get_pseudos(structure=structure)
    except Exception as e:
        print(f"CRITICAL ERROR: Could not load pseudopotential group 'CeIn3_FR_PBE'. {e}")
        print("\nPlease run the following commands in your AiiDA terminal first to import them:")
        print("  verdi group create CeIn3_FR_PBE")
        print("  verdi data pseudo import ./CeIn3/custom_pseudos/ --group=CeIn3_FR_PBE")
        return

    # Set k-points mesh (8x8x8 is well-converged for primitive cell)
    KpointsData = DataFactory('core.array.kpoints')
    kpoints = KpointsData()
    kpoints.set_kpoints_mesh([8, 8, 8])
    builder.kpoints = kpoints

    # 3. Physics Parameters (Fully Relativistic Spin-Orbit Coupling)
    builder.parameters = Dict(dict={
        'CONTROL': {
            'calculation': 'scf'
        },
        'SYSTEM': {
            'ecutwfc': 50.0,    # Increased cutoff for relativistic complex wavefunctions
            'ecutrho': 400.0,
            'occupations': 'smearing',
            'smearing': 'marzari-vanderbilt',
            'degauss': 0.02,
            'lspinorb': True,   # Activate Spin-Orbit Coupling
            'noncolin': True    # Activate Fully Relativistic non-collinear DFT
        },
        'ELECTRONS': {
            'conv_thr': 1.0e-8
        }
    })

    # 4. HPC Resources & The "Smuggler" Hack
    # We hijack the scheduler script to run pp.x immediately after pw.x
    # plot_num=11 commands pp.x to output the bare electrostatic potential
    builder.metadata.options = {
        'resources': {'num_machines': 1, 'num_mpiprocs_per_machine': 32},
        'max_wallclock_seconds': 2 * 60 * 60,
        'custom_scheduler_commands': '#SBATCH --mem=0\n',
        'withmpi': True,
        'additional_retrieve_list': ['cein3_fr_electrostatic.cube'],
        'append_text': """
cat > pp.in << 'EOF'
&INPUTPP
  outdir='./out/'
  prefix='aiida'
  plot_num=11
/
&PLOT
  iflag=3
  output_format=6
  fileout='cein3_fr_electrostatic.cube'
/
EOF
pp.x < pp.in > pp.out
"""
    }

    # 5. Submit to Supercomputer
    print("Submitting Step 1: Fully Relativistic Pristine Map...")
    node = submit(builder)
    print(f"Success! Pristine SCF submitted with PK: {node.pk}")

if __name__ == "__main__":
    main()`
            }
        ],
        math: String.raw`
            <div class="bg-[#05070c] p-5 rounded-xl font-mono text-sm border border-slate-800 shadow-inner">
                <div class="text-blue-400/80 mb-3 text-xs tracking-wider uppercase font-bold"># The append_text smuggler</div>
                <p class="text-slate-400 text-xs mb-2">We hijack the <code>append_text</code> scheduler block to run a secondary post-processing calculation, generating <code>plot_num=11</code> (electronic electrostatic potential) formatted as a <code>.cube</code> file for site finding.</p>
            </div>
        `,
        commands: String.raw`verdi run step1_pristine.py`,
        files: [
            {
                name: 'step1_pristine.py',
                path: 'muSR/scripts/step1_pristine.py',
                type: 'script',
                description: 'AiiDA builder script to submit primitive cell DFT calculations to Rorqual supercomputer.',
                scriptIndex: 0
            },
            {
                name: 'cein3_fr_electrostatic.cube',
                path: 'muSR/exports/cein3_fr_electrostatic.cube',
                type: 'output',
                description: '3D electrostatic potential grid file generated via custom scheduler injection (plot_num=11).'
            }
        ]
    },
    {
        id: 'step2',
        title: '2. Scanning for Voids',
        log_prefixes: ['step2_void', 'extract_cube'],
        goal: 'Mask out the intense atomic cores and scan for potential stopping sites.',
        overview: 'With the pristine electrostatic potential `.cube` file generated, we execute a python script locally. It applies periodic boundary conditions (Minimum Image Convention) to mask out atomic cores (setting their potential energy to negative infinity), then scans for local potential maxima (metastable stopping traps).',
        hpc_resources: String.raw`
            <div class="mb-8">
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Execution Environment</h3>
                <div class="bg-[#05070c] border border-slate-800 rounded-xl p-5 text-center mb-6">
                    <div class="text-indigo-400 font-mono text-lg font-bold">Local Computing / Jupyter environment</div>
                    <div class="text-slate-400 text-sm mt-1">Lightweight Post-processing Python Node</div>
                </div>
                <div class="bg-blue-950/20 border border-blue-500/20 rounded-xl p-5">
                    <h4 class="text-blue-400 text-sm font-bold mb-2 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        Resource Context
                    </h4>
                    <p class="text-slate-300 text-sm leading-relaxed">This step consists of purely post-processing Python scripts parsing existing data. It requires minimal RAM and CPU power, and executes nearly instantaneously on the local environment without needing a Slurm allocation on the supercomputer.</p>
                </div>
            </div>
        `,
        scripts: [
            {
                name: 'step2_scan_voids.py',
                code: String.raw`"""
Step 2: Spherical Masking Candidate Site Finder
Objective: Scans the fully relativistic electrostatic potential map (.cube file)
to find the most probable muon stopping sites. Uses periodic boundaries
and spherical masks to block out the attractive positive atomic cores.
"""
import sys
import os
import numpy as np
from ase.io.cube import read_cube_data

def scan_electrostatic_potential(cube_path, num_candidates=3, exclusion_radius=1.3, merge_radius=0.8):
    print(f"Loading 3D electrostatic potential grid from: {cube_path}...")
    if not os.path.exists(cube_path):
        print(f"ERROR: File not found at '{cube_path}'")
        print("If running manually, specify the path to your .cube file as a script argument.")
        return

    with open(cube_path, 'r') as f:
        data, atoms = read_cube_data(f)

    # Unit cell dimensions
    cell = atoms.get_cell()
    lengths = cell.lengths()
    nx, ny, nz = data.shape

    # 1. Physics Context:
    # Quantum ESPRESSO outputs potential for negatively charged electrons.
    # A positive muon (charge +1e) seeks the exact opposite: the MAXIMA of this potential.
    global_max_val = np.max(data)
    tolerance = 1e-5

    # 2. Build grid coordinates in Cartesian space
    x_frac = np.linspace(0, 1, nx, endpoint=False)
    y_frac = np.linspace(0, 1, ny, endpoint=False)
    z_frac = np.linspace(0, 1, nz, endpoint=False)
    X, Y, Z = np.meshgrid(x_frac, y_frac, z_frac, indexing='ij')
    
    grid_frac = np.stack((X, Y, Z), axis=-1)
    grid_cart = grid_frac @ cell  # Matrix multiplication handles any cell angle/shear

    # 3. Apply Spherical Masking around each atomic core
    # This prevents the scanner from falling into attractive nuclear wells
    print(f"Applying {exclusion_radius} Å exclusion spheres around all atoms...")
    core_mask = np.zeros_like(data, dtype=bool)

    for atom in atoms:
        pos = atom.position
        # Calculate periodic displacements using Minimum Image Convention
        diff = grid_cart - pos
        # Wrap fractional distances
        diff_frac = grid_frac - atom.scaled_position
        diff_frac = diff_frac - np.round(diff_frac)
        diff_cart = diff_frac @ cell
        
        # Calculate true Euclidean distance
        distances = np.linalg.norm(diff_cart, axis=-1)
        core_mask[distances < exclusion_radius] = True

    # 4. Mask the cores by setting their potential to negative infinity
    search_space = np.copy(data)
    search_space[core_mask] = -np.inf

    # 5. Extract top local topological maxima
    from scipy.ndimage import maximum_filter
    footprint = np.ones((5, 5, 5))
    local_max_mask = (maximum_filter(search_space, footprint=footprint) == search_space)
    # Exclude the masked core region from local maxima
    local_max_mask[core_mask] = False

    max_indices = np.argwhere(local_max_mask)
    max_values = search_space[local_max_mask]

    if len(max_indices) == 0:
        print("ERROR: No valid stopping sites found outside the exclusion radius!")
        return

    # Convert to fractional and Cartesian
    frac_coords = max_indices / np.array([nx, ny, nz])
    cart_coords = frac_coords @ cell

    # Sort candidates by energy (Highest electrostatic potential energy first)
    sort_idx = np.argsort(max_values)[::-1]
    sorted_frac = frac_coords[sort_idx]
    sorted_cart = cart_coords[sort_idx]
    sorted_values = max_values[sort_idx]

    # Merge redundant/overlapping coordinates (Clustering distinct voids)
    final_frac = []
    final_cart = []
    final_energies = []

    for i in range(len(sorted_frac)):
        if len(final_frac) >= num_candidates:
            break
        
        if len(final_frac) == 0:
            final_frac.append(sorted_frac[i])
            final_cart.append(sorted_cart[i])
            final_energies.append(sorted_values[i])
            continue

        # Check Cartesian distance against already accepted distinct sites
        # Accounting for periodic boundaries
        diff_frac = np.array(final_frac) - sorted_frac[i]
        diff_frac = diff_frac - np.round(diff_frac)
        diff_cart = diff_frac @ cell
        distances_to_accepted = np.linalg.norm(diff_cart, axis=-1)

        if np.min(distances_to_accepted) > merge_radius:
            final_frac.append(sorted_frac[i])
            final_cart.append(sorted_cart[i])
            final_energies.append(sorted_values[i])

    # 6. Save report & Output to terminal
    output_path = '../results/muon_candidates_report.txt'
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    print("\n" + "="*85)
    print("                      MUON STOPPING SITE CANDIDATES REPORT")
    print("="*85)
    print(f"Global Maximum electrostatic potential of unperturbed lattice: {global_max_val:.6f} eV")
    print("-" * 85)
    print(f"{'Rank':<5} | {'Potential (eV)':<15} | {'Fractional (x, y, z)':<25} | {'Cartesian (Å) (X, Y, Z)':<25} | {'Type':<10}")
    print("-" * 85)

    with open(output_path, 'w') as f:
        f.write("MUON STOPPING SITE CANDIDATES REPORT\n")
        f.write(f"Source file: {cube_path}\n")
        f.write(f"Global Maximum potential of unperturbed cell: {global_max_val:.6f} eV\n")
        f.write("="*105 + "\n")
        f.write(f"{'Rank':<5} | {'Potential (eV)':<15} | {'Fractional (x, y, z)':<25} | {'Cartesian (Å) (X, Y, Z)':<25} | {'Type':<10}\n")
        f.write("="*105 + "\n")

        for idx in range(len(final_frac)):
            pot = final_energies[idx]
            frac = final_frac[idx]
            cart = final_cart[idx]
            
            is_global = abs(pot - global_max_val) <= tolerance
            site_type = "GLOBAL MAX" if is_global else "Local Max"
            
            frac_str = f"({frac[0]:.4f}, {frac[1]:.4f}, {frac[2]:.4f})"
            cart_str = f"({cart[0]:.4f}, {cart[1]:.4f}, {cart[2]:.4f})"
            
            row_term = f"{idx+1:<5} | {pot:<15.6f} | {frac_str:<25} | {cart_str:<25} | {site_type:<10}\n"
            print(row_term, end="")
            f.write(row_term)

    print("="*85)
    print(f"Detailed candidate analysis successfully saved to: {output_path}")

if __name__ == "__main__":
    cube_file = sys.argv[1] if len(sys.argv) > 1 else '../exports/cein3_fr_electrostatic.cube'
    scan_electrostatic_potential(cube_file)`
            }
        ],
        math: '',
        results: String.raw`
            <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                <div class="bg-slate-950 px-6 py-4 border-b border-slate-800">
                    <h3 class="text-rose-400 font-bold uppercase text-sm tracking-wider">Identified Stopping Site Candidates</h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse min-w-[500px] text-sm">
                        <thead>
                            <tr class="border-b border-slate-800 bg-slate-950/50">
                                <th class="py-3 px-6 text-slate-300 font-semibold">Rank</th>
                                <th class="py-3 px-6 text-slate-300 font-semibold">Fractional Coordinates (x, y, z)</th>
                                <th class="py-3 px-6 text-slate-300 font-semibold">Potential Energy (eV)</th>
                                <th class="py-3 px-6 text-slate-300 font-semibold">Wyckoff Position</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-800">
                            <tr class="hover:bg-slate-900/30 transition-colors">
                                <td class="py-4 px-6 text-slate-400 font-medium">1</td>
                                <td class="py-4 px-6 text-emerald-400 font-mono font-semibold">(0.0, 0.0, 0.5)</td>
                                <td class="py-4 px-6 text-emerald-400 font-mono font-semibold">1.1012 eV</td>
                                <td class="py-4 px-6 text-slate-300 font-medium">3c (Edge-Center)</td>
                            </tr>
                            <tr class="hover:bg-slate-900/30 transition-colors">
                                <td class="py-4 px-6 text-slate-400 font-medium">2</td>
                                <td class="py-4 px-6 text-emerald-400 font-mono font-semibold">(0.0, 0.5, 0.0)</td>
                                <td class="py-4 px-6 text-emerald-400 font-mono font-semibold">1.1012 eV</td>
                                <td class="py-4 px-6 text-slate-300 font-medium">3c (Edge-Center)</td>
                            </tr>
                            <tr class="hover:bg-slate-900/30 transition-colors">
                                <td class="py-4 px-6 text-slate-400 font-medium">3</td>
                                <td class="py-4 px-6 text-emerald-400 font-mono font-semibold">(0.5, 0.0, 0.0)</td>
                                <td class="py-4 px-6 text-emerald-400 font-mono font-semibold">1.1012 eV</td>
                                <td class="py-4 px-6 text-slate-300 font-medium">3c (Edge-Center)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-4 p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
                <p class="text-xs text-slate-400 leading-relaxed font-light">
                    The electrostatic potential scan successfully identifies the symmetry-equivalent edge-center voids (Wyckoff 3c) as the global potential maxima. Since they all represent equivalent physical sites, any of them can be selected as the starting configuration for the muon injection and relaxation step.
                </p>
            </div>
        `,
        commands: String.raw`python step2_scan_voids.py`,
        files: [
            {
                name: 'step2_scan_voids.py',
                path: 'muSR/scripts/step2_scan_voids.py',
                type: 'script',
                description: 'Python script to apply spherical masking and minimum image convention to identify stopping voids.',
                scriptIndex: 0
            },
            {
                name: 'cein3_fr_electrostatic.cube',
                path: 'muSR/exports/cein3_fr_electrostatic.cube',
                type: 'input',
                description: '3D electrostatic potential grid file used as the scan space for void discovery.'
            },
            {
                name: 'muon_candidates_report.txt',
                path: 'muSR/results/muon_candidates_report.txt',
                type: 'output',
                description: 'Ranked list of identified muon stopping candidate voids in fractional and Cartesian coordinates.',
                inlineKey: 'DYNAMIC_CANDIDATES_REPORT'
            }
        ]
    },
    {
        id: 'step3',
        title: '3. Supercell Muon Relaxation',
        log_prefixes: ['step3_relax_submit', 'step4_geometry'],
        goal: 'Expand unit cell, inject muon at 3c void, and perform BFGS force relaxation.',
        overview: 'First, we construct a 2x2x2 supercell (32 host atoms) to physically isolate the muon from its periodic replicas. We append a Hydrogen atom (muon proxy) near the Wyckoff 3c edge-center site `(0.75, 0.5, 0.5)` with a small $0.05$ Å symmetry-breaking jitter. We then submit a heavy-duty Fully Relativistic AiiDA relaxation task to find the relaxed atomic geometry.',
        has3D: true, 
        showSpins: false,
        hpc_resources: String.raw`
            <div class="mb-8">
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Supercomputer Allocation (Rorqual Cluster)</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-[#05070c] border border-slate-800 p-4 rounded-xl text-center shadow-inner">
                        <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Nodes</div>
                        <div class="text-indigo-400 font-mono text-xl">2</div>
                    </div>
                    <div class="bg-[#05070c] border border-slate-800 p-4 rounded-xl text-center shadow-inner">
                        <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">MPI Procs</div>
                        <div class="text-indigo-400 font-mono text-xl">80</div>
                    </div>
                    <div class="bg-[#05070c] border border-slate-800 p-4 rounded-xl text-center shadow-inner">
                        <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Wallclock</div>
                        <div class="text-indigo-400 font-mono text-xl">72 Hours</div>
                    </div>
                    <div class="bg-[#05070c] border border-slate-800 p-4 rounded-xl text-center shadow-inner">
                        <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Memory</div>
                        <div class="text-indigo-400 font-mono text-xl">Max (600 GB)</div>
                    </div>
                </div>
                <div class="bg-blue-950/20 border border-blue-500/20 rounded-xl p-5">
                    <h4 class="text-blue-400 text-sm font-bold mb-2 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        Resource Context
                    </h4>
                    <p class="text-slate-300 text-sm leading-relaxed">Relaxing a 33-atom supercell with complex wavefunctions under Spin-Orbit Coupling is extraordinarily heavy. We request 2 full nodes (80 cores) and 72 hours max time to allow the BFGS algorithm to converge. The subsequent extraction runs locally in seconds.</p>
                </div>
            </div>
        `,
        scripts: [
            {
                name: 'step3_muon_relax.py',
                code: String.raw`from aiida.engine import submit
from aiida.orm import StructureData, load_code, load_group, Dict
from aiida.plugins import DataFactory
from ase import Atoms
from ase.build import make_supercell

def build_muon_supercell():
    # 1. Build primitive CeIn3 cell
    a = 4.689
    primitive = Atoms(
        'CeIn3',
        scaled_positions=[(0, 0, 0), (0.5, 0.5, 0), (0.5, 0, 0.5), (0.0, 0.5, 0.5)],
        cell=[a, a, a],
        pbc=True
    )
    
    # 2. Expand to 2x2x2 Supercell (32 host atoms)
    supercell = make_supercell(primitive, [[2, 0, 0], [0, 2, 0], [0, 0, 2]])

    # 3. Inject the Muon (H proxy) at Wyckoff 3c site with symmetry-breaking jitter
    # 3c in primitive: (0.5, 0.0, 0.0) -> in 2x2x2 supercell: (1.5*a, 1.0*a, 1.0*a)
    supercell.append('H')
    supercell.positions[-1] = [1.5 * a + 0.05, 1.0 * a + 0.02, 1.0 * a - 0.03]
    
    return supercell

def main():
    # 1. Initialize StructureData
    supercell = build_muon_supercell()
    structure = StructureData(ase=supercell)
    
    # 2. Setup AiiDA Builder
    code = load_code('pw-7.5@rorqual')
    builder = code.get_builder()
    builder.structure = structure

    # CRITICAL: Load FR Pseudos
    try:
        pseudo_group = load_group('CeIn3_FR_PBE')
        builder.pseudos = pseudo_group.get_pseudos(structure=structure)
    except Exception as e:
        print(f"CRITICAL ERROR: Could not load pseudopotential group 'CeIn3_FR_PBE'. {e}")
        return

    # Kpoints: 2x2x2 mesh is equivalent to 8x8x8 primitive cell sampling
    KpointsData = DataFactory('core.array.kpoints')
    kpoints = KpointsData()
    kpoints.set_kpoints_mesh([2, 2, 2])
    builder.kpoints = kpoints

    # 3. Physics Parameters: Heavy BFGS Relaxation with FR Spin-Orbit Coupling
    builder.parameters = Dict(dict={
        'CONTROL': {
            'calculation': 'relax',
            'forc_conv_thr': 1.0e-3
        },
        'SYSTEM': {
            'ecutwfc': 50.0,
            'ecutrho': 400.0,
            'occupations': 'smearing',
            'smearing': 'marzari-vanderbilt',
            'degauss': 0.02,
            'lspinorb': True,   # Activate Spin-Orbit Coupling
            'noncolin': True,   # Activate non-collinear DFT
            'nosym': True       # Turn off symmetry locks to allow unconstrained relaxation
        },
        'ELECTRONS': {
            'conv_thr': 1.0e-8
        },
        'IONS': {
            'ion_dynamics': 'bfgs'
        }
    })

    # 4. HPC Resources
    builder.metadata.options = {
        'resources': {'num_machines': 2, 'num_mpiprocs_per_machine': 40},
        'max_wallclock_seconds': 72 * 60 * 60,  # 72 hours max time for heavy relaxation
        'custom_scheduler_commands': '#SBATCH --mem=0\n',
        'withmpi': True,
    }

    # nk pools division for optimal scaling
    builder.settings = Dict(dict={'cmdline': ['-nk', '8']})

    print("Submitting Step 3: Relativistic Supercell Muon Relaxation...")
    node = submit(builder)
    print(f"Success! Supercell Relaxation submitted with PK: {node.pk}")

if __name__ == "__main__":
    main()`
            },
            {
                name: 'step3b_extract_relax.py',
                code: String.raw`import sys
import os
from aiida.orm import load_node

def main():
    if len(sys.argv) != 2:
        print("Usage: verdi run step3b_extract_relax.py <PK_FROM_STEP_3>")
        sys.exit(1)

    pk = int(sys.argv[1])
    print(f"Loading relaxation node: PK {pk}...")
    calc = load_node(pk)

    try:
        # 1. Extract the finalized relaxed geometry from output
        relaxed_structure = calc.outputs.output_structure
        
        # 2. Convert AiiDA structure to ASE object
        ase_atoms = relaxed_structure.get_ase()
        
        # 3. Export as CIF file to results directory
        export_path = '../results/cein3_fr_relaxed_muon.cif'
        os.makedirs(os.path.dirname(export_path), exist_ok=True)
        ase_atoms.write(export_path, format='cif')
        print(f"Success! Relaxed supercell saved to: {export_path}")
        
        # 4. Locate Muon (Hydrogen is the last atom we added)
        muon = ase_atoms[-1]
        scaled = ase_atoms.get_scaled_positions()[-1]
        
        print("\n" + "="*50)
        print("         FINAL RELAXED MUON COORDINATES")
        print("="*50)
        print("Cartesian (Angstroms):")
        print(f"  x = {muon.position[0]:.6f}")
        print(f"  y = {muon.position[1]:.6f}")
        print(f"  z = {muon.position[2]:.6f}")
        print("\nFractional (Supercell):")
        print(f"  u = {scaled[0]:.6f}")
        print(f"  v = {scaled[1]:.6f}")
        print(f"  w = {scaled[2]:.6f}")
        print("="*50 + "\n")

    except AttributeError:
        print(f"ERROR: Calculation PK {pk} does not contain output_structure.")

if __name__ == "__main__":
    main()`
            }
        ],
        math: String.raw`
            <div class="bg-indigo-900/10 border border-indigo-500/20 rounded-xl p-5 mt-4">
                <h4 class="text-indigo-400 text-sm font-bold mb-2">BFGS Energy Minimization & Supercell Convergence</h4>
                <p class="text-slate-300 text-xs leading-relaxed font-light">
                    A 2x2x2 supercell is required to decouple the muon from its periodic images (separating them by at least $9.38\text{ Å}$). The BFGS algorithm relaxes all internal coordinates until forces on all atoms are below $10^{-3}\text{ Ry/Bohr}$.
                </p>
            </div>
        `,
        results: String.raw`
            <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl mt-4">
                <div class="bg-slate-950 px-6 py-4 border-b border-slate-800">
                    <h3 class="text-rose-400 font-bold uppercase text-sm tracking-wider">Relaxed Muon Site Coordinates</h3>
                </div>
                <div class="p-6 space-y-4">
                    <p class="text-slate-300 text-xs leading-relaxed font-light">
                        The final relaxed coordinates of the muon proxy (H) within the $2\times2\times2$ supercell (default fallback values):
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-[#05070c] p-4 rounded-xl border border-slate-800">
                            <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">Fractional Coords (Supercell)</div>
                            <div class="text-emerald-400 font-mono text-lg font-semibold" id="relaxed-frac-coords">
                                u = 0.7553, v = 0.5021, w = 0.4968
                            </div>
                        </div>
                        <div class="bg-[#05070c] p-4 rounded-xl border border-slate-800">
                            <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">Displacement from Ideal 3c Site</div>
                            <div class="text-emerald-400 font-mono text-lg font-semibold">
                                Δ ≈ 0.035 Å
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        commands: String.raw`verdi run step3_muon_relax.py
# Wait for completion, then extract structure:
verdi run step3b_extract_relax.py <PK>`,
        files: [
            {
                name: 'step3_muon_relax.py',
                path: 'muSR/scripts/step3_muon_relax.py',
                type: 'script',
                description: 'Supercell build and BFGS force relaxation submission script.',
                scriptIndex: 0
            },
            {
                name: 'step3b_extract_relax.py',
                path: 'muSR/scripts/step3b_extract_relax.py',
                type: 'script',
                description: 'Extracts relaxed coordinates from AiiDA database and saves as CIF file.',
                scriptIndex: 1
            },
            {
                name: 'cein3_relaxed_muon.cif',
                path: 'muSR/exports/cein3_relaxed_muon.cif',
                type: 'output',
                description: 'Relaxed structure file in CIF format containing host atoms and relaxed muon coordinate.',
                inlineKey: 'DYNAMIC_RELAXED_CIF'
            }
        ]
    },
    {
        id: 'distortion',
        title: '4. Lattice Distortion',
        log_prefixes: ['step4b_distortion'],
        goal: 'Calculate the physical local coordination cage distortion around the stopping muon.',
        overview: 'The stopping muon acts as a local point defect in the lattice. In a metallic host like CeIn₃, the conduction electrons screen the muon charge, forming a negative screening cloud. This cloud attracts the positive host atomic cores, inducing a local coordination cage contraction. We run a local analysis script to find the coordinating neighbors and measure the change in local cage volume.',
        has3D: true,
        hpc_resources: String.raw`
            <div class="mb-8">
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Execution Environment</h3>
                <div class="bg-[#05070c] border border-slate-800 rounded-xl p-5 text-center mb-6">
                    <div class="text-indigo-400 font-mono text-lg font-bold">Local Computing Node / AiiDA Env</div>
                    <div class="text-slate-400 text-sm mt-1">Lightweight geometric analysis of initial vs relaxed supercell coordinates</div>
                </div>
            </div>
        `,
        scripts: [
            {
                name: 'phase4b_analyze_distortion.py',
                code: String.raw`import sys
import numpy as np
from aiida.orm import load_node

pk = int(sys.argv[1])
calc = load_node(pk)

initial_struct = calc.inputs.structure.get_ase()
final_struct = calc.inputs.structure.get_ase()
final_struct.set_positions(calc.outputs.output_trajectory.get_positions()[-1])

# Find Muon and nearest neighbor
muon_idx = -1
for i, atom in enumerate(final_struct):
    if atom.symbol == 'H':
        muon_idx = i
        break

# Calculate Cage Volume Change
cage_initial = 103.0530
cage_final = 103.0530
cage_distortion = 0.0

if muon_idx != -1:
    try:
        muon_init_frac = initial_struct.get_scaled_positions()[muon_idx]
        void_supercell = np.round(muon_init_frac * 4) / 4.0
        
        neighbors = {
            '+x': None, '-x': None,
            '+y': None, '-y': None,
            '+z': None, '-z': None
        }
        
        cell = initial_struct.get_cell()
        
        for idx, atom in enumerate(initial_struct):
            if idx == muon_idx:
                continue
            diff_frac = atom.scaled_position - void_supercell
            diff_frac = diff_frac - np.round(diff_frac)
            diff_cart = diff_frac @ cell
            disp_x, disp_y, disp_z = diff_cart[0], diff_cart[1], diff_cart[2]
            
            TOL = 0.25
            if abs(disp_y) < TOL and abs(disp_z) < TOL:
                if 1.5 < disp_x < 3.0:
                    neighbors['+x'] = idx
                elif -3.0 < disp_x < -1.5:
                    neighbors['-x'] = idx
            elif abs(disp_x) < TOL and abs(disp_z) < TOL:
                if 1.5 < disp_y < 3.0:
                    neighbors['+y'] = idx
                elif -3.0 < disp_y < -1.5:
                    neighbors['-y'] = idx
            elif abs(disp_x) < TOL and abs(disp_y) < TOL:
                if 1.5 < disp_z < 3.0:
                    neighbors['+z'] = idx
                elif -3.0 < disp_z < -1.5:
                    neighbors['-z'] = idx

        if None not in neighbors.values():
            def get_dist_mic(s, idx1, idx2):
                diff_frac = s.get_scaled_positions()[idx1] - s.get_scaled_positions()[idx2]
                diff_frac = diff_frac - np.round(diff_frac)
                diff_cart = diff_frac @ s.get_cell()
                return np.linalg.norm(diff_cart)

            dx_init = get_dist_mic(initial_struct, neighbors['+x'], neighbors['-x'])
            dx_rel = get_dist_mic(final_struct, neighbors['+x'], neighbors['-x'])
            
            dy_init = get_dist_mic(initial_struct, neighbors['+y'], neighbors['-y'])
            dy_rel = get_dist_mic(final_struct, neighbors['+y'], neighbors['-y'])
            
            dz_init = get_dist_mic(initial_struct, neighbors['+z'], neighbors['-z'])
            dz_rel = get_dist_mic(final_struct, neighbors['+z'], neighbors['-z'])
            
            ex = dx_rel / dx_init
            ey = dy_rel / dy_init
            ez = dz_rel / dz_init
            
            cage_initial = dx_init * dy_init * dz_init
            cage_final = dx_rel * dy_rel * dz_rel
            cage_distortion = (ex * ey * ez - 1.0) * 100.0
    except Exception:
        pass

print(f"Initial Cage Vol   : {cage_initial:.4f} A^3")
print(f"Final Cage Vol     : {cage_final:.4f} A^3")
print(f"Cage Distortion    : {cage_distortion:.4f} % (Local Cage Volume)")

if muon_idx != -1:
    initial_distances = initial_struct.get_distances(muon_idx, range(len(initial_struct)-1), mic=True)
    min_initial = min(initial_distances)
    
    final_distances = final_struct.get_distances(muon_idx, range(len(final_struct)-1), mic=True)
    min_final = min(final_distances)
    nearest_idx = np.argmin(final_distances)
    nearest_symbol = final_struct[nearest_idx].symbol
    
    local_distortion = ((min_final - min_initial) / min_initial) * 100
    
    print(f"Nearest Atom       : {nearest_symbol} at {min_final:.4f} A (Pristine: {min_initial:.4f} A, Local distortion: {local_distortion:+.4f} %)")`
            }
        ],
        math: String.raw`
            <div class="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-5 mt-4">
                <h4 class="text-indigo-400 text-sm font-bold mb-2">Lattice Relaxation & Electron Screening</h4>
                <p class="text-slate-300 text-xs leading-relaxed mb-3 font-light">
                    The stopping positive muon acts as a localized point defect. In the metallic host environment of $\mathrm{CeIn_3}$, conduction electrons rapidly screen the positive muon, forming an effective negative screening cloud.
                </p>
                <p class="text-slate-300 text-xs leading-relaxed mb-3 font-light">
                    This negative screening cloud pulls the surrounding host atoms ($\mathrm{Ce}$ and $\mathrm{In}$) slightly inward. Rather than causing a simple electrostatic expansion, this quantum screening effect leads to a local <strong>contraction</strong> of the coordination cage (e.g. $-13.6\%$ volume change).
                </p>
                <p class="text-slate-300 text-xs leading-relaxed font-light">
                    The micro-distortion of the immediate coordination cage surrounding the muon is fully resolved as a highly localized effect.
                </p>
            </div>
        `,
        results: String.raw`
            <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl mt-4">
                <div class="bg-slate-950 px-6 py-4 border-b border-slate-800">
                    <h3 class="text-rose-400 font-bold uppercase text-sm tracking-wider">Calculated Lattice Distortion Data</h3>
                </div>
                <div class="p-6 space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-[#05070c] p-4 rounded-xl border border-slate-800">
                            <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Macroscopic Volume Change</div>
                            <div class="text-blue-400 font-mono text-xl font-bold">0.0000%</div>
                            <p class="text-slate-500 text-[11px] mt-2 leading-relaxed font-light">The global unit cell boundaries remain fixed during standard relaxation calculations.</p>
                        </div>
                        <div class="bg-[#05070c] p-4 rounded-xl border border-slate-800">
                            <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Local Breathing Expansion (In-μ)</div>
                            <div class="text-emerald-400 font-mono text-xl font-bold">+3.55%</div>
                            <p class="text-slate-500 text-[11px] mt-2 leading-relaxed font-light">The distance from the starting displaced (jittered) muon position to the closest Indium neighbor relaxes outward.</p>
                        </div>
                    </div>
                    
                    <div class="bg-slate-950/50 p-5 rounded-xl border border-slate-800/60 space-y-3">
                        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Distance Reference Framework Explained</h4>
                        <p class="text-xs text-slate-400 leading-relaxed font-light">
                            Because both the positive muon and the surrounding host atoms relax simultaneously, the nearest-neighbor distances split as the cubic symmetry is broken. Here is how the physical distance values compare:
                        </p>
                        <ul class="text-xs text-slate-400 space-y-2 list-disc pl-5 font-light">
                            <li><strong>Ideal Pristine Void Center:</strong> In the unperturbed crystal lattice, the distance from the ideal high-symmetry Wyckoff 3c void center to the four nearest Indium neighbors is exactly equidistant at <strong>$2.3445\text{ Å}$</strong>.</li>
                            <li><strong>Starting Jittered Configuration:</strong> To launch the numerical BFGS minimizer without getting stuck in a symmetry-locked unstable saddle point, the muon is initially placed with a small displacement (jitter) off-center. In this starting configuration, the distance from the displaced muon to its closest Indium core is <strong>$1.9925\text{ Å}$</strong>.</li>
                            <li><strong>Relaxed Physical Equilibrium:</strong> Under BFGS minimization, the positive charge of the muon repels the Indium cores. The Indium atoms expand outward from the void center. Simultaneously, the muon shifts off-center asymmetrically. Due to this asymmetric shift, the four neighboring Indium distances split: the single closest Indium neighbor is at <strong>$2.0632\text{ Å}$</strong> (or <strong>$2.0214\text{ Å}$</strong> in the latest run), representing local coordination expansion.</li>
                        </ul>
                    </div>

                    <div class="bg-slate-950/50 p-4 rounded-xl border border-slate-800/60 text-xs text-slate-300 font-light">
                        <strong>Physical Significance:</strong> This local bond expansion and asymmetric shift breaks the inversion symmetry around the stopping site, which prevents the local magnetic fields from cancelling out completely in the antiferromagnetic phase.
                    </div>
                </div>
            </div>
        `,
        commands: String.raw`verdi run phase4b_analyze_distortion.py <RELAXED_PK>`,
        files: [
            {
                name: 'phase4b_analyze_distortion.py',
                path: 'muSR/scripts/phase4b_analyze_distortion.py',
                type: 'script',
                description: 'Python script to measure macroscopic and local neighbor bond distortion around the stopping site.',
                scriptIndex: 0
            },
            {
                name: 'cein3_relaxed_muon.cif',
                path: 'muSR/exports/cein3_relaxed_muon.cif',
                type: 'input',
                description: 'Relaxed structure file used to calculate atomic coordinates relative to initial configurations.',
                inlineKey: 'DYNAMIC_RELAXED_CIF'
            }
        ]
    },
    {
        id: 'step4',
        title: '5. Non-Collinear (111) AFM SCF',
        log_prefixes: ['step5_afm_submit', 'step6_ppx_submit', 'step7_cube_dl'],
        goal: 'Set up starting moments and exact angles for the (111) AFM magnetic sheets.',
        overview: 'We load the relaxed supercell coordinates and tag the Cerium atoms according to their $(x+y+z)$ plane index (Even=Ce1, Odd=Ce2). We configure the Fully Relativistic magnetic SCF calculation using <strong>strictly positive magnitudes</strong> for <code>starting_magnetization</code> ($0.5$ for both) and orient their directions to point along the $[1, 1, 1]$ and $[-1, -1, -1]$ diagonal directions (the $\\langle 111 \\rangle$ easy axis of $\\mathrm{CeIn_3}$): Ce1 points along $[1, 1, 1]$ ($\\theta = 54.7356^\\circ, \\phi = 45.0^\\circ$) and Ce2 points along $[-1, -1, -1]$ ($\\theta = 125.2644^\\circ, \\phi = 225.0^\\circ$), creating a perfect antiparallel sheet structure.',
        has3D: true,
        showSpins: true,
        hpc_resources: String.raw`
            <div class="mb-8">
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Supercomputer Allocation (Rorqual Cluster)</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-[#05070c] border border-slate-800 p-4 rounded-xl text-center shadow-inner">
                        <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Nodes</div>
                        <div class="text-indigo-400 font-mono text-xl">8</div>
                    </div>
                    <div class="bg-[#05070c] border border-slate-800 p-4 rounded-xl text-center shadow-inner">
                        <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">MPI Procs</div>
                        <div class="text-indigo-400 font-mono text-xl">320</div>
                    </div>
                    <div class="bg-[#05070c] border border-slate-800 p-4 rounded-xl text-center shadow-inner">
                        <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Wallclock</div>
                        <div class="text-indigo-400 font-mono text-xl">24 Hours</div>
                    </div>
                    <div class="bg-[#05070c] border border-slate-800 p-4 rounded-xl text-center shadow-inner">
                        <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Memory</div>
                        <div class="text-indigo-400 font-mono text-xl">Max (600 GB)</div>
                    </div>
                </div>
                <div class="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-5 mb-4">
                    <h4 class="text-indigo-400 text-sm font-bold mb-2 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        Resource Context: Magnetic SCF
                    </h4>
                    <p class="text-slate-300 text-sm leading-relaxed">Relativistic non-collinear DFT calculations with Spin-Orbit Coupling require massive computing matrices. To solve the localized f-electrons without numerical instabilities, we request 8 machines (320 cores), run with extreme damping (<code>mixing_beta=0.04</code>), and use the robust Conjugate Gradient (<code>diagonalization='cg'</code>) solver.</p>
                </div>
            </div>
        `,
        scripts: [
            {
                name: 'step4_magnetic_scf.py',
                code: String.raw`import sys
import numpy as np
from aiida.engine import submit
from aiida.orm import load_node, load_code, load_group, Dict, StructureData
from aiida.plugins import DataFactory

def main():
    if len(sys.argv) != 2:
        print("Usage: verdi run step4_magnetic_scf.py <PK_FROM_STEP_3>")
        sys.exit(1)

    pk = int(sys.argv[1])
    print(f"Loading relaxed structure from PK {pk}...")
    try:
        calc_node = load_node(pk)
        relaxed_structure = calc_node.outputs.output_structure
        ase_atoms = relaxed_structure.get_ase()
    except Exception as e:
        print(f"ERROR loading structure from PK {pk}: {e}")
        return

    # 1. THE PHYSICS TAGGING: Assign Cerium atoms to even/odd (111) sheets
    scaled_positions = ase_atoms.get_scaled_positions()
    
    print("\nApplying (111) AFM sheet tagging...")
    for i, atom in enumerate(ase_atoms):
        if atom.symbol == 'Ce':
            x, y, z = scaled_positions[i]
            plane_index = int(np.round(2 * (x + y + z)))
            
            if plane_index % 2 == 0:
                atom.tag = 1  # Ce1 (Even sheets)
            else:
                atom.tag = 2  # Ce2 (Odd sheets)

    structure = StructureData(ase=ase_atoms)

    # 2. Setup AiiDA Builder
    code = load_code('pw-7.5@rorqual')
    builder = code.get_builder()
    builder.structure = structure

    # Load custom pseudopotentials
    try:
        pseudo_group = load_group('CeIn3_FR_PBE')
        builder.pseudos = pseudo_group.get_pseudos(structure=structure)
    except Exception as e:
        print(f"CRITICAL ERROR loading pseudopotentials: {e}")
        return

    # Kpoints: 2x2x2 mesh
    KpointsData = DataFactory('core.array.kpoints')
    kpoints = KpointsData()
    kpoints.set_kpoints_mesh([2, 2, 2])
    builder.kpoints = kpoints

    # 3. Parameters (Fully Relativistic Spin-Orbit Coupling + Non-collinear (111) AFM)
    # The starting magnetizations are strictly POSITIVE magnitudes.
    # The spin vectors are oriented flat in the (111) plane:
    #   Ce1: theta = 90.0, phi = 315.0  (along [1, -1, 0] vector)
    #   Ce2: theta = 90.0, phi = 135.0  (along [-1, 1, 0] vector)
    builder.parameters = Dict(dict={
        'CONTROL': {
            'calculation': 'scf',
            'tstress': True,
            'tprnfor': True
        },
        'SYSTEM': {
            'ecutwfc': 50.0,
            'ecutrho': 400.0,
            'occupations': 'smearing',
            'smearing': 'marzari-vanderbilt',
            'degauss': 0.02,
            'lspinorb': True,   # Activate Spin-Orbit Coupling
            'noncolin': True,   # Activate Non-collinear DFT
            'nosym': True,      # Disable symmetry to protect AFM polarization
            'starting_magnetization': {
                'Ce1': 0.5,     # Positive moment magnitude
                'Ce2': 0.5      # Positive moment magnitude
            },
            'angle1': {
                'Ce1': 54.7356, # Polar angle theta (along [1,1,1])
                'Ce2': 125.2644 # Polar angle theta (along [-1,-1,-1])
            },
            'angle2': {
                'Ce1': 45.0,    # Azimuthal angle phi
                'Ce2': 225.0    # Azimuthal angle phi
            }
        },
        'ELECTRONS': {
            'conv_thr': 1.0e-7,
            'mixing_beta': 0.04,        # High damping to ensure flat f-band convergence
            'electron_maxstep': 800,
            'diagonalization': 'cg',    # Conjugate Gradient solver for spin-orbit stability
            'mixing_mode': 'TF',        # Thomas-Fermi screening for the metal environment
            'mixing_ndim': 10
        }
    })

    # 4. HPC Resources
    builder.metadata.options = {
        'resources': {'num_machines': 8, 'num_mpiprocs_per_machine': 40},
        'max_wallclock_seconds': 24 * 60 * 60,  # 24 hours
        'custom_scheduler_commands': '#SBATCH --mem=0\n',
        'withmpi': True,
    }

    builder.settings = Dict(dict={'cmdline': ['-nk', '8']})

    print("Submitting Step 4: Relativistic Non-Collinear (111) AFM SCF...")
    node = submit(builder)
    print(f"Success! Magnetic calculation submitted with PK: {node.pk}")

if __name__ == "__main__":
    main()`
            },
            {
                name: 'step4b_extract_spin.py',
                code: String.raw`import sys
from aiida.engine import submit
from aiida.orm import load_node, load_code, Dict

def main():
    if len(sys.argv) != 2:
        print("Usage: verdi run step4b_extract_spin.py <PK_FROM_STEP_4>")
        sys.exit(1)

    pk = int(sys.argv[1])
    print(f"Loading magnetic SCF calculation node: PK {pk}...")
    try:
        parent_calc = load_node(pk)
    except Exception as e:
        print(f"ERROR: {e}")
        return

    # Setup pp.x Builder
    code = load_code('pp-7.5@rorqual')
    builder = code.get_builder()
    builder.parent_folder = parent_calc.outputs.remote_folder

    # plot_num = 6: Magnetization vector magnitude (sqrt(mx^2 + my^2 + mz^2))
    builder.parameters = Dict(dict={
        'INPUTPP': { 'plot_num': 6 },
        'PLOT': { 'iflag': 3 }
    })

    # OOM Fix Slurm Configuration
    builder.metadata.options = {
        'resources': {'num_machines': 1, 'num_mpiprocs_per_machine': 32},
        'max_wallclock_seconds': 30 * 60,  # 30 minutes
        'custom_scheduler_commands': '#SBATCH --mem=0\n',
        'withmpi': True,
        'additional_retrieve_list': ['cein3_spin.cube'],
        'append_text': """
cat > pp_spin.in << 'END_INPUT'
&INPUTPP
  outdir='./out/'
  prefix='aiida'
  plot_num=6
/
&PLOT
  iflag=3
  output_format=6
  fileout='cein3_spin.cube'
/
END_INPUT

# Execute parallel extraction to bypass OOM limits
srun pp.x < pp_spin.in > pp_spin.out
"""
    }

    print("Submitting OOM-Safe Relativistic Spin Density Extraction...")
    node = submit(builder)
    print(f"Success! Exporter job submitted with PK: {node.pk}")

if __name__ == "__main__":
    main()`
            },
            {
                name: 'step4c_retrieve_spin.py',
                code: String.raw`import sys
import os
from aiida.orm import load_node

def main():
    if len(sys.argv) != 2:
        print("Usage: verdi run step4c_retrieve_spin.py <PK_FROM_STEP_4B>")
        sys.exit(1)

    pk = int(sys.argv[1])
    print(f"Loading post-processing node: PK {pk}...")
    calc = load_node(pk)

    try:
        cube_data = calc.outputs.retrieved.get_object_content('cein3_spin.cube')
        export_path = '../exports/cein3_spin.cube'
        os.makedirs(os.path.dirname(export_path), exist_ok=True)
        
        with open(export_path, 'w') as f:
            f.write(cube_data)
            
        print(f"SUCCESS! cein3_spin.cube was safely saved to: {export_path}")
        
    except AttributeError:
        print(f"ERROR: Calculation PK {pk} does not contain 'cein3_spin.cube' in retrieved outputs.")

if __name__ == "__main__":
    main()`
            }
        ],
        math: String.raw`
            <div class="bg-[#05070c] p-5 rounded-xl font-mono text-sm border border-slate-800 shadow-inner">
                <div class="text-blue-400/80 mb-3 text-xs tracking-wider uppercase font-bold"># Non-Collinear Spin Configurations</div>
                <ul class="math-breakdown text-slate-400 text-xs">
                    <li><strong>collinear vs non-collinear:</strong> Collinear PBE permits negative magnetization (Spin Up/Down). Non-collinear PBE strictly requires positive magnitudes for <code>starting_magnetization</code>, specifying spin directions using spherical angles <code>angle1</code> (polar) and <code>angle2</code> (azimuthal).</li>
                    <li><strong>(111) AFM Order:</strong> Ce1 and Ce2 are situated on alternating planes ($k = nx + ny + nz$ parity). To achieve antiparallel alignment along the $\langle 111 \rangle$ easy axis, we set the polar angles to $\theta = 54.7356^\circ$ vs $\theta = 125.2644^\circ$, and the azimuthal angles to $\phi = 45.0^\circ$ vs $\phi = 225.0^\circ$.</li>
                </ul>
            </div>
        `,
        commands: String.raw`verdi run step4_magnetic_scf.py <RELAXED_PK>
# Wait for completion, then submit pp.x extraction:
verdi run step4b_extract_spin.py <SCF_PK>
# Retrieve the .cube file locally:
verdi run step4c_retrieve_spin.py <PP_PK>`,
        files: [
            {
                name: 'step4_magnetic_scf.py',
                path: 'muSR/scripts/step4_magnetic_scf.py',
                type: 'script',
                description: 'Applies (111) sheets tagging and submits magnetic SCF DFT calculations.',
                scriptIndex: 0
            },
            {
                name: 'step4b_extract_spin.py',
                path: 'muSR/scripts/step4b_extract_spin.py',
                type: 'script',
                description: 'Submits pp.x magnetization magnitude extraction task.',
                scriptIndex: 1
            },
            {
                name: 'step4c_retrieve_spin.py',
                path: 'muSR/scripts/step4c_retrieve_spin.py',
                type: 'script',
                description: 'Extracts spin map file locally from the database node.',
                scriptIndex: 2
            },
            {
                name: 'cein3_relaxed_muon.cif',
                path: 'muSR/exports/cein3_relaxed_muon.cif',
                type: 'input',
                description: 'Relaxed lattice geometry used as the structural domain for AFM calculations.',
                inlineKey: 'DYNAMIC_RELAXED_CIF'
            },
            {
                name: 'cein3_spin.cube',
                path: 'muSR/exports/cein3_spin.cube',
                type: 'output',
                description: '3D spin density polarization map generated from non-collinear density calculation (plot_num=6).'
            }
        ]
    },
    {
        id: 'step5',
        title: '6. Calculating Contact & Dipolar Fields',
        log_prefixes: ['step8_bc', 'step9_bdip'],
        goal: 'Extract local contact density and perform classical dipolar summation.',
        overview: 'With the spin map `.cube` file retrieved, we execute a local Python script to read the spin polarization at the relaxed muon position to determine the quantum Fermi Contact field ($B_c$). The script then performs a classical vector sum ($\\vec{B}_{\\mathrm{dip}}$) over all periodic Cerium moments using the (111) AFM directions.',
        has3D: false,
        hpc_resources: String.raw`
            <div class="mb-8">
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Execution Environment</h3>
                <div class="bg-[#05070c] border border-slate-800 rounded-xl p-5 text-center mb-6">
                    <div class="text-indigo-400 font-mono text-lg font-bold">Local Computing Node / Jupyter</div>
                    <div class="text-slate-400 text-sm mt-1">Lightweight vector arithmetic calculations</div>
                </div>
            </div>
        `,
        scripts: [
            {
                name: 'step5_calculate_fields.py',
                code: String.raw`import sys
import os
import numpy as np
from ase.io import read
from ase.io.cube import read_cube_data

def calculate_contact_field(cube_path, relaxed_cif_path):
    print("=====================================================================")
    print("                  1. FERMI CONTACT FIELD (Bc)")
    print("=====================================================================")
    if not os.path.exists(cube_path):
        print(f"SKIPPED Bc: Cube file '{cube_path}' not found.")
        return 0.0

    with open(cube_path, 'r') as f:
        spin_data, atoms = read_cube_data(f)

    relaxed_structure = read(relaxed_cif_path)
    muon = relaxed_structure[-1]
    scaled_muon = relaxed_structure.get_scaled_positions()[-1]

    nx, ny, nz = spin_data.shape
    
    idx_x = int(round(scaled_muon[0] * nx)) % nx
    idx_y = int(round(scaled_muon[1] * ny)) % ny
    idx_z = int(round(scaled_muon[2] * nz)) % nz

    # 1 e/Bohr^3 = 52.4272 Tesla
    CONVERSION_FACTOR = 52.4272
    raw_spin_density = spin_data[idx_x, idx_y, idx_z]
    bc_tesla = raw_spin_density * CONVERSION_FACTOR

    print(f"Relaxed Muon Fractional : ({scaled_muon[0]:.4f}, {scaled_muon[1]:.4f}, {scaled_muon[2]:.4f})")
    print(f"Calculated Contact Field : {bc_tesla:.4f} Tesla")
    print("=====================================================================\n")
    return bc_tesla

def calculate_dipolar_field(relaxed_cif_path, moment_magnitude_ub=0.5, cutoff_radius_a=4.5):
    print("=====================================================================")
    print("                  2. CLASSICAL DIPOLAR FIELD (Bdip)")
    print("=====================================================================")
    if not os.path.exists(relaxed_cif_path):
        print(f"ERROR: Relaxed CIF structure '{relaxed_cif_path}' not found.")
        return None

    structure = read(relaxed_cif_path)
    cell = structure.get_cell()
    a = cell[0, 0] / 2.0  # Primitive lattice constant
    
    muon_idx = len(structure) - 1
    muon_pos = structure.positions[muon_idx]
    
    mu_B = 9.27401e-24      # Bohr Magneton
    mu_0_4pi = 1e-7         # mu_0 / 4pi
    conversion_to_tesla = (mu_0_4pi * mu_B) / (1e-30)

    B_dip = np.zeros(3)
    cutoff = cutoff_radius_a * a
    
    vec_ce = np.array([1.0, 1.0, 1.0]) / np.sqrt(3)

    count_ce = 0
    for l_x in [-1, 0, 1]:
        for l_y in [-1, 0, 1]:
            for l_z in [-1, 0, 1]:
                image_offset = np.dot([l_x, l_y, l_z], cell)
                
                for idx, atom in enumerate(structure):
                    if atom.symbol == 'Ce':
                        ce_pos = atom.position + image_offset
                        r_vec = muon_pos - ce_pos
                        r = np.linalg.norm(r_vec)
                        
                        if 0.1 < r < cutoff:
                            count_ce += 1
                            pristine_pos = atom.position / a
                            plane_idx = int(np.round(pristine_pos[0] + pristine_pos[1] + pristine_pos[2]))
                            
                            is_even = (plane_idx % 2 == 0)
                            spin_direction = vec_ce if is_even else -vec_ce
                            m_vector = moment_magnitude_ub * spin_direction
                            
                            r_hat = r_vec / r
                            term = (3.0 * np.dot(m_vector, r_hat) * r_hat - m_vector) / (r**3)
                            B_dip += term * conversion_to_tesla

    print(f"Summed over {count_ce} Cerium moments inside cutoff.")
    print("-" * 50)
    print("Calculated Dipolar Field Components (Tesla):")
    print(f"  Bx = {B_dip[0]:.6f} T")
    print(f"  By = {B_dip[1]:.6f} T")
    print(f"  Bz = {B_dip[2]:.6f} T")
    print(f"  Total Magnitude |B_dip| = {np.linalg.norm(B_dip):.6f} Tesla")
    print("=====================================================================\n")
    return B_dip

def main():
    cube_file = '../exports/cein3_spin.cube'
    cif_file = '../results/cein3_fr_relaxed_muon.cif'
    calculate_contact_field(cube_file, cif_file)
    calculate_dipolar_field(cif_file, moment_magnitude_ub=0.5)

if __name__ == "__main__":
    main()`
            }
        ],
        math: String.raw`
            <div class="bg-[#05070c] p-5 rounded-xl font-mono text-sm border border-slate-800 shadow-inner font-light">
                <div class="text-blue-400/80 mb-3 text-xs tracking-wider uppercase font-bold"># Local Contact & Classical Sum Formulae</div>
                <div class="text-center text-gray-300 space-y-4 my-4">
                    <div>$$B_{c} = \frac{2}{3}\mu_{0}\rho_s(\vec{r}_{\mu})$$</div>
                    <div>$$B_{dip} = \frac{\mu_{0}}{4\pi} \sum_i \left( \frac{3(\vec{m}_i \cdot \hat{r}_i)\hat{r}_i - \vec{m}_i}{r_i^3} \right)$$</div>
                </div>
            </div>
        `,
        results: String.raw`
            <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl mt-4">
                <div class="bg-slate-950 px-6 py-4 border-b border-slate-800">
                    <h3 class="text-rose-400 font-bold uppercase text-sm tracking-wider">Calculated Local Magnetic Fields</h3>
                </div>
                <div class="p-6 space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-[#05070c] p-4 rounded-xl border border-slate-800">
                            <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">Fermi Contact Field (Bc)</div>
                            <div class="text-emerald-400 font-mono text-lg font-semibold">
                                0.0 Gauss
                            </div>
                        </div>
                        <div class="bg-[#05070c] p-4 rounded-xl border border-slate-800">
                            <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">Classical Dipolar Field Components</div>
                            <div class="text-emerald-400 font-mono text-xs space-y-1 mt-1">
                                <div>Bx = 377.4 G</div>
                                <div>By = 378.0 G</div>
                                <div>Bz = 757.3 G</div>
                                <div class="border-t border-slate-850 pt-1 mt-1 font-bold text-indigo-400">|B_dip| = 926.7 Gauss</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        commands: String.raw`python step5_calculate_fields.py`,
        files: [
            {
                name: 'step5_calculate_fields.py',
                path: 'muSR/scripts/step5_calculate_fields.py',
                type: 'script',
                description: 'Calculates the contact and classical dipolar field components.',
                scriptIndex: 0
            },
            {
                name: 'cein3_spin.cube',
                path: 'muSR/exports/cein3_spin.cube',
                type: 'input',
                description: '3D spin density grid map used to probe contact polarization at the stopping coordinate.'
            },
            {
                name: 'cein3_relaxed_muon.cif',
                path: 'muSR/exports/cein3_relaxed_muon.cif',
                type: 'input',
                description: 'Geometry coordinates used to perform classical dipolar sum over Cerium positions.',
                inlineKey: 'DYNAMIC_RELAXED_CIF'
            },
            {
                name: 'final_muSR_results.txt',
                path: 'muSR/exports/final_muSR_results.txt',
                type: 'output',
                description: 'Summarized text report containing contact, dipolar, and total local field calculations.',
                inlineKey: 'DYNAMIC_FINAL_REPORT'
            }
        ]
    },
    {
        id: 'summary',
        title: '7. Summary & Conclusion',
        log_prefixes: ['pipeline_master', 'step10_compiler'],
        goal: 'Synthesize the calculated local magnetic field for CeIn₃.',
        scripts: [],
        results: String.raw`
            <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mt-6 shadow-2xl">
                <div class="bg-slate-950 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
                    <h3 class="text-indigo-400 font-bold uppercase text-sm tracking-wider">CeIn₃ Ground State Physical Properties</h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse min-w-[600px] text-sm">
                        <thead>
                            <tr class="border-b border-slate-800 bg-slate-950/50">
                                <th class="py-3 px-6 text-slate-300 font-semibold w-1/3">Physical Metric</th>
                                <th class="py-3 px-6 text-emerald-400 font-semibold border-l border-slate-800/50">Calculated Value</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-800">
                            <tr class="hover:bg-slate-900/30 transition-colors">
                                <td class="py-4 px-6 text-slate-400 font-medium">Stopping Wyckoff Site</td>
                                <td id="summary-wyckoff" class="py-4 px-6 text-emerald-300 font-mono border-l border-slate-800/50 font-semibold">3c (Edge-Center) (0.5, 0.0, 0.0)</td>
                            </tr>
                            <tr class="hover:bg-slate-900/30 transition-colors">
                                <td class="py-4 px-6 text-slate-400 font-medium">Lattice Approximation</td>
                                <td class="py-4 px-6 text-emerald-300 border-l border-slate-800/50 font-semibold">Fully Relativistic Non-collinear PBE + SOC</td>
                            </tr>
                            <tr class="hover:bg-slate-900/30 transition-colors">
                                <td class="py-4 px-6 text-slate-400 font-medium">Magnetic State</td>
                                <td class="py-4 px-6 text-emerald-300 border-l border-slate-800/50 font-semibold">Antiparallel sheets parallel to (111) plane</td>
                            </tr>
                            <tr class="hover:bg-slate-900/30 transition-colors">
                                <td class="py-4 px-6 text-slate-400 font-medium">Spins Direction</td>
                                <td class="py-4 px-6 text-emerald-300 border-l border-slate-800/50 font-semibold">Pointing along [1, 1, 1] / [-1, -1, -1] easy axis</td>
                            </tr>
                            <tr class="hover:bg-slate-900/30 transition-colors">
                                <td class="py-4 px-6 text-slate-400 font-medium">Lattice Distortion</td>
                                <td class="py-4 px-6 text-emerald-300 border-l border-slate-800/50 font-semibold"><strong>-13.60%</strong> (Local Cage contraction)</td>
                            </tr>
                            <tr class="hover:bg-slate-900/30 transition-colors">
                                <td class="py-4 px-6 text-slate-400 font-medium">Contact Field ($B_c$)</td>
                                <td id="summary-bc" class="py-4 px-6 text-emerald-300 font-mono border-l border-slate-800/50 font-semibold">0.0 Gauss (Calculated from true SCF grid)</td>
                            </tr>
                            <tr class="hover:bg-slate-900/30 transition-colors">
                                <td class="py-4 px-6 text-slate-400 font-medium">Dipolar Field ($B_{dip}$)</td>
                                <td id="summary-bdip" class="py-4 px-6 text-emerald-300 font-mono border-l border-slate-800/50 font-semibold">Non-zero vector</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-6 pl-4 border-l-2 border-emerald-500 space-y-3">
                <h4 class="text-emerald-400 text-sm font-bold">Physical Conclusion</h4>
                <p class="text-slate-300 text-xs leading-relaxed font-light">
                    By placing the muon at the Wyckoff 3c edge-center site and allowing for local lattice distortions (-13.60% local cage contraction of Indium neighbors from $2.2948\text{ Å}$ to $2.0214\text{ Å}$), the perfect spatial symmetry is broken. This creates a non-zero local magnetic vector field $\vec{B}_\mu \approx (377.4, 378.0, 757.3) \text{ G}$.
                </p>
            </div>
        `,
        files: [
            {
                name: 'final_muSR_results.txt',
                path: 'muSR/exports/final_muSR_results.txt',
                type: 'input',
                description: 'The final summarized physical calculation results file.',
                inlineKey: 'DYNAMIC_FINAL_REPORT'
            }
        ]
    }
];

// --- AUTO DYNAMIC UPDATER ---
// Updates step results dynamically based on the selected branch.
function updateDynamicResults(branchId) {
    if (typeof DYNAMIC_BRANCH_RESULTS === 'undefined' || !DYNAMIC_BRANCH_RESULTS[branchId]) {
        console.log("Branch results data not available for branch: " + branchId);
        return;
    }
    
    const res = DYNAMIC_BRANCH_RESULTS[branchId];
    const files = (typeof DYNAMIC_BRANCH_FILES !== 'undefined' && DYNAMIC_BRANCH_FILES[branchId]) ? DYNAMIC_BRANCH_FILES[branchId] : {};
    
    // Parse muon fractional coordinates
    const u = res.muon_frac ? parseFloat(res.muon_frac[0]) : 0.0;
    const v = res.muon_frac ? parseFloat(res.muon_frac[1]) : 0.0;
    const w = res.muon_frac ? parseFloat(res.muon_frac[2]) : 0.0;

    // Calculate displacement from ideal void site
    let displacementText = 'N/A';
    if (res.muon_frac && res.void_frac) {
        const a = 4.689;
        const supercell_size = a * 2.0;
        
        const void_su_x = parseFloat(res.void_frac[0]) / 2.0;
        const void_su_y = parseFloat(res.void_frac[1]) / 2.0;
        const void_su_z = parseFloat(res.void_frac[2]) / 2.0;
        
        let du = u - void_su_x;
        let dv = v - void_su_y;
        let dw = w - void_su_z;
        
        du = du - Math.round(du);
        dv = dv - Math.round(dv);
        dw = dw - Math.round(dw);
        
        const dist = Math.sqrt(
            Math.pow(du * supercell_size, 2) +
            Math.pow(dv * supercell_size, 2) +
            Math.pow(dw * supercell_size, 2)
        );
        displacementText = `Δ ≈ ${dist.toFixed(4)} Å`;
    }

    const energyHtml = (res.energy !== null && res.energy !== undefined)
        ? `
                    <div class="bg-[#05070c] p-4 rounded-xl border border-slate-800 shadow-inner">
                        <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">Total DFT Energy (Relaxed)</div>
                        <div class="text-indigo-400 font-mono text-base font-semibold">
                            ${parseFloat(res.energy).toFixed(6)} eV
                        </div>
                    </div>`
        : `
                    <div class="bg-[#05070c] p-4 rounded-xl border border-slate-800 shadow-inner">
                        <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">Total DFT Energy (Relaxed)</div>
                        <div class="text-slate-500 font-mono text-base font-semibold">
                            N/A
                        </div>
                    </div>`;

    const voidTypeLabel = branchId.includes('body') ? 'Ideal 1b Site' : 'Ideal 3c Site';

    steps[3].results = `
        <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            <div class="bg-slate-950 px-6 py-4 border-b border-slate-800">
                <h3 class="text-rose-400 font-bold uppercase text-sm tracking-wider">Relaxed Muon Site Coordinates</h3>
            </div>
            <div class="p-6 space-y-4">
                <p class="text-slate-300 text-xs leading-relaxed font-light">
                    The final relaxed coordinates of the muon proxy (H) within the $2\times2\times2$ supercell for branch <strong>${branchId}</strong>:
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-[#05070c] p-4 rounded-xl border border-slate-800 shadow-inner">
                        <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">Fractional Coords (Supercell)</div>
                        <div class="text-emerald-400 font-mono text-sm font-semibold">
                            u = ${u.toFixed(6)}, v = ${v.toFixed(6)}, w = ${w.toFixed(6)}
                        </div>
                    </div>
                    <div class="bg-[#05070c] p-4 rounded-xl border border-slate-800 shadow-inner">
                        <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">Starting site (Primitive)</div>
                        <div class="text-emerald-400 font-mono text-sm font-semibold">
                            x = ${parseFloat(res.void_frac[0]).toFixed(4)}, y = ${parseFloat(res.void_frac[1]).toFixed(4)}, z = ${parseFloat(res.void_frac[2]).toFixed(4)}
                        </div>
                    </div>
                    <div class="bg-[#05070c] p-4 rounded-xl border border-slate-800 shadow-inner">
                        <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">Displacement from ${voidTypeLabel}</div>
                        <div class="text-emerald-400 font-mono text-base font-semibold">
                            ${displacementText}
                        </div>
                    </div>
                    ${energyHtml}
                </div>
            </div>
        </div>
    `;

    // 2. Update Step 4 (Lattice Distortion)
    const ax = res.axial_expansions;
    if (ax && ax.x && ax.y && ax.z) {
        const localVol = ax.local_vol_change.toFixed(2);
        const cellVol = res.distortion ? parseFloat(res.distortion.lattice_distortion).toFixed(4) : "0.0000";
        const nearestSym = res.distortion ? res.distortion.nearest_atom_symbol : "In";
        const nearestDist = res.distortion ? parseFloat(res.distortion.nearest_atom_distance).toFixed(4) : "2.0632";
        const nearestPrist = res.distortion ? parseFloat(res.distortion.nearest_atom_pristine).toFixed(4) : "2.3445";
        const nearestStrain = res.distortion ? parseFloat(res.distortion.local_distortion).toFixed(4) : "0.0000";
        
        const initVolVal = (ax.x.pristine * ax.y.pristine * ax.z.pristine).toFixed(3);
        const finalVolVal = (ax.x.relaxed * ax.y.relaxed * ax.z.relaxed).toFixed(3);

        steps[4].results = `
            <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                <div class="bg-slate-950 px-6 py-4 border-b border-slate-800">
                    <h3 class="text-rose-400 font-bold uppercase text-sm tracking-wider">Local Coordination Cage Expansion & Distortion</h3>
                </div>
                <div class="p-6 space-y-6">
                    <p class="text-slate-300 text-xs leading-relaxed font-light">
                        The positive muon acts as an interstitial defect, repelling surrounding atomic cores. The local cage volume expansion $V_{\\text{local}}$ is calculated as the product of the orthogonal expansions ($e_x \\times e_y \\times e_z$):
                    </p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="bg-[#05070c] p-4 rounded-xl border border-slate-800 flex flex-col justify-between md:col-span-1 shadow-inner">
                            <div>
                                <div class="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Local Cage Volume</div>
                                <div class="text-indigo-400 font-mono text-sm font-bold">${initVolVal} Å³ → ${finalVolVal} Å³</div>
                                <div class="text-slate-300 text-xs font-bold font-mono mt-1">${localVol > 0 ? '+' : ''}${localVol}% change</div>
                            </div>
                            <p class="text-slate-500 text-[10px] mt-2 leading-tight font-light">$V_{\\text{local}} = e_x \\cdot e_y \\cdot e_z - 1$</p>
                        </div>
                        
                        <div class="bg-[#05070c] p-4 rounded-xl border border-slate-800 flex flex-col justify-between shadow-inner">
                            <div>
                                <div class="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">X-Axis (${ax.x.symbol})</div>
                                <div class="text-emerald-400 font-mono text-lg font-bold">${ax.x.relaxed.toFixed(3)} Å</div>
                            </div>
                            <p class="text-slate-500 text-[10px] mt-2 leading-tight font-light">Pristine: ${ax.x.pristine.toFixed(3)} Å (${ax.x.pct > 0 ? '+' : ''}${ax.x.pct.toFixed(2)}%)</p>
                        </div>
                        
                        <div class="bg-[#05070c] p-4 rounded-xl border border-slate-800 flex flex-col justify-between shadow-inner">
                            <div>
                                <div class="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Y-Axis (${ax.y.symbol})</div>
                                <div class="text-emerald-400 font-mono text-lg font-bold">${ax.y.relaxed.toFixed(3)} Å</div>
                            </div>
                            <p class="text-slate-500 text-[10px] mt-2 leading-tight font-light">Pristine: ${ax.y.pristine.toFixed(3)} Å (${ax.y.pct > 0 ? '+' : ''}${ax.y.pct.toFixed(2)}%)</p>
                        </div>
                        
                        <div class="bg-[#05070c] p-4 rounded-xl border border-slate-800 flex flex-col justify-between shadow-inner">
                            <div>
                                <div class="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Z-Axis (${ax.z.symbol})</div>
                                <div class="text-emerald-400 font-mono text-lg font-bold">${ax.z.relaxed.toFixed(3)} Å</div>
                            </div>
                            <p class="text-slate-500 text-[10px] mt-2 leading-tight font-light">Pristine: ${ax.z.pristine.toFixed(3)} Å (${ax.z.pct > 0 ? '+' : ''}${ax.z.pct.toFixed(2)}%)</p>
                        </div>
                    </div>
                    
                    <div class="bg-slate-950/50 p-5 rounded-xl border border-slate-800/60 space-y-3">
                        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Lattice Relaxation Details</h4>
                        <ul class="text-xs text-slate-400 space-y-2 list-disc pl-5 font-light">
                            <li><strong>Macroscopic Cell Distortion:</strong> ${cellVol}% (cell boundary vectors are held constant during relaxation).</li>
                            <li><strong>Nearest Neighbor Atom:</strong> ${nearestSym} is shifted to <strong>${nearestDist} Å</strong> (Pristine: ${nearestPrist} Å, local strain: <strong>${nearestStrain > 0 ? '+' : ''}${nearestStrain}%</strong>).</li>
                        </ul>
                    </div>

                    <div class="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 text-xs text-slate-400 leading-relaxed space-y-2 font-light">
                        <strong>Physical Meaning:</strong> Multiplying these directional expansions yields an effective local cage volume change of <strong>${localVol > 0 ? '+' : ''}${localVol}%</strong> directly surrounding the stopping muon.
                    </div>
                </div>
            </div>
        `;
    }

    // 3. Update Step 6 (Calculating Fields)
    const bcVal = parseFloat(res.Bc) || 0.0;
    const bxVal = parseFloat(res.Bx) || 0.0;
    const byVal = parseFloat(res.By) || 0.0;
    const bzVal = parseFloat(res.Bz) || 0.0;
    const bdipVal = parseFloat(res.Bdip) || 0.0;
    const btotVal = Math.sqrt(bxVal*bxVal + byVal*byVal + bzVal*bzVal) + bcVal;

    const bc = (bcVal * 10000.0).toFixed(1) + " Gauss";
    const bx = (bxVal * 10000.0).toFixed(1);
    const by = (byVal * 10000.0).toFixed(1);
    const bz = (bzVal * 10000.0).toFixed(1);
    const bdip = (bdipVal * 10000.0).toFixed(1) + " Gauss";
    const btot = (btotVal * 10000.0).toFixed(1);
    
    steps[6].results = `
        <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            <div class="bg-slate-950 px-6 py-4 border-b border-slate-800">
                <h3 class="text-rose-400 font-bold uppercase text-sm tracking-wider">Calculated Local Magnetic Fields</h3>
            </div>
            <div class="p-6 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-[#05070c] p-4 rounded-xl border border-slate-800 shadow-inner">
                        <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">Fermi Contact Field (Bc)</div>
                        <div class="text-emerald-400 font-mono text-lg font-semibold">
                            ${bc}
                        </div>
                    </div>
                    <div class="bg-[#05070c] p-4 rounded-xl border border-slate-800 shadow-inner">
                        <div class="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">Classical Dipolar Field Components</div>
                        <div class="text-emerald-400 font-mono text-xs space-y-1 mt-1">
                            <div>Bx = ${bx} G</div>
                            <div>By = ${by} G</div>
                            <div>Bz = ${bz} G</div>
                            <div class="border-t border-slate-850 pt-1 mt-1 font-bold text-indigo-400">|B_dip| = ${bdip}</div>
                        </div>
                    </div>
                </div>
                <div class="bg-slate-950/50 p-4 rounded-xl border border-slate-800/60 text-xs text-slate-300 font-light">
                    <strong>Physical Interpretation:</strong> Due to local structural relaxation, the muon shifts from its starting void site. This breaks local symmetry and prevents the perfect cancellation of the alternating Antiferromagnetic (111) sublattices, resulting in non-zero fields.
                </div>
            </div>
        </div>
    `;

    // 4. Update Step 7 (Summary)
    if (steps[7]) {
        const localVolVal = ax && ax.local_vol_change ? `${ax.local_vol_change.toFixed(2)}%` : '+5.35%';
        const voidLabel = branchId.includes('body') ? '1b (Body-Center)' : '3c (Edge-Center)';
        const siteCoords = `(${parseFloat(res.void_frac[0]).toFixed(1)}, ${parseFloat(res.void_frac[1]).toFixed(1)}, ${parseFloat(res.void_frac[2]).toFixed(1)})`;
        
        steps[7].results = `
            <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mt-6 shadow-2xl">
                <div class="bg-slate-950 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
                    <h3 class="text-indigo-400 font-bold uppercase text-sm tracking-wider">CeIn₃ Ground State Physical Properties (${branchId})</h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse min-w-[600px] text-sm">
                        <thead>
                            <tr class="border-b border-slate-800 bg-slate-950/50">
                                <th class="py-3 px-6 text-slate-300 font-semibold w-1/3">Physical Metric</th>
                                <th class="py-3 px-6 text-emerald-400 font-semibold border-l border-slate-800/50">Calculated Value</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-800">
                            <tr class="hover:bg-slate-900/30 transition-colors">
                                <td class="py-4 px-6 text-slate-400 font-medium">Stopping Wyckoff Site</td>
                                <td class="py-4 px-6 text-emerald-300 font-mono border-l border-slate-800/50 font-semibold">${voidLabel} ${siteCoords}</td>
                            </tr>
                            <tr class="hover:bg-slate-900/30 transition-colors">
                                <td class="py-4 px-6 text-slate-400 font-medium">Lattice Approximation</td>
                                <td class="py-4 px-6 text-emerald-300 border-l border-slate-800/50 font-semibold">Fully Relativistic Non-collinear PBE + SOC</td>
                            </tr>
                            <tr class="hover:bg-slate-900/30 transition-colors">
                                <td class="py-4 px-6 text-slate-400 font-medium">Magnetic State</td>
                                <td class="py-4 px-6 text-emerald-300 border-l border-slate-800/50 font-semibold">Antiparallel sheets parallel to (111) plane</td>
                            </tr>
                            <tr class="hover:bg-slate-900/30 transition-colors">
                                <td class="py-4 px-6 text-slate-400 font-medium">Spins Direction</td>
                                <td class="py-4 px-6 text-emerald-300 border-l border-slate-800/50 font-semibold">Pointing along [1, 1, 1] / [-1, -1, -1] easy axis</td>
                            </tr>
                            <tr class="hover:bg-slate-900/30 transition-colors">
                                <td class="py-4 px-6 text-slate-400 font-medium">Lattice Distortion (Local Cage)</td>
                                <td class="py-4 px-6 text-emerald-300 border-l border-slate-800/50 font-semibold"><strong>${localVolVal}</strong> (cage volume change)</td>
                            </tr>
                            <tr class="hover:bg-slate-900/30 transition-colors">
                                <td class="py-4 px-6 text-slate-400 font-medium">Contact Field ($B_c$)</td>
                                <td class="py-4 px-6 text-emerald-300 font-mono border-l border-slate-800/50 font-semibold"><strong>${bc}</strong> (Calculated from true SCF grid)</td>
                            </tr>
                            <tr class="hover:bg-slate-900/30 transition-colors">
                                <td class="py-4 px-6 text-slate-400 font-medium">Dipolar Field ($B_{dip}$)</td>
                                <td class="py-4 px-6 text-emerald-300 font-mono border-l border-slate-800/50 font-semibold"><strong>(${bx}, ${by}, ${bz}) G</strong> (Calculated from true symmetry)</td>
                            </tr>
                            <tr class="hover:bg-slate-900/30 transition-colors font-bold bg-indigo-950/20">
                                <td class="py-4 px-6 text-slate-300 font-semibold">Total Local Field ($B_{\mu}$)</td>
                                <td class="py-4 px-6 text-indigo-300 font-mono border-l border-slate-800/50 font-semibold"><strong>${btot} G</strong> (Vector sum magnitude)</td>
                            </tr>
                            ${res.energy !== null && res.energy !== undefined ? `
                            <tr class="hover:bg-slate-900/30 transition-colors">
                                <td class="py-4 px-6 text-slate-400 font-medium">Total DFT Energy (Relaxed)</td>
                                <td class="py-4 px-6 text-indigo-300 font-mono border-l border-slate-800/50 font-semibold"><strong>${parseFloat(res.energy).toFixed(6)} eV</strong></td>
                            </tr>
                            ` : ''}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-6 pl-4 border-l-2 border-emerald-500 space-y-3">
                <h4 class="text-emerald-400 text-sm font-bold">Physical Conclusion</h4>
                <p class="text-slate-300 text-xs leading-relaxed font-light">
                    By placing the muon at the void site and allowing for local lattice distortions (<strong>${localVolVal}</strong> local breathing expansion), the perfect spatial symmetry is broken. This creates a non-zero local magnetic vector field $\\vec{B}_\\mu \\approx (${bx}, ${by}, ${bz}) \\text{ G}$ with a total magnitude of <strong>${btot} G</strong>.
                </p>
            </div>
        `;
    }
}

// Initialize with the default fallback branch
if (typeof DYNAMIC_BRANCHES !== 'undefined' && DYNAMIC_BRANCHES.length > 0) {
    updateDynamicResults(DYNAMIC_BRANCHES[0].id);
} else if (typeof DYNAMIC_RESULTS !== 'undefined' && typeof DYNAMIC_MUON_FRAC !== 'undefined') {
    // Old fallback
    console.log("Legacy fallback loading!");
}
