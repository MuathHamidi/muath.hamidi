Editor.Templates.list = function(block, index) {
    const items = block.items || [];
    const itemsHTML = items.map((item, i) => `
        <div style="display:flex; gap:5px; margin-bottom:5px;">
            <span style="padding:5px;">•</span>
            <input type="text" value="${item}" oninput="Editor.updateListItem(${index}, ${i}, this.value)">
            <button class="btn-icon" style="width:30px;height:35px;" onclick="Editor.removeListItem(${index}, ${i})">x</button>
        </div>
    `).join('');
    
    return `
        <div>${itemsHTML}</div>
        <button class="btn btn-outline btn-sm" onclick="Editor.addListItem(${index})" style="margin-top:5px;">+ Add Item</button>
    `;
};