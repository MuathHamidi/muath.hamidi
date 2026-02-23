import { app } from '../core.js';
import DB from '../../db.js';

app.deleteMessage = async (msgId) => {
    if (confirm("Delete this message?")) {
        const msg = DB.messages[DB.currentChannel].find(m => m.id === msgId);
        
        if (msg && msg.attachments) {
            for (const att of msg.attachments) {
                if (!att.data && DB.dirHandle) {
                    try {
                        const attachDir = await DB.dirHandle.getDirectoryHandle('nexus_attachments');
                        await attachDir.removeEntry(att.id + '.enc');
                    } catch(e) { console.warn("Could not cleanup attachment", e); }
                }
                if (DB.activeMediaUrls && DB.activeMediaUrls[att.id]) {
                    URL.revokeObjectURL(DB.activeMediaUrls[att.id]);
                    delete DB.activeMediaUrls[att.id];
                }
            }
        }

        DB.messages[DB.currentChannel] = DB.messages[DB.currentChannel].filter(m => m.id !== msgId);
        await app.deleteMessageFile(DB.currentChannel, msgId);
        app.renderMessages();
    }
};