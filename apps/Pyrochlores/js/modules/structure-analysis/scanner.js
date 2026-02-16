/* js/modules/structure-analysis/scanner.js */
import { state } from '../../state.js';
// Updated Import
import { showToast } from '../ui/index.js';
import { parseElementsFromFilename } from '../heatmap/utils.js';
import { updateDatabasePlots } from './plots.js';

export async function runStructureScan() {
    const btn = document.getElementById('btn-scan-struct');
    if (btn) {
        btn.disabled = true;
        btn.textContent = "Scanning... (0%)";
    }

    if (state.knownFiles.length === 0) {
        showToast("No files found in log to scan.", "error");
        if(btn) { btn.disabled = false; btn.textContent = "Scan CIFs for Structure Data"; }
        return;
    }

    state.structureData = [];
    state.structureOverrides = {};
    
    let count = 0;
    const total = state.knownFiles.length;
    const chunkSize = 5; 
    
    for (let i = 0; i < total; i += chunkSize) {
        const chunk = state.knownFiles.slice(i, i + chunkSize);
        await Promise.all(chunk.map(async (fileName) => {
            await fetchAndParseCif(fileName);
        }));
        
        count += chunk.length;
        if(btn) btn.textContent = `Scanning... (${Math.round((count/total)*100)}%)`;
    }

    if(btn) btn.style.display = 'none';
    showToast(`Scanned ${state.structureData.length} valid structures`, "success");
    
    updateDatabasePlots();
}

async function fetchAndParseCif(fileName) {
    try {
        const res = await fetch(`cifs/${fileName}`);
        if (!res.ok) return;
        const text = await res.text();
        
        const elems = parseElementsFromFilename(fileName);
        if (!elems) return;

        // Parse Lattice Parameter 'a'
        const latticeMatch = text.match(/_cell_length_a\s+([0-9\.]+)/);
        const lattice = latticeMatch ? parseFloat(latticeMatch[1]) : null;

        // Parse Oxygen x (48f)
        const oxMatch = text.match(/^\s*O1\s+[A-Za-z]+\s+[\d\.]+\s+([\d\.]+)/m);
        const oxX = oxMatch ? parseFloat(oxMatch[1]) : null;

        if (lattice !== null) {
            state.structureData.push({
                fileName,
                A: elems.A,
                B: elems.B,
                lattice,
                oxygen: oxX
            });
        }
    } catch (e) {
        console.warn(`Failed to parse ${fileName}`, e);
    }
}