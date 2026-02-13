/* Contact Block Renderer */
(function() {
    const H = Generator.BlockHelpers;

    Generator.BlockRenderers.contact = (b, isEditor) => {
        const fields = (b.fields || []).map(f => {
            let input = '';
            if (f.type === 'textarea') {
                input = `<textarea class="form-control" placeholder="${f.label}" style="width:100%; padding:12px; margin-bottom:15px; border:1px solid var(--border); border-radius:var(--radius); background:var(--bg); color:var(--text);"></textarea>`;
            } else {
                input = `<input type="${f.type}" class="form-control" placeholder="${f.label}" style="width:100%; padding:12px; margin-bottom:15px; border:1px solid var(--border); border-radius:var(--radius); background:var(--bg); color:var(--text);">`;
            }
            return `<div>
                <label style="display:block; margin-bottom:5px; font-weight:600; font-size:0.9rem;">${f.label}</label>
                ${input}
            </div>`;
        }).join('');

        return `
        <div class="contact-form-block" style="max-width:600px; margin:0 auto; padding:30px; background:var(--surface); border-radius:var(--radius); border:1px solid var(--border);">
            <h2 style="margin-top:0; margin-bottom:20px;" ${H.edit(isEditor, 'title')}>${b.title}</h2>
            <form onsubmit="event.preventDefault(); alert('This is a demo form. In export, connect this to a backend.');">
                ${fields}
                <button type="submit" class="btn-action" style="width:100%; cursor:pointer; border:none; font-size:1rem;">${b.submitText}</button>
            </form>
            <div style="font-size:0.8rem; opacity:0.6; margin-top:15px; text-align:center;">
                Sending to: ${isEditor ? b.email : 'Protected'}
            </div>
        </div>`;
    };
})();