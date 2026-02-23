import Utils from './utils.js';
import SecureCrypto from './crypto.js';
import DB from './db.js';
import app from './app/index.js';
import { loadHTMLComponents } from './loader.js';

// Expose modules to the window object.
// This allows the HTML's inline event handlers (e.g., onclick="app.showSettingsModal()") to keep functioning.
window.Utils = Utils;
window.SecureCrypto = SecureCrypto;
window.DB = DB;
window.app = app;

// Initialize the app seamlessly by fetching HTML components first, then attaching functionality
const bootstrap = async () => {
    await loadHTMLComponents();
    app.init();
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    bootstrap();
} else {
    window.addEventListener('DOMContentLoaded', bootstrap);
}