Editor.Templates.faq = function(block, index) {
    const items = block.items || [];
    const html = items.map((item, i) => `
        <div class="cv-card">
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span style="font-weight:bold;">Q&A ${i+1}</span>
                <span class="material-icons-round" style="cursor:pointer; opacity:0.5;" onclick="Editor.removeFaqItem(${index}, ${i})">close</span>
            </div>
            <input type="text" value="${item.question}" placeholder="Question" style="margin-bottom:5px; font-weight:bold;" oninput="Editor.updateFaq(${index}, ${i}, 'question', this.value)">
            <textarea placeholder="Answer" style="height:60px;" oninput="Editor.updateFaq(${index}, ${i}, 'answer', this.value)">${item.answer}</textarea>
        </div>
    `).join('');
    
    return `
        <div>${html}</div>
        <button class="btn btn-outline btn-sm btn-full" onclick="Editor.addFaqItem(${index})">+ Add Question</button>
    `;
};

// Actions
Editor.addFaqItem = function(idx) {
    Data.state.pages[this.currentPageIndex].blocks[idx].items.push({ question: 'Question?', answer: 'Answer.' });
    Data.save(); this.renderProperties(); this.renderCanvas();
};
Editor.updateFaq = function(bIdx, iIdx, field, val) {
    Data.state.pages[this.currentPageIndex].blocks[bIdx].items[iIdx][field] = val;
    Data.save(); this.renderCanvas();
};
Editor.removeFaqItem = function(bIdx, iIdx) {
    Data.state.pages[this.currentPageIndex].blocks[bIdx].items.splice(iIdx, 1);
    Data.save(); this.renderProperties(); this.renderCanvas();
};