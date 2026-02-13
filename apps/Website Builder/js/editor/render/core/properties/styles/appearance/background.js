Editor.PropertiesStyles = Editor.PropertiesStyles || {};

Editor.PropertiesStyles.renderBackground = function(s, index) {
    // Check if current BG is a gradient or solid
    const isGradient = s.bg && s.bg.includes('gradient');
    
    return `
        <!-- Background Color / Gradient -->
        <div class="form-group">
            <label>Background Style</label>
            <div class="grid-2" style="gap:10px; margin-bottom:10px;">
                <!-- Solid Color Picker -->
                <div style="display:flex; align-items:center; border:1px solid var(--border); border-radius:4px; padding:4px; background:var(--bg-primary);">
                    <input type="color" value="${!isGradient ? (s.bg === 'transparent' ? '#ffffff' : s.bg) : '#ffffff'}" 
                        oninput="Editor.updateBlockStyle(${index}, 'bg', this.value)" style="width:30px; height:30px; padding:0; border:none; margin-right:8px; cursor:pointer;">
                    <span style="font-size:0.8rem;">Solid</span>
                </div>
                <!-- Reset -->
                <button class="btn btn-sm btn-outline" onclick="Editor.updateBlockStyle(${index}, 'bg', 'transparent')">Clear</button>
            </div>

            <!-- Gradient Presets -->
            <label style="margin-top:10px; font-size:0.75rem; color:var(--text-secondary);">Gradients</label>
            <div style="display:flex; gap:8px; overflow-x:auto; padding-bottom:5px;">
                <div onclick="Editor.updateBlockStyle(${index}, 'bg', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)')" 
                     style="min-width:30px; height:30px; border-radius:50%; cursor:pointer; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); border:2px solid var(--border);"></div>
                <div onclick="Editor.updateBlockStyle(${index}, 'bg', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)')" 
                     style="min-width:30px; height:30px; border-radius:50%; cursor:pointer; background:linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border:2px solid var(--border);"></div>
                <div onclick="Editor.updateBlockStyle(${index}, 'bg', 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)')" 
                     style="min-width:30px; height:30px; border-radius:50%; cursor:pointer; background:linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%); border:2px solid var(--border);"></div>
                <div onclick="Editor.updateBlockStyle(${index}, 'bg', 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)')" 
                     style="min-width:30px; height:30px; border-radius:50%; cursor:pointer; background:linear-gradient(160deg, #0093E9 0%, #80D0C7 100%); border:2px solid var(--border);"></div>
                 <div onclick="Editor.updateBlockStyle(${index}, 'bg', 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)')" 
                     style="min-width:30px; height:30px; border-radius:50%; cursor:pointer; background:linear-gradient(19deg, #21D4FD 0%, #B721FF 100%); border:2px solid var(--border);"></div>
            </div>
        </div>
    `;
};