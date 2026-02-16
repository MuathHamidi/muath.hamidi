/* js/modules/spectrum/interactions/drag/index.js */
import { dragState } from './drag-state.js';
import { handleMouseDown, handleMouseMove, handleMouseUp } from './handlers.js';

export function initDragLogic(graphDiv) {
    // 1. Plotly Hover (Line Selection)
    graphDiv.on('plotly_hover', (data) => {
        if (!dragState.draggingLine && !dragState.draggingLabel && data.points.length > 0) {
            dragState.activeTraceIndex = data.points[0].curveNumber;
            graphDiv.style.cursor = 'grab';
        }
    });

    graphDiv.on('plotly_unhover', () => {
        if (!dragState.draggingLine && !dragState.draggingLabel) {
            dragState.activeTraceIndex = -1;
            graphDiv.style.cursor = '';
        }
    });

    // 2. Global Mouse Events
    // We attach to graphDiv for mousedown to catch Annotations
    graphDiv.addEventListener('mousedown', (e) => handleMouseDown(e, graphDiv));
    document.addEventListener('mousemove', (e) => handleMouseMove(e, graphDiv));
    document.addEventListener('mouseup', () => handleMouseUp(graphDiv));
}