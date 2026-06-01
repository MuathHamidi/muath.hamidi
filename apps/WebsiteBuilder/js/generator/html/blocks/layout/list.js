(function() {
    const H = Generator.BlockHelpers;
    
    Generator.BlockRenderers.list = (b, isEditor) => {
        const items = (b.items || []).map((item, i) => 
            `<li><span ${H.editList(isEditor, i)}>${item}</span></li>`
        ).join('');
        return `<ul style="text-align:left; display:inline-block;">${items}</ul>`;
    };
})();