import { app } from '../../core.js';
import Utils from '../../../utils.js';
import SecureCrypto from '../../../crypto.js';
import DB from '../../../db.js';

app.joinServer = async () => {
    const code = document.getElementById('join-invite-code').value.trim().toUpperCase();
    const pass = document.getElementById('join-invite-pass').value.trim();
    
    if (!code || !pass) {
        Utils.showToast("Code and password required.", "error");
        return;
    }

    const serverId = Object.keys(DB.servers).find(id => {
        const s = DB.servers[id];
        return s.inviteCode === code && s.invitePassword === pass;
    });

    if (serverId) {
        const server = DB.servers[serverId];
        if (server.members.find(m => m.userId === DB.currentUser.id)) {
            Utils.showToast("You are already in this server.", "info");
            app.closeModal();
            app.selectServer(serverId);
            return;
        }

        try {
            // Unpack the Server Key using the Invite Password
            const serverKey = await SecureCrypto.unwrapKeyWithPassword(server.inviteKeyWrapper.ct, server.inviteKeyWrapper.iv, pass);
            if (!serverKey) throw new Error("Invalid decryption");

            // Re-wrap the key with the user's personal RSA Public Key
            const myPubKey = await SecureCrypto.importKey(DB.currentUser.publicKey, "public", {name: "RSA-OAEP", hash: "SHA-256"});
            const myWrappedKey = await SecureCrypto.wrapKeyWithRSA(serverKey, myPubKey);

            server.keys[DB.currentUser.id] = myWrappedKey;
            server.members.push({ userId: DB.currentUser.id });
            
            await app.saveDB();
            app.closeModal();
            app.selectServer(serverId);
            Utils.showToast(`Joined ${server.name}!`, "success");
        } catch (e) {
            Utils.showToast("Failed to decrypt server credentials.", "error");
        }
    } else {
        Utils.showToast("Invalid invite code or password.", "error");
    }
};