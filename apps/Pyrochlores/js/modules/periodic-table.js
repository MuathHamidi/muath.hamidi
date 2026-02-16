/* js/modules/periodic-table.js */
// Updated import path to the new directory
import periodicTableData, { lanthanides, actinides } from '../periodic-table-data/index.js';
import { state } from '../state.js';
import { findMatchingFiles } from './file-manager/index.js';
import { updateSelectionUI } from './ui/index.js'; 

const CAT_COLORS = {
    "Alkali metal": "var(--cat-alkali)",
    "Alkaline earth metal": "var(--cat-alkaline)",
    "Transition metal": "var(--cat-transition)",
    "Lanthanide": "var(--cat-lanthanide)",
    "Actinide": "var(--cat-actinide)",
    "Post-transition metal": "var(--cat-post)",
    "Metalloid": "var(--cat-metalloid)",
    "Diatomic nonmetal": "var(--cat-diatomic)",
    "Polyatomic nonmetal": "var(--cat-polyatomic)",
    "Noble gas": "var(--cat-noble)",
    "Unknown properties": "var(--cat-unknown)"
};

// --- MAIN TABLE ---
export function initPeriodicTable() {
    const container = document.getElementById('ptable');
    if(!container) return;
    container.innerHTML = ''; 
    
    // 1. Main Grid
    periodicTableData.forEach(data => container.appendChild(createElementDiv(data, false)));
    
    // 2. Spacer
    const spacer = document.createElement('div');
    spacer.className = 'row-spacer';
    container.appendChild(spacer);

    // 3. Lanthanides
    const lSpace = document.createElement('div');
    lSpace.className = 'lanthanide-spacer';
    container.appendChild(lSpace);
    lanthanides.forEach(data => container.appendChild(createElementDiv(data, false)));

    // 4. Actinides
    const aSpace = document.createElement('div');
    aSpace.className = 'lanthanide-spacer';
    container.appendChild(aSpace);
    actinides.forEach(data => container.appendChild(createElementDiv(data, false)));
}

// --- MINI SIDEBAR TABLE ---
export function initMiniPeriodicTable() {
    const container = document.getElementById('sidebar-ptable');
    if(!container) return;
    container.innerHTML = '';

    // 1. Main Grid
    periodicTableData.forEach(data => container.appendChild(createElementDiv(data, true)));

    // 2. Spacer
    const spacer = document.createElement('div');
    spacer.className = 'row-spacer-mini';
    container.appendChild(spacer);

    // 3. Lanthanides
    const lSpace = document.createElement('div');
    lSpace.className = 'lanthanide-spacer-mini';
    container.appendChild(lSpace);
    lanthanides.forEach(data => container.appendChild(createElementDiv(data, true)));

    // 4. Actinides
    const aSpace = document.createElement('div');
    aSpace.className = 'lanthanide-spacer-mini';
    container.appendChild(aSpace);
    actinides.forEach(data => container.appendChild(createElementDiv(data, true)));
}

function createElementDiv(data, isMini) {
    const div = document.createElement('div');

    if (!data.s) {
        div.className = 'element empty';
        return div;
    }

    if (data.isPlaceholder) {
        div.className = 'element placeholder';
        if(!isMini) div.innerHTML = `<span class="symbol" style="font-size:0.8em">${data.s}</span>`;
        return div;
    }

    div.className = 'element'; 
    
    // Minimal content for sidebar
    if (isMini) {
        div.innerHTML = `<span class="symbol">${data.s}</span>`;
    } else {
        div.innerHTML = `
            <span class="number">${data.n}</span>
            <span class="symbol">${data.s}</span>
            <span class="mass">${data.m ? Math.round(data.m) : ''}</span>
        `;
    }
    
    div.dataset.symbol = data.s;
    div.dataset.tooltip = `${data.name} (${data.cat})`;
    
    // Only apply category colors to Main table to keep sidebar clean/dark
    if (!isMini && CAT_COLORS[data.cat]) {
        div.style.color = CAT_COLORS[data.cat];
    } else if(isMini) {
        div.style.color = '#666'; // Default dim color for mini
    }

    div.onclick = () => handleElementClick(data.s, data.name);
    return div;
}

export function updatePeriodicTableHeatmap() {
    let maxCount = 0;
    for (let k in state.elementCounts) {
        if (state.elementCounts[k] > maxCount) maxCount = state.elementCounts[k];
    }

    // Target both main and sidebar elements
    // The shared 'element' class makes this work for both
    document.querySelectorAll('.element').forEach(el => {
        if (el.classList.contains('empty') || el.classList.contains('placeholder')) return;

        const sym = el.dataset.symbol;
        if (!sym) return;

        el.classList.remove('has-data');
        el.style.backgroundColor = ''; 
        
        const count = state.elementCounts[sym] || 0;
        
        if (count > 0) {
            el.classList.add('has-data');
            const intensity = Math.min(count / (maxCount * 0.8), 1); 
            
            if (intensity > 0) {
                const opacity = 0.3 + (0.7 * intensity);
                el.style.backgroundColor = `rgba(76, 201, 240, ${opacity})`;
                el.style.color = '#fff';
            }
        }
    });

    updateSelectionUI();
}

function handleElementClick(symbol, name) {
    if (state.activeSlot === 'A') {
        if (state.selectedA === symbol) {
            state.selectedA = null;
        } else {
            state.selectedA = symbol;
            document.querySelector('#atom-a-display .full-name').textContent = name;
            if (!state.selectedB) state.activeSlot = 'B';
        }
    } else if (state.activeSlot === 'B') {
        if (state.selectedB === symbol) {
            state.selectedB = null;
        } else {
            state.selectedB = symbol;
            document.querySelector('#atom-b-display .full-name').textContent = name;
        }
    }
    updateSelectionUI();
    findMatchingFiles();
}