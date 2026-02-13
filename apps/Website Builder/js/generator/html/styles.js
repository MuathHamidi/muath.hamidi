/* Website Builder/js/generator/html/styles.js */
Generator.getStyles = function(b) {
    const s = b.styles || {};
    
    let bg = s.bg || 'transparent';
    const opacity = s.overlayOpacity || 0;
    
    if (opacity > 0 && bg !== 'transparent') {
        const overlay = `rgba(0,0,0,${opacity})`;
        bg = `linear-gradient(${overlay}, ${overlay}), ${bg}`;
    }
    
    const color = s.color || 'inherit';
    const align = s.align || 'left';
    
    // Default to 1000px if not set, or 100% if specifically requested
    const maxWidth = s.maxWidth || '1000px';
    
    // Width for Flexbox Grid (Default 100% means new line)
    const width = s.width || '100%';
    
    const pt = s.paddingTop !== undefined ? s.paddingTop + 'px' : (s.padding ? s.padding + 'px' : '20px');
    const pb = s.paddingBottom !== undefined ? s.paddingBottom + 'px' : (s.padding ? s.padding + 'px' : '20px');
    const mt = s.marginTop ? s.marginTop + 'px' : '0';
    const mb = s.marginBottom ? s.marginBottom + 'px' : '0';
    
    const fs = s.fontSize || 'inherit';
    const fw = s.fontWeight || 'inherit';

    // WRAPPER STYLE (The Grid Cell)
    // - text-align: controls text alignment inside
    // - flex-basis/max-width: controls how much space it takes in the row
    const wrapperStyle = `
        background: ${bg}; 
        ${bg.includes('url') ? 'background-size: cover; background-position: center;' : ''}
        color: ${color}; 
        text-align: ${align}; /* Propagates text alignment to children */
        padding-top: ${pt};
        padding-bottom: ${pb};
        margin-top: ${mt};
        margin-bottom: ${mb};
        flex-basis: ${width};
        max-width: ${width};
        box-sizing: border-box;
        position: relative;
    `;

    // INNER STYLE (The Content Box)
    // - Controls the actual visual block alignment (Left/Center/Right) via margins
    let margin = '0 auto'; // Default Center
    if (align === 'left') margin = '0 auto 0 0';
    if (align === 'right') margin = '0 0 0 auto';

    const innerStyle = `
        max-width: ${maxWidth}; 
        margin: ${margin};
        padding: 0 20px; 
        position: relative;
        font-size: ${fs};
        font-weight: ${fw};
        width: 100%; 
    `;
    
    return { wrapperStyle, innerStyle };
};