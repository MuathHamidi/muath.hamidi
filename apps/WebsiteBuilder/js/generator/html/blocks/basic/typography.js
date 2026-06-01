(function() {
    const H = Generator.BlockHelpers;

    Generator.BlockRenderers.heading = (b, isEditor) => {
        return `<${b.level} ${H.edit(isEditor, 'value')}>${b.value}</${b.level}>`;
    };

    Generator.BlockRenderers.text = (b, isEditor) => {
        return `<div class="text-block" ${H.edit(isEditor, 'value')}>${b.value.replace(/\n/g, '<br>')}</div>`;
    };

    Generator.BlockRenderers.quote = (b, isEditor) => {
        return `<blockquote style="border-left:4px solid var(--accent); padding-left:20px; margin:0; font-style:italic;">
            "<span ${H.edit(isEditor, 'text')}>${b.text}</span>"
            <footer style="margin-top:10px; font-weight:600;">— <span ${H.edit(isEditor, 'author')}>${b.author}</span></footer>
        </blockquote>`;
    };

    Generator.BlockRenderers.code = (b, isEditor) => {
        return `<pre style="background:#1e1e1e; color:#f8f8f2; padding:20px; border-radius:var(--radius); overflow-x:auto; text-align:left;"><code class="language-${b.lang}" ${H.edit(isEditor, 'code')}>${b.code ? b.code.replace(/</g, '&lt;') : ''}</code></pre>`;
    };
})();