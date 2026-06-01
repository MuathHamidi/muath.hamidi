/* Website Builder/js/editor/render/helpers.js */
Editor.Helpers = {
    fileInput: function(index, field, accept, label, currentValue) {
         return `<button class="btn btn-outline btn-full btn-sm" onclick="Editor.triggerMediaUpload(${index})">${label}</button>`;
    },

    mediaControl: function(index, src, type = 'image') {
        const hasMedia = src && src.length > 5 && !src.includes('via.placeholder');
        
        // Preview Background
        let bgStyle = '';
        if (hasMedia && type === 'image') bgStyle = `background-image:url('${src}'); background-size:cover; background-position:center;`;
        
        return `
        <div class="media-control-wrapper">
            <!-- Preview / Upload Area -->
            <div class="media-upload-area" onclick="Editor.triggerMediaUpload(${index})" style="${bgStyle}">
                ${!hasMedia || type !== 'image' ? `
                    <div class="placeholder-content">
                        <span class="material-icons-round icon">${type === 'video' ? 'videocam' : (type === 'audio' ? 'audiotrack' : 'add_photo_alternate')}</span>
                        <span class="label">${hasMedia ? 'Change File' : 'Upload Media'}</span>
                    </div>
                ` : ''}
                <div class="hover-overlay"><span class="material-icons-round">edit</span></div>
            </div>

            <!-- URL Input -->
            <div class="media-url-input">
                <span class="material-icons-round">link</span>
                <input type="text" value="${src || ''}" placeholder="Or paste image/video URL..." onchange="Editor.updateBlock(${index}, 'src', this.value)">
            </div>
        </div>
        `;
    }
};

Editor.Templates = {};