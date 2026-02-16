/* js/modules/spectrum/interactions/drag/handlers.js */
import { state } from '../../../../state.js';
import { renderSpectrum } from '../../renderer/index.js';
import { dragState } from './drag-state.js';

export function handleMouseDown(e, graphDiv) {
    // A. Check for Label Click (SVG Text)
    if (e.target.classList && e.target.classList.contains('annotation-text')) {
        const textContent = e.target.textContent;
        const item = state.comparisonSpectra.find(s => s.id === textContent || (textContent.includes(s.id)));
        
        if (item) {
            dragState.draggingLabel = true;
            dragState.activeLabelId = item.id;
            dragState.startYPixel = e.clientY;
            dragState.startYValue = item.yPos;
            dragState.isClick = true; 
            e.preventDefault();
            e.stopPropagation();
            graphDiv.style.cursor = 'ns-resize'; 
            return;
        }
    }

    // B. Check for Line Click
    if (dragState.activeTraceIndex !== -1 && e.button === 0) { 
        dragState.draggingLine = true;
        dragState.startYPixel = e.clientY;
        // graphDiv.data might be undefined if not initialized, but handleMouseDown implies interaction
        const traceY = graphDiv.data[dragState.activeTraceIndex].y[0];
        dragState.startYValue = traceY;
        graphDiv.style.cursor = 'grabbing';
        e.stopPropagation();
    }
}

export function handleMouseMove(e, graphDiv) {
    if (!dragState.draggingLine && !dragState.draggingLabel) return;

    // Common Calc
    const yAxis = graphDiv._fullLayout.yaxis;
    const pixelPerUnit = yAxis._length / (yAxis.range[1] - yAxis.range[0]);
    const deltaPixel = dragState.startYPixel - e.clientY; 
    const deltaYUnit = deltaPixel / pixelPerUnit;
    const newY = dragState.startYValue + deltaYUnit;

    // --- LABEL DRAGGING ---
    if (dragState.draggingLabel && dragState.activeLabelId) {
        if (Math.abs(deltaPixel) > 3) dragState.isClick = false; 

        const item = state.comparisonSpectra.find(s => s.id === dragState.activeLabelId);
        if (item) {
            item.yPos = newY;
            
            // Update all traces with this ID
            const updateObj = { y: [] };
            const updateIndices = [];
            graphDiv.data.forEach((t, i) => {
                if (t.customdata && t.customdata[0] === dragState.activeLabelId) {
                    updateObj.y.push(Array(t.x.length).fill(newY));
                    updateIndices.push(i);
                }
            });
            if(updateIndices.length) Plotly.restyle(graphDiv, updateObj, updateIndices);

            requestAnimationFrame(() => renderSpectrum()); 
        }
        return;
    }

    // --- LINE DRAGGING ---
    if (dragState.draggingLine) {
        const traceData = graphDiv.data[dragState.activeTraceIndex];
        const formulaID = traceData.customdata ? traceData.customdata[0] : null;

        if (!formulaID) return;

        const indicesToUpdate = [];
        graphDiv.data.forEach((t, i) => {
            if (t.customdata && t.customdata[0] === formulaID) {
                indicesToUpdate.push(i);
            }
        });

        const updateObj = { y: [] };
        const updateIndices = [];
        indicesToUpdate.forEach(idx => {
            const pointCount = graphDiv.data[idx].x.length;
            updateObj.y.push(Array(pointCount).fill(newY));
            updateIndices.push(idx);
        });

        Plotly.restyle(graphDiv, updateObj, updateIndices);

        const item = state.comparisonSpectra.find(s => s.id === formulaID);
        if (item) item.yPos = newY;
        
        requestAnimationFrame(() => renderSpectrum()); 
    }
}

export function handleMouseUp(graphDiv) {
    if (dragState.draggingLabel) {
        if (dragState.isClick && dragState.activeLabelId) {
            // --- CLICK ACTION: DELETE ---
            const idx = state.comparisonSpectra.findIndex(s => s.id === dragState.activeLabelId);
            if (idx !== -1) {
                state.comparisonSpectra.splice(idx, 1);
            }
        }
        dragState.draggingLabel = false;
        dragState.activeLabelId = null;
        graphDiv.style.cursor = '';
        renderSpectrum();
    }

    if (dragState.draggingLine) {
        dragState.draggingLine = false;
        dragState.activeTraceIndex = -1;
        graphDiv.style.cursor = 'grab';
        renderSpectrum(); 
    }
}