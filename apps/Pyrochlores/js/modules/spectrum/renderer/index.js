/* js/modules/spectrum/renderer/index.js */
import { state } from '../../../state.js';
import { generateTraces, createLabel } from './traces.js';
import { createLayout } from './layout.js';

export function renderSpectrum() {
    const container = document.getElementById('spectrum-plot');
    if (!container) return;

    // Inputs
    const minInput = document.getElementById('spectrum-min');
    const maxInput = document.getElementById('spectrum-max');
    const avgToggle = document.getElementById('spectrum-avg-toggle');
    const splitToggle = document.getElementById('spectrum-split-toggle');
    
    // GOAL 2: Default Range 0 - 1000
    const minVal = minInput && minInput.value !== "" ? parseFloat(minInput.value) : 0;
    const maxVal = maxInput && maxInput.value !== "" ? parseFloat(maxInput.value) : 1000;
    
    const useAverage = avgToggle ? avgToggle.checked : false;
    const useSplit = splitToggle ? splitToggle.checked : false;

    // 1. Prepare Items
    // GOAL 3: All items in comparisonSpectra are considered "Pinned". 
    // We no longer transiently add the 'Current' selection because ui.js auto-pushes it to comparisonSpectra.
    const allItems = state.comparisonSpectra;

    // 2. Generate Traces & Annotations
    const { traces, annotations } = generateTraces(allItems, {
        useSplit, 
        useAverage, 
        minVal, 
        maxVal,
        heatmapData: state.heatmapRawData
    });

    // 3. Configure Layout
    const layout = createLayout(allItems, minVal, maxVal, annotations);
    const config = { responsive: true, displayModeBar: false, scrollZoom: true };
    
    // 4. Render
    container.data = traces; // Pass references for interaction handlers
    Plotly.newPlot(container, traces, layout, config);
}