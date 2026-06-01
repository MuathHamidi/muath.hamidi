Editor.PropertiesStyles = Editor.PropertiesStyles || {};

Editor.PropertiesStyles.renderShape = function(s, index) {
    const num = (v) => parseInt(v) || 0;
    
    return `
        <!-- Shape Properties -->
        <div class="grid-2" style="margin:20px 0 0 0; gap:10px;">
            <div class="form-group" style="margin:0">
                <label>Radius</label>
                <input type="number" value="${num(s.borderRadius)}" placeholder="0" 
                    oninput="Editor.updateBlockStyle(${index}, 'borderRadius', this.value)">
            </div>
            <div class="form-group" style="margin:0">
                <label>Shadow</label>
                <select onchange="Editor.updateBlockStyle(${index}, 'boxShadow', this.value)">
                    <option value="none">None</option>
                    <option value="sm" ${s.boxShadow === 'sm' ? 'selected' : ''}>Small</option>
                    <option value="md" ${s.boxShadow === 'md' ? 'selected' : ''}>Medium</option>
                    <option value="lg" ${s.boxShadow === 'lg' ? 'selected' : ''}>Large</option>
                    <option value="xl" ${s.boxShadow === 'xl' ? 'selected' : ''}>X-Large</option>
                </select>
            </div>
        </div>
    `;
};