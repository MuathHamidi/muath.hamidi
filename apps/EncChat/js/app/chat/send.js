import { app } from '../core.js';
import Utils from '../../utils.js';
import SecureCrypto from '../../crypto/index.js';
import DB from '../../db.js';

app.handleSendMessage = async (e) => {
    e.preventDefault();
    const input = document.getElementById('message-input');
    const text = input.value.trim();
    
    if (!text && DB.pendingUploads.length === 0) return;
    if (!DB.currentChannel) return;

    let contextId = DB.currentContext.type === 'home' ? DB.currentChannel : DB.currentContext.id;
    const key = await app.getContextKey(DB.currentContext.type, contextId);
    if (!key) {
        Utils.showToast("Cannot encrypt: Encryption Key missing.", "error");
        return;
    }

    const encryptedText = await SecureCrypto.encryptSymmetric(text, key);
    
    if (app.editingMsgId) {
        const msg = DB.messages[DB.currentChannel].find(m => m.id === app.editingMsgId);
        if (msg) {
            msg.text = encryptedText;
            msg.edited = true;
            await app.saveMessageToFile(DB.currentChannel, msg, key);
        }
        app.cancelEdit();
        app.renderMessages();
        return;
    }

    const uploadsToProcess = [...DB.pendingUploads];
    DB.pendingUploads = [];
    input.value = '';
    input.style.height = 'auto';
    app.renderUploadPreviews();

    const attachments = uploadsToProcess.map(upload => ({
        id: upload.id, 
        name: upload.name, 
        type: upload.type, 
        size: upload.size,
        status: 'uploading', 
        previewUrl: upload.previewUrl, 
        file: upload.file 
    }));

    const msgObj = {
        id: Utils.generateId(),
        senderId: DB.currentUser.id,
        text: encryptedText,
        attachments: attachments,
        timestamp: Date.now(),
        edited: false
    };

    if (!DB.messages[DB.currentChannel]) {
        DB.messages[DB.currentChannel] = [];
    }
    
    DB.messages[DB.currentChannel].push(msgObj);
    app.renderMessages();

    if (attachments.length === 0) {
        await app.saveMessageToFile(DB.currentChannel, msgObj, key);
        return;
    }

    (async () => {
        const targetChannel = DB.currentChannel;

        for (const att of attachments) {
            try {
                await app.saveAttachmentStream(att.id, att.file, key);
                att.status = 'complete';
                if (!DB.activeMediaUrls) DB.activeMediaUrls = {};
                DB.activeMediaUrls[att.id] = att.previewUrl;
                delete att.previewUrl;
                delete att.file; 
            } catch (err) {
                console.error("Failed to encrypt/save attachment", err);
                att.status = 'error'; 
            }
        }

        await app.saveMessageToFile(targetChannel, msgObj, key);

        if (DB.currentChannel === targetChannel) {
            app.renderMessages();
        }
    })();
};