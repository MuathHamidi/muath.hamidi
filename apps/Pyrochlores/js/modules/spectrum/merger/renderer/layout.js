/* js/modules/spectrum/merger/renderer/layout.js */
export function createMergerLayout(count, annotations, minVal, maxVal) {
    const yMax = Math.max(count, 3);
    return {
        title: { text: "", font: { color: '#fff' } },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        // Left margin 160px for labels
        margin: { t: 20, b: 40, l: 160, r: 20 },
        xaxis: {
            title: { text: "Energy (meV)", font: { color: '#aaa', size: 12 } },
            tickfont: { color: '#aaa', size: 10 },
            gridcolor: '#333',
            automargin: true,
            range: [minVal, maxVal]
        },
        yaxis: {
            showgrid: false,
            zeroline: false,
            showticklabels: false,
            range: [-0.5, yMax],
            fixedrange: true
        },
        annotations: annotations,
        showlegend: false,
        hovermode: 'closest',
        dragmode: 'pan'
    };
}