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

    <div class="no-results" id="noResults" style="display: none;">
        No apps match your search. Try a different term.
    </div>

</div>

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

// --- Card Click Redirection ---
document.querySelectorAll('.app-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Prevent redirecting twice if user clicks directly on the link or category badge
        if (e.target.closest('a')) return;
        
        const link = card.querySelector('h3 a');
        if (link) {
            if (e.ctrlKey || e.metaKey) {
                window.open(link.href, '_blank');
            } else {
                window.location.href = link.href;
            }
        }
    });
});
</script>