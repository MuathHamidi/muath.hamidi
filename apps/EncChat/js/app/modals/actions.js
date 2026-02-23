import { app } from '../core.js';
import Utils from '../../utils.js';
import DB from '../../db.js';

app.deleteChannel = async (channelId) => {
    if(confirm("Are you sure you want to delete this channel? All messages inside will be lost forever.")) {
        const serverId = DB.currentContext.id;
        DB.servers[serverId].channels = DB.servers[serverId].channels.filter(c => c.id !== channelId);
        delete DB.messages[channelId];
        await app.saveDB();
        app.renderSidebarList();
        app.selectServer(serverId); // re-evaluates which channel to show
        Utils.showToast("Channel deleted.", "info");
    }
};

app.deleteServer = async () => {
    if(confirm("Are you sure you want to delete this server forever? All encrypted messages will be lost.")) {
        const serverId = DB.currentContext.id;
        delete DB.servers[serverId];
        await app.saveDB();
        app.selectHome();
        Utils.showToast("Server deleted.", "info");
    }
};

app.leaveServer = async () => {
    if(confirm("Are you sure you want to leave this server?")) {
        const serverId = DB.currentContext.id;
        const server = DB.servers[serverId];
        server.members = server.members.filter(m => m.userId !== DB.currentUser.id);
        await app.saveDB();
        app.selectHome();
        Utils.showToast("Left server.", "info");
    }
};