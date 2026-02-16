/* js/modules/spectrum/renderer/layout.js */
export function createLayout(items, minVal, maxVal, annotations) {
    const allY = items.map(i => i.yPos);
    const maxY = allY.length ? Math.max(...allY) : 1;
    const minY = allY.length ? Math.min(...allY) : 0;

    return {
        title: { text: "", font: { color: '#fff' } },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        // Increased Left Margin to 160px for Labels
        margin: { t: 20, b: 40, l: 160, r: 20, pad: 0 }, 
        
        xaxis: {
            title: { text: "Energy (meV)", font: { color: '#aaa', size: 12 } },
            tickfont: { color: '#aaa', size: 10 },
            gridcolor: '#333',
            zerolinecolor: '#555',
            // Strict range
            range: [minVal, maxVal],
            automargin: true
        },
        
        yaxis: {
            showgrid: false,
            zeroline: false,
            showticklabels: false, 
            range: [minY - 0.5, maxY + 1.0],
            fixedrange: true
        },
        
        annotations: annotations,
        showlegend: false,
        hovermode: 'closest',
        dragmode: 'pan' 
    };
}