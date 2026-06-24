import sys
import numpy as np
from aiida.orm import load_node

pk = int(sys.argv[1])
export_dir = sys.argv[2] if len(sys.argv) > 2 else '../exports'
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
    
    print(f"Nearest Atom       : {nearest_symbol} at {min_final:.4f} A (Pristine: {min_initial:.4f} A, Local distortion: {local_distortion:+.4f} %)")
