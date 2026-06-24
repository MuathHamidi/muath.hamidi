import numpy as np
import os, sys
from ase.io import read
from ase.io.cube import read_cube_data

# Accept branch-specific export directory
export_dir = sys.argv[1] if len(sys.argv) > 1 else '../exports'

# 1. Load the smuggled cube file and relaxed structure
cube_path = os.path.join(export_dir, 'cein3_spin.cube')
relaxed_cif_path = os.path.join(export_dir, 'cein3_relaxed_muon.cif')

with open(cube_path, 'r') as f:
    spin_data, atoms = read_cube_data(f)

relaxed_structure = read(relaxed_cif_path)
# Find the H atom (muon is the last atom we added, or look for symbol 'H')
muon_indices = [atom.index for atom in relaxed_structure if atom.symbol == 'H']
if muon_indices:
    scaled_muon = relaxed_structure.get_scaled_positions()[muon_indices[0]]
else:
    scaled_muon = relaxed_structure.get_scaled_positions()[-1]

# 2. The Conversion Factor (e/Bohr^3 to Tesla)
CONVERSION_FACTOR = 52.4272 

nx, ny, nz = spin_data.shape

# 3. Target the Muon Site dynamically using the relaxed coordinates
idx_x = int(round(scaled_muon[0] * nx)) % nx
idx_y = int(round(scaled_muon[1] * ny)) % ny
idx_z = int(round(scaled_muon[2] * nz)) % nz

# 4. Extract the physics!
raw_spin_density = spin_data[idx_x, idx_y, idx_z]
bc_tesla = raw_spin_density * CONVERSION_FACTOR * (2.0 / 3.0)

print(f"Raw Spin Density : {raw_spin_density:.6e} e/Bohr^3")
print(f"Calculated Bc    : {bc_tesla:.4f} Tesla")
