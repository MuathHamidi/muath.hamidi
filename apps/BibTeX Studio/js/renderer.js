/**
 * js/renderer.js
 * Strictly formatted Citation Engines.
 * 
 * Verified against:
 * - APA 7th Edition
 * - MLA 9th Edition
 * - Chicago Manual of Style 17th Ed (Author-Date)
 * - IEEE Reference Guide
 * - APS (Physical Review Style)
 */

const CitationEngine = {
    
    // --- APA 7th Edition ---
    // Rules: List up to 20 authors. & before last.
    // Article: Title (plain), Journal (italic) Vol(italic)(Issue), pp-pp.
    // Book: Title (italic) (Publisher).
    apa: (e) => {
        const { authors, title, year, journal, publisher, doi, url, vol, num, pages } = parseCommonFields(e);
        
        // Author Formatting
        let authHtml = "";
        const limit = 20;
        const count = authors.length;

        if (count === 0) {
            authHtml = "Unknown.";
        } else if (count <= limit) {
            // List all
            const formatted = authors.map(a => `${a.last}, ${getInitials(a.first)}`);
            if (count === 1) authHtml = `${formatted[0]}.`;
            else if (count === 2) authHtml = `${formatted[0]}, & ${formatted[1]}.`;
            else {
                const last = formatted.pop();
                authHtml = `${formatted.join(', ')}, & ${last}.`;
            }
        } else {
            // > 20 authors: First 19 ... Last
            const first19 = authors.slice(0, 19).map(a => `${a.last}, ${getInitials(a.first)}`).join(', ');
            const last = authors[count - 1];
            authHtml = `${first19}, ... ${last.last}, ${getInitials(last.first)}.`;
        }

        // Source Formatting
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

        return `
            <div class="hanging-indent">
                ${authHtml} (${year}). 
                ${e.type === 'article' ? title : `<i>${title}</i>`}. 
                ${sourceHtml}
                ${formatLink(doi, url, 'apa')}
            </div>`;
    },

    // --- MLA 9th Edition ---
    // Rules: 1-2 authors listed. 3+ use "et al."
    // Article: "Title." Journal (italic) vol, no, Date, pp.
    mla: (e) => {
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
            // Books
            container = `${publisher}, ${year}.`;
        }

        return `
            <div class="hanging-indent">
                ${authHtml} "${title}." ${container} ${formatLink(doi, url, 'mla')}
            </div>`;
    },

    // --- Chicago 17th (Author-Date) ---
    // Rules: 1-3 authors listed. 4+ use "et al."
    // Year immediately follows author.
    // No "p." or "pp." for articles, colon used.
    chicago: (e) => {
        const { authors, title, year, journal, publisher, doi, url, vol, num, pages } = parseCommonFields(e);

        let authHtml = "";
        if (authors.length === 0) authHtml = "Unknown";
        else if (authors.length === 1) {
            authHtml = `${authors[0].last}, ${authors[0].first}`;
        } else if (authors.length <= 3) {
            // List all: Last, First, First Last, and First Last
            authHtml = `${authors[0].last}, ${authors[0].first}`;
            for(let i=1; i<authors.length; i++) {
                authHtml += `, and ${authors[i].first} ${authors[i].last}`;
            }
        } else {
            // 4+ authors: First et al.
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

        return `
            <div class="hanging-indent">
                ${authHtml}. ${year}. ${body} ${formatLink(doi, url, 'text')}
            </div>`;
    },

    // --- Harvard ---
    // Standard format: Last, Initials. (Year) 'Title'. Journal.
    harvard: (e) => {
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

        return `
            <div class="hanging-indent">
                ${authHtml} (${year}) ${body} ${doi ? 'Available at: doi:'+doi : ''}
            </div>`;
    },

    // --- IEEE ---
    // Rules: Initials First. 
    // > 6 authors: list first + et al.
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

        return `
            <div class="numbered-list">
                <span class="font-bold text-xs pt-1 select-none text-slate-500">[${index + 1}]</span>
                <div>${authHtml}, ${body} ${formatLink(doi, url, 'text')}</div>
            </div>`;
    },

    // --- APS (Physics) ---
    // Rules: Initials First. Journal Abbrev (we use full if not known).
    // Volume is BOLD. Year in Parens at end.
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
            // Phys. Rev. Lett. 99, 123 (2007).
            body = `${journal} <b>${vol || ''}</b>, ${pages || ''} (${year}).`;
        } else {
            body = `<i>${title}</i> (${publisher}, ${year}).`;
        }

        return `
            <div class="numbered-list">
                <span class="font-bold text-xs pt-1 select-none text-slate-500">[${index + 1}]</span>
                <div>${authHtml}, ${body} ${formatLink(doi, url, 'text')}</div>
            </div>`;
    }
};

// --- Utilities for Renderer ---

function parseCommonFields(e) {
    const f = e.fields;
    
    // Safety sanitizer
    const clean = (str) => {
        if(!str) return "";
        // Remove TeX commands
        let s = str.replace(/[\{\}]/g, '').replace(/\\/g, '');
        // Escape HTML
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
    // Sanitize invisible chars
    authorStr = authorStr.replace(/\u00A0/g, ' ');
    
    // Split by 'and'
    const parts = authorStr.split(/\s+and\s+/i);
    
    return parts.map(p => {
        // Clean
        p = p.trim();
        if (p.includes(',')) {
            // "Einstein, Albert"
            const [last, first] = p.split(',').map(s => s.trim());
            return { first: first || '', last: last || '' };
        } else {
            // "Albert Einstein"
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

function formatLink(doi, url, style) {
    if (!doi && !url) return "";
    
    // Clean DOI
    const cleanDoi = doi.replace(/^https?:\/\/doi\.org\//, '');
    const doiLink = `https://doi.org/${cleanDoi}`;
    
    if (doi) {
        // APA requires full URL. MLA often just DOI.
        return `<span class="break-all text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer" onclick="window.open('${doiLink}')">${doiLink}</span>`;
    }
    return `<span class="break-all text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer" onclick="window.open('${url}')">${url}</span>`;
}

// Main Render Function
function renderCitations(entries, styleKey) {
    const engine = CitationEngine[styleKey] || CitationEngine['apa'];
    return entries.map((e, index) => engine(e, index)).join('');
}