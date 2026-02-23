import { app } from '../core.js';
import Utils from '../../utils.js';
import DB from '../../db.js';

app.renderSidebarList = () => {
    const list = document.getElementById('sidebar-list');
    list.innerHTML = '';

    if (DB.currentContext.type === 'home') {
        // Render DMs
        Object.keys(DB.dms).forEach(dmId => {
            const dm = DB.dms[dmId];
            // check if participant
            if (!dm.participants.includes(DB.currentUser.id)) return;

            let dmName = dm.name;
            let icon = 'user';
            if (dm.participants.length === 1) {
                icon = 'bookmark'; // Notes to self
            } else if (!dmName) {
                // Find other user's name
                const otherId = dm.participants.find(id => id !== DB.currentUser.id);
                const otherUser = Object.values(DB.users).find(u => u.id === otherId);
                dmName = otherUser ? otherUser.nickname : 'Unknown User';
            }

            const isActive = DB.currentChannel === dmId;
            const el = document.createElement('button');
            el.className = `w-full flex items-center gap-3 px-2 py-2 rounded-md transition-colors ${isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'}`;
            el.onclick = () => app.selectChannel(dmId);
            el.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center shrink-0">
                    <i data-lucide="${icon}" class="w-4 h-4 text-gray-300"></i>
                </div>
                <span class="truncate font-medium">${Utils.escapeHTML(dmName)}</span>
            `;
            list.appendChild(el);
        });
    } else if (DB.currentContext.type === 'server') {
        const server = DB.servers[DB.currentContext.id];
        if (!server) return;
        
        // Channels Title
        const header = document.createElement('div');
        header.className = 'text-xs font-bold text-gray-400 uppercase tracking-wider px-2 py-3 flex justify-between items-center';
        header.innerHTML = `<span>Text Channels</span> ${server.ownerId === DB.currentUser.id ? '<button onclick="app.showCreateChannelModal()" class="hover:text-white"><i data-lucide="plus" class="w-4 h-4"></i></button>' : ''}`;
        list.appendChild(header);

        server.channels.forEach(ch => {
            const isActive = DB.currentChannel === ch.id;
            const el = document.createElement('button');
            el.className = `w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors ${isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'}`;
            el.onclick = () => app.selectChannel(ch.id);
            el.innerHTML = `
                <i data-lucide="hash" class="w-4 h-4 shrink-0"></i>
                <span class="truncate font-medium">${Utils.escapeHTML(ch.name)}</span>
            `;
            list.appendChild(el);
        });
    }
    lucide.createIcons();
};