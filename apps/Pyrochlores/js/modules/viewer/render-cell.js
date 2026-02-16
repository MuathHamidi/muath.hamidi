import { getViewer } from './core.js';
import { parseCifManual } from '../file-manager/custom-parser.js';
import { state } from '../../state.js';

export function renderUnitCell(cifText, isPolyMode = false) {
    const viewer = getViewer();
    if (!viewer) return;

    try {
        const data = parseCifManual(cifText);
        const a = data.cell.a || 10.0;
        const b = data.cell.b || data.cell.a || 10.0;
        const c = data.cell.c || data.cell.a || 10.0;

        // Supercell Logic
        const repeat = state.viewerSettings.supercell ? 2 : 1;
        const allAtoms = [];

        for (let i = 0; i < repeat; i++) {
            for (let j = 0; j < repeat; j++) {
                for (let k = 0; k < repeat; k++) {
                    data.atoms.forEach(atom => {
                        allAtoms.push({
                            elem: atom.elem,
                            x: (atom.x + i) * a,
                            y: (atom.y + j) * b,
                            z: (atom.z + k) * c
                        });
                    });
                }
            }
        }

        // Build XYZ String
        let xyzStr = `${allAtoms.length}\nGenerated\n`;
        allAtoms.forEach(atom => {
            xyzStr += `${atom.elem} ${atom.x.toFixed(5)} ${atom.y.toFixed(5)} ${atom.z.toFixed(5)}\n`;
        });

        // Add Model
        // keepH: true prevents 3Dmol from removing Hydrogens (not applicable here, but good practice)
        viewer.addModel(xyzStr, "xyz", {keepH: true});

        // Visualization Styles
        
        if (isPolyMode && state.selectedB) {
            // --- POLYHEDRA MODE ---
            const cleanB = state.selectedB.replace(/[0-9]/, '');
            
            // 1. Style B-Sites (Centers)
            viewer.setStyle({elem: cleanB}, {
                sphere: {scale: 0.2, color: '#f72585'},
                // 3Dmol calculates polyhedra based on surrounding atoms.
                // We define 'bonds' implicitly by distance.
                polyhedron: {
                    color: '#f72585', 
                    alpha: 0.4, 
                    radius: 2.5, // Search radius for O neighbors
                    wireframe: true
                }
            });

            // 2. Style Oxygen (Vertices) - small and subtle
            viewer.setStyle({elem: 'O'}, {sphere: {scale: 0.15, color: '#eee'}});
            
            // 3. Hide A-Site in this mode to reduce clutter
            if (state.selectedA) {
                const cleanA = state.selectedA.replace(/[0-9]/, '');
                viewer.setStyle({elem: cleanA}, {sphere: {hidden:true}});
            }

        } else {
            // --- STANDARD BALL & STICK ---
            viewer.setStyle({}, {
                sphere: { scale: 0.3, colorscheme: 'Jmol' },
                stick: { radius: 0.1, colorscheme: 'Jmol' }
            });
        }

        // Draw Bounding Box (Unit Cell vs Supercell boundary)
        const dims = { w: a * repeat, h: b * repeat, d: c * repeat };
        viewer.addBox({
            center: {x: dims.w/2, y: dims.h/2, z: dims.d/2},
            dimensions: dims,
            color: 'white',
            opacity: 0.15
        });

        viewer.zoomTo();
        viewer.render();

    } catch (e) {
        console.error("Render Failed:", e);
        viewer.addLabel("Error parsing structure", {position: {x:0,y:0,z:0}, backgroundColor:'red'});
        viewer.render();
    }
}