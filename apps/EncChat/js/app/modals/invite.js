import { app } from '../core.js';
import Utils from '../../utils.js';
import DB from '../../db.js';

app.showInviteModal = () => {
    const server = DB.servers[DB.currentContext.id];
    const html = `
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-white">Invite to ${Utils.escapeHTML(server.name)}</h2>
            <button onclick="app.closeModal()" class="text-gray-400 hover:text-white"><i data-lucide="x"></i></button>
        </div>
        <div class="space-y-4">
            <p class="text-sm text-gray-400">Share these exact credentials with a friend to allow them to join this encrypted server.</p>
            
            <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Invite Code</label>
                <div class="flex bg-gray-900 border border-gray-700 rounded-lg p-3 justify-between items-center">
                    <span class="font-mono text-indigo-400 font-bold tracking-wider">${server.inviteCode}</span>
                    <button onclick="navigator.clipboard.writeText('${server.inviteCode}'); Utils.showToast('Copied Code!')" class="text-gray-400 hover:text-white"><i data-lucide="copy" class="w-4 h-4"></i></button>
                </div>
            </div>
            
            <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Password</label>
                <div class="flex bg-gray-900 border border-gray-700 rounded-lg p-3 justify-between items-center">
                    <span class="font-mono text-red-400 font-bold tracking-wider">${server.invitePassword}</span>
                    <button onclick="navigator.clipboard.writeText('${server.invitePassword}'); Utils.showToast('Copied Password!')" class="text-gray-400 hover:text-white"><i data-lucide="copy" class="w-4 h-4"></i></button>
                </div>
            </div>
        </div>
    `;
    app.showModal(html);
};