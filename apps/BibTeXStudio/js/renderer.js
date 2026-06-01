/**
 * js/renderer.js
 * Strictly formatted Citation Engines.
 * Updated: ALL styles now use numbered lists [1], [2], etc.
 */

const CitationEngine = {
    
    // --- APA 7th Edition ---
    apa: (e, index) => {
        const { authors, title, year, journal, publisher, doi, url, vol, num, pages } = parseCommonFields(e);
        
        let authHtml = formatAuthorsAPA(authors);

        let sourceHtml = "";
        if (e.type === 'article') {
            sourceHtml = `<i>${journal}</i>`;
            if (vol) sourceHtml += `, <i>${vol}</i>`;
            if (num) sourceHtml += `(${num})`;
            if (pages) sourceHtml += `, ${pages}`;
        } else {
            if (journal) sourceHtml += `In <i>${journal}</i>`;
            if (pages) sourceHtml += ` (pp. ${pages})`;
            if (publisher) sourceHtml += (sourceHtml ? `. ` : ``) + publisher;
        }
        if (sourceHtml && !sourceHtml.endsWith('.')) sourceHtml += '.';

        const content = `${authHtml} (${year}). ${e.type === 'article' ? title : `<i>${title}</i>`}. ${sourceHtml} ${formatLink(doi, url, 'apa')}`;
        return wrapNumbered(index, content);
    },

    // --- MLA 9th Edition ---
    mla: (e, index) => {
        const { authors, title, year, journal, publisher, doi, url, vol, num, pages } = parseCommonFields(e);
        
        let authHtml = "";
        if (authors.length === 1) {
            authHtml = `${authors[0].last}, ${authors[0].first}.`;
        } else if (authors.length === 2) {
            authHtml = `${authors[0].last}, ${authors[0].first}, and ${authors[1].first} ${authors[1].last}.`;
        } else if (authors.length >= 3) {
            authHtml = `${authors[0].last}, ${authors[0].first}, et al.`;
        } else {
            authHtml = "Unknown.";
        }

        let container = "";
        if (e.type === 'article' && journal) {
            container = `<i>${journal}</i>`;
            if(vol) container += `, vol. ${vol}`;
            if(num) container += `, no. ${num}`;
            container += `, ${year}`;
            if(pages) container += `, pp. ${pages}`;
            container += `.`;
        } else {
            container = `${publisher}, ${year}.`;
        }

        const content = `${authHtml} "${title}." ${container} ${formatLink(doi, url, 'mla')}`;
        return wrapNumbered(index, content);
    },

    // --- Chicago 17th (Author-Date) ---
    chicago: (e, index) => {
        const { authors, title, year, journal, publisher, doi, url, vol, num, pages } = parseCommonFields(e);

        let authHtml = "";
        if (authors.length === 0) authHtml = "Unknown";
        else if (authors.length === 1) {
            authHtml = `${authors[0].last}, ${authors[0].first}`;
        } else if (authors.length <= 3) {
            authHtml = `${authors[0].last}, ${authors[0].first}`;
            for(let i=1; i<authors.length; i++) {
                authHtml += `, and ${authors[i].first} ${authors[i].last}`;
            }
        } else {
            authHtml = `${authors[0].last}, ${authors[0].first}, et al.`;
        }

        let body = "";
        if (e.type === 'article') {
            body = `"${title}." <i>${journal}</i> ${vol || ''}`;
            if(num) body += `, no. ${num}`;
            if(pages) body += `: ${pages}`;
            body += `.`;
        } else {
            body = `<i>${title}</i>. ${publisher}.`;
        }

        const content = `${authHtml}. ${year}. ${body} ${formatLink(doi, url, 'text')}`;
        return wrapNumbered(index, content);
    },

    // --- Harvard ---
    harvard: (e, index) => {
        const { authors, title, year, journal, publisher, doi, url, vol, num, pages } = parseCommonFields(e);
        
        let authHtml = "";
        authors.forEach((a, i) => {
            let initials = getInitials(a.first);
            authHtml += `${a.last}, ${initials}`;
            if (i < authors.length - 2) authHtml += ', ';
            else if (i === authors.length - 2) authHtml += ' and ';
        });
        if(!authHtml) authHtml = "Unknown";

        let body = "";
        if (e.type === 'article') {
            body = `'${title}', <i>${journal}</i>, ${vol || ''}`;
            if(num) body += `(${num})`;
            if(pages) body += `, pp. ${pages}`;
            body += `.`;
        } else {
            body = `<i>${title}</i>. ${publisher}.`;
        }

        const content = `${authHtml} (${year}) ${body} ${doi ? 'Available at: doi:'+doi : ''}`;
        return wrapNumbered(index, content);
    },

    // --- IEEE ---
    ieee: (e, index) => {
        const { authors, title, year, journal, publisher, doi, url, vol, num, pages } = parseCommonFields(e);
        
        let authHtml = "";
        if (authors.length > 6) {
            authHtml = `${getInitials(authors[0].first)} ${authors[0].last} <i>et al.</i>`;
        } else {
            authors.forEach((a, i) => {
                let initials = getInitials(a.first);
                authHtml += `${initials} ${a.last}`;
                if (i < authors.length - 1) authHtml += ', ';
            });
        }

        let body = "";
        if (e.type === 'article') {
            body = `"${title}," <i>${journal}</i>, vol. ${vol || ''}, no. ${num || ''}, pp. ${pages || ''}, ${year}.`;
        } else {
            body = `<i>${title}</i>, ${publisher}, ${year}.`;
        }

        const content = `${authHtml}, ${body} ${formatLink(doi, url, 'text')}`;
        return wrapNumbered(index, content);
    },

    // --- APS (Physics) ---
    aps: (e, index) => {
        const { authors, title, year, journal, publisher, doi, url, vol, num, pages } = parseCommonFields(e);

        let authHtml = "";
        authors.forEach((a, i) => {
            let initials = getInitials(a.first);
            authHtml += `${initials} ${a.last}`;
            if (i < authors.length - 1) authHtml += ', ';
        });

        let body = "";
        if (e.type === 'article') {
            body = `${journal} <b>${vol || ''}</b>, ${pages || ''} (${year}).`;
        } else {
            body = `<i>${title}</i> (${publisher}, ${year}).`;
        }

        const content = `${authHtml}, ${body} ${formatLink(doi, url, 'text')}`;
        return wrapNumbered(index, content);
    }
};

// --- Helper Functions ---

function wrapNumbered(index, content) {
    return `
        <div class="numbered-list">
            <span class="font-bold text-xs pt-1 select-none text-slate-500 min-w-[24px] text-right mr-2">[${index + 1}]</span>
            <div>${content}</div>
        </div>`;
}

function parseCommonFields(e) {
    const f = e.fields;
    
    const clean = (str) => {
        if(!str) return "";
        let s = str.replace(/[\{\}]/g, '').replace(/\\/g, '');
        return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };

    const authors = parseAuthors(f.author || "Unknown");
    const title = clean(f.title || "Untitled");
    const year = f.year || "n.d.";
    const journal = clean(f.journal || f.booktitle || f.series || "");
    const publisher = clean(f.publisher || f.organization || f.school || "");
    const doi = f.doi || "";
    const url = f.url || "";
    const vol = f.volume || "";
    const num = f.number || "";
    const pages = f.pages || "";

    return { authors, title, year, journal, publisher, doi, url, vol, num, pages };
}

function parseAuthors(authorStr) {
    authorStr = authorStr.replace(/\u00A0/g, ' ');
    const parts = authorStr.split(/\s+and\s+/i);
    return parts.map(p => {
        p = p.trim();
        if (p.includes(',')) {
            const [last, first] = p.split(',').map(s => s.trim());
            return { first: first || '', last: last || '' };
        } else {
            const words = p.split(/\s+/);
            const last = words.pop() || "";
            const first = words.join(' ');
            return { first, last };
        }
    });
}

function getInitials(name) {
    if (!name) return "";
    return name.split(/[\s-]+/)
               .map(n => n[0].toUpperCase() + ".")
               .join(" ");
}

function formatAuthorsAPA(authors) {
    const limit = 20;
    const count = authors.length;
    if (count === 0) return "Unknown.";
    
    if (count <= limit) {
        const formatted = authors.map(a => `${a.last}, ${getInitials(a.first)}`);
        if (count === 1) return `${formatted[0]}.`;
        if (count === 2) return `${formatted[0]}, & ${formatted[1]}.`;
        const last = formatted.pop();
        return `${formatted.join(', ')}, & ${last}.`;
    } else {
        const first19 = authors.slice(0, 19).map(a => `${a.last}, ${getInitials(a.first)}`).join(', ');
        const last = authors[count - 1];
        return `${first19}, ... ${last.last}, ${getInitials(last.first)}.`;
    }
}

function formatLink(doi, url, style) {
    if (!doi && !url) return "";
    const cleanDoi = doi.replace(/^https?:\/\/doi\.org\//, '');
    const doiLink = `https://doi.org/${cleanDoi}`;
    
    if (doi) {
        return `<span class="break-all text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer" onclick="window.open('${doiLink}')">${doiLink}</span>`;
    }
    return `<span class="break-all text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer" onclick="window.open('${url}')">${url}</span>`;
}

// Main Render Function
function renderCitations(entries, styleKey) {
    const engine = CitationEngine[styleKey] || CitationEngine['apa'];
    return entries.map((e, index) => engine(e, index)).join('');
}