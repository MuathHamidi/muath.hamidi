/* js/modules/spectrum/merger/renderer/interactions.js */
import { state } from '../../../../state.js';
import { getColorForString } from '../../utils.js';

export function setupMergerInteractions(container) {
    // Click Handler for Merge Details
    container.addEventListener('mousedown', (e) => {
        // Plotly text elements usually have class 'annotation-text'
        if (e.target.classList && e.target.classList.contains('annotation-text')) {
            const clickedText = e.target.textContent;
            const mergeItem = state.mergedSpectra.find(m => m.id === clickedText);
            if (mergeItem) {
                openMergeDetailsModal(mergeItem);
            }
        }
    });
}

function openMergeDetailsModal(mergeItem) {
    const modal = document.getElementById('merge-details-modal');
    const title = document.getElementById('merge-details-title');
    const content = document.getElementById('merge-details-content');

    title.textContent = mergeItem.id;
    content.innerHTML = '';

    mergeItem.constituents.forEach(formula => {
        // Formula Header
        const fDiv = document.createElement('div');
        fDiv.style.fontWeight = 'bold';
        fDiv.style.color = getColorForString(formula);
        fDiv.style.marginTop = '10px';
        fDiv.textContent = `Formula: ${formula}`;
        content.appendChild(fDiv);

        // List files associated with this formula
        const pinnedItem = state.comparisonSpectra.find(item => item.id === formula);
        
        const match = formula.match(/([A-Z][a-z]?)2([A-Z][a-z]?)2O7/);
        if (match) {
            const A = match[1];
            const B = match[2];
            let files = state.heatmapRawData.filter(d => d.A === A && d.B === B);
            
            if (pinnedItem && pinnedItem.fileFilter && pinnedItem.fileFilter.length > 0) {
                files = files.filter(d => pinnedItem.fileFilter.includes(d.fileName));
            }

            files.forEach(f => {
                const fileRow = document.createElement('div');
                fileRow.style.fontSize = '0.85em';
                fileRow.style.color = 'var(--text-muted)';
                fileRow.style.paddingLeft = '15px';
                fileRow.textContent = f.fileName;
                content.appendChild(fileRow);
            });
        }
    });

    modal.style.display = 'flex';
}