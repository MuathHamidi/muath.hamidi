Generator.buildPages = function(data) {
    return data.pages.map((p, i) => 
        `<section id="page-${p.id}" class="page-section ${i===0?'active':''} fade-in">
            <div class="container">${this.generatePageHTML(p)}</div>
        </section>`
    ).join('');
};