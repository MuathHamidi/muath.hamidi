import sys
from aiida.engine import submit
from aiida.orm import load_node, load_code, Dict

pk = int(sys.argv[1])
parent_calc = load_node(pk)

builder = load_code('pp-7.5@rorqual').get_builder()
builder.parent_folder = parent_calc.outputs.remote_folder

# 1. Give AiiDA EXACTLY what it wants natively to pass the validator!
builder.parameters = Dict(dict={
    'INPUTPP': { 
        'plot_num': 6,
        'spin_component': 0  # 0 = Magnitude of magnetization
    },
    'PLOT': { 
        'iflag': 3
        # DO NOT put output_format or fileout here, AiiDA forbids it!
    }
})

# 2. Let AiiDA run natively and retrieve its default cube file!
builder.metadata.options = {
    'resources': {'num_machines': 1, 'num_mpiprocs_per_machine': 32},
    'max_wallclock_seconds': 30 * 60,
    'custom_scheduler_commands': '#SBATCH --mem=0\n',
    'withmpi': True,
    'additional_retrieve_list': ['aiida.fileout']
}

node = submit(builder)
print(f"STEP 6: Secondary PP.x Job Submitted! PK: {node.pk}")
