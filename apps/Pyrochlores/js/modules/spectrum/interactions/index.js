/* js/modules/spectrum/interactions/index.js */
// Updated Import
import { initDragLogic } from './drag/index.js';
import { initContextMenu } from './context-menu.js';

export function initInteractions() {
    const graphDiv = document.getElementById('spectrum-plot');
    if (!graphDiv) return;

    initDragLogic(graphDiv);
    initContextMenu(graphDiv);
}