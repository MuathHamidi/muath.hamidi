/* js/modules/file-manager/parser.js */
import { state } from '../../state.js';
// Updated Import
import { updateSelectionUI, showToast } from '../ui/index.js';
import { parseElementsFromFilename } from '../heatmap/utils.js';

export function parseLogData(text) {
    const chunks = text.split(/={10,}/);
    state.logData = {};
    state.fileMetadata = {};
    state.knownFiles = [];
    
    chunks.forEach(chunk => {
        const trimmed = chunk.trim();
        if (!trimmed) return;
        
        const fileMatch = trimmed.match(/FILE:\s*(.+)/i);
        
        if (fileMatch && fileMatch[1]) {
            const fileName = fileMatch[1].trim();
            state.logData[fileName] = `========================================\n${trimmed}\n========================================`;
            
            if (!state.knownFiles.includes(fileName)) state.knownFiles.push(fileName);

            const elements = parseElementsFromFilename(fileName);
            let gap = null;
            
            // Regex to find first excited state
            const levelMatch = trimmed.match(/1\s+1\s+0\.000[\s\S]*?1\s+2\s+([0-9.]+)/);
            if (levelMatch && levelMatch[1]) {
                gap = parseFloat(levelMatch[1]) * 1000;
            } else {
                const shortMatch = trimmed.match(/^\s*1\s+0\.000[\s\S]*?^\s*2\s+([0-9.]+)/m);
                if (shortMatch && shortMatch[1]) gap = parseFloat(shortMatch[1]) * 1000;
            }
            
            state.fileMetadata[fileName] = { 
                gap: gap, 
                A: elements ? elements.A : null, 
                B: elements ? elements.B : null 
            };
        }
    });
}

export function scanLogForElements() {
    state.availableElements.clear();
    state.elementCounts = {};
    
    state.knownFiles.forEach(fname => {
        const meta = state.fileMetadata[fname];
        if (meta && meta.A && meta.B) {
            state.elementCounts[meta.A] = (state.elementCounts[meta.A] || 0) + 1;
            state.availableElements.add(meta.A);
            
            state.elementCounts[meta.B] = (state.elementCounts[meta.B] || 0) + 1;
            state.availableElements.add(meta.B);
        }
    });
    
    updateSelectionUI();
    showToast(`Loaded ${state.knownFiles.length} datasets`, 'success');
}