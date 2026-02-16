/* js/modules/spectrum/merger/renderer/data.js */
import { state } from '../../../../state.js';

export function getEnergiesForFormula(f) {
    const match = f.match(/([A-Z][a-z]?)2([A-Z][a-z]?)2O7/);
    if (!match) return [];
    
    const A = match[1];
    const B = match[2];

    const pinnedItem = state.comparisonSpectra.find(item => item.id === f);
    let files = state.heatmapRawData.filter(d => d.A === A && d.B === B);

    if (pinnedItem && pinnedItem.fileFilter && pinnedItem.fileFilter.length > 0) {
        files = files.filter(d => pinnedItem.fileFilter.includes(d.fileName));
    }

    return files.map(d => d.energies);
}

export function processEnergies(rawArrays, useAverage) {
    let finalEnergies = [];
    if (useAverage) {
        const maxLen = Math.max(...rawArrays.map(a => a.length));
        for (let i = 0; i < maxLen; i++) {
            let sum = 0, count = 0;
            rawArrays.forEach(arr => {
                if (i < arr.length) { sum += arr[i]; count++; }
            });
            if (count > 0) finalEnergies.push(sum / count);
        }
    } else {
        finalEnergies = rawArrays.flat();
    }
    return finalEnergies;
}