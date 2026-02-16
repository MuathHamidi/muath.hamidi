/* js/modules/spectrum/interactions/context-menu.js */
import { state } from '../../../state.js';
import { renderSpectrum } from '../renderer/index.js';
import { createMergeFrom, addTraceToLastMerge } from '../merger/index.js';

let activeGraphDiv = null;
let ctxFormulaID = null;

export function initContextMenu(graphDiv) {
    activeGraphDiv = graphDiv;
    const ctxMenu = document.getElementById('spectrum-context-menu');
    graphDiv.addEventListener('contextmenu', (e) => handleContextMenu(e, ctxMenu));
    initContextMenuUI(ctxMenu);
}

function handleContextMenu(e, ctxMenu) {
    e.preventDefault();
    if (currentHoverIndex === -1) return;

    const traceData = activeGraphDiv.data[currentHoverIndex];
    ctxFormulaID = traceData.customdata ? traceData.customdata[0] : null;
    if (!ctxFormulaID) return;

    ctxMenu.style.display = 'flex';
    ctxMenu.style.left = e.pageX + 'px';
    ctxMenu.style.top = e.pageY + 'px';

    document.getElementById('ctx-header').textContent = ctxFormulaID;
    
    // Add "Filter Files" Option if it doesn't exist
    let filterBtn = document.getElementById('ctx-btn-filter');
    if (!filterBtn) {
        filterBtn = document.createElement('div');
        filterBtn.id = 'ctx-btn-filter';
        filterBtn.className = 'ctx-item';
        filterBtn.style.borderBottom = '1px solid var(--border)';
        filterBtn.innerHTML = '<span>📂 Select Files...</span>';
        // Insert after color picker
        const colorItem = document.getElementById('ctx-color-input').parentNode;
        colorItem.parentNode.insertBefore(filterBtn, colorItem.nextSibling);
        
        filterBtn.addEventListener('click', () => openFilterModal(ctxFormulaID));
    }
}

// Track hover index locally
let currentHoverIndex = -1;

function initContextMenuUI(ctxMenu) {
    activeGraphDiv.on('plotly_hover', (data) => {
        if(data.points.length > 0) currentHoverIndex = data.points[0].curveNumber;
    });
    activeGraphDiv.on('plotly_unhover', () => { currentHoverIndex = -1; });
    document.addEventListener('click', () => ctxMenu.style.display = 'none');
    
    const colorInput = document.getElementById('ctx-color-input');
    colorInput.addEventListener('input', (e) => {
        if (!ctxFormulaID) return;
        const item = state.comparisonSpectra.find(s => s.id === ctxFormulaID);
        if (item) {
            item.color = e.target.value;
            renderSpectrum();
        }
    });

    const btnNewMerge = document.getElementById('ctx-btn-merge-new');
    if(btnNewMerge) btnNewMerge.addEventListener('click', () => {
        if(ctxFormulaID) createMergeFrom(ctxFormulaID);
    });

    const btnAddMerge = document.getElementById('ctx-btn-merge-add');
    if(btnAddMerge) btnAddMerge.addEventListener('click', () => {
        if(ctxFormulaID) addTraceToLastMerge(ctxFormulaID);
    });

    document.getElementById('ctx-btn-remove').addEventListener('click', () => {
        if (!ctxFormulaID) return;
        const idx = state.comparisonSpectra.findIndex(s => s.id === ctxFormulaID);
        if (idx !== -1) {
            state.comparisonSpectra.splice(idx, 1);
            renderSpectrum();
        }
    });

    document.getElementById('ctx-btn-reset').addEventListener('click', () => {
         if (!ctxFormulaID) return;
         const item = state.comparisonSpectra.find(s => s.id === ctxFormulaID);
         if (item) {
             item.yPos = state.comparisonSpectra.indexOf(item);
             renderSpectrum();
         }
    });
}

function openFilterModal(formulaID) {
    const item = state.comparisonSpectra.find(s => s.id === formulaID);
    if (!item) return;

    const modal = document.getElementById('spectrum-filter-modal');
    const title = document.getElementById('spectrum-filter-title');
    const list = document.getElementById('spectrum-file-list');
    const saveBtn = document.getElementById('btn-save-spectrum-filter');

    title.textContent = formulaID;
    saveBtn.dataset.targetId = formulaID;

    // Get all files for this formula
    const allFiles = state.heatmapRawData.filter(d => d.A === item.A && d.B === item.B);
    
    list.innerHTML = '';
    
    allFiles.forEach(fileData => {
        const div = document.createElement('label');
        div.className = 'merge-check-item';
        div.style.display = 'flex';
        div.style.gap = '10px';
        div.style.padding = '5px';
        div.style.cursor = 'pointer';

        const isChecked = !item.fileFilter || item.fileFilter.length === 0 || item.fileFilter.includes(fileData.fileName);
        
        div.innerHTML = `
            <input type="checkbox" class="spec-file-cb" value="${fileData.fileName}" ${isChecked ? 'checked' : ''}>
            <span>${fileData.fileName}</span>
        `;
        list.appendChild(div);
    });

    modal.style.display = 'flex';
}