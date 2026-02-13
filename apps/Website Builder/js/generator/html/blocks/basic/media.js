/* Website Builder/js/generator/html/blocks/basic/media.js */
(function() {
    const H = Generator.BlockHelpers;

    const getEmbedUrl = (url) => {
        if (!url) return '';
        if (url.includes('youtube.com/watch?v=')) {
            return url.replace('watch?v=', 'embed/').split('&')[0];
        }
        if (url.includes('youtu.be/')) {
            return url.replace('youtu.be/', 'youtube.com/embed/');
        }
        return url;
    };

    Generator.BlockRenderers.media = (b, isEditor, index) => {
        const type = b.mediaType || 'image';
        
        // LOGIC CHANGE: 
        // 1. If it's a placeholder, make it clickable for upload.
        // 2. If it's real media, DO NOT allow click-to-upload in Canvas. Sidebar only.
        const isPlaceholder = !b.src || b.src.includes('via.placeholder.com') || b.src === '';
        
        const uploadAttr = (isEditor && index !== null && isPlaceholder) 
            ? `onclick="Editor.triggerMediaUpload(${index}); event.stopPropagation();" style="cursor:pointer;"` 
            : ''; // No onclick if real media exists
            
        // Visual cue for placeholder
        const placeholderStyle = isPlaceholder ? 'border: 2px dashed var(--text-secondary); opacity: 0.8; background: var(--bg-tertiary); min-height: 200px; display: flex; align-items: center; justify-content: center;' : '';

        // Placeholder Content
        const placeholderContent = isPlaceholder 
            ? `<div style="text-align:center; pointer-events:none;"><span class="material-icons-round" style="font-size:48px; opacity:0.3;">add_photo_alternate</span><div style="font-size:0.9rem; opacity:0.6;">Click to Upload Media</div></div>` 
            : '';

        if (type === 'image') {
            if (isPlaceholder) {
                 return `<div ${uploadAttr} style="${placeholderStyle} border-radius:var(--radius);">${placeholderContent}</div>`;
            }
            return `<figure style="margin:0;">
                <img src="${b.src}" alt="${b.caption}" 
                     style="width:100%; height:auto; border-radius:var(--radius); display:block;">
                ${b.caption ? `<figcaption style="margin-top:8px; font-size:0.9em; opacity:0.7;" ${H.edit(isEditor, 'caption')}>${b.caption}</figcaption>` : ''}
            </figure>`;
        }
        
        if (type === 'video') {
            if (isPlaceholder) {
                 return `<div ${uploadAttr} style="${placeholderStyle} border-radius:var(--radius);">${placeholderContent}</div>`;
            }
            if(b.src && !b.src.startsWith('data:') && (b.src.includes('youtube') || b.src.includes('youtu.be'))) {
                const embedSrc = getEmbedUrl(b.src);
                return `<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:var(--radius);">
                    <iframe src="${embedSrc}" style="position:absolute; top:0; left:0; width:100%; height:100%; border:none; pointer-events:${isEditor?'none':'all'};" allowfullscreen></iframe>
                </div>`;
            }
            return `<video controls src="${b.src}" style="width:100%; border-radius:var(--radius); display:block; pointer-events:${isEditor?'none':'all'};" preload="metadata"></video>`;
        }

        if (type === 'audio') {
            return `<div style="padding:20px; background:var(--bg-tertiary); border-radius:var(--radius); text-align:center;">
                <audio controls src="${b.src}" style="width:100%; margin-bottom:10px;"></audio>
                <div style="font-size:0.9rem;" ${H.edit(isEditor, 'caption')}>${b.caption || 'Audio Track'}</div>
            </div>`;
        }
        return '';
    };
    
    Generator.BlockRenderers.image = Generator.BlockRenderers.media;
    Generator.BlockRenderers.video = Generator.BlockRenderers.media;
})();