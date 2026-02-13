/* Website Builder/js/dom/pages.js */

UI.renderPagesList = function() {
    const container = document.getElementById('pagesList');
    if(!container) return;
    
    container.innerHTML = '';
    
    Data.state.pages.forEach((page, index) => {
        const div = document.createElement('div');
        const isActive = (typeof Editor !== 'undefined' && Editor.currentPageIndex === index);
        
        div.className = `page-item ${isActive ? 'active' : ''}`;
        
        // Drag Attributes
        div.setAttribute('draggable', 'true');
        div.setAttribute('data-index', index);
        
        // Event Listeners for Drag & Drop
        div.addEventListener('dragstart', (e) => UI.handlePageDragStart(e, index));
        div.addEventListener('dragover', (e) => UI.handlePageDragOver(e));
        div.addEventListener('drop', (e) => UI.handlePageDrop(e, index));
        div.addEventListener('dragend', (e) => UI.handlePageDragEnd(e));

        // Click to Load
        div.onclick = () => Editor.loadPage(index);
        
        div.innerHTML = `
            <div style="display:flex; align-items:center; gap:8px; overflow:hidden;">
                <span class="material-icons-round" style="font-size:16px; opacity:0.3; cursor:grab;">drag_indicator</span>
                <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${page.title}</span>
            </div>
            ${index !== 0 ? `<span class="material-icons-round" style="font-size:1rem; opacity:0.5; padding:4px;" onclick="event.stopPropagation(); UI.deletePage(${index})">close</span>` : ''}
        `;
        container.appendChild(div);
    });
};

/* --- Drag & Drop Handlers --- */
let draggedPageIndex = null;

UI.handlePageDragStart = function(e, index) {
    draggedPageIndex = index;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
};

UI.handlePageDragOver = function(e) {
    e.preventDefault(); // Necessary to allow drop
    const item = e.target.closest('.page-item');
    if(item) {
        item.style.borderTop = "2px solid var(--accent)";
        item.style.borderBottom = "none";
    }
};

UI.handlePageDrop = function(e, targetIndex) {
    e.preventDefault();
    e.stopPropagation();

    if(draggedPageIndex === null || draggedPageIndex === targetIndex) return;

    // Reorder Array
    const pages = Data.state.pages;
    const movedPage = pages.splice(draggedPageIndex, 1)[0];
    pages.splice(targetIndex, 0, movedPage);

    // Update Editor Index if needed
    if(Editor.currentPageIndex === draggedPageIndex) {
        Editor.currentPageIndex = targetIndex;
    } else if (
        Editor.currentPageIndex > draggedPageIndex && Editor.currentPageIndex <= targetIndex
    ) {
        Editor.currentPageIndex--;
    } else if (
        Editor.currentPageIndex < draggedPageIndex && Editor.currentPageIndex >= targetIndex
    ) {
        Editor.currentPageIndex++;
    }

    Data.save();
    this.renderPagesList();
};

UI.handlePageDragEnd = function(e) {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.page-item').forEach(el => {
        el.style.borderTop = "1px solid transparent";
        el.style.borderBottom = "1px solid transparent";
    });
    draggedPageIndex = null;
};

/* --- Existing Actions --- */

UI.addPage = function() {
    const title = prompt("Page Title:");
    if(!title) return;
    Data.state.pages.push({ id: Date.now(), title: title, blocks: [] });
    Data.save();
    this.renderPagesList();
    Editor.loadPage(Data.state.pages.length - 1);
};

UI.deletePage = function(index) {
    UI.confirm('Delete this page? All content inside it will be lost.', () => {
        Data.state.pages.splice(index, 1);
        Data.save();
        
        // Handle view reset if deleting current page
        if(Editor.currentPageIndex === index) {
            Editor.currentPageIndex = null;
            document.getElementById('editorWorkspace').style.display = 'none';
            document.getElementById('emptyState').style.display = 'flex';
        } else if (Editor.currentPageIndex > index) {
            Editor.currentPageIndex--;
        }

        this.renderPagesList();
        UI.notify('Page Deleted');
    });
};