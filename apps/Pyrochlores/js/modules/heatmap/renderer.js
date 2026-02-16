import { state } from '../../state.js';
import { Z_MAP, COLORS } from './constants.js';
import { isKramers, getExcitedStateGap } from './utils.js';

export function initHeatmap() {
    // UPDATED: Listen to input field
    const input = document.getElementById('heatmap-state-input');
    if (input) {
        input.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val) && val >= 1) {
                state.heatmapTargetIndex = val;
                renderHeatmap();
            }
        });
    }
}

export function renderHeatmap() {
    const container = document.getElementById('heatmap-plot');
    if(!container) return;

    const data = state.heatmapRawData;
    const targetState = state.heatmapTargetIndex || 1; 
    
    if (!data || data.length === 0) {
        container.innerHTML = "<div style='color:#aaa; text-align:center; padding:60px; font-style:italic'>No matching data found in log.<br>Showing only crystals with valid calculations.</div>";
        return;
    }

    // 1. Organize Axes
    const setA = new Set();
    const setB = new Set();
    const mapKeyToGap = {}; 

    data.forEach(d => {
        if (Z_MAP[d.A] && Z_MAP[d.B]) {
            setA.add(d.A);
            setB.add(d.B);
            
            const gap = getExcitedStateGap(d.energies, targetState);
            if (gap !== null) {
                mapKeyToGap[`${d.A}_${d.B}`] = gap;
            }
        }
    });

    const sortedA = Array.from(setA).sort((a, b) => Z_MAP[a] - Z_MAP[b]);
    const sortedB = Array.from(setB).sort((a, b) => Z_MAP[a] - Z_MAP[b]);

    // 2. Build Z Matrix
    const zValues = [];
    let minVal = Infinity;
    let maxVal = -Infinity;

    for (const b of sortedB) {
        const row = [];
        for (const a of sortedA) {
            const val = mapKeyToGap[`${a}_${b}`];
            if (val !== undefined) {
                row.push(val);
                if(val < minVal) minVal = val;
                if(val > maxVal) maxVal = val;
            } else {
                row.push(null);
            }
        }
        zValues.push(row);
    }

    // 3. Annotations
    const annotations = [];
    sortedB.forEach((b, i) => { 
        sortedA.forEach((a, j) => { 
            const val = zValues[i][j];
            if (val !== null) {
                let normVal = 0.5;
                if (maxVal > minVal) normVal = (val - minVal) / (maxVal - minVal);
                const textColor = normVal > 0.5 ? 'black' : 'white';

                annotations.push({
                    x: a, y: b,
                    text: val.toFixed(1),
                    showarrow: false,
                    font: { color: textColor, family: 'Inter, sans-serif', size: 11, weight: 'bold' }
                });
            }
        });
    });

    // 4. Axis Labels
    const tickTextA = sortedA.map(elem => {
        const color = isKramers(elem) ? COLORS.kramers : COLORS.nonKramers;
        return `<span style="color: ${color}; font-weight: bold;">${elem}</span>`;
    });
    const tickTextB = sortedB.map(elem => `<span style="color: ${COLORS.textLight}; font-weight: bold;">${elem}</span>`);

    // 5. Plotly Config
    const trace = {
        x: sortedA, y: sortedB, z: zValues,
        type: 'heatmap', colorscale: 'Viridis',
        xgap: 2, ygap: 2, hoverongaps: false, showscale: true,
        colorbar: {
            title: 'Gap (meV)', titleside: 'right',
            tickfont: { color: COLORS.textDim }, titlefont: { color: COLORS.textDim }
        }
    };

    const layout = {
        title: { text: "", font: { color: '#fff' } },
        paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)',
        margin: { t: 20, b: 50, l: 60, r: 20 },
        annotations: annotations,
        xaxis: {
            title: { text: "A-Site", font: { color: COLORS.textDim, size: 14 } },
            tickvals: sortedA, ticktext: tickTextA, tickfont: { size: 12 }, side: 'bottom'
        },
        yaxis: {
            title: { text: "B-Site", font: { color: COLORS.textDim, size: 14 } },
            tickvals: sortedB, ticktext: tickTextB, tickfont: { size: 12 }
        },
        font: { family: 'Inter, sans-serif' }
    };

    Plotly.newPlot(container, [trace], layout, { responsive: true, displayModeBar: false });
}