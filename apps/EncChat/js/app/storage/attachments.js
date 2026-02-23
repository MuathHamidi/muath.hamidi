import { app } from '../core.js';
import DB from '../../db.js';
import SecureCrypto from '../../crypto/index.js';
import Utils from '../../utils.js';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB limit for inline operations

app.saveAttachmentStream = async (id, file, key) => {
    if (!DB.dirHandle) return;
    try {
        const attachDir = await DB.dirHandle.getDirectoryHandle('nexus_attachments', { create: true });
        const fileHandle = await attachDir.getFileHandle(id + '.enc', { create: true });
        const writable = await fileHandle.createWritable();
        
        if (file.size === 0) {
            const { ctBuffer, ivBuffer } = await SecureCrypto.encryptFile(new ArrayBuffer(0), key);
            const combined = new Uint8Array(12 + ctBuffer.byteLength);
            combined.set(new Uint8Array(ivBuffer), 0);
            combined.set(new Uint8Array(ctBuffer), 12);
            await writable.write(combined);
        } else {
            let offset = 0;
            while (offset < file.size) {
                const slice = file.slice(offset, offset + CHUNK_SIZE);
                const arrayBuffer = await slice.arrayBuffer();
                const { ctBuffer, ivBuffer } = await SecureCrypto.encryptFile(arrayBuffer, key);
                
                const combined = new Uint8Array(12 + ctBuffer.byteLength);
                combined.set(new Uint8Array(ivBuffer), 0);
                combined.set(new Uint8Array(ctBuffer), 12);
                
                await writable.write(combined);
                offset += CHUNK_SIZE;
            }
        }
        await writable.close();
    } catch(e) {
        console.error("Failed to stream attachment to disk", e);
        throw e;
    }
};

app.loadAttachmentDecryptedBlob = async (id, type, key) => {
    if (!DB.dirHandle) return null;
    try {
        const attachDir = await DB.dirHandle.getDirectoryHandle('nexus_attachments');
        const fileHandle = await attachDir.getFileHandle(id + '.enc');
        const file = await fileHandle.getFile();
        
        const ENC_CHUNK_SIZE = 12 + CHUNK_SIZE + 16; 
        const decryptedBuffers = [];
        let offset = 0;
        
        while (offset < file.size) {
            const slice = file.slice(offset, offset + ENC_CHUNK_SIZE);
            const buffer = await slice.arrayBuffer();
            
            const ivBuffer = buffer.slice(0, 12);
            const ctBuffer = buffer.slice(12);
            
            const decrypted = await SecureCrypto.decryptFile(ctBuffer, ivBuffer, key);
            
            if (!decrypted) {
                if (offset === 0) return await app.loadLegacyAttachment(file, type, key);
                throw new Error("Corrupted block decryption");
            }
            
            decryptedBuffers.push(decrypted);
            offset += ENC_CHUNK_SIZE;
        }
        
        return new Blob(decryptedBuffers, { type: type });
    } catch(e) {
        return null;
    }
};

app.loadLegacyAttachment = async (file, type, key) => {
    const buffer = await file.arrayBuffer();
    const ivBuffer = buffer.slice(0, 12);
    const ctBuffer = buffer.slice(12);
    const decrypted = await SecureCrypto.decryptFile(ctBuffer, ivBuffer, key);
    return decrypted ? new Blob([decrypted], { type: type }) : null;
};

// Directly un-chunks to the user's hard drive so memory never fills up. 
app.downloadLargeAttachment = async (id, name) => {
    if (!DB.dirHandle) return;
    try {
        let contextId = DB.currentContext.type === 'home' ? DB.currentChannel : DB.currentContext.id;
        const key = await app.getContextKey(DB.currentContext.type, contextId);
        if(!key) throw new Error("Key missing");

        const saveHandle = await window.showSaveFilePicker({ suggestedName: name });
        const writable = await saveHandle.createWritable();

        const attachDir = await DB.dirHandle.getDirectoryHandle('nexus_attachments');
        const fileHandle = await attachDir.getFileHandle(id + '.enc');
        const file = await fileHandle.getFile();

        Utils.showToast("Decrypting and streaming to disk...", "info");

        const ENC_CHUNK_SIZE = 12 + CHUNK_SIZE + 16;
        let offset = 0;

        while (offset < file.size) {
            const slice = file.slice(offset, offset + ENC_CHUNK_SIZE);
            const buffer = await slice.arrayBuffer();

            const ivBuffer = buffer.slice(0, 12);
            const ctBuffer = buffer.slice(12);

            const decrypted = await SecureCrypto.decryptFile(ctBuffer, ivBuffer, key);
            if(!decrypted) {
                if(offset === 0) {
                    const decLegacy = await app.loadLegacyAttachment(file, 'application/octet-stream', key);
                    if(decLegacy) {
                        await writable.write(await decLegacy.arrayBuffer());
                        break;
                    }
                }
                throw new Error("Decryption failed");
            }

            await writable.write(decrypted);
            offset += ENC_CHUNK_SIZE;
        }

        await writable.close();
        Utils.showToast("Large file saved securely!", "success");

    } catch(e) {
        console.error(e);
        if (e.name !== "AbortError") Utils.showToast("Stream download failed.", "error");
    }
};