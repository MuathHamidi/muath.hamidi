import { app } from './core.js';
import DB from '../db.js';

app.selectHome = () => {
    DB.currentContext = { type: 'home', id: null };
    DB.currentChannel = null;
    app.cancelEdit();
    app.searchQuery = "";
    document.getElementById('chat-search').value = "";
    
    document.getElementById('indicator-home').classList.replace('h-0', 'h-10');
    app.renderServers(); 
    
    document.getElementById('sidebar-title').innerText = "Direct Messages";
    document.getElementById('sidebar-add-btn').classList.remove('hidden');
    
    document.getElementById('chat-header-title').innerText = "Friends & DMs";
    document.getElementById('chat-header-icon').setAttribute('data-lucide', 'users');
    document.getElementById('messages-container').innerHTML = '<div class="h-full flex items-center justify-center text-gray-400"><p>Select a Direct Message to start chatting.</p></div>';
    
    app.disableChatInput();
    app.renderSidebarList();
    document.getElementById('members-sidebar').classList.add('hidden');
    lucide.createIcons();
};

app.selectServer = (serverId) => {
    DB.currentContext = { type: 'server', id: serverId };
    const server = DB.servers[serverId];
    
    if (server.channels.length > 0) {
        DB.currentChannel = server.channels[0].id; 
    } else {
        DB.currentChannel = null;
    }

    document.getElementById('indicator-home').classList.replace('h-10', 'h-0');
    app.renderServers();
    
    document.getElementById('sidebar-title').innerText = server.name;
    document.getElementById('sidebar-add-btn').classList.add('hidden');
    
    app.renderSidebarList();
    app.renderMembersList(server);
    document.getElementById('members-sidebar').classList.remove('hidden');
    
    if (DB.currentChannel) app.selectChannel(DB.currentChannel);
    else {
        document.getElementById('messages-container').innerHTML = '<div class="h-full flex items-center justify-center text-gray-400"><p>No channels in this server.</p></div>';
        app.disableChatInput();
    }
};

app.selectChannel = async (channelId) => {
    DB.currentChannel = channelId;
    app.cancelEdit();
    app.searchQuery = "";
    document.getElementById('chat-search').value = "";
    
    app.renderSidebarList(); 
    app.renderChatHeader();
    
    document.getElementById('messages-container').innerHTML = `<div class="h-full flex items-center justify-center"><i data-lucide="loader-2" class="w-8 h-8 text-indigo-400 animate-spin"></i></div>`;
    lucide.createIcons();
    
    let contextId = DB.currentContext.type === 'home' ? channelId : DB.currentContext.id;
    const key = await app.getContextKey(DB.currentContext.type, contextId);
    
    if (key) {
        await app.loadChannelMessages(channelId, key);
    } else {
        DB.messages[channelId] = [];
    }
    
    app.renderMessages();
    app.enableChatInput();
};