/* Website Builder/js/editor/actions/update/styling.js */
Editor.updateBlockStyle = function(index, styleField, value, forceSidebar = false) {
    // 1. Update State
    const block = Data.state.pages[this.currentPageIndex].blocks[index];
    if(!block.styles) block.styles = {};
    
    // Auto-append units for numeric inputs
    if (['paddingTop', 'paddingBottom', 'marginTop', 'marginBottom', 'borderRadius', 'maxWidth'].includes(styleField)) {
        if (value !== '' && !isNaN(value)) value = value + 'px';
    }
    
    // Shadow Presets
    if(styleField === 'boxShadow') {
         if(value === 'none') value = '';
         if(value === 'sm') value = '0 2px 4px rgba(0,0,0,0.05)';
         if(value === 'md') value = '0 4px 6px rgba(0,0,0,0.1)';
         if(value === 'lg') value = '0 10px 15px rgba(0,0,0,0.1)';
         if(value === 'xl') value = '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)';
    }

    block.styles[styleField] = value;
    Data.save(true);

    // --- SPECIAL HANDLERS ---
    
    // Structural Changes: 'newLine' requires modifying the DOM tree (inserting/removing a div), not just CSS.
    if (styleField === 'newLine') {
        Editor.renderCanvas();
        return; 
    }

    // 2. Real-time DOM update (Canvas)
    const canvasEl = document.querySelector(`.canvas-element[data-index="${index}"]`);
    if(canvasEl) {
        const wrapper = canvasEl; 
        const inner = canvasEl.querySelector('div[style*="max-width"]'); 
        
        // Handle Layout Props on Wrapper
        if(styleField === 'bg') wrapper.style.background = value;
        if(styleField === 'align') wrapper.style.textAlign = value;
        
        // Live Grid Width Update
        if(styleField === 'width') {
             wrapper.style.flexBasis = value;
             wrapper.style.maxWidth = value;
        }

        if(styleField === 'paddingTop') wrapper.style.paddingTop = value;
        if(styleField === 'paddingBottom') wrapper.style.paddingBottom = value;
        if(styleField === 'marginTop') wrapper.style.marginTop = value;
        if(styleField === 'marginBottom') wrapper.style.marginBottom = value;
        if(styleField === 'color') wrapper.style.color = value;
        
        // Handle Inner Props
        if(styleField === 'maxWidth' && inner) inner.style.maxWidth = value;
        if(styleField === 'fontSize' && inner) inner.style.fontSize = value;
        if(styleField === 'fontWeight' && inner) inner.style.fontWeight = value;
        if(styleField === 'borderRadius') {
            const content = inner.firstElementChild;
            if(content) content.style.borderRadius = value;
        }
        if(styleField === 'boxShadow') {
            const content = inner.firstElementChild;
             if(content) content.style.boxShadow = value;
        }
        
        // Complex redraw needed for gradients/overlays
        if (styleField === 'overlayOpacity') Editor.renderCanvas(); 
    } else {
        // Fallback
        Editor.renderCanvas();
    }

    // 3. Refresh Sidebar UI
    if (forceSidebar) {
        setTimeout(() => Editor.renderProperties(), 10);
    }
};