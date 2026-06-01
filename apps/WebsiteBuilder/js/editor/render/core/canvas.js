/* Website Builder/js/editor/render/core/canvas.js */

/* Renders the visual page blocks in the center canvas */
Editor.renderCanvas = function() {
    const container = document.getElementById('visualPage');
    if(!container || this.currentPageIndex === null) return;
    
    const page = Data.state.pages[this.currentPageIndex];
    container.innerHTML = '';

    if(page.blocks.length === 0) {
        container.innerHTML = `<div style="width:100%; text-align:center; padding:100px 20px; color:var(--text-secondary); display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%;">
            <div style="background:var(--bg-tertiary); padding:30px; border-radius:100px; margin-bottom:20px;">
                <span class="material-icons-round" style="font-size:3rem; color:var(--accent);">add</span>
            </div>
            <span style="font-size:1.2rem; font-weight:bold; color:var(--text-primary);">Start Building</span>
            <p style="margin-top:10px;">Select a tool from the toolbar to add your first block.</p>
        </div>`;
        return;
    }

    page.blocks.forEach((block, index) => {
        // --- 1. FORCE NEW LINE LOGIC ---
        // If checked, inject a full-width, zero-height div to force flex-wrap
        if (block.styles && block.styles.newLine) {
            const breakEl = document.createElement('div');
            breakEl.style.flexBasis = '100%';
            breakEl.style.height = '0';
            breakEl.style.margin = '0';
            breakEl.style.padding = '0';
            breakEl.style.pointerEvents = 'none'; // Don't interfere with clicks
            container.appendChild(breakEl);
        }

        // --- 2. RENDER BLOCK ---
        const el = document.createElement('div');
        const isSelected = this.selectedBlockIndex === index;
        el.className = `canvas-element ${isSelected ? 'selected' : ''}`;
        el.dataset.index = index;
        
        // --- APPLY STYLES LIVE ---
        const s = block.styles || {};
        
        // Layout: Flex Sizing
        el.style.flexBasis = s.width || '100%'; 
        el.style.maxWidth = s.width || '100%';
        el.style.textAlign = s.align || 'left';
        
        // Spacing
        el.style.paddingTop = (s.paddingTop || s.padding || 20) + 'px';
        el.style.paddingBottom = (s.paddingBottom || s.padding || 20) + 'px';
        el.style.paddingLeft = '20px'; 
        el.style.paddingRight = '20px'; 
        el.style.marginTop = (s.marginTop || 0) + 'px';
        el.style.marginBottom = (s.marginBottom || 0) + 'px';
        
        // BACKGROUND
        const bgVal = s.bg || 'transparent';
        const opacity = s.overlayOpacity || 0;
        
        if (opacity > 0 && bgVal !== 'transparent') {
            const overlay = `rgba(0,0,0,${opacity})`;
            el.style.background = `linear-gradient(${overlay}, ${overlay}), ${bgVal}`;
        } else {
            el.style.background = bgVal;
        }

        if(bgVal && bgVal.includes('url')) {
            el.style.backgroundSize = 'cover';
            el.style.backgroundPosition = 'center';
        }

        el.style.color = s.color || 'inherit';
        el.style.position = 'relative'; 
        
        // Interaction
        el.onclick = (e) => { 
            // Prevent selecting when clicking inputs inside blocks
            if(e.target.tagName !== 'VIDEO' && e.target.tagName !== 'AUDIO' && e.target.tagName !== 'INPUT') {
                e.stopPropagation(); 
                Editor.selectBlock(index); 
            }
        };
        
        el.setAttribute('draggable', 'true');
        if(typeof DragOps !== 'undefined') {
            el.ondragstart = (e) => DragOps.start(e, index);
            el.ondragover = (e) => DragOps.over(e);
            el.ondrop = (e) => DragOps.drop(e, index);
        }

        // Tools Overlay
        const controls = `
            <div class="element-tools">
                <span class="block-tag">${block.type}</span>
                <div class="tool-sep"></div>
                <div class="element-tool-btn" onclick="event.stopPropagation(); Editor.moveBlock(${index}, -1)" title="Up"><span class="material-icons-round">arrow_back</span></div>
                <div class="element-tool-btn" onclick="event.stopPropagation(); Editor.moveBlock(${index}, 1)" title="Down"><span class="material-icons-round">arrow_forward</span></div>
                <div class="element-tool-btn" onclick="event.stopPropagation(); Editor.cloneBlock(${index})" title="Clone"><span class="material-icons-round">content_copy</span></div>
                <div class="tool-sep"></div>
                <div class="element-tool-btn delete-btn" onclick="event.stopPropagation(); Editor.deleteBlock(${index})" title="Delete"><span class="material-icons-round">delete</span></div>
            </div>
        `;
        
        const innerContent = Generator.generateBlockHTML(block, true, index);

        // Visual Alignment Logic
        let innerMargin = '0 auto';
        if (s.align === 'left') innerMargin = '0 auto 0 0';
        if (s.align === 'right') innerMargin = '0 0 0 auto';

        el.innerHTML = controls + `<div style="max-width:${s.maxWidth || 1000}px; margin:${innerMargin}; width:100%;">${innerContent}</div>`;
        
        container.appendChild(el);
    });
};