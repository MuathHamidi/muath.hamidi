/* Website Builder/js/dom/cv/skills.js */

// --- SKILLS ---
UI.renderSkills = function() {
    const container = document.getElementById('cvSkills');
    if(!container) return;
    container.innerHTML = '';
    
    Data.state.cv.skills.forEach((skill, index) => {
        const div = document.createElement('div');
        div.className = 'skill-chip';
        div.innerHTML = `
            <span class="material-icons-round" style="font-size:16px; color:var(--accent); opacity:0.7;">label</span>
            <input type="text" value="${skill}" oninput="UI.updateSkill(${index}, this.value)" placeholder="Skill...">
            <span class="material-icons-round action-icon delete" style="font-size:16px; padding:2px;" onclick="UI.deleteSkill(${index})">close</span>
        `;
        container.appendChild(div);
    });
};

UI.addSkill = function() {
    Data.state.cv.skills.push('');
    this.renderSkills(); 
    setTimeout(() => {
        const inputs = document.querySelectorAll('#cvSkills input');
        if(inputs.length) inputs[inputs.length-1].focus();
    }, 50);
    Data.save();
};

UI.updateSkill = function(index, value) {
    Data.state.cv.skills[index] = value;
    Data.save();
};

UI.deleteSkill = function(index) {
    Data.state.cv.skills.splice(index, 1);
    this.renderSkills(); 
    Data.save();
};

// --- LANGUAGES ---
UI.renderLanguages = function() {
    const container = document.getElementById('cvLanguages');
    if(!container) return;
    container.innerHTML = '';
    
    // Ensure array exists
    if(!Data.state.cv.languages) Data.state.cv.languages = [];

    Data.state.cv.languages.forEach((lang, index) => {
        const div = document.createElement('div');
        div.className = 'skill-chip';
        div.style.borderColor = 'var(--text-secondary)';
        div.innerHTML = `
            <span class="material-icons-round" style="font-size:16px; color:var(--text-secondary); opacity:0.7;">language</span>
            <input type="text" value="${lang}" oninput="UI.updateLanguage(${index}, this.value)" placeholder="Language (e.g. French)">
            <span class="material-icons-round action-icon delete" style="font-size:16px; padding:2px;" onclick="UI.deleteLanguage(${index})">close</span>
        `;
        container.appendChild(div);
    });
};

UI.addLanguage = function() {
    if(!Data.state.cv.languages) Data.state.cv.languages = [];
    Data.state.cv.languages.push('');
    this.renderLanguages();
    setTimeout(() => {
        const inputs = document.querySelectorAll('#cvLanguages input');
        if(inputs.length) inputs[inputs.length-1].focus();
    }, 50);
    Data.save();
};

UI.updateLanguage = function(index, value) {
    Data.state.cv.languages[index] = value;
    Data.save();
};

UI.deleteLanguage = function(index) {
    Data.state.cv.languages.splice(index, 1);
    this.renderLanguages();
    Data.save();
};

// --- CERTIFICATIONS ---
UI.renderCerts = function() {
    const container = document.getElementById('cvCerts');
    if(!container) return;
    container.innerHTML = '';
    
    if(!Data.state.cv.certifications) Data.state.cv.certifications = [];

    Data.state.cv.certifications.forEach((cert, index) => {
        const div = document.createElement('div');
        div.className = 'cv-card';
        div.style.padding = '15px';
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span class="cv-card-title" style="font-size:0.8rem;">
                    <span class="material-icons-round" style="font-size:14px; color:var(--success);">verified</span>
                    Cert ${index+1}
                </span>
                <span class="material-icons-round action-icon delete" onclick="UI.deleteCert(${index})">delete</span>
            </div>
            <div class="grid-2" style="margin:0; gap:10px;">
                <input type="text" value="${cert.name}" placeholder="Certificate Name" oninput="UI.updateCert(${index}, 'name', this.value)">
                <input type="text" value="${cert.issuer}" placeholder="Issuer / Year" oninput="UI.updateCert(${index}, 'issuer', this.value)">
            </div>
        `;
        container.appendChild(div);
    });
};

UI.addCert = function() {
    if(!Data.state.cv.certifications) Data.state.cv.certifications = [];
    Data.state.cv.certifications.push({ name: '', issuer: '' });
    this.renderCerts();
    Data.save();
};

UI.updateCert = function(index, field, value) {
    Data.state.cv.certifications[index][field] = value;
    Data.save();
};

UI.deleteCert = function(index) {
    Data.state.cv.certifications.splice(index, 1);
    this.renderCerts();
    Data.save();
};

// Hook into Init
const originalInitCV = UI.initCV;
UI.initCV = function() {
    if(originalInitCV) originalInitCV.apply(this);
    this.renderLanguages();
    this.renderCerts();
};