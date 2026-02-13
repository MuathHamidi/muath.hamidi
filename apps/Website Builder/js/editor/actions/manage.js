Editor.cloneBlock = function(index) {
    Data.pushHistory();
    const page = Data.state.pages[this.currentPageIndex];
    const block = page.blocks[index];
    
    // Deep copy
    const clone = JSON.parse(JSON.stringify(block));
    clone.id = Date.now().toString();
    
    page.blocks.splice(index + 1, 0, clone);
    
    Data.save(true);
    this.selectBlock(index + 1);
    this.renderCanvas();
};

Editor.deleteBlock = function(index) {
    if(index === null || index === undefined) return;
    
    UI.confirm('Are you sure you want to delete this block? This cannot be undone.', () => {
        Data.pushHistory();
        Data.state.pages[this.currentPageIndex].blocks.splice(index, 1);
        Data.save(true);
        this.selectedBlockIndex = null;
        this.renderCanvas();
        this.renderProperties();
        UI.notify('Block Deleted');
    });
};