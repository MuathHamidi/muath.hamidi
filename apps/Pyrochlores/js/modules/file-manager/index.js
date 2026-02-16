import { state } from '../../state.js';
import { parseLogData, scanLogForElements } from './parser.js';
import { initSearch, findMatchingFiles } from './search.js';
import { parseHeatmapData } from '../heatmap/index.js'; 
import { updatePeriodicTableHeatmap } from '../periodic-table.js';

export { findMatchingFiles };

export async function initDataLoading() {
    const statusEl = document.getElementById('db-status');
    const searchInput = document.getElementById('file-search');
    
    // Init Search Listeners
    initSearch();

    // Attempt to load the log file
    const path = 'data/all_results.log';
    let loadedContent = null;

    try {
        const response = await fetch(path);
        if (response.ok) {
            loadedContent = await response.text();
        } else {
            console.warn("Log not found at 'data/all_results.log'. Trying 'data/all_results.txt'...");
            const res2 = await fetch('data/all_results.txt');
            if (res2.ok) loadedContent = await res2.text();
        }
    } catch (e) { console.error("Fetch failed:", e); }

    if (loadedContent) {
        // Parse for Sidebar & Metadata
        parseLogData(loadedContent);
        scanLogForElements();
        
        // Update Periodic Table Colors based on counts
        updatePeriodicTableHeatmap();

        // Parse for Heatmap Visualization
        parseHeatmapData(loadedContent);
        
        if(statusEl) {
            statusEl.className = 'status-badge success';
            statusEl.innerHTML = `<span class="dot"></span> Database Ready <span style="opacity:0.7; font-size:0.9em; margin-left:5px">(${state.knownFiles.length} files)</span>`;
        }
        
        if(searchInput) searchInput.disabled = false;

        findMatchingFiles();
    } else {
        if(statusEl) {
            statusEl.className = 'status-badge error';
            statusEl.innerHTML = `<span class="dot"></span> Connection Failed`;
        }
        console.error("Could not load data file.");
    }
}