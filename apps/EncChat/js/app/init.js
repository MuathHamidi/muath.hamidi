import { app } from './core.js';
import DB from '../db.js';

app.init = () => {
    lucide.createIcons();
    document.getElementById('message-form').addEventListener('submit', app.handleSendMessage);
    document.getElementById('file-upload').addEventListener('change', app.handleFileUpload);
    
    // Auto-resize textarea
    const msgInput = document.getElementById('message-input');
    msgInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight < 160 ? this.scrollHeight : 160) + 'px';
    });
    
    // Submit on Enter (Shift+Enter for new line), Esc to cancel edit
    msgInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!this.disabled && (this.value.trim().length > 0 || DB.pendingUploads.length > 0)) {
                app.handleSendMessage(e);
            }
        }
        if (e.key === 'Escape' && app.editingMsgId) {
            app.cancelEdit();
        }
    });
};