import Utils from '../../../utils.js';

export const getMessageHtml = (msg, sender, isMe, formattedHtml, attachmentsHtml, isGrouped) => {
    const editedTag = msg.edited ? `<span class="text-[10px] text-gray-500 ml-2 select-none font-medium">(edited)</span>` : '';
    const timeOnly = new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    // z-[46] forces hover actions above the z-[45] texture noise layer
    const hoverActions = isMe ? `
        <div class="absolute -top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-gray-800/95 backdrop-blur-md border border-gray-600 rounded-lg shadow-xl flex z-[46] translate-y-2 group-hover:translate-y-0 overflow-hidden">
            <button onclick="app.startEditMessage('${msg.id}')" class="px-2.5 py-1.5 text-gray-400 hover:text-indigo-400 hover:bg-gray-700 transition-colors flex items-center gap-1.5 text-xs font-semibold" title="Edit Message">
                <i data-lucide="pen-line" class="w-3.5 h-3.5"></i>
            </button>
            <div class="w-px bg-gray-700 my-1"></div>
            <button onclick="app.deleteMessage('${msg.id}')" class="px-2.5 py-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors flex items-center gap-1.5 text-xs font-semibold" title="Delete Message">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
        </div>` : '';

    // Removed the "animate-fade-in" class from message wrappers because animation creates a stacking context trap in the browser
    if (isGrouped) {
        return `
        <div class="flex gap-4 group hover:bg-gray-800/40 -mx-4 px-4 py-0.5 transition-colors relative msg-group-hover">
            <div class="w-10 flex-shrink-0 text-right opacity-0 msg-timestamp text-[10px] font-medium text-gray-500 mt-1 select-none leading-relaxed transition-opacity">${timeOnly}</div>
            <div class="flex-1 min-w-0">
                <div class="text-gray-200 break-words whitespace-pre-wrap leading-[1.6]">${formattedHtml}${editedTag}</div>
                ${attachmentsHtml}
            </div>
            ${hoverActions}
        </div>`;
    } else {
        return `
        <div class="flex gap-4 group hover:bg-gray-800/40 -mx-4 px-4 py-1.5 mt-4 rounded transition-colors relative">
            <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center font-bold text-white uppercase shrink-0 mt-0.5 select-none shadow-md">
                ${sender.nickname.charAt(0)}
            </div>
            <div class="flex-1 min-w-0">
                <div class="flex items-baseline gap-2 mb-0.5">
                    <span class="font-bold text-gray-100 cursor-pointer hover:underline decoration-2 underline-offset-2">${Utils.escapeHTML(sender.nickname)}</span>
                    <span class="text-[11px] font-medium text-gray-400 select-none">${Utils.formatDate(msg.timestamp)}</span>
                </div>
                <div class="text-gray-200 break-words whitespace-pre-wrap leading-[1.6]">${formattedHtml}${editedTag}</div>
                ${attachmentsHtml}
            </div>
            ${hoverActions}
        </div>`;
    }
};