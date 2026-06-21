const slidesData = [
    {
        title: "Crystal Distance Builder Core",
        subtitle: "Physics-Guided Crystal Engineering & Optimization",
        layout: "title-slide",
        content: `
            <div class="title-slide-content" style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; width: 100%; gap: 50px; position: relative;">
                <!-- Decorative subtle mesh/grid background for premium vibe -->
                <div style="position: absolute; width: 120%; height: 120%; background-image: radial-gradient(var(--border-glass) 1px, transparent 1px); background-size: 40px 40px; opacity: 0.15; pointer-events: none; transform: rotate(-5deg); z-index: 0;"></div>
                <canvas id="title-crystal-bg"
                  style="position:absolute; top:0; left:0; width:100%; height:100%;
                         z-index:0; pointer-events:none; border-radius:0;">
                </canvas>
                
                <div style="text-align: center; z-index: 1;">
                    <h1 style="font-size: 5.8rem; font-weight: 800; line-height: 1.1; margin-bottom: 24px; background: linear-gradient(135deg, #ffffff 0%, var(--accent-blue) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -2px;">
                        Crystal Distance Builder Core
                    </h1>
                    <span style="font-family: var(--font-mono); font-size: 1.9rem; color: var(--accent-mint); text-transform: uppercase; letter-spacing: 4px; font-weight: 500;">
                        Physics-Guided Crystal Engineering & Optimization
                    </span>
                </div>

                <div class="authors-section" style="display: flex; justify-content: center; gap: 140px; margin-top: 20px; z-index: 1;">
                    <div class="author-block" style="text-align: center; border-left: 2px solid var(--accent-blue); padding-left: 24px;">
                        <span style="font-size: 1.1rem; color: #64748b; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 6px; font-family: var(--font-mono);">Presenter</span>
                        <strong style="font-size: 2.2rem; color: #ffffff; font-weight: 700; display: block;">Muath Hamidi</strong>
                        <span style="font-size: 1.25rem; color: #94a3b8; display: block; margin-top: 2px;">Université de Montréal & Mila</span>
                    </div>
                    <div class="author-block" style="text-align: center; border-left: 2px solid var(--accent-purple); padding-left: 24px;">
                        <span style="font-size: 1.1rem; color: #64748b; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 6px; font-family: var(--font-mono);">Supervisor</span>
                        <strong style="font-size: 2.2rem; color: #ffffff; font-weight: 700; display: block;">Andrea Bianchi</strong>
                        <span style="font-size: 1.25rem; color: #94a3b8; display: block; margin-top: 2px;">Université de Montréal</span>
                    </div>
                </div>

                <!-- Date Badge -->
                <div style="font-size: 1.15rem; color: #64748b; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 2px; margin-top: 10px; z-index: 1;">
                    June 2026
                </div>

                <div class="logos-row" style="display: flex; justify-content: center; align-items: center; gap: 80px; margin-top: 40px; padding: 30px 60px; background: rgba(255, 255, 255, 0.01); border: 1px solid var(--border-glass); border-radius: 24px; z-index: 1; backdrop-filter: blur(10px);">
                    <!-- 1. UdeM Logo -->
                    <div class="logo-item" style="display: flex; align-items: center; justify-content: center;">
                        <img src="images/Logo_UdeM-RVB-002.png" style="height: 85px; object-fit: contain;" alt="Université de Montréal">
                    </div>

                    <div style="width: 1px; height: 60px; background: var(--border-glass);"></div>

                    <!-- 2. MILA Logo -->
                    <div class="logo-item" style="display: flex; align-items: center; justify-content: center;">
                        <img src="images/milalogowebcoulrgb-2.png.webp" style="height: 75px; object-fit: contain;" alt="MILA">
                    </div>

                    <div style="width: 1px; height: 60px; background: var(--border-glass);"></div>

                    <!-- 3. IVADO Logo -->
                    <div class="logo-item" style="display: flex; align-items: center; justify-content: center;">
                        <img src="images/ivado.png" style="height: 75px; object-fit: contain;" alt="IVADO">
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Crystal Distance Builder Core",
        subtitle: "System Overview & Architecture Roadmap",
        content: `
            <div style="display: flex; flex-direction: column; gap: 14px; width: 100%; flex: 1; min-height: 0; overflow: hidden; box-sizing: border-box; justify-content: center; height: 100%;">

              <!-- ═══ MAIN LAYOUT: Zones A + B ═══ -->
              <div style="display: grid; grid-template-columns: 2fr 3fr; gap: 30px; flex: 1; min-height: 0; align-items: center; padding: 20px 0;">

                <!-- ZONE A: Problem Statement + COD Badge -->
                <div style="display: flex; flex-direction: column; gap: 24px; justify-content: center; height: 100%;">

                  <!-- A1: Problem Statement -->
                  <div>
                    <h3 style="font-size: 1.6rem; color: #ffffff; font-weight: 700; margin-bottom: 12px; font-family: var(--font-sans);">Problem Statement</h3>
                    <p style="font-size: 1.45rem; line-height: 1.6; color: #94a3b8; margin: 0;">
                      Crystal structure relaxation requires placing atoms at physically
                      realistic interatomic distances — without relying on atom-type-specific
                      force fields. CDBC replaces classical potentials with
                      <strong>data-driven GMM distributions</strong> trained on
                      real-world bond statistics from hundreds of thousands of
                      experimental crystal structures.
                    </p>
                  </div>

                  <!-- Horizontal divider -->
                  <div style="border-bottom: 1px solid var(--border-glass);"></div>

                  <!-- A2: COD Database Badge -->
                  <div style="padding: 16px 20px;
                              background: rgba(0, 187, 249, 0.04);
                              border: 1px solid rgba(0, 187, 249, 0.25);
                              border-left: 5px solid var(--accent-blue);
                              border-radius: 0 16px 16px 0;
                              display: flex; flex-direction: column; gap: 8px;">
                    <span style="font-family: var(--font-mono);
                                 font-size: 0.9rem;
                                 color: #64748b;
                                 text-transform: uppercase;
                                 letter-spacing: 1.5px;">
                      Empirical Backbone
                    </span>
                    <div style="display: flex; align-items: baseline; gap: 10px;">
                      <span style="font-size: 1.8rem;
                                   font-weight: 800;
                                   color: var(--accent-blue);
                                   line-height: 1;">521,901</span>
                      <span style="font-size: 1.2rem; color: #ffffff;">Crystal Structures (CIF)</span>
                    </div>
                    <div style="display: flex; align-items: baseline; gap: 10px;">
                      <span style="font-size: 1.8rem;
                                   font-weight: 800;
                                   color: #ffffff;
                                   line-height: 1;">234M</span>
                      <span style="font-size: 1.2rem; color: #94a3b8;">Interatomic Bonds Compiled</span>
                    </div>
                    <span style="font-family: var(--font-mono);
                                 font-size: 1.05rem;
                                 color: #475569;
                                 margin-top: 4px;">
                      Crystallography Open Database (COD)
                    </span>
                  </div>

                </div>

                <!-- ZONE B: Architecture Pipeline Diagram (SVG) -->
                <div style="position: relative;
                            background: rgba(5, 7, 12, 0.35);
                            border: 1px solid var(--border-glass);
                            border-radius: 20px;
                            overflow: hidden;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 24px;
                            min-height: 0;
                            height: 100%;">

                  <svg viewBox="0 0 820 280" width="100%" height="100%"
                       xmlns="http://www.w3.org/2000/svg"
                       style="font-family: 'Outfit', -apple-system, sans-serif;">

                    <!-- === Definitions: arrow marker === -->
                    <defs>
                      <marker id="arrowhead" markerWidth="6" markerHeight="4"
                              refX="6" refY="2" orient="auto">
                        <polygon points="0 0, 6 2, 0 4" fill="rgba(255,255,255,0.3)"/>
                      </marker>
                    </defs>

                    <!-- INPUT NODE -->
                    <rect x="8" y="125" width="90" height="68"
                          rx="10" ry="10"
                          fill="rgba(100,116,139,0.12)"
                          stroke="rgba(100,116,139,0.4)"
                          stroke-width="1"/>
                    <text x="53" y="149" text-anchor="middle"
                          fill="#94a3b8" font-size="10" font-weight="700"
                          font-family="'JetBrains Mono', monospace"
                          letter-spacing="1">INPUT</text>
                    <text x="53" y="164" text-anchor="middle"
                          fill="#64748b" font-size="8.5">Space Group</text>
                    <text x="53" y="177" text-anchor="middle"
                          fill="#64748b" font-size="8.5">+ Composition</text>

                    <!-- Arrow: Input → Foundation -->
                    <line x1="98" y1="159" x2="128" y2="159"
                          stroke="rgba(255,255,255,0.2)" stroke-width="1.5"
                          marker-end="url(#arrowhead)"/>

                    <!-- FOUNDATION NODE (accent-blue) -->
                    <rect x="130" y="50" width="168" height="195"
                          rx="13" ry="13"
                          fill="rgba(0,187,249,0.07)"
                          stroke="#00bbf9"
                          stroke-width="1.5"
                          filter="drop-shadow(0 4px 14px rgba(0,187,249,0.12))"/>
                    <!-- Top color bar -->
                    <rect x="130" y="50" width="168" height="5"
                          rx="5" ry="5" fill="#00bbf9" opacity="0.6"/>

                    <text x="214" y="92" text-anchor="middle"
                          fill="#ffffff" font-size="13.5" font-weight="700">
                      Crystallographic
                    </text>
                    <text x="214" y="112" text-anchor="middle"
                          fill="#ffffff" font-size="13.5" font-weight="700">
                      Foundation
                    </text>

                    <line x1="148" y1="122" x2="280" y2="122"
                          stroke="rgba(0,187,249,0.2)" stroke-width="0.8"/>

                    <text x="214" y="138" text-anchor="middle"
                          fill="#94a3b8" font-size="9.2">230 Space Groups & Wyckoff</text>
                    <text x="214" y="154" text-anchor="middle"
                          fill="#94a3b8" font-size="9.2">Symmetry-Constrained Coords</text>
                    <text x="214" y="170" text-anchor="middle"
                          fill="#94a3b8" font-size="9.2">COD Database: 521,901 CIFs</text>
                    <text x="214" y="186" text-anchor="middle"
                          fill="#94a3b8" font-size="9.2">234M Empirical Bond Stats</text>

                    <!-- Slide badge background -->
                    <rect x="167" y="222" width="94" height="18"
                          rx="5" ry="5"
                          fill="rgba(0,187,249,0.12)"
                          stroke="rgba(0,187,249,0.3)" stroke-width="0.8"/>
                    <text x="214" y="235" text-anchor="middle"
                          fill="#00bbf9" font-size="9"
                          font-family="'JetBrains Mono', monospace">
                      Slides 3 – 4
                    </text>

                    <!-- Arrow: Foundation → Potentials -->
                    <line x1="298" y1="148" x2="322" y2="148"
                          stroke="rgba(255,255,255,0.2)" stroke-width="1.5"
                          marker-end="url(#arrowhead)"/>

                    <!-- POTENTIALS NODE (accent-purple) -->
                    <rect x="324" y="50" width="168" height="195"
                          rx="13" ry="13"
                          fill="rgba(155,93,229,0.07)"
                          stroke="#9b5de5"
                          stroke-width="1.5"
                          filter="drop-shadow(0 4px 14px rgba(155,93,229,0.12))"/>
                    <rect x="324" y="50" width="168" height="5"
                          rx="5" ry="5" fill="#9b5de5" opacity="0.6"/>

                    <text x="408" y="92" text-anchor="middle"
                          fill="#ffffff" font-size="13.5" font-weight="700">
                      Physics-Based
                    </text>
                    <text x="408" y="112" text-anchor="middle"
                          fill="#ffffff" font-size="13.5" font-weight="700">
                      Potentials
                    </text>

                    <line x1="342" y1="122" x2="474" y2="122"
                          stroke="rgba(155,93,229,0.2)" stroke-width="0.8"/>

                    <text x="408" y="138" text-anchor="middle"
                          fill="#94a3b8" font-size="9.2">GMM Bond Distributions</text>
                    <text x="408" y="154" text-anchor="middle"
                          fill="#94a3b8" font-size="9.2">4-Zone Bond Health (G/Y/O/R)</text>
                    <text x="408" y="170" text-anchor="middle"
                          fill="#94a3b8" font-size="9.2">Unified Kernel (solves vanishing ∇)</text>
                    <text x="408" y="186" text-anchor="middle"
                          fill="#94a3b8" font-size="9.2">Two-Tier: UI vs. Optimizer Score</text>

                    <rect x="361" y="222" width="94" height="18"
                          rx="5" ry="5"
                          fill="rgba(155,93,229,0.12)"
                          stroke="rgba(155,93,229,0.3)" stroke-width="0.8"/>
                    <text x="408" y="235" text-anchor="middle"
                          fill="#9b5de5" font-size="9"
                          font-family="'JetBrains Mono', monospace">
                      Slides 5 – 8
                    </text>

                    <!-- Arrow: Potentials → Optimization -->
                    <line x1="492" y1="148" x2="516" y2="148"
                          stroke="rgba(255,255,255,0.2)" stroke-width="1.5"
                          marker-end="url(#arrowhead)"/>

                    <!-- OPTIMIZATION NODE (accent-mint) -->
                    <rect x="518" y="50" width="168" height="195"
                          rx="13" ry="13"
                          fill="rgba(0,245,212,0.07)"
                          stroke="#00f5d4"
                          stroke-width="1.5"
                          filter="drop-shadow(0 4px 14px rgba(0,245,212,0.12))"/>
                    <rect x="518" y="50" width="168" height="5"
                          rx="5" ry="5" fill="#00f5d4" opacity="0.6"/>

                    <text x="602" y="92" text-anchor="middle"
                          fill="#ffffff" font-size="13.5" font-weight="700">
                      Structure
                    </text>
                    <text x="602" y="112" text-anchor="middle"
                          fill="#ffffff" font-size="13.5" font-weight="700">
                      Optimization
                    </text>

                    <line x1="536" y1="122" x2="668" y2="122"
                          stroke="rgba(0,245,212,0.2)" stroke-width="0.8"/>

                    <text x="602" y="138" text-anchor="middle"
                          fill="#94a3b8" font-size="9.2">Adam Solver + Bisection Guard</text>
                    <text x="602" y="154" text-anchor="middle"
                          fill="#94a3b8" font-size="9.2">Bold-Driver Lattice Optimizer</text>
                    <text x="602" y="170" text-anchor="middle"
                          fill="#94a3b8" font-size="9.2">Alternating Joint Pipeline (A→E)</text>
                    <text x="602" y="186" text-anchor="middle"
                          fill="#94a3b8" font-size="9.2">Web Workers & PyTorch GPU Scans</text>

                    <rect x="555" y="222" width="94" height="18"
                          rx="5" ry="5"
                          fill="rgba(0,245,212,0.12)"
                          stroke="rgba(0,245,212,0.3)" stroke-width="0.8"/>
                    <text x="602" y="235" text-anchor="middle"
                          fill="#00f5d4" font-size="9"
                          font-family="'JetBrains Mono', monospace">
                      Slides 9 – 13
                    </text>

                    <!-- Arrow: Optimization → Output -->
                    <line x1="686" y1="148" x2="710" y2="148"
                          stroke="rgba(255,255,255,0.2)" stroke-width="1.5"
                          marker-end="url(#arrowhead)"/>

                    <!-- OUTPUT NODE -->
                    <rect x="712" y="120" width="96" height="68"
                          rx="10" ry="10"
                          fill="rgba(0,245,212,0.06)"
                          stroke="rgba(0,245,212,0.4)"
                          stroke-width="1"/>
                    <text x="760" y="147" text-anchor="middle"
                          fill="#00f5d4" font-size="10" font-weight="700"
                          font-family="'JetBrains Mono', monospace"
                          letter-spacing="0.5">OUTPUT</text>
                    <text x="760" y="162" text-anchor="middle"
                          fill="#94a3b8" font-size="8.5">Relaxed CIF</text>
                    <text x="760" y="175" text-anchor="middle"
                          fill="#94a3b8" font-size="8.5">Structure</text>

                    <!-- PIPELINE LABEL (top-right corner) -->
                    <text x="800" y="24" text-anchor="end"
                          fill="#334155" font-size="8.5"
                          font-family="'JetBrains Mono', monospace"
                          letter-spacing="1">SYSTEM PIPELINE</text>
                    <line x1="710" y1="26" x2="800" y2="26"
                          stroke="#1e293b" stroke-width="0.8"/>

                  </svg>

                </div>
              </div>

            </div>
        `
    },
    {
        title: "International Tables for Crystallography",
        subtitle: "Space Group Symmetries & Wyckoff Symmetries",
        layout: "columns",
        content: `
            <div style="display: flex; flex-direction: column; gap: 14px; width: 100%; height: 100%;">
                <div style="display:flex; gap:20px; align-items:center; margin-bottom:10px;">
                    <p style="margin:0; font-size:1.15rem; color:#94a3b8; line-height:1.5; flex:1;">
                        The <strong>International Tables for Crystallography</strong> define exactly <strong>230 unique space groups</strong> in 3D space, which classify all possible crystal lattice symmetries. Select a space group below, configure lattice parameters, and place atoms on Wyckoff sites to construct the crystal lattice:
                    </p>

                </div>
                <div id="widget-crystal-builder" class="demo-widget" style="display: flex; flex-direction: column; gap: 12px; flex: 1; min-height: 0; width: 100%; padding: 18px; position: relative;">
                    <!-- Loading Overlay -->
                    <div id="cb-loading" style="position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(8,12,22,0.9); border-radius: 16px; display:flex; flex-direction:column; justify-content:center; align-items:center; gap: 15px; z-index:100;">
                        <div style="width: 40px; height: 40px; border: 3px solid rgba(255,255,255,0.1); border-top-color: var(--accent-mint); border-radius: 50%; animation: spin 1s infinite linear;"></div>
                        <div style="font-family: var(--font-sans); color: var(--accent-mint); font-size: 1.1rem; font-weight: 500;">Loading Wyckoff Database...</div>
                    </div>

                    <!-- Main Widget Workspace -->
                    <div style="display: grid; grid-template-columns: 280px 1fr; gap: 14px; flex: 1; min-height: 0; width: 100%;">
                        <!-- Sidebar Controls (Build, Style, Manage tabs) -->
                        <div class="glass-card" style="padding: 10px; display: flex; flex-direction: column; height: 100%; min-height: 0; gap: 10px; font-size: 0.85rem; border-color: var(--border-glass);">
                            <!-- Tab Headers -->
                            <div style="display: flex; border-bottom: 1px solid var(--border-glass); border-radius: 4px 4px 0 0; overflow: hidden; background: rgba(255,255,255,0.01);">
                                <button class="cb-tab-btn active" data-target="cb-tab-build" style="flex:1; border:none; padding: 6px 2px; font-size:0.75rem; font-weight:bold; cursor:pointer; background:transparent; color:#fff; text-align:center;">Build & Manage</button>
                                <button class="cb-tab-btn" data-target="cb-tab-style" style="flex:1; border:none; padding: 6px 2px; font-size:0.75rem; font-weight:bold; cursor:pointer; background:transparent; color:#64748b; text-align:center;">Style</button>
                            </div>
                            
                            <!-- Tab Contents -->
                            <div style="flex: 1; overflow-y: auto; min-height: 0; padding-right: 2px;">
                                <!-- Tab 1: Build & Manage -->
                                <div id="cb-tab-build" class="cb-tab-content active" style="display: flex; flex-direction: column; gap: 8px;">
                                    <div>
                                        <label style="display:block; font-size:0.7rem; color:#64748b; font-weight:bold; margin-bottom: 2px;">SPACE GROUP</label>
                                        <select id="cb-sg-select" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:4px; padding:4px; font-size:0.75rem; outline:none;"></select>
                                    </div>
                                    
                                    <div style="border-top: 1px solid var(--border-glass); padding-top: 6px;">
                                        <label style="display:block; font-size:0.7rem; color:#64748b; font-weight:bold; margin-bottom: 4px;">CELL PARAMS (Å / °)</label>
                                        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 4px; font-size:0.75rem;">
                                            <div>a <input type="number" id="cb-lat-a" value="4.5" step="0.1" min="0" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                            <div>b <input type="number" id="cb-lat-b" value="4.5" step="0.1" min="0" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                            <div>c <input type="number" id="cb-lat-c" value="4.5" step="0.1" min="0" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                            <div>α <input type="number" id="cb-lat-alpha" value="90" step="1" min="0" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                            <div>β <input type="number" id="cb-lat-beta" value="90" step="1" min="0" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                            <div>γ <input type="number" id="cb-lat-gamma" value="90" step="1" min="0" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                        </div>
                                    </div>
                                    
                                    <div style="border-top: 1px solid var(--border-glass); padding-top: 6px;">
                                        <label style="display:block; font-size:0.7rem; color:#64748b; font-weight:bold; margin-bottom: 2px;">ADD ATOM</label>
                                        <div style="display:grid; grid-template-columns: 2.2fr 3.8fr; gap: 4px; margin-bottom: 4px;">
                                            <div>
                                                <span style="font-size:0.6rem; color:#64748b;">Elem</span>
                                                <input type="text" id="cb-atom-el" value="Si" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:3px; text-align:center; font-weight:bold;">
                                            </div>
                                            <div>
                                                <span style="font-size:0.6rem; color:#64748b;">Wyckoff</span>
                                                <select id="cb-wyckoff-select" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:3px; font-size:0.7rem; outline:none;"></select>
                                            </div>
                                        </div>
                                        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-bottom: 6px;">
                                            <div>x <input type="text" id="cb-atom-x" value="0" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                            <div>y <input type="text" id="cb-atom-y" value="0" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                            <div>z <input type="text" id="cb-atom-z" value="0" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                        </div>
                                        <button id="cb-btn-add-atom" style="width:100%; background:var(--accent-mint); color:#000; border:none; border-radius:4px; padding:6px; font-weight:bold; font-size:0.75rem; cursor:pointer; transition:transform 0.1s;">Add Atom</button>
                                    </div>
                                    
                                    <div style="border-top: 1px solid var(--border-glass); padding-top: 6px; display: flex; flex-direction: column; gap: 6px;">
                                        <div style="display:flex; justify-content:space-between; align-items:center;">
                                            <span style="font-size:0.7rem; color:#64748b; font-weight:bold;">ADDED ATOMS</span>
                                            <button id="cb-btn-clear" style="background:rgba(255,56,96,0.1); border:1px solid var(--color-red); color:var(--color-red); border-radius:3px; padding:2px 6px; font-size:0.65rem; cursor:pointer;">Clear All</button>
                                        </div>
                                        
                                        <div id="cb-atoms-list" style="border:1px solid var(--border-glass); border-radius:4px; background:rgba(0,0,0,0.15); padding:4px; min-height: 120px; max-height: 250px; overflow-y:auto; display:flex; flex-direction:column; gap:4px;">
                                            <div style="color:#64748b; font-size:0.7rem; text-align:center; padding-top:10px;">No atoms added.</div>
                                        </div>
                                        
                                        <button id="cb-btn-export-cif" style="width:100%; background:rgba(0,245,212,0.1); border:1px solid var(--accent-mint); color:var(--accent-mint); border-radius:4px; padding:6px; font-weight:bold; font-size:0.7rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:4px;">
                                            <svg style="width:12px; height:12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                            Export CIF
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Tab 2: Style -->
                                <div id="cb-tab-style" class="cb-tab-content" style="display: none; flex-direction: column; gap: 8px;">
                                    <div>
                                        <label style="display:block; font-size:0.7rem; color:#64748b; font-weight:bold; margin-bottom: 2px;">SUPERCELL EXPANSION</label>
                                        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 4px; text-align:center; font-size:0.7rem;">
                                            <div>X <input type="number" id="cb-sc-x" value="1" min="1" max="3" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                            <div>Y <input type="number" id="cb-sc-y" value="1" min="1" max="3" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                            <div>Z <input type="number" id="cb-sc-z" value="1" min="1" max="3" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                        </div>
                                    </div>
                                    
                                    <div style="border-top: 1px solid var(--border-glass); padding-top: 6px;">
                                        <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:#64748b; font-weight:bold; margin-bottom: 2px;">
                                            <span>ATOM RADIUS</span>
                                            <span id="cb-scale-val" style="font-family:var(--font-mono); color:#fff;">0.30</span>
                                        </div>
                                        <input type="range" id="cb-atom-scale" min="0.1" max="1.0" step="0.05" value="0.3" style="width:100%; cursor:pointer;">
                                    </div>
                                    
                                    <div style="border-top: 1px solid var(--border-glass); padding-top: 6px;">
                                        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.7rem; color:#64748b; font-weight:bold;">
                                            <span>DRAW BONDS</span>
                                            <input type="checkbox" id="cb-toggle-bonds" style="cursor:pointer;">
                                        </div>
                                        <div id="cb-bond-settings" style="opacity:0.4; pointer-events:none; transition:opacity 0.2s; margin-top: 4px;">
                                            <div style="display:flex; justify-content:space-between; font-size:0.65rem;">
                                                <span>TOLERANCE MULT</span>
                                                <span id="cb-bond-tol-val" style="font-family:var(--font-mono); color:#fff;">1.2x</span>
                                            </div>
                                            <input type="range" id="cb-bond-tolerance" min="0.6" max="1.8" step="0.1" value="1.2" style="width:100%; cursor:pointer;">
                                        </div>
                                    </div>
                                    
                                    <div style="border-top: 1px solid var(--border-glass); padding-top: 6px;">
                                        <label style="display:block; font-size:0.7rem; color:#64748b; font-weight:bold; margin-bottom: 2px;">VIEWPORT LIGHTING</label>
                                        <div style="display:flex; gap: 4px;">
                                            <button id="cb-bg-dark" class="cb-bg-btn active" style="flex:1; background:rgba(0,0,0,0.3); border:1px solid var(--accent-mint); color:#fff; border-radius:3px; padding:4px; font-size:0.65rem; cursor:pointer;">Dark</button>
                                            <button id="cb-bg-light" class="cb-bg-btn" style="flex:1; background:rgba(255,255,255,0.05); border:1px solid var(--border-glass); color:#64748b; border-radius:3px; padding:4px; font-size:0.65rem; cursor:pointer;">Light</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Right: 3D Viewport canvas container -->
                        <div id="cb-viewer-container" style="position: relative; border-radius: 12px; overflow: hidden; background: #04080e; border: 1px solid var(--border-glass); height: 100%;">
                            <!-- Tooltip -->
                            <div id="cb-atom-tooltip" style="position: absolute; background: rgba(8,12,22,0.95); border: 1px solid var(--border-glass); backdrop-filter: blur(4px); color: #fff; padding: 6px 10px; border-radius: 6px; pointer-events: none; font-size: 10px; z-index: 10; display: none; transform: translate(-50%, -100%); margin-top: -10px; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
                                <div style="font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 2px; margin-bottom: 2px; text-align: center;"><span id="cb-tt-el" style="color:var(--accent-mint);"></span> Site <span id="cb-tt-wp"></span></div>
                                <div>Frac: <span id="cb-tt-frac" style="font-family:var(--font-mono); color:#cbd5e1;"></span></div>
                                <div>Cart: <span id="cb-tt-cart" style="font-family:var(--font-mono); color:#cbd5e1;"></span></div>
                            </div>
                            
                            <!-- Viewport HUD Overlay -->
                            <div style="position: absolute; top: 10px; left: 10px; z-index: 5; display: flex; flex-direction: column; gap: 4px; pointer-events: none; max-width: 140px;">
                                <div style="background: rgba(15,23,42,0.8); border: 1px solid var(--border-glass); border-radius: 6px; padding: 6px; pointer-events: auto;">
                                    <div id="cb-hud-sg" style="color: var(--accent-mint); font-weight: bold; font-size: 0.75rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="No Space Group Selected">Select SG</div>
                                    <div id="cb-hud-formula" style="color: #fff; font-family: var(--font-mono); font-size: 0.65rem; margin-top: 2px;">Formula: -</div>
                                    <div id="cb-hud-volume" style="color: #64748b; font-family: var(--font-mono); font-size: 0.6rem; margin-top: 1px;">Vol: -</div>
                                </div>
                                <div style="display:flex; gap: 4px;">
                                    <button id="cb-btn-recenter" style="background: rgba(15,23,42,0.8); border: 1px solid var(--border-glass); border-radius: 4px; padding: 4px; color: #cbd5e1; font-size: 0.65rem; font-weight: bold; cursor: pointer; pointer-events: auto; flex:1;">Center</button>
                                    <button id="cb-btn-snap" style="background: var(--accent-blue); border: none; border-radius: 4px; padding: 4px; color: #000; font-size: 0.65rem; font-weight: bold; cursor: pointer; pointer-events: auto; display:flex; align-items:center; justify-content:center; flex:1;" title="Save PNG Screenshot">📷</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Interatomic Bond Statistics",
        subtitle: "COD Empirical Database Explorer",
        layout: "columns",
        content: `
            <div style="flex: 1; min-height: 0; display: flex; flex-direction: column; width: 100%; gap: 10px;">
                <p style="font-size: 1.25rem; color: #94a3b8; margin-bottom: 5px; line-height: 1.5;">
                    Empirical bond distributions compiled from over <strong>234 million</strong> structural bonds across <strong>521,901</strong> crystals in the Crystallography Open Database (COD). Select elements below to analyze interatomic curves:
                </p>
                <div id="widget-interatomic-distances" class="demo-widget" style="display: flex; flex-direction: column; gap: 16px; height: 100%; width: 100%; padding: 20px; position: relative;">
                    <!-- Loading Overlay -->
                    <div id="id-loading" style="position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(8,12,22,0.9); border-radius: 16px; display:flex; flex-direction:column; justify-content:center; align-items:center; gap: 15px; z-index:100;">
                        <div style="width: 40px; height: 40px; border: 3px solid rgba(255,255,255,0.1); border-top-color: var(--accent-purple); border-radius: 50%; animation: spin 1s infinite linear;"></div>
                        <div style="font-family: var(--font-sans); color: var(--accent-blue); font-size: 1.1rem; font-weight: 500;">Loading COD Database (4.0MB)...</div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 24px; flex: 1; min-height: 0;">
                        <!-- Left: Periodic Table -->
                        <div class="glass-card" style="padding: 16px; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 8px; margin-bottom: 8px;">
                                <h3 style="font-size: 1.2rem; color: #fff; margin: 0;">🔬 Periodic Table Select</h3>
                                <span style="font-size: 0.85rem; color: #64748b;">Click two elements to graph bonds</span>
                            </div>
                            
                            <div class="periodic-table-container" style="flex: 1; display: flex; align-items: center; justify-content: center; min-height: 0;">
                                <div class="periodic-table" id="id-periodic-table"></div>
                            </div>
                            
                            <div class="table-legend" style="display: flex; flex-wrap: wrap; gap: 8px; font-size: 0.75rem; justify-content: center; padding-top: 8px; border-top: 1px solid var(--border-glass);">
                                <div class="legend-item"><div class="legend-color" style="background-color: var(--c-nonmetal);"></div>Nonmetals</div>
                                <div class="legend-item"><div class="legend-color" style="background-color: var(--c-noble-gas);"></div>Noble Gases</div>
                                <div class="legend-item"><div class="legend-color" style="background-color: var(--c-alkali-metal);"></div>Alkali</div>
                                <div class="legend-item"><div class="legend-color" style="background-color: var(--c-alkaline-earth);"></div>Alkaline</div>
                                <div class="legend-item"><div class="legend-color" style="background-color: var(--c-metalloid);"></div>Metalloids</div>
                                <div class="legend-item"><div class="legend-color" style="background-color: var(--c-halogen);"></div>Halogens</div>
                                <div class="legend-item"><div class="legend-color" style="background-color: var(--c-transition);"></div>Transition</div>
                                <div class="legend-item"><div class="legend-color" style="background-color: var(--c-post-transition);"></div>Post-Trans</div>
                                <div class="legend-item"><div class="legend-color" style="background-color: var(--c-lanthanide);"></div>Lanthanides</div>
                                <div class="legend-item"><div class="legend-color" style="background-color: var(--c-actinide);"></div>Actinides</div>
                            </div>
                        </div>
                        
                        <!-- Right: Selection & Graph -->
                        <div style="display: flex; flex-direction: column; gap: 16px; min-height: 0;">
                            <!-- Selection Cards & Controls -->
                            <div class="glass-card" style="padding: 12px 16px; display: flex; flex-direction: row !important; align-items: center; justify-content: space-around; gap: 12px; flex-shrink: 0; min-height: 80px;">
                                <div id="id-card-a" class="atom-select-card empty">
                                    <div class="label">Atom A</div>
                                    <div class="symbol">-</div>
                                    <div class="name">Select Element</div>
                                </div>
                                <button id="id-btn-swap" class="hud-icon-btn" style="border: 1px solid var(--border-glass); border-radius: 8px; width: 42px; height: 42px; font-size: 1.1rem; flex-shrink: 0;" title="Swap Selected Elements">🔄</button>
                                <div id="id-card-b" class="atom-select-card empty">
                                    <div class="label">Atom B</div>
                                    <div class="symbol">-</div>
                                    <div class="name">Select Element</div>
                                </div>
                                <button id="id-btn-clear" class="hud-icon-btn" style="border: 1px solid var(--color-red); color: var(--color-red); border-radius: 8px; width: 42px; height: 42px; font-size: 1.1rem; flex-shrink: 0;" title="Clear Selection">❌</button>
                            </div>
                            
                            <!-- Dashboard Content Container (Holds Onboarding / Chart) -->
                            <div class="glass-card" style="padding: 16px; flex: 1; display: flex; flex-direction: column; min-height: 0;">
                                <!-- 1. Onboarding -->
                                <div id="id-onboarding" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 12px;">
                                    <span style="font-size: 2.5rem;">⚛️</span>
                                    <h4 style="font-size: 1.25rem; color: #fff; margin: 0;">No Bond Selected</h4>
                                    <p style="font-size: 0.95rem; color: #64748b; max-width: 320px; margin: 0; line-height: 1.4;">Select two elements on the periodic table to inspect their observed bond length distribution in the database.</p>
                                    
                                    <div style="width: 100%; border-top: 1px solid var(--border-glass); padding-top: 12px; margin-top: 12px; text-align: left;">
                                        <span style="font-size: 0.8rem; color: #64748b; font-weight: 700; text-transform: uppercase;">Quick Reference Pairs:</span>
                                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-top: 8px;">
                                            <button class="id-btn-quick" data-pair="C-C" style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); padding: 6px; border-radius: 6px; font-family: var(--font-mono); color: var(--accent-blue); font-size: 0.85rem; cursor: pointer;">C - C (Organic)</button>
                                            <button class="id-btn-quick" data-pair="Si-O" style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); padding: 6px; border-radius: 6px; font-family: var(--font-mono); color: var(--accent-blue); font-size: 0.85rem; cursor: pointer;">Si - O (Silicate)</button>
                                            <button class="id-btn-quick" data-pair="Fe-O" style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); padding: 6px; border-radius: 6px; font-family: var(--font-mono); color: var(--accent-blue); font-size: 0.85rem; cursor: pointer;">Fe - O (Oxide)</button>
                                            <button class="id-btn-quick" data-pair="Ti-O" style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); padding: 6px; border-radius: 6px; font-family: var(--font-mono); color: var(--accent-blue); font-size: 0.85rem; cursor: pointer;">Ti - O (Perovskite)</button>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- 2. No Data Warning -->
                                <div id="id-no-data" class="hidden" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 8px;">
                                    <span style="font-size: 2.2rem; color: var(--color-orange);">⚠️</span>
                                    <h4 style="font-size: 1.15rem; color: #fff; margin: 0;">No Observations Found</h4>
                                    <p style="font-size: 0.95rem; color: #64748b; max-width: 300px; margin: 0; line-height: 1.4;">The element pair <strong id="id-no-data-pair" style="color: var(--accent-blue);"></strong> has zero compiled bond lengths in the COD database.</p>
                                </div>
                                
                                <!-- 3. Active Chart Dashboard -->
                                <div id="id-dashboard" class="hidden" style="flex: 1; display: flex; flex-direction: column; min-height: 0; gap: 12px;">
                                    <!-- Stats panel (5 Statistics) -->
                                    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; border-bottom: 1px solid var(--border-glass); padding-bottom: 8px;">
                                        <div style="padding: 6px 8px; background: rgba(255,255,255,0.01); border: 1px solid var(--border-glass); border-radius: 6px; text-align: center;">
                                            <span style="display: block; font-size: 0.6rem; color: #64748b; text-transform: uppercase;">Count</span>
                                            <strong id="id-stat-count" style="font-size: 0.85rem; color: #fff; font-family: var(--font-mono);">0</strong>
                                        </div>
                                        <div style="padding: 6px 8px; background: rgba(255,255,255,0.01); border: 1px solid var(--border-glass); border-radius: 6px; text-align: center;">
                                            <span style="display: block; font-size: 0.6rem; color: #64748b; text-transform: uppercase;">Peak</span>
                                            <strong id="id-stat-peak" style="font-size: 0.85rem; color: var(--accent-mint); font-family: var(--font-mono);">0.00Å</strong>
                                        </div>
                                        <div style="padding: 6px 8px; background: rgba(255,255,255,0.01); border: 1px solid var(--border-glass); border-radius: 6px; text-align: center;">
                                            <span style="display: block; font-size: 0.6rem; color: #64748b; text-transform: uppercase;">Mean</span>
                                            <strong id="id-stat-mean" style="font-size: 0.85rem; color: var(--accent-blue); font-family: var(--font-mono);">0.00Å</strong>
                                        </div>
                                        <div style="padding: 6px 8px; background: rgba(255,255,255,0.01); border: 1px solid var(--border-glass); border-radius: 6px; text-align: center;">
                                            <span style="display: block; font-size: 0.6rem; color: #64748b; text-transform: uppercase;">StdDev (σ)</span>
                                            <strong id="id-stat-stddev" style="font-size: 0.85rem; color: var(--accent-purple); font-family: var(--font-mono);">0.00Å</strong>
                                        </div>
                                        <div style="padding: 6px 8px; background: rgba(255,255,255,0.01); border: 1px solid var(--border-glass); border-radius: 6px; text-align: center;">
                                            <span style="display: block; font-size: 0.6rem; color: #64748b; text-transform: uppercase;">Range</span>
                                            <strong id="id-stat-range" style="font-size: 0.82rem; color: var(--accent-mint); font-family: var(--font-mono);">0 - 0Å</strong>
                                        </div>
                                    </div>
                                    
                                    <!-- Chart canvas wrapper -->
                                    <div style="flex: 1; position: relative; min-height: 180px;">
                                        <canvas id="id-chart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                       </div>
                </div>
            </div>
        `
    },
    {
        title: "GMM Bond Statistics",
        subtitle: "CSD Distribution Fitting",
        layout: "col-3-2",
        content: `
            <div class="columns col-3-2">
                <div class="column" style="gap: 10px;">
                    <p style="font-size: 1.35rem; margin: 0; line-height: 1.5;">
                        Bond lengths are modeled as <strong>Gaussian Mixture Models (GMM)</strong> — each component represents a distinct coordination shell:
                    </p>
                    <div class="math-block" style="font-size: 1.15rem; padding: 10px 16px; margin: 2px 0; justify-content: center;">
                        $$ p(d) = \\sum_{j} w_j \\, \\mathcal{N}(d;\\, \\mu_j, \\sigma_j^2) $$
                    </div>

                    <h3 style="color: var(--accent-blue); font-size: 1.35rem; margin: 4px 0 0; border-bottom: 1px solid var(--border-glass); padding-bottom: 4px;">Covalent Component Filter</h3>
                    <p style="font-size: 1.25rem; color: #94a3b8; margin: 0; line-height: 1.45;">
                        Survivors: $w_j \\ge 0.05$ and $\\mu_j \\in [0.75,\\,1.45]\\,d_{\\text{cov}}$.
                        Dominant component $\\to \\mu_{\\text{dom}}, \\sigma_{\\text{dom}}$.
                    </p>

                    <p style="font-size: 1.25rem; color: #94a3b8; margin: 0; line-height: 1.45;">
                        <strong>Steric limit</strong> $d_{\\min}$ — hard-wall below which no atom pair is allowed:
                    </p>
                    <div class="math-block" style="font-size: 1.15rem; padding: 10px 16px; border-color: var(--accent-purple); margin: 2px 0; justify-content: center;">
                        $$ d_{\\min} = \\max\\!\\left(0.3\\,\\text{Å},\\; \\min_{j\\in\\text{survivors}}(\\mu_j - 3\\sigma_j)\\right) $$
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 4px;">
                        <div class="glass-card" style="padding: 10px 14px; border-color: var(--color-orange); background: rgba(249,115,22,0.01); font-size: 1rem; line-height: 1.4;">
                            <strong style="color: var(--color-orange); display: block; margin-bottom: 4px;">Covalent Fallback</strong>
                            If no GMM entry exists for the pair (not just "no survivor"):<br/>
                            $\\mu_{\\text{fb}} = r_A + r_B$,&nbsp; $d_{\\min} = 0.85\\,(r_A{+}r_B)$
                        </div>
                        <div class="glass-card" style="padding: 10px 14px; border-color: var(--accent-blue); background: rgba(0,187,249,0.01); font-size: 1rem; line-height: 1.4;">
                            <strong style="color: var(--accent-blue); display: block; margin-bottom: 4px;">Parameter Origins</strong>
                            <ul style="margin: 0; padding-left: 14px; color: #94a3b8; gap: 4px;">
                                <li>GMM fitted on $234\\text{M}$ COD bonds</li>
                                <li>$w_j \\ge 0.05$ filters noise shells</li>
                                <li>$0.3\\,\\text{Å}$ guard prevents core overlap</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div id="widget-gmm" class="demo-widget">
                        <!-- Widget slot -->
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Bond Zones & Sigma Thresholds",
        subtitle: "Interatomic Landscape Classification",
        content: `
            <div style="display:flex; flex-direction:column; gap:14px; flex:1; min-height:0;">
                <div class="columns" style="gap: 30px;">
                    <div class="column" style="gap: 18px; flex: 1.1;">
                        <p style="font-size: 1.5rem; margin: 0; line-height: 1.5;">
                            Physical distance $d$ is projected to a dimensionless deviation $z$ for chemical-system–independent scoring:
                        </p>
                        <div class="math-block" style="font-size: 1.4rem; padding: 12px 18px; border-color: var(--accent-blue); margin: 4px 0;">
                            $$ z = \\frac{d - \\mu_{\\text{dom}}}{\\sigma_{\\text{dom}}} $$
                        </div>
                        <p style="font-size: 1.3rem; color: #94a3b8; margin: 0; line-height: 1.45;">
                            Normalises across bond types — C–H ($\\sigma$ tiny) and Ce–O ($\\sigma$ wide) are treated on equal statistical footing.
                        </p>
                        <div class="glass-card" style="padding: 12px 16px; gap: 6px; background: rgba(99,102,241,0.01); border-color: var(--accent-blue); font-size: 1.05rem; line-height: 1.4;">
                            <strong style="color: var(--accent-blue); display: block; margin-bottom: 2px;">Zone Boundary Origins</strong>
                            <ul style="margin: 0; padding-left: 18px; color: #94a3b8; gap: 6px;">
                                <li>$|z| \\le 1.0$ and $|z| \\le 2.0$: $1\\sigma$ / $2\\sigma$ normal confidence intervals (68% / 95%).</li>
                                <li>$|z| > 2.0$, $d \\ge d_{\\min}$: Outlier — triggers linear attractor penalty.</li>
                                <li>$d < d_{\\min}$: Forbidden — steep steric collision penalty. Note: $d_{\\min}$ is also capped at $1.2\\times$ the covalent sum $r_A{+}r_B$ to prevent the steric wall moving past physically reasonable bonds.</li>
                            </ul>
                        </div>
                    </div>
                    <div style="flex: 1.9; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; align-content: start;">
                        <!-- Green Zone -->
                        <div class="glass-card" style="padding: 14px 18px; background: rgba(34, 197, 94, 0.03); border: 1px solid rgba(34, 197, 94, 0.25); border-radius: 12px; display: flex; flex-direction: column; justify-content: space-between; gap: 8px;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 1.8rem;">🟢</span>
                                <div style="display: flex; flex-direction: column;">
                                    <strong style="color: #fff; font-size: 1.15rem;">Green (Optimal)</strong>
                                    <span style="font-family: var(--font-mono); font-size: 0.95rem; color: var(--accent-mint); background: rgba(34,197,94,0.1); padding: 1px 6px; border-radius: 4px; width: fit-content; margin-top: 2px;">$|z| \\le 1.0$</span>
                                </div>
                            </div>
                            <p style="color: #94a3b8; font-size: 0.98rem; margin: 0; line-height: 1.35;">Near-equilibrium bond distance. Yields peak statistical rewards in the potential energy well.</p>
                        </div>
                        <!-- Yellow Zone -->
                        <div class="glass-card" style="padding: 14px 18px; background: rgba(245, 158, 11, 0.03); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 12px; display: flex; flex-direction: column; justify-content: space-between; gap: 8px;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 1.8rem;">🟡</span>
                                <div style="display: flex; flex-direction: column;">
                                    <strong style="color: #fff; font-size: 1.15rem;">Yellow (Expected)</strong>
                                    <span style="font-family: var(--font-mono); font-size: 0.95rem; color: #f59e0b; background: rgba(245,158,11,0.1); padding: 1px 6px; border-radius: 4px; width: fit-content; margin-top: 2px;">$1.0 < |z| \\le 2.0$</span>
                                </div>
                            </div>
                            <p style="color: #94a3b8; font-size: 0.98rem; margin: 0; line-height: 1.35;">Acceptable bonding range. Very common under mechanical constraints or lattice strain.</p>
                        </div>
                        <!-- Orange Zone -->
                        <div class="glass-card" style="padding: 14px 18px; background: rgba(249, 115, 22, 0.03); border: 1px solid rgba(249, 115, 22, 0.25); border-radius: 12px; display: flex; flex-direction: column; justify-content: space-between; gap: 8px;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 1.8rem;">🟠</span>
                                <div style="display: flex; flex-direction: column;">
                                    <strong style="color: #fff; font-size: 1.15rem;">Orange (Outlier)</strong>
                                    <span style="font-family: var(--font-mono); font-size: 0.9rem; color: #f97316; background: rgba(249,115,22,0.1); padding: 1px 6px; border-radius: 4px; width: fit-content; margin-top: 2px;">$|z| > 2.0 \\text{ and } d \\ge d_{\\min}$</span>
                                </div>
                            </div>
                            <p style="color: #94a3b8; font-size: 0.98rem; margin: 0; line-height: 1.35;">Severe strain outlier (stretched/compressed bond). Marginally stable configuration.</p>
                        </div>
                        <!-- Red Zone -->
                        <div class="glass-card" style="padding: 14px 18px; background: rgba(239, 68, 68, 0.03); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 12px; display: flex; flex-direction: column; justify-content: space-between; gap: 8px;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 1.8rem;">🔴</span>
                                <div style="display: flex; flex-direction: column;">
                                    <strong style="color: #fff; font-size: 1.15rem;">Red (Forbidden)</strong>
                                    <span style="font-family: var(--font-mono); font-size: 0.9rem; color: #ef4444; background: rgba(239,68,68,0.1); padding: 1px 6px; border-radius: 4px; width: fit-content; margin-top: 2px;">$d < d_{\\min}$</span>
                                </div>
                            </div>
                            <p style="color: #94a3b8; font-size: 0.98rem; margin: 0; line-height: 1.35;">Steric collision limit (forbidden overlap). Triggers steep quadratic steric optimization penalty.</p>
                        </div>
                    </div>
                </div>
                <canvas id="widget-bond-zone"
                    style="width:100%; height:130px; border-radius:12px;
                           border:1px solid var(--border-glass); background:rgba(8,12,22,0.5);">
                </canvas>
            </div>
        `
    },
    {
        title: "Physics Engine Scoring Kernels",
        subtitle: "Solving the Vanishing Gradient Problem",
        layout: "columns",
        content: `
            <div class="columns" style="gap: 30px;">
                <div class="column" style="gap: 14px; flex: 1.15;">
                    <h3 style="color: var(--accent-mint); font-size: 1.5rem; margin: 0; border-bottom: 1px solid var(--border-glass); padding-bottom: 6px;">Unified Kernel $S_{\\text{unified}}(z)$</h3>
                    <p style="font-size: 1.3rem; margin: 0; line-height: 1.45; color: #94a3b8;">
                        Gaussian well inside $z_b$, linear attractor outside — $C^1$ continuous at the join:
                    </p>
                    <div class="math-block" style="font-size: 1.1rem; padding: 12px 16px; margin: 4px 0;">
                        $$ S_{\\text{unified}}(z) = \\begin{cases}
                          A e^{-z^2/2} & z \\le z_b \\\\\\\\
                          V_b - S_b(z - z_b) & z > z_b
                        \\end{cases} $$
                    </div>
                    <p style="font-size: 1.2rem; color: #94a3b8; line-height: 1.4; margin: 0;">
                        $V_b = A e^{-0.5 z_b^2}$,&nbsp; $S_b = z_b A e^{-0.5 z_b^2}$ &nbsp;—&nbsp; $A = 4.0$, $z_b = 2.0$.
                    </p>
                    <div class="glass-card" style="padding: 12px 16px; border-color: var(--accent-mint); background: rgba(0,245,212,0.01); font-size: 1.1rem; line-height: 1.4;">
                        <strong style="color: var(--accent-mint); display: block; margin-bottom: 4px;">Parameter Origins</strong>
                        <ul style="margin: 0; padding-left: 18px; color: #94a3b8; gap: 4px;">
                            <li>$A = 4.0$: Empirical force-balance scale for coordination wells.</li>
                            <li>$z_b = 2.0$: $2\\sigma$ normal threshold — transitions to linear pull.</li>
                            <li>$\\{V_b, S_b\\}$: Analytically matched — no slope discontinuity.</li>
                            <li><strong>Covalent cap:</strong> Kernel is evaluated at $d' = \\min(d,\;1.45(r_A{+}r_B))$ — the linear attractor does not continue below the physical bonding window.</li>
                            <li><strong>Full range:</strong> Gaussian branch covers $z \\in (-\\infty, z_b]$; distances shorter than $\\mu$ are rewarded; forbidden contact penalty ($d < d_{\\min}$) is handled separately by Score B.</li>
                        </ul>
                    </div>
                </div>
                <div class="column" style="flex: 0.85; gap: 18px;">
                    <canvas id="widget-kernel-surf"
                        style="width:100%; height:180px; border-radius:12px;
                               border:1px solid var(--border-glass); background:rgba(8,12,22,0.5);
                               margin-bottom:4px;">
                    </canvas>
                    <div class="glass-card" style="padding: 18px 22px; border-color: var(--color-orange); gap: 8px; background: rgba(249,115,22,0.02);">
                        <h4 style="font-size: 1.35rem; color: var(--color-orange); margin: 0; font-weight: 600;">Vanishing Gradient Problem</h4>
                        <p style="font-size: 1.2rem; color: #94a3b8; margin: 0; line-height: 1.45;">
                            Pure Gaussians flatline at $|z|>4$ — no gradient to pull outliers back. The linear tail fixes this.
                        </p>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Two-Tier Objective Landscape",
        subtitle: "Diagnostic vs. Physical Scoring",
        layout: "columns",
        content: `
            <div class="columns" style="gap: 24px; flex: 1; min-height: 0;">
                <div class="column" style="gap: 12px; flex: 1;">
                    <div class="glass-card" style="padding: 20px 24px; border-color: var(--accent-blue); background: rgba(99,102,241,0.02); height: 100%; gap: 10px;">
                        <h3 style="color: var(--accent-blue); font-size: 1.6rem; margin-bottom: 6px;">Score A — UI Diagnostic</h3>
                        <p style="font-size: 1.2rem; color: #94a3b8; margin: 0;">Normalized bond quality for manual inspection. Weighted LogSumExp over all valid contacts per pair type:</p>
                        <div class="math-block" style="font-size: 1.1rem; padding: 10px 14px;">
                            $$ \\text{Score}_{\\text{UI}} = \\frac{\\displaystyle\\sum_k w_k \\ln\\!\\Bigl(\\sum_i e^{S_{\\text{unified}}(d_{k,i})}\\Bigr)}{\\displaystyle\\sum_k w_k} $$
                        </div>
                        <ul style="margin: 0; padding-left: 20px; color: #94a3b8; font-size: 1.1rem; gap: 6px;">
                            <li><strong>Log-Sum-Exp:</strong> Handles variable coordination (8-coord vs 6-coord) without saturation.</li>
                            <li><strong>No Collision Veto:</strong> Score A does <em>not</em> apply the $K(d_{\\min}-d)^2$ penalty — overlaps are flagged red in the UI distance table but the score stays continuous to guide manual edits. The hard veto lives only in Score B.</li>
                        </ul>
                    </div>
                </div>
                <div class="column" style="gap: 12px; flex: 1;">
                    <div class="glass-card" style="padding: 20px 24px; border-color: var(--accent-mint); background: rgba(34,197,94,0.02); height: 100%; gap: 10px;">
                        <h3 style="color: var(--accent-mint); font-size: 1.6rem; margin-bottom: 6px;">Score B — Optimizer Energy</h3>
                        <p style="font-size: 1.2rem; color: #94a3b8; margin: 0;">Drives cell and coordinate relaxation. Same LSE quality term as Score A, minus a Hooke-spring forbidden penalty:</p>
                        <div class="math-block" style="font-size: 0.95rem; padding: 8px 14px;">
                            $$ \\text{Score}_B = \\frac{\\displaystyle\\sum_k w_k \\ln\\!\\Bigl(\\sum_i e^{S_{\\text{unified}}(d_{k,i})}\\Bigr)}{\\displaystyle\\sum_k w_k} - P_{\\text{forbidden}} $$
                        </div>
                        <div class="math-block" style="font-size: 0.9rem; padding: 6px 14px;">
                            $$ P_{\\text{forbidden}} = \\sum_{k}\\;\\sum_{\\substack{i,j \\\\ d < d_{\\min}}} K \\frac{(d_{\\min} - d)^2}{d_{\\min}^2}, \\quad K = 10^6 $$
                        </div>
                        <ul style="margin: 0; padding-left: 20px; color: #94a3b8; font-size: 1.05rem; gap: 6px;">
                            <li><strong>Hooke's-Law Veto:</strong> $K = 1{,}000{,}000$ — any overlap dominates the quality score.</li>
                            <li><strong>Under-bonding Guard:</strong> No contact in cutoff $\\to d_{\\text{fallback}} = \\mu_{\\text{dom}} + 4\\sigma_{\\text{dom}}$; contribution $= S_{\\text{unified}}(d_{\\text{fallback}}) - 20$, preventing infinite cell expansion.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="failsafe-ribbon" style="margin-top: 10px; padding: 10px 18px; font-size: 1.1rem; line-height: 1.4; display: flex; align-items: center; gap: 24px;">
                <span><strong>Atomic Mass Weighting:</strong> Both scores weight each pair type by $w_{AB} = \\sqrt{M_A} + \\sqrt{M_B}$, prioritising heavy framework atoms (Zr, Ce) over light ligands (O, F).</span>
                <div class="math-block" style="font-size: 1.2rem; padding: 8px 16px; white-space: nowrap; flex-shrink: 0; margin: 0;">$w_{AB} = \\sqrt{M_A} + \\sqrt{M_B}$</div>
            </div>
        `
    },
    {
        title: "Bond Scoring Visualizer",
        subtitle: "Live Bond Colouring & Structure Scoring",
        layout: "columns",
        content: `
            <div style="display: flex; flex-direction: column; gap: 0px; width: 100%; flex: 1; min-height: 0;">
                <div id="widget-crystal-scoring" class="demo-widget" style="display: flex; flex-direction: column; gap: 12px; flex: 1; min-height: 0; width: 100%; padding: 18px; position: relative;">
                    <!-- Loading Overlay -->
                    <div id="cs-loading" style="position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(8,12,22,0.9); border-radius: 16px; display:flex; flex-direction:column; justify-content:center; align-items:center; gap: 15px; z-index:100;">
                        <div style="width: 40px; height: 40px; border: 3px solid rgba(255,255,255,0.1); border-top-color: var(--accent-mint); border-radius: 50%; animation: spin 1s infinite linear;"></div>
                        <div style="font-family: var(--font-sans); color: var(--accent-mint); font-size: 1.1rem; font-weight: 500;">Loading Databases...</div>
                    </div>

                    <!-- Main Widget Workspace -->
                    <div style="display: grid; grid-template-columns: 280px 1fr 340px; gap: 14px; flex: 1; min-height: 0; width: 100%;">
                        <!-- Left Panel: Build Controls -->
                        <div class="glass-card" style="padding: 10px; display: flex; flex-direction: column; height: 100%; min-height: 0; gap: 10px; font-size: 0.85rem; border-color: var(--border-glass);">
                            <!-- Tab Headers -->
                            <div style="display: flex; border-bottom: 1px solid var(--border-glass); border-radius: 4px 4px 0 0; overflow: hidden; background: rgba(255, 255, 255, 0.01);">
                                <button class="cs-tab-btn active" data-target="cs-tab-build" style="flex:1; border:none; padding: 6px 2px; font-size:0.75rem; font-weight:bold; cursor:pointer; background:transparent; color:#fff; text-align:center;">Build</button>
                                <button class="cs-tab-btn" data-target="cs-tab-style" style="flex:1; border:none; padding: 6px 2px; font-size:0.75rem; font-weight:bold; cursor:pointer; background:transparent; color:#64748b; text-align:center;">Style</button>
                            </div>
                            
                            <!-- Tab Contents -->
                            <div style="flex: 1; overflow-y: auto; min-height: 0; padding-right: 2px;">
                                <!-- Tab 1: Build & Manage -->
                                <div id="cs-tab-build" class="cs-tab-content active" style="display: flex; flex-direction: column; gap: 8px;">
                                    <div>
                                        <label style="display:block; font-size:0.7rem; color:#64748b; font-weight:bold; margin-bottom: 2px;">SPACE GROUP</label>
                                        <select id="cs-sg-select" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:4px; padding:4px; font-size:0.75rem; outline:none;"></select>
                                    </div>
                                    
                                    <div style="border-top: 1px solid var(--border-glass); padding-top: 6px;">
                                        <label style="display:block; font-size:0.7rem; color:#64748b; font-weight:bold; margin-bottom: 4px;">CELL PARAMS (Å / °)</label>
                                        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 4px; font-size:0.75rem;">
                                            <div>a <input type="number" id="cs-lat-a" value="5.43" step="0.1" min="0" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                            <div>b <input type="number" id="cs-lat-b" value="5.43" step="0.1" min="0" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                            <div>c <input type="number" id="cs-lat-c" value="5.43" step="0.1" min="0" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                            <div>α <input type="number" id="cs-lat-alpha" value="90" step="1" min="0" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                            <div>β <input type="number" id="cs-lat-beta" value="90" step="1" min="0" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                            <div>γ <input type="number" id="cs-lat-gamma" value="90" step="1" min="0" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                        </div>
                                    </div>
                                    
                                    <div style="border-top: 1px solid var(--border-glass); padding-top: 6px;">
                                        <label style="display:block; font-size:0.7rem; color:#64748b; font-weight:bold; margin-bottom: 2px;">ADD ATOM</label>
                                        <div style="display:grid; grid-template-columns: 2.2fr 3.8fr; gap: 4px; margin-bottom: 4px;">
                                            <div>
                                                <span style="font-size:0.6rem; color:#64748b;">Elem</span>
                                                <input type="text" id="cs-atom-el" value="Si" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:3px; text-align:center; font-weight:bold;">
                                            </div>
                                            <div>
                                                <span style="font-size:0.6rem; color:#64748b;">Wyckoff</span>
                                                <select id="cs-wyckoff-select" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:3px; font-size:0.7rem; outline:none;"></select>
                                            </div>
                                        </div>
                                        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-bottom: 6px;">
                                            <div>x <input type="text" id="cs-atom-x" value="0.125" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                            <div>y <input type="text" id="cs-atom-y" value="0.125" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                            <div>z <input type="text" id="cs-atom-z" value="0.125" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                        </div>
                                        <button id="cs-btn-add-atom" style="width:100%; background:var(--accent-mint); color:#000; border:none; border-radius:4px; padding:6px; font-weight:bold; font-size:0.75rem; cursor:pointer;">Add Atom</button>
                                    </div>
                                    
                                    <div style="border-top: 1px solid var(--border-glass); padding-top: 6px; display: flex; flex-direction: column; gap: 6px;">
                                        <div style="display:flex; justify-content:space-between; align-items:center;">
                                            <span style="font-size:0.7rem; color:#64748b; font-weight:bold;">ADDED ATOMS</span>
                                            <button id="cs-btn-clear" style="background:rgba(255,56,96,0.1); border:1px solid var(--color-red); color:var(--color-red); border-radius:3px; padding:2px 6px; font-size:0.65rem; cursor:pointer;">Clear All</button>
                                        </div>
                                        <div id="cs-atoms-list" style="border:1px solid var(--border-glass); border-radius:4px; background:rgba(0,0,0,0.15); padding:4px; min-height: 80px; max-height: 160px; overflow-y:auto; display:flex; flex-direction:column; gap:4px;">
                                            <div style="color:#64748b; font-size:0.7rem; text-align:center; padding-top:10px;">No atoms added.</div>
                                        </div>
                                        <button id="cs-btn-export-cif" style="width:100%; background:rgba(0,245,212,0.1); border:1px solid var(--accent-mint); color:var(--accent-mint); border-radius:4px; padding:6px; font-weight:bold; font-size:0.7rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:4px;">
                                            <svg style="width:12px; height:12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                            Export CIF
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Tab 2: Style -->
                                <div id="cs-tab-style" class="cs-tab-content" style="display: none; flex-direction: column; gap: 8px;">
                                    <div>
                                        <label style="display:block; font-size:0.7rem; color:#64748b; font-weight:bold; margin-bottom: 2px;">SUPERCELL EXPANSION</label>
                                        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 4px; text-align:center; font-size:0.7rem;">
                                            <div>X <input type="number" id="cs-sc-x" value="1" min="1" max="3" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                            <div>Y <input type="number" id="cs-sc-y" value="1" min="1" max="3" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                            <div>Z <input type="number" id="cs-sc-z" value="1" min="1" max="3" style="width:100%; background:rgba(15,23,42,0.85); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:2px; text-align:center;"></div>
                                        </div>
                                    </div>
                                    
                                    <div style="border-top: 1px solid var(--border-glass); padding-top: 6px;">
                                        <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:#64748b; font-weight:bold; margin-bottom: 2px;">
                                            <span>ATOM RADIUS</span>
                                            <span id="cs-scale-val" style="font-family:var(--font-mono); color:#fff;">0.30</span>
                                        </div>
                                        <input type="range" id="cs-atom-scale" min="0.1" max="1.0" step="0.05" value="0.3" style="width:100%; cursor:pointer;">
                                    </div>
                                    
                                    <div style="border-top: 1px solid var(--border-glass); padding-top: 6px;">
                                        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.7rem; color:#64748b; font-weight:bold;">
                                            <span>DRAW BONDS</span>
                                            <input type="checkbox" id="cs-toggle-bonds" checked style="cursor:pointer;">
                                        </div>
                                        <div id="cs-bond-settings" style="transition:opacity 0.2s; margin-top: 4px;">
                                            <div style="display:flex; justify-content:space-between; font-size:0.65rem;">
                                                <span>TOLERANCE MULT</span>
                                                <span id="cs-bond-tol-val" style="font-family:var(--font-mono); color:#fff;">1.2x</span>
                                            </div>
                                            <input type="range" id="cs-bond-tolerance" min="0.6" max="1.8" step="0.1" value="1.2" style="width:100%; cursor:pointer;">
                                        </div>
                                    </div>
                                    
                                    <div style="border-top: 1px solid var(--border-glass); padding-top: 6px;">
                                        <label style="display:block; font-size:0.7rem; color:#64748b; font-weight:bold; margin-bottom: 2px;">VIEWPORT LIGHTING</label>
                                        <div style="display:flex; gap: 4px;">
                                            <button id="cs-bg-dark" class="cs-bg-btn active" style="flex:1; background:rgba(0,0,0,0.3); border:1px solid var(--accent-mint); color:#fff; border-radius:3px; padding:4px; font-size:0.65rem; cursor:pointer;">Dark</button>
                                            <button id="cs-bg-light" class="cs-bg-btn" style="flex:1; background:rgba(255,255,255,0.05); border:1px solid var(--border-glass); color:#64748b; border-radius:3px; padding:4px; font-size:0.65rem; cursor:pointer;">Light</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Center: 3D Viewport -->
                        <div id="cs-viewer-container" style="position: relative; border-radius: 12px; overflow: hidden; background: #04080e; border: 1px solid var(--border-glass); height: 100%;">
                            <!-- Tooltip -->
                            <div id="cs-atom-tooltip" style="position: absolute; background: rgba(8,12,22,0.95); border: 1px solid var(--border-glass); backdrop-filter: blur(4px); color: #fff; padding: 6px 10px; border-radius: 6px; pointer-events: none; font-size: 10px; z-index: 10; display: none; transform: translate(-50%, -100%); margin-top: -10px; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
                                <div style="font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 2px; margin-bottom: 2px; text-align: center;"><span id="cs-tt-el" style="color:var(--accent-mint);"></span> Site <span id="cs-tt-wp"></span></div>
                                <div>Frac: <span id="cs-tt-frac" style="font-family:var(--font-mono); color:#cbd5e1;"></span></div>
                                <div>Cart: <span id="cs-tt-cart" style="font-family:var(--font-mono); color:#cbd5e1;"></span></div>
                            </div>
                            
                            <!-- Viewport HUD Overlay -->
                            <div style="position: absolute; top: 10px; left: 10px; z-index: 5; display: flex; flex-direction: column; gap: 4px; pointer-events: none; max-width: 140px;">
                                <div style="background: rgba(15,23,42,0.8); border: 1px solid var(--border-glass); border-radius: 6px; padding: 6px; pointer-events: auto;">
                                    <div id="cs-hud-sg" style="color: var(--accent-mint); font-weight: bold; font-size: 0.75rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="No Space Group Selected">Select SG</div>
                                    <div id="cs-hud-formula" style="color: #fff; font-family: var(--font-mono); font-size: 0.65rem; margin-top: 2px;">Formula: -</div>
                                    <div id="cs-hud-volume" style="color: #64748b; font-family: var(--font-mono); font-size: 0.6rem; margin-top: 1px;">Vol: -</div>
                                </div>
                                <div style="display:flex; gap: 4px;">
                                    <button id="cs-btn-recenter" style="background: rgba(15,23,42,0.8); border: 1px solid var(--border-glass); border-radius: 4px; padding: 4px; color: #cbd5e1; font-size: 0.65rem; font-weight: bold; cursor: pointer; pointer-events: auto; flex:1;">Center</button>
                                    <button id="cs-btn-snap" style="background: var(--accent-blue); border: none; border-radius: 4px; padding: 4px; color: #000; font-size: 0.65rem; font-weight: bold; cursor: pointer; pointer-events: auto; display:flex; align-items:center; justify-content:center; flex:1;" title="Save PNG Screenshot">📷</button>
                                </div>
                            </div>
                            
                            <!-- Live Legend overlaid inside viewport in the bottom-left -->
                            <div style="position: absolute; bottom: 10px; left: 10px; z-index: 5; background: rgba(8,12,22,0.8); border: 1px solid var(--border-glass); border-radius: 8px; padding: 8px; font-size: 0.65rem; color: #cbd5e1; display: flex; flex-direction: column; gap: 4px; pointer-events: auto;">
                                <div style="font-weight: bold; color: #94a3b8; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 2px; margin-bottom: 2px;">Bond Health</div>
                                <div style="display:flex; align-items:center; gap: 5px;"><div style="width:7px; height:7px; border-radius:50%; background:#22c55e;"></div>Optimal (≤1σ)</div>
                                <div style="display:flex; align-items:center; gap: 5px;"><div style="width:7px; height:7px; border-radius:50%; background:#eab308;"></div>Acceptable (≤2σ)</div>
                                <div style="display:flex; align-items:center; gap: 5px;"><div style="width:7px; height:7px; border-radius:50%; background:#f97316;"></div>Strain Outlier</div>
                                <div style="display:flex; align-items:center; gap: 5px;"><div style="width:7px; height:7px; border-radius:50%; background:#ef4444;"></div>Forbidden (&lt;d_min)</div>
                            </div>
                        </div>

                        <!-- Right Panel: Live Distance Scoring Table -->
                        <div class="glass-card" style="padding: 12px; display: flex; flex-direction: column; height: 100%; min-height: 0; gap: 8px; font-size: 0.8rem; border-color: var(--border-glass);">
                            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 6px;">
                                <h3 style="font-size: 0.95rem; color: #fff; margin: 0; font-weight: 700;">🔬 Bond z-Scores</h3>
                                <span id="cs-pairs-count" style="font-size: 0.7rem; color: var(--accent-mint); font-family: var(--font-mono);">0 pairs</span>
                            </div>
                            
                            <!-- Overall Score Card -->
                            <div style="background: rgba(255, 255, 255, 0.01); border: 1px solid var(--border-glass); border-radius: 8px; padding: 8px 10px; display: flex; flex-direction: column; gap: 2px;">
                                <div style="font-size: 0.65rem; color: #64748b; font-weight: bold; text-transform: uppercase;">Structure Unified Score</div>
                                <div style="display: flex; align-items: baseline; gap: 8px;">
                                    <strong id="cs-score-val" style="font-size: 1.45rem; color: var(--accent-mint); font-family: var(--font-mono);">-0.000</strong>
                                    <span id="cs-score-hint" style="font-size: 0.65rem; color: #64748b;">GMM well + Log-Sum-Exp</span>
                                </div>
                            </div>
                            
                            <!-- Distances Table -->
                            <div style="flex: 1; overflow-y: auto; min-height: 0; border: 1px solid var(--border-glass); border-radius: 6px; background: rgba(0,0,0,0.15); padding: 4px;">
                                <table style="width: 100%; border-collapse: collapse; font-size: 0.72rem; text-align: left;">
                                    <thead>
                                        <tr style="color: #64748b; border-bottom: 1px solid var(--border-glass); font-weight: bold;">
                                            <th style="padding: 4px 2px; width:25%;">Pair</th>
                                            <th style="padding: 4px 2px; width:20%;">d (Å)</th>
                                            <th style="padding: 4px 2px; width:20%;">d_min</th>
                                            <th style="padding: 4px 2px; width:20%;">d_peak</th>
                                            <th style="padding: 4px 2px; width:15%; text-align: center;">Zone</th>
                                        </tr>
                                    </thead>
                                    <tbody id="cs-dist-tbody" style="color: #cbd5e1;">
                                        <tr><td colspan="5" style="text-align:center; color:#64748b; padding: 20px 0;">No atoms added.</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <!-- Overall Green percent -->
                            <div id="cs-optimal-fraction" style="font-size: 0.7rem; color: #64748b; text-align: center; border-top: 1px solid var(--border-glass); padding-top: 6px;">
                                🟢 0% of bonds are within equilibrium (1σ)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Coordinate Optimizer",
        subtitle: "Multi-Start Adam Core",
        layout: "col-3-2",
        content: `
            <div class="columns col-3-2">
                <div class="column" style="gap: 12px;">
                    <p style="font-size: 1.35rem; margin: 0; line-height: 1.45;">
                        Gradient estimated by central differences, then applied with Adam adaptive steps:
                    </p>
                    <div class="math-block" style="font-size: 1.05rem; padding: 10px 16px; margin: 2px 0; justify-content: center;">
                        $$ g_i^{(t)} = \\frac{\\partial F}{\\partial \\theta_i} \\approx \\frac{F(\\theta + h\\mathbf{e}_i) - F(\\theta - h\\mathbf{e}_i)}{2h}, \\quad h = 10^{-4} $$
                    </div>
                    <div class="math-block" style="font-size: 0.9rem; padding: 12px 16px; display: block; line-height: 1.6; margin: 2px 0; text-align: center;">
                        $$ m_i^{(t)} = \\beta_1 m_i^{(t-1)} + (1-\\beta_1)g_i^{(t)} \\quad \\implies \\quad \\hat{m}_i = \\frac{m_i^{(t)}}{1-\\beta_1^t} $$
                        $$ v_i^{(t)} = \\beta_2 v_i^{(t-1)} + (1-\\beta_2)(g_i^{(t)})^2 \\quad \\implies \\quad \\hat{v}_i = \\frac{v_i^{(t)}}{1-\\beta_2^t} $$
                        $$ \\theta_i^{(t)} \\leftarrow \\theta_i^{(t-1)} + \\operatorname{clamp}\\!\\left(\\frac{\\text{lr}}{\\sqrt{\\hat{v}_i} + \\epsilon}\\,\\hat{m}_i,\;\\pm\\text{MAX\_STEP}\\right) $$
                    </div>
                    <div class="glass-card" style="padding: 14px 18px; border-color: var(--accent-blue); background: rgba(0,187,249,0.01); font-size: 1.05rem; line-height: 1.4;">
                        <strong style="color: var(--accent-blue); display: block; margin-bottom: 6px;">Hyperparameters</strong>
                        <ul style="margin: 0; padding-left: 18px; color: #94a3b8; gap: 6px;">
                            <li>Adam: $\\beta_1=0.9$, $\\beta_2=0.999$, $\\epsilon=10^{-8}$</li>
                            <li>Learning rate: $\\text{lr}=\\min(0.005,\;0.1/\\text{maxMult})$ — scales down at high-symmetry / high-multiplicity sites</li>
                            <li>Step clamp: $\\text{MAX\_STEP}=\\min(0.02,\;0.5/\\text{maxMult})$ — prevents coordinate jumps</li>
                            <li>Bisection guard: 8 steps to retract any move crossing $d_{\\min}$</li>
                        </ul>
                    </div>
                </div>
                <div class="column">
                    <div id="widget-relax" class="demo-widget">
                        <!-- Widget slot -->
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Lattice Optimization",
        subtitle: "Bold-Driver Parameter Search",
        layout: "columns",
        content: `
            <div class="columns" style="gap: 30px;">
                <div class="column" style="gap: 16px;">
                    <h3 style="font-size: 1.5rem; margin: 0;">Lattice Degrees of Freedom</h3>
                    <p style="font-size: 1.35rem; color: #94a3b8; margin: 0;">
                        Only independent parameters are optimized per crystal system:
                    </p>
                    <table class="science-table" style="font-size: 1.05rem; margin-top: 5px;">
                        <thead>
                            <tr>
                                <th style="padding: 6px 12px;">Crystal System</th>
                                <th style="padding: 6px 12px;">Independent Variables</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 6px 12px;">Cubic</td>
                                <td style="padding: 6px 12px;">$a$ ($b = c = a$; angles locked to $90^\\circ$)</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 12px;">Tetragonal/Hex</td>
                                <td style="padding: 6px 12px;">$a, c$ ($b = a$; angles locked to $90^\\circ$ or $120^\\circ$)</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 12px;">Orthorhombic</td>
                                <td style="padding: 6px 12px;">$a, b, c$ (angles locked to $90^\\circ$)</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 12px;">Monoclinic</td>
                                <td style="padding: 6px 12px;">$a, b, c, \\beta$ (\\alpha = \\gamma = 90^\\circ$)</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 12px;">Triclinic</td>
                                <td style="padding: 6px 12px;">$a, b, c, \\beta$ (\\alpha and \\gamma held fixed at current values)</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="glass-card" style="padding: 14px 18px; border-color: var(--accent-mint); background: rgba(0,245,212,0.01); font-size: 1.15rem; line-height: 1.4; margin-top: 4px;">
                        <strong style="color: var(--accent-mint); display: block; margin-bottom: 6px;">Hyperparameter Origins</strong>
                        <ul style="margin: 0; padding-left: 18px; color: #94a3b8; gap: 4px;">
                            <li>$0.95$ packing coefficient — slightly below sphere-packed density.</li>
                            <li>Step range $[1.0, 5.0]$ — empirically calibrated to cell scale.</li>
                            <li>$\\times 0.5$ shrink — immediate rollback-and-retry on any drop.</li>
                        </ul>
                    </div>
                </div>
                <div class="column" style="gap: 18px;">
                    <canvas id="widget-lattice-breathe"
                        style="width:100%; height:200px; border-radius:12px;
                               border:1px solid var(--border-glass); background:rgba(8,12,22,0.5);
                               margin-bottom:4px;">
                    </canvas>
                    <div class="glass-card" style="padding: 22px; background: rgba(5,7,12,0.4); border-color: var(--border-glass); gap: 12px;">
                        <h3 style="color: var(--accent-mint); font-size: 1.5rem; margin: 0; padding-bottom: 6px;">Bold-Driver Step Adaptation</h3>
                        <ul style="gap: 10px; font-size: 1.25rem; padding-left: 22px;">
                            <li><strong>Packing Seed:</strong> $a_{\\text{seed}} = 0.95\\,\\mu_{\\text{avg}} N_{\\text{atoms}}^{1/3}$</li>
                            <li><strong>Adaptive Steps:</strong> Starts $1.0\\,\\text{Å}/^\\circ$, grows $\\times 1.3$ on success (max $5.0$), shrinks $\\times 0.5$ on failure.</li>
                            <li><strong>Failsafe Rollback:</strong> Reverts if final score is worse than the start.</li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Joint Optimisation Pipeline",
        subtitle: "Alternating Multi-Stage Solver",
        layout: "columns",
        content: `
            <div style="display: flex; flex-direction: column; gap: 24px; width: 100%; height: 520px;">
                <div class="columns" style="grid-template-columns: repeat(3, 1fr); gap: 24px; width: 100%; flex-grow: 1;">
                    <!-- Column 1: Initialization -->
                    <div class="column" style="gap: 20px; display: flex; flex-direction: column; height: 100%;">
                        <div style="font-size: 1.2rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; padding-left: 4px;">1. Initialization</div>
                        
                        <div class="glass-card" style="gap: 10px; background: rgba(255,255,255,0.01); border-radius: 14px; padding: 24px 28px; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                            <div style="font-size: 1.45rem; font-weight: 700; color: #9b5de5; margin-bottom: 6px;">Step 1 — GMM Seeding</div>
                            <p style="font-size: 1.2rem; color: #94a3b8; line-height: 1.55; margin: 0;">
                                Scales the unit cell using $a_{\\text{seed}} \\propto \\mu_{\\text{avg}} N^{1/3}$ to prevent atom overlaps. <strong>Executed first</strong> to establish a valid cell volume.
                            </p>
                        </div>
                        
                        <div class="glass-card" style="gap: 10px; background: rgba(255,255,255,0.01); border-radius: 14px; padding: 24px 28px; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                            <div style="font-size: 1.45rem; font-weight: 700; color: #00bbf9; margin-bottom: 6px;">Step 2 — Coordinate Scan</div>
                            <p style="font-size: 1.2rem; color: #94a3b8; line-height: 1.55; margin: 0;">
                                Scans $200\\text{–}600$ 1D axis points per free atom, placing each at its score peak. <strong>Skips</strong> already placed, collision-free atoms.
                            </p>
                        </div>
                    </div>

                    <!-- Column 2: Optimization Loop -->
                    <div class="column" style="gap: 20px; display: flex; flex-direction: column; height: 100%;">
                        <div style="font-size: 1.2rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; padding-left: 4px;">2. Optimization</div>
                        
                        <div class="glass-card" style="gap: 10px; background: rgba(255,255,255,0.01); border-radius: 14px; padding: 24px 28px; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                            <div style="font-size: 1.45rem; font-weight: 700; color: #00f5d4; margin-bottom: 6px;">Step 3 — Alternating Loop</div>
                            <p style="font-size: 1.2rem; color: #94a3b8; line-height: 1.55; margin: 0;">
                                Alternates $100$ Adam coordinate steps with Bold-Driver lattice updates. Converges when relative score change $\\Delta\\text{Score} < 5\\times10^{-3}$.
                            </p>
                        </div>
                        
                        <div class="glass-card" style="gap: 10px; background: rgba(255,255,255,0.01); border-radius: 14px; padding: 24px 28px; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                            <div style="font-size: 1.45rem; font-weight: 700; color: #eab308; margin-bottom: 6px;">Step 4 — Fine Pass</div>
                            <p style="font-size: 1.2rem; color: #94a3b8; line-height: 1.55; margin: 0;">
                                Performs a final tight coordinate relaxation sweep using gradient descent to achieve precise equilibrium coordinates.
                            </p>
                        </div>
                    </div>

                    <!-- Column 3: Quality Check & Safety -->
                    <div class="column" style="gap: 20px; display: flex; flex-direction: column; height: 100%;">
                        <div style="font-size: 1.2rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; padding-left: 4px;">3. Safety & Parameters</div>
                        
                        <div class="glass-card" style="gap: 10px; background: rgba(255,255,255,0.01); border-radius: 14px; padding: 24px 28px; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                            <div style="font-size: 1.45rem; font-weight: 700; color: #22c55e; margin-bottom: 6px;">Step 5 — Verify & Restart</div>
                            <p style="font-size: 1.2rem; color: #94a3b8; line-height: 1.55; margin: 0;">
                                Validates final structure. If green bonds are $< 80\\%$, perturbs the coordinates and restarts to escape local energy minima.
                            </p>
                        </div>
                        
                        <div class="glass-card" style="background: rgba(0,187,249,0.01); border-color: var(--accent-blue); border-radius: 14px; padding: 24px 28px; gap: 10px; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                            <strong style="color: var(--accent-blue); display: block; font-size: 1.35rem; margin-bottom: 4px;">Parameter Origins</strong>
                            <ul style="margin: 0; padding-left: 20px; color: #94a3b8; font-size: 1.1rem; display: flex; flex-direction: column; gap: 6px;">
                                <li>$200\\text{–}600$ scan points — optimal 1D resolution.</li>
                                <li>$100$ Adam steps — ensures local convergence.</li>
                                <li>$80\\%$ check — heuristic for bad traps.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="failsafe-ribbon" style="margin-top: 15px; padding: 12px 24px; font-size: 1.1rem; line-height: 1.55; width: 100%;">
                <strong>Rollback Failsafe:</strong> Structure snapshots cached before each step. Automatically restored if the final score regresses or a steric wall violation occurs.
            </div>
        `
    },
    {
        title: "Tensor Map Scans",
        subtitle: "Multi-Core & GPU Grids",
        layout: "columns",
        content: `
            <div class="columns" style="gap: 30px;">
                <div class="column" style="gap: 18px;">
                    <h3 style="font-size: 1.55rem; margin: 0;">Grid Tensor Search Space</h3>
                    <p style="font-size: 1.35rem; color: #94a3b8; margin: 0;">
                        Exhaustive $1\\text{D}/2\\text{D}$ scans over coordinate or cell-parameter ranges when local minima exist:
                    </p>
                    <ul style="gap: 12px; font-size: 1.3rem;">
                        <li><strong>$1\\text{D}/2\\text{D}$ Scans:</strong> Maps the score landscape along any axis or pair of axes.</li>
                        <li><strong>Interactive Canvas:</strong> Click a pixel to jump to that configuration instantly.</li>
                        <li><strong>Zoom:</strong> Click-drag to zoom into any coordinate box.</li>
                    </ul>
                    <div style="padding: 14px 20px; background: rgba(0,187,249,0.05); border-left: 4px solid var(--accent-blue); border-radius: 0 8px 8px 0; font-size: 1.25rem; line-height: 1.5; color: #94a3b8;">
                        <strong>CPU cap: $100{,}000$ points (1D) / $500{,}000$ points (2D)</strong> — prevents browser event-loop freeze.
                    </div>
                </div>
                <div class="column">
                    <div class="glass-card" style="background: rgba(5,7,12,0.4); border-color: var(--border-glass); gap: 18px; padding: 26px;">
                        <h3 style="color: var(--accent-mint); font-size: 1.5rem; margin: 0; padding-bottom: 8px;">Execution Backends</h3>
                        <div style="gap: 6px; display: flex; flex-direction: column;">
                            <span style="font-size:1.3rem;color:var(--accent-blue);font-weight:600;">1. Multi-Core Web Workers</span>
                            <p style="font-size:1.2rem;color:#94a3b8;line-height:1.4;margin: 0;">
                                One worker per CPU core, columns partitioned. Capped at $500{,}000$ nodes.
                            </p>
                        </div>
                        <div style="gap: 6px; display: flex; flex-direction: column; margin-top: 8px;">
                            <span style="font-size:1.3rem;color:var(--accent-purple);font-weight:600;">2. PyTorch CUDA Server (Port $7842$)</span>
                            <p style="font-size:1.2rem;color:#94a3b8;line-height:1.4;margin: 0;">
                                Streams grids to a local GPU server. No cap — millions of nodes computed instantly.
                            </p>
                        </div>
                    </div>
                    <div class="glass-card" style="background: rgba(0,187,249,0.01); border-color: var(--accent-blue); gap: 4px; padding: 14px 18px; margin-top: 14px; font-size: 1.1rem; line-height: 1.4;">
                        <strong style="color: var(--accent-blue); display: block; margin-bottom: 4px;">Limit Origins</strong>
                        <ul style="margin: 0; padding-left: 18px; color: #94a3b8; gap: 4px;">
                            <li>$100{,}000$ (1D) — single-axis hang boundary for JS main thread.</li>
                            <li>$500{,}000$ (2D) — two-axis hang boundary; partitioned across Web Workers.</li>
                            <li>Port $7842$ — avoids standard port conflicts.</li>
                            <li>Grid density matches canvas pixel resolution (e.g. $200{\\times}200$).</li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Conclusion",
        subtitle: "Questions & Discussion",
        layout: "title-slide",
        content: `
            <div class="title-slide-content" style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; width: 100%; gap: 40px; position: relative;">
                <!-- Decorative subtle mesh/grid background for premium vibe -->
                <div style="position: absolute; width: 120%; height: 120%; background-image: radial-gradient(var(--border-glass) 1px, transparent 1px); background-size: 40px 40px; opacity: 0.15; pointer-events: none; transform: rotate(5deg); z-index: 0;"></div>
                
                <div style="text-align: center; z-index: 1; margin-bottom: 10px;">
                    <h1 style="font-size: 5.8rem; font-weight: 800; line-height: 1.1; margin-bottom: 20px; background: linear-gradient(135deg, #ffffff 0%, var(--accent-mint) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -2px;">
                        Thank You
                    </h1>
                    <span style="font-family: var(--font-mono); font-size: 1.8rem; color: var(--accent-blue); text-transform: uppercase; letter-spacing: 4px; font-weight: 500;">
                        Questions & Discussion
                    </span>
                </div>

                <!-- Aesthetic Dynamic Grid representing the core architectural highlights -->
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; width: 85%; max-width: 1400px; z-index: 1;">
                    
                    <!-- Card 1: Symmetry -->
                    <div class="glass-card" style="padding: 24px; background: linear-gradient(135deg, rgba(155, 93, 229, 0.03) 0%, rgba(15, 23, 42, 0.45) 100%); border: 1px solid rgba(155, 93, 229, 0.2); border-radius: 20px; display: flex; flex-direction: row; gap: 20px; align-items: center; transition: all 0.3s;">
                        <div style="width: 54px; height: 54px; border-radius: 12px; background: rgba(155, 93, 229, 0.1); border: 1px solid var(--accent-purple); display: flex; align-items: center; justify-content: center; color: var(--accent-purple); flex-shrink: 0;">
                            <svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M12 2L2 22h20L12 2zm0 3.99L19.53 19H4.47L12 5.99zM12 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <h4 style="font-size: 1.35rem; font-weight: 700; color: #ffffff; margin: 0;">Symmetry & Space</h4>
                            <p style="font-size: 1.1rem; color: #94a3b8; line-height: 1.4; margin: 0;">
                                Fractional coordinate operations and Wyckoff axis analysis mapping symmetry constraints modulo $1$.
                            </p>
                        </div>
                    </div>

                    <!-- Card 2: Potentials -->
                    <div class="glass-card" style="padding: 24px; background: linear-gradient(135deg, rgba(0, 187, 249, 0.03) 0%, rgba(15, 23, 42, 0.45) 100%); border: 1px solid rgba(0, 187, 249, 0.2); border-radius: 20px; display: flex; flex-direction: row; gap: 20px; align-items: center; transition: all 0.3s;">
                        <div style="width: 54px; height: 54px; border-radius: 12px; background: rgba(0, 187, 249, 0.1); border: 1px solid var(--accent-blue); display: flex; align-items: center; justify-content: center; color: var(--accent-blue); flex-shrink: 0;">
                            <svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"/></svg>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <h4 style="font-size: 1.35rem; font-weight: 700; color: #ffffff; margin: 0;">CSD GMM Potentials</h4>
                            <p style="font-size: 1.1rem; color: #94a3b8; line-height: 1.4; margin: 0;">
                                Multi-component Gaussian Mixture Models modeling steric bounds and peak bond distances.
                            </p>
                        </div>
                    </div>

                    <!-- Card 3: Optimizers -->
                    <div class="glass-card" style="padding: 24px; background: linear-gradient(135deg, rgba(0, 245, 212, 0.03) 0%, rgba(15, 23, 42, 0.45) 100%); border: 1px solid rgba(0, 245, 212, 0.2); border-radius: 20px; display: flex; flex-direction: row; gap: 20px; align-items: center; transition: all 0.3s;">
                        <div style="width: 54px; height: 54px; border-radius: 12px; background: rgba(0, 245, 212, 0.1); border: 1px solid var(--accent-mint); display: flex; align-items: center; justify-content: center; color: var(--accent-mint); flex-shrink: 0;">
                            <svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zm-14 9v2h14v-2H5z"/></svg>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <h4 style="font-size: 1.35rem; font-weight: 700; color: #ffffff; margin: 0;">Alternating Solvers</h4>
                            <p style="font-size: 1.1rem; color: #94a3b8; line-height: 1.4; margin: 0;">
                                Dynamic coordinate relaxation via multi-start Adam matched with Bold-Driver lattice adaptations.
                            </p>
                        </div>
                    </div>

                    <!-- Card 4: Computes -->
                    <div class="glass-card" style="padding: 24px; background: linear-gradient(135deg, rgba(255, 159, 67, 0.03) 0%, rgba(15, 23, 42, 0.45) 100%); border: 1px solid rgba(255, 159, 67, 0.2); border-radius: 20px; display: flex; flex-direction: row; gap: 20px; align-items: center; transition: all 0.3s;">
                        <div style="width: 54px; height: 54px; border-radius: 12px; background: rgba(255, 159, 67, 0.1); border: 1px solid var(--color-orange); display: flex; align-items: center; justify-content: center; color: var(--color-orange); flex-shrink: 0;">
                            <svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <h4 style="font-size: 1.35rem; font-weight: 700; color: #ffffff; margin: 0;">High-Performance Compute</h4>
                            <p style="font-size: 1.1rem; color: #94a3b8; line-height: 1.4; margin: 0;">
                                CPU Multi-Core Web Worker pooling and PyTorch CUDA server streaming resolving millions of tensor grid nodes.
                            </p>
                        </div>
                    </div>

                </div>

                <!-- Closing Presenter Footer -->
                <div class="authors-section" style="display: flex; justify-content: center; gap: 100px; margin-top: 20px; z-index: 1;">
                    <div style="text-align: center;">
                        <span style="font-size: 1.2rem; color: #ffffff; font-weight: 700;">Muath Hamidi</span>
                        <span style="font-size: 1.05rem; color: #64748b; display: block; margin-top: 2px;">Université de Montréal & Mila</span>
                    </div>
                    <div style="text-align: center;">
                        <span style="font-size: 1.2rem; color: #ffffff; font-weight: 700;">Andrea Bianchi</span>
                        <span style="font-size: 1.05rem; color: #64748b; display: block; margin-top: 2px;">Université de Montréal</span>
                    </div>
                </div>
            </div>
        `
    }
];
