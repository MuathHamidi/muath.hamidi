/* Website Builder/js/editor/render/core/properties/styles/main.js */
Editor.PropertiesStyles = Editor.PropertiesStyles || {};

/**
 * Main render function for the Style tab
 * Aggregates partial renders from sub-modules
 */
Editor.PropertiesStyles.render = function(block, index) {
    const s = block.styles || {};
    
    // Concatenate the HTML from the sub-modules
    return (
        this.renderLayout(s, index) +
        this.renderSpacing(s, index) +
        this.renderTypography(s, index) +
        this.renderAppearance(s, index)
    );
};