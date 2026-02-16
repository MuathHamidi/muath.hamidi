/* js/modules/viewer/core.js */
import { state } from '../../state.js';

export function init3DViewer() {
    // 1. Main Viewer
    const element = document.getElementById('mol-container');
    if (element) {
        state.glViewer = $3Dmol.createViewer(element, { backgroundColor: '#101115' });
    }

    // 2. Distance Viewer
    const distEl = document.getElementById('dist-mol-container');
    if (distEl) {
        // Slightly lighter background to distinguish
        state.distViewer = $3Dmol.createViewer(distEl, { backgroundColor: '#15171c' });
    }
}

export function getViewer() {
    return state.glViewer;
}

export function getDistViewer() {
    return state.distViewer;
}

export function getVizMode() {
    return state.vizMode;
}