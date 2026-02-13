Editor.Templates.heading = function(block, index) {
    return `
        <div class="form-group">
            <label>Level</label>
            <div class="segmented-control">
                <button class="segmented-btn ${block.level==='h1'?'active':''}" onclick="Editor.updateBlock(${index}, 'level', 'h1')">H1</button>
                <button class="segmented-btn ${block.level==='h2'?'active':''}" onclick="Editor.updateBlock(${index}, 'level', 'h2')">H2</button>
                <button class="segmented-btn ${block.level==='h3'?'active':''}" onclick="Editor.updateBlock(${index}, 'level', 'h3')">H3</button>
            </div>
        </div>
        <div class="form-group">
            <label>Text</label>
            <input type="text" value="${block.value}" oninput="Editor.updateBlock(${index}, 'value', this.value)">
        </div>`;
};

Editor.Templates.text = function(block, index) {
    return `<div class="form-group">
        <label>Content</label>
        <textarea style="height:200px" oninput="Editor.updateBlock(${index}, 'value', this.value)">${block.value}</textarea>
    </div>`;
};

Editor.Templates.table = function(block, index) {
    // Actions for resizing table
    const resizeTable = () => {
        const r = parseInt(document.getElementById(`t-rows-${index}`).value);
        const c = parseInt(document.getElementById(`t-cols-${index}`).value);
        
        let newData = [];
        // Preserve existing data if possible
        for(let i=0; i<r; i++) {
            let row = [];
            for(let j=0; j<c; j++) {
                if(block.data && block.data[i] && block.data[i][j]) {
                    row.push(block.data[i][j]);
                } else {
                    row.push(i===0 ? `Header ${j+1}` : `Cell ${i+1}-${j+1}`);
                }
            }
            newData.push(row);
        }
        
        block.rows = r;
        block.cols = c;
        block.data = newData;
        Data.save();
        Editor.renderCanvas();
    };
    
    // Allow global access to resize (dirty hack for inline onclick, better to use Editor.resizeTable if moved to actions)
    window[`resizeTable_${index}`] = resizeTable;

    return `
        <div class="grid-2" style="margin-bottom:15px;">
            <div class="form-group" style="margin:0;">
                <label>Rows</label>
                <input type="number" id="t-rows-${index}" value="${block.rows || 3}" min="1" max="20">
            </div>
            <div class="form-group" style="margin:0;">
                <label>Columns</label>
                <input type="number" id="t-cols-${index}" value="${block.cols || 3}" min="1" max="10">
            </div>
        </div>
        <button class="btn btn-primary btn-full" onclick="window['resizeTable_${index}']()">Update Dimensions</button>
        <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:10px;">
            Edit the table content directly in the canvas editor.
        </div>
    `;
};

Editor.Templates.quote = function(block, index) {
    return `
        <div class="form-group">
            <label>Quote</label>
            <textarea oninput="Editor.updateBlock(${index}, 'text', this.value)">${block.text || ''}</textarea>
        </div>
        <div class="form-group">
            <label>Author</label>
            <input type="text" value="${block.author || ''}" oninput="Editor.updateBlock(${index}, 'author', this.value)">
        </div>`;
};

Editor.Templates.code = function(block, index) {
    return `
        <div class="form-group">
            <label>Language</label>
            <select onchange="Editor.updateBlock(${index}, 'lang', this.value)">
                <option value="javascript" ${block.lang==='javascript'?'selected':''}>JavaScript</option>
                <option value="html" ${block.lang==='html'?'selected':''}>HTML</option>
                <option value="css" ${block.lang==='css'?'selected':''}>CSS</option>
                <option value="python" ${block.lang==='python'?'selected':''}>Python</option>
            </select>
        </div>
        <div class="form-group">
            <label>Code Snippet</label>
            <textarea style="font-family:monospace; height:150px; background:#111; color:#0f0;" oninput="Editor.updateBlock(${index}, 'code', this.value)">${block.code || ''}</textarea>
        </div>`;
};