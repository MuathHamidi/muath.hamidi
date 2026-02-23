import { app } from '../core.js';
import Utils from '../../utils.js';
import DB from '../../db.js';

app.selectDirectory = async () => {
    const vaultPass = document.getElementById('vault-password').value;
    if (!vaultPass) {
        Utils.showToast("Vault Password is required.", "error");
        return;
    }

    try {
        const handle = await window.showDirectoryPicker({ mode: 'readwrite' });
        DB.dirHandle = handle;
        DB.vaultPassword = vaultPass;
        
        const success = await app.loadDB(false, true); // true = isInitialLoad
        if (!success) throw new Error("INVALID_VAULT_PASSWORD");

        document.getElementById('setup-view').classList.add('hidden');
        document.getElementById('auth-view').classList.remove('hidden');
        Utils.showToast("Encrypted Vault connected.", "success");
    } catch (err) {
        console.error(err);
        if(err.message === "INVALID_VAULT_PASSWORD") {
            Utils.showToast("Decryption failed. Incorrect Vault Password.", "error");
        } else {
            Utils.showToast("Directory selection failed or cancelled.", "error");
        }
        DB.dirHandle = null;
    }
};