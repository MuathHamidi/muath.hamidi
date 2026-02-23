import { app } from '../core.js';
import SecureCrypto from '../../crypto.js';
import DB from '../../db.js';

app.getContextKey = async (type, id) => {
    if (DB.activeKeys[id]) return DB.activeKeys[id];
    
    let wrappedB64;
    if (type === 'home' || type === 'dm') {
        const dm = DB.dms[id];
        if(dm && dm.keys) wrappedB64 = dm.keys[DB.currentUser.id];
    } else {
        const server = DB.servers[id];
        if(server && server.keys) wrappedB64 = server.keys[DB.currentUser.id];
    }
    
    if (wrappedB64) {
        const key = await SecureCrypto.unwrapKeyWithRSA(wrappedB64, DB.currentUser.privateKey);
        if (key) {
            DB.activeKeys[id] = key;
            return key;
        }
    }
    return null;
};