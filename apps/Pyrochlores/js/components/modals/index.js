/* js/components/modals/index.js */
import { getExportModalHTML } from './export-modal.js';
import { getMergeModalsHTML } from './merge-modals.js';
import { getStructureModalHTML } from './structure-modal.js';
import { getSpectrumModalHTML } from './spectrum-modal.js';

export function getModalsHTML() {
    return `
        ${getExportModalHTML()}
        ${getMergeModalsHTML()}
        ${getStructureModalHTML()}
        ${getSpectrumModalHTML()}
    `;
}