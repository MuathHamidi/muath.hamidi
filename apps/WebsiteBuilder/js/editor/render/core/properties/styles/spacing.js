/* Website Builder/js/editor/render/core/properties/styles/spacing.js */
Editor.PropertiesStyles = Editor.PropertiesStyles || {};

Editor.PropertiesStyles.renderSpacing = function(s, index) {
    const num = (v) => parseInt(v) || 0;
    
    return `
    <div class="prop-section">
        <div class="prop-section-title"><span class="material-icons-round" style="font-size:16px">crop_square</span> Spacing</div>
        
        <div class="box-model-wrapper">
            <span class="box-label margin">Margin</span>
            <span class="box-label padding">Padding</span>
            
            <div class="box-inputs">
                <!-- Top Row -->
                <div></div>
                <input type="text" class="box-input" placeholder="MT" value="${num(s.marginTop)}" 
                    onchange="Editor.updateBlockStyle(${index}, 'marginTop', this.value)" title="Margin Top">
                <div></div>

                <!-- Middle Row (Top Padding) -->
                <div></div>
                <input type="text" class="box-input" style="color:var(--accent)" placeholder="PT" value="${num(s.paddingTop || s.padding)}" 
                    onchange="Editor.updateBlockStyle(${index}, 'paddingTop', this.value)" title="Padding Top">
                <div></div>

                <!-- Middle Row (L/R) -->
                <div style="display:flex; gap:10px">
                    <input type="text" class="box-input" style="color:var(--accent)" placeholder="PL" value="20" disabled title="Fixed Gutter">
                </div>
                
                <div style="text-align:center; font-size:0.7rem; color:var(--text-secondary);">CONTENT</div>

                <div style="display:flex; gap:10px">
                     <input type="text" class="box-input" style="color:var(--accent)" placeholder="PR" value="20" disabled title="Fixed Gutter">
                </div>

                <!-- Bottom Row (Bottom Padding) -->
                <div></div>
                <input type="text" class="box-input" style="color:var(--accent)" placeholder="PB" value="${num(s.paddingBottom || s.padding)}" 
                    onchange="Editor.updateBlockStyle(${index}, 'paddingBottom', this.value)" title="Padding Bottom">
                <div></div>

                <!-- Bottom Row -->
                <div></div>
                <input type="text" class="box-input" placeholder="MB" value="${num(s.marginBottom)}" 
                    onchange="Editor.updateBlockStyle(${index}, 'marginBottom', this.value)" title="Margin Bottom">
                <div></div>
            </div>
        </div>
    </div>`;
};