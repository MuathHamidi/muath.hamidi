import sys, os
from aiida.orm import load_node

pk = int(sys.argv[1])
export_dir = sys.argv[2] if len(sys.argv) > 2 else '../exports'
calc = load_node(pk)

try:
    os.makedirs(export_dir, exist_ok=True)
    
    # 1. Extract the initial pre-relaxation structure
    pre_atoms = calc.inputs.structure.get_ase()
    pre_relax_path = os.path.join(export_dir, 'cein3_pre_relax.cif')
    pre_atoms.write(pre_relax_path, format='cif')
    print(f"Success! Pre-relaxation supercell saved to: {pre_relax_path}")

    # 2. Extract the final relaxed geometry from the output trajectory to bypass AiiDA's XML parser bug
    ase_atoms = calc.inputs.structure.get_ase()
    ase_atoms.set_positions(calc.outputs.output_trajectory.get_positions()[-1])
    
    # Save it to the branch-specific exports folder as a CIF file
    export_path = os.path.join(export_dir, 'cein3_relaxed_muon.cif')
    ase_atoms.write(export_path, format='cif')
    print(f"Success! Relaxed supercell saved to: {export_path}")
    
    # Peek at the final Muon coordinate
    muon = ase_atoms[-1] # Hydrogen was the last atom we added
    print("-" * 40)
    print(f"Final Muon Cartesian Coordinates (Angstroms):")
    print(f"x = {muon.position[0]:.5f}")
    print(f"y = {muon.position[1]:.5f}")
    print(f"z = {muon.position[2]:.5f}")
    print("-" * 40)

except Exception as e:
    print(f"Error: Could not extract geometry. {e}")
