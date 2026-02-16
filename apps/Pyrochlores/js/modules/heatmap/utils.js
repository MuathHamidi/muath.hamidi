import { Z_MAP } from './constants.js';

export function isKramers(element) {
    const z = Z_MAP[element] || 0;
    const electrons = z - 3; // Assumes +3 charge
    return (electrons % 2) !== 0; // Odd = Kramers
}

export function parseElementsFromFilename(filename) {
    // 1. Try standard Pyrochlore A2B2O7
    const regex = /([A-Z][a-z]?)2([A-Z][a-z]?)2O7/i;
    let match = filename.match(regex);
    if (match) return { A: match[1], B: match[2] };

    // 2. Try just finding two elements (e.g. ErGeO)
    // Filter out reserved words and Oxygen
    const parts = filename.match(/([A-Z][a-z]?)/g);
    if (parts && parts.length >= 2) {
        const filtered = parts.filter(e => !['O','cif','log','txt','dat'].includes(e));
        if (filtered.length >= 2) return { A: filtered[0], B: filtered[1] };
    }
    return null;
}

export function getExcitedStateGap(energies, n) {
    if (!energies || energies.length === 0) return null;

    // Filter unique energies (collapse doublets within 0.001 meV)
    const unique = [energies[0]];
    for (let i = 1; i < energies.length; i++) {
        if (Math.abs(energies[i] - unique[unique.length - 1]) > 0.001) {
            unique.push(energies[i]);
        }
    }

    if (unique.length <= n) return null; // Requested state doesn't exist
    return unique[n] - unique[0];
}