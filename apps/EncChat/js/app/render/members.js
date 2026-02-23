import { app } from '../core.js';
import Utils from '../../utils.js';
import DB from '../../db.js';

app.renderMembersList = (server) => {
    const list = document.getElementById('members-list');
    list.innerHTML = `<div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Members — ${server.members.length}</div>`;
    
    server.members.forEach(memberData => {
        const userObj = Object.values(DB.users).find(u => u.id === memberData.userId);
        if(!userObj) return;
        const isOwner = server.ownerId === userObj.id;

        const el = document.createElement('div');
        el.className = 'flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer group';
        el.innerHTML = `
            <div class="relative">
                <div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white uppercase text-sm">
                    ${userObj.nickname.charAt(0)}
                </div>
                <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></div>
            </div>
            <div class="flex flex-col min-w-0 flex-1">
                <div class="flex items-center gap-1">
                    <span class="truncate text-sm font-medium ${isOwner ? 'text-yellow-500' : 'text-gray-300'} group-hover:text-white">${Utils.escapeHTML(userObj.nickname)}</span>
                    ${isOwner ? '<i data-lucide="crown" class="w-3 h-3 text-yellow-500 shrink-0"></i>' : ''}
                </div>
            </div>
        `;
        list.appendChild(el);
    });
    lucide.createIcons();
};