const DB = {
    users: {},      // username: { nickname, id, publicKey, encryptedPrivateKey, authCheck }
    servers: {},    // id: { name, ownerId, members: [{userId}], channels: [], inviteCode, invitePassword, inviteKeyWrapper, keys: {userId: wrappedKey} }
    messages: {},   // channelId: [ { id, senderId, text: {ct, iv}, attachments: [{id, name, type, size}], timestamp } ]
    dms: {},        // id: { participants: [id1, id2], name, keys: {userId: wrappedKey} }
    
    currentUser: null,
    currentContext: { type: null, id: null }, // type: 'server'|'home', id: serverId
    currentChannel: null, // channelId or dmId
    pendingUploads: [],
    
    dirHandle: null, // References the local file system folder
    syncInterval: null, // For real-time background syncing
    activeKeys: {}, // In-memory cache of decrypted AES-GCM Context Keys
    activeMediaUrls: {}, // Cache for Decrypted Object URLs to prevent memory leaks
    isSyncing: false, // LOCK: Prevents read/write overlapping
    
    // VAULT ENCRYPTION STATE
    vaultPassword: null,
    vaultKey: null,
    vaultSalt: null
};

export default DB;