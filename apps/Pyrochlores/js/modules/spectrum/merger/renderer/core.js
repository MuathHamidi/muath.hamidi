/* js/modules/spectrum/merger/renderer/core.js */
import { state } from '../../../../state.js';
import { getColorForString } from '../../utils.js';
import { getEnergiesForFormula, processEnergies } from './data.js';
import { createMergerLayout } from './layout.js';
import { setupMergerInteractions } from './interactions.js';

export function renderMerger() {
    const container = document.getElementById('merger-plot');
    if (!container) return;

    if (state.mergedSpectra.length === 0) {
        container.innerHTML = '<div class="empty-state-panel">No merges created.<br>Click "+ Create Merge" or use Context Menu in Spectrum Card.</div>';
        return;
    }

    const avgToggle = document.getElementById('merger-avg-toggle');
    const minInput = document.getElementById('merger-min');
    const maxInput = document.getElementById('merger-max');

    const useAverage = avgToggle ? avgToggle.checked : true;
    const minVal = minInput ? (parseFloat(minInput.value) || 0) : 0;
    const maxVal = maxInput ? (parseFloat(maxInput.value) || 1000) : 1000;

    const traces = [];
    const annotations = [];

    state.mergedSpectra.forEach(merge => {
        merge.constituents.forEach((formula) => {
            const rawArrays = getEnergiesForFormula(formula);
            if (rawArrays.length === 0) return;

            let finalEnergies = processEnergies(rawArrays, useAverage);
            const traceColor = getColorForString(formula);

            traces.push({
                x: finalEnergies,
                y: Array(finalEnergies.length).fill(merge.yPos),
                mode: 'markers',
                type: 'scatter',
                name: formula,
                marker: { 
                    symbol: 'line-ns-open', 
                    size: 20, 
                    color: traceColor, 
                    opacity: 0.9,
                    line: { width: 2, color: traceColor } 
                },
                hovertemplate: `<b>${formula}</b><br>%{x:.2f} meV<extra></extra>`
            });
        });

        // Left-side Interactive Label
        annotations.push({
            xref: 'paper',
            x: -0.02,
            xanchor: 'right',
            y: merge.yPos,
            yref: 'y',
            yanchor: 'middle',
            text: merge.id,
            showarrow: false,
            font: { color: '#e0e0e0', size: 13, family: 'JetBrains Mono, monospace', weight: 'bold' },
            captureevents: true // Enable click detection
        });
    });

    const layout = createMergerLayout(state.mergedSpectra.length, annotations, minVal, maxVal);
    
    // Check if listener already attached to avoid duplicates? 
    // Usually Plotly.newPlot clears innerHTML, but event listeners on container persist.
    // However, setupMergerInteractions uses 'mousedown' which is safe to re-attach if we clone or careful.
    // Better pattern: Remove old if necessary, or rely on idempotency if complex. 
    // Simple way: Clone node to strip listeners (drastic) or just attach once.
    // Since we don't have a global init flag here easily, we'll attach. 
    // *Optimization*: In a real app, attach listeners in initMerger() not render. 
    // But to keep logic self-contained per prompt request, we will leave interaction setup here 
    // but guard it or ensure it's robust. 
    // Actually, looking at original code, it attached on every render. We will match that behavior 
    // but ideally, we should use 'on' for Plotly events, but this is a DOM event.
    
    // To prevent duplicate listeners on re-render:
    const newContainer = container.cloneNode(false); // shallow clone
    container.parentNode.replaceChild(newContainer, container);
    
    // Re-assign ID is kept by cloneNode.
    setupMergerInteractions(newContainer);
    
    Plotly.newPlot(newContainer, traces, layout, { responsive: true, displayModeBar: false });
}