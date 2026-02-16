/* js/modules/viewer/distance/builder.js */
import { parseCifManual } from '../../file-manager/custom-parser.js';

export function buildDistanceSupercell(cifText) {
    const data = parseCifManual(cifText);
    const { a, b, c } = data.cell;

    // --- BUILD SUPERCELL (2x2x2) ---
    // We use a supercell to ensure we find bonds crossing unit cell boundaries
    const supercellAtoms = [];
    const range = 1; // 0 to 1 implies 2x2x2 block
    
    for (let i = 0; i <= range; i++) {
        for (let j = 0; j <= range; j++) {
            for (let k = 0; k <= range; k++) {
                data.atoms.forEach(atom => {
                    supercellAtoms.push({
                        ...atom,
                        x: (atom.x + i) * a,
                        y: (atom.y + j) * b,
                        z: (atom.z + k) * c,
                        isPrimary: (i===0 && j===0 && k===0) // Mark atoms in the primary cell
                    });
                });
            }
        }
    }

    // --- GENERATE XYZ STRING ---
    let xyzStr = `${supercellAtoms.length}\nDistanceView\n`;
    supercellAtoms.forEach(atom => {
        xyzStr += `${atom.elem} ${atom.x.toFixed(4)} ${atom.y.toFixed(4)} ${atom.z.toFixed(4)}\n`;
    });

    return { 
        xyzStr, 
        supercellAtoms, 
        dims: { a, b, c },
        elements: [...new Set(data.atoms.map(a => a.elem))]
    };
}