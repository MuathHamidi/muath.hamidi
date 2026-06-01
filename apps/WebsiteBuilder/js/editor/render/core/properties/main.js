/* Renders the properties sidebar */
Editor.renderProperties = function() {
    const container = document.getElementById('propertiesContent');
    if (!container) return;
    container.innerHTML = '';

    // 1. Empty State
    if (this.selectedBlockIndex === null) {
        container.innerHTML = Editor.PropertiesUI.renderEmpty();
        return;
    }

    const page = Data.state.pages[this.currentPageIndex];
    const block = page.blocks[this.selectedBlockIndex];
    const activeTab = this._activePropTab || 'content';

    // 2. Render Shell
    const headerHTML = Editor.PropertiesUI.renderHeader(block.type, block.id);
    const tabsHTML = Editor.PropertiesUI.renderTabs(activeTab);

    // 3. Render Tab Content
    let contentHTML = '';
    
    if (activeTab === 'content') {
        if (Editor.Templates[block.type]) {
            contentHTML = Editor.Templates[block.type](block, this.selectedBlockIndex);
        } else {
            contentHTML = `<div style="padding:20px; color:orange;">No custom fields for this block.</div>`;
        }
    } else {
        contentHTML = Editor.PropertiesStyles.render(block, this.selectedBlockIndex);
    }

    container.innerHTML = headerHTML + tabsHTML + `<div style="padding:20px;">${contentHTML}</div>`;
};

Editor.switchPropTab = function(tabName) {
    this._activePropTab = tabName;
    this.renderProperties();
};