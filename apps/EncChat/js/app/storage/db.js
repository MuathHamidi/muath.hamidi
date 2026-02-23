import { app } from '../core.js';
import Utils from '../../utils.js';
import SecureCrypto from '../../crypto/index.js';
import DB from '../../db.js';

app.loadDB = async (isSilent = false, isInitialLoad = false) => {
    if (DB.isSyncing) return true; 
    DB.isSyncing = true;

    try {
        const fileHandle = await DB.dirHandle.getFileHandle('nexus_v3_vault.json', { create: true });
        const file = await fileHandle.getFile();
        const text = await file.text();
        
        if (text) {
            let parsed;
            try { parsed = JSON.parse(text); } catch(e) { return true; } 
            
            if (parsed.encrypted_vault) {
                const saltBuffer = SecureCrypto.b642ab(parsed.encrypted_vault.salt);
                DB.vaultSalt = parsed.encrypted_vault.salt;
                DB.vaultKey = await SecureCrypto.deriveVaultKey(DB.vaultPassword, saltBuffer);

                const decryptedText = await SecureCrypto.decryptSymmetric(
                    parsed.encrypted_vault.ct, 
                    parsed.encrypted_vault.iv, 
                    DB.vaultKey
                );

                if (decryptedText.startsWith("[Decryption Failed")) {
                    if (isInitialLoad) return false; 
                    return true; 
                }

                const dbData = JSON.parse(decryptedText);

                let needsServerRender = false;

                if (isSilent) {
                    if (JSON.stringify(DB.servers) !== JSON.stringify(dbData.servers)) needsServerRender = true;
                    if (JSON.stringify(DB.dms) !== JSON.stringify(dbData.dms)) needsServerRender = true;
                }

                if(dbData.users) DB.users = dbData.users;
                if(dbData.servers) DB.servers = dbData.servers;
                if(dbData.dms) DB.dms = dbData.dms;

                if (isSilent && needsServerRender) {
                    app.renderServers();
                    app.renderSidebarList();
                }
            }
        } else {
            const saltBuffer = crypto.getRandomValues(new Uint8Array(16));
            DB.vaultSalt = SecureCrypto.ab2b64(saltBuffer.buffer);
            DB.vaultKey = await SecureCrypto.deriveVaultKey(DB.vaultPassword, saltBuffer);
        }
        return true;
    } catch (err) {
        console.error("Error loading Vault", err);
        return false;
    } finally {
        DB.isSyncing = false;
    }
};

app.saveDB = async () => {
    if (!DB.dirHandle || !DB.vaultKey) return;

    while (DB.isSyncing) await new Promise(r => setTimeout(r, 50));
    DB.isSyncing = true;

    try {
        const dataToSave = JSON.stringify({
            users: DB.users,
            servers: DB.servers,
            dms: DB.dms
        });

        const encrypted = await SecureCrypto.encryptSymmetric(dataToSave, DB.vaultKey);

        const vaultPayload = {
            encrypted_vault: {
                ct: encrypted.ct,
                iv: encrypted.iv,
                salt: DB.vaultSalt
            }
        };

        const fileHandle = await DB.dirHandle.getFileHandle('nexus_v3_vault.json', { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(JSON.stringify(vaultPayload));
        await writable.close();
    } catch (err) {
        console.error("Failed to save Vault", err);
        Utils.showToast("Failed to save encrypted vault to local directory.", "error");
    } finally {
        DB.isSyncing = false;
    }
};