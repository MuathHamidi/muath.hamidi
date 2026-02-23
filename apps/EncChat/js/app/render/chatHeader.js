import { app } from '../core.js';
import DB from '../../db.js';

app.renderChatHeader = () => {
    const actionsContainer = document.getElementById('chat-header-actions');
    actionsContainer.innerHTML = '';

    if (DB.currentContext.type === 'home') {
        const dm = DB.dms[DB.currentChannel];
        if(!dm) return;
        let name = dm.name;
        if(!name) {
            const otherId = dm.participants.find(id => id !== DB.currentUser.id);
            const otherUser = Object.values(DB.users).find(u => u.id === otherId);
            name = otherUser ? otherUser.nickname : 'Unknown';
        }
        document.getElementById('chat-header-icon').setAttribute('data-lucide', dm.participants.length === 1 ? 'bookmark' : 'at-sign');
        document.getElementById('chat-header-title').innerText = name;
    } else {
        const server = DB.servers[DB.currentContext.id];
        if(!server) return;
        const channel = server.channels.find(c => c.id === DB.currentChannel);
        if(!channel) return;
        document.getElementById('chat-header-icon').setAttribute('data-lucide', 'hash');
        document.getElementById('chat-header-title').innerText = channel.name;

        // Server Actions
        const isOwner = server.ownerId === DB.currentUser.id;
        
        if (isOwner) {
            actionsContainer.innerHTML += `
                <button onclick="app.showInviteModal()" class="flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-sm font-medium transition-colors">
                    <i data-lucide="user-plus" class="w-4 h-4"></i> Invite
                </button>
                <button onclick="app.deleteChannel('${channel.id}')" class="p-1 text-gray-400 hover:text-red-500 transition-colors" title="Delete Channel">
                    <i data-lucide="minus-circle" class="w-5 h-5"></i>
                </button>
                <button onclick="app.deleteServer()" class="p-1 text-gray-400 hover:text-red-500 transition-colors ml-2" title="Delete Server">
                    <i data-lucide="trash-2" class="w-5 h-5"></i>
                </button>
            `;
        } else {
            actionsContainer.innerHTML += `
                <button onclick="app.leaveServer()" class="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-sm font-medium transition-colors">
                    <i data-lucide="log-out" class="w-4 h-4"></i> Leave
                </button>
            `;
        }
    }
    lucide.createIcons();
};