/* Main Block Generation Dispatcher */
Generator.generateBlockHTML = function(b, isEditor = false, index = null) {
    if(!b) return '';
    
    // Delegate to specific renderer if it exists
    if(Generator.BlockRenderers[b.type]) {
        return Generator.BlockRenderers[b.type](b, isEditor, index);
    }
    
    return `<div style="color:red; padding:10px; border:1px solid red;">Unknown Block Type: ${b.type}</div>`;
};