/* Advanced Block Renderers */
(function() {
    const H = Generator.BlockHelpers;

    Generator.BlockRenderers.pricing = (b, isEditor) => {
        const plans = (b.items || []).map((p, i) => `
            <div class="pricing-card ${p.highlight ? 'highlight' : ''}" style="border:1px solid var(--border); padding:30px; border-radius:var(--radius); background:var(--surface); position:relative; ${p.highlight ? 'border-color:var(--accent); box-shadow:0 10px 30px rgba(0,0,0,0.1); transform:scale(1.02);' : ''}">
                ${p.highlight ? `<span style="position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:var(--accent); color:white; padding:4px 12px; border-radius:20px; font-size:0.8rem; font-weight:bold;">POPULAR</span>` : ''}
                <h3 style="margin:0; opacity:0.8;" ${H.editComplex(isEditor, i, 'plan', 'handlePricingInput')}>${p.plan}</h3>
                <div style="font-size:2.5rem; font-weight:800; margin:15px 0; color:var(--accent);" ${H.editComplex(isEditor, i, 'price', 'handlePricingInput')}>${p.price}</div>
                <div style="margin-bottom:25px; opacity:0.7; font-size:0.9rem; line-height:1.6;" ${H.editComplex(isEditor, i, 'features', 'handlePricingInput')}>${p.features.replace(/\n/g, '<br>')}</div>
                <a href="#" class="btn-action" style="${!p.highlight ? 'background:transparent; border:1px solid var(--text); color:var(--text);' : ''}">Choose Plan</a>
            </div>
        `).join('');
        return `<div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:30px; align-items:center;">${plans}</div>`;
    };

    Generator.BlockRenderers.testimonials = (b, isEditor) => {
        const tests = (b.items || []).map((t, i) => `
            <div style="background:var(--surface); padding:30px; border-radius:var(--radius); border:1px solid var(--border);">
                <div style="color:var(--accent); font-size:2rem; line-height:1; margin-bottom:15px;">“</div>
                <p style="font-style:italic; margin-bottom:20px; font-size:1.1rem;" ${H.editComplex(isEditor, i, 'quote', 'handleTestimonialInput')}>${t.quote}</p>
                <div style="display:flex; align-items:center; gap:15px;">
                    ${t.img ? `<img src="${t.img}" style="width:50px; height:50px; border-radius:50%; object-fit:cover;">` : `<div style="width:50px; height:50px; background:var(--border); border-radius:50%;"></div>`}
                    <div>
                        <div style="font-weight:bold;" ${H.editComplex(isEditor, i, 'name', 'handleTestimonialInput')}>${t.name}</div>
                        <div style="font-size:0.85rem; opacity:0.6;" ${H.editComplex(isEditor, i, 'role', 'handleTestimonialInput')}>${t.role}</div>
                    </div>
                </div>
            </div>
        `).join('');
        return `<div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:30px;">${tests}</div>`;
    };

    Generator.BlockRenderers.faq = (b, isEditor) => {
        const faqs = (b.items || []).map((f, i) => `
            <details style="margin-bottom:15px; border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; background:var(--surface);">
                <summary style="padding:20px; cursor:pointer; font-weight:600; list-style:none; display:flex; justify-content:space-between; align-items:center;">
                    <span ${H.editComplex(isEditor, i, 'question', 'handleFaqInput')}>${f.question}</span> <span style="opacity:0.5;">+</span>
                </summary>
                <div style="padding:0 20px 20px 20px; opacity:0.8; line-height:1.6; border-top:1px solid var(--border);" ${H.editComplex(isEditor, i, 'answer', 'handleFaqInput')}>${f.answer}</div>
            </details>
        `).join('');
        return `<div style="max-width:800px; margin:0 auto; text-align:left;">${faqs}</div>`;
    };
})();