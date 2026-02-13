/* Website Builder/js/dom/nav.js */
UI.switchTab = function(tabName) {
    // Hide all view containers
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    
    // Show target view
    const target = document.getElementById(`tab-${tabName}`);
    if (target) {
        // Editor needs flex, others block
        if(tabName === 'pages') {
            target.style.display = 'flex'; 
        } else {
            target.style.display = 'block'; 
        }
    }

    // Update Tab Styles
    document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));
    
    const activeBtn = document.getElementById(`nav-btn-${tabName}`);
    if(activeBtn) {
        activeBtn.classList.add('active');
    }

    // Toggle Header Tools Visibility
    // We only want the block insertion tools visible when editing pages
    const headerTools = document.querySelector('.header-tools-scroll');
    if(headerTools) {
        headerTools.style.display = (tabName === 'pages') ? 'flex' : 'none';
    }

    this.currentTab = tabName;
};