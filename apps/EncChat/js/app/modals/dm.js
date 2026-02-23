import { app } from '../core.js';
import Utils from '../../utils.js';
import SecureCrypto from '../../crypto.js';
import DB from '../../db.js';

app.showStartDMModal = () => {
    const html = `
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-white">Start Direct Message</h2>
            <button onclick="app.closeModal()" class="text-gray-400 hover:text-white"><i data-lucide="x"></i></button>
        </div>
        <div class="space-y-4">
            <p class="text-sm text-gray-400">Enter the exact username of the person you want to message.</p>
            <div>
                <input type="text" id="dm-username" placeholder="Username" class="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 transition-colors">
            </div>
            <button onclick="app.startDM()" class="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium">Start Chat</button>
        </div>
    `;
    app.showModal(html);
};

app.startDM = async () => {
    const username = document.getElementById('dm-username').value.trim();
    if (!username) return;
    
    if (!DB.users[username]) {
        Utils.showToast("User not found on this local network.", "error");
        return;
    }

    const otherUser = DB.users[username];
    
    if (otherUser.id === DB.currentUser.id) {
        Utils.showToast("You already have 'Notes to Self'.", "info");
        app.closeModal();
        return;
    }
    
    // Check if DM already exists
    const existingDmId = Object.keys(DB.dms).find(dmId => {
        const parts = DB.dms[dmId].participants;
        return parts.includes(DB.currentUser.id) && parts.includes(otherUser.id) && parts.length === 2;
    });

    if (existingDmId) {
        app.closeModal();
        app.selectChannel(existingDmId);
        return;
    }

    // Create new DM Key and share it with both users via their Public Keys
    const dmId = Utils.generateId();
    const dmKey = await SecureCrypto.generateContextKey();
    
    const myPubKey = await SecureCrypto.importKey(DB.currentUser.publicKey, "public", {name: "RSA-OAEP", hash: "SHA-256"});
    const theirPubKey = await SecureCrypto.importKey(otherUser.publicKey, "public", {name: "RSA-OAEP", hash: "SHA-256"});
    
    const wrappedForMe = await SecureCrypto.wrapKeyWithRSA(dmKey, myPubKey);
    const wrappedForThem = await SecureCrypto.wrapKeyWithRSA(dmKey, theirPubKey);

    DB.dms[dmId] = { 
        participants: [DB.currentUser.id, otherUser.id], 
        name: "",
        keys: {
            [DB.currentUser.id]: wrappedForMe,
            [otherUser.id]: wrappedForThem
        }
    };
    DB.messages[dmId] = [];
    
    await app.saveDB();
    app.closeModal();
    app.renderSidebarList();
    app.selectChannel(dmId);
    Utils.showToast(`Encrypted DM started with ${otherUser.nickname}`, "success");
};