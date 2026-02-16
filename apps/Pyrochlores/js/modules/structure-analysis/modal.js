/* js/modules/structure-analysis/modal.js */
import { state } from '../../state.js';
// Updated Import
import { showToast } from '../ui/index.js';
import { updateDatabasePlots } from './plots.js';

export function openStructureSelectionModal(A, B, dataKey) {
    const modal = document.getElementById('structure-select-modal');
    const compLabel = document.getElementById('struct-modal-comp');
    const list = document.getElementById('struct-file-list');
    const avgBtn = document.getElementById('btn-struct-use-avg');
    const avgValSpan = document.getElementById('struct-avg-val');

    const compId = `${A}_${B}`;
    compLabel.textContent = `${A}₂${B}₂O₇ (${dataKey === 'lattice' ? 'Lattice a' : 'Oxygen x'})`;
    avgBtn.dataset.comp = compId;

    const items = state.structureData.filter(d => d.A === A && d.B === B && d[dataKey] !== null);
    
    const sum = items.reduce((acc, curr) => acc + curr[dataKey], 0);
    const avg = items.length ? (sum / items.length).toFixed(4) : '--';
    avgValSpan.textContent = avg;

    const currentOverride = state.structureOverrides[compId];
    if (!currentOverride) {
        avgBtn.classList.add('active'); 
        avgBtn.style.borderColor = 'var(--primary)';
    } else {
        avgBtn.classList.remove('active');
        avgBtn.style.borderColor = 'var(--border)';
    }

    list.innerHTML = '';
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'file-item';
        div.style.justifyContent = 'space-between';
        
        const isSelected = item.fileName === currentOverride;
        if (isSelected) {
            div.classList.add('active');
            div.style.borderLeft = '3px solid var(--primary)';
        }

        div.innerHTML = `
            <span>${item.fileName}</span>
            <span class="file-gap-badge" style="color:var(--text-main)">${item[dataKey].toFixed(4)}</span>
        `;
        
        div.onclick = () => {
            state.structureOverrides[compId] = item.fileName;
            modal.style.display = 'none';
            updateDatabasePlots();
            showToast(`Selected ${item.fileName}`, 'success');
        };
        list.appendChild(div);
    });

    modal.style.display = 'flex';
}