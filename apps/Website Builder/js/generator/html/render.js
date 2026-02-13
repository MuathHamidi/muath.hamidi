/* Website Builder/js/generator/html/render.js */

Generator.generatePageHTML = function(page) {
    if (!page.blocks) return '';
    
    // We wrap each block in a section with the global styles applied
    return page.blocks.map(b => {
        const styles = this.getStyles(b);
        const content = this.generateBlockHTML(b);
        
        // Check for new line property and inject break div if needed
        const breakHTML = (b.styles && b.styles.newLine) 
            ? '<div style="flex-basis:100%; height:0; margin:0; padding:0;"></div>' 
            : '';

        return `${breakHTML}<section style="${styles.wrapperStyle}">
            <div style="${styles.innerStyle}">
                ${content}
            </div>
        </section>`;
    }).join('');
};