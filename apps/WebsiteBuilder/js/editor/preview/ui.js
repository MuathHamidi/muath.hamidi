const ensurePreviewDOM = () => {
    if(!document.getElementById('previewOverlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'previewOverlay';
        overlay.innerHTML = `
            <div class="preview-bar">
                <div class="preview-toggles">
                    <button class="preview-toggle-btn active" id="p-btn-desktop" onclick="Editor.setPreviewMode('desktop')">
                        <span class="material-icons-round">desktop_windows</span> Desktop
                    </button>
                    <button class="preview-toggle-btn" id="p-btn-mobile" onclick="Editor.setPreviewMode('mobile')">
                        <span class="material-icons-round">smartphone</span> Mobile
                    </button>
                </div>
                <button class="preview-close" onclick="Editor.closePreview()">
                    <span>Exit Preview</span> <span class="material-icons-round">close</span>
                </button>
            </div>
            <div id="previewFrameContainer">
                <iframe id="livePreviewFrame"></iframe>
            </div>
        `;
        document.body.appendChild(overlay);
    }
};

Editor.openPreview = function(initialMode = 'desktop') {
    ensurePreviewDOM();
    this.mode = 'preview';
    const overlay = document.getElementById('previewOverlay');
    overlay.classList.add('active');
    this.renderPreviewContent();
    this.setPreviewMode(initialMode);
};

Editor.closePreview = function() {
    this.mode = 'edit';
    const overlay = document.getElementById('previewOverlay');
    if(overlay) overlay.classList.remove('active');
};

Editor.setPreviewMode = function(mode) {
    const frame = document.getElementById('livePreviewFrame');
    const btnDesktop = document.getElementById('p-btn-desktop');
    const btnMobile = document.getElementById('p-btn-mobile');

    if(mode === 'mobile') {
        frame.style.width = '375px';
        frame.style.height = '100%'; 
        frame.style.borderRadius = '12px';
        btnDesktop.classList.remove('active');
        btnMobile.classList.add('active');
    } else {
        frame.style.width = '100%'; 
        frame.style.height = '100%';
        frame.style.borderRadius = '0';
        btnDesktop.classList.add('active');
        btnMobile.classList.remove('active');
    }
};