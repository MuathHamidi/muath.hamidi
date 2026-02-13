Editor.addBlock = function(type, atIndex = null) {
    if(this.currentPageIndex === null) return;
    Data.pushHistory(); 

    const page = Data.state.pages[this.currentPageIndex];
    
    // 1. Base Structure
    const defaultStyles = { 
        align: 'left', padding: '20', bg: 'transparent', color: 'inherit', maxWidth: '1000', width: '100%' 
    };

    let newBlock = { 
        id: Date.now().toString(), 
        type: type, 
        value: '',
        styles: { ...defaultStyles }
    };
    
    // 2. Merge Type-Specific Definitions
    if(Editor.BlockDefinitions[type]) {
        const def = Editor.BlockDefinitions[type];
        
        // Merge top-level properties
        newBlock = { ...newBlock, ...def };
        
        // Deep merge styles if they exist in definition
        if(def.styles) {
            newBlock.styles = { ...newBlock.styles, ...def.styles };
        }
        
        // Remove 'value' key if marked as undefined in definition (cleaner object)
        if(def.value === undefined) {
            delete newBlock.value;
        }
    }

    // 3. Insert Block
    if (atIndex !== null) {
        page.blocks.splice(atIndex, 0, newBlock);
        this.selectedBlockIndex = atIndex;
    } else {
        page.blocks.push(newBlock);
        this.selectedBlockIndex = page.blocks.length - 1;
    }

    Data.save(true);
    
    this.renderCanvas();
    this.renderProperties();
    
    setTimeout(() => {
        const container = document.getElementById('canvasContainer');
        if(container) container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }, 50);
};