import { state } from '../../state.js';
import { getViewer } from './core.js';
import { GEOMETRY } from './config.js';
import { distance } from './utils.js';
import { renderUnitCell } from './render-cell.js';
import { parseCifManual } from '../file-manager/custom-parser.js';

export function renderLocalGeometry(cifText, mode) {
    const viewer = getViewer();
    const targetSymbol = mode === 'site-a' ? state.selectedA : state.selectedB;
    const cutoff = mode === 'site-a' ? GEOMETRY.cutoffA : GEOMETRY.cutoffB;

    if (!targetSymbol) {
        renderUnitCell(cifText);
        return;
    }

    try {
        // 1. Parse Data
        const data = parseCifManual(cifText);
        const lat = {
            a: data.cell.a || 10,
            b: data.cell.b || data.cell.a || 10,
            c: data.cell.c || data.cell.a || 10
        };

        // 2. Generate Supercell (2x2x2)
        const allAtoms = [];
        
        for (let i = 0; i <= 1; i++) {
            for (let j = 0; j <= 1; j++) {
                for (let k = 0; k <= 1; k++) {
                    data.atoms.forEach(atom => {
                        allAtoms.push({
                            elem: atom.elem,
                            x: (atom.x + i) * lat.a,
                            y: (atom.y + j) * lat.b,
                            z: (atom.z + k) * lat.c
                        });
                    });
                }
            }
        }

        // 3. Feed to Viewer
        let xyzStr = `${allAtoms.length}\nSupercell\n`;
        allAtoms.forEach(a => {
            xyzStr += `${a.elem} ${a.x.toFixed(4)} ${a.y.toFixed(4)} ${a.z.toFixed(4)}\n`;
        });

        viewer.addModel(xyzStr, "xyz");

        // 4. Find Center and Neighbors
        const boxCenter = { x: lat.a, y: lat.b, z: lat.c }; 
        let centralAtom = null;
        let minCenterDist = Infinity;
        const cleanTarget = targetSymbol.replace(/[0-9]/g, '');

        const model = viewer.getModel();
        const modelAtoms = model.selectedAtoms({});

        modelAtoms.forEach(atom => {
            const atomSym = atom.elem.replace(/[0-9]/g, '');
            if (atomSym === cleanTarget) {
                const d = distance(atom, boxCenter);
                if (d < minCenterDist) {
                    minCenterDist = d;
                    centralAtom = atom;
                }
            }
        });

        if (!centralAtom) {
            console.error("Could not find central atom");
            renderUnitCell(cifText);
            return;
        }

        // Find Neighbors
        const neighbors = [];
        modelAtoms.forEach(atom => {
            if (atom.elem === 'O') {
                const d = distance(centralAtom, atom);
                if (d > 0.1 && d <= cutoff) {
                    atom.distanceToCenter = d;
                    neighbors.push(atom);
                }
            }
        });

        // 5. Apply Styles (Optimized Sizes)
        viewer.setStyle({}, { sphere: { hidden: true } }); // Hide all initially

        // Style Central Atom (Reduced scale from 0.9 to 0.5)
        viewer.setStyle(
            { index: centralAtom.index }, 
            { sphere: { scale: 0.5, color: mode === 'site-a' ? GEOMETRY.colors.A : GEOMETRY.colors.B } }
        );
        
        viewer.addLabel(centralAtom.elem, {
            position: {x: centralAtom.x, y: centralAtom.y + 0.4, z: centralAtom.z},
            backgroundColor: 'black',
            fontColor: 'white',
            fontSize: 12,
            backgroundOpacity: 0.7
        });

        // Style Neighbors (Reduced scale from 0.45 to 0.3)
        const neighborIndices = neighbors.map(n => n.index);
        viewer.setStyle(
            { index: neighborIndices },
            { sphere: { scale: 0.3, color: GEOMETRY.colors.O } }
        );

        // Draw Bonds
        neighbors.forEach(n => {
            viewer.addCylinder({
                start: { x: centralAtom.x, y: centralAtom.y, z: centralAtom.z },
                end: { x: n.x, y: n.y, z: n.z },
                radius: 0.08, // Slightly thinner bonds
                color: GEOMETRY.colors.bond,
                fromCap: 1, toCap: 1
            });

            const midX = (centralAtom.x + n.x) / 2;
            const midY = (centralAtom.y + n.y) / 2;
            const midZ = (centralAtom.z + n.z) / 2;

            viewer.addLabel(n.distanceToCenter.toFixed(3) + " Å", {
                position: { x: midX, y: midY, z: midZ },
                useScreen: true,
                fontSize: 10,
                fontColor: '#aaaaaa',
                backgroundOpacity: 0
            });
        });

        // Focus Camera
        viewer.zoomTo({ x: centralAtom.x, y: centralAtom.y, z: centralAtom.z });
        viewer.zoom(4); // Adjusted zoom slightly
        viewer.render();

    } catch (e) {
        console.error("Geo Render Error:", e);
        renderUnitCell(cifText);
    }
}