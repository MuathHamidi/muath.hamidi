import { app } from '../core.js';
import Utils from '../../utils.js';
import DB from '../../db.js';

app.renderServers = () => {
    const list = document.getElementById('server-list');
    list.innerHTML = '';
    
    Object.values(DB.servers).forEach(server => {
        // Check if current user is member
        if (!server.members.find(m => m.userId === DB.currentUser.id)) return;

        const isActive = DB.currentContext.id === server.id;
        const initial = Utils.escapeHTML(server.name.charAt(0).toUpperCase());
        
        const el = document.createElement('div');
        el.className = 'group relative flex items-center justify-center w-full';
        el.innerHTML = `
            <div class="absolute left-0 w-1 bg-white rounded-r-lg transition-all duration-300 ${isActive ? 'h-10' : 'h-0 group-hover:h-5'}"></div>
            <button onclick="app.selectServer('${server.id}')" class="w-12 h-12 ${isActive ? 'bg-indigo-500 rounded-2xl text-white' : 'bg-gray-800 rounded-[24px] text-gray-300 hover:bg-indigo-500 hover:text-white hover:rounded-2xl'} flex items-center justify-center transition-all duration-300 shadow-md font-bold text-lg overflow-hidden">
                ${initial}
            </button>
            <div class="absolute left-16 bg-black text-white text-xs font-bold px-2 py-1 rounded scale-0 group-hover:scale-100 transition-transform origin-left z-50 whitespace-nowrap">${Utils.escapeHTML(server.name)}</div>
        `;
        list.appendChild(el);
    });
};