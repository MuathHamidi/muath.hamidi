/* js/modules/viewer/angles/renderer.js */
import { state } from '../../../state.js';
import { parseCifManual } from '../../file-manager/custom-parser.js';
import { distance } from '../utils.js';

let viewer = null;

export function initAnglesViewer() {
    const el = document.getElementById('angles-mol-container');
    if (el) {
        viewer = $3Dmol.createViewer(el, { backgroundColor: '#0f1014' });
    }
}

export function renderAngleVisual(rowId, parts, angleVal) {
    if (!viewer) initAnglesViewer();
    const cif = state.currentCifText;
    if (!cif) return;

    // UI Updates
    document.getElementById('angle-viz-overlay').style.display = 'block';
    document.getElementById('angle-viz-title').textContent = `${parts[0]} - ${parts[1]} - ${parts[2]}`;
    document.getElementById('angle-viz-val').textContent = `${angleVal.toFixed(2)}°`;

    viewer.clear();
    
    // Parse
    const structure = parseCifManual(cif);
    const { atoms, cell } = structure;
    const { a, b, c } = cell;

    // Goal: Find ONE representative triplet to visualize in "Focus Mode"
    // parts = [Label1, CenterLabel, Label2]
    
    // 1. Identify Center Atom Type
    const centerType = parts[1].replace(/\d+/, ''); // Remove number if present for matching raw elements
    const leg1Type = parts[0].replace(/\d+/, '');
    const leg2Type = parts[2].replace(/\d+/, '');

    // 2. Find a central atom in the middle of the cell to center camera
    const candidates = atoms.filter(at => at.elem === centerType);
    if(candidates.length === 0) return;
    
    // Pick first candidate
    const centerAtom = candidates[0];
    
    // 3. Find neighbors matching leg types
    const realCenter = { 
        x: centerAtom.x * a, 
        y: centerAtom.y * b, 
        z: centerAtom.z * c, 
        elem: centerAtom.elem 
    };

    const neighbors = [];
    
    // Search supercell for neighbors
    for(let i=-1; i<=1; i++) {
        for(let j=-1; j<=1; j++) {
            for(let k=-1; k<=1; k++) {
                atoms.forEach(at => {
                    if (at === centerAtom && i===0 && j===0 && k===0) return;
                    
                    const realAt = {
                        x: (at.x + i) * a,
                        y: (at.y + j) * b,
                        z: (at.z + k) * c,
                        elem: at.elem
                    };
                    
                    const d = distance(realCenter, realAt);
                    // Bond logic (looser cutoff to catch all)
                    if(d > 0.1 && d < 3.2) { 
                        if(at.elem === leg1Type || at.elem === leg2Type) {
                            neighbors.push(realAt);
                        }
                    }
                });
            }
        }
    }

    // 4. Find the specific pair that matches the angle
    // This is heuristic: find pair with angle close to target
    let bestPair = null;
    let minDiff = 999;

    for(let i=0; i<neighbors.length; i++) {
        for(let j=i+1; j<neighbors.length; j++) {
            const n1 = neighbors[i];
            const n2 = neighbors[j];
            
            // Check types match
            const types = [n1.elem, n2.elem].sort();
            const targetTypes = [leg1Type, leg2Type].sort();
            
            if(types[0] === targetTypes[0] && types[1] === targetTypes[1]) {
                // Calc Angle
                const v1 = { x: n1.x - realCenter.x, y: n1.y - realCenter.y, z: n1.z - realCenter.z };
                const v2 = { x: n2.x - realCenter.x, y: n2.y - realCenter.y, z: n2.z - realCenter.z };
                const d1 = Math.sqrt(v1.x*v1.x + v1.y*v1.y + v1.z*v1.z);
                const d2 = Math.sqrt(v2.x*v2.x + v2.y*v2.y + v2.z*v2.z);
                const dot = v1.x*v2.x + v1.y*v2.y + v1.z*v2.z;
                const deg = Math.acos(Math.max(-1, Math.min(1, dot/(d1*d2)))) * (180/Math.PI);
                
                if (Math.abs(deg - angleVal) < minDiff) {
                    minDiff = Math.abs(deg - angleVal);
                    bestPair = [n1, n2];
                }
            }
        }
    }

    if (!bestPair) {
        viewer.addLabel("Could not isolate geometry", {position: {x:0,y:0,z:0}});
        viewer.render();
        return;
    }

    // 5. RENDER FOCUSED GEOMETRY
    
    // Add Center
    viewer.addSphere({ 
        center: realCenter, 
        radius: 0.6, 
        color: '#f72585' 
    });
    
    // Add Legs
    bestPair.forEach(leg => {
        viewer.addSphere({ center: leg, radius: 0.4, color: '#4cc9f0' });
        viewer.addCylinder({
            start: realCenter,
            end: leg,
            radius: 0.15,
            color: '#fff'
        });
    });

    // Add Ghost wireframe context (optional, maybe distracting)
    // viewer.addModel(xyzStr... opacity: 0.1); 

    // Labels
    viewer.addLabel(centerType, { position: {x:realCenter.x, y:realCenter.y+0.8, z:realCenter.z}, fontColor:'white', backgroundColor:'black', fontSize:12 });
    viewer.addLabel(bestPair[0].elem, { position: bestPair[0], fontColor:'#aaa', backgroundColor:'transparent', fontSize:10 });
    viewer.addLabel(bestPair[1].elem, { position: bestPair[1], fontColor:'#aaa', backgroundColor:'transparent', fontSize:10 });

    // Focus Camera
    viewer.zoomTo();
    viewer.zoom(2.5); // Zoom in close
    viewer.render();
}