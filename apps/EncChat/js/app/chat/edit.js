import { app } from '../core.js';
import SecureCrypto from '../../crypto/index.js';
import DB from '../../db.js';

app.startEditMessage = async (msgId) => {
    const msg = DB.messages[DB.currentChannel].find(m => m.id === msgId);
    if (!msg) return;

    let contextId = DB.currentContext.type === 'home' ? DB.currentChannel : DB.currentContext.id;
    const key = await app.getContextKey(DB.currentContext.type, contextId);
    if (!key) return;

    const decryptedText = await SecureCrypto.decryptSymmetric(msg.text.ct, msg.text.iv, key);

    app.editingMsgId = msgId;
    
    const input = document.getElementById('message-input');
    input.value = decryptedText;
    input.focus();
    
    input.style.height = 'auto';
    input.style.height = (input.scrollHeight < 160 ? input.scrollHeight : 160) + 'px';
    
    document.getElementById('edit-indicator').classList.remove('hidden');
    document.getElementById('message-form').classList.replace('rounded-lg', 'rounded-b-lg');
};

app.cancelEdit = () => {
    app.editingMsgId = null;
    const input = document.getElementById('message-input');
    input.value = '';
    input.style.height = 'auto';
    document.getElementById('edit-indicator').classList.add('hidden');
    document.getElementById('message-form').classList.replace('rounded-b-lg', 'rounded-lg');
    app.enableChatInput(); 
};