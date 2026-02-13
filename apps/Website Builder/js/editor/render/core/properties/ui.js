/* Website Builder/js/editor/render/core/properties/ui.js */
Editor.PropertiesUI = {
    renderTabs: function(activeTab) {
        return `
        <div class="sidebar-tabs">
            <div class="sidebar-tab ${activeTab === 'content' ? 'active' : ''}" onclick="Editor.switchPropTab('content')">Content</div>
            <div class="sidebar-tab ${activeTab === 'style' ? 'active' : ''}" onclick="Editor.switchPropTab('style')">Design</div>
        </div>
        `;
    },

    renderHeader: function(type, id) {
        return `<div style="padding:15px 20px; border-bottom:1px solid var(--border); background:var(--bg-tertiary); display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:8px;">
                <span class="material-icons-round" style="color:var(--accent); font-size:16px;">edit</span>
                <span style="font-weight:700; font-size:0.85rem; text-transform:uppercase;">${type}</span>
            </div>
            <span style="font-size:0.7rem; color:var(--text-secondary); font-family:monospace;">#${id.substr(-4)}</span>
        </div>`;
    },

    renderEmpty: function() {
        return `<div class="empty-selection">
            <span class="material-icons-round" style="font-size:48px; margin-bottom:10px;">touch_app</span>
            <div style="font-weight:600;">No Block Selected</div>
            <div style="font-size:0.85rem;">Click an element on the canvas to edit.</div>
        </div>`;
    }
};