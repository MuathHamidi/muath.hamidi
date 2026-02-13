/* Website Builder/js/editor/actions/update/media.js */
Editor.handleFileUpload = function(index, field, input) {
    if(input.files && input.files[0]) {
        Data.pushHistory();
        const file = input.files[0];
        
        // Auto-detect type
        let detectedType = null;
        if (file.type.startsWith('image/')) detectedType = 'image';
        else if (file.type.startsWith('video/')) detectedType = 'video';
        else if (file.type.startsWith('audio/')) detectedType = 'audio';

        const reader = new FileReader();
        
        reader.onload = function(e) {
            const block = Data.state.pages[Editor.currentPageIndex].blocks[index];
            block[field] = e.target.result;
            
            if (detectedType) {
                block.mediaType = detectedType;
            }
            
            Data.save(true);
            Editor.renderCanvas();
            Editor.renderProperties();
        };

        reader.onerror = () => UI.notify("Error reading file.");
        reader.readAsDataURL(file);
    }
};

// New Helper: Creates a temporary input to trigger upload
Editor.triggerMediaUpload = function(index) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*,audio/*';
    input.onchange = (e) => Editor.handleFileUpload(index, 'src', e.target);
    input.click();
};