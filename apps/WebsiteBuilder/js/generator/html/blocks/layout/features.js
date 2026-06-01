(function() {
    const H = Generator.BlockHelpers;

    Generator.BlockRenderers.features = (b, isEditor) => {
        const feats = (b.items || []).map((f, i) => `
            <div class="feature-card" style="padding:30px; background:var(--bg-secondary); border-radius:var(--radius); border:1px solid var(--border);">
                <span class="material-icons-round icon" style="font-size:36px; color:var(--accent); margin-bottom:15px; display:block;">${f.icon || 'star'}</span>
                <h3 style="font-size:1.2rem; margin-bottom:10px;" ${H.editComplex(isEditor, i, 'title', 'handleFeatureInput')}>${f.title}</h3>
                <p style="opacity:0.8; font-size:0.95rem;" ${H.editComplex(isEditor, i, 'text', 'handleFeatureInput')}>${f.text}</p>
            </div>
        `).join('');
        return `<div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:30px; text-align:center;">${feats}</div>`;
    };
})();