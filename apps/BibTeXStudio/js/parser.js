function parseBibTeXEntries(str) {
    const entries = [];
    let cursor = 0;
    
    while (cursor < str.length) {
        const startIdx = str.indexOf('@', cursor);
        if (startIdx === -1) break;
        
        const entry = extractNextEntry(str, startIdx);
        if (entry) {
            entries.push(entry.data);
            cursor = entry.endIndex + 1;
        } else {
            cursor = startIdx + 1;
        }
    }
    return entries;
}

function extractNextEntry(str, startIdx) {
    // Regex handles @type { OR @type (
    const typeMatch = str.substring(startIdx).match(/^@(\w+)\s*([{(])/);
    if (!typeMatch) return null;
    
    const type = typeMatch[1].toLowerCase();
    const openChar = typeMatch[2];
    const closeChar = openChar === '{' ? '}' : ')';
    
    // Determine content body start
    const bodyStart = str.indexOf(openChar, startIdx) + 1;
    
    // Find balanced closing character
    let braceCount = 1;
    let endIdx = -1;
    
    for (let i = bodyStart; i < str.length; i++) {
        if (str[i] === openChar) braceCount++;
        else if (str[i] === closeChar) braceCount--;
        
        if (braceCount === 0) {
            endIdx = i;
            break;
        }
    }
    
    if (endIdx === -1) return null;

    const content = str.substring(bodyStart, endIdx);
    
    // Extract Key
    let firstComma = content.indexOf(',');
    let key = "";
    let fieldsRaw = "";

    if (firstComma === -1) {
        key = content.trim();
        fieldsRaw = "";
    } else {
        key = content.substring(0, firstComma).trim();
        fieldsRaw = content.substring(firstComma + 1);
    }

    // Parse Fields
    const fields = {};
    const kvPairs = [];
    let currentPair = '';
    let depth = 0;
    
    for (let char of fieldsRaw) {
        if (char === '{') depth++;
        if (char === '}') depth--;
        
        if (char === ',' && depth === 0) {
            if (currentPair.trim()) kvPairs.push(currentPair);
            currentPair = '';
        } else {
            currentPair += char;
        }
    }
    if (currentPair.trim()) kvPairs.push(currentPair);

    kvPairs.forEach(pair => {
        const eqIdx = pair.indexOf('=');
        if (eqIdx > -1) {
            const k = pair.substring(0, eqIdx).trim().toLowerCase();
            let v = pair.substring(eqIdx + 1).trim();
            
            // Cleanup Value: remove wrapping braces {} or quotes
            if ((v.startsWith('{') && v.endsWith('}')) || 
                (v.startsWith('"') && v.endsWith('"'))) {
                v = v.substring(1, v.length - 1);
            }
            
            // Fix DOI
            if (k === 'doi') {
                v = v.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '');
            }
            
            // Fix Pages: En-dash
            if (k === 'pages') {
                 v = v.replace(/(\d)\s?[–-]\s?(\d)/g, '$1--$2');
            }

            fields[k] = v;
        }
    });

    return { data: { type, key, fields }, endIndex: endIdx };
}