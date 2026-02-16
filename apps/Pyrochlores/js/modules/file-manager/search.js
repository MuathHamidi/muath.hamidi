import { state } from '../../state.js';
import { loadFile } from './loader.js';

export function initSearch() {
    const input = document.getElementById('file-search');

    const runSearch = () => findMatchingFiles(input.value);

    if (input) input.addEventListener('input', runSearch);
}

export function filterFiles(searchText = "") {
    findMatchingFiles(searchText);
}

export function findMatchingFiles(searchText = "") {
    const listContainer = document.getElementById('file-list');
    const countLabel = document.getElementById('match-count');
    listContainer.innerHTML = '';

    if (!state.selectedA || !state.selectedB) {
        listContainer.innerHTML = '<div class="empty-state">Select A & B elements</div>';
        if(countLabel) countLabel.textContent = "";
        return;
    }

    const formula = `${state.selectedA}2${state.selectedB}2O7`;
    const searchLower = searchText.toLowerCase();

    // Filter Logic
    const matches = state.knownFiles.filter(fname => {
        const nameLower = fname.toLowerCase();
        
        // 1. Formula Match
        if (!nameLower.includes(formula.toLowerCase())) return false;
        
        // 2. Text Search
        if (searchText && !nameLower.includes(searchLower)) return false;

        return true;
    }).sort();

    if(countLabel) countLabel.textContent = `${matches.length} found`;

    if (matches.length === 0) {
        listContainer.innerHTML = `<div class="empty-state">No matching files.</div>`;
        return;
    }

    matches.forEach((fname, index) => {
        const div = document.createElement('div');
        div.className = 'file-item';
        
        // Meta Display
        const meta = state.fileMetadata[fname];
        const gapText = meta && meta.gap !== null ? `${meta.gap.toFixed(2)} meV` : '';

        div.innerHTML = `<span>${fname}</span><span class="file-gap-badge">${gapText}</span>`;
        div.onclick = () => loadFile(fname, div);
        listContainer.appendChild(div);

        // Auto-select first match if it's a fresh strict search (A/B selected, no typing)
        if (index === 0 && (searchText === "" && matches.length === 1)) {
            setTimeout(() => div.click(), 0);
        }
    });
}