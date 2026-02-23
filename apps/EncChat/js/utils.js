const Utils = {
    generateId: () => Math.random().toString(36).substring(2, 15),
    escapeHTML: (str) => {
        if (!str) return '';
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[tag]));
    },
    formatDate: (timestamp) => {
        const date = new Date(timestamp);
        const today = new Date();
        if (date.toDateString() === today.toDateString()) {
            return `Today at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        }
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    },
    showToast: (message, type = 'info') => {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        const colors = {
            error: 'bg-red-500/90 border-red-400',
            success: 'bg-green-600/90 border-green-400',
            info: 'bg-indigo-600/90 border-indigo-400'
        };
        toast.className = `${colors[type]} backdrop-blur-md border text-white px-4 py-3 rounded-lg shadow-2xl transform transition-all duration-300 translate-x-full flex items-center gap-3 z-50`;
        
        const iconMap = { error: 'alert-circle', success: 'check-circle', info: 'info' };
        toast.innerHTML = `<i data-lucide="${iconMap[type]}" class="w-5 h-5 shrink-0"></i><span class="text-sm font-medium tracking-wide">${Utils.escapeHTML(message)}</span>`;
        
        container.appendChild(toast);
        lucide.createIcons();
        
        // Animate in
        requestAnimationFrame(() => {
            toast.classList.remove('translate-x-full');
        });

        // Remove after 3s
        setTimeout(() => {
            toast.classList.add('opacity-0', 'scale-95');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },
    formatBytes: (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024, dm = decimals < 0 ? 0 : decimals, sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },
    formatMarkdown: (text) => {
        if (!text) return '';
        let html = Utils.escapeHTML(text);
        
        // Headings (# Heading)
        html = html.replace(/^###\s+(.*)/gm, '<h3 class="text-lg font-bold text-gray-100 mt-2 mb-1">$1</h3>');
        html = html.replace(/^##\s+(.*)/gm, '<h2 class="text-xl font-bold text-gray-100 mt-2 mb-1">$1</h2>');
        html = html.replace(/^#\s+(.*)/gm, '<h1 class="text-2xl font-bold text-gray-100 mt-2 mb-1">$1</h1>');
        
        // Blockquotes (> text)
        html = html.replace(/^&gt;\s+(.*)/gm, '<blockquote class="md-blockquote">$1</blockquote>');
        // Bold (**text**)
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-100 font-bold">$1</strong>');
        // Italic (*text*)
        html = html.replace(/\*(.*?)\*/g, '<em class="text-gray-300 italic">$1</em>');
        // Strikethrough (~~text~~)
        html = html.replace(/~~(.*?)~~/g, '<del class="text-gray-500 decoration-gray-500">$1</del>');
        // Code blocks (```code```)
        html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900/80 p-3 rounded-lg mt-2 text-sm text-indigo-300 overflow-x-auto border border-gray-700 font-mono whitespace-pre-wrap shadow-inner"><code>$1</code></pre>');
        // Inline code (`code`)
        html = html.replace(/`(.*?)`/g, '<code class="bg-gray-900 text-indigo-300 px-1.5 py-0.5 rounded font-mono text-sm border border-gray-700 shadow-sm">$1</code>');
        // Named Links ([text](url))
        html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" class="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">$1</a>');
        // Auto-linking raw URLs (not already inside an anchor tag)
        html = html.replace(/(^|\s)(https?:\/\/[^\s]+)/g, '$1<a href="$2" target="_blank" class="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors break-all">$2</a>');
        // Line breaks
        html = html.replace(/\n/g, '<br>');
        return html;
    }
};

export default Utils;