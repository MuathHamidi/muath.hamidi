import { state } from '../../state.js';
import { init3DViewer, getViewer } from './core.js';
import { renderUnitCell } from './render-cell.js';
import { renderLocalGeometry } from './render-geo.js';
import { viewerReset, toggleSpin, takeSnapshot } from './controls.js';

export { init3DViewer, viewerReset, toggleSpin, takeSnapshot };

export function toggleSupercell() {
    state.viewerSettings.supercell = !state.viewerSettings.supercell;
    if (state.currentCifText) renderCrystal(state.currentCifText);
    return state.viewerSettings.supercell;
}

export function setVizMode(mode) {
    state.vizMode = mode;
    if (state.currentCifText) {
        renderCrystal(state.currentCifText);
    }
}

export function renderCrystal(cifText) {
    const viewer = getViewer();
    if (!viewer) return;
    
    viewer.clear();
    
    if (!cifText) {
        viewer.render();
        return;
    }
    
    state.currentCifText = cifText;

    try {
        if (state.vizMode === 'site-a' || state.vizMode === 'site-b') {
            renderLocalGeometry(cifText, state.vizMode);
        } else if (state.vizMode === 'poly') {
            renderUnitCell(cifText, true);
        } else {
            renderUnitCell(cifText, false);
        }
    } catch (e) {
        console.error("Render Error:", e);
        viewer.addLabel("Render Error", {position: {x:0, y:0, z:0}, backgroundColor: 'red'});
        viewer.render();
    }
}