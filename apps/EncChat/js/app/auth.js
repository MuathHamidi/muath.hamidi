import { app } from './core.js';
import Utils from '../utils.js';
import SecureCrypto from '../crypto/index.js';
import DB from '../db.js';

app.handleLogin = async () => {
    const userVal = document.getElementById('auth-username').value.trim();
    const passVal = document.getElementById('auth-password').value.trim();

    if (!userVal || !passVal) {
        Utils.showToast("Username and password required.", "error");
        return;
    }

    if (DB.users[userVal]) {
        const user = DB.users[userVal];
        try {
            const masterKey = await SecureCrypto.deriveMasterKey(passVal, userVal);
            const check = await SecureCrypto.decryptSymmetric(user.authCheck.ct, user.authCheck.iv, masterKey);
            
            if (check === "nexus_valid") {
                const privKeyRaw = await SecureCrypto.decryptSymmetric(user.encryptedPrivateKey.ct, user.encryptedPrivateKey.iv, masterKey);
                const privateKey = await SecureCrypto.importKey(privKeyRaw, "private", {name: "RSA-OAEP", hash: "SHA-256"});
                
                app.loginUser({ ...user, privateKey });
                Utils.showToast("Decryption successful. Welcome back!", "success");
            } else {
                Utils.showToast("Invalid password. Access rejected.", "error");
            }
        } catch (e) {
            Utils.showToast("Decryption failed. Invalid password.", "error");
        }
    } else {
        Utils.showToast("Username not found. Create an account instead.", "error");
    }
};

app.handleRegister = async () => {
    const userVal = document.getElementById('auth-username').value.trim();
    const passVal = document.getElementById('auth-password').value.trim();

    if (!userVal || !passVal) {
        Utils.showToast("Username and password required.", "error");
        return;
    }

    if (DB.users[userVal]) {
        Utils.showToast("Username already exists. Please login or choose a different one.", "error");
    } else {
        const masterKey = await SecureCrypto.deriveMasterKey(passVal, userVal);
        const keyPair = await SecureCrypto.generateKeyPair();
        
        const privateKeyRaw = await SecureCrypto.exportKey(keyPair.privateKey);
        const encryptedPrivateKey = await SecureCrypto.encryptSymmetric(privateKeyRaw, masterKey);
        const publicKeyB64 = await SecureCrypto.exportKey(keyPair.publicKey);
        const authCheck = await SecureCrypto.encryptSymmetric("nexus_valid", masterKey);

        const newUser = {
            id: Utils.generateId(),
            username: userVal,
            nickname: userVal,
            publicKey: publicKeyB64,
            encryptedPrivateKey: encryptedPrivateKey,
            authCheck: authCheck,
            settings: { 
                themeConfig: { preset: 'dark', noise: '0.5', accent: '#8ab4f8' } 
            }
        };
        DB.users[userVal] = newUser;
        
        const dmId = Utils.generateId();
        const dmKey = await SecureCrypto.generateContextKey();
        const wrappedDmKey = await SecureCrypto.wrapKeyWithRSA(dmKey, keyPair.publicKey);
        
        DB.dms[dmId] = { 
            participants: [newUser.id], 
            name: "Notes to Self",
            keys: { [newUser.id]: wrappedDmKey }
        };

        await app.saveDB();
        Utils.showToast("Encrypted identity created successfully!", "success");
        app.loginUser({ ...newUser, privateKey: keyPair.privateKey });
    }
};

app.loginUser = (user) => {
    DB.currentUser = user;
    
    app.applyUserTheme();

    document.getElementById('auth-view').classList.add('hidden');
    document.getElementById('app-view').classList.remove('hidden');
    
    document.getElementById('user-nickname-display').innerText = user.nickname;
    document.getElementById('user-name-display').innerText = '@' + user.username;
    document.getElementById('user-avatar-initial').innerText = user.nickname.charAt(0).toUpperCase();

    app.selectHome();
    app.renderServers();
    
    // --- REAL-TIME LIVE SYNC ---
    if (!DB.syncInterval) {
        DB.syncInterval = setInterval(async () => {
            // 1. Sync global server/user metadata
            await app.loadDB(true);
            
            // 2. Sync live chat messages for the currently open channel
            if (DB.currentChannel) {
                let contextId = DB.currentContext.type === 'home' ? DB.currentChannel : DB.currentContext.id;
                const key = await app.getContextKey(DB.currentContext.type, contextId);
                if (key) {
                    await app.loadChannelMessages(DB.currentChannel, key, true); // true = silent background fetch
                }
            }
        }, 2000);
    }
};

app.logout = () => {
    DB.currentUser = null;
    DB.activeKeys = {};
    if (DB.syncInterval) {
        clearInterval(DB.syncInterval);
        DB.syncInterval = null;
    }
    
    document.body.setAttribute('data-theme', 'dark');
    document.body.style = '';
    
    document.getElementById('app-view').classList.add('hidden');
    document.getElementById('auth-view').classList.remove('hidden');
    document.getElementById('auth-password').value = '';
    Utils.showToast("Logged out securely.", "info");
    app.closeModal();
};