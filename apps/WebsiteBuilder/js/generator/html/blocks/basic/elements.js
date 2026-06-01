(function() {
    const H = Generator.BlockHelpers;

    Generator.BlockRenderers.button = (b, isEditor) => {
        return `<a href="${b.url}" class="btn-action" ${H.edit(isEditor, 'text')}>${b.text}</a>`;
    };

    Generator.BlockRenderers.divider = (b) => {
        return `<hr style="border:0; border-top: 2px ${b.style} var(--border); opacity:0.5;">`;
    };

    Generator.BlockRenderers.spacer = (b) => {
        return `<div style="height:${b.height}px"></div>`;
    };
})();