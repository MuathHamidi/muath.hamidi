import { app } from '../core.js';
import DB from '../../db.js';

app.enableChatInput = () => {
    const input = document.getElementById('message-input');
    const btn = document.getElementById('send-btn');
    const search = document.getElementById('chat-search');
    
    let placeholder = "Message...";
    if (DB.currentContext.type === 'home') placeholder = "Message DM...";
    else if (DB.currentChannel) {
        const ch = DB.servers[DB.currentContext.id].channels.find(c => c.id === DB.currentChannel);
        if(ch) placeholder = `Message #${ch.name}`;
    }
    
    if(!app.editingMsgId) input.placeholder = placeholder;
    input.disabled = false;
    btn.disabled = false;
    search.disabled = false;
};

app.disableChatInput = () => {
    const input = document.getElementById('message-input');
    const btn = document.getElementById('send-btn');
    const search = document.getElementById('chat-search');
    
    input.placeholder = "Select a channel to chat";
    input.disabled = true;
    btn.disabled = true;
    search.disabled = true;
    search.value = '';
    input.value = '';
    input.style.height = 'auto'; // Reset textarea height
};