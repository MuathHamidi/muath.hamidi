(function() {
    const H = Generator.BlockHelpers;

    Generator.BlockRenderers.table = (b, isEditor) => {
        let data = b.data;
        if (!data && b.headers) data = [b.headers, ...b.rows];
        if(!data) data = [['Header 1', 'Header 2'], ['Cell 1', 'Cell 2']];

        const tableHTML = data.map((row, rIndex) => {
            const cells = row.map((cellText, cIndex) => {
                const tag = rIndex === 0 ? 'th' : 'td';
                const style = rIndex === 0 
                    ? `text-align:left; padding:12px; border-bottom:2px solid var(--border); background:var(--bg-secondary);`
                    : `padding:12px; border-bottom:1px solid var(--border);`;
                
                const editAttrs = isEditor 
                    ? `contenteditable="true" oninput="Editor.handleTableCellInput(event, ${rIndex}, ${cIndex})" onblur="Editor.handleInlineBlur(event)"`
                    : '';

                return `<${tag} style="${style}" ${editAttrs}>${cellText}</${tag}>`;
            }).join('');
            return `<tr>${cells}</tr>`;
        }).join('');

        return `<div style="overflow-x:auto;"><table style="width:100%; border-collapse:collapse; font-size:0.95rem;"><tbody>${tableHTML}</tbody></table></div>`;
    };
})();