/* js/modules/viewer/distance/renderer.js */
import { getDistViewer } from '../core.js';
import { state } from '../../../state.js';
import { distance } from '../utils.js';
import { buildDistanceSupercell } from './builder.js';
import { mapTypeToSym, interpolateColor } from './utils.js';
import { updateStats, updateHistogram } from './stats.js';

export function renderDistanceView(cifText = null) {
    const viewer = getDistViewer();
    if (!viewer) return;
    
    const text = cifText || state.currentCifText;
    if (!text) {
        viewer.clear();
        viewer.render();
        return;
    }

    // --- 1. Get UI Controls ---
    const modeSelect = document.getElementById('dist-mode-select');
    const cutoffSlider = document.getElementById('dist-cutoff-slider');
    const ghostCheck = document.getElementById('dist-ghost-check');
    const heatCheck = document.getElementById('dist-heat-check');
    const cutoffDisplay = document.getElementById('dist-cutoff-val');

    const bondType = modeSelect ? modeSelect.value : 'A-O';
    const maxDist = cutoffSlider ? parseFloat(cutoffSlider.value) : 3.0;
    const showGhost = ghostCheck ? ghostCheck.checked : true;
    const useHeatmap = heatCheck ? heatCheck.checked : true;

    if (cutoffDisplay) cutoffDisplay.textContent = maxDist.toFixed(1);

    try {
        const { xyzStr, supercellAtoms, dims, elements } = buildDistanceSupercell(text);
        const { a, b, c } = dims;

        // --- 2. Identify Target Elements ---
        let symbolA = state.selectedA || 'La'; 
        let symbolB = state.selectedB || 'Ti';
        
        // Fallback if selection is empty but file is loaded
        const cations = elements.filter(e => e !== 'O');
        if (cations.length >= 2) {
            if (!state.selectedA) symbolA = cations[0];
            if (!state.selectedB) symbolB = cations[1];
        }

        const parts = bondType.split('-');
        const target1 = mapTypeToSym(parts[0], symbolA, symbolB);
        const target2 = mapTypeToSym(parts[1], symbolA, symbolB);

        viewer.clear();
        viewer.addModel(xyzStr, "xyz");

        // --- 3. Calculate Bonds & Active Atoms ---
        const bonds = [];
        const activeIndices = new Set();
        const distValues = [];

        // Logic: Iterate all atoms. If a pair matches targets & distance, record bond.
        // We only start bonds from 'isPrimary' atoms to avoid duplicate stats, 
        // but we draw them to any neighbor (supercell).
        
        for (let i = 0; i < supercellAtoms.length; i++) {
            const atom1 = supercellAtoms[i];
            
            // Optimization: Only compute bonds originating from the central unit cell
            // This ensures stats are per-unit-cell, but visual connects to neighbors.
            if (!atom1.isPrimary) continue; 
            
            // Pre-filter by element type to save calc
            const isT1 = atom1.elem === target1;
            const isT2 = atom1.elem === target2;
            if (!isT1 && !isT2) continue;

            for (let j = 0; j < supercellAtoms.length; j++) {
                if (i === j) continue;
                const atom2 = supercellAtoms[j];

                // Check Element Matching
                let isValidPair = false;
                if (target1 === target2) {
                    // Homo-atomic (e.g. A-A): Both must match, avoid double counting visual indices
                    if (atom1.elem === target1 && atom2.elem === target1) isValidPair = true;
                    // For homo bonds, we only draw i < j to avoid double cylinders
                    if (j < i) continue; 
                } else {
                    // Hetero-atomic (e.g. A-O)
                    if ((atom1.elem === target1 && atom2.elem === target2) || 
                        (atom1.elem === target2 && atom2.elem === target1)) {
                        isValidPair = true;
                    }
                }

                if (!isValidPair) continue;

                // Distance Check
                const d = distance(atom1, atom2);
                if (d > 0.1 && d <= maxDist) {
                    bonds.push({ start: atom1, end: atom2, len: d });
                    distValues.push(d);
                    activeIndices.add(i);
                    activeIndices.add(j);
                }
            }
        }

        // --- 4. Apply Styles ---

        // A. Default Style (Ghost or Hidden)
        if (showGhost) {
            viewer.setStyle({}, { 
                sphere: { scale: 0.15, color: '#333', opacity: 0.15 } 
            });
        } else {
            viewer.setStyle({}, { sphere: { hidden: true } });
        }

        // B. Active Style (Atoms participating in bonds)
        const getAtomColor = (elem) => {
            if (elem === 'O') return '#e63946'; // Red
            if (elem === symbolA) return '#4cc9f0'; // Cyan
            if (elem === symbolB) return '#f72585'; // Pink
            return '#ffffff';
        };

        activeIndices.forEach(idx => {
            const atom = supercellAtoms[idx];
            viewer.setStyle({ index: idx }, {
                sphere: { scale: 0.35, color: getAtomColor(atom.elem), opacity: 1.0 }
            });
        });

        // --- 5. Draw Bonds ---
        const minLen = Math.min(...distValues);
        const maxLen = Math.max(...distValues);

        bonds.forEach(bond => {
            let color = '#888'; // Default Grey

            if (useHeatmap && distValues.length > 0) {
                // Normalize distance 0..1
                let t = 0.5;
                if (maxLen !== minLen) {
                    t = (bond.len - minLen) / (maxLen - minLen);
                }
                color = interpolateColor(t);
            }

            viewer.addCylinder({
                start: { x: bond.start.x, y: bond.start.y, z: bond.start.z },
                end: { x: bond.end.x, y: bond.end.y, z: bond.end.z },
                radius: 0.06,
                color: color,
                fromCap: 1, toCap: 1
            });
        });

        // --- 6. Stats & UI ---
        updateStats(distValues);
        updateHistogram(distValues, bondType);

        // --- 7. Finalize ---
        // Bounding Box for Primary Cell
        viewer.addBox({
            center: {x: a/2, y: b/2, z: c/2},
            dimensions: {w: a, h: b, d: c},
            color: '#555',
            opacity: 0.3
        });

        viewer.render();

    } catch (e) {
        console.error("Distance Render Error:", e);
    }
}