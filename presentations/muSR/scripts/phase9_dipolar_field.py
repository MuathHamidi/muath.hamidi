import os
import sys
import numpy as np
from ase.io import read

mu_B = 9.274e-24  
mu_0_4pi = 1e-7   
conversion = (mu_0_4pi * mu_B) / (1e-30) 

# Accept branch-specific export directory
export_dir = sys.argv[1] if len(sys.argv) > 1 else '../exports'

# Load the relaxed structure (2x2x2 supercell with muon)
cif_path = os.path.join(export_dir, 'cein3_relaxed_muon.cif')
if not os.path.exists(cif_path):
    print(f"Error: Relaxed structure {cif_path} not found.")
    sys.exit(1)

structure = read(cif_path)
cell = structure.get_cell()
# The lattice parameter of the primitive cell is half of the supercell cell vector
a = cell[0, 0] / 2.0

# Find muon index (H)
muon_indices = [atom.index for atom in structure if atom.symbol == 'H']
if not muon_indices:
    print("Error: No muon (H) found in structure.")
    sys.exit(1)
muon_idx = muon_indices[0]
muon_pos = structure.positions[muon_idx]

B_dip = np.zeros(3)
cutoff_radius = 4.4 * a

# Direction of the magnetic moment for Ce1 and Ce2 along [1, 1, 1] / [-1, -1, -1]
vec = np.array([1.0, 1.0, 1.0]) / np.sqrt(3)

# Sum over periodic images of the 2x2x2 supercell to ensure convergence
for l_x in [-2, -1, 0, 1, 2]:
    for l_y in [-2, -1, 0, 1, 2]:
        for l_z in [-2, -1, 0, 1, 2]:
            offset = np.dot([l_x, l_y, l_z], cell)
            for atom in structure:
                if atom.symbol == 'Ce':
                    # Get atom position in the periodic image
                    pos = atom.position + offset
                    r_vec = muon_pos - pos
                    r = np.linalg.norm(r_vec)
                    
                    if 0.1 < r < cutoff_radius:
                        # Determine plane index using pristine positions
                        # In the supercell, the pristine position of the atom is roughly its current position
                        pristine_pos = atom.position / a
                        plane = int(np.round(pristine_pos[0] + pristine_pos[1] + pristine_pos[2]))
                        
                        m_vector = 0.65 * (vec if plane % 2 == 0 else -vec)
                        
                        r_hat = r_vec / r
                        term = (3 * np.dot(m_vector, r_hat) * r_hat - m_vector) / (r**3)
                        B_dip += term * conversion

print(f"AFM Bx : {B_dip[0]:.6f} Tesla")
print(f"AFM By : {B_dip[1]:.6f} Tesla")
print(f"AFM Bz : {B_dip[2]:.6f} Tesla")
