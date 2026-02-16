/* js/modules/spectrum/interactions/drag/drag-state.js */
export const dragState = {
    activeTraceIndex: -1,
    draggingLine: false,
    
    draggingLabel: false,
    activeLabelId: null,
    
    startYPixel: 0,
    startYValue: 0,
    
    isClick: false // To distinguish drag vs click
};