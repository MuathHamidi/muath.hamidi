Generator.CV = Generator.CV || {};
Generator.CV.Layouts = Generator.CV.Layouts || {};

Generator.CV.Layouts.minimal = function(cv, components, data, s) {
    const { expHTML, eduHTML, projHTML, skillHTML } = components;

    const css = `
    <style>
        .minimal-timeline .timeline-dot { background: var(--cv-accent); }
        .skill-tag { background: transparent; border: 1px solid var(--cv-accent); color: var(--cv-accent); padding: 4px 10px; font-size: 0.8rem; margin: 0 5px 5px 0; border-radius: 4px; display: inline-block; }
    </style>`;

    return `
    <section id="page-cv" class="page-section fade-in" style="--cv-accent:${s.accentColor}; --cv-bg:var(--bg); --cv-surface:var(--surface);">
        <!-- Print Button -->
        <button class="print-btn" onclick="window.print()" title="Print CV">
            <span class="material-icons-round">print</span>
        </button>

        <div class="container" style="max-width:800px; padding:60px 20px;">
            <div style="text-align:center; border-bottom:1px solid var(--border); padding-bottom:40px; margin-bottom:40px;">
                ${(s.showPhoto && data.settings.profileImg) ? `<img src="${data.settings.profileImg}" style="width:120px; height:120px; border-radius:50%; object-fit:cover; margin-bottom:20px;">` : ''}
                <h1 style="margin:0; font-size:2.5rem; letter-spacing:-1px;">${cv.name}</h1>
                <div style="color:var(--cv-accent); font-weight:600; margin:10px 0; text-transform:uppercase; letter-spacing:1px; font-size:0.9rem;">${cv.title}</div>
                <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap; font-size:0.9rem; opacity:0.8;">
                    ${cv.contact.email ? `<span>${cv.contact.email}</span>` : ''}
                    ${cv.contact.location ? `<span>${cv.contact.location}</span>` : ''}
                    ${cv.contact.website ? `<a href="${cv.contact.website}" style="color:var(--cv-accent)">Portfolio</a>` : ''}
                </div>
            </div>

            <div style="margin-bottom:40px;">
                <h3 style="font-size:0.9rem; text-transform:uppercase; letter-spacing:1px; border-bottom:2px solid var(--cv-accent); display:inline-block; padding-bottom:5px; margin-bottom:20px;">Profile</h3>
                <p style="line-height:1.8;">${cv.summary}</p>
            </div>

            <div class="grid-2-responsive" style="align-items:start;">
                <div>
                    <h3 style="font-size:0.9rem; text-transform:uppercase; letter-spacing:1px; border-bottom:2px solid var(--cv-accent); display:inline-block; padding-bottom:5px; margin-bottom:20px;">Experience</h3>
                    <div class="timeline minimal-timeline">${expHTML}</div>
                    ${projHTML ? `<div style="margin-top:30px;"><h3 style="font-size:0.9rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:20px;">Projects</h3>${projHTML}</div>` : ''}
                </div>
                <div>
                     ${eduHTML ? `
                    <div style="margin-bottom:30px;">
                        <h3 style="font-size:0.9rem; text-transform:uppercase; letter-spacing:1px; border-bottom:2px solid var(--cv-accent); display:inline-block; padding-bottom:5px; margin-bottom:20px;">Education</h3>
                        ${eduHTML}
                    </div>` : ''}
                    ${skillHTML ? `
                    <div>
                        <h3 style="font-size:0.9rem; text-transform:uppercase; letter-spacing:1px; border-bottom:2px solid var(--cv-accent); display:inline-block; padding-bottom:5px; margin-bottom:20px;">Skills</h3>
                        <div class="skills-wrapper">${skillHTML}</div>
                    </div>` : ''}
                </div>
            </div>
        </div>
        ${css}
    </section>`;
};