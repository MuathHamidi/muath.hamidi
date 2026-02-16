/* js/modules/spectrum/merger/ui.js */
import { state } from '../../../state.js';
import { getNextColor } from '../utils.js';
// Updated Import
import { renderMerger } from './renderer/index.js';

let availableFormulas = [];

export function initMergerUI() {
    const createBtn = document.getElementById('btn-create-merge');
    const modal = document.getElementById('merge-modal');
    const closeModal = document.getElementById('btn-close-merge-modal');
    const saveBtn = document.getElementById('btn-save-merge');
    const searchInput = document.getElementById('merge-search');
    
    if (createBtn) createBtn.addEventListener('click', openMergeModal);
    if (closeModal) closeModal.addEventListener('click', () => modal.style.display = 'none');
    if (saveBtn) saveBtn.addEventListener('click', handleSaveMerge);
    if (searchInput) searchInput.addEventListener('input', filterMergeList);
}

function openMergeModal() {
    const modal = document.getElementById('merge-modal');
    const list = document.getElementById('merge-list-container');
    const nameInput = document.getElementById('merge-name-input');
    
    const unique = new Set();
    state.heatmapRawData.forEach(d => {
        if (d.A && d.B) unique.add(`${d.A}2${d.B}2O7`);
    });
    availableFormulas = Array.from(unique).sort();

    list.innerHTML = '';
    availableFormulas.forEach(f => {
        const div = document.createElement('label');
        div.className = 'merge-check-item';
        div.innerHTML = `<input type="checkbox" value="${f}"> ${f}`;
        list.appendChild(div);
    });

    nameInput.value = `Merge ${state.mergedSpectra.length + 1}`;
    updateCount();
    
    list.querySelectorAll('input').forEach(cb => {
        cb.addEventListener('change', updateCount);
    });

    modal.style.display = 'flex';
    document.getElementById('merge-search').value = '';
}

function filterMergeList(e) {
    const term = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.merge-check-item');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(term) ? 'flex' : 'none';
    });
}

function updateCount() {
    const count = document.querySelectorAll('.merge-check-item input:checked').length;
    document.getElementById('merge-selection-count').textContent = `${count} selected`;
}

function handleSaveMerge() {
    const nameInput = document.getElementById('merge-name-input');
    const checked = Array.from(document.querySelectorAll('.merge-check-item input:checked')).map(cb => cb.value);
    
    if (checked.length === 0) return;

    state.mergedSpectra.push({
        id: nameInput.value || "Untitled Merge",
        constituents: checked,
        color: getNextColor(),
        yPos: state.mergedSpectra.length
    });

    document.getElementById('merge-modal').style.display = 'none';
    renderMerger();
}