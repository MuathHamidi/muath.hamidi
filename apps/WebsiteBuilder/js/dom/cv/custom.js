/* Website Builder/js/dom/cv/custom.js */

UI.renderCustomSections = function() {
    const container = document.getElementById('cvCustomContainer');
    if(!container) return;
    container.innerHTML = '';

    if(!Data.state.cv.custom) Data.state.cv.custom = [];

    Data.state.cv.custom.forEach((section, sIdx) => {
        // Create the Section Wrapper
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'cv-custom-section';
        sectionDiv.style.marginBottom = '20px';
        sectionDiv.style.border = '1px solid var(--border)';
        sectionDiv.style.borderRadius = '8px';
        sectionDiv.style.background = 'var(--bg-secondary)';
        sectionDiv.style.overflow = 'hidden';

        // Section Header
        const headerHtml = `
            <div style="padding:15px; background:var(--bg-tertiary); display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border);">
                <div style="display:flex; align-items:center; gap:10px; flex:1;">
                    <span class="material-icons-round" style="color:var(--accent)">extension</span>
                    <input type="text" value="${section.title}" placeholder="Section Title (e.g. Awards)" 
                        oninput="UI.updateCustomSectionTitle(${sIdx}, this.value)"
                        style="background:transparent; border:none; font-weight:bold; font-size:0.9rem; color:var(--text-primary); width:100%;">
                </div>
                <button class="btn-icon" onclick="UI.removeCustomSection(${sIdx})" title="Delete Section" style="color:#ef4444;">
                    <span class="material-icons-round">delete_forever</span>
                </button>
            </div>
        `;

        // Section Items
        let itemsHtml = '<div style="padding:15px;">';
        section.items.forEach((item, iIdx) => {
            itemsHtml += `
                <div class="cv-card" style="margin-bottom:10px;">
                    <div class="cv-card-header" style="margin-bottom:8px;">
                        <span class="cv-card-title">Item ${iIdx + 1}</span>
                        <span class="material-icons-round action-icon delete" onclick="UI.removeCustomItem(${sIdx}, ${iIdx})">close</span>
                    </div>
                    <div class="grid-2" style="margin-bottom:8px; gap:10px;">
                        <input type="text" value="${item.title}" placeholder="Title (e.g. Best Design)" oninput="UI.updateCustomItem(${sIdx}, ${iIdx}, 'title', this.value)">
                        <input type="text" value="${item.date}" placeholder="Date / Year" oninput="UI.updateCustomItem(${sIdx}, ${iIdx}, 'date', this.value)">
                    </div>
                    <input type="text" value="${item.subtitle}" placeholder="Subtitle / Organization" oninput="UI.updateCustomItem(${sIdx}, ${iIdx}, 'subtitle', this.value)" style="margin-bottom:8px;">
                    <textarea placeholder="Description (Optional)" style="height:60px;" oninput="UI.updateCustomItem(${sIdx}, ${iIdx}, 'desc', this.value)">${item.desc}</textarea>
                </div>
            `;
        });
        
        itemsHtml += `
            <button class="btn btn-outline btn-sm btn-full" onclick="UI.addCustomItem(${sIdx})">
                + Add Item to ${section.title || 'Section'}
            </button>
        </div>`;

        sectionDiv.innerHTML = headerHtml + itemsHtml;
        container.appendChild(sectionDiv);
    });
};

// --- Actions ---

UI.addCustomSection = function() {
    if(!Data.state.cv.custom) Data.state.cv.custom = [];
    Data.state.cv.custom.push({
        title: 'New Section',
        items: []
    });
    this.renderCustomSections();
    Data.save();
};

UI.removeCustomSection = function(index) {
    if(confirm('Delete this entire section?')) {
        Data.state.cv.custom.splice(index, 1);
        this.renderCustomSections();
        Data.save();
    }
};

UI.updateCustomSectionTitle = function(index, val) {
    Data.state.cv.custom[index].title = val;
    Data.save();
};

UI.addCustomItem = function(sectionIndex) {
    Data.state.cv.custom[sectionIndex].items.push({ title: '', subtitle: '', date: '', desc: '' });
    this.renderCustomSections();
    Data.save();
};

UI.updateCustomItem = function(sIdx, iIdx, field, val) {
    Data.state.cv.custom[sIdx].items[iIdx][field] = val;
    Data.save();
};

UI.removeCustomItem = function(sIdx, iIdx) {
    Data.state.cv.custom[sIdx].items.splice(iIdx, 1);
    this.renderCustomSections();
    Data.save();
};

// Hook into Init
const _prevInit = UI.initCV;
UI.initCV = function() {
    if(_prevInit) _prevInit.apply(this);
    this.renderCustomSections();
};