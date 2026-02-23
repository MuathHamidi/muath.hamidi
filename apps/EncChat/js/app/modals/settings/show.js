import { app } from '../../core.js';
import Utils from '../../../utils.js';
import DB from '../../../db.js';

app.showSettingsModal = () => {
    let config = DB.currentUser?.settings?.themeConfig || {
        preset: 'dark',
        noise: '0.5',
        accent: '#8ab4f8'
    };

    const presets = [
        { id: 'dark', name: 'Dark Mode', icon: 'moon' },
        { id: 'light', name: 'Light Mode', icon: 'sun' }
    ];

    const genOption = (key, val, activeVal, contentHtml) => `
        <div onclick="app.updateThemeParam('${key}', '${val}')" data-theme-key="${key}" data-theme-val="${val}" class="cursor-pointer border ${activeVal === val ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-gray-700' : 'border-gray-700 bg-gray-800 hover:border-gray-600'} rounded-xl p-3 flex flex-col items-center justify-center gap-2 transition-all shadow-sm">
            ${contentHtml}
        </div>
    `;

    const html = `
        <!-- STICKY HEADER -->
        <div class="flex justify-between items-center mb-4 pb-4 border-b border-gray-700/50">
            <h2 class="text-xl font-bold text-white tracking-tight">Preferences</h2>
            <button onclick="app.closeModal()" class="text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 p-1.5 rounded-full transition-colors"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>
        
        <!-- SCROLLING BODY -->
        <div class="space-y-8 overflow-y-auto max-h-[55vh] pr-3 -mr-3 mb-4 hide-scrollbar sm:custom-scrollbar">
            
            <!-- PROFILE -->
            <section class="space-y-4">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-700 pb-2">Profile</h3>
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white text-xl uppercase shadow-md shrink-0">
                        ${DB.currentUser.nickname.charAt(0)}
                    </div>
                    <div class="flex-1">
                        <label class="block text-xs font-medium text-gray-400 mb-1">Display Name</label>
                        <input type="text" id="edit-nickname-input" value="${Utils.escapeHTML(DB.currentUser.nickname)}" class="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors shadow-inner">
                    </div>
                </div>
            </section>

            <!-- THEME PRESETS -->
            <section class="space-y-4">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-700 pb-2">Appearance Base</h3>
                <div class="grid grid-cols-2 gap-3">
                    ${presets.map(t => genOption('preset', t.id, config.preset, `
                        <i data-lucide="${t.icon}" class="w-5 h-5 text-gray-300"></i>
                        <span class="text-white font-medium text-xs">${t.name}</span>
                    `)).join('')}
                </div>
            </section>

            <!-- NATIVE RGB ACCENT OVERRIDE -->
            <section class="space-y-4">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-700 pb-2">Accent Color</h3>
                <div class="flex items-center gap-4 bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                    <input type="color" id="accent-color-picker" value="${config.accent}" 
                        oninput="document.getElementById('accent-val-display').innerText = this.value.toUpperCase(); app.updateThemeParam('accent', this.value)"
                        class="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-0 p-0 shadow-sm">
                    <div class="flex flex-col">
                        <span class="text-xs text-gray-400 font-medium">Custom Hex / RGB</span>
                        <span class="text-sm text-white font-mono tracking-wide" id="accent-val-display">${config.accent.toUpperCase()}</span>
                    </div>
                </div>
            </section>

            <!-- NOISE SLIDER -->
            <section class="space-y-3">
                <div class="flex justify-between items-end border-b border-gray-700 pb-2">
                    <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Texture Noise</h3>
                    <span class="text-[10px] text-gray-500 font-mono" id="noise-val-display">${Math.round(config.noise * 100)}%</span>
                </div>
                <div class="pt-2 px-1">
                    <input type="range" min="0" max="1" step="0.01" value="${config.noise}" 
                        oninput="document.getElementById('noise-val-display').innerText = Math.round(this.value * 100) + '%'; app.updateThemeParam('noise', this.value)" 
                        class="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500">
                    <div class="flex justify-between text-[10px] text-gray-500 mt-2 font-medium">
                        <span>Off</span>
                        <span>Heavy</span>
                    </div>
                </div>
            </section>

            <!-- MARKDOWN SHORTCUTS -->
            <section class="space-y-4 pb-2">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-700 pb-2">Formatting Shortcuts</h3>
                <div class="grid grid-cols-2 gap-2 text-sm">
                    <div class="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-700"><span class="text-gray-400">Heading</span> <code class="text-indigo-300 font-mono bg-gray-900 px-1 rounded border border-gray-700"># text</code></div>
                    <div class="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-700"><span class="text-gray-400">Bold</span> <code class="text-indigo-300 font-mono bg-gray-900 px-1 rounded border border-gray-700">**text**</code></div>
                    <div class="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-700"><span class="text-gray-400">Italic</span> <code class="text-indigo-300 font-mono bg-gray-900 px-1 rounded border border-gray-700">*text*</code></div>
                    <div class="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-700"><span class="text-gray-400">Strike</span> <code class="text-indigo-300 font-mono bg-gray-900 px-1 rounded border border-gray-700">~~text~~</code></div>
                    <div class="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-700"><span class="text-gray-400">Quote</span> <code class="text-indigo-300 font-mono bg-gray-900 px-1 rounded border border-gray-700">&gt; text</code></div>
                    <div class="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-700"><span class="text-gray-400">Code</span> <code class="text-indigo-300 font-mono bg-gray-900 px-1 rounded border border-gray-700">\`\`\`code\`\`\`</code></div>
                </div>
            </section>

        </div>

        <!-- STICKY FOOTER (DANGER ZONE) -->
        <section class="pt-4 border-t border-gray-700/50 flex gap-3">
            <button onclick="app.logout()" class="flex-1 py-2.5 bg-red-600/10 text-red-500 border border-red-500/30 hover:bg-red-600 hover:text-white rounded-lg transition-all font-bold text-sm flex justify-center items-center gap-2"><i data-lucide="log-out" class="w-4 h-4"></i> Lock & Log Out</button>
            <button onclick="app.saveProfileName()" class="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-bold text-sm shadow-lg shadow-indigo-600/20">Save Profile</button>
        </section>
    `;
    
    app.showModal(html);
};