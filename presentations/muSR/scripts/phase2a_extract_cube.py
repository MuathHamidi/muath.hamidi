import sys
from aiida.orm import load_node

pk = int(sys.argv[1])
calc = load_node(pk)

cube_data = calc.outputs.retrieved.get_object_content('cein3_electrostatic.cube')
with open('../exports/cein3_electrostatic.cube', 'w') as f:
    f.write(cube_data)
print("Success! Map safely in exports folder.")
