/* js/modules/structure-analysis/utils.js */
import { state } from '../../state.js';

export function getDisplayData(key) {
    const groups = {};
    state.structureData.forEach(d => {
        const id = `${d.A}_${d.B}`;
        if (!groups[id]) groups[id] = [];
        if (d[key] !== null && !isNaN(d[key])) {
            groups[id].push(d);
        }
    });

    const result = {};

    Object.keys(groups).forEach(id => {
        const overrideFile = state.structureOverrides[id];
        const items = groups[id];
        if (items.length === 0) return;

        if (overrideFile) {
            const match = items.find(i => i.fileName === overrideFile);
            if (match) {
                result[id] = match[key];
                return;
            }
        }

        const sum = items.reduce((acc, curr) => acc + curr[key], 0);
        result[id] = sum / items.length;
    });

    return result;
}