import { app } from '../../core.js';
import Utils from '../../../utils.js';
import SecureCrypto from '../../../crypto/index.js';
import DB from '../../../db.js';

export const getAttachmentsHtml = async (attachments, contextKey) => {
    if (!DB.activeMediaUrls) DB.activeMediaUrls = {};
    let html = '<div class="flex flex-wrap gap-2 mt-2">';
    
    for (const att of attachments) {
        const isUploading = att.status === 'uploading';
        const isError = att.status === 'error';

        // 50MB Limit: Exceeding this crashes browser RAM. Render as direct download.
        const isHuge = att.size > 50 * 1024 * 1024; 

        let mediaUrl = isUploading ? att.previewUrl : DB.activeMediaUrls[att.id];
        
        if (!mediaUrl && contextKey && !isUploading && !isError && !isHuge) {
            if (att.data && att.iv) {
                mediaUrl = await SecureCrypto.decryptSymmetric(att.data, att.iv, contextKey);
                DB.activeMediaUrls[att.id] = mediaUrl;
            } else {
                const blob = await app.loadAttachmentDecryptedBlob(att.id, att.type, contextKey);
                if (blob) {
                    mediaUrl = URL.createObjectURL(blob);
                    DB.activeMediaUrls[att.id] = mediaUrl;
                }
            }
        }

        if (!mediaUrl && !isError) mediaUrl = '#'; 
        
        let overlayHtml = '';
        if (isUploading) {
            overlayHtml = `
                <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-md z-50">
                    <i data-lucide="loader-2" class="w-8 h-8 text-indigo-400 animate-spin mb-2 drop-shadow-lg"></i>
                    <span class="text-[10px] font-bold text-white uppercase tracking-widest drop-shadow-md bg-gray-900/50 px-2 py-0.5 rounded-full border border-gray-700">Encrypting</span>
                </div>
            `;
        } else if (isError) {
            overlayHtml = `
                <div class="absolute inset-0 bg-red-900/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-md z-50">
                    <i data-lucide="alert-triangle" class="w-8 h-8 text-white mb-2"></i>
                    <span class="text-[10px] font-bold text-white uppercase tracking-widest text-center px-2">Encryption Failed</span>
                </div>
            `;
        }

        html += `<div class="relative inline-flex media-above-noise shadow-sm">`;
        html += overlayHtml;

        if (att.type.startsWith('image/') && !isHuge) {
            html += `<img src="${mediaUrl}" class="max-w-sm max-h-60 rounded-md border border-gray-600 object-contain ${isUploading ? 'opacity-70 pointer-events-none' : 'cursor-pointer transition-transform hover:scale-[1.02]'}" ${!isUploading && !isError ? `onclick="app.openLightbox('${mediaUrl}')"` : ''}>`;
        } else if (att.type.startsWith('video/') && !isHuge) {
            html += `<video src="${mediaUrl}" ${!isUploading && !isError ? 'controls preload="metadata"' : ''} class="max-w-sm max-h-60 rounded-md border border-gray-600 bg-black ${isUploading ? 'opacity-50 pointer-events-none' : ''}"></video>`;
        } else if (att.type.startsWith('audio/') && !isHuge) {
            html += `<audio src="${mediaUrl}" ${!isUploading && !isError ? 'controls preload="metadata"' : ''} class="w-full max-w-sm rounded-md ${isUploading ? 'opacity-50 pointer-events-none grayscale' : ''}"></audio>`;
        } else if (att.type === 'text/html' && !isHuge) {
            // Secure HTML Preview (Sandboxed iframe)
            html += `
                <div class="flex flex-col border border-gray-600 rounded-md overflow-hidden w-full max-w-2xl bg-gray-800">
                    <div class="flex items-center justify-between px-3 py-2 bg-gray-900/50 border-b border-gray-600">
                        <div class="flex items-center gap-2 min-w-0">
                            <i data-lucide="layout-template" class="w-4 h-4 text-orange-400"></i>
                            <span class="text-xs font-medium text-gray-300 truncate">${Utils.escapeHTML(att.name)}</span>
                        </div>
                        <a href="${!isUploading && !isError ? mediaUrl : '#'}" ${!isUploading && !isError ? `download="${att.name}"` : ''} class="text-gray-400 hover:text-white transition-colors" title="Download HTML">
                            <i data-lucide="download" class="w-4 h-4"></i>
                        </a>
                    </div>
                    <iframe src="${mediaUrl}" sandbox class="w-full h-80 bg-white ${isUploading ? 'opacity-50 pointer-events-none' : ''}"></iframe>
                </div>
            `;
        } else {
            const onclickAction = isHuge ? `onclick="event.preventDefault(); app.downloadLargeAttachment('${att.id}', '${Utils.escapeHTML(att.name)}');"` : '';
            const hrefAction = (!isHuge && !isUploading && !isError) ? `href="${mediaUrl}" download="${att.name}"` : `href="#"`;

            html += `
                <a ${hrefAction} ${onclickAction} class="flex items-center gap-3 bg-gray-800 border border-gray-600 p-3 rounded-md transition-colors w-64 text-white ${isUploading || isError ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-700'} cursor-pointer">
                    <div class="p-2 bg-indigo-500/20 text-indigo-400 rounded"><i data-lucide="file" class="w-6 h-6"></i></div>
                    <div class="flex-1 min-w-0">
                        <div class="text-sm font-medium truncate">${Utils.escapeHTML(att.name)}</div>
                        <div class="text-xs ${isHuge ? 'text-yellow-500 font-bold' : 'text-gray-400'}">${Utils.formatBytes(att.size)} ${isHuge ? '(Stream Download)' : ''}</div>
                    </div>
                </a>`;
        }
        
        html += `</div>`;
    }
    html += '</div>';
    return html;
};