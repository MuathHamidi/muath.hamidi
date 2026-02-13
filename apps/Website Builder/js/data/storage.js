// IndexedDB Wrapper
const DB_NAME = 'WebBuilderDB';
const STORE_NAME = 'project_store';
const KEY = 'webBuilderPro_v3';

const dbHelper = {
    getDB: function() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, 1);
            request.onupgradeneeded = (e) => {
                e.target.result.createObjectStore(STORE_NAME);
            };
            request.onsuccess = (e) => resolve(e.target.result);
            request.onerror = (e) => reject(e);
        });
    },
    get: function(key) {
        return this.getDB().then(db => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(STORE_NAME, 'readonly');
                const store = transaction.objectStore(STORE_NAME);
                const request = store.get(key);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        });
    },
    set: function(key, val) {
        return this.getDB().then(db => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(STORE_NAME, 'readwrite');
                const store = transaction.objectStore(STORE_NAME);
                const request = store.put(val, key);
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        });
    }
};

// Data Init is now Async
Data.init = async function() {
    try {
        const stored = await dbHelper.get(KEY);
        if (stored) {
            this.state = stored;
            
            // MIGRATION: Ensure new fields exist
            if(!this.state.cv.contact) this.state.cv.contact = {};
            const keys = ['website', 'linkedin', 'github'];
            keys.forEach(k => {
                if(this.state.cv.contact[k] === undefined) this.state.cv.contact[k] = '';
            });

            this.state.pages.forEach(p => {
                if (!p.blocks) p.blocks = [];
                p.blocks.forEach(b => {
                    if(!b.styles) b.styles = { align: 'left', padding: '20', bg: 'transparent', color: 'inherit' };
                });
            });
        }
    } catch(e) {
        console.error("Failed to load from IndexedDB", e);
    }
    this.pushHistory(true);
};

Data.save = async function(skipHistory = false) {
    // 1. Sync Settings UI
    const domTitle = document.getElementById('siteTitle');
    if(domTitle) {
        const s = this.state.settings;
        s.title = domTitle.value;
        s.author = document.getElementById('siteAuthor').value;
        s.accent = document.getElementById('accentColor').value;
        s.theme = document.getElementById('defaultTheme').value;
        s.fontHeading = document.getElementById('fontHeading').value;
        s.fontBody = document.getElementById('fontBody').value;
        s.profileImg = document.getElementById('profileImg').value;
        s.footerText = document.getElementById('footerText').value;
    }

    // 2. Sync CV Basic Info & Contact
    const cvName = document.getElementById('cvName');
    if(cvName) {
        const c = this.state.cv;
        c.name = cvName.value;
        c.title = document.getElementById('cvTitle').value;
        c.summary = document.getElementById('cvSummary').value;
        
        c.contact.email = document.getElementById('cvEmail').value;
        c.contact.phone = document.getElementById('cvPhone').value;
        c.contact.location = document.getElementById('cvLocation').value;
        c.contact.website = document.getElementById('cvWebsite').value;
        c.contact.linkedin = document.getElementById('cvLinkedin').value;
        c.contact.github = document.getElementById('cvGithub').value;
    }

    if(!skipHistory) this.pushHistory();

    const status = document.getElementById('saveStatus');
    if(status) status.innerText = 'Saving...';

    try {
        // Save to IndexedDB
        await dbHelper.set(KEY, this.state);
        
        if(status) {
            status.innerText = 'Synced';
            status.style.color = 'var(--text-secondary)';
        }
    } catch (e) {
        console.error("Save Error", e);
        if(status) {
            status.innerText = 'Error Saving';
            status.style.color = 'red';
        }
    }
};

Data.loadState = function(newState, skipSave = false) {
    this.state = newState;
    if(!skipSave) this.save();
};

Data.reset = function() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.save();
};