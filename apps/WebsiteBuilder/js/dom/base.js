/* Website Builder/js/dom/base.js */
const UI = {
    currentTab: 'pages', 

    init: function() {
        try {
            // 1. Confirm Modal Injection
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

            // 2. Input Modal Injection (New Page / Rename)
            if(!document.getElementById('appInputModal')) {
                const inputModal = document.createElement('div');
                inputModal.id = 'appInputModal';
                inputModal.className = 'modal-overlay';
                inputModal.innerHTML = `
                    <div class="modal-box">
                        <div class="modal-title">
                            <span class="material-icons-round" style="color:var(--accent)">edit</span>
                            <span id="inputModalTitle">Enter Value</span>
                        </div>
                        <div class="form-group" style="margin:0">
                            <input type="text" id="inputModalValue" class="form-control" placeholder="Type here..." style="width:100%">
                        </div>
                        <div class="modal-actions">
                            <button class="btn btn-outline" id="inputModalCancel">Cancel</button>
                            <button class="btn btn-primary" id="inputModalConfirm">Save</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(inputModal);
            }

            // 3. Settings Population
            const s = Data.state.settings || {};
            const setVal = (id, val) => { const el = document.getElementById(id); if(el) el.value = val || ''; };
            
            setVal('siteTitle', s.title);
            setVal('siteAuthor', s.author);
            setVal('accentColor', s.accent || '#bb86fc');
            setVal('defaultTheme', s.theme || 'dark');
            setVal('profileImg', s.profileImg);
            setVal('footerText', s.footerText);

            // 4. Render Lists (with safety checks)
            if(typeof this.renderPagesList === 'function') this.renderPagesList();
            
            if(typeof this.initCV === 'function') {
                this.initCV();
            } else if(typeof this.renderCVList === 'function') {
                this.renderCVList();
            }
            
            // 5. Apply Theme
            document.documentElement.style.setProperty('--accent', s.accent || '#6c5ce7');
            
            // 6. Force Tab Switch
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

    prompt: function(title, defaultValue, onConfirm) {
        const modal = document.getElementById('appInputModal');
        const titleEl = document.getElementById('inputModalTitle');
        const inputEl = document.getElementById('inputModalValue');
        const btnConfirm = document.getElementById('inputModalConfirm');
        const btnCancel = document.getElementById('inputModalCancel');

        if(!modal) {
            const val = prompt(title, defaultValue);
            if(val) onConfirm(val);
            return;
        }

        titleEl.innerText = title;
        inputEl.value = defaultValue || '';
        
        const newConfirm = btnConfirm.cloneNode(true);
        const newCancel = btnCancel.cloneNode(true);
        btnConfirm.parentNode.replaceChild(newConfirm, btnConfirm);
        btnCancel.parentNode.replaceChild(newCancel, btnCancel);

        const close = () => {
            modal.classList.remove('active');
            inputEl.value = '';
        };

        newConfirm.onclick = () => {
            if(inputEl.value.trim().length > 0) {
                onConfirm(inputEl.value.trim());
                close();
            } else {
                inputEl.focus();
            }
        };
        
        newCancel.onclick = close;

        // Enter key support
        inputEl.onkeydown = (e) => {
            if(e.key === 'Enter') newConfirm.click();
            if(e.key === 'Escape') close();
        };

        modal.classList.add('active');
        setTimeout(() => inputEl.focus(), 100);
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