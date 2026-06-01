/* Website Builder/js/main.js */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const app = document.getElementById('app');
        if(app) {
            app.innerHTML = `
                ${HeaderView}
                <main>
                    ${SettingsView}
                    ${EditorView}
                    ${CVView}
                </main>
            `;
        }

        // 1. Load Data
        await Data.init(); 

        // 2. Init UI (Safe Mode)
        UI.init();         

        // 3. Load Editor if Pages exist
        if(typeof Editor !== 'undefined') {
            const workspace = document.getElementById('editorWorkspace');
            const emptyState = document.getElementById('emptyState');
            
            if (Data.state.pages && Data.state.pages.length > 0) {
                // Ensure UI is painted before loading canvas
                requestAnimationFrame(() => {
                    Editor.loadPage(0);
                });
            } else {
                if(workspace) workspace.style.display = 'none';
                if(emptyState) emptyState.style.display = 'flex';
            }
        }
    } catch(e) {
        console.error("Critical App Error:", e);
        alert("Application failed to load settings. Resetting data might fix this.");
    }
});