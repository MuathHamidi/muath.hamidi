/* Helper functions for block generation */
Generator.BlockHelpers = {
    // Basic content editing
    edit: function(isEditor, field) {
        if(!isEditor) return '';
        // Add outlining on hover handled by CSS [contenteditable]:hover
        return `contenteditable="true" data-editable-field="${field}" 
                oninput="Editor.handleInlineInput(event)" 
                onblur="Editor.handleInlineBlur(event)"
                style="min-width: 10px; min-height: 1em; outline:none; display:inline-block;"`;
    },

    // List item editing
    editList: function(isEditor, index) {
        if(!isEditor) return '';
        return `contenteditable="true" 
                oninput="Editor.handleListItemInput(event, ${index})" 
                onblur="Editor.handleInlineBlur(event)"
                style="outline:none;"`;
    },

    // Complex object array editing
    editComplex: function(isEditor, index, field, handler) {
        if(!isEditor) return '';
        return `contenteditable="true" 
                oninput="Editor.${handler}(event, ${index}, '${field}')" 
                onblur="Editor.handleInlineBlur(event)"
                style="outline:none;"`;
    }
};

// Registry for block render functions
Generator.BlockRenderers = {};