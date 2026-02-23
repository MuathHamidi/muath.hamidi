import { app } from '../../core.js';
import Utils from '../../../utils.js';
import SecureCrypto from '../../../crypto.js';
import DB from '../../../db.js';
import { getAttachmentsHtml } from './attachments.js';
import { getMessageHtml } from './item.js';

app.renderMessages = async (maintainScroll = false) => {
    // Tracking token to prevent async overlap
    app.renderId++;
    const myRenderId = app.renderId;

    const container = document.getElementById('messages-container');
    const channelToRender = DB.currentChannel; 
    
    // Track scroll position for seamless background updates
    const isScrolledToBottom = container.scrollHeight - container.clientHeight <= container.scrollTop + 50;
    
    const msgs = DB.messages[DB.currentChannel] || [];
    
    if (msgs.length === 0) {
        if (myRenderId !== app.renderId || DB.currentChannel !== channelToRender) return;
        
        // Contextual Empty States
        let title = "Beginning of E2E Encrypted History";
        let subtext = "Messages and media sent here are mathematically locked.";
        let icon = "shield-check";
        
        if (DB.currentContext.type === 'home') {
            title = "Encrypted Direct Message";
            subtext = "Your private conversations are secured with RSA-2048 and AES-256-GCM.";
            icon = "lock";
        }

        container.innerHTML = `
            <div class="h-full flex items-center justify-center text-gray-400 flex-col gap-4 animate-fade-in">
                <div class="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700 shadow-xl">
                    <i data-lucide="${icon}" class="w-10 h-10 text-green-500"></i>
                </div>
                <div class="text-center">
                    <h3 class="text-white font-bold text-xl mb-1 tracking-tight">${title}</h3>
                    <p class="text-sm text-gray-500 max-w-sm">${subtext}</p>
                </div>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    // Get encryption key
    let contextId = DB.currentContext.type === 'home' ? DB.currentChannel : DB.currentContext.id;
    const contextKey = await app.getContextKey(DB.currentContext.type, contextId);

    let htmlStrings = [];
    let lastSenderId = null;
    let lastTimestamp = 0;

    for (const msg of msgs) {
        const sender = Object.values(DB.users).find(u => u.id === msg.senderId) || { nickname: 'Unknown', username: 'unknown' };
        const isMe = sender.id === DB.currentUser.id;
        
        // Decrypt Text
        let decryptedText = "[E2EE Locked]";
        if (contextKey && msg.text && msg.text.ct && msg.text.iv) {
            decryptedText = await SecureCrypto.decryptSymmetric(msg.text.ct, msg.text.iv, contextKey);
        }
        
        // Filter for Search Query
        if (app.searchQuery && !decryptedText.toLowerCase().includes(app.searchQuery.toLowerCase())) {
            continue;
        }

        const formattedHtml = Utils.formatMarkdown(decryptedText);

        let attachmentsHtml = '';
        if (msg.attachments && msg.attachments.length > 0) {
            attachmentsHtml = await getAttachmentsHtml(msg.attachments, contextKey);
        }

        // Check if message should be grouped
        const timeDiff = msg.timestamp - lastTimestamp;
        const isGrouped = !app.searchQuery && (msg.senderId === lastSenderId) && (timeDiff < 5 * 60 * 1000);
        
        htmlStrings.push(getMessageHtml(msg, sender, isMe, formattedHtml, attachmentsHtml, isGrouped));
        
        lastSenderId = msg.senderId;
        lastTimestamp = msg.timestamp;
    }
    
    // Prevent race conditions
    if (myRenderId !== app.renderId || DB.currentChannel !== channelToRender) return;

    if (htmlStrings.length === 0 && app.searchQuery) {
        container.innerHTML = `
            <div class="h-full flex items-center justify-center text-gray-400 flex-col gap-4 animate-fade-in">
                <div class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
                    <i data-lucide="search-x" class="w-8 h-8 text-indigo-400"></i>
                </div>
                <div class="text-center">
                    <h3 class="text-white font-bold text-lg mb-1">No results found</h3>
                    <p class="text-sm text-gray-500">We couldn't find any messages matching "${Utils.escapeHTML(app.searchQuery)}".</p>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = htmlStrings.join('');
    }
    
    lucide.createIcons();
    
    // Smooth scroll to bottom natively handled by CSS class scroll-smooth on the container if not jumping immediately
    if (!maintainScroll || isScrolledToBottom) {
        // Use requestAnimationFrame to ensure the DOM has painted before scrolling
        requestAnimationFrame(() => {
            container.scrollTop = container.scrollHeight;
        });
    }
};