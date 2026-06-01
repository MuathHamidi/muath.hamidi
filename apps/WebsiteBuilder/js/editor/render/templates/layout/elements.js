Editor.Templates.button = function(block, index) {
    return `
        <div class="form-group">
            <label>Button Text</label>
            <input type="text" value="${block.text || ''}" oninput="Editor.updateBlock(${index}, 'text', this.value)">
        </div>
        <div class="form-group">
            <label>Link URL</label>
            <input type="text" value="${block.url || ''}" placeholder="https://..." oninput="Editor.updateBlock(${index}, 'url', this.value)">
        </div>`;
};

Editor.Templates.spacer = function(block, index) {
    return `
        <div class="form-group">
            <label>Spacer Height: ${block.height}px</label>
            <input type="range" min="10" max="200" step="10" value="${block.height}" oninput="Editor.updateBlock(${index}, 'height', this.value); this.previousElementSibling.innerText = 'Spacer Height: '+this.value+'px'">
        </div>
    `;
};

Editor.Templates.divider = function(block, index) {
    return `
        <div class="form-group">
            <label>Line Style</label>
            <select onchange="Editor.updateBlock(${index}, 'style', this.value)">
                <option value="solid" ${block.style==='solid'?'selected':''}>Solid</option>
                <option value="dashed" ${block.style==='dashed'?'selected':''}>Dashed</option>
                <option value="dotted" ${block.style==='dotted'?'selected':''}>Dotted</option>
            </select>
        </div>
    `;
};

Editor.Templates['text-media'] = function(block, index) {
    const layout = block.layout || 'left';
    const type = block.mediaType || 'image';

    return `
        <div class="prop-section">
            <div class="prop-section-title">Layout Configuration</div>
            <div class="form-group">
                <label>Media Position</label>
                <select onchange="Editor.updateBlock(${index}, 'layout', this.value, true)">
                    <option value="left" ${layout==='left'?'selected':''}>Left</option>
                    <option value="right" ${layout==='right'?'selected':''}>Right</option>
                    <option value="top" ${layout==='top'?'selected':''}>Top (Stacked)</option>
                    <option value="bottom" ${layout==='bottom'?'selected':''}>Bottom (Stacked)</option>
                    <option value="overlay" ${layout==='overlay'?'selected':''}>Background Overlay</option>
                </select>
            </div>
        </div>

        <div class="prop-section">
            <div class="prop-section-title">Media</div>
             <div class="segmented-control" style="margin-bottom:15px;">
                <button class="segmented-btn ${type==='image'?'active':''}" onclick="Editor.updateBlock(${index}, 'mediaType', 'image', true)">Image</button>
                <button class="segmented-btn ${type==='video'?'active':''}" onclick="Editor.updateBlock(${index}, 'mediaType', 'video', true)">Video</button>
                <button class="segmented-btn ${type==='audio'?'active':''}" onclick="Editor.updateBlock(${index}, 'mediaType', 'audio', true)">Audio</button>
            </div>
            
            ${Editor.Helpers.mediaControl(index, block.src, type)}
        </div>

        <div class="prop-section">
            <div class="prop-section-title">Text Content</div>
             <div class="form-group">
                <label>Heading</label>
                <input type="text" value="${block.title || ''}" oninput="Editor.updateBlock(${index}, 'title', this.value)">
            </div>
            <div class="form-group">
                <label>Body Text</label>
                <textarea style="height:100px" oninput="Editor.updateBlock(${index}, 'text', this.value)">${block.text || ''}</textarea>
            </div>
        </div>
    `;
};