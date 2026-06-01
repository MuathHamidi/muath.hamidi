/* Website Builder/js/editor/render/core/properties/styles/layout.js */
Editor.PropertiesStyles = Editor.PropertiesStyles || {};

Editor.PropertiesStyles.renderLayout = function(s, index) {
    const alignState = s.align || 'left';
    const widthState = s.width || '100%';
    const newLineState = s.newLine || false; // New Property
    
    // Parse max-width
    const currentWidthVal = s.maxWidth || '1000px';
    let sliderVal = parseInt(currentWidthVal) || 1000;
    if (currentWidthVal === '100%') sliderVal = 1400;

    return `
    <div class="prop-section">
        <div class="prop-section-title"><span class="material-icons-round" style="font-size:16px">dashboard</span> Layout & Positioning</div>
        
        <!-- ROW LAYOUT -->
        <div class="form-group">
            <label>Block Size (Grid)</label>
            <div class="segmented-control">
                <button class="segmented-btn ${widthState === '25%' ? 'active' : ''}" onclick="Editor.updateBlockStyle(${index}, 'width', '25%', true)" title="1/4 Width">
                    <span style="font-weight:bold; font-size:0.8rem;">1/4</span>
                </button>
                <button class="segmented-btn ${widthState === '33.33%' ? 'active' : ''}" onclick="Editor.updateBlockStyle(${index}, 'width', '33.33%', true)" title="1/3 Width">
                    <span style="font-weight:bold; font-size:0.8rem;">1/3</span>
                </button>
                <button class="segmented-btn ${widthState === '50%' ? 'active' : ''}" onclick="Editor.updateBlockStyle(${index}, 'width', '50%', true)" title="1/2 Width">
                    <span style="font-weight:bold; font-size:0.8rem;">1/2</span>
                </button>
                <button class="segmented-btn ${widthState === '100%' ? 'active' : ''}" onclick="Editor.updateBlockStyle(${index}, 'width', '100%', true)" title="Full Width">
                    <span style="font-weight:bold; font-size:0.8rem;">Full</span>
                </button>
            </div>
        </div>

        <!-- NEW: Force New Line Toggle -->
        <div class="form-group">
             <label style="display:flex; align-items:center; gap:10px; cursor:pointer; background:var(--bg-tertiary); padding:10px; border-radius:var(--radius-sm); border:1px solid var(--border);">
                <input type="checkbox" style="width:auto; margin:0;" ${newLineState ? 'checked' : ''} 
                    onchange="Editor.updateBlockStyle(${index}, 'newLine', this.checked, true)"> 
                <span>Force New Line</span>
            </label>
            <div style="font-size:0.7rem; color:var(--text-secondary); margin-top:5px; padding-left:5px;">
                Check this to make this block start on a new row, regardless of available space above.
            </div>
        </div>

        <!-- ALIGNMENT -->
        <div class="form-group">
            <label>Content Alignment</label>
            <div class="segmented-control">
                <button class="segmented-btn ${alignState === 'left' ? 'active' : ''}" onclick="Editor.updateBlockStyle(${index}, 'align', 'left', true)" title="Align Left">
                    <span class="material-icons-round">format_align_left</span>
                </button>
                <button class="segmented-btn ${alignState === 'center' ? 'active' : ''}" onclick="Editor.updateBlockStyle(${index}, 'align', 'center', true)" title="Align Center">
                    <span class="material-icons-round">format_align_center</span>
                </button>
                <button class="segmented-btn ${alignState === 'right' ? 'active' : ''}" onclick="Editor.updateBlockStyle(${index}, 'align', 'right', true)" title="Align Right">
                    <span class="material-icons-round">format_align_right</span>
                </button>
            </div>
        </div>

        <!-- CONTENT WIDTH -->
        <div class="form-group">
            <label>Content Max Width</label>
            <div style="display:flex; align-items:center; gap:10px;">
                <input type="range" min="300" max="1400" step="10" value="${sliderVal}" 
                    style="flex:1; cursor:pointer;"
                    oninput="document.getElementById('widthInput-${index}').value = this.value + 'px'; Editor.updateBlockStyle(${index}, 'maxWidth', this.value, false);">
                
                <input type="text" id="widthInput-${index}" value="${currentWidthVal}" 
                    onchange="Editor.updateBlockStyle(${index}, 'maxWidth', this.value, true)" 
                    style="width:70px; text-align:center;">
            </div>
        </div>
    </div>`;
};