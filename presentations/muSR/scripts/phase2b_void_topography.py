import numpy as np
from ase.io.cube import read_cube_data

with open('../exports/cein3_electrostatic.cube', 'r') as f:
    data, atoms = read_cube_data(f)

# Unit cell dimension
a = atoms.get_cell()[0, 0]
nx, ny, nz = data.shape

# 1. Create a 3D grid of fractional coordinates
x_frac = np.linspace(0, 1, nx, endpoint=False)
y_frac = np.linspace(0, 1, ny, endpoint=False)
z_frac = np.linspace(0, 1, nz, endpoint=False)
X, Y, Z = np.meshgrid(x_frac, y_frac, z_frac, indexing='ij')

# Convert the fractional grid to Cartesian coordinates
grid_coords = np.stack((X * a, Y * a, Z * a), axis=-1)

# 2. Initialize a blank boolean mask
core_mask = np.zeros_like(data, dtype=bool)

# Define the exclusion radius in Angstroms (1.5 A covers the deep PAW well)
EXCLUSION_RADIUS = 1.5

# 3. Mask out the atomic cores using the Minimum Image Convention
for atom in atoms:
    pos = atom.position
    
    # Calculate absolute Cartesian distances along each axis
    dx = np.abs(grid_coords[..., 0] - pos[0])
    dy = np.abs(grid_coords[..., 1] - pos[1])
    dz = np.abs(grid_coords[..., 2] - pos[2])
    
    # Apply periodic boundaries (wrap around the cell)
    dx = np.minimum(dx, a - dx)
    dy = np.minimum(dy, a - dy)
    dz = np.minimum(dz, a - dz)
    
    # Calculate true 3D Euclidean distance from the atom to every grid point
    distances = np.sqrt(dx**2 + dy**2 + dz**2)
    
    # Flag any grid point inside the exclusion sphere
    core_mask[distances < EXCLUSION_RADIUS] = True

# 4. Apply the mask (muon seeks the potential peak, set core to -infinity)
search_area = np.copy(data)
search_area[core_mask] = -np.inf

# 5. Locate the global maximum of the remaining safe space
max_idx = np.unravel_index(np.argmax(search_area), search_area.shape)

frac_x = max_idx[0] / nx
frac_y = max_idx[1] / ny
frac_z = max_idx[2] / nz

print(f"Maximum Potential (Void) : {np.max(search_area):.6f} eV")
print(f"Fractional Coords : x={frac_x:.5f}, y={frac_y:.5f}, z={frac_z:.5f}")

