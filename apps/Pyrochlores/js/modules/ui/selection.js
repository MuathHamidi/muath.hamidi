/* js/modules/ui/selection.js */
import { state } from '../../state.js';
import { renderSpectrum } from '../spectrum/renderer/index.js';
import { getNextColor } from '../spectrum/utils.js';

export function initSelectionLogic() {
    const boxA = document.getElementById('atom-a-display');
    const boxB = document.getElementById('atom-b-display');
    if(boxA) boxA.onclick = () => setActiveSlot('A');
    if(boxB) boxB.onclick = () => setActiveSlot('B');
    setActiveSlot('A');
}

function setActiveSlot(slot) {
    state.activeSlot = slot;
    updateSelectionUI();
}

export function updateSelectionUI() {
    // 1. Update Periodic Table Highlighting
    document.querySelectorAll('.element').forEach(el => {
        el.classList.remove('selected-a', 'selected-b', 'has-data');
        const sym = el.dataset.symbol;
        if (state.availableElements.has(sym)) el.classList.add('has-data');
        if (sym === state.selectedA) el.classList.add('selected-a');
        if (sym === state.selectedB) el.classList.add('selected-b');
    });

    // 2. Update Sidebar Boxes
    const atomA = document.getElementById('atom-a-display');
    const atomB = document.getElementById('atom-b-display');
    
    if(atomA) {
        atomA.className = state.activeSlot === 'A' ? 'atom-box active-focus' : 'atom-box';
        if (state.selectedA) atomA.classList.add('filled-a');
        const symSpan = atomA.querySelector('.symbol');
        if(symSpan) symSpan.textContent = state.selectedA || '--';
    }

    if(atomB) {
        atomB.className = state.activeSlot === 'B' ? 'atom-box active-focus' : 'atom-box';
        if (state.selectedB) atomB.classList.add('filled-b');
        const symSpan = atomB.querySelector('.symbol');
        if(symSpan) symSpan.textContent = state.selectedB || '--';
    }
    
    // 3. Formula Update & AUTO-PINNING
    const formulaDisplay = document.getElementById('formula-display');
    if (state.selectedA && state.selectedB) {
        if(formulaDisplay) {
            formulaDisplay.textContent = `${state.selectedA}₂${state.selectedB}₂O₇`;
            formulaDisplay.style.color = '#fff';
        }

        // --- GOAL 3: Auto-Pin Spectra ---
        const id = `${state.selectedA}2${state.selectedB}2O7`;
        const exists = state.comparisonSpectra.find(c => c.id === id);
        
        if (!exists) {
            // Stack on top
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
                fileFilter: [] // Empty = All files
            });
        }
    } else {
        if(formulaDisplay) {
            formulaDisplay.textContent = 'A₂B₂O₇';
            formulaDisplay.style.color = '#666';
        }
    }

    // 4. Update Spectrum Card
    renderSpectrum();
}