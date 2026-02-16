/* js/modules/spectrum/renderer/traces.js */
export function generateTraces(items, config) {
    const { useSplit, useAverage, minVal, maxVal, heatmapData } = config;
    const traces = [];
    const annotations = [];

    const getFilteredMatches = (item) => {
        let matches = heatmapData.filter(d => d.A === item.A && d.B === item.B);
        if (item.fileFilter && item.fileFilter.length > 0) {
            matches = matches.filter(d => item.fileFilter.includes(d.fileName));
        }
        return matches;
    };

    items.forEach(item => {
        const matches = getFilteredMatches(item);
        if (matches.length === 0) return;

        if (item.yPos === undefined) item.yPos = 0;

        if (useSplit) {
            // --- SPLIT MODE ---
            matches.forEach((m) => {
                // Strip extension for cleaner display
                const cleanName = m.fileName.replace(/\.(txt|log|cif|dat)$/i, '');
                
                traces.push({
                    x: m.energies,
                    y: Array(m.energies.length).fill(item.yPos),
                    mode: 'markers',
                    type: 'scatter',
                    name: cleanName,
                    marker: { 
                        symbol: 'line-ns-open', 
                        size: 20, 
                        color: item.color, 
                        opacity: 0.8,
                        line: { width: 2, color: item.color } 
                    },
                    hoverinfo: 'name+x', 
                    hovertemplate: `<b>${cleanName}</b><br>%{x:.2f} meV<extra></extra>`,
                    customdata: Array(m.energies.length).fill(item.id)
                });
                
                // For Split Mode: We only add ONE label per file group to avoid chaos? 
                // Or if they share Y, we just label the group. 
                // Requirement: "file names... on the left". 
                // Since split items currently share item.yPos, the labels would overlap perfectly.
                // To support "Split", we ideally need distinct Ys. 
                // For now, we will label the GROUP (Formula) at this Y position to keep it usable.
                // If specific file labeling is critical in split mode, we'd need to offset Ys.
                // Given the constraint "click to delete", deleting the Formula is the main action.
            });
            
            // In Split Mode, we label the Formula. 
            // If the user wants to see specific files, they can hover the dots.
            // If we list all files on the left, they will overlap.
            annotations.push(createLabel(item, item.id)); 

        } else {
            // --- AVERAGE MODE ---
            let finalEnergies = [];

            if (useAverage) {
                const maxLevels = Math.max(...matches.map(m => m.energies.length));
                for (let i = 0; i < maxLevels; i++) {
                    let sum = 0, count = 0;
                    matches.forEach(m => {
                        if (i < m.energies.length) { sum += m.energies[i]; count++; }
                    });
                    if (count > 0) finalEnergies.push(sum / count);
                }
            } else {
                finalEnergies = matches.flatMap(m => m.energies);
            }

            traces.push({
                x: finalEnergies,
                y: Array(finalEnergies.length).fill(item.yPos),
                mode: 'markers',
                type: 'scatter',
                name: item.id,
                marker: { 
                    symbol: 'line-ns-open', 
                    size: 20, 
                    color: item.color, 
                    opacity: useAverage ? 1.0 : 0.5,
                    line: { width: 2, color: item.color } 
                },
                hoverinfo: 'x',
                hovertemplate: useAverage 
                    ? `<b>${item.id} (Avg)</b><br>%{x:.2f} meV<extra></extra>`
                    : `<b>${item.id}</b><br>%{x:.2f} meV<extra></extra>`,
                customdata: Array(finalEnergies.length).fill(item.id)
            });

            annotations.push(createLabel(item, item.id));
        }
    });

    return { traces, annotations };
}

export function createLabel(item, text) {
    return {
        // Position relative to paper (0 is the y-axis line, we go negative into margin)
        xref: 'paper',
        x: -0.02, 
        xanchor: 'right', // Align text to the right (closest to axis)
        
        y: item.yPos,
        yref: 'y',
        yanchor: 'middle',
        
        text: text,
        showarrow: false,
        font: { 
            color: item.color, 
            size: 13, 
            family: 'JetBrains Mono, monospace',
            weight: 'bold'
        },
        // Crucial for interactions
        captureevents: true,
        // Class for DOM selection in drag.js
        name: 'spectrum-label-' + item.id 
    };
}