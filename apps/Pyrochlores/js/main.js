/* js/main.js */
import { renderLayout } from './components/index.js';
import { initPeriodicTable, initMiniPeriodicTable } from './modules/periodic-table.js';
import { init3DViewer, viewerReset, toggleSpin, setVizMode, takeSnapshot, toggleSupercell } from './modules/viewer/index.js';
import { initDataLoading } from './modules/file-manager/index.js';
import { switchTab, copyCif, toggleFullscreen, initSelectionLogic } from './modules/ui/index.js';
import { initHeatmap } from './modules/heatmap/index.js'; 
import { initSpectrum, initMerger } from './modules/spectrum/index.js';
import { initStructureAnalysis } from './modules/structure-analysis/index.js';
import { initAnglesLogic } from './modules/viewer/angles/index.js'; // NEW IMPORT

document.addEventListener('DOMContentLoaded', () => {
    renderLayout();

    initPeriodicTable();
    initMiniPeriodicTable(); 
    initSelectionLogic();
    init3DViewer();
    initDataLoading();
    initHeatmap(); 
    initSpectrum(); 
    initMerger();
    initStructureAnalysis();
    initAnglesLogic(); // NEW INIT

    // ... (rest of listeners remain the same) ...
    // 3D Controls
    const spinBtn = document.getElementById('btn-spin');
    if(spinBtn) spinBtn.addEventListener('click', toggleSpin);
    
    const snapBtn = document.getElementById('btn-snap');
    if(snapBtn) snapBtn.addEventListener('click', takeSnapshot);
    
    const resetBtn = document.getElementById('btn-reset');
    if(resetBtn) resetBtn.addEventListener('click', viewerReset);

    // Supercell
    const superBtn = document.getElementById('btn-supercell');
    if(superBtn) superBtn.addEventListener('click', (e) => {
        const isActive = toggleSupercell();
        e.target.style.background = isActive ? 'var(--primary)' : 'var(--bg-dark)';
        e.target.style.color = isActive ? '#000' : 'var(--text-main)';
    });
    
    // View Mode Selector
    const modeSelect = document.getElementById('viz-mode-select');
    if(modeSelect) {
        modeSelect.addEventListener('change', (e) => {
            setVizMode(e.target.value);
        });
    }

    // UI Helpers
    const copyBtn = document.querySelector('.copy-btn');
    if(copyBtn) copyBtn.addEventListener('click', copyCif);
    
    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    if(tabBtns.length >= 2) {
        tabBtns[0].addEventListener('click', () => switchTab('parsed'));
        tabBtns[1].addEventListener('click', () => switchTab('raw'));
    }

    // Fullscreen Toggles
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.currentTarget.getAttribute('data-target');
            toggleFullscreen(targetId);
            
            // Handle resize for all chart types
            if(['card-heatmap', 'card-spectrum', 'card-lattice', 'card-oxygen', 'card-correlation'].includes(targetId)) {
                setTimeout(() => {
                    window.dispatchEvent(new Event('resize')); 
                }, 100);
            }
        });
    });
});