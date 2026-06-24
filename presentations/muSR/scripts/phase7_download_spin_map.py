import sys, os
from aiida.orm import load_node

pk = int(sys.argv[1])
export_dir = sys.argv[2] if len(sys.argv) > 2 else '../exports'
calc = load_node(pk)

cube_data = None
for fname in calc.outputs.retrieved.list_object_names():
    if fname.endswith('.cube') or fname.endswith('.filplot') or fname.endswith('.fileout'):
        cube_data = calc.outputs.retrieved.get_object_content(fname)
        break

if cube_data is None:
    cube_data = calc.outputs.retrieved.get_object_content('aiida.out')

os.makedirs(export_dir, exist_ok=True)
export_path = os.path.join(export_dir, 'cein3_spin.cube')
with open(export_path, 'w') as f:
    f.write(cube_data)

print(f"Success! Spin density map safely exported to {export_path}.")
