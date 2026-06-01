(function() {
    const H = Generator.BlockHelpers;
    
    Generator.BlockRenderers.hero = (b, isEditor) => {
        const bg = b.bg || '';
        const isVideo = bg && (bg.startsWith('data:video') || bg.match(/\.(mp4|webm|mov)$/i));
        
        let backgroundHTML = '';
        if (isVideo) {
            backgroundHTML = `
                <video autoplay loop muted playsinline style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; z-index:0; opacity:0.6;">
                    <source src="${bg}">
                </video>
                <div style="position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:1;"></div>
            `;
        }
        
        return `
        <div class="hero-block" style="${!isVideo && bg ? `background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${bg}');` : ''} padding: 80px 20px; border-radius:var(--radius); position:relative; overflow:hidden;">
            ${isVideo ? backgroundHTML : ''}
            <div style="position:relative; z-index:2;">
                <h1 ${H.edit(isEditor, 'title')}>${b.title}</h1>
                <p class="hero-sub" style="font-size:1.3rem; opacity:0.9; max-width:600px; margin:0 auto 30px auto;" ${H.edit(isEditor, 'subtitle')}>${b.subtitle}</p>
                ${b.ctaText ? `<a href="#" class="btn-action" ${H.edit(isEditor, 'ctaText')}>${b.ctaText}</a>` : ''}
            </div>
        </div>`;
    };
})();