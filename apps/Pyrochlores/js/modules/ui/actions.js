/* js/modules/ui/actions.js */
import { state } from '../../state.js';
import { showToast } from './notifications.js';

export function switchTab(viewName) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.panel-content.table-view, .panel-content.code-view').forEach(p => p.style.display = 'none');
    
    if (viewName === 'parsed') {
        const viewParsed = document.getElementById('view-parsed');
        if(viewParsed) viewParsed.style.display = 'block';
        const btn = document.querySelector('.tab-btn:nth-child(1)');
        if(btn) btn.classList.add('active');
    } else {
        const viewRaw = document.getElementById('view-raw');
        if(viewRaw) viewRaw.style.display = 'block';
        const btn = document.querySelector('.tab-btn:nth-child(2)');
        if(btn) btn.classList.add('active');
    }
}

export function copyCif() {
    const el = document.getElementById('cif-content');
    if(!el) return;
    const text = el.textContent;
    if(!text || text.includes('Select a file')) return;
    navigator.clipboard.writeText(text).then(() => {
        showToast('CIF copied to clipboard', 'success');
    });
}

export function toggleFullscreen(cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;
    card.classList.toggle('fullscreen-card');
    // If expanding the 3D viewer card, trigger resize
    if (state.glViewer) setTimeout(() => state.glViewer.resize(), 50);
}