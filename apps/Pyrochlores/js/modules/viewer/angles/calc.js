/* js/modules/viewer/angles/calc.js */
import { parseCifManual } from '../../file-manager/custom-parser.js';

const BOND_CUTOFF = 2.8; 
const ANGLE_TOLERANCE = 3.0; // Degrees tolerance to group similar angles

export function calculateAngles(cifText) {
    if (!cifText) return [];

    const structure = parseCifManual(cifText);
    const { atoms, cell } = structure;
    const { a, b, c } = cell;

    // 1. Map atoms to specific labels (A, B, O1, O2)
    // Pyrochlore Specific Heuristics
    const labeledAtoms = atoms.map(atom => {
        let label = atom.elem;
        
        // Element-based fallback if CIF doesn't differentiate O1/O2 labels well
        if (atom.elem === 'O') {
            // O1 is 48f (x, 1/8, 1/8). O2 is 8b (3/8, 3/8, 3/8)
            // Note: coordinates are fractional 0..1
            const x = atom.x % 1;
            const y = atom.y % 1;
            const z = atom.z % 1;
            
            // Check closeness to 0.375 (3/8)
            // We use a loose tolerance because lattice can be distorted
            const isFixed = (Math.abs(x - 0.375) < 0.05) && (Math.abs(y - 0.375) < 0.05) && (Math.abs(z - 0.375) < 0.05);
            label = isFixed ? 'O2' : 'O1';
        }
        
        // For cations, usually elem is enough (Dy, Ti)
        
        return {
            ...atom,
            realX: atom.x * a,
            realY: atom.y * b,
            realZ: atom.z * c,
            label: label
        };
    });

    // 2. Build Neighbor List (using Cartesian)
    // Optimization: Only compute neighbors for atoms in primary cell
    const primaryAtoms = labeledAtoms; 
    
    // We need a supercell for neighbors
    const supercell = [];
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            for (let k = -1; k <= 1; k++) {
                primaryAtoms.forEach(at => {
                    supercell.push({
                        ...at,
                        rx: at.realX + (i*a),
                        ry: at.realY + (j*b),
                        rz: at.realZ + (k*c),
                        isCentral: (i===0 && j===0 && k===0)
                    });
                });
            }
        }
    }

    // Temporary storage for calculated angles before clustering
    // Structure: Map<GeometryKey, Array<AngleValue>>
    const rawAnglesMap = new Map();

    const centralAtoms = supercell.filter(a => a.isCentral);

    centralAtoms.forEach(center => {
        // Find bonded neighbors
        const neighbors = [];
        supercell.forEach(n => {
            if (n === center) return;
            const d2 = Math.pow(center.rx - n.rx, 2) + Math.pow(center.ry - n.ry, 2) + Math.pow(center.rz - n.rz, 2);
            if (d2 < BOND_CUTOFF * BOND_CUTOFF) {
                neighbors.push({ atom: n, d: Math.sqrt(d2) });
            }
        });

        // Compute pairs
        for (let i = 0; i < neighbors.length; i++) {
            for (let j = i + 1; j < neighbors.length; j++) {
                const n1 = neighbors[i];
                const n2 = neighbors[j];

                // Cosine Rule
                const v1 = { x: n1.atom.rx - center.rx, y: n1.atom.ry - center.ry, z: n1.atom.rz - center.rz };
                const v2 = { x: n2.atom.rx - center.rx, y: n2.atom.ry - center.ry, z: n2.atom.rz - center.rz };
                
                const dot = v1.x*v2.x + v1.y*v2.y + v1.z*v2.z;
                const mag = n1.d * n2.d;
                let cosTheta = dot / mag;
                if(cosTheta > 1) cosTheta = 1; else if(cosTheta < -1) cosTheta = -1;
                
                const deg = Math.acos(cosTheta) * (180/Math.PI);

                // Key: Sorted labels (e.g., "O1 - Ti - O1")
                const legs = [n1.atom.label, n2.atom.label].sort();
                const key = `${legs[0]} - ${center.label} - ${legs[1]}`;

                if (!rawAnglesMap.has(key)) {
                    rawAnglesMap.set(key, []);
                }
                rawAnglesMap.get(key).push(deg);
            }
        }
    });

    // 3. Cluster and Aggregate Stats
    const results = [];

    rawAnglesMap.forEach((anglesList, key) => {
        // We have a list of angles for this geometry, e.g. [80.1, 79.9, 180.0, 179.8, 80.0]
        // We need to group them.
        
        const clusters = []; // Array of { sum, count, vals: [] }

        anglesList.forEach(deg => {
            let foundCluster = false;
            for(const c of clusters) {
                const currentAvg = c.sum / c.count;
                // Check if this angle belongs to this cluster
                if (Math.abs(deg - currentAvg) < ANGLE_TOLERANCE) {
                    c.sum += deg;
                    c.count++;
                    c.vals.push(deg);
                    foundCluster = true;
                    break;
                }
            }
            if (!foundCluster) {
                clusters.push({ sum: deg, count: 1, vals: [deg] });
            }
        });

        // Convert clusters to result objects
        clusters.forEach(c => {
            const avg = c.sum / c.count;
            // Std Dev
            const variance = c.vals.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / c.count;
            const std = Math.sqrt(variance);

            results.push({
                id: key,
                angle: avg,
                std: std,
                count: c.count,
                parts: key.split(' - ')
            });
        });
    });

    // Sort: First by Geometry Name, then by Angle Value
    return results.sort((a, b) => {
        const strCmp = a.id.localeCompare(b.id);
        if (strCmp !== 0) return strCmp;
        return a.angle - b.angle;
    });
}