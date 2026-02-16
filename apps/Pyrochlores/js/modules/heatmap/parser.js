import { state } from '../../state.js';
import { parseElementsFromFilename } from './utils.js';
import { renderHeatmap } from './renderer.js';

export function parseHeatmapData(fullLogText) {
    console.log("Parsing Heatmap Data (Strict Mode)...");
    
    const lines = fullLogText.split('\n').map(l => l.trim());
    const parsedResults = [];
    
    // Store current metadata including filename
    let currentMeta = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;

        // 1. DETECT FILENAME / ID
        if (line.startsWith('FILE:') || line.startsWith('ID:')) {
            const parts = line.split(':');
            if (parts.length > 1) {
                const fname = parts[1].trim();
                const elems = parseElementsFromFilename(fname);
                
                if (elems) {
                    currentMeta = {
                        fileName: fname,
                        A: elems.A,
                        B: elems.B
                    };
                }
            }
            continue;
        }

        // 2. DETECT TABLE HEADER
        if (currentMeta && line.includes('Level') && line.includes('(eV)')) {
            const energies = [];
            
            let j = i + 1;
            while (j < lines.length) {
                const row = lines[j];
                j++;

                if (!row) continue;
                if (!/^\d/.test(row)) break; 
                
                const parts = row.split(/\s+/);
                let energyVal = null;
                const firstIsInt = /^\d+$/.test(parts[0]);
                
                if (firstIsInt) {
                    if (parts.length >= 3 && /^\d+$/.test(parts[1])) {
                        energyVal = parseFloat(parts[2]);
                    } else if (parts.length >= 2) {
                        energyVal = parseFloat(parts[1]);
                    }
                }

                if (energyVal !== null && !isNaN(energyVal)) {
                    energies.push(energyVal * 1000.0);
                }
            }

            // Save Result with Filename
            if (energies.length > 0) {
                energies.sort((a, b) => a - b);
                parsedResults.push({
                    fileName: currentMeta.fileName, // Added field
                    A: currentMeta.A,
                    B: currentMeta.B,
                    energies: energies
                });
                currentMeta = null; 
            }
            
            i = j - 1;
        }
    }

    console.log(`Heatmap: Found ${parsedResults.length} valid datasets.`);
    state.heatmapRawData = parsedResults;
    renderHeatmap();
}