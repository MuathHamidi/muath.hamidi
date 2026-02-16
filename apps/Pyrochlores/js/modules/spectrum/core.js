/* js/modules/spectrum/core.js */
import { state } from '../../state.js';
import { renderSpectrum } from './renderer/index.js'; 
import { initExportHandlers } from './export.js';
import { initInteractions } from './interactions/index.js'; 
import { getNextColor } from './utils.js';

export function initSpectrum() {
    const addBtn = document.getElementById('btn-add-spectrum');
    const clearBtn = document.getElementById('btn-clear-spectrum');
    const distributeBtn = document.getElementById('btn-distribute-spectrum');
    
    const minInput = document.getElementById('spectrum-min');
    const maxInput = document.getElementById('spectrum-max');
    
    const avgToggle = document.getElementById('spectrum-avg-toggle');
    const splitToggle = document.getElementById('spectrum-split-toggle');
    const avgLabel = document.getElementById('lbl-avg-toggle');

    if (addBtn) {
        addBtn.addEventListener('click', () => {
            if (state.selectedA && state.selectedB) {
                const id = `${state.selectedA}2${state.selectedB}2O7`;
                if (!state.comparisonSpectra.find(c => c.id === id)) {
                    let nextY = 0;
                    if (state.comparisonSpectra.length > 0) {
                        nextY = Math.max(...state.comparisonSpectra.map(s => s.yPos || 0)) + 1;
                    }
                    state.comparisonSpectra.push({ 
                        id: id, 
                        A: state.selectedA, 
                        B: state.selectedB,
                        color: getNextColor(),
                        yPos: nextY,
                        fileFilter: []
                    });
                    renderSpectrum();
                }
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            state.comparisonSpectra = [];
            renderSpectrum();
        });
    }

    // NEW: Distribute Handler
    if (distributeBtn) {
        distributeBtn.addEventListener('click', () => {
            if (state.comparisonSpectra.length === 0) return;
            // Sort to maintain visual order if desired, or just re-index based on current array
            // Simple integer stacking:
            state.comparisonSpectra.forEach((s, i) => {
                s.yPos = i; 
            });
            renderSpectrum();
        });
    }

    const redraw = () => renderSpectrum();
    if (minInput) minInput.addEventListener('change', redraw);
    if (maxInput) maxInput.addEventListener('change', redraw);
    if (avgToggle) avgToggle.addEventListener('change', redraw);

    if (splitToggle) {
        splitToggle.addEventListener('change', (e) => {
            if (avgLabel) avgLabel.style.opacity = e.target.checked ? '0.3' : '1';
            if (avgToggle) avgToggle.disabled = e.target.checked;
            redraw();
        });
    }

    initFilterModal();
    initExportHandlers();
    renderSpectrum(); 
    initInteractions(); 
}

function initFilterModal() {
    const modal = document.getElementById('spectrum-filter-modal');
    const close = document.getElementById('btn-close-spectrum-filter');
    const save = document.getElementById('btn-save-spectrum-filter');
    const selectAll = document.getElementById('btn-spectrum-select-all');
    const selectNone = document.getElementById('btn-spectrum-select-none');

    if (close) close.addEventListener('click', () => modal.style.display = 'none');
    
    if (selectAll) selectAll.addEventListener('click', () => {
        document.querySelectorAll('.spec-file-cb').forEach(cb => cb.checked = true);
    });

    if (selectNone) selectNone.addEventListener('click', () => {
        document.querySelectorAll('.spec-file-cb').forEach(cb => cb.checked = false);
    });

    if (save) {
        save.addEventListener('click', () => {
            const id = save.dataset.targetId;
            const item = state.comparisonSpectra.find(s => s.id === id);
            if (item) {
                const checked = Array.from(document.querySelectorAll('.spec-file-cb:checked')).map(cb => cb.value);
                const total = document.querySelectorAll('.spec-file-cb').length;
                if (checked.length === total) {
                    item.fileFilter = []; 
                } else {
                    item.fileFilter = checked;
                }
                renderSpectrum();
            }
            modal.style.display = 'none';
        });
    }
}