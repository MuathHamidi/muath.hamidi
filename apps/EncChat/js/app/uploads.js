import { app } from './core.js';
import Utils from '../utils.js';
import DB from '../db.js';

app.handleFileUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // We no longer limit file size or read as DataURL to avoid stringify memory crashes
    Array.from(files).forEach(file => {
        const previewUrl = URL.createObjectURL(file);
        
        DB.pendingUploads.push({
            id: Utils.generateId(),
            name: file.name,
            type: file.type || 'application/octet-stream',
            file: file, // Keep raw File object safely
            previewUrl: previewUrl,
            size: file.size
        });
        app.renderUploadPreviews();
    });
    
    // Reset input
    e.target.value = '';
};

app.renderUploadPreviews = () => {
    const previewContainer = document.getElementById('uploads-preview');
    if (DB.pendingUploads.length === 0) {
        previewContainer.classList.add('hidden');
        return;
    }
    
    previewContainer.classList.remove('hidden');
    previewContainer.innerHTML = '';
    
    DB.pendingUploads.forEach(fileObj => {
        const el = document.createElement('div');
        el.className = 'relative shrink-0 bg-gray-700 rounded-md border border-gray-600 p-2 w-48 flex items-center gap-2 group';
        
        let iconHtml = '<i data-lucide="file" class="w-8 h-8 text-gray-400"></i>';
        if (fileObj.type.startsWith('image/')) {
            iconHtml = `<img src="${fileObj.previewUrl}" class="w-10 h-10 object-cover rounded">`;
        } else if (fileObj.type.startsWith('video/')) {
            iconHtml = '<i data-lucide="video" class="w-8 h-8 text-blue-400"></i>';
        } else if (fileObj.type.startsWith('audio/')) {
            iconHtml = '<i data-lucide="music" class="w-8 h-8 text-yellow-400"></i>';
        }

        el.innerHTML = `
            <div class="shrink-0">${iconHtml}</div>
            <div class="flex-1 min-w-0">
                <div class="text-sm text-white truncate font-medium">${Utils.escapeHTML(fileObj.name)}</div>
                <div class="text-xs text-gray-400">${Utils.formatBytes(fileObj.size)}</div>
            </div>
            <button type="button" onclick="app.removePendingUpload('${fileObj.id}')" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                <i data-lucide="x" class="w-3 h-3"></i>
            </button>
        `;
        previewContainer.appendChild(el);
    });
    lucide.createIcons();
};

app.removePendingUpload = (id) => {
    const fileObj = DB.pendingUploads.find(f => f.id === id);
    if (fileObj) {
        URL.revokeObjectURL(fileObj.previewUrl);
    }
    DB.pendingUploads = DB.pendingUploads.filter(f => f.id !== id);
    app.renderUploadPreviews();
};