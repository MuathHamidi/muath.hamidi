from aiida.engine import submit
from aiida.orm import StructureData, load_code, load_group, Dict
from aiida.plugins import DataFactory
from ase import Atoms

# 1. Build the PRIMITIVE 4-atom CeIn3 Cell
a = 4.689
primitive_cell = Atoms('CeIn3',
    scaled_positions=[(0,0,0), (0.5,0.5,0), (0.5,0,0.5), (0.0,0.5,0.5)],
    cell=[a, a, a], pbc=True)
structure = StructureData(ase=primitive_cell)

# 2. Setup standard SCF calculation
code = load_code('pw-7.5@rorqual')
builder = code.get_builder()
builder.structure = structure
builder.pseudos = load_group('CeIn3_FR_PBE').get_pseudos(structure=structure)

builder.kpoints = DataFactory('core.array.kpoints')()
builder.kpoints.set_kpoints_mesh([8, 8, 8])

builder.parameters = Dict(dict={
    'CONTROL': { 'calculation': 'scf' },
    'SYSTEM': { 'ecutwfc': 50.0, 'ecutrho': 400.0, 'occupations': 'smearing', 'smearing': 'marzari-vanderbilt', 'degauss': 0.02, 'lspinorb': True, 'noncolin': True },
    'ELECTRONS': { 'conv_thr': 1.0e-8 }
})

# 3. Slurm Settings AND The Smuggler Hack!
builder.metadata.options = {
    'resources': {'num_machines': 1, 'num_mpiprocs_per_machine': 32},
    'max_wallclock_seconds': 1 * 60 * 60,
    'custom_scheduler_commands': '#SBATCH --mem=0\n',
    'withmpi': True,
    'additional_retrieve_list': ['cein3_electrostatic.cube'],
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
  fileout='cein3_electrostatic.cube'
/
EOF
pp.x < pp.in > pp.out
"""
}

node = submit(builder)
print(f"THE PERFECT HACK SUBMITTED! PK: {node.pk}")
