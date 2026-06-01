const STRIP_LIST = [
    'abstract', 'keywords', 'file', 'annote', 'read', 
    'mendeley-tags', 'review', 'issn', 'isbn', 'copyright', 
    'language', 'note', 'url'
];

function formatBibTeX(entry, stripExtra) {
    let keys = Object.keys(entry.fields);
    
    if (stripExtra) {
        keys = keys.filter(k => !STRIP_LIST.includes(k));
    }

    if (keys.length === 0) return `@${entry.type}{${entry.key},\n}`;
    
    const maxLen = Math.max(...keys.map(k => k.length));
    let out = `@${entry.type}{${entry.key},\n`;
    
    keys.forEach((k, index) => {
        const isLast = index === keys.length - 1;
        const spacing = ' '.repeat(maxLen - k.length);
        let val = entry.fields[k];
        val = val.replace(/\s+/g, ' ').trim();
        out += `  ${k}${spacing} = {${val}}${isLast ? '' : ','}\n`;
    });
    out += `}`;
    return out;
}

function highlightBibTeX(str) {
    return str
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/(@\w+)/g, '<span class="text-indigo-600 dark:text-indigo-400 font-bold">$1</span>')
        .replace(/^(\s*\w+)(\s*=)/gm, '<span class="text-sky-600 dark:text-sky-400">$1</span>$2')
        .replace(/(\{)(.*?)(\})/g, '$1<span class="text-emerald-600 dark:text-emerald-400">$2</span>$3');
}