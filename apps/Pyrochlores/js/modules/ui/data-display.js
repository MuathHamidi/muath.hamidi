/* js/modules/ui/data-display.js */
export function renderParsedTable(logText) {
    const container = document.getElementById('view-parsed');
    if(!container) return;

    if (!logText || logText.startsWith("No matching") || logText.startsWith("Log data missing")) {
        container.innerHTML = '<div class="empty-state-panel">No data available</div>';
        return;
    }
    const lines = logText.split('\n');
    let tableHtml = '<table class="data-table">';
    let found = false;
    const kvRegex = /^([^:=]+)[:=]\s*(.+)$/;
    lines.forEach(line => {
        const cleanLine = line.trim();
        if (cleanLine.startsWith('=') || cleanLine.startsWith('FILE:')) return;
        const match = cleanLine.match(kvRegex);
        if (match) {
            found = true;
            tableHtml += `<tr><td class="key-col">${match[1].trim()}</td><td class="val-col">${match[2].trim()}</td></tr>`;
        }
    });
    tableHtml += '</table>';
    if (!found) {
        container.innerHTML = '<div class="empty-state-panel">Raw text format. Check "Raw Text" tab.</div>';
    } else {
        container.innerHTML = `
            <div style="padding:10px; text-align:right;">
                <button class="copy-btn-small" onclick="navigator.clipboard.writeText(\`${logText.replace(/`/g, '\\`')}\`)">Copy Data</button>
            </div>
            ${tableHtml}`;
    }
}