/* Website Builder/js/partials/header.js */
const HeaderView = `
    <header class="app-header">
        <!-- Left: Brand -->
        <div class="brand">
            <span class="material-icons-round">layers</span>
            <span>WebBuilder Pro</span>
        </div>
        
        <!-- Center: Navigation -->
        <nav class="main-nav">
            <button class="nav-tab active" onclick="UI.switchTab('pages')" id="nav-btn-pages">
                Pages
            </button>
            <button class="nav-tab" onclick="UI.switchTab('cv')" id="nav-btn-cv">
                CV / Resume
            </button>
            <button class="nav-tab" onclick="UI.switchTab('settings')" id="nav-btn-settings">
                Settings
            </button>
        </nav>
        
        <!-- Right: Actions -->
        <div class="header-actions">
            <!-- Undo/Redo -->
            <button class="btn-icon" id="btnUndo" onclick="Data.undo()" title="Undo" style="opacity:0.3">
                <span class="material-icons-round">undo</span>
            </button>
            <button class="btn-icon" id="btnRedo" onclick="Data.redo()" title="Redo" style="opacity:0.3">
                <span class="material-icons-round">redo</span>
            </button>

            <div class="separator"></div>

            <button class="btn btn-sm btn-primary" onclick="Editor.openPreview('desktop')">
                <span class="material-icons-round" style="font-size:16px">visibility</span> Preview
            </button>

            <div class="separator"></div>

            <button class="btn-icon" onclick="UI.toggleAppTheme()" title="Toggle Theme">
                <span class="material-icons-round">dark_mode</span>
            </button>

            <div class="separator"></div>

            <!-- Import / Export -->
            <input type="file" id="importInput" accept=".html" style="display:none" onchange="Generator.importWebsite(this)">
            
            <button class="btn btn-sm btn-outline" onclick="document.getElementById('importInput').click()" title="Import Project">
                <span class="material-icons-round" style="font-size:16px">upload_file</span> Import
            </button>

            <button class="btn btn-sm btn-outline" onclick="Generator.exportWebsite()" title="Export HTML">
                <span class="material-icons-round" style="font-size:16px">download</span> Export
            </button>
            
            <button class="btn-icon" onclick="UI.createNewWebsite()" title="Reset Project" style="margin-left:5px;">
                <span class="material-icons-round">restart_alt</span>
            </button>
            
            <div id="saveStatus" style="position:fixed; bottom:10px; left:20px; font-size:0.7rem; color:var(--text-secondary); opacity:0.5;">Synced</div>
        </div>
    </header>
`;