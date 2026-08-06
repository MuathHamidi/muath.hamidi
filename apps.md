---
layout: default
title: Apps — Muath Hamidi
description: A collection of web-based physics and utility applications built by Muath Hamidi.
---

<h1>Applications</h1>
<p>A collection of web tools I have built — from crystallography simulators to PDF utilities.</p>

<div class="apps-header">
    <div class="app-filters">
        <button class="filter-btn active" data-filter="all" id="filter-all">All</button>
        <button class="filter-btn" data-filter="physics" id="filter-physics">⚛️ Physics</button>
        <button class="filter-btn" data-filter="utility" id="filter-utility">🛠️ Utilities</button>
    </div>
    <div class="search-wrapper">
        <input type="text" class="app-search" placeholder="Search apps..." id="appSearch">
    </div>
</div>

<div class="app-grid" id="appGrid">

    <!-- ==================== PHYSICS APPS ==================== -->

    <div class="app-card animate-on-scroll" data-category="physics" data-name="Periodic Table">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/apps/periodic_table.html">Periodic Table</a></h3>
        <p>The periodic table and information about the elements.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="physics" data-name="VSEPR Calculator">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/apps/vsepr_calculator.html">VSEPR Calculator</a></h3>
        <p>Predict molecular geometry based on VSEPR theory.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="physics" data-name="Oxidation Number">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/apps/oxidation_number.html">Oxidation Number</a></h3>
        <p>Assign oxidation numbers to elements in any formula.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="physics" data-name="Bonds Counter">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/apps/bonds_counter.html">Bonds Counter</a></h3>
        <p>Count bonds from CIF files — participant elements, bond lengths, and shared mass.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="physics" data-name="Crystal Lattice Sites">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/apps/crystal_lattice_sites.html">Crystal Lattice Sites</a></h3>
        <p>Return atomic positions and plot the primitive cell in 3D from CIF files.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="physics" data-name="Interatomic Distances Founder">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/apps/interatomic_distances_founder.html">Interatomic Distances Founder</a></h3>
        <p>Find the interatomic distances distribution in crystal structures.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="physics" data-name="Interatomic Distances Visualizer">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/apps/InteratomicDistances/InteratomicDistances.html">Interatomic Distances Visualizer</a></h3>
        <p>Visualize interatomic distances distribution with interactive plots.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="physics" data-name="CIF Maker">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/apps/cif_maker.html">CIF Maker</a></h3>
        <p>Create Crystallographic Information Files from input data.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="physics" data-name="State Basis Convertor">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/apps/state_basis_convertor.html">State Basis Convertor</a></h3>
        <p>Convert quantum states from the coupled basis to chemical atomic orbitals basis.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="physics" data-name="Pyrochlores">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/apps/Pyrochlores/Pyrochlores.html">Pyrochlores</a></h3>
        <p>Analyze and visualize Rare Earth Pyrochlores (A₂B₂O₇) simulations.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="physics" data-name="Spin Alignment">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/apps/SpinAlignment/SpinAlignment.html">Spin Alignment Probability</a></h3>
        <p>Visualize spin alignment probability density of RE magnetic ions in pyrochlores.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="physics" data-name="CIF to XYZ Convertor">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/apps/CIFTOXYZ.html">CIF to XYZ Convertor</a></h3>
        <p>Convert Crystallographic Information Files (.cif) to Cartesian coordinates (.xyz).</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="physics" data-name="X-Ray Intensity Heatmap">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/apps/xray_intensity_heatmap.html">X-Ray Intensity Heatmap</a></h3>
        <p>Visualize x-ray intensity heatmap in RIXS experiments.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="physics" data-name="RIXS Cross-Section">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/apps/RIXSCrossSection.html">RIXS Cross-Section</a></h3>
        <p>Visualize x-ray intensity on the scattering plane cross-section with the 3D unit sphere.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="physics" data-name="muSR">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/apps/muSR.html">μSR Workflow Log</a></h3>
        <p>DFT+μ workflow guide for calculating the muon's local magnetic field in CeIn₃.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="physics" data-name="Crystal Builder">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/apps/Crystallography/CrystalBuilder.html">Crystal Builder</a></h3>
        <p>Build crystals and generate CIF files with International Tables for Crystallography data.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="physics" data-name="Electrostatic Potential">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/apps/ElectrostaticPotential/ElectrostaticPotential.html">Electrostatic Potential</a></h3>
        <p>Visualize electrostatic potential from DFT .cube files.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="physics" data-name="CeIn3 AiiDA QE Output Explorer">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/apps/CeIn3_Aiida_QE_5_Output/CeIn3_Aiida_QE_5_Output.html">CeIn₃ AiiDA QE Output Explorer</a></h3>
        <p>Browse and inspect Quantum ESPRESSO .out files from AiiDA calculations on CeIn₃.</p>
        <span class="app-link">Open →</span>
    </div>

    <!-- ==================== UTILITY APPS ==================== -->

    <div class="app-card animate-on-scroll" data-category="utility" data-name="Audio Cutter">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/audio_cutter.html">Audio Cutter</a></h3>
        <p>Trim audio files using an interactive waveform editor and export as WAV or MP3.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="utility" data-name="PDF Page Extractor">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/pdf_page_extractor.html">PDF Page Extractor</a></h3>
        <p>Extract PDF pages and convert to high-quality PNG or JPEG images.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="utility" data-name="Image and Text Creator">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/image_creator.html">Image & Text Creator</a></h3>
        <p>Customize images with size, background, text, and meta-information.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="utility" data-name="BibTeX Studio">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/BibTeXStudio/BibTeXStudio.html">BibTeX Studio</a></h3>
        <p>Parse, clean, and convert BibTeX entries into APA, MLA, IEEE, and more.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="utility" data-name="Web Builder">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/WebsiteBuilder/WebBuilder.html">Web Builder</a></h3>
        <p>Design websites and professional resumes — save locally and export as HTML.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="utility" data-name="File Aggregator">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/FileAggregator.html">File Aggregator</a></h3>
        <p>View directory structure and text content of files.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="utility" data-name="File Size Explorer">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/FileSizeExplorer.html">File Size Explorer</a></h3>
        <p>Explore files in a directory and view their sizes.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="utility" data-name="PDF Merger">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/pdf_merger.html">PDF Merger</a></h3>
        <p>Merge multiple PDF files into a single document.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="utility" data-name="Web Python IDE">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/advanced_web_python_ide.html">Web Python IDE</a></h3>
        <p>A Python IDE that runs entirely in your browser.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="utility" data-name="Neural Network Image Generator">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/neural_network_image_generator.html">Neural Network Image Generator</a></h3>
        <p>Generate aesthetic wavy images using a neural network.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll" data-category="utility" data-name="Markdown Forge Pro">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/markdown_forge_pro.html">Markdown Forge Pro</a></h3>
        <p>A comprehensive markdown editor with live preview, math, and diagram support.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="no-results" id="noResults" style="display: none;">
        No apps match your search. Try a different term.
    </div>

</div>

<!-- ==================== UTILITY PASSCODE MODAL ==================== -->
<div id="utility-lock-overlay" aria-modal="true" role="dialog" aria-labelledby="lock-title" style="
    display: none;
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0,0,0,0.65);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    align-items: center;
    justify-content: center;
">
    <div id="lock-modal" style="
        background: var(--card-bg, #1a1d2e);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 20px;
        padding: 2.5rem 2rem 2rem;
        width: min(340px, 92vw);
        text-align: center;
        box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04);
        animation: lockIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both;
    ">
        <!-- Lock icon -->
        <div style="
            width: 56px; height: 56px;
            margin: 0 auto 1.25rem;
            border-radius: 16px;
            background: linear-gradient(135deg, var(--accent-primary, #6c63ff), var(--accent-secondary, #00d2ff));
            display: flex; align-items: center; justify-content: center;
            font-size: 1.6rem;
            box-shadow: 0 8px 24px rgba(108,99,255,0.35);
        ">🔒</div>

        <h2 id="lock-title" style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.35rem; letter-spacing: -0.01em;">Utilities Access</h2>
        <p style="font-size: 0.82rem; color: var(--text-muted, #8b92a5); margin-bottom: 1.75rem; line-height: 1.5;">Enter the 4-digit code to open this tool.</p>

        <!-- PIN dots -->
        <div id="pin-dots" style="display: flex; gap: 0.75rem; justify-content: center; margin-bottom: 1.5rem;">
            <span class="pin-dot" style="width:14px;height:14px;border-radius:50%;background:rgba(255,255,255,0.12);border:2px solid rgba(255,255,255,0.18);transition:background 0.2s,transform 0.15s;"></span>
            <span class="pin-dot" style="width:14px;height:14px;border-radius:50%;background:rgba(255,255,255,0.12);border:2px solid rgba(255,255,255,0.18);transition:background 0.2s,transform 0.15s;"></span>
            <span class="pin-dot" style="width:14px;height:14px;border-radius:50%;background:rgba(255,255,255,0.12);border:2px solid rgba(255,255,255,0.18);transition:background 0.2s,transform 0.15s;"></span>
            <span class="pin-dot" style="width:14px;height:14px;border-radius:50%;background:rgba(255,255,255,0.12);border:2px solid rgba(255,255,255,0.18);transition:background 0.2s,transform 0.15s;"></span>
        </div>

        <!-- Numpad -->
        <div id="numpad" style="display: grid; grid-template-columns: repeat(3,1fr); gap: 0.6rem; margin-bottom: 1.1rem;">
            <button class="pin-btn" data-val="1">1</button>
            <button class="pin-btn" data-val="2">2</button>
            <button class="pin-btn" data-val="3">3</button>
            <button class="pin-btn" data-val="4">4</button>
            <button class="pin-btn" data-val="5">5</button>
            <button class="pin-btn" data-val="6">6</button>
            <button class="pin-btn" data-val="7">7</button>
            <button class="pin-btn" data-val="8">8</button>
            <button class="pin-btn" data-val="9">9</button>
            <button class="pin-btn pin-btn--action" id="pin-clear" data-val="clear" style="font-size:0.75rem;letter-spacing:0.03em;">CLR</button>
            <button class="pin-btn" data-val="0">0</button>
            <button class="pin-btn pin-btn--action" id="pin-back" data-val="back">⌫</button>
        </div>

        <p id="lock-error" style="font-size:0.78rem;color:#ff6b6b;min-height:1.1em;margin-bottom:0.75rem;opacity:0;transition:opacity 0.2s;"></p>
        <button id="lock-cancel" style="
            background: none; border: none;
            color: var(--text-muted, #8b92a5);
            font-size: 0.82rem; cursor: pointer;
            padding: 0.25rem 0.75rem;
            border-radius: 6px;
            transition: color 0.2s;
        ">Cancel</button>
    </div>
</div>

<style>
@keyframes lockIn {
    from { opacity: 0; transform: scale(0.88) translateY(12px); }
    to   { opacity: 1; transform: scale(1)   translateY(0); }
}
@keyframes pinShake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-6px); }
    40%      { transform: translateX(6px); }
    60%      { transform: translateX(-4px); }
    80%      { transform: translateX(4px); }
}
.pin-btn {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 12px;
    color: var(--text-main, #e2e4e9);
    font-size: 1.2rem;
    font-weight: 600;
    padding: 0.9rem 0;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
    user-select: none;
}
.pin-btn:hover {
    background: rgba(255,255,255,0.12);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.pin-btn:active {
    transform: scale(0.92);
    background: rgba(255,255,255,0.18);
}
.pin-btn--action {
    background: rgba(255,255,255,0.03);
    color: var(--text-muted, #8b92a5);
    font-size: 0.85rem;
}
.pin-btn--action:hover { color: var(--text-main, #e2e4e9); }
#pin-dots.shake {
    animation: pinShake 0.4s ease;
}
.pin-dot.filled {
    background: var(--accent-primary, #6c63ff) !important;
    border-color: var(--accent-primary, #6c63ff) !important;
    transform: scale(1.15);
}
#utility-lock-overlay.visible {
    display: flex !important;
}
#lock-cancel:hover { color: var(--text-main, #e2e4e9); }
</style>

<script>
// --- Category Filter ---
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterApps();
    });
});

// --- Search ---
const searchInput = document.getElementById('appSearch');
if (searchInput) {
    searchInput.addEventListener('input', filterApps);
}

function filterApps() {
    const filter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const query = (searchInput?.value || '').toLowerCase().trim();
    const cards = document.querySelectorAll('.app-card');
    let visible = 0;

    cards.forEach(card => {
        const category = card.dataset.category;
        const name = (card.dataset.name || '').toLowerCase();
        const desc = (card.querySelector('p')?.textContent || '').toLowerCase();

        const matchesFilter = filter === 'all' || category === filter;
        const matchesSearch = !query || name.includes(query) || desc.includes(query);

        if (matchesFilter && matchesSearch) {
            card.style.display = '';
            visible++;
        } else {
            card.style.display = 'none';
        }
    });

    const noResults = document.getElementById('noResults');
    if (noResults) noResults.style.display = visible === 0 ? '' : 'none';
}

// ============================================================
// --- Utility Passcode Lock ---
// ============================================================
const PASSCODE        = '0000';
const SESSION_KEY     = 'utility_unlocked';
const overlay         = document.getElementById('utility-lock-overlay');
const pinDots         = document.querySelectorAll('.pin-dot');
const lockError       = document.getElementById('lock-error');
const pinDotsWrapper  = document.getElementById('pin-dots');

let pinBuffer   = '';   // digits entered so far
let pendingHref = '';   // URL to navigate to after unlock
let pendingNewTab = false;

// --- Check session unlock ---
function isUnlocked() {
    return sessionStorage.getItem(SESSION_KEY) === '1';
}
function markUnlocked() {
    sessionStorage.setItem(SESSION_KEY, '1');
}

// --- Open modal ---
function openLock(href, newTab = false) {
    if (isUnlocked()) { navigate(href, newTab); return; }
    pendingHref   = href;
    pendingNewTab = newTab;
    pinBuffer     = '';
    updateDots();
    showError('');
    overlay.classList.add('visible');
    overlay.style.display = 'flex';
}

// --- Close modal ---
function closeLock() {
    overlay.classList.remove('visible');
    overlay.style.display = 'none';
    pinBuffer = '';
    updateDots();
    showError('');
}

// --- Navigate helper ---
function navigate(href, newTab) {
    if (newTab) { window.open(href, '_blank'); }
    else        { window.location.href = href; }
}

// --- Update dot indicators ---
function updateDots() {
    pinDots.forEach((dot, i) => {
        dot.classList.toggle('filled', i < pinBuffer.length);
    });
}

// --- Show / hide error text ---
function showError(msg) {
    lockError.textContent = msg;
    lockError.style.opacity = msg ? '1' : '0';
}

// --- Wrong code feedback ---
function shakeAndClear() {
    showError('Incorrect code — try again.');
    pinDotsWrapper.classList.remove('shake');
    void pinDotsWrapper.offsetWidth; // reflow to re-trigger
    pinDotsWrapper.classList.add('shake');
    setTimeout(() => {
        pinBuffer = '';
        updateDots();
    }, 420);
}

// --- Handle numpad presses ---
function handlePin(val) {
    if (val === 'clear') {
        pinBuffer = '';
        showError('');
        updateDots();
        return;
    }
    if (val === 'back') {
        pinBuffer = pinBuffer.slice(0, -1);
        showError('');
        updateDots();
        return;
    }
    if (pinBuffer.length >= 4) return;
    pinBuffer += val;
    updateDots();

    if (pinBuffer.length === 4) {
        if (pinBuffer === PASSCODE) {
            markUnlocked();
            closeLock();
            navigate(pendingHref, pendingNewTab);
        } else {
            shakeAndClear();
        }
    }
}

// Wire up numpad buttons
document.querySelectorAll('.pin-btn').forEach(btn => {
    btn.addEventListener('click', () => handlePin(btn.dataset.val));
});

// Cancel button
document.getElementById('lock-cancel').addEventListener('click', closeLock);

// Click on backdrop closes modal
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLock();
});

// Keyboard support (physical keyboard)
overlay.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') handlePin(e.key);
    else if (e.key === 'Backspace') handlePin('back');
    else if (e.key === 'Escape') closeLock();
});
overlay.setAttribute('tabindex', '-1');

// Focus the overlay when it opens so keyboard events fire
const lockObserver = new MutationObserver(() => {
    if (overlay.classList.contains('visible')) overlay.focus();
});
lockObserver.observe(overlay, { attributes: true, attributeFilter: ['class'] });

// ============================================================
// --- Card Click Redirection (with Utility lock) ---
// ============================================================
document.querySelectorAll('.app-card').forEach(card => {
    const isUtility = card.dataset.category === 'utility';

    // Intercept <a> link clicks inside utility cards
    if (isUtility) {
        card.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                openLock(a.href, e.ctrlKey || e.metaKey);
            });
        });
    }

    // Card body click
    card.addEventListener('click', (e) => {
        if (e.target.closest('a') && !isUtility) return; // let non-utility links through normally
        if (e.target.closest('a') && isUtility) return;  // already handled by link listener above

        const link = card.querySelector('h3 a');
        if (!link) return;

        if (isUtility) {
            openLock(link.href, e.ctrlKey || e.metaKey);
        } else {
            if (e.ctrlKey || e.metaKey) { window.open(link.href, '_blank'); }
            else { window.location.href = link.href; }
        }
    });
});
</script>