UI.createNewWebsite = function() {
    if(confirm('Are you sure? This will delete your current work and start a new project.')) {
        Data.reset();
        
        // Reset Editor selection if it exists
        if(typeof Editor !== 'undefined') {
            Editor.currentPageIndex = null;
            Editor.mode = 'edit';
        }

        // Re-initialize UI
        this.init();
        this.switchTab('settings'); // Go back to settings
        this.notify('New website started!');
    }
};