Editor.Templates.contact = function(block, index) {
    const fields = block.fields || [];
    
    const fieldsHTML = fields.map((f, i) => `
        <div class="cv-card" style="padding:10px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:bold; font-size:0.8rem;">Field ${i+1}</span>
                <span class="material-icons-round" style="cursor:pointer; font-size:16px;" onclick="Editor.removeContactField(${index}, ${i})">close</span>
            </div>
            <div class="grid-2" style="margin:5px 0 0 0; gap:5px;">
                <input type="text" value="${f.label}" placeholder="Label" oninput="Editor.updateContactField(${index}, ${i}, 'label', this.value)">
                <select onchange="Editor.updateContactField(${index}, ${i}, 'type', this.value)">
                    <option value="text" ${f.type==='text'?'selected':''}>Text Input</option>
                    <option value="email" ${f.type==='email'?'selected':''}>Email Input</option>
                    <option value="textarea" ${f.type==='textarea'?'selected':''}>Text Area</option>
                </select>
            </div>
        </div>
    `).join('');

    return `
        <div class="form-group">
            <label>Form Title</label>
            <input type="text" value="${block.title}" oninput="Editor.updateBlock(${index}, 'title', this.value)">
        </div>
        <div class="form-group">
            <label>Send to Email</label>
            <input type="text" value="${block.email}" oninput="Editor.updateBlock(${index}, 'email', this.value)">
        </div>
        <div class="form-group">
            <label>Submit Button Text</label>
            <input type="text" value="${block.submitText}" oninput="Editor.updateBlock(${index}, 'submitText', this.value)">
        </div>
        
        <label>Form Fields</label>
        ${fieldsHTML}
        <button class="btn btn-outline btn-sm btn-full" style="margin-top:10px;" onclick="Editor.addContactField(${index})">+ Add Field</button>
    `;
};

// Actions
Editor.addContactField = function(idx) {
    Data.state.pages[this.currentPageIndex].blocks[idx].fields.push({ type: 'text', label: 'New Field', required: false });
    Data.save(); this.renderProperties(); this.renderCanvas();
};
Editor.updateContactField = function(bIdx, fIdx, key, val) {
    Data.state.pages[this.currentPageIndex].blocks[bIdx].fields[fIdx][key] = val;
    Data.save(); this.renderCanvas();
};
Editor.removeContactField = function(bIdx, fIdx) {
    Data.state.pages[this.currentPageIndex].blocks[bIdx].fields.splice(fIdx, 1);
    Data.save(); this.renderProperties(); this.renderCanvas();
};