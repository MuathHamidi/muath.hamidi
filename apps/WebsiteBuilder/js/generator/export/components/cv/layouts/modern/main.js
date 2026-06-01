/* Website Builder/js/generator/export/components/cv/layouts/modern/main.js */
Generator.CV = Generator.CV || {};
Generator.CV.Layouts = Generator.CV.Layouts || {};
Generator.CV.Layouts.Modern = Generator.CV.Layouts.Modern || {};

Generator.CV.Layouts.modern = function(cv, components, data, s) {
    const { expHTML, projHTML } = components;
    const photoSrc = cv.photo ? cv.photo : '';

    // Pass settings 's' to CSS generator
    const css = Generator.CV.Layouts.Modern.getCSS(s);
    const sidebarContent = Generator.CV.Layouts.Modern.getSidebar(cv, components);

    const customSectionsHTML = (cv.custom || []).map(section => {
        if(!section.items || section.items.length === 0) return '';
        
        const items = section.items.map(item => `
            <div class="cv-web-entry">
                <div class="cv-entry-top">
                    <div class="cv-entry-role">${item.title}</div>
                    ${item.date ? `<div class="cv-entry-time">${item.date}</div>` : ''}
                </div>
                ${item.subtitle ? `<span class="cv-entry-sub">${item.subtitle}</span>` : ''}
                ${item.desc ? `<div class="cv-entry-desc">${item.desc}</div>` : ''}
            </div>
        `).join('');

        return `
            <div class="cv-web-block">
                <div class="cv-web-heading">
                    <i class="material-icons-round" style="color:var(--accent);">bookmark</i> ${section.title}
                </div>
                ${items}
            </div>
        `;
    }).join('');

    // --- Main HTML ---
    return `
    <section id="page-cv" class="page-section cv-web-section" style="--accent:${s.accentColor};">
        <button class="print-btn" onclick="window.print()" title="Download PDF">
            <span class="material-icons-round">picture_as_pdf</span>
        </button>

        <div class="container">
            <!-- Header -->
            <header class="cv-web-header">
                ${(s.showPhoto && photoSrc) ? `<img src="${photoSrc}" class="cv-web-avatar" alt="Profile">` : ''}
                <div class="cv-web-title-block">
                    <h1>${cv.name}</h1>
                    <div class="cv-web-role">${cv.title}</div>
                    ${cv.summary ? `<p style="max-width:600px; opacity:0.8; line-height:1.6;">${cv.summary}</p>` : ''}
                </div>
            </header>

            <div class="cv-web-grid">
                <!-- Main Column -->
                <div class="cv-web-main">
                    
                    <div class="cv-web-block">
                        <div class="cv-web-heading"><i class="material-icons-round">work</i> Experience</div>
                        ${expHTML ? expHTML.replace(/class="cv-item"/g, 'class="cv-web-entry"').replace(/class="cv-item-header"/g, 'class="cv-entry-top"').replace(/class="cv-item-title"/g, 'class="cv-entry-role"').replace(/class="cv-item-date"/g, 'class="cv-entry-time"').replace(/class="cv-item-subtitle"/g, 'class="cv-entry-sub"').replace(/class="cv-item-desc"/g, 'class="cv-entry-desc"') : 'No experience entries.'}
                    </div>

                    ${projHTML ? `
                        <div class="cv-web-block">
                            <div class="cv-web-heading"><i class="material-icons-round">rocket_launch</i> Projects</div>
                            ${projHTML.replace(/class="cv-item"/g, 'class="cv-web-entry"').replace(/class="cv-item-header"/g, 'class="cv-entry-top"').replace(/class="cv-item-title"/g, 'class="cv-entry-role"').replace(/class="cv-item-desc"/g, 'class="cv-entry-desc"')}
                        </div>
                    ` : ''}

                    ${customSectionsHTML}
                </div>

                <!-- Sidebar Column -->
                <aside class="cv-web-sidebar">
                    ${sidebarContent}
                </aside>
            </div>
        </div>
        ${css}
    </section>
    `;
};