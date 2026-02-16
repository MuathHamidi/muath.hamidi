/* js/modules/spectrum/merger/actions.js */
import { state } from '../../../state.js';
import { getNextColor } from '../utils.js';
import { showToast } from '../../ui/index.js';
// Updated Import
import { renderMerger } from './renderer/index.js';

export function createMergeFrom(formulaId) {
    state.mergedSpectra.push({
        id: "Merge " + (state.mergedSpectra.length + 1),
        constituents: [formulaId],
        color: getNextColor(),
        yPos: state.mergedSpectra.length
    });
    renderMerger();
    showToast(`Created new merge with ${formulaId}`, 'success');
}

export function addTraceToLastMerge(formulaId) {
    if (state.mergedSpectra.length === 0) {
        createMergeFrom(formulaId);
        return;
    }
    const lastMerge = state.mergedSpectra[state.mergedSpectra.length - 1];
    
    if (!lastMerge.constituents.includes(formulaId)) {
        lastMerge.constituents.push(formulaId);
        renderMerger();
        showToast(`Added ${formulaId} to ${lastMerge.id}`, 'success');
    } else {
        showToast(`${formulaId} is already in ${lastMerge.id}`, 'info');
    }
}