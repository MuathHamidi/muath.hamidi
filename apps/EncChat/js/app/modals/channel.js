import { app } from '../core.js';
import Utils from '../../utils.js';
import DB from '../../db.js';

app.showCreateChannelModal = () => {
    const html = `
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-white">Create Channel</h2>
            <button onclick="app.closeModal()" class="text-gray-400 hover:text-white"><i data-lucide="x"></i></button>
        </div>
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">Channel Name</label>
                <div class="relative">
                    <span class="absolute left-3 top-2.5 text-gray-500">#</span>
                    <input type="text" id="new-channel-name" placeholder="new-channel" class="w-full bg-gray-900 text-white border border-gray-700 rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:border-indigo-500 transition-colors">
                </div>
            </div>
            <button onclick="app.createChannel()" class="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium">Create Channel</button>
        </div>
    `;
    app.showModal(html);
};

app.createChannel = async () => {
    let name = document.getElementById('new-channel-name').value.trim().toLowerCase().replace(/\s+/g, '-');
    if (!name) return;
    
    const serverId = DB.currentContext.id;
    const channelId = Utils.generateId();
    
    DB.servers[serverId].channels.push({ id: channelId, name: name });
    DB.messages[channelId] = [];
    
    await app.saveDB();
    app.closeModal();
    app.renderSidebarList(); // re-render channels
    app.selectChannel(channelId);
};