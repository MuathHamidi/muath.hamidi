UI.renderExperience = function() {
    const container = document.getElementById('cvEntries');
    if(!container) return;
    container.innerHTML = '';
    
    Data.state.cv.entries.forEach((entry, index) => {
        const div = document.createElement('div');
        div.className = 'cv-card';
        div.innerHTML = `
            <div class="cv-card-header">
                <span class="cv-card-title">
                    <span class="material-icons-round" style="font-size:16px; color:var(--accent);">work</span>
                    Position ${index+1}
                </span>
                <span class="material-icons-round action-icon delete" title="Remove" onclick="UI.deleteCVEntry(${index})">delete</span>
            </div>
            
            <div class="grid-2" style="margin-bottom:15px; gap:15px;">
                <div class="form-group" style="margin:0">
                    <label>Role / Job Title</label>
                    <input type="text" value="${entry.role}" placeholder="e.g. Senior Developer" oninput="UI.updateCVEntry(${index}, 'role', this.value)">
                </div>
                <div class="form-group" style="margin:0">
                    <label>Company / Organization</label>
                    <input type="text" value="${entry.org}" placeholder="e.g. Tech Corp" oninput="UI.updateCVEntry(${index}, 'org', this.value)">
                </div>
            </div>
            <div class="form-group" style="margin:0">
                <label>Date Range</label>
                <input type="text" value="${entry.date}" placeholder="e.g. Jan 2020 - Present" oninput="UI.updateCVEntry(${index}, 'date', this.value)">
            </div>
        `;
        container.appendChild(div);
    });
};

UI.addCVEntry = function() {
    Data.state.cv.entries.push({ role: '', org: '', date: '' });
    this.renderExperience(); 
    Data.save();
};

UI.updateCVEntry = function(index, field, value) {
    Data.state.cv.entries[index][field] = value;
    Data.save();
};

UI.deleteCVEntry = function(index) {
    if(confirm('Remove this experience entry?')) {
        Data.state.cv.entries.splice(index, 1);
        this.renderExperience(); 
        Data.save();
    }
};