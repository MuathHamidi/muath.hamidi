Editor.Templates.features = function(block, index) {
    const items = block.items || [];
    const html = items.map((item, i) => `
        <div style="background:var(--bg-tertiary); padding:10px; margin-bottom:10px; border-radius:6px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <span style="font-size:0.8rem; font-weight:bold;">Feature ${i+1}</span>
                <span class="material-icons-round" style="font-size:1rem; cursor:pointer;" onclick="Editor.removeFeatureItem(${index}, ${i})">close</span>
            </div>
            <input type="text" value="${item.title}" placeholder="Title" oninput="Editor.updateFeature(${index}, ${i}, 'title', this.value)" style="margin-bottom:5px;">
            <textarea placeholder="Description" oninput="Editor.updateFeature(${index}, ${i}, 'text', this.value)" style="height:60px; margin-bottom:5px;">${item.text}</textarea>
            <input type="text" value="${item.icon}" placeholder="Icon name (e.g. star)" oninput="Editor.updateFeature(${index}, ${i}, 'icon', this.value)">
            <a href="https://fonts.google.com/icons" target="_blank" style="font-size:0.7rem; color:var(--accent);">Find Icons</a>
        </div>
    `).join('');
    
    return `
        <div>${html}</div>
        <button class="btn btn-outline btn-sm" onclick="Editor.addFeatureItem(${index})">+ Add Feature</button>
    `;
};