Editor.PropertiesStyles = Editor.PropertiesStyles || {};

Editor.PropertiesStyles.renderAppearance = function(s, index) {
    return `
    <div class="prop-section" style="border-bottom:none;">
        <div class="prop-section-title"><span class="material-icons-round" style="font-size:16px">palette</span> Background & Effects</div>
        ${this.renderBackground(s, index)}
        ${this.renderEffects(s, index)}
        ${this.renderShape(s, index)}
    </div>`;
};