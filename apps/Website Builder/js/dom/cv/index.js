/* Website Builder/js/dom/cv/index.js */
UI.initCV = function() {
    const c = Data.state.cv;
    if(!c) return;

    // Default Settings (Single Layout Enforced)
    if(!c.settings) c.settings = { skillStyle: 'tags', showPhoto: true, accentColor: '#3b82f6' };
    
    const safeVal = (v) => v || '';

    // 1. Core Fields
    if(document.getElementById('cvName')) {
        document.getElementById('cvName').value = safeVal(c.name);
        document.getElementById('cvTitle').value = safeVal(c.title);
        document.getElementById('cvSummary').value = safeVal(c.summary);
    }
    
    // 2. Photo Preview (From CV specific data)
    this.updatePhotoPreview();

    // 3. Contact Fields
    if(c.contact && document.getElementById('cvEmail')) {
        document.getElementById('cvEmail').value = safeVal(c.contact.email);
        document.getElementById('cvPhone').value = safeVal(c.contact.phone);
        document.getElementById('cvLocation').value = safeVal(c.contact.location);
        document.getElementById('cvWebsite').value = safeVal(c.contact.website);
        document.getElementById('cvLinkedin').value = safeVal(c.contact.linkedin);
        document.getElementById('cvGithub').value = safeVal(c.contact.github);
    }

    // 4. Settings UI
    if(document.getElementById('cvSkillStyle')) {
        document.getElementById('cvSkillStyle').value = c.settings.skillStyle || 'tags';
        document.getElementById('cvShowPhoto').checked = c.settings.showPhoto;
        document.getElementById('cvAccent').value = c.settings.accentColor || '#3b82f6';
    }

    // 5. Render Lists
    this.renderExperience();
    this.renderEducation();
    if(this.renderSkills) this.renderSkills();
    if(this.renderProjects) this.renderProjects();
    if(this.renderLanguages) this.renderLanguages();
    if(this.renderCerts) this.renderCerts();
};

UI.updateCVSettings = function(key, value) {
    if(!Data.state.cv.settings) Data.state.cv.settings = {};
    Data.state.cv.settings[key] = value;
    Data.save();
};

// --- PHOTO UPLOAD LOGIC (CV SPECIFIC) ---
UI.handlePhotoUpload = function(input) {
    if(input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            // Save specifically to CV object
            Data.state.cv.photo = e.target.result;
            Data.save();
            UI.updatePhotoPreview();
        };
        reader.readAsDataURL(file);
    }
};

UI.updatePhotoPreview = function() {
    // Read from CV object
    const imgStr = Data.state.cv.photo;
    const previewEl = document.getElementById('cvPhotoPreview');
    if(previewEl) {
        previewEl.src = imgStr || 'https://via.placeholder.com/150?text=Photo';
    }
};

// ... (Keep existing AutoSort logic here) ...
UI.autoSortCV = function() {
    const parseDate = (dateStr) => {
        if (!dateStr) return -Infinity;
        const lower = dateStr.toLowerCase();
        if (lower.includes('present') || lower.includes('current') || lower.includes('now')) return Infinity; 
        const parts = lower.split(/[-–to]+/); 
        const targetDate = parts[parts.length - 1].trim(); 
        const dateObj = new Date(targetDate);
        if (!isNaN(dateObj.getTime())) return dateObj.getTime();
        const yearMatch = targetDate.match(/20\d{2}|19\d{2}/);
        if (yearMatch) return parseInt(yearMatch[0]);
        return 0; 
    };

    Data.state.cv.entries.sort((a, b) => parseDate(b.date) - parseDate(a.date));
    this.renderExperience();
    Data.state.cv.education.sort((a, b) => parseDate(b.year) - parseDate(a.year));
    this.renderEducation();
    Data.save();
    UI.notify('Entries Sorted by Date');
};

UI.printCV = function() {
    const d = Data.state;
    if(!d.cv.name) {
        UI.notify("Please enter your name first.");
        return;
    }
    const cvHTML = Generator.buildCV(d);
    const s = d.settings;
    const baseCSS = Generator.getTemplateCSS(s);
    
    const win = window.open('', '_blank');
    win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${d.cv.name} - Resume</title>
            <link href="https://fonts.googleapis.com/css2?family=${s.fontHeading.replace(' ', '+')}:wght@400;700;800&family=${s.fontBody.replace(' ', '+')}:wght@300;400;600&display=swap" rel="stylesheet">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
            ${baseCSS}
            <style>
                body { background: white !important; color: #111 !important; margin: 0; }
                .page-section { display: block !important; animation: none !important; opacity: 1 !important; transform: none !important; min-height: auto; }
                .container { max-width: 100% !important; width: 100% !important; padding: 0 !important; margin: 0 !important; box-shadow: none !important; }
                .print-btn { display: none !important; }
                @media print { @page { margin: 0; } }
            </style>
        </head>
        <body>${cvHTML}</body>
        </html>
    `);
    win.document.close();
};