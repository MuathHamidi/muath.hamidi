UI.renderEducation = function() {
    const container = document.getElementById('cvEducation');
    if(!container) return;
    container.innerHTML = '';
    
    Data.state.cv.education.forEach((entry, index) => {
        const div = document.createElement('div');
        div.className = 'cv-card';
        div.innerHTML = `
            <div class="cv-card-header">
                <span class="cv-card-title">
                    <span class="material-icons-round" style="font-size:16px; color:var(--accent);">school</span>
                    Education ${index+1}
                </span>
                <span class="material-icons-round action-icon delete" title="Remove" onclick="UI.deleteEducation(${index})">delete</span>
            </div>
            
            <div class="form-group">
                <label>Degree / Certificate</label>
                <input type="text" value="${entry.degree}" placeholder="e.g. BSc Computer Science" oninput="UI.updateEducation(${index}, 'degree', this.value)">
            </div>
            <div class="grid-2" style="margin:0; gap:15px;">
                <div class="form-group" style="margin:0">
                    <label>School / University</label>
                    <input type="text" value="${entry.school}" placeholder="University Name" oninput="UI.updateEducation(${index}, 'school', this.value)">
                </div>
                <div class="form-group" style="margin:0">
                    <label>Year of Graduation</label>
                    <input type="text" value="${entry.year}" placeholder="e.g. 2022" oninput="UI.updateEducation(${index}, 'year', this.value)">
                </div>
            </div>
        `;
        container.appendChild(div);
    });
};

UI.addEducation = function() {
    Data.state.cv.education.push({ degree: '', school: '', year: '' });
    this.renderEducation(); 
    Data.save();
};

UI.updateEducation = function(index, field, value) {
    Data.state.cv.education[index][field] = value;
    Data.save();
};

UI.deleteEducation = function(index) {
    if(confirm('Remove this education entry?')) {
        Data.state.cv.education.splice(index, 1);
        this.renderEducation(); 
        Data.save();
    }
};