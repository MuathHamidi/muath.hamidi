import { app } from '../../core.js';
import Utils from '../../../utils.js';
import SecureCrypto from '../../../crypto.js';
import DB from '../../../db.js';

app.createServer = async () => {
    const name = document.getElementById('new-server-name').value.trim();
    if (!name) return;

    const serverId = Utils.generateId();
    const generalChannelId = Utils.generateId();
    
    // Generate and wrap AES key for the server
    const serverKey = await SecureCrypto.generateContextKey();
    const myPubKey = await SecureCrypto.importKey(DB.currentUser.publicKey, "public", {name: "RSA-OAEP", hash: "SHA-256"});
    const myWrappedKey = await SecureCrypto.wrapKeyWithRSA(serverKey, myPubKey);

    const inviteCode = Utils.generateId().substring(0, 8).toUpperCase();
    const invitePassword = Utils.generateId().substring(0, 6);
    
    // Encrypt Server Key with the Invite Password so others can join
    const inviteKeyWrapper = await SecureCrypto.wrapKeyWithPassword(serverKey, invitePassword);
    
    DB.servers[serverId] = {
        id: serverId,
        name: name,
        ownerId: DB.currentUser.id,
        members: [{ userId: DB.currentUser.id }],
        channels: [{ id: generalChannelId, name: 'general' }],
        inviteCode: inviteCode,
        invitePassword: invitePassword,
        inviteKeyWrapper: inviteKeyWrapper,
        keys: { [DB.currentUser.id]: myWrappedKey }
    };
    DB.messages[generalChannelId] = [];

    await app.saveDB();
    app.closeModal();
    app.selectServer(serverId);
    Utils.showToast("Encrypted Server created!", "success");
};