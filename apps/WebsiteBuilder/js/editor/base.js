/* Website Builder/js/editor/base.js */
const Editor = {
    currentPageIndex: null,
    selectedBlockIndex: null, 
    mode: 'edit',

    loadPage: function(index) {
        this.currentPageIndex = index;
        this.selectedBlockIndex = null; 
        
        // Hide Empty State
        const es = document.getElementById('emptyState');
        if(es) es.style.display = 'none';

        // Show Editor Columns
        const ws = document.getElementById('editorWorkspace');
        const ps = document.getElementById('propertiesSidebar');
        
        if(ws) ws.style.display = 'flex'; 
        if(ps) ps.style.display = 'flex'; 
        
        const page = Data.state.pages[index];
        if(!page.blocks) page.blocks = [];
        
        this.renderCanvas();
        this.renderProperties();
        
        UI.renderPagesList();
    },

    selectBlock: function(index) {
        // If clicking the already selected block, do nothing (preserves text selection/focus)
        if (this.selectedBlockIndex === index) return;

        this.selectedBlockIndex = index;

        // 1. Update Visual Selection (Class toggle only, NO re-render)
        const all = document.querySelectorAll('.canvas-element');
        all.forEach(el => el.classList.remove('selected'));
        
        const target = document.querySelector(`.canvas-element[data-index="${index}"]`);
        if(target) {
            target.classList.add('selected');
        }

        // 2. Update Sidebar
        this.renderProperties(); 
    },
    
    moveBlock: function(index, direction) {
        const page = Data.state.pages[this.currentPageIndex];
        if(!page || !page.blocks) return;
        
        const newIndex = index + direction;
        
        if(newIndex < 0 || newIndex >= page.blocks.length) return;
        
        const temp = page.blocks[newIndex];
        page.blocks[newIndex] = page.blocks[index];
        page.blocks[index] = temp;
        
        this.selectedBlockIndex = newIndex;
        
        Data.save();
        this.renderCanvas();
        this.renderProperties();
    }
};