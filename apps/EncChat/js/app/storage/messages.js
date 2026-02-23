import { app } from '../core.js';
import SecureCrypto from '../../crypto/index.js';
import DB from '../../db.js';

app.saveMessageToFile = async (channelId, msgObj, key) => {
    if (!DB.dirHandle) return;
    try {
        const msgsDir = await DB.dirHandle.getDirectoryHandle('nexus_messages', { create: true });
        const channelDir = await msgsDir.getDirectoryHandle(channelId, { create: true });
        const fileHandle = await channelDir.getFileHandle(msgObj.id + '.enc', { create: true });
        
        const jsonStr = JSON.stringify(msgObj);
        const { ct, iv } = await SecureCrypto.encryptSymmetric(jsonStr, key);
        
        const payload = JSON.stringify({ ct, iv });
        const writable = await fileHandle.createWritable();
        await writable.write(payload);
        await writable.close();
    } catch(e) { console.error("Failed to save message file", e); }
};

app.loadChannelMessages = async (channelId, key, isSilent = false) => {
    if (!DB.dirHandle) return;
    
    // Concurrency Lock: Prevent multiple background intervals from overlapping on the same channel
    if (DB.isSyncingMessages) return; 
    DB.isSyncingMessages = true;

    if (!DB.messages[channelId]) DB.messages[channelId] = [];
    if (!DB.messageFileCache) DB.messageFileCache = {};
    if (!DB.messageFileCache[channelId]) DB.messageFileCache[channelId] = {};
    
    try {
        const msgsDir = await DB.dirHandle.getDirectoryHandle('nexus_messages', { create: true });
        const channelDir = await msgsDir.getDirectoryHandle(channelId, { create: true });
        
        let hasChanges = false;
        const foundFiles = new Set();
        const cache = DB.messageFileCache[channelId];

        for await (const entry of channelDir.values()) {
            if (entry.kind === 'file' && entry.name.endsWith('.enc')) {
                foundFiles.add(entry.name);
                try {
                    const fileHandle = await channelDir.getFileHandle(entry.name);
                    const file = await fileHandle.getFile();
                    
                    // SMART SYNC: Only read and decrypt if the file is new or modified (Edited)
                    if (cache[entry.name] !== file.lastModified) {
                        const text = await file.text();
                        const parsed = JSON.parse(text);
                        const dec = await SecureCrypto.decryptSymmetric(parsed.ct, parsed.iv, key);
                        
                        if (!dec.startsWith("[Decryption Failed")) {
                            const msgObj = JSON.parse(dec);
                            const existingIdx = DB.messages[channelId].findIndex(m => m.id === msgObj.id);
                            
                            if (existingIdx >= 0) {
                                DB.messages[channelId][existingIdx] = msgObj; // Update Edited
                            } else {
                                DB.messages[channelId].push(msgObj); // Push New
                            }
                            hasChanges = true;
                        }
                        // Update cache tracker
                        cache[entry.name] = file.lastModified;
                    }
                } catch(err) { console.warn("Skipped unreadable message file", entry.name); }
            }
        }

        // Detect Deletions
        const currentMessageIds = DB.messages[channelId].map(m => m.id);
        for (const msgId of currentMessageIds) {
            const fileName = msgId + '.enc';
            if (!foundFiles.has(fileName)) {
                DB.messages[channelId] = DB.messages[channelId].filter(m => m.id !== msgId);
                delete cache[fileName];
                hasChanges = true;
            }
        }
        
        if (hasChanges || !isSilent) {
            // Sort chronologically
            DB.messages[channelId].sort((a, b) => a.timestamp - b.timestamp);
            if (isSilent) app.renderMessages(true); // render quietly in background & maintain scroll
        }

    } catch(e) {
        // Directory doesn't exist yet (No messages ever sent)
        DB.messages[channelId] = [];
    } finally {
        DB.isSyncingMessages = false;
    }
};

app.deleteMessageFile = async (channelId, msgId) => {
    if (!DB.dirHandle) return;
    try {
        const msgsDir = await DB.dirHandle.getDirectoryHandle('nexus_messages');
        const channelDir = await msgsDir.getDirectoryHandle(channelId);
        await channelDir.removeEntry(msgId + '.enc');
        
        if (DB.messageFileCache && DB.messageFileCache[channelId]) {
            delete DB.messageFileCache[channelId][msgId + '.enc'];
        }
    } catch(e) {}
};