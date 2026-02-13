/* Website Builder/js/editor/render/core/properties/styles/typography.js */
Editor.PropertiesStyles = Editor.PropertiesStyles || {};

Editor.PropertiesStyles.renderTypography = function(s, index) {
    const getVal = (v, def) => v !== undefined && v !== "" ? v : def;

    return `
    <div class="prop-section">
        <div class="prop-section-title"><span class="material-icons-round" style="font-size:16px">text_fields</span> Typography</div>
        
        <div class="form-group">
            <label>Font Size</label>
            <div class="range-group">
                <input type="range" min="12" max="64" step="1" value="${parseFloat(s.fontSize) || 16}" 
                    oninput="Editor.updateBlockStyle(${index}, 'fontSize', this.value + (this.value < 10 ? 'rem' : 'px')); this.nextElementSibling.innerText = this.value + 'px'">
                <span class="range-value">${parseFloat(s.fontSize) || 16}px</span>
            </div>
        </div>

         <div class="grid-2" style="margin-bottom:0; gap:10px;">
            <div class="form-group" style="margin:0">
                <label>Weight</label>
                <select onchange="Editor.updateBlockStyle(${index}, 'fontWeight', this.value)">
                    <option value="300" ${s.fontWeight=='300'?'selected':''}>Light</option>
                    <option value="normal" ${s.fontWeight=='normal'?'selected':''}>Regular</option>
                    <option value="600" ${s.fontWeight=='600'?'selected':''}>SemiBold</option>
                    <option value="bold" ${s.fontWeight=='bold'?'selected':''}>Bold</option>
                    <option value="800" ${s.fontWeight=='800'?'selected':''}>Heavy</option>
                </select>
            </div>
            <div class="form-group" style="margin:0">
                <label>Color</label>
                <div style="display:flex; align-items:center; border:1px solid var(--border); border-radius:4px; padding:4px;">
                    <input type="color" value="${getVal(s.color, '#000000')}" 
                        oninput="Editor.updateBlockStyle(${index}, 'color', this.value)" style="width:30px; height:30px; padding:0; border:none; margin-right:8px;">
                    <span style="font-size:0.8rem; font-family:monospace;">${getVal(s.color, 'Inherit')}</span>
                </div>
            </div>
        </div>
    </div>`;
};