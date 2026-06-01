Generator.CV = Generator.CV || {};
Generator.CV.Layouts = Generator.CV.Layouts || {};

Generator.CV.Layouts.creative = function(cv, components, data, s) {
    const { expHTML, eduHTML, projHTML, skillHTML, contactHTML, langHTML, certHTML } = components;

    const css = `
    <style>
        .cv-creative { --left-w: 35%; --bg-dark: #1a1a1a; --text-light: #f5f5f5; }
        
        .cv-creative-grid { display: grid; grid-template-columns: var(--left-w) 1fr; min-height: 1000px; box-shadow: 0 0 50px rgba(0,0,0,0.1); }
        
        .cv-left { 
            background: var(--bg-dark); color: var(--text-light); 
            padding: 50px 30px; position: relative; overflow: hidden;
            -webkit-print-color-adjust: exact; print-color-adjust: exact;
        }
        /* Pattern Overlay */
        .cv-left::before {
            content: ''; position: absolute; top:0; left:0; width:100%; height:100%;
            background-image: radial-gradient(var(--cv-accent) 1px, transparent 1px);
            background-size: 20px 20px; opacity: 0.05; pointer-events: none;
        }

        .cv-right { background: white; color: #222; padding: 60px 50px; }

        .creative-photo {
            width: 160px; height: 160px; object-fit: cover; border-radius: 50%;
            border: 5px solid rgba(255,255,255,0.1); margin: 0 auto 40px auto; display: block;
        }

        .left-block { margin-bottom: 40px; position: relative; z-index: 2; }
        .left-title { 
            font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; 
            margin-bottom: 20px; color: var(--cv-accent); font-weight: 700;
        }
        
        .cv-contact-list { display: flex; flex-direction: column; gap: 12px; font-size: 0.9rem; }
        .cv-contact-list a, .cv-contact-list span { color: rgba(255,255,255,0.8); text-decoration: none; display: flex; align-items: center; gap: 10px; }
        .cv-contact-list i { font-size: 18px; color: var(--cv-accent); }

        .right-header { margin-bottom: 50px; border-bottom: 1px solid #eee; padding-bottom: 30px; }
        .big-name { font-size: 3.5rem; line-height: 0.9; font-weight: 900; text-transform: uppercase; letter-spacing: -2px; margin: 0; }
        .big-role { font-size: 1.5rem; color: var(--cv-accent); margin-top: 10px; font-weight: 300; }

        .right-section-title {
            font-size: 1.2rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;
            margin: 40px 0 25px 0; display: flex; align-items: center; gap: 15px;
        }
        .right-section-title::after { content: ''; flex: 1; height: 2px; background: #eee; }
        
        /* Override standard components for dark theme on left */
        .cv-left .skill-tag { background: rgba(255,255,255,0.1); border: none; color: white; }
        
        @media(max-width: 800px) {
            .cv-creative-grid { grid-template-columns: 1fr; }
            .cv-left { text-align: center; padding: 40px 20px; }
            .cv-contact-list { align-items: center; }
        }
        
        @media print {
            .cv-creative-grid { display: grid !important; height: 100% !important; }
            .cv-left { background: #1a1a1a !important; color: white !important; -webkit-print-color-adjust: exact; }
            .cv-right { color: black !important; }
        }
    </style>`;

    const customContact = `
    <div class="cv-contact-list">
        ${cv.contact.email ? `<span><i class="material-icons-round">email</i> ${cv.contact.email}</span>` : ''}
        ${cv.contact.phone ? `<span><i class="material-icons-round">phone</i> ${cv.contact.phone}</span>` : ''}
        ${cv.contact.location ? `<span><i class="material-icons-round">place</i> ${cv.contact.location}</span>` : ''}
        ${cv.contact.website ? `<a href="${cv.contact.website}"><i class="material-icons-round">language</i> Website</a>` : ''}
        ${cv.contact.linkedin ? `<a href="${cv.contact.linkedin}"><i class="material-icons-round">people</i> LinkedIn</a>` : ''}
    </div>`;

    return `
    <section id="page-cv" class="page-section fade-in cv-creative" style="--cv-accent:${s.accentColor}; --cv-bg:var(--bg);">
        <button class="print-btn" onclick="window.print()" title="Print CV"><span class="material-icons-round">print</span></button>

        <div class="container" style="max-width:1100px; padding:0;">
            <div class="cv-creative-grid">
                
                <!-- Dark Left Sidebar -->
                <div class="cv-left">
                    ${(s.showPhoto && data.settings.profileImg) ? `<img src="${data.settings.profileImg}" class="creative-photo">` : ''}
                    
                    <div class="left-block">
                        <div class="left-title">Contact</div>
                        ${customContact}
                    </div>

                    ${eduHTML ? `
                    <div class="left-block">
                        <div class="left-title">Education</div>
                        <div style="font-size:0.9rem; opacity:0.9;">${eduHTML}</div>
                    </div>` : ''}

                    ${skillHTML ? `
                    <div class="left-block">
                        <div class="left-title">Skills</div>
                        <div style="display:flex; flex-wrap:wrap; gap:8px; justify-content: ${s.showPhoto ? 'center' : 'flex-start'}">${skillHTML}</div>
                    </div>` : ''}
                    
                    ${langHTML ? `<div class="left-block"><div class="left-title">Languages</div>${langHTML}</div>` : ''}
                </div>

                <!-- White Right Content -->
                <div class="cv-right">
                    <div class="right-header">
                        <h1 class="big-name">${cv.name}</h1>
                        <div class="big-role">${cv.title}</div>
                    </div>

                    <div style="font-size:1.1rem; line-height:1.8; margin-bottom:40px; color:#555;">
                        ${cv.summary}
                    </div>

                    <h2 class="right-section-title"><span style="color:var(--cv-accent);">01</span> Experience</h2>
                    <div>${expHTML}</div>

                    ${projHTML ? `<h2 class="right-section-title"><span style="color:var(--cv-accent);">02</span> Projects</h2>${projHTML}` : ''}
                    ${certHTML ? `<h2 class="right-section-title"><span style="color:var(--cv-accent);">03</span> Credentials</h2>${certHTML}` : ''}
                </div>
            </div>
        </div>
        ${css}
    </section>`;
};