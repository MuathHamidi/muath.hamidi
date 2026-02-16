/* js/modules/file-manager/loader.js */
import { state } from '../../state.js';
import { renderParsedTable } from '../ui/index.js';
import { renderCrystal } from '../viewer/index.js';
import { renderDistanceView } from '../viewer/distance/index.js'; 
import { processAngles } from '../viewer/angles/index.js'; // NEW IMPORT

export async function loadFile(fileName, btnElement) {
    document.querySelectorAll('.file-item').forEach(b => b.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active');
    
    const label = document.getElementById('structure-label');
    if(label) label.textContent = ` - ${fileName}`;

    // 1. Log Data
    const logContent = state.logData[fileName] || "Log data missing.";
    const logEl = document.getElementById('log-content');
    if(logEl) logEl.textContent = logContent;
    renderParsedTable(logContent);

    // 2. CIF Data
    const cifContainer = document.getElementById('cif-content');
    if(cifContainer) cifContainer.textContent = "Fetching structure...";
    
    const cleanFileName = fileName.trim();
    const url = `cifs/${cleanFileName}`;
    
    let cifText = null;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Server returned ${response.status}`);
        cifText = await response.text();
        
        if(cifContainer) cifContainer.textContent = cifText;
        state.currentCifText = cifText; 
        
        // --- VISUALIZATIONS ---
        renderCrystal(cifText);
        renderDistanceView(cifText);
        processAngles(cifText); // NEW CALL

    } catch (err) {
        console.error("Load Error:", err);
        if(cifContainer) cifContainer.textContent = `Error: ${err.message}`;
        renderCrystal(null);
        renderDistanceView(null);
        processAngles(null);
    }
}