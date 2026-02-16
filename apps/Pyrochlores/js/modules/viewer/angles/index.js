/* js/modules/viewer/angles/index.js */
import { calculateAngles } from './calc.js';
import { initAnglesViewer, renderAngleVisual } from './renderer.js';
import { state } from '../../../state.js';

// Store the master list of angles here
let fullAnglesData = [];

export function initAnglesLogic() {
    initAnglesViewer();
    
    const search = document.getElementById('angle-search');
    if (search) {
        search.addEventListener('input', (e) => filterAnglesTable(e.target.value));
    }
}

export function processAngles(cifText) {
    const results = calculateAngles(cifText);
    fullAnglesData = results; // Update the source of truth
    renderAnglesTable(results);
    
    const countEl = document.getElementById('angle-unique-count');
    if(countEl) countEl.textContent = results.length;
}

function renderAnglesTable(data) {
    const tbody = document.getElementById('angles-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px; color:#666;">No angles found matching criteria.</td></tr>';
        return;
    }

    data.forEach(item => {
        const row = document.createElement('tr');
        row.style.cursor = 'pointer';
        row.innerHTML = `
            <td style="font-weight:bold; color:#e0e0e0;">${item.id}</td>
            <td style="color:var(--primary); font-family:var(--font-code); text-align:right;">${item.angle.toFixed(2)}</td>
            <td style="color:#888; font-size:0.85em; text-align:right;">±${item.std.toFixed(2)}</td>
            <td style="color:#aaa; font-size:0.85em; text-align:right;">${item.count}</td>
        `;
        
        row.onclick = () => {
            document.querySelectorAll('#angles-tbody tr').forEach(r => {
                r.style.background = 'transparent';
                r.style.borderLeft = 'none';
            });
            row.style.background = 'var(--bg-hover)';
            row.style.borderLeft = '3px solid var(--primary)';
            
            renderAngleVisual(item.id, item.parts, item.angle);
        };
        
        tbody.appendChild(row);
    });
}

function filterAnglesTable(term) {
    const t = term.toLowerCase();
    // Always filter against the full dataset
    const filtered = fullAnglesData.filter(item => item.id.toLowerCase().includes(t));
    renderAnglesTable(filtered); 
}