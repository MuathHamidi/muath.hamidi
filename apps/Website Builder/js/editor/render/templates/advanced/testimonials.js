Editor.Templates.testimonials = function(block, index) {
    const items = block.items || [];
    const html = items.map((item, i) => `
        <div class="cv-card">
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span style="font-weight:bold;">Testimonial ${i+1}</span>
                <span class="material-icons-round" style="cursor:pointer; opacity:0.5;" onclick="Editor.removeTestimonialItem(${index}, ${i})">close</span>
            </div>
            <textarea placeholder="Quote" style="height:60px; margin-bottom:5px;" oninput="Editor.updateTestimonial(${index}, ${i}, 'quote', this.value)">${item.quote}</textarea>
            <div class="grid-2" style="margin-bottom:5px;">
                <input type="text" value="${item.name}" placeholder="Name" oninput="Editor.updateTestimonial(${index}, ${i}, 'name', this.value)">
                <input type="text" value="${item.role}" placeholder="Role" oninput="Editor.updateTestimonial(${index}, ${i}, 'role', this.value)">
            </div>
            <input type="text" value="${item.img}" placeholder="Image URL (Optional)" oninput="Editor.updateTestimonial(${index}, ${i}, 'img', this.value)">
        </div>
    `).join('');
    
    return `
        <div>${html}</div>
        <button class="btn btn-outline btn-sm btn-full" onclick="Editor.addTestimonialItem(${index})">+ Add Testimonial</button>
    `;
};

// Actions
Editor.addTestimonialItem = function(idx) {
    Data.state.pages[this.currentPageIndex].blocks[idx].items.push({ name: 'Name', role: 'Role', quote: 'Quote...', img: '' });
    Data.save(); this.renderProperties(); this.renderCanvas();
};
Editor.updateTestimonial = function(bIdx, iIdx, field, val) {
    Data.state.pages[this.currentPageIndex].blocks[bIdx].items[iIdx][field] = val;
    Data.save(); this.renderCanvas();
};
Editor.removeTestimonialItem = function(bIdx, iIdx) {
    Data.state.pages[this.currentPageIndex].blocks[bIdx].items.splice(iIdx, 1);
    Data.save(); this.renderProperties(); this.renderCanvas();
};