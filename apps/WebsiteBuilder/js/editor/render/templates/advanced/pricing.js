Editor.Templates.pricing = function(block, index) {
    const items = block.items || [];
    const html = items.map((item, i) => `
        <div class="cv-card">
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span style="font-weight:bold;">Plan ${i+1} ${item.highlight ? '★' : ''}</span>
                <span class="material-icons-round" style="cursor:pointer; opacity:0.5;" onclick="Editor.removePricingItem(${index}, ${i})">close</span>
            </div>
            <div class="grid-2" style="margin-bottom:5px;">
                <input type="text" value="${item.plan}" placeholder="Plan Name" oninput="Editor.updatePricing(${index}, ${i}, 'plan', this.value)">
                <input type="text" value="${item.price}" placeholder="Price" oninput="Editor.updatePricing(${index}, ${i}, 'price', this.value)">
            </div>
            <textarea placeholder="Features (one per line)" style="height:60px; margin-bottom:5px;" oninput="Editor.updatePricing(${index}, ${i}, 'features', this.value)">${item.features}</textarea>
            <label style="display:flex; align-items:center; gap:10px; cursor:pointer; font-weight:normal; text-transform:none;">
                <input type="checkbox" style="width:auto;" ${item.highlight ? 'checked' : ''} onchange="Editor.updatePricing(${index}, ${i}, 'highlight', this.checked)"> Highlight as Popular
            </label>
        </div>
    `).join('');
    
    return `
        <div>${html}</div>
        <button class="btn btn-outline btn-sm btn-full" onclick="Editor.addPricingItem(${index})">+ Add Plan</button>
    `;
};

// Actions
Editor.addPricingItem = function(idx) {
    Data.state.pages[this.currentPageIndex].blocks[idx].items.push({ plan: 'New Plan', price: '$0', features: '', highlight: false });
    Data.save(); this.renderProperties(); this.renderCanvas();
};
Editor.updatePricing = function(bIdx, iIdx, field, val) {
    Data.state.pages[this.currentPageIndex].blocks[bIdx].items[iIdx][field] = val;
    Data.save(); this.renderCanvas();
};
Editor.removePricingItem = function(bIdx, iIdx) {
    Data.state.pages[this.currentPageIndex].blocks[bIdx].items.splice(iIdx, 1);
    Data.save(); this.renderProperties(); this.renderCanvas();
};