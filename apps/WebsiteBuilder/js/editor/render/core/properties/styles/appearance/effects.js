Editor.PropertiesStyles = Editor.PropertiesStyles || {};

Editor.PropertiesStyles.renderEffects = function(s, index) {
    const overlayOpacity = s.overlayOpacity !== undefined ? s.overlayOpacity : 0;
    
    return `
        <!-- Image Overlay (Crucial for Hero sections) -->
        <div class="form-group" style="background:var(--bg-tertiary); padding:10px; border-radius:var(--radius-sm);">
            <label>Image Overlay Opacity</label>
            <div class="range-group">
                <input type="range" min="0" max="0.9" step="0.1" value="${overlayOpacity}" 
                    oninput="Editor.updateBlockStyle(${index}, 'overlayOpacity', this.value); this.nextElementSibling.innerText = Math.round(this.value*100)+'%'">
                <span class="range-value">${Math.round(overlayOpacity * 100)}%</span>
            </div>
            <div style="font-size:0.7rem; color:var(--text-secondary); margin-top:5px;">Darkens background images for readable text.</div>
        </div>
    `;
};