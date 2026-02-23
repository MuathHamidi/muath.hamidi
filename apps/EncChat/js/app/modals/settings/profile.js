import { app } from '../../core.js';
import Utils from '../../../utils.js';
import DB from '../../../db.js';

app.saveProfileName = async () => {
    const newNick = document.getElementById('edit-nickname-input').value.trim();
    if (newNick && newNick !== DB.currentUser.nickname) {
        DB.currentUser.nickname = newNick;
        DB.users[DB.currentUser.username].nickname = newNick;
        
        document.getElementById('user-nickname-display').innerText = newNick;
        document.getElementById('user-avatar-initial').innerText = newNick.charAt(0).toUpperCase();
        
        app.renderSidebarList();
        if(DB.currentContext.type === 'server') {
            app.renderMembersList(DB.servers[DB.currentContext.id]);
        }
        await app.saveDB();
        Utils.showToast("Profile name updated.", "success");
    }
    app.closeModal();
};