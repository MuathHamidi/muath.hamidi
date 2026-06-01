// UI Elements
const inputEl = document.getElementById('bibInput');
const formattedOutputEl = document.getElementById('formattedOutput');
const cmdCiteEl = document.getElementById('cmdCite');
const renderPreviewEl = document.getElementById('renderPreview');
const stripFieldsEl = document.getElementById('stripFields');
const citationStyleEl = document.getElementById('citationStyle');
const entryCountEl = document.getElementById('entryCount');
const previewTitleEl = document.getElementById('previewTitle');
const fileImportEl = document.getElementById('fileImport');

// --- Event Listeners ---
inputEl.addEventListener('input', debounce(processInput, 300));
stripFieldsEl.addEventListener('change', processInput);
citationStyleEl.addEventListener('change', processInput);

document.getElementById('btnClear').addEventListener('click', clearInput);
document.getElementById('btnDemo').addEventListener('click', pasteDemo);

// Export / Import
document.getElementById('btnDownload').addEventListener('click', exportBibTeX);
document.getElementById('btnCopySource').addEventListener('click', () => copyToClipboard('formattedOutput'));
document.getElementById('btnCopyCmd').addEventListener('click', () => copyToClipboard('cmdCite'));
document.getElementById('btnCopyPreview').addEventListener('click', copyPreviewText);

fileImportEl.addEventListener('change', handleFileImport);

// --- Core Logic ---

let currentFormattedBib = ""; 

function processInput() {
    let raw = inputEl.value;
    
    // Basic UI Reset
    if (!raw.trim()) {
        resetUI();
        return;
    }

    // 1. Sanitize
    raw = raw.replace(/[\uFEFF\u00A0\u200B]/g, ' ');
    raw = raw.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');

    try {
        const entries = parseBibTeXEntries(raw);
        
        // Update Count
        entryCountEl.innerText = `${entries.length} entries`;
        entryCountEl.classList.remove('hidden');

        if (entries.length > 0) {
            updateUI(entries);
        } else {
            formattedOutputEl.innerHTML = `<span class="text-red-500 dark:text-red-400 font-medium code-font">// Error: No valid entries found. Check syntax.</span>`;
        }
    } catch (e) {
        console.error(e);
    }
}

function updateUI(entries) {
    const shouldStrip = stripFieldsEl.checked;
    const style = citationStyleEl.value;

    // 1. Formatted Source
    const formatted = entries.map(e => formatBibTeX(e, shouldStrip)).join('\n\n');
    currentFormattedBib = formatted; // Save for export
    formattedOutputEl.innerHTML = highlightBibTeX(formatted);

    // 2. Commands
    const keys = entries.map(e => e.key).join(',');
    cmdCiteEl.innerText = `\\cite{${keys}}`;

    // 3. Render Preview (Poly-style)
    previewTitleEl.innerText = `${citationStyleEl.options[citationStyleEl.selectedIndex].text} Preview`;
    renderPreviewEl.innerHTML = renderCitations(entries, style);
}

function handleFileImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        inputEl.value = e.target.result;
        processInput();
    };
    reader.readAsText(file);
    // Reset so same file can be selected again
    fileImportEl.value = '';
}

function exportBibTeX() {
    if (!currentFormattedBib) {
        showToast("Nothing to export!");
        return;
    }
    downloadFile(currentFormattedBib, "references.bib");
}

function copyPreviewText() {
    // We need to copy the *text content* of the rendered HTML, not the HTML tags
    // But we want to preserve newlines between citations
    const text = renderPreviewEl.innerText;
    copyText(text);
}

function resetUI() {
    formattedOutputEl.innerHTML = '<span class="text-slate-400 dark:text-slate-600 italic">// Formatted BibTeX will appear here...</span>';
    cmdCiteEl.innerText = '\\cite{...}';
    renderPreviewEl.innerHTML = '<div class="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 italic font-sans gap-2"><i class="fa-solid fa-arrow-left text-xl opacity-50"></i><p>Paste BibTeX to generate citations</p></div>';
    entryCountEl.classList.add('hidden');
    currentFormattedBib = "";
}

function clearInput() {
    inputEl.value = '';
    inputEl.focus();
    processInput();
}

function pasteDemo() {
    inputEl.value = `@article{CIF_FARMER201463,
  title = {Structural and crystal chemical properties of rare-earth titanate pyrochlores},
  journal = {Journal of Alloys and Compounds},
  volume = {605},
  pages = {63-70},
  year = {2014},
  doi = {10.1016/j.jallcom.2014.03.153},
  author = {J. Matt Farmer and Lynn A. Boatner and Bryan C. Chakoumakos}
}

@book{knuth1984texbook,
  title={The TeXbook},
  author={Knuth, Donald Ervin},
  year={1984},
  publisher={Addison-Wesley},
  address={Reading, Massachusetts}
}`;
    processInput();
}