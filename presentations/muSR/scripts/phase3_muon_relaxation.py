from aiida.engine import submit
from aiida.orm import StructureData, load_code, load_group, Dict
from aiida.plugins import DataFactory
from ase import Atoms
from ase.build import make_supercell
import sys, os

# 1. Build primitive, then expand to 2x2x2 Supercell (32 atoms)
a = 4.689
primitive = Atoms('CeIn3', scaled_positions=[(0,0,0), (0.5,0.5,0), (0.5,0,0.5), (0.0,0.5,0.5)], cell=[a,a,a])
supercell = make_supercell(primitive, [[2,0,0], [0,2,0], [0,0,2]])

# 2. THE INJECTION: Drop Muon into void (coordinates and jitter passed as arguments)
frac_x, frac_y, frac_z = float(sys.argv[1]), float(sys.argv[2]), float(sys.argv[3])
jitter_x, jitter_y, jitter_z = float(sys.argv[4]), float(sys.argv[5]), float(sys.argv[6])
export_dir = sys.argv[7] if len(sys.argv) > 7 else '../exports'

supercell.append('H')
# Fractional coordinates are in primitive cell units; multiply by lattice parameter for Cartesian
# Then add jitter in Angstroms for symmetry-breaking
supercell.positions[-1] = [frac_x * a + jitter_x, frac_y * a + jitter_y, frac_z * a + jitter_z]

# 2b. Export the PRE-RELAXATION supercell structure as CIF
os.makedirs(export_dir, exist_ok=True)
pre_relax_path = os.path.join(export_dir, 'cein3_pre_relax.cif')
supercell.write(pre_relax_path, format='cif')
print(f"Pre-relaxation CIF saved to: {pre_relax_path}")
print(f"Muon placed at Cartesian: ({supercell.positions[-1][0]:.5f}, {supercell.positions[-1][1]:.5f}, {supercell.positions[-1][2]:.5f}) Angstroms")
print(f"Jitter applied: ({jitter_x}, {jitter_y}, {jitter_z}) Angstroms")

builder = load_code('pw-7.5@rorqual').get_builder()
builder.structure = StructureData(ase=supercell)
builder.pseudos = load_group('SSSP/1.3/PBE/efficiency').get_pseudos(structure=builder.structure)

builder.kpoints = DataFactory('core.array.kpoints')()
builder.kpoints.set_kpoints_mesh([1, 1, 1])

builder.parameters = Dict(dict={
    'CONTROL': { 'calculation': 'relax', 'forc_conv_thr': 1.0e-3 },
    'SYSTEM': { 
        'ecutwfc': 40.0, 'ecutrho': 320.0, 
        'occupations': 'smearing', 'smearing': 'marzari-vanderbilt', 'degauss': 0.02, 
        'lspinorb': False, 'noncolin': False, 'nspin': 2, 'nosym': True,
        'starting_magnetization': { 'Ce': 0.5 }
    },
    'ELECTRONS': { 
        'conv_thr': 1.0e-5, 
        'mixing_beta': 0.2, 
        'electron_maxstep': 150,
        'diagonalization': 'david',
        'mixing_mode': 'TF'
    },
    'IONS': { 'ion_dynamics': 'bfgs' }
})

# 3. K-point pooling and memory settings for the supercell
builder.settings = Dict(dict={'cmdline': ['-nk', '1']})
builder.metadata.options = {
    'resources': {'num_machines': 1, 'num_mpiprocs_per_machine': 32},
    'max_wallclock_seconds': 4 * 60 * 60,
    'custom_scheduler_commands': '#SBATCH --mem=0\n',
    'withmpi': True,
}

node = submit(builder)
print(f"STEP 3: Muon Supercell Relaxation Submitted! PK: {node.pk}")
