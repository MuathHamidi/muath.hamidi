/* js/state.js */
export const state = {
    logData: {},        
    fileMetadata: {},   
    knownFiles: [],     
    elementCounts: {},  
    availableElements: new Set(),
    
    heatmapRawData: [], 
    heatmapTargetIndex: 1, 

    structureData: [], 
    structureOverrides: {}, 
    structureColorMode: 'B', 

    comparisonSpectra: [], 
    mergedSpectra: [],     
    
    selectedA: null,
    selectedB: null,
    activeSlot: 'A',    

    glViewer: null,      // Main Structure Viewer
    distViewer: null,    // NEW: Distance Analysis Viewer
    
    isSpinning: false,
    vizMode: 'cell',
    currentCifText: null,
    viewerSettings: {
        supercell: false 
    }
};