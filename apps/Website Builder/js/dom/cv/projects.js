/* Website Builder/js/dom/cv/projects.js */
UI.renderProjects = function() {
    const container = document.getElementById('cvProjects');
    if(!container) return;
    container.innerHTML = '';
    
    if(!Data.state.cv.projects) Data.state.cv.projects = [];

    Data.state.cv.projects.forEach((proj, index) => {
        const div = document.createElement('div');
        div.className = 'cv-card';
        div.innerHTML = `
            <div class="cv-card-header">
                <span class="cv-card-title">
                    <span class="material-icons-round" style="font-size:16px; color:var(--accent);">rocket_launch</span>
                    Project ${index+1}
                </span>
                <span class="material-icons-round action-icon delete" title="Remove" onclick="UI.deleteProject(${index})">delete</span>
            </div>

            <div class="grid-2" style="margin-bottom:15px; gap:15px;">
                <div class="form-group" style="margin:0">
                    <label>Project Name</label>
                    <input type="text" value="${proj.name}" placeholder="My Awesome App" oninput="UI.updateProject(${index}, 'name', this.value)">
                </div>
                <div class="form-group" style="margin:0">
                    <label>Link / URL</label>
                    <input type="text" value="${proj.link}" placeholder="https://..." oninput="UI.updateProject(${index}, 'link', this.value)">
                </div>
            </div>
            <div class="form-group" style="margin:0">
                <label>Description</label>
                <textarea style="height:80px" placeholder="Briefly describe what you built..." oninput="UI.updateProject(${index}, 'desc', this.value)">${proj.desc}</textarea>
            </div>
        `;
        container.appendChild(div);
    });
};

UI.addProject = function() {
    if(!Data.state.cv.projects) Data.state.cv.projects = [];
    Data.state.cv.projects.push({ name: '', link: '', desc: '' });
    this.renderProjects(); 
    Data.save();
};

UI.updateProject = function(index, field, value) {
    Data.state.cv.projects[index][field] = value;
    Data.save();
};

UI.deleteProject = function(index) {
    if(confirm('Remove this project?')) {
        Data.state.cv.projects.splice(index, 1);
        this.renderProjects(); 
        Data.save();
    }
};