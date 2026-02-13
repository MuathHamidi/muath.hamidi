Data.pushHistory = function(force = false) {
    const stateStr = JSON.stringify(this.state);
    if(!force && this.history[this.historyIndex] === stateStr) return;
    
    if (this.historyIndex < this.history.length - 1) {
        this.history = this.history.slice(0, this.historyIndex + 1);
    }
    
    this.history.push(stateStr);
    
    if (this.history.length > this.MAX_HISTORY) {
        this.history.shift(); 
    } else {
        this.historyIndex++;
    }
    this.updateUndoRedoUI();
};

Data.undo = function() {
    if (this.historyIndex > 0) {
        this.historyIndex--;
        this.loadState(JSON.parse(this.history[this.historyIndex]), true);
        UI.init();
        if(typeof Editor !== 'undefined' && Editor.currentPageIndex !== null) {
            Editor.loadPage(Editor.currentPageIndex);
        }
        UI.notify('Undo');
    }
    this.updateUndoRedoUI();
};

Data.redo = function() {
    if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.loadState(JSON.parse(this.history[this.historyIndex]), true);
        UI.init();
        if(typeof Editor !== 'undefined' && Editor.currentPageIndex !== null) {
            Editor.loadPage(Editor.currentPageIndex);
        }
        UI.notify('Redo');
    }
    this.updateUndoRedoUI();
};

Data.updateUndoRedoUI = function() {
    const btnUndo = document.getElementById('btnUndo');
    const btnRedo = document.getElementById('btnRedo');
    if(btnUndo) btnUndo.style.opacity = (this.historyIndex > 0) ? '1' : '0.3';
    if(btnRedo) btnRedo.style.opacity = (this.historyIndex < this.history.length - 1) ? '1' : '0.3';
};