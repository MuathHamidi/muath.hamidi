/* js/modules/structure-analysis/init.js */
import { state } from '../../state.js';
import { showToast } from '../ui/index.js';
import { runStructureScan } from './scanner.js';
import { updateDatabasePlots, renderCorrelationPlot } from './plots.js';
import { renderDistanceView, getDefaultCutoff } from '../viewer/distance/index.js';
import { getDistViewer } from '../viewer/core.js';

export function initStructureAnalysis() {
    // 1. Scan Button (Lattice/Oxygen Cards)
    const btn = document.getElementById('btn-scan-struct');
    if (btn) btn.addEventListener('click', runStructureScan);

    // 2. Modal Handlers (Structure Selection)
    const closeBtn = document.getElementById('btn-close-struct-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.getElementById('structure-select-modal').style.display = 'none';
        });
    }

    const avgBtn = document.getElementById('btn-struct-use-avg');
    if (avgBtn) {
        avgBtn.addEventListener('click', () => {
            const comp = avgBtn.dataset.comp; 
            if (comp) {
                state.structureOverrides[comp] = null; 
                document.getElementById('structure-select-modal').style.display = 'none';
                updateDatabasePlots();
                showToast(`Reverted ${comp.replace('_', '2')}2O7 to average value`, 'success');
            }
        });
    }

    // 3. Correlation Plot Color Toggle
    const colorSelect = document.getElementById('corr-color-select');
    if (colorSelect) {
        colorSelect.addEventListener('change', (e) => {
            state.structureColorMode = e.target.value;
            renderCorrelationPlot();
        });
    }

    // 4. DISTANCE CARD CONTROLS
    initDistanceControls();
}

function initDistanceControls() {
    const distModeSelect = document.getElementById('dist-mode-select');
    const distSlider = document.getElementById('dist-cutoff-slider');
    const distGhost = document.getElementById('dist-ghost-check');
    const distHeat = document.getElementById('dist-heat-check');
    const distReset = document.getElementById('btn-dist-reset');
    const distCard = document.getElementById('card-distance');

    // A. Bond Type Change
    if (distModeSelect) {
        distModeSelect.addEventListener('change', (e) => {
            const newType = e.target.value;
            
            // Automatically set the slider to a reasonable default
            if (distSlider) {
                 const defVal = getDefaultCutoff(newType);
                 distSlider.value = defVal;
                 
                 const disp = document.getElementById('dist-cutoff-val');
                 if(disp) disp.textContent = defVal.toFixed(1);
            }
            renderDistanceView();
        });
    }

    // B. Slider Change (Input event for real-time update)
    if (distSlider) {
        distSlider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            const disp = document.getElementById('dist-cutoff-val');
            if(disp) disp.textContent = val.toFixed(1);
            
            renderDistanceView();
        });
    }

    // C. Toggles
    if (distGhost) distGhost.addEventListener('change', () => renderDistanceView());
    if (distHeat) distHeat.addEventListener('change', () => renderDistanceView());

    // D. Reset Camera Button
    if (distReset) {
        distReset.addEventListener('click', () => {
            const viewer = getDistViewer();
            if(viewer) viewer.zoomTo();
        });
    }

    // E. Resize Observer
    if (distCard) {
        const ro = new ResizeObserver(() => {
            const viewer = getDistViewer();
            if (viewer) {
                viewer.resize();
                // Optional: Re-render if necessary, but resize usually handles canvas
            }
        });
        ro.observe(distCard);
    }
}