// Pyrochlore Geometry Constants
export const GEOMETRY = {
    // A-Site (e.g., Rare Earth) is typically 8-coordinate (scalenohedron)
    // Bond lengths usually 2.2 - 2.6 Angstroms. 2.8 ensures we catch them.
    cutoffA: 2.8, 
    
    // B-Site (e.g., Transition Metal) is 6-coordinate (octahedron)
    // Bond lengths usually 1.9 - 2.1 Angstroms. 2.2 is safe.
    cutoffB: 2.2, 

    supercell: { x: 2, y: 2, z: 2 }, // Ensure we have neighbors across boundaries
    
    colors: {
        A: '#4cc9f0',  // Cyan (Primary)
        B: '#f72585',  // Pink (Secondary)
        O: '#e0e0e0',  // White
        bond: '#555555',
        polyA: '#4cc9f0',
        polyB: '#f72585'
    }
};