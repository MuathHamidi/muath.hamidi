/* Website Builder/js/generator/html/blocks/layout/text-media.js */
(function() {
    const H = Generator.BlockHelpers;
    
    const getEmbedUrl = (url) => {
        if (!url) return '';
        if (url.includes('youtube.com/watch?v=')) return url.replace('watch?v=', 'embed/').split('&')[0];
        if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'youtube.com/embed/');
        return url;
    };

    Generator.BlockRenderers['text-media'] = (b, isEditor, index) => {
        const layout = b.layout || 'left';
        const type = b.mediaType || 'image';
        
        // 1. Detect Placeholder
        const isPlaceholder = !b.src || b.src.includes('via.placeholder') || b.src === '';
        
        // 2. Click Handler (Editor only, if placeholder)
        const uploadAttr = (isEditor && index !== null && isPlaceholder) 
            ? `onclick="Editor.triggerMediaUpload(${index}); event.stopPropagation();" style="cursor:pointer;"` 
            : '';

        // 3. Pointer Events for Real Media (Disable interaction in editor to prevent navigating/playing)
        const pointerEvents = (isEditor && !isPlaceholder) ? 'pointer-events:none;' : '';
        
        // 4. Placeholder Visuals
        const placeholderStyle = isPlaceholder 
            ? 'border: 2px dashed var(--text-secondary); opacity: 0.8; background: var(--bg-tertiary); min-height: 250px; display: flex; align-items: center; justify-content: center;' 
            : '';

        const placeholderContent = isPlaceholder 
            ? `<div style="text-align:center; pointer-events:none;">
                 <span class="material-icons-round" style="font-size:48px; opacity:0.3;">add_photo_alternate</span>
                 <div style="font-size:0.9rem; opacity:0.6;">Click to Upload</div>
               </div>` 
            : '';

        // 5. Build Media HTML
        let mediaHTML = '';
        if (type === 'image') {
            if (isPlaceholder) {
                mediaHTML = `<div ${uploadAttr} style="${placeholderStyle} border-radius:var(--radius); width:100%; height:100%;">${placeholderContent}</div>`;
            } else {
                mediaHTML = `<img src="${b.src}" style="width:100%; height:auto; border-radius:var(--radius); display:block; ${pointerEvents}">`;
            }
        } 
        else if (type === 'video') {
             if (isPlaceholder) {
                mediaHTML = `<div ${uploadAttr} style="${placeholderStyle} border-radius:var(--radius); width:100%; height:100%;">${placeholderContent}</div>`;
            } else if(b.src && !b.src.startsWith('data:') && (b.src.includes('youtube') || b.src.includes('youtu.be'))) {
                const embedSrc = getEmbedUrl(b.src);
                mediaHTML = `<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:var(--radius); ${pointerEvents}">
                    <iframe src="${embedSrc}" style="position:absolute; top:0; left:0; width:100%; height:100%; border:none;" allowfullscreen></iframe>
                </div>`;
            } else {
                mediaHTML = `<video controls src="${b.src}" style="width:100%; border-radius:var(--radius); display:block; ${pointerEvents}"></video>`;
            }
        } 
        else if (type === 'audio') {
            mediaHTML = `<audio controls src="${b.src}" style="width:100%; display:block; ${pointerEvents}"></audio>`;
        }

        // 6. Layout Logic
        let containerStyle = 'display:grid; gap:40px; align-items:center;';
        if(layout === 'left') containerStyle += 'grid-template-columns: 1fr 1fr;';
        if(layout === 'right') containerStyle += 'grid-template-columns: 1fr 1fr; direction:rtl;';
        if(layout === 'top') containerStyle += 'display:flex; flex-direction:column; text-align:center;';
        if(layout === 'bottom') containerStyle += 'display:flex; flex-direction:column-reverse; text-align:center;';
        
        // Handle Overlay Layout separately
        if (layout === 'overlay') {
            return `
            <div style="position:relative; border-radius:var(--radius); overflow:hidden; min-height:300px; display:flex; align-items:center; justify-content:center; text-align:center; padding:40px; color:white;">
                ${type === 'image' ? (isPlaceholder ? `<div ${uploadAttr} style="position:absolute; top:0; left:0; width:100%; height:100%; background:var(--bg-tertiary); ${placeholderStyle}"></div>` : `<div style="position:absolute; top:0; left:0; width:100%; height:100%; background:url('${b.src}') center/cover; ${pointerEvents}"></div>`) : ''}
                ${type === 'video' ? (isPlaceholder ? `<div ${uploadAttr} style="position:absolute; top:0; left:0; width:100%; height:100%; background:var(--bg-tertiary); ${placeholderStyle}"></div>` : `<video autoplay loop muted playsinline src="${b.src}" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; ${pointerEvents}"></video>`) : ''}
                ${!isPlaceholder ? `<div style="position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6);"></div>` : ''}
                
                <div style="position:relative; z-index:2; max-width:600px; ${isPlaceholder ? 'pointer-events:none;' : ''}">
                    ${isPlaceholder ? placeholderContent : ''}
                    <h2 ${H.edit(isEditor, 'title')}>${b.title}</h2>
                    <div ${H.edit(isEditor, 'text')}>${b.text}</div>
                </div>
            </div>`;
        }

        const resetDir = layout === 'right' ? 'direction:ltr;' : '';

        return `
        <div style="${containerStyle}">
            <div style="width:100%; ${resetDir}">${mediaHTML}</div>
            <div style="width:100%; ${resetDir}">
                <h2 ${H.edit(isEditor, 'title')}>${b.title}</h2>
                <div style="opacity:0.9; line-height:1.6;" ${H.edit(isEditor, 'text')}>${b.text.replace(/\n/g, '<br>')}</div>
            </div>
        </div>`;
    };
})();