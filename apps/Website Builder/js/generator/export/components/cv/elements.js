/* CV Helper Sub-components - Enhanced Structure */
Generator.CV = Generator.CV || {};

// ... (Previous Render functions: Experience, Projects, Education, Skills, etc. keep as is) ...

Generator.CV.renderExperience = function(entries) {
    if(!entries || entries.length === 0) return '';
    return entries.map(e => `
        <div class="cv-item">
            <div class="cv-item-header">
                <h4 class="cv-item-title">${e.role}</h4>
                <span class="cv-item-date">${e.date}</span>
            </div>
            <div class="cv-item-subtitle">${e.org}</div>
        </div>
    `).join('');
};

Generator.CV.renderProjects = function(projects) {
    if(!projects || projects.length === 0) return '';
    return projects.map(p => `
        <div class="cv-item">
            <div class="cv-item-header">
                <h4 class="cv-item-title">${p.name}</h4>
                ${p.link ? `<a href="${p.link}" target="_blank" class="cv-item-link">View Project &rarr;</a>` : ''}
            </div>
            <p class="cv-item-desc">${p.desc}</p>
        </div>
    `).join('');
};

Generator.CV.renderEducation = function(education) {
    if(!education || education.length === 0) return '';
    return education.map(e => `
        <div class="cv-item">
            <div class="cv-item-header">
                <h4 class="cv-item-title">${e.degree}</h4>
                <span class="cv-item-date">${e.year}</span>
            </div>
            <div class="cv-item-subtitle">${e.school}</div>
        </div>
    `).join('');
};

Generator.CV.renderSkills = function(skills) {
    if(!skills || skills.length === 0) return '';
    return `<div class="cv-tag-cloud">${skills.map(s => `<span>${s}</span>`).join('')}</div>`;
};

Generator.CV.renderLanguages = function(languages) {
    if(!languages || languages.length === 0) return '';
    return `<div class="cv-list-block">
        <h3 class="cv-sidebar-header">Languages</h3>
        <ul class="cv-simple-list">
            ${languages.map(l => `<li>${l}</li>`).join('')}
        </ul>
    </div>`;
};

Generator.CV.renderCerts = function(certs) {
    if(!certs || certs.length === 0) return '';
    const list = certs.map(c => `
        <li class="cv-cert-item">
            <strong>${c.name}</strong> 
            ${c.issuer ? `<br><span class="cv-cert-issuer">${c.issuer}</span>` : ''}
        </li>
    `).join('');
    return `<div class="cv-list-block">
        <h3 class="cv-sidebar-header">Certifications</h3>
        <ul class="cv-simple-list">${list}</ul>
    </div>`;
};

Generator.CV.renderContact = function(contact) {
    contact = contact || {};
    const clean = (url) => url ? url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : '';
    const linkify = (url) => url && url.startsWith('http') ? url : `https://${url}`;

    return `
        <div class="cv-contact-row">
            ${contact.email ? `<a href="mailto:${contact.email}"><span>@</span>${contact.email}</a>` : ''}
            ${contact.phone ? `<span><span>P</span>${contact.phone}</span>` : ''}
            ${contact.location ? `<span><span>L</span>${contact.location}</span>` : ''}
            ${contact.website ? `<a href="${linkify(contact.website)}" target="_blank"><span>W</span>${clean(contact.website)}</a>` : ''}
            ${contact.linkedin ? `<a href="${linkify(contact.linkedin)}" target="_blank"><span>in</span>LinkedIn</a>` : ''}
            ${contact.github ? `<a href="${linkify(contact.github)}" target="_blank"><span>gh</span>GitHub</a>` : ''}
        </div>
    `;
};

// NEW: Custom Section Renderer
Generator.CV.renderCustom = function(customSections) {
    if(!customSections || customSections.length === 0) return '';
    
    return customSections.map(section => {
        if(!section.items || section.items.length === 0) return '';
        
        const itemsHtml = section.items.map(item => `
            <div class="cv-item">
                <div class="cv-item-header">
                    <h4 class="cv-item-title">${item.title}</h4>
                    ${item.date ? `<span class="cv-item-date">${item.date}</span>` : ''}
                </div>
                ${item.subtitle ? `<div class="cv-item-subtitle">${item.subtitle}</div>` : ''}
                ${item.desc ? `<p class="cv-item-desc">${item.desc}</p>` : ''}
            </div>
        `).join('');

        return `
            <div class="cv-section">
                <h3 class="cv-section-head">${section.title}</h3>
                ${itemsHtml}
            </div>
        `;
    }).join('');
};