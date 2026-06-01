/* Website Builder/js/editor/actions/update/inline.js */

/* --- INLINE EDITING HANDLERS --- */

// Basic Fields (Hero, Heading, Text, Button)
Editor.handleInlineInput = function(e) {
    const canvasEl = e.target.closest('.canvas-element');
    if(!canvasEl) return;
    
    const index = parseInt(canvasEl.dataset.index);
    const field = e.target.dataset.editableField;
    
    // Secure inner text
    const value = e.target.innerText; 

    // Update State directly
    if(Data.state.pages[Editor.currentPageIndex].blocks[index]) {
        Data.state.pages[Editor.currentPageIndex].blocks[index][field] = value;
    }
};

// Blur Event - Save State & History
Editor.handleInlineBlur = function(e) {
    // 1. Save final state to storage
    Data.save(false); 
    
    // 2. Push to undo history
    Data.pushHistory(true); 
    
    // 3. Refresh properties sidebar
    if(Editor.selectedBlockIndex !== null) {
        setTimeout(() => {
            Editor.renderProperties();
        }, 100);
    }
};

// Specialized Input Handlers

// TABLE CELL HANDLER
Editor.handleTableCellInput = function(e, rowIndex, colIndex) {
    const canvasEl = e.target.closest('.canvas-element');
    const blockIndex = parseInt(canvasEl.dataset.index);
    // Update the specific cell in the data array
    Data.state.pages[Editor.currentPageIndex].blocks[blockIndex].data[rowIndex][colIndex] = e.target.innerText;
};

Editor.handleListItemInput = function(e, itemIndex) {
    const canvasEl = e.target.closest('.canvas-element');
    const blockIndex = parseInt(canvasEl.dataset.index);
    Data.state.pages[Editor.currentPageIndex].blocks[blockIndex].items[itemIndex] = e.target.innerText;
};

Editor.handleFeatureInput = function(e, itemIndex, field) {
    const canvasEl = e.target.closest('.canvas-element');
    const blockIndex = parseInt(canvasEl.dataset.index);
    Data.state.pages[Editor.currentPageIndex].blocks[blockIndex].items[itemIndex][field] = e.target.innerText;
};

Editor.handlePricingInput = function(e, itemIndex, field) {
    const canvasEl = e.target.closest('.canvas-element');
    const blockIndex = parseInt(canvasEl.dataset.index);
    Data.state.pages[Editor.currentPageIndex].blocks[blockIndex].items[itemIndex][field] = e.target.innerText;
};

Editor.handleTestimonialInput = function(e, itemIndex, field) {
    const canvasEl = e.target.closest('.canvas-element');
    const blockIndex = parseInt(canvasEl.dataset.index);
    Data.state.pages[Editor.currentPageIndex].blocks[blockIndex].items[itemIndex][field] = e.target.innerText;
};

Editor.handleFaqInput = function(e, itemIndex, field) {
    const canvasEl = e.target.closest('.canvas-element');
    const blockIndex = parseInt(canvasEl.dataset.index);
    Data.state.pages[Editor.currentPageIndex].blocks[blockIndex].items[itemIndex][field] = e.target.innerText;
};