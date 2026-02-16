import { state } from '../../state.js';
import { getViewer, getVizMode } from './core.js';

export function viewerReset() {
    const viewer = getViewer();
    if(viewer) viewer.zoomTo();
}

export function toggleSpin() {
    const viewer = getViewer();
    if (!viewer) return;
    state.isSpinning = !state.isSpinning;
    viewer.spin(state.isSpinning);
}

export function takeSnapshot() {
    const viewer = getViewer();
    if (!viewer) return;
    
    const canvas = document.querySelector('#mol-container canvas');
    if(canvas) {
        const link = document.createElement('a');
        const mode = getVizMode();
        link.download = `pyrochlore_${state.selectedA||'A'}${state.selectedB||'B'}_${mode}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    }
}