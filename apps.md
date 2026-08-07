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

    <div class="app-card animate-on-scroll utility-locked" data-category="utility" data-name="Audio Cutter">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/audio_cutter.html">Audio Cutter</a></h3>
        <p>Trim audio files using an interactive waveform editor and export as WAV or MP3.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll utility-locked" data-category="utility" data-name="PDF Page Extractor">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/pdf_page_extractor.html">PDF Page Extractor</a></h3>
        <p>Extract PDF pages and convert to high-quality PNG or JPEG images.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll utility-locked" data-category="utility" data-name="Image and Text Creator">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/image_creator.html">Image &amp; Text Creator</a></h3>
        <p>Customize images with size, background, text, and meta-information.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll utility-locked" data-category="utility" data-name="BibTeX Studio">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/BibTeXStudio/BibTeXStudio.html">BibTeX Studio</a></h3>
        <p>Parse, clean, and convert BibTeX entries into APA, MLA, IEEE, and more.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll utility-locked" data-category="utility" data-name="Web Builder">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/WebsiteBuilder/WebBuilder.html">Web Builder</a></h3>
        <p>Design websites and professional resumes — save locally and export as HTML.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll utility-locked" data-category="utility" data-name="File Aggregator">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/FileAggregator.html">File Aggregator</a></h3>
        <p>View directory structure and text content of files.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll utility-locked" data-category="utility" data-name="File Size Explorer">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/FileSizeExplorer.html">File Size Explorer</a></h3>
        <p>Explore files in a directory and view their sizes.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll utility-locked" data-category="utility" data-name="PDF Merger">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/pdf_merger.html">PDF Merger</a></h3>
        <p>Merge multiple PDF files into a single document.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll utility-locked" data-category="utility" data-name="Web Python IDE">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/advanced_web_python_ide.html">Web Python IDE</a></h3>
        <p>A Python IDE that runs entirely in your browser.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll utility-locked" data-category="utility" data-name="Neural Network Image Generator">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/neural_network_image_generator.html">Neural Network Image Generator</a></h3>
        <p>Generate aesthetic wavy images using a neural network.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll utility-locked" data-category="utility" data-name="Markdown Forge Pro">
        <span class="app-category utility">Utility</span>
        <h3><a href="{{ site.baseurl }}/apps/markdown_forge_pro.html">Markdown Forge Pro</a></h3>
        <p>A comprehensive markdown editor with live preview, math, and diagram support.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="no-results" id="noResults" style="display: none;">
        No apps match your search. Try a different term.
    </div>

</div>

<!-- ==================== UTILITY UNLOCK BAR ==================== -->
<div id="utility-unlock-bar" style="
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 2.5rem;
    padding: 0.85rem 1.25rem;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.03);
    width: fit-content;
    transition: border-color 0.3s, box-shadow 0.3s;
">
    <span id="lock-icon" style="font-size: 1.1rem; line-height: 1; user-select: none;">🔒</span>
    <span style="font-size: 0.82rem; color: var(--text-muted, #8b92a5); white-space: nowrap; user-select: none;">Utilities</span>
    <!-- 4 dot inputs -->
    <div id="code-dots" style="display: flex; gap: 0.45rem; align-items: center;">
        <span class="cdot" data-pos="0"></span>
        <span class="cdot" data-pos="1"></span>
        <span class="cdot" data-pos="2"></span>
        <span class="cdot" data-pos="3"></span>
    </div>
    <!-- Hidden real input captures keystrokes -->
    <input id="code-input" type="password" inputmode="numeric" maxlength="4"
        autocomplete="off" autocorrect="off" spellcheck="false"
        aria-label="Enter utility unlock code"
        style="
            position: absolute;
            opacity: 0;
            width: 1px; height: 1px;
            pointer-events: none;
        ">
    <span id="unlock-hint" style="font-size: 0.75rem; color: var(--text-muted, #8b92a5); opacity: 0.5; user-select: none;">click to enter code</span>
</div>

<style>
/* Utility cards are hidden until unlocked */
.utility-locked {
    display: none !important;
}
.utility-locked.utility-visible {
    display: flex !important;  /* restores card layout; overridden by filterApps if needed */
    animation: utilReveal 0.4s cubic-bezier(0.22,1,0.36,1) both;
}

@keyframes utilReveal {
    from { opacity: 0; transform: translateY(14px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
}
@keyframes barShake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-5px); }
    40%      { transform: translateX(5px); }
    60%      { transform: translateX(-3px); }
    80%      { transform: translateX(3px); }
}

/* Code dots */
.cdot {
    display: inline-block;
    width: 10px; height: 10px;
    border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.22);
    background: transparent;
    transition: background 0.15s, border-color 0.15s, transform 0.12s;
}
.cdot.filled {
    background: var(--accent-primary, #6c63ff);
    border-color: var(--accent-primary, #6c63ff);
    transform: scale(1.2);
}
.cdot.error {
    border-color: #ff6b6b;
    background: rgba(255,107,107,0.25);
}

#utility-unlock-bar {
    cursor: text;
}
#utility-unlock-bar:focus-within,
#utility-unlock-bar.focused {
    border-color: rgba(var(--accent-primary-rgb, 108,99,255), 0.4);
    box-shadow: 0 0 0 3px rgba(var(--accent-primary-rgb, 108,99,255), 0.08);
}
#utility-unlock-bar.shake {
    animation: barShake 0.38s ease;
}
#utility-unlock-bar.unlocked {
    border-color: rgba(0,210,100,0.35);
    box-shadow: 0 0 0 3px rgba(0,210,100,0.08);
}
#unlock-hint {
    transition: opacity 0.2s;
}
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
        // Locked utility cards that haven't been revealed yet — always hide
        if (card.classList.contains('utility-locked') && !card.classList.contains('utility-visible')) {
            card.style.display = 'none';
            return;
        }

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

// --- Card Click Redirection ---
document.querySelectorAll('.app-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        const link = card.querySelector('h3 a');
        if (link) {
            if (e.ctrlKey || e.metaKey) { window.open(link.href, '_blank'); }
            else { window.location.href = link.href; }
        }
    });
});

// ============================================================
// --- Utility Unlock via Code Input ---
// ============================================================
const PASSCODE    = '0000';
const SESSION_KEY = 'utility_unlocked';

const bar         = document.getElementById('utility-unlock-bar');
const codeInput   = document.getElementById('code-input');
const codeDots    = document.querySelectorAll('.cdot');
const lockIcon    = document.getElementById('lock-icon');
const unlockHint  = document.getElementById('unlock-hint');

// Restore session unlock
if (sessionStorage.getItem(SESSION_KEY) === '1') {
    revealUtilities(false); // no animation on restore
}

// Clicking anywhere on the bar focuses the hidden input
bar.addEventListener('click', () => {
    codeInput.focus();
});

codeInput.addEventListener('focus', () => {
    bar.classList.add('focused');
    unlockHint.style.opacity = '0';
});
codeInput.addEventListener('blur', () => {
    bar.classList.remove('focused');
    if (!sessionStorage.getItem(SESSION_KEY)) {
        unlockHint.style.opacity = '0.5';
    }
});

// As user types, update the dots and check the code
codeInput.addEventListener('input', () => {
    // Sanitise — only digits
    codeInput.value = codeInput.value.replace(/\D/g, '').slice(0, 4);
    updateDots(codeInput.value);

    if (codeInput.value.length === 4) {
        if (codeInput.value === PASSCODE) {
            sessionStorage.setItem(SESSION_KEY, '1');
            revealUtilities(true);
        } else {
            wrongCode();
        }
    }
});

function updateDots(val) {
    codeDots.forEach((dot, i) => {
        dot.classList.toggle('filled', i < val.length);
        dot.classList.remove('error');
    });
}

function wrongCode() {
    codeDots.forEach(d => { d.classList.remove('filled'); d.classList.add('error'); });
    bar.classList.add('shake');
    bar.addEventListener('animationend', () => bar.classList.remove('shake'), { once: true });
    setTimeout(() => {
        codeInput.value = '';
        updateDots('');
    }, 500);
}

function revealUtilities(animate) {
    // Mark bar as unlocked
    bar.classList.add('unlocked');
    lockIcon.textContent = '🔓';
    unlockHint.textContent = 'unlocked';
    unlockHint.style.opacity = '0.5';
    codeDots.forEach(d => { d.classList.add('filled'); d.classList.remove('error'); });

    // Show cards with staggered animation
    const cards = document.querySelectorAll('.utility-locked');
    cards.forEach((card, i) => {
        if (animate) {
            card.style.animationDelay = `${i * 50}ms`;
        } else {
            card.style.animation = 'none';
        }
        card.classList.add('utility-visible');
    });

    // Re-run filter so the newly visible cards respect current filter/search
    filterApps();
}
</script>