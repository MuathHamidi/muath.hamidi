/* js/modules/viewer/distance/stats.js */

export function updateStats(distances) {
    const countEl = document.getElementById('dist-stat-count');
    const meanEl = document.getElementById('dist-stat-mean');
    const rangeEl = document.getElementById('dist-stat-range');
    const stdEl = document.getElementById('dist-stat-std');

    if (distances.length === 0) {
        countEl.textContent = "0";
        meanEl.textContent = "--";
        rangeEl.textContent = "--";
        stdEl.textContent = "--";
        return;
    }

    const n = distances.length;
    const sum = distances.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    
    // Variance/Std Dev
    const variance = distances.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);

    const min = Math.min(...distances);
    const max = Math.max(...distances);

    countEl.textContent = n;
    meanEl.textContent = mean.toFixed(4) + " Å";
    rangeEl.textContent = `${min.toFixed(3)} - ${max.toFixed(3)}`;
    stdEl.textContent = `± ${stdDev.toFixed(4)}`;
}

export function updateHistogram(distances, title) {
    const container = document.getElementById('dist-histogram');
    if (!container) return;
    
    if (distances.length === 0) {
        Plotly.purge(container);
        container.innerHTML = "<div style='color:#666; font-size:0.8em; text-align:center; padding-top:40px;'>No bonds found.<br>Try increasing cutoff.</div>";
        return;
    }

    // Dynamic bin size based on spread
    const spread = Math.max(...distances) - Math.min(...distances);
    const binSize = spread > 0 ? spread / 20 : 0.01;

    const trace = {
        x: distances,
        type: 'histogram',
        marker: {
            color: '#4cc9f0',
            line: { color: '#0f1014', width: 1 }
        },
        opacity: 0.8,
        xbins: { size: Math.max(binSize, 0.01) } 
    };

    const layout = {
        margin: { t: 10, b: 30, l: 30, r: 10 },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        xaxis: { 
            title: 'Distance (Å)', 
            color: '#8b949e', 
            tickfont: {size: 10},
            titlefont: {size: 11},
            gridcolor: '#333842'
        },
        yaxis: { 
            showgrid: true, 
            gridcolor: '#333842', 
            color: '#8b949e',
            tickfont: {size: 10}
        },
        font: { family: 'Inter, sans-serif' },
        bargap: 0.05
    };

    const config = { displayModeBar: false, responsive: true };
    Plotly.newPlot(container, [trace], layout, config);
}