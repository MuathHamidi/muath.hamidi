const DragOps = {
    draggedIndex: null, // Index if moving existing block
    draggedType: null,  // Type if adding new block
    dropIndex: null,    // Where to drop
    dropPos: null,      // 'before' or 'after'

    // Called when dragging an existing block on canvas
    start: function(e, index) {
        this.draggedIndex = index;
        this.draggedType = null;
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', index); // Required for Firefox
    },

    // Called when dragging a tool from the toolbar
    startNew: function(e, type) {
        this.draggedIndex = null;
        this.draggedType = type;
        e.dataTransfer.effectAllowed = 'copy';
    },

    over: function(e) {
        e.preventDefault(); // Necessary to allow dropping
        
        const target = e.target.closest('.canvas-element');
        if (!target) return;

        const rect = target.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        
        // Determine if we are hovering the top or bottom half
        if (e.clientY < midY) {
            this.dropPos = 'before';
            target.classList.add('drag-over-top');
            target.classList.remove('drag-over-bottom');
        } else {
            this.dropPos = 'after';
            target.classList.remove('drag-over-top');
            target.classList.add('drag-over-bottom');
        }
    },

    leave: function(e) {
        const target = e.target.closest('.canvas-element');
        if (target) {
            target.classList.remove('drag-over-top', 'drag-over-bottom');
        }
    },

    drop: function(e, targetIndex) {
        e.stopPropagation();
        e.preventDefault();

        // Clean up visual cues
        document.querySelectorAll('.drag-over-top, .drag-over-bottom').forEach(el => {
            el.classList.remove('drag-over-top', 'drag-over-bottom');
        });
        const draggedEl = document.querySelector('.dragging');
        if (draggedEl) draggedEl.classList.remove('dragging');

        // Calculate final index
        let finalIndex = targetIndex;
        if (this.dropPos === 'after') finalIndex++;

        // Case 1: Moving existing block
        if (this.draggedIndex !== null) {
            if (this.draggedIndex === targetIndex && this.dropPos === 'before') return; // No move
            
            // Adjust index if moving down
            let adjust = (this.draggedIndex < finalIndex) ? -1 : 0;
            
            const page = Data.state.pages[Editor.currentPageIndex];
            const item = page.blocks[this.draggedIndex];
            
            // Remove from old spot
            page.blocks.splice(this.draggedIndex, 1);
            // Insert at new spot (accounting for shift)
            page.blocks.splice(finalIndex + adjust, 0, item);
            
            Editor.selectedBlockIndex = finalIndex + adjust;
            Data.save();
            Editor.renderCanvas();
            Editor.renderProperties();
        } 
        // Case 2: Adding NEW block from toolbar
        else if (this.draggedType) {
            Editor.addBlock(this.draggedType, finalIndex); // Modified addBlock to accept index
        }
        
        this.reset();
    },

    reset: function() {
        this.draggedIndex = null;
        this.draggedType = null;
        this.dropIndex = null;
        this.dropPos = null;
    }
};