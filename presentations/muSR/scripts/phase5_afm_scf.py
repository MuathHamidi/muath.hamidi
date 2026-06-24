import sys
import numpy as np
from aiida.engine import submit
from aiida.orm import load_node, load_code, load_group, Dict, StructureData
from aiida.plugins import DataFactory

# 1. Load the PERFECTLY RELAXED supercell from the output trajectory to bypass XML parser bug
pk = int(sys.argv[1])
relax_calc = load_node(pk)
ase_struct = relax_calc.inputs.structure.get_ase()
ase_struct.set_positions(relax_calc.outputs.output_trajectory.get_positions()[-1])
a = 4.689

# 2. THE AFM HACK: Tag alternating (111) planes of Ce atoms
scaled = ase_struct.get_scaled_positions()
for i, atom in enumerate(ase_struct):
    if atom.symbol == 'Ce':
        x, y, z = scaled[i]
        plane = int(np.round(2*(x+y+z)))
        atom.tag = 1 if plane % 2 == 0 else 2 # Ce1 vs Ce2

afm_structure = StructureData(ase=ase_struct)

builder = load_code('pw-7.5@rorqual').get_builder()
builder.structure = afm_structure
builder.pseudos = load_group('CeIn3_FR_PBE').get_pseudos(structure=afm_structure)

builder.kpoints = DataFactory('core.array.kpoints')()
builder.kpoints.set_kpoints_mesh([1, 1, 1])

# 3. Parameters (TURNING ON NONCOLLINEAR AFM!)
builder.parameters = Dict(dict={
    'CONTROL': { 
        'calculation': 'scf',
        'disk_io': 'high'
    },
    'SYSTEM': {
        'ecutwfc': 40.0, 'ecutrho': 200.0,
        'occupations': 'smearing', 'smearing': 'marzari-vanderbilt', 'degauss': 0.02,
        'lspinorb': True, 'noncolin': True, 'nosym': True,
        'starting_magnetization': { 'Ce1': 0.5, 'Ce2': 0.5 },
        'angle1': { 'Ce1': 54.7356, 'Ce2': 125.2644 },
        'angle2': { 'Ce1': 45.0, 'Ce2': 225.0 }
    },
    'ELECTRONS': { 
        'conv_thr': 1.0e-5,
        'mixing_beta': 0.2,
        'electron_maxstep': 100,
        'diagonalization': 'cg',
        'mixing_mode': 'TF',
        'mixing_ndim': 10
    }
})

builder.settings = Dict(dict={'cmdline': ['-nk', '8']})
builder.metadata.options = {
    'resources': {'num_machines': 1, 'num_mpiprocs_per_machine': 32},
    'max_wallclock_seconds': 6 * 60 * 60,
    'custom_scheduler_commands': '#SBATCH --mem=0\n',
    'withmpi': True,
}

node = submit(builder)
print(f"STEP 5 (AFM): G-Type AFM SCF Submitted! PK: {node.pk}")
