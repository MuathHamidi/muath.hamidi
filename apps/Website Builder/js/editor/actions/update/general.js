/* Website Builder/js/editor/actions/update/general.js */
Editor.updateBlock = function(index, field, value, forceSidebar = false) {
    Data.pushHistory();
    const block = Data.state.pages[this.currentPageIndex].blocks[index];
    
    // Update Field
    block[field] = value;

    // --- Media Auto-Detection for URLs ---
    if ((block.type === 'media' || block.type === 'text-media' || block.type === 'hero') && field === 'src' || field === 'bg') {
        const lower = value.toLowerCase();
        
        // Detect Video
        if (lower.match(/\.(mp4|webm|ogg|mov)$/) || lower.includes('youtube') || lower.includes('youtu.be') || lower.includes('vimeo')) {
             if(block.type === 'media' || block.type === 'text-media') block.mediaType = 'video';
        }
        // Detect Audio
        else if (lower.match(/\.(mp3|wav|aac)$/) || lower.includes('soundcloud')) {
             if(block.type === 'media' || block.type === 'text-media') block.mediaType = 'audio';
        }
        // Detect Image (default fallback usually, but specific check here)
        else if (lower.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
             if(block.type === 'media' || block.type === 'text-media') block.mediaType = 'image';
        }
        
        // If we detected a change, force sidebar redraw to show correct type UI
        forceSidebar = true; 
    }

    Data.save(true);
    
    // Render
    this.renderCanvas();
    if (forceSidebar) {
        Editor.renderProperties();
    }
};