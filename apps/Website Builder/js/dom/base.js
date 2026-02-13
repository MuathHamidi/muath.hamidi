/* Website Builder/js/dom/base.js */
const UI = {
    currentTab: 'pages', 

    init: function() {
        try {
            // 1. Modal Injection
            if(!document.getElementById('appModal')) {
                const modal = document.createElement('div');
                modal.id = 'appModal';
                modal.className = 'modal-overlay';
                modal.innerHTML = `
                    <div class="modal-box">
                        <div class="modal-title">
                            <span class="material-icons-round" style="color:var(--accent)">info</span>
                            <span>Confirm Action</span>
                        </div>
                        <div class="modal-text" id="modalMsg">Are you sure?</div>
                        <div class="modal-actions">
                            <button class="btn btn-outline" id="modalCancel">Cancel</button>
                            <button class="btn btn-primary" id="modalConfirm">Confirm</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);
            }

            // 2. Settings Population
            const s = Data.state.settings || {};
            const setVal = (id, val) => { const el = document.getElementById(id); if(el) el.value = val || ''; };
            
            setVal('siteTitle', s.title);
            setVal('siteAuthor', s.author);
            setVal('accentColor', s.accent || '#bb86fc');
            setVal('defaultTheme', s.theme || 'dark');
            setVal('profileImg', s.profileImg);
            setVal('footerText', s.footerText);

            // 3. Render Lists (with safety checks)
            if(typeof this.renderPagesList === 'function') this.renderPagesList();
            
            // Fix: Use correct CV init function
            if(typeof this.initCV === 'function') {
                this.initCV();
            } else if(typeof this.renderCVList === 'function') {
                this.renderCVList();
            }
            
            // 4. Apply Theme
            document.documentElement.style.setProperty('--accent', s.accent || '#6c5ce7');
            
            // 5. Force Tab Switch
            this.switchTab('pages');

        } catch (err) {
            console.error("UI Init Error:", err);
            // Fallback to pages so user isn't stuck
            this.switchTab('pages');
        }
    },

    notify: function(msg) {
        const el = document.getElementById('notification');
        if(el) {
            el.innerText = msg;
            el.classList.add('show');
            setTimeout(() => el.classList.remove('show'), 3000);
        }
    },

    confirm: function(msg, onConfirm) {
        const modal = document.getElementById('appModal');
        if(!modal) { if(confirm(msg)) onConfirm(); return; }

        const msgEl = document.getElementById('modalMsg');
        const btnYes = document.getElementById('modalConfirm');
        const btnNo = document.getElementById('modalCancel');
        
        msgEl.innerText = msg;
        modal.classList.add('active');
        
        const newYes = btnYes.cloneNode(true);
        const newNo = btnNo.cloneNode(true);
        btnYes.parentNode.replaceChild(newYes, btnYes);
        btnNo.parentNode.replaceChild(newNo, btnNo);
        
        newYes.onclick = () => { modal.classList.remove('active'); onConfirm(); };
        newNo.onclick = () => { modal.classList.remove('active'); };
    },

    switchTab: function(tabName) {
        // Hide all
        document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));

        // Show Target
        const target = document.getElementById(`tab-${tabName}`);
        if (target) {
            target.style.display = (tabName === 'pages') ? 'flex' : 'block';
        }

        // Active Button
        const activeBtn = document.getElementById(`nav-btn-${tabName}`);
        if(activeBtn) activeBtn.classList.add('active');

        // Header Tools
        const headerTools = document.querySelector('.header-tools-scroll');
        if(headerTools) headerTools.style.display = (tabName === 'pages') ? 'flex' : 'none';

        this.currentTab = tabName;
    }
};