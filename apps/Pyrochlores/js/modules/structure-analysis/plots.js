/* js/modules/structure-analysis/plots.js */
import { state } from '../../state.js';
import { Z_MAP } from '../heatmap/constants.js';
import { getDisplayData } from './utils.js';
import { openStructureSelectionModal } from './modal.js';

export function updateDatabasePlots() {
    renderLatticeHeatmap();
    renderOxygenHeatmap();
    renderCorrelationPlot();
}

export function renderLatticeHeatmap() {
    const container = document.getElementById('lattice-plot');
    if (!container) return;
    const dataMap = getDisplayData('lattice');
    plotHeatmapGeneric(container, dataMap, 'Lattice Parameter a (Å)', 'Viridis', 'lattice');
}

export function renderOxygenHeatmap() {
    const container = document.getElementById('oxygen-plot');
    if (!container) return;
    const dataMap = getDisplayData('oxygen');
    plotHeatmapGeneric(container, dataMap, 'Oxygen x (48f)', 'Plasma', 'oxygen');
}

function plotHeatmapGeneric(container, dataMap, label, colorscale, dataKey) {
    if (Object.keys(dataMap).length === 0) {
        container.innerHTML = '<div class="empty-state-panel">No data found.</div>';
        return;
    }

    const setA = new Set();
    const setB = new Set();
    
    state.structureData.forEach(d => {
        if(Z_MAP[d.A] && Z_MAP[d.B]) {
            setA.add(d.A);
            setB.add(d.B);
        }
    });

    const sortedA = Array.from(setA).sort((a, b) => Z_MAP[a] - Z_MAP[b]);
    const sortedB = Array.from(setB).sort((a, b) => Z_MAP[a] - Z_MAP[b]);

    const zValues = [];
    for (const b of sortedB) {
        const row = [];
        for (const a of sortedA) {
            const val = dataMap[`${a}_${b}`];
            row.push(val !== undefined ? val : null);
        }
        zValues.push(row);
    }

    const trace = {
        x: sortedA, y: sortedB, z: zValues,
        type: 'heatmap', colorscale: colorscale,
        xgap: 2, ygap: 2, hoverongaps: false,
        colorbar: { title: label, titleside: 'right' }
    };

    const layout = {
        title: { text: "", font: { color: '#fff' } },
        paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)',
        margin: { t: 20, b: 40, l: 50, r: 20 },
        xaxis: { title: { text: 'A-Site' }, color: '#aaa' },
        yaxis: { title: { text: 'B-Site' }, color: '#aaa' },
        annotations: createHeatmapAnnotations(sortedA, sortedB, zValues)
    };

    Plotly.newPlot(container, [trace], layout, { responsive: true, displayModeBar: false });

    container.on('plotly_click', (data) => {
        const pt = data.points[0];
        const A = pt.x;
        const B = pt.y;
        if (A && B) {
            openStructureSelectionModal(A, B, dataKey);
        }
    });
}

function createHeatmapAnnotations(xA, yB, zVal) {
    const annotations = [];
    yB.forEach((b, i) => {
        xA.forEach((a, j) => {
            const val = zVal[i][j];
            if (val !== null) {
                const isOverride = state.structureOverrides[`${a}_${b}`] != null;
                annotations.push({
                    x: a, y: b,
                    text: val.toFixed(3) + (isOverride ? '*' : ''),
                    showarrow: false,
                    font: { 
                        color: 'white', 
                        size: 9, 
                        family: 'Inter',
                        weight: isOverride ? 'bold' : 'normal'
                    },
                    bgcolor: isOverride ? 'rgba(76, 201, 240, 0.5)' : 'rgba(0,0,0,0.3)'
                });
            }
        });
    });
    return annotations;
}

export function renderCorrelationPlot() {
    const container = document.getElementById('correlation-plot');
    if (!container) return;

    if (state.structureData.length === 0) {
        container.innerHTML = '<div class="empty-state-panel">Waiting for scan...</div>';
        return;
    }

    const xVals = [];
    const yVals = [];
    const textVals = [];
    const colorVals = [];
    
    const mode = state.structureColorMode || 'B';
    const labelZ = mode === 'A' ? 'A-Site' : 'B-Site';

    state.structureData.forEach(d => {
        if (d.lattice !== null && d.oxygen !== null) {
            xVals.push(d.lattice);
            yVals.push(d.oxygen);
            textVals.push(`${d.A}2${d.B}2O7`);
            
            const zVal = mode === 'A' ? (Z_MAP[d.A] || 0) : (Z_MAP[d.B] || 0);
            colorVals.push(zVal);
        }
    });

    const trace = {
        x: xVals, y: yVals, text: textVals, mode: 'markers', type: 'scatter',
        marker: {
            size: 12, color: colorVals, colorscale: 'Portland',
            opacity: 0.8, line: { width: 1, color: '#fff' },
            colorbar: { title: `${labelZ} Z`, titleside: 'right', thickness: 15 }
        },
        hovertemplate: 
            '<b>%{text}</b><br>' + 
            'Lattice a: %{x:.4f} Å<br>' + 
            'Oxygen x: %{y:.4f}<br>' +
            `<br>${labelZ} Z: %{marker.color}` +
            '<extra></extra>'
    };

    const layout = {
        title: { text: "", font: { color: '#fff' } },
        paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)',
        margin: { t: 20, b: 50, l: 70, r: 20 },
        xaxis: { 
            title: { text: "Lattice Parameter a (Å)", font: { color: '#aaa', size: 14 } }, 
            color: '#aaa', gridcolor: '#333'
        },
        yaxis: { 
            title: { text: "Oxygen x Position (48f)", font: { color: '#aaa', size: 14 } }, 
            color: '#aaa', gridcolor: '#333'
        },
        hovermode: 'closest'
    };

    Plotly.newPlot(container, [trace], layout, { responsive: true, displayModeBar: false });
}