// Core UI Controller and State Machine for the muSR_Workflow application.
// Manages timeline steps, tab categories, download triggers, copy events, and layout updates.

// SVGs for modern dashboard styling
const icons = {
    code: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
    terminal: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>',
    copy: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    book: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
    tool: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>',
    download: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
    cpu: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>',
    cube3d: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
    chart: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>',
    folder: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',
    fileText: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>'
};

// Application state variables
let activeId = 'intro';
let activeTab = 'overview';
let activeLogFilename = null;
let currentMagState = 'AFM';
let activePreviewFile = null;
let activeBranch = 'edge_jitter1';

// Comparison Matrix Pagination & Sorting state
let comparisonPage = 0;
const ROWS_PER_PAGE = 10;
let comparisonSearchQuery = "";
let comparisonSortKey = ""; // "energy", "bc", "bdip", "distortion"
let comparisonSortOrder = "asc"; // "asc" or "desc"

// Cache for fetched file contents
const previewCache = {};

// Global logs safeguard
const logsData = typeof DYNAMIC_LOGS !== 'undefined' ? DYNAMIC_LOGS : {};

// Adaptive path resolver for HTML file execution contexts (root vs muSR/)
function getRelativeFilePath(relativePath) {
    const inSubdir = window.location.pathname.includes('/muSR/');
    if (inSubdir) {
        if (relativePath.startsWith('muSR/')) {
            return relativePath.substring(5);
        }
        if (relativePath.startsWith('CeIn3/')) {
            return '../' + relativePath;
        }
        return relativePath;
    } else {
        if (!relativePath.startsWith('muSR/') && !relativePath.startsWith('CeIn3/')) {
            return 'muSR/' + relativePath;
        }
        return relativePath;
    }
}

function getLogUrl(filename, branchId) {
    if (filename === 'pipeline_master.log') {
        return 'muSR/logs/pipeline_master.log';
    }
    const isShared = typeof DYNAMIC_SHARED_LOGS !== 'undefined' && DYNAMIC_SHARED_LOGS[filename];
    if (isShared) {
        return `muSR/logs/shared/${filename}`;
    }
    return `muSR/logs/${branchId}/${filename}`;
}

// Retrieve file contents for inline preview (scripts, reports, logs, CIFs)
function getFileContent(file, stepData) {
    if (file.scriptIndex !== undefined) {
        return stepData.scripts[file.scriptIndex].code;
    }
    if (file.inlineKey) {
        if (file.inlineKey === 'DYNAMIC_CANDIDATES_REPORT') {
            return typeof DYNAMIC_CANDIDATES_REPORT !== 'undefined' ? DYNAMIC_CANDIDATES_REPORT : 'No candidates report content found.';
        }
        
        // Dynamic fetch of logs or CIF files on-demand
        const resolvedPath = getRelativeFilePath(file.path || getLogUrl(file.inlineKey, activeBranch));
        if (previewCache[resolvedPath] !== undefined) {
            return previewCache[resolvedPath];
        }
        
        // Trigger asynchronous fetch
        previewCache[resolvedPath] = "Loading content from server...";
        fetch(resolvedPath)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.text();
            })
            .then(text => {
                previewCache[resolvedPath] = text;
                render();
            })
            .catch(err => {
                previewCache[resolvedPath] = `Failed to load file from path: ${resolvedPath}\nError: ${err.message}`;
                render();
            });
            
        return previewCache[resolvedPath];
    }
    return null;
}

// Pagination and sorting update functions
function setComparisonPage(page) {
    comparisonPage = page;
    render();
}

function setComparisonSearch(query) {
    comparisonSearchQuery = query;
    comparisonPage = 0; // Reset page to first
    render();
}

function toggleComparisonSort(key) {
    if (comparisonSortKey === key) {
        comparisonSortOrder = comparisonSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        comparisonSortKey = key;
        comparisonSortOrder = 'asc';
    }
    render();
}


// Set or toggle active file preview
function setPreviewFile(filePath) {
    if (activePreviewFile === filePath) {
        activePreviewFile = null;
    } else {
        activePreviewFile = filePath;
    }
    render();
}

// Helper functions for calculation logs
function getLogsForStep(step) {
    if (!step.log_prefixes) return [];
    const stepLogs = [];
    const bid = activeBranch;
    
    const activeBranchLogs = (typeof DYNAMIC_BRANCH_LOGS !== 'undefined' && DYNAMIC_BRANCH_LOGS[bid]) ? DYNAMIC_BRANCH_LOGS[bid] : {};
    const sharedLogs = typeof DYNAMIC_SHARED_LOGS !== 'undefined' ? DYNAMIC_SHARED_LOGS : {};
    
    const combined = {};
    Object.assign(combined, sharedLogs);
    Object.assign(combined, activeBranchLogs);
    
    Object.keys(combined).forEach(key => {
        step.log_prefixes.forEach(prefix => {
            if (key.startsWith(prefix)) {
                stepLogs.push({
                    filename: key,
                    content: combined[key]
                });
            }
        });
    });
    stepLogs.sort((a, b) => {
        const aIndex = step.log_prefixes.findIndex(p => a.filename.startsWith(p));
        const bIndex = step.log_prefixes.findIndex(p => b.filename.startsWith(p));
        if (aIndex !== bIndex) return aIndex - bIndex;
        return a.filename.localeCompare(b.filename);
    });
    return stepLogs;
}

function getExpectedLogFilenames(step) {
    if (!step.log_prefixes) return [];
    return step.log_prefixes.map(prefix => {
        if (prefix === 'pipeline_master') return 'pipeline_master.log';
        return `${prefix}.log`;
    });
}

function updateProgressBar() {
    const index = steps.findIndex(s => s.id === activeId);
    const percentage = ((index + 1) / steps.length) * 100;
    document.getElementById('progress-bar').style.width = `${percentage}%`;
}

function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    let html = '<div class="timeline-line"></div>';
    steps.forEach((s, idx) => {
        if (idx === 3) {
            html += `
            <div class="timeline-fork-node flex items-center px-4 py-2 mb-3 bg-blue-950/20 border border-blue-500/10 rounded-xl relative z-10 mx-2">
                <span class="text-[9px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
                    Workflow Fork
                </span>
            </div>`;
        }
        const isActive = activeId === s.id;
        html += `
        <div class="timeline-item relative pb-4 z-10">
            <button onclick="setActiveStep('${s.id}')" class="w-full text-left flex items-center p-3 rounded-2xl transition-all duration-300 ${isActive ? 'bg-slate-900 border border-blue-500/30 shadow-lg translate-x-2' : 'hover:bg-slate-900/40'}">
                <div class="w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold ${isActive ? 'bg-blue-500/20 border-blue-400 text-blue-400 shadow-md' : 'bg-[#05070c] border-slate-800 text-slate-500'}">
                    ${idx}
                </div>
                <div class="ml-4 flex-grow">
                    <h4 class="font-bold text-sm leading-tight ${isActive ? 'text-white' : 'text-slate-400'}">${s.title}</h4>
                </div>
            </button>
        </div>`;
    });
    sidebar.innerHTML = html;
}

function setActiveStep(id) { 
    activeId = id; 
    activeTab = 'overview'; 
    activeLogFilename = null;
    activePreviewFile = null;
    render(); 
}

function setActiveTab(tab) { 
    activeTab = tab; 
    render(); 
}

function setActiveLogFile(filename) {
    activeLogFilename = filename;
    render();
}

function setMagState(state) { 
    currentMagState = state; 
    render(); 
}

function copy(text, btn) {
    navigator.clipboard.writeText(text);
    const old = btn.innerHTML;
    btn.innerHTML = `<div class="flex items-center gap-1 text-emerald-400">${icons.check}<span class="text-xs font-bold">Copied</span></div>`;
    setTimeout(() => btn.innerHTML = old, 2000);
}

function downloadScript(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

const branchedStepIds = ['step3', 'distortion', 'step4', 'step5', 'summary'];

function switchBranch(branchId) {
    activeBranch = branchId;
    if (typeof updateDynamicResults === 'function') {
        updateDynamicResults(branchId);
    }
    activePreviewFile = null;
    render();
}

function getComparisonTableHtml() {
    if (typeof DYNAMIC_BRANCH_RESULTS === 'undefined') {
        return `<div class="p-4 bg-slate-900/40 text-slate-400 text-xs rounded-xl border border-slate-800">Branching comparison data not compiled yet. Please run the master pipeline.</div>`;
    }
    
    const defaultBranches = [
        { id: "edge_jitter1", label: "Edge-Center (Jitter A)" },
        { id: "edge_exact", label: "Edge-Center (Exact)" },
        { id: "edge_jitter2", label: "Edge-Center (Jitter B)" },
        { id: "body_jitter", label: "Body-Center (Jitter)" },
        { id: "body_exact", label: "Body-Center (Exact)" }
    ];
    let list = (typeof DYNAMIC_BRANCHES !== 'undefined' && DYNAMIC_BRANCHES.length > 0) ? DYNAMIC_BRANCHES : defaultBranches;
    
    // 1. Filter by Search Query
    if (comparisonSearchQuery) {
        const query = comparisonSearchQuery.toLowerCase();
        list = list.filter(b => b.label.toLowerCase().includes(query) || b.id.toLowerCase().includes(query));
    }
    
    // 2. Sort by selected Key
    if (comparisonSortKey) {
        list.sort((a, b) => {
            const resA = DYNAMIC_BRANCH_RESULTS[a.id];
            const resB = DYNAMIC_BRANCH_RESULTS[b.id];
            if (!resA || !resB) return 0;
            
            let valA = 0;
            let valB = 0;
            if (comparisonSortKey === 'energy') {
                valA = resA.energy !== undefined && resA.energy !== null ? parseFloat(resA.energy) : 999999;
                valB = resB.energy !== undefined && resB.energy !== null ? parseFloat(resB.energy) : 999999;
            } else if (comparisonSortKey === 'bc') {
                valA = parseFloat(resA.Bc) || 0;
                valB = parseFloat(resB.Bc) || 0;
            } else if (comparisonSortKey === 'bdip') {
                valA = parseFloat(resA.Bdip) || 0;
                valB = parseFloat(resB.Bdip) || 0;
            } else if (comparisonSortKey === 'distortion') {
                valA = (resA.axial_expansions && resA.axial_expansions.local_vol_change) ? resA.axial_expansions.local_vol_change : 0;
                valB = (resB.axial_expansions && resB.axial_expansions.local_vol_change) ? resB.axial_expansions.local_vol_change : 0;
            } else if (comparisonSortKey === 'btot') {
                const bxA = parseFloat(resA.Bx) || 0.0;
                const byA = parseFloat(resA.By) || 0.0;
                const bzA = parseFloat(resA.Bz) || 0.0;
                const bcA = parseFloat(resA.Bc) || 0.0;
                valA = Math.sqrt(bxA*bxA + byA*byA + bzA*bzA) + bcA;

                const bxB = parseFloat(resB.Bx) || 0.0;
                const byB = parseFloat(resB.By) || 0.0;
                const bzB = parseFloat(resB.Bz) || 0.0;
                const bcB = parseFloat(resB.Bc) || 0.0;
                valB = Math.sqrt(bxB*bxB + byB*byB + bzB*bzB) + bcB;
            }
            
            if (valA < valB) return comparisonSortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return comparisonSortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }
    
    // 3. Paginate
    const totalRows = list.length;
    const totalPages = Math.ceil(totalRows / ROWS_PER_PAGE);
    
    // Clamp current page
    if (comparisonPage >= totalPages) comparisonPage = Math.max(0, totalPages - 1);
    
    const pageStart = comparisonPage * ROWS_PER_PAGE;
    const pageEnd = Math.min(pageStart + ROWS_PER_PAGE, totalRows);
    const paginatedList = list.slice(pageStart, pageEnd);
    
    const rows = paginatedList.map(b => {
        const res = DYNAMIC_BRANCH_RESULTS[b.id];
        if (!res) {
            return `
                <tr class="border-b border-slate-800 text-slate-500 text-xs font-mono">
                    <td class="py-3 px-4 font-sans text-slate-400 font-medium">${b.label}</td>
                    <td class="py-3 px-4" colspan="7">Calculation not completed yet</td>
                </tr>
            `;
        }
        
        const start = `(${parseFloat(res.void_frac[0]).toFixed(2)}, ${parseFloat(res.void_frac[1]).toFixed(2)}, ${parseFloat(res.void_frac[2]).toFixed(2)})`;
        const relaxed = `(${parseFloat(res.muon_frac[0]).toFixed(4)}, ${parseFloat(res.muon_frac[1]).toFixed(4)}, ${parseFloat(res.muon_frac[2]).toFixed(4)})`;
        const energyVal = res.energy !== undefined && res.energy !== null ? `${parseFloat(res.energy).toFixed(4)} eV` : 'N/A';
        
        const bxVal = parseFloat(res.Bx) || 0.0;
        const byVal = parseFloat(res.By) || 0.0;
        const bzVal = parseFloat(res.Bz) || 0.0;
        const bcVal = parseFloat(res.Bc) || 0.0;
        
        const bc = (bcVal * 10000.0).toFixed(1) + " G";
        const bdip = `(${(bxVal * 10000.0).toFixed(1)}, ${(byVal * 10000.0).toFixed(1)}, ${(bzVal * 10000.0).toFixed(1)}) G`;
        const btot = ((Math.sqrt(bxVal*bxVal + byVal*byVal + bzVal*bzVal) + bcVal) * 10000.0).toFixed(1) + " G";
        
        const ax = res.axial_expansions;
        let distortionText = 'N/A';
        if (ax && ax.x && ax.y && ax.z) {
            const finalVol = (ax.x.relaxed * ax.y.relaxed * ax.z.relaxed).toFixed(1);
            distortionText = `${finalVol} Å³ (${ax.local_vol_change > 0 ? '+' : ''}${ax.local_vol_change.toFixed(1)}%)`;
        }
        
        return `
            <tr class="border-b border-slate-800/80 hover:bg-slate-900/10 text-xs font-mono text-slate-300">
                <td class="py-3.5 px-4 font-sans text-white font-medium">${b.label}</td>
                <td class="py-3.5 px-4 text-slate-400">${start}</td>
                <td class="py-3.5 px-4 text-emerald-400">${relaxed}</td>
                <td class="py-3.5 px-4 text-indigo-300 font-bold">${energyVal}</td>
                <td class="py-3.5 px-4 text-blue-400 font-bold">${bc}</td>
                <td class="py-3.5 px-4 text-indigo-400">${bdip}</td>
                <td class="py-3.5 px-4 text-indigo-300 font-bold">${btot}</td>
                <td class="py-3.5 px-4 text-amber-400">${distortionText}</td>
            </tr>
        `;
    }).join('');
    
    // Sort indicator arrows
    const getSortIndicator = (key) => {
        if (comparisonSortKey !== key) return `<span class="text-slate-600 ml-1">↕</span>`;
        return comparisonSortOrder === 'asc' ? `<span class="text-blue-400 ml-1">▲</span>` : `<span class="text-blue-400 ml-1">▼</span>`;
    };
    
    // Paginated controls
    const paginationControls = totalPages > 1 ? `
        <div class="flex items-center justify-between px-6 py-4 bg-slate-950/60 border-t border-slate-800 text-slate-400 text-xs">
            <div>
                Showing <span class="text-slate-200 font-medium">${pageStart + 1}</span> to <span class="text-slate-200 font-medium">${pageEnd}</span> of <span class="text-slate-200 font-medium">${totalRows}</span> branches
            </div>
            <div class="flex gap-2">
                <button onclick="setComparisonPage(${comparisonPage - 1})" ${comparisonPage === 0 ? 'disabled class="px-3 py-1.5 rounded bg-slate-900 text-slate-700 cursor-not-allowed"' : 'class="px-3 py-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"'}>
                    Previous
                </button>
                <button onclick="setComparisonPage(${comparisonPage + 1})" ${comparisonPage >= totalPages - 1 ? 'disabled class="px-3 py-1.5 rounded bg-slate-900 text-slate-700 cursor-not-allowed"' : 'class="px-3 py-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"'}>
                    Next
                </button>
            </div>
        </div>
    ` : '';
    
    return `
        <div class="mt-8 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl animate-fade-in">
            <div class="bg-slate-950 px-6 py-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 class="text-rose-400 font-bold uppercase text-sm tracking-wider">Site Comparison Matrix (Side-by-Side)</h3>
                </div>
                <div class="w-full md:w-64">
                    <input type="text" oninput="setComparisonSearch(this.value)" value="${comparisonSearchQuery}" placeholder="Search candidate sites..." class="w-full bg-[#05070c] border border-slate-800 rounded-lg px-3 py-2 text-xs font-medium text-slate-300 focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse min-w-[700px] text-sm">
                    <thead>
                        <tr class="border-b border-slate-800 bg-slate-950/50">
                            <th class="py-3.5 px-4 text-slate-300 font-semibold">Branch Site</th>
                            <th class="py-3.5 px-4 text-slate-300 font-semibold font-mono text-xs">Start (x, y, z)</th>
                            <th class="py-3.5 px-4 text-slate-300 font-semibold font-mono text-xs">Relaxed (u, v, w)</th>
                            <th onclick="toggleComparisonSort('energy')" class="py-3.5 px-4 text-slate-300 font-semibold cursor-pointer hover:text-white select-none">Total Energy ${getSortIndicator('energy')}</th>
                            <th onclick="toggleComparisonSort('bc')" class="py-3.5 px-4 text-slate-300 font-semibold cursor-pointer hover:text-white select-none">Fermi Contact (Bc) [G] ${getSortIndicator('bc')}</th>
                            <th onclick="toggleComparisonSort('bdip')" class="py-3.5 px-4 text-slate-300 font-semibold cursor-pointer hover:text-white select-none">Dipolar Vector [G] ${getSortIndicator('bdip')}</th>
                            <th onclick="toggleComparisonSort('btot')" class="py-3.5 px-4 text-slate-300 font-semibold cursor-pointer hover:text-white select-none">Total Local Field (B_mu) [G] ${getSortIndicator('btot')}</th>
                            <th onclick="toggleComparisonSort('distortion')" class="py-3.5 px-4 text-slate-300 font-semibold cursor-pointer hover:text-white select-none">Distortion (Local Cage) ${getSortIndicator('distortion')}</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800">
                        ${rows || `<tr><td colspan="8" class="py-6 px-4 text-slate-500 text-center text-xs">No matching candidate sites found.</td></tr>`}
                    </tbody>
                </table>
            </div>
            ${paginationControls}
        </div>
    `;
}

function render() {
    renderSidebar();
    updateProgressBar();
    
    const data = steps.find(s => s.id === activeId);
    const content = document.getElementById('content-area');
    if (!content) return;

    const hasScripts = data.scripts && data.scripts.length > 0;
    
    // Resolve branch-specific files list dynamically
    const filesList = (data.files || []).map(file => {
        const newFile = Object.assign({}, file);
        if ((newFile.path.includes('exports/') || newFile.path.includes('logs/')) && !newFile.path.includes('shared/')) {
            newFile.path = newFile.path.replace('exports/', `exports/${activeBranch}/`).replace('logs/', `logs/${activeBranch}/`);
        }
        return newFile;
    });
    
    // Construct dynamic tab navigation bar
    const tabs = `
        <div class="flex flex-wrap gap-2 border-b border-slate-800 mb-6 pb-2">
            <button onclick="setActiveTab('overview')" class="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'overview' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-800'}">
                <div class="flex items-center justify-center">${icons.book}</div> Theory & Physics
            </button>
            ${data.results ? `<button onclick="setActiveTab('results')" class="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'results' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' : 'text-slate-400 hover:bg-slate-800'}"><div class="flex items-center justify-center">${icons.chart}</div> Results</button>` : ''}
            ${filesList.length > 0 ? `<button onclick="setActiveTab('files')" class="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'files' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30' : 'text-slate-400 hover:bg-slate-800'}"><div class="flex items-center justify-center">${icons.folder}</div> Files</button>` : ''}
            ${data.aiida_commands ? `<button onclick="setActiveTab('aiida')" class="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'aiida' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:bg-slate-800'}"><div class="flex items-center justify-center">${icons.tool}</div> AiiDA Toolkit</button>` : ''}
            ${data.hpc_resources ? `<button onclick="setActiveTab('hpc')" class="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'hpc' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'text-slate-400 hover:bg-slate-800'}"><div class="flex items-center justify-center">${icons.cpu}</div> HPC Specs</button>` : ''}
            ${data.has3D ? `<button onclick="setActiveTab('3d')" class="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === '3d' ? 'bg-pink-500/10 text-pink-400 border border-pink-500/30' : 'text-slate-400 hover:bg-slate-800'}"><div class="flex items-center justify-center">${icons.cube3d}</div> 3D Simulation</button>` : ''}
            ${hasScripts ? `<button onclick="setActiveTab('code')" class="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'code' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:bg-slate-800'}"><div class="flex items-center justify-center">${icons.code}</div> Python Script${data.scripts.length > 1 ? 's' : ''}</button>` : ''}
            ${data.commands ? `<button onclick="setActiveTab('cli')" class="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'cli' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:bg-slate-800'}"><div class="flex items-center justify-center">${icons.terminal}</div> CLI Execution</button>` : ''}
        </div>`;

    // Construct branch selector bar
    let branchSelectorHtml = '';
    if (branchedStepIds.includes(activeId)) {
        const defaultBranches = [
            { id: "edge_jitter1", label: "Edge-Center (Jitter A)" },
            { id: "edge_exact", label: "Edge-Center (Exact)" },
            { id: "edge_jitter2", label: "Edge-Center (Jitter B)" },
            { id: "body_jitter", label: "Body-Center (Jitter)" },
            { id: "body_exact", label: "Body-Center (Exact)" }
        ];
        const list = (typeof DYNAMIC_BRANCHES !== 'undefined' && DYNAMIC_BRANCHES.length > 0) ? DYNAMIC_BRANCHES : defaultBranches;
        
        const edgeBranches = list.filter(b => b.id.includes('edge'));
        const bodyBranches = list.filter(b => b.id.includes('body'));
        
        const renderOption = b => {
            const isSelected = activeBranch === b.id ? 'selected' : '';
            return `<option value="${b.id}" ${isSelected}>${b.label}</option>`;
        };
        
        branchSelectorHtml = `
            <div class="mb-6 p-5 bg-slate-950/40 border border-slate-800/80 rounded-2xl animate-fade-in flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                        <span>Active Muon Stop Site Branch:</span>
                        <span class="px-1.5 py-0.5 text-[10px] bg-blue-500/15 text-blue-400 border border-blue-500/30 rounded font-mono uppercase font-bold tracking-normal">${activeBranch}</span>
                    </div>
                    <p class="text-slate-400 text-xs font-light">
                        Select a stopping-site perturbation to view its computational outputs.
                    </p>
                </div>
                <div class="w-full md:w-80">
                    <select onchange="switchBranch(this.value)" class="w-full bg-[#05070c] border border-slate-700/60 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 focus:outline-none focus:border-blue-500 transition-colors shadow-inner">
                        <optgroup label="Edge-Centered Voids (Wyckoff 3c)">
                            ${edgeBranches.map(renderOption).join('')}
                        </optgroup>
                        <optgroup label="Body-Centered Voids (Wyckoff 1b)">
                            ${bodyBranches.map(renderOption).join('')}
                        </optgroup>
                    </select>
                </div>
            </div>
        `;
    }

    let mainBody = '';
    
    if (activeTab === 'overview') {
        mainBody = `
            <div class="mb-8">
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Objective</h3>
                <p class="text-lg text-slate-200 leading-relaxed font-light">${data.goal}</p>
            </div>
            ${(data.overview || data.math) ? `
            <div class="mb-8">
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Context</h3>
                ${data.overview ? `<p class="text-slate-300 leading-relaxed mb-6">${data.overview}</p>` : ''}
                ${data.math || ''}
            </div>` : ''}`;
    } else if (activeTab === 'results' && data.results) {
        let resultsBody = data.results;
        if (activeId === 'summary') {
            resultsBody += getComparisonTableHtml();
        }
        mainBody = `
            <div class="mb-8 animate-fade-in">
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Calculated Results & Physics Data</h3>
                ${resultsBody}
            </div>`;
    } else if (activeTab === 'aiida') {
         mainBody = `
            <div class="bg-black rounded-xl overflow-hidden border border-indigo-900/50 shadow-2xl mt-4">
                <div class="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-indigo-900/50">
                    <span class="text-xs font-mono text-indigo-400">Essential AiiDA Operations</span>
                    <button onclick='copy(steps.find(s=>s.id==="${activeId}").aiida_commands, this)' class="p-1.5 flex items-center justify-center hover:bg-slate-700 rounded transition-colors text-slate-400" title="Copy to clipboard">${icons.copy}</button>
                </div>
                <pre class="overflow-x-auto"><code class="language-bash">${data.aiida_commands.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>
            </div>`;
    } else if (activeTab === 'hpc' && data.hpc_resources) {
         mainBody = data.hpc_resources;
    } else if (activeTab === '3d' && data.has3D) {
         const fmClass = currentMagState === 'FM' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-transparent';
         const afmClass = currentMagState === 'AFM' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-transparent';
         
         const stateDescription = data.showSpins 
             ? (currentMagState === 'FM' 
                 ? 'Notice the <strong>Red (Spin-Up)</strong> magnetic arrows attached to all Cerium corners, visualizing the uniform Ferromagnetic state.'
                 : 'Notice the alternating <strong>Red (Ce1: [1, -1, 0])</strong> and <strong>Blue (Ce2: [-1, 1, 0])</strong> spin vector arrows lying flat in the diagonal (111) planes, forming the experimental AFM sheet ground state.')
             : 'The geometry has been perfectly relaxed. At this stage, no magnetic polarization has been applied to the electrons, so no spin vectors are shown.';

         let legendSpins = '';
         let controlsOverlay = '';
         
         if (data.showSpins) {
             legendSpins = `
                <div class="flex items-center gap-1 ml-1">
                    <div class="w-2 h-4 bg-red-500 rounded-sm"></div><span class="text-slate-400 text-[10px]">Ce1 [1, -1, 0]</span>
                    ${currentMagState === 'AFM' ? '<div class="w-2 h-4 bg-blue-500 rounded-sm ml-1"></div><span class="text-slate-400 text-[10px]">Ce2 [-1, 1, 0]</span>' : ''}
                </div>
             `;
             controlsOverlay = `
                <div class="bg-slate-900 border border-slate-700 p-1 rounded-lg text-xs flex gap-1.5 shadow-md">
                    <button onclick="setMagState('FM')" class="px-3 py-1.5 rounded font-semibold transition-all ${fmClass}">FM State</button>
                    <button onclick="setMagState('AFM')" class="px-3 py-1.5 rounded font-semibold transition-all ${afmClass}">AFM State</button>
                </div>
             `;
         }

         mainBody = `
            <div class="mb-6">
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Supercell Muon Site Simulation</h3>
                <p class="text-slate-300 leading-relaxed text-sm mb-4">Interactive 3D representation of the 2x2x2 $CeIn_3$ supercell. The lattice atoms are rendered with transparency to expose the Muon proxy (glowing red) trapped exactly at the relaxed stop site. ${stateDescription}</p>
            </div>

            <!-- UI Controls & Legend ABOVE the simulation -->
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                <div class="bg-[#05070c] border border-slate-800 p-3 rounded-lg text-xs flex flex-wrap gap-4 items-center shadow-md">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div> 
                        <span class="text-slate-300 font-bold tracking-wide">Cerium (Ce)</span>
                        ${legendSpins}
                    </div>
                    <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-purple-500"></div> <span class="text-slate-300 font-bold tracking-wide">Indium (In)</span></div>
                    <div class="flex items-center gap-2 border-l border-slate-800 pl-4"><div class="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"></div> <span class="text-white font-bold tracking-wide">Muon (μ⁺)</span></div>
                </div>
                
                ${controlsOverlay}
            </div>

            <div id="three-container" class="w-full h-[500px] rounded-xl overflow-hidden border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.6)] bg-black relative animate-fade-in"></div>
            `;
    } else if (activeTab === 'code' && hasScripts) {
        mainBody = '<div class="space-y-6">' + data.scripts.map((script, index) => `
            <div class="bg-[#05070c] rounded-xl overflow-hidden border border-emerald-900/40 shadow-2xl mt-4 relative">
                <div class="flex items-center justify-between px-4 py-3 bg-[#0b0f19] border-b border-emerald-900/40">
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-mono text-emerald-400">Script ${data.scripts.length > 1 ? index + 1 : ''}:</span>
                        <span class="text-xs font-mono text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800 shadow-sm">${script.name}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <button onclick='downloadScript("${script.name}", steps.find(s=>s.id==="${activeId}").scripts[${index}].code)' class="p-1.5 flex items-center justify-center hover:bg-slate-800 rounded transition-colors text-emerald-500/80 hover:text-emerald-400" title="Download Script as .py file">${icons.download}</button>
                        <div class="w-px h-4 bg-slate-700 mx-1"></div>
                        <button onclick='copy(steps.find(s=>s.id==="${activeId}").scripts[${index}].code, this)' class="p-1.5 flex items-center justify-center hover:bg-slate-800 rounded transition-colors text-slate-400 hover:text-white" title="Copy code">${icons.copy}</button>
                    </div>
                </div>
                <pre class="overflow-x-auto"><code class="language-python">${script.code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>
            </div>
        `).join('') + '</div>';
    } else if (activeTab === 'cli') {
        mainBody = `
            <div class="bg-black rounded-xl overflow-hidden border border-amber-900/40 shadow-2xl mt-4">
                <div class="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-amber-900/40">
                    <span class="text-xs font-mono text-slate-500">jovyan@rorqual:~/muon_workspace/muSR/scripts$</span>
                    <button onclick='copy(steps.find(s=>s.id==="${activeId}").commands, this)' class="p-1.5 flex items-center justify-center hover:bg-slate-800 rounded transition-colors text-slate-400" title="Copy to clipboard">${icons.copy}</button>
                </div>
                <pre class="overflow-x-auto"><code class="language-bash">${data.commands.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>
            </div>`;
    } else if (activeTab === 'files') {
        if (filesList.length === 0) {
            mainBody = `
                <div class="bg-[#05070c] rounded-xl p-8 border border-slate-800 text-center shadow-inner mt-4">
                    <h4 class="text-white font-bold mb-2">No Files Configured for this Step</h4>
                </div>`;
        } else {
            const tableRows = filesList.map(file => {
                const isPreviewable = file.scriptIndex !== undefined || file.inlineKey !== undefined;
                const fileTypeBadges = {
                    pseudo: '<span class="px-2 py-1 text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded uppercase tracking-wider">Pseudopotential</span>',
                    script: '<span class="px-2 py-1 text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded uppercase tracking-wider">Script</span>',
                    input: '<span class="px-2 py-1 text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded uppercase tracking-wider">Input</span>',
                    output: '<span class="px-2 py-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded uppercase tracking-wider">Output</span>',
                    log: '<span class="px-2 py-1 text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded uppercase tracking-wider">Log</span>'
                };
                const badge = fileTypeBadges[file.type] || '';
                const resolvedPath = getRelativeFilePath(file.path);
                
                const isCurrentPreview = activePreviewFile === file.path;
                
                const viewBtn = isPreviewable
                    ? `<button onclick="setPreviewFile('${file.path}')" class="px-2.5 py-1 text-xs font-semibold rounded bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all flex items-center gap-1">${icons.book} ${isCurrentPreview ? 'Close' : 'View'}</button>`
                    : `<button onclick="setPreviewFile('${file.path}')" class="px-2.5 py-1 text-xs font-semibold rounded bg-slate-900/50 text-slate-500 cursor-help border border-slate-800 transition-all flex items-center gap-1">${icons.book} Details</button>`;
                
                const downloadBtn = `<a href="${resolvedPath}" download="${file.name}" class="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all flex items-center gap-1">${icons.download} Download</a>`;

                return `
                    <tr class="hover:bg-slate-900/20 transition-colors border-b border-slate-800">
                        <td class="py-3 px-4">
                            <div class="flex items-center gap-2">
                                <span class="text-slate-400">${file.type === 'script' ? icons.code : icons.fileText}</span>
                                <span class="font-bold text-white text-sm font-mono">${file.name}</span>
                            </div>
                        </td>
                        <td class="py-3 px-4">${badge}</td>
                        <td class="py-3 px-4 font-mono text-xs text-slate-400 select-all">${file.path}</td>
                        <td class="py-3 px-4 text-xs text-slate-300 max-w-xs font-light">${file.description}</td>
                        <td class="py-3 px-4">
                            <div class="flex gap-2 justify-end">
                                ${viewBtn}
                                ${downloadBtn}
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');

            let previewPanel = '';
            if (activePreviewFile) {
                const previewFile = filesList.find(f => f.path === activePreviewFile);
                if (previewFile) {
                    const contentStr = getFileContent(previewFile, data);
                    let displayContent = '';
                    let langClass = 'language-none';
                    
                    if (contentStr !== null) {
                        displayContent = contentStr.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
                        if (previewFile.type === 'script') langClass = 'language-python';
                    } else {
                        if (previewFile.name.endsWith('.cube')) {
                            displayContent = `[3D GRID VOLUMETRIC DATA FILE]\nFilename: ${previewFile.name}\nPath: ${previewFile.path}\n\nThis is a standard Gaussian CUBE file containing 3D coordinates, cellular bounds, and voxel densities (e.g. potential values or spin populations).\n\nScientific Recommendation:\n- CUBE files are binary-like dense data arrays and cannot be rendered effectively as text.\n- Please click "Download" and open the file in standard molecular visualization programs like VESTA (http://jp-minerals.org/vesta/) or XCrySDen (http://www.xcrysden.org/).\n- VESTA is strongly recommended for plotting isosurfaces of spin densities and electrostatic potentials.`;
                        } else if (previewFile.name.endsWith('.UPF')) {
                            displayContent = `[UNIFIED PSEUDOPOTENTIAL FORMAT]\nFilename: ${previewFile.name}\nPath: ${previewFile.path}\n\nThis file contains tabulated Quantum ESPRESSO relativistic atomic potential arrays used to project core-electron interactions for Ce, In, or H/muon in our DFT calculations.\n\nUsage Details:\n- These files are preloaded in our Slurm/AiiDA environment under the 'CeIn3_FR_PBE' pseudopotential group.\n- Download this file if you wish to inspect standard relativistic PAW settings or run calculations locally.`;
                        }
                    }

                    const copyBtnHtml = contentStr !== null
                        ? `<button onclick="copy(getFileContent(steps.find(s => s.id === '${activeId}').files.find(f => f.path === '${previewFile.path}'), steps.find(s => s.id === '${activeId}')), this)" class="p-1.5 flex items-center justify-center hover:bg-slate-800 rounded transition-colors text-slate-400 hover:text-white" title="Copy Content">${icons.copy}</button>`
                        : '';

                    previewPanel = `
                        <div class="mt-6 bg-[#05070c] rounded-xl overflow-hidden border border-blue-500/20 shadow-2xl animate-fade-in">
                            <div class="flex items-center justify-between px-4 py-3 bg-[#0b0f19] border-b border-blue-500/20">
                                <div class="flex items-center gap-2">
                                    <span class="text-xs font-mono text-blue-400">File Preview:</span>
                                    <span class="text-xs font-mono text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800 shadow-sm">${previewFile.name}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    ${copyBtnHtml}
                                    <button onclick="setPreviewFile('${previewFile.path}')" class="p-1 text-slate-400 hover:text-white text-xs font-semibold font-mono">Close ✕</button>
                                </div>
                            </div>
                            <pre class="overflow-x-auto max-h-[450px] p-4 text-xs font-mono select-text text-slate-300 scrollbar-thin"><code class="${langClass}">${displayContent}</code></pre>
                        </div>
                    `;
                }
            }

            mainBody = `
                <div class="mb-4">
                    <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Input / Output Files Directory</h3>
                    <p class="text-slate-300 leading-relaxed text-sm mb-4 font-light">
                        Explore the structural inputs, calculation outputs, scripts, and logs utilized or generated in this phase.
                    </p>
                </div>
                <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl mt-4">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr class="border-b border-slate-800 bg-slate-950/60">
                                    <th class="py-3 px-4 text-slate-300 font-semibold text-xs uppercase tracking-wider">File Name</th>
                                    <th class="py-3 px-4 text-slate-300 font-semibold text-xs uppercase tracking-wider">Type</th>
                                    <th class="py-3 px-4 text-slate-300 font-semibold text-xs uppercase tracking-wider font-mono">Relative Path</th>
                                    <th class="py-3 px-4 text-slate-300 font-semibold text-xs uppercase tracking-wider">Description</th>
                                    <th class="py-3 px-4 text-slate-300 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-800/50">
                                ${tableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
                ${previewPanel}
            `;
        }
    }

    content.innerHTML = `
        <div class="glass-panel rounded-2xl p-6 md:p-8 shadow-2xl animate-fade-in relative overflow-hidden min-h-[520px]">
            <div class="relative z-10">
                <div class="flex items-center gap-4 mb-6">
                    <h2 class="text-2xl md:text-3xl font-bold text-white tracking-tight">${data.title}</h2>
                </div>
                ${branchSelectorHtml}
                ${tabs}
                <div>${mainBody}</div>
            </div>
        </div>`;
        
    // Trigger Three.js rendering if in 3D tab
    if (threeState.initTimer) clearTimeout(threeState.initTimer);
    if (activeTab === '3d' && data.has3D) {
        threeState.initTimer = setTimeout(initThreeJS, 100); 
    } else {
        cleanupThreeJS();
    }

    // Typeset LaTeX formatting using MathJax
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
        MathJax.typesetPromise().catch(function (err) {
            console.log('MathJax typeset failed: ' + err.message);
        });
    }
    
    // Fire syntax highlighter for python and bash code blocks
    if (window.Prism) {
        Prism.highlightAllUnder(content);
    }
}

// Initial application bootstrap (CORS/file loading race condition proof)
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        render();
    });
} else {
    render();
}
