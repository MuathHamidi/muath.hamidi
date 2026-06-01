/* Website Builder/js/generator/export/components/cv/layouts/modern/sidebar.js */
Generator.CV = Generator.CV || {};
Generator.CV.Layouts = Generator.CV.Layouts || {};
Generator.CV.Layouts.Modern = Generator.CV.Layouts.Modern || {};

Generator.CV.Layouts.Modern.getSidebar = function(cv, components) {
    const { eduHTML } = components; // Keep eduHTML as it has complex formatting, or could refactor too.
    // Re-rendering lists from raw data to avoid string-replacement issues and double headers.

    // 1. Contact
    const contactHTML = `
        <div class="cv-sidebar-box">
            <h3>Contact Details</h3>
            <div class="web-contact-list">
                ${cv.contact.email ? `<a href="mailto:${cv.contact.email}" class="web-contact-item"><span class="web-contact-icon material-icons-round">email</span>${cv.contact.email}</a>` : ''}
                ${cv.contact.phone ? `<span class="web-contact-item"><span class="web-contact-icon material-icons-round">phone</span>${cv.contact.phone}</span>` : ''}
                ${cv.contact.location ? `<span class="web-contact-item"><span class="web-contact-icon material-icons-round">place</span>${cv.contact.location}</span>` : ''}
                ${cv.contact.website ? `<a href="${cv.contact.website}" target="_blank" class="web-contact-item"><span class="web-contact-icon material-icons-round">language</span>Portfolio</a>` : ''}
                ${cv.contact.linkedin ? `<a href="${cv.contact.linkedin}" target="_blank" class="web-contact-item"><span class="web-contact-icon material-icons-round">link</span>LinkedIn</a>` : ''}
                ${cv.contact.github ? `<a href="${cv.contact.github}" target="_blank" class="web-contact-item"><span class="web-contact-icon material-icons-round">code</span>GitHub</a>` : ''}
            </div>
        </div>`;

    // 2. Education (Using existing component string but stripping outer generic classes if needed, 
    // or just using it if it fits. The modern layout logic replaced classes previously.
    // Let's rely on the previous logic for Education but clean it up).
    const educationBlock = eduHTML ? `
        <div class="cv-sidebar-box">
            <h3>Education</h3>
            ${eduHTML
                .replace(/class="cv-item"/g, 'class="cv-web-entry" style="padding:0; background:transparent; border:none; box-shadow:none; margin-bottom:15px;"')
                .replace(/class="cv-item-title"/g, 'style="font-weight:bold; color:var(--text);"')
                .replace(/class="cv-item-subtitle"/g, 'style="opacity:0.8; font-size:0.9rem;"')
                .replace(/class="cv-item-date"/g, 'style="display:block; font-size:0.8rem; color:var(--accent); margin-bottom:2px;"')
            }
        </div>` : '';

    // 3. Skills - Render items individually to avoid the "mashed text" bug
    let skillsBlock = '';
    if (cv.skills && cv.skills.length > 0) {
        const skillsTags = cv.skills.map(s => `<span class="web-skill-tag">${s}</span>`).join('');
        skillsBlock = `
        <div class="cv-sidebar-box">
            <h3>Technical Skills</h3>
            <div class="web-skills">${skillsTags}</div>
        </div>`;
    }

    // 4. Languages - Render clean list to avoid double H3 headers
    let langBlock = '';
    if (cv.languages && cv.languages.length > 0) {
        const langItems = cv.languages.map(l => `<li style="margin-bottom:5px;">${l}</li>`).join('');
        langBlock = `
        <div class="cv-sidebar-box">
            <h3>Languages</h3>
            <ul style="padding-left:20px; margin:0; font-size:0.9rem; opacity:0.9; color:var(--text);">
                ${langItems}
            </ul>
        </div>`;
    }

    // 5. Certifications
    let certBlock = '';
    if (cv.certifications && cv.certifications.length > 0) {
        const certItems = cv.certifications.map(c => `
            <li style="margin-bottom:8px;">
                <strong>${c.name}</strong>
                ${c.issuer ? `<br><span style="font-size:0.85rem; opacity:0.7;">${c.issuer}</span>` : ''}
            </li>
        `).join('');
        certBlock = `
        <div class="cv-sidebar-box">
            <h3>Certifications</h3>
            <ul style="padding-left:20px; margin:0; font-size:0.9rem; color:var(--text);">
                ${certItems}
            </ul>
        </div>`;
    }

    return contactHTML + educationBlock + skillsBlock + langBlock + certBlock;
};