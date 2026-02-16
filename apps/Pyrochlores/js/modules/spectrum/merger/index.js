/* js/modules/spectrum/merger/index.js */
import { state } from '../../../state.js';
// Updated Import
import { renderMerger } from './renderer/index.js';
import { initMergerUI } from './ui.js';

export { createMergeFrom, addTraceToLastMerge } from './actions.js';
export { renderMerger } from './renderer/index.js';

export function initMerger() {
    const createBtn = document.getElementById('btn-create-merge');
    const clearBtn = document.getElementById('btn-clear-merger');
    const avgToggle = document.getElementById('merger-avg-toggle');
    const minInput = document.getElementById('merger-min');
    const maxInput = document.getElementById('merger-max');
    
    initMergerUI();

    const closeDetails = document.getElementById('btn-close-merge-details');
    if (closeDetails) {
        closeDetails.addEventListener('click', () => {
            document.getElementById('merge-details-modal').style.display = 'none';
        });
    }

    if (clearBtn) clearBtn.addEventListener('click', () => {
        state.mergedSpectra = [];
        renderMerger();
    });
    
    if (avgToggle) avgToggle.addEventListener('change', renderMerger);
    if (minInput) minInput.addEventListener('change', renderMerger);
    if (maxInput) maxInput.addEventListener('change', renderMerger);
}