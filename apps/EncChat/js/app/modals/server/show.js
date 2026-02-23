import { app } from '../../core.js';

app.showCreateServerModal = () => {
    const html = `
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-white">Create or Join Server</h2>
            <button onclick="app.closeModal()" class="text-gray-400 hover:text-white"><i data-lucide="x"></i></button>
        </div>
        
        <div class="space-y-6">
            <!-- Create Section -->
            <div class="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                <h3 class="text-white font-bold mb-2">Create a New Server</h3>
                <input type="text" id="new-server-name" placeholder="Server Name" class="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:border-indigo-500">
                <button onclick="app.createServer()" class="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium">Create Server</button>
            </div>

            <div class="flex items-center gap-4">
                <div class="h-px bg-gray-600 flex-1"></div>
                <span class="text-xs text-gray-400 uppercase font-bold">OR</span>
                <div class="h-px bg-gray-600 flex-1"></div>
            </div>

            <!-- Join Section -->
            <div class="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                <h3 class="text-white font-bold mb-2">Join with Invitation</h3>
                <input type="text" id="join-invite-code" placeholder="Invite Code" class="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-indigo-500 uppercase">
                <input type="password" id="join-invite-pass" placeholder="Invitation Password" class="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:border-indigo-500">
                <button onclick="app.joinServer()" class="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium">Join Server</button>
            </div>
        </div>
    `;
    app.showModal(html);
};