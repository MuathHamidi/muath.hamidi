/**
 * PowerPoint Slide Widgets
 * Renders and runs interactive demonstrations in the presentation slides.
 */

const Widgets = {
    activeTimers: [],

    // --- New slide: Bond Scoring Visualizer state ---
    csSpaceGroupsData: null,
    csPairsData: null,
    csAtomsList: [],
    csIdCounter: 0,
    csSelectedSG: null,
    csState: null,
    csAnimationFrameId: null,
    csRenderer: null,
    csScene: null,
    csCamera: null,
    csControls: null,

    init(slideIndex) {
        // Clear previous timers or active loops
        this.activeTimers.forEach(timer => clearInterval(timer));
        this.activeTimers = [];

        // Clean up Three.js animation frame loop and memory from Crystal Builder
        if (this.cbAnimationFrameId) {
            cancelAnimationFrame(this.cbAnimationFrameId);
            this.cbAnimationFrameId = null;
        }
        if (this.cbRenderer) {
            if (this.cbRenderer.domElement && this.cbRenderer.domElement.parentNode) {
                this.cbRenderer.domElement.parentNode.removeChild(this.cbRenderer.domElement);
            }
            this.cbRenderer.dispose();
            this.cbRenderer = null;
        }
        this.cbScene = null;
        this.cbCamera = null;
        this.cbControls = null;

        // Clean up Three.js animation frame loop and memory from Crystal Scoring
        if (this.csAnimationFrameId) {
            cancelAnimationFrame(this.csAnimationFrameId);
            this.csAnimationFrameId = null;
        }
        if (this.csRenderer) {
            if (this.csRenderer.domElement && this.csRenderer.domElement.parentNode) {
                this.csRenderer.domElement.parentNode.removeChild(this.csRenderer.domElement);
            }
            this.csRenderer.dispose();
            this.csRenderer = null;
        }
        this.csScene = null;
        this.csCamera = null;
        this.csControls = null;

        // Clean up our custom simulation loops
        const animFrameIds = [
            'titleBgAnimFrameId', 'wyckoffAnimFrameId', 'gmmAnimFrameId',
            'bondZoneAnimFrameId', 'kernelAnimFrameId', 'relaxAnimFrameId',
            'breatheAnimFrameId', 'pipelineAnimFrameId'
        ];
        animFrameIds.forEach(id => {
            if (this[id]) { cancelAnimationFrame(this[id]); this[id] = null; }
        });
        if (this.titleBgCleanup) { this.titleBgCleanup(); this.titleBgCleanup = null; }

        const slide = slidesData[slideIndex];
        if (!slide || !slide.content) return;

        if (slide.content.includes('id="title-crystal-bg"')) {
            this.initTitleCrystalAnimation();
        }

        if (slide.content.includes('id="widget-lattice"')) {
            this.initLatticeWidget();
        }
        if (slide.content.includes('id="widget-wrap"')) {
            this.initPeriodicWrapWidget();
        }
        if (slide.content.includes('id="widget-interatomic-distances"')) {
            this.initInteratomicDistancesWidget();
        }
        if (slide.content.includes('id="widget-crystal-builder"')) {
            this.initCrystalBuilderWidget();
        }
        if (slide.content.includes('id="widget-crystal-scoring"')) {
            this.initCrystalScoringWidget();
        }
        if (slide.content.includes('id="widget-gmm"')) {
            this.initGmmWidget();
        }
        if (slide.content.includes('id="widget-bond-zone"')) {
            this.initBondZoneWidget();
        }
        if (slide.content.includes('id="widget-kernel-surf"')) {
            this.initKernelSurferWidget();
        }
        if (slide.content.includes('id="widget-relax"')) {
            this.initRelaxationWidget();
        }
        if (slide.content.includes('id="widget-lattice-breathe"')) {
            this.initLatticeBreatheWidget();
        }
        if (slide.content.includes('id="widget-pipeline-flow"')) {
            this.initPipelineFlowWidget();
        }

    },

    // --- Slide 2: Lattice Calculator ---
    initLatticeWidget() {
        const container = document.getElementById('widget-lattice');
        if (!container) return;

        container.innerHTML = `
            <div class="widget-title">
                <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2zm0 8H7v-2h10v2z"/></svg>
                Lattice Matrix & Volume Calculator
            </div>
            <div class="widget-body">
                <div class="crystal-system-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 10px;">
                    <div class="system-card active" data-sys="cubic" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-glass); border-radius: 6px; padding: 10px; text-align: center; cursor: pointer; transition: all 0.2s;">
                        <h4 style="font-size: 1rem; color: #fff; margin-bottom: 4px;">Cubic</h4>
                        <p style="font-size: 0.8rem; color: var(--accent-blue); font-family: var(--font-mono);">a=b=c</p>
                    </div>
                    <div class="system-card" data-sys="ortho" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-glass); border-radius: 6px; padding: 10px; text-align: center; cursor: pointer; transition: all 0.2s;">
                        <h4 style="font-size: 1rem; color: #fff; margin-bottom: 4px;">Ortho</h4>
                        <p style="font-size: 0.8rem; color: var(--accent-blue); font-family: var(--font-mono);">a≠b≠c</p>
                    </div>
                    <div class="system-card" data-sys="hex" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-glass); border-radius: 6px; padding: 10px; text-align: center; cursor: pointer; transition: all 0.2s;">
                        <h4 style="font-size: 1rem; color: #fff; margin-bottom: 4px;">Hex</h4>
                        <p style="font-size: 0.8rem; color: var(--accent-blue); font-family: var(--font-mono);">γ=120°</p>
                    </div>
                </div>

                <div class="input-row">
                    <div class="input-group">
                        <label>a (Å)</label>
                        <input type="number" id="lat-a" value="5.2" step="0.1" min="2" max="20">
                    </div>
                    <div class="input-group">
                        <label>b (Å)</label>
                        <input type="number" id="lat-b" value="5.2" step="0.1" min="2" max="20" disabled>
                    </div>
                    <div class="input-group">
                        <label>c (Å)</label>
                        <input type="number" id="lat-c" value="5.2" step="0.1" min="2" max="20" disabled>
                    </div>
                </div>
                <div class="input-row">
                    <div class="input-group">
                        <label>α (°)</label>
                        <input type="number" id="lat-alpha" value="90" disabled>
                    </div>
                    <div class="input-group">
                        <label>β (°)</label>
                        <input type="number" id="lat-beta" value="90" disabled>
                    </div>
                    <div class="input-group">
                        <label>γ (°)</label>
                        <input type="number" id="lat-gamma" value="90" disabled>
                    </div>
                </div>

                <div class="matrix-container">
                    <div style="font-weight: 700; color: #475569; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 6px;">Lattice Basis Matrix Mᵀ</div>
                    <div class="matrix-row-disp" id="mat-row-a"><span class="row-lbl">a⃗</span><span>5.200</span><span>0.000</span><span>0.000</span></div>
                    <div class="matrix-row-disp" id="mat-row-b"><span class="row-lbl">b⃗</span><span>0.000</span><span>5.200</span><span>0.000</span></div>
                    <div class="matrix-row-disp" id="mat-row-c"><span class="row-lbl">c⃗</span><span>0.000</span><span>0.000</span><span>5.200</span></div>
                    <div class="vol-display">
                        <span>Unit Cell Volume (V):</span>
                        <span class="vol-val" id="lat-vol">140.608 Å³</span>
                    </div>
                </div>
            </div>
        `;

        const inputs = {
            a: document.getElementById('lat-a'),
            b: document.getElementById('lat-b'),
            c: document.getElementById('lat-c'),
            alpha: document.getElementById('lat-alpha'),
            beta: document.getElementById('lat-beta'),
            gamma: document.getElementById('lat-gamma'),
            vol: document.getElementById('lat-vol'),
            rowA: document.getElementById('mat-row-a'),
            rowB: document.getElementById('mat-row-b'),
            rowC: document.getElementById('mat-row-c')
        };

        let currentSystem = 'cubic';

        const updateSystem = (sys) => {
            currentSystem = sys;
            document.querySelectorAll('.system-card').forEach(c => {
                c.style.background = 'rgba(255,255,255,0.02)';
                c.style.borderColor = 'var(--border-glass)';
            });
            const activeCard = document.querySelector(`.system-card[data-sys="${sys}"]`);
            if (activeCard) {
                activeCard.style.background = 'rgba(0, 187, 249, 0.08)';
                activeCard.style.borderColor = 'var(--accent-blue)';
            }

            if (sys === 'cubic') {
                inputs.b.disabled = true;
                inputs.c.disabled = true;
                inputs.b.value = inputs.a.value;
                inputs.c.value = inputs.a.value;
                inputs.gamma.value = 90;
            } else if (sys === 'ortho') {
                inputs.b.disabled = false;
                inputs.c.disabled = false;
                inputs.b.value = "5.6";
                inputs.c.value = "6.2";
                inputs.gamma.value = 90;
            } else if (sys === 'hex') {
                inputs.b.disabled = true;
                inputs.c.disabled = false;
                inputs.b.value = inputs.a.value;
                inputs.c.value = "6.5";
                inputs.gamma.value = 120;
            }
            calculate();
        };

        const calculate = () => {
            const a = parseFloat(inputs.a.value) || 1.0;
            let b = parseFloat(inputs.b.value) || 1.0;
            let c = parseFloat(inputs.c.value) || 1.0;
            const alphaVal = parseFloat(inputs.alpha.value) || 90;
            const betaVal = parseFloat(inputs.beta.value) || 90;
            const gammaVal = parseFloat(inputs.gamma.value) || 90;

            if (currentSystem === 'cubic') {
                b = a;
                c = a;
                inputs.b.value = a;
                inputs.c.value = a;
            } else if (currentSystem === 'hex') {
                b = a;
                inputs.b.value = a;
            }

            const alpha = alphaVal * Math.PI / 180;
            const beta = betaVal * Math.PI / 180;
            const gamma = gammaVal * Math.PI / 180;

            const cosA = Math.cos(alpha);
            const cosB = Math.cos(beta);
            const cosG = Math.cos(gamma);
            const sinG = Math.sin(gamma);

            const volTerm = 1 - cosA*cosA - cosB*cosB - cosG*cosG + 2*cosA*cosB*cosG;
            const V = a * b * c * (volTerm > 0 ? Math.sqrt(volTerm) : 0);

            const ax = a, ay = 0, az = 0;
            const bx = b * cosG, by = b * sinG, bz = 0;
            const cx = c * cosB;
            const cy = sinG !== 0 ? c * (cosA - cosB * cosG) / sinG : 0;
            const cz = (a * b * sinG) !== 0 ? V / (a * b * sinG) : 0;

            inputs.rowA.innerHTML = `<span class="row-lbl">a⃗</span><span>${ax.toFixed(3)}</span><span>${ay.toFixed(3)}</span><span>${az.toFixed(3)}</span>`;
            inputs.rowB.innerHTML = `<span class="row-lbl">b⃗</span><span>${bx.toFixed(3)}</span><span>${by.toFixed(3)}</span><span>${bz.toFixed(3)}</span>`;
            inputs.rowC.innerHTML = `<span class="row-lbl">c⃗</span><span>${cx.toFixed(3)}</span><span>${cy.toFixed(3)}</span><span>${cz.toFixed(3)}</span>`;
            inputs.vol.innerText = `${V.toFixed(3)} Å³`;
        };

        document.querySelectorAll('.system-card').forEach(card => {
            card.addEventListener('click', () => {
                updateSystem(card.dataset.sys);
            });
        });

        inputs.a.addEventListener('input', () => {
            if (currentSystem === 'cubic' || currentSystem === 'hex') {
                inputs.b.value = inputs.a.value;
            }
            if (currentSystem === 'cubic') {
                inputs.c.value = inputs.a.value;
            }
            calculate();
        });
        inputs.b.addEventListener('input', calculate);
        inputs.c.addEventListener('input', calculate);

        calculate();
    },

    // --- Slide 3: Periodic Wrap Demo ---
    initPeriodicWrapWidget() {
        const container = document.getElementById('widget-wrap');
        if (!container) return;

        container.innerHTML = `
            <div class="widget-title">
                <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                Periodic Wrapping Canvas
            </div>
            <div class="widget-body" style="gap: 12px;">
                <div class="slider-group">
                    <div class="slider-label-row">
                        <span>Fractional coordinate f_x (Raw)</span>
                    </div>
                    <div class="slider-row">
                        <input type="range" id="wrap-fx" min="-0.9" max="1.9" step="0.01" value="1.35">
                        <span class="slider-val" id="wrap-fx-val">1.35</span>
                    </div>
                </div>
                <div class="slider-group">
                    <div class="slider-label-row">
                        <span>Fractional coordinate f_y (Raw)</span>
                    </div>
                    <div class="slider-row">
                        <input type="range" id="wrap-fy" min="-0.9" max="1.9" step="0.01" value="0.4">
                        <span class="slider-val" id="wrap-fy-val">0.40</span>
                    </div>
                </div>

                <div class="canvas-wrapper" style="aspect-ratio: 1.4;">
                    <canvas id="wrap-canvas" width="360" height="240"></canvas>
                </div>

                <div class="wrap-metric-card">
                    <div>Raw Coordinate: <strong id="raw-coord" style="color: var(--accent-blue);">[1.35, 0.40]</strong></div>
                    <div>Wrapped Image: <strong id="wrap-coord" style="color: var(--accent-mint);">[-0.65, 0.40]</strong></div>
                </div>
            </div>
        `;

        const fxSlider = document.getElementById('wrap-fx');
        const fySlider = document.getElementById('wrap-fy');
        const fxVal = document.getElementById('wrap-fx-val');
        const fyVal = document.getElementById('wrap-fy-val');
        const canvas = document.getElementById('wrap-canvas');
        const rawDisp = document.getElementById('raw-coord');
        const wrapDisp = document.getElementById('wrap-coord');

        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const draw = () => {
            const fx = parseFloat(fxSlider.value);
            const fy = parseFloat(fySlider.value);

            fxVal.innerText = fx.toFixed(2);
            fyVal.innerText = fy.toFixed(2);

            const roundX = Math.round(fx);
            const roundY = Math.round(fy);

            const wx = fx - roundX;
            const wy = fy - roundY;

            rawDisp.innerText = `[${fx.toFixed(2)}, ${fy.toFixed(2)}]`;
            wrapDisp.innerText = `[${wx.toFixed(2)}, ${wy.toFixed(2)}] (Wrapped to Image ${roundX}, ${roundY})`;

            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);

            const scale = 80;
            const originX = W / 2 - scale / 2;
            const originY = H / 2 - scale / 2;

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            for (let i = -2; i <= 3; i++) {
                ctx.beginPath();
                ctx.moveTo(originX + i * scale, 0);
                ctx.lineTo(originX + i * scale, H);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(0, originY + i * scale);
                ctx.lineTo(W, originY + i * scale);
                ctx.stroke();
            }

            // Primary cell
            ctx.strokeStyle = 'rgba(0, 245, 212, 0.3)';
            ctx.lineWidth = 2.5;
            ctx.strokeRect(originX, originY, scale, scale);

            ctx.font = '9px JetBrains Mono';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fillText('(0,0) Primary Cell', originX + 5, originY + 12);
            ctx.fillText('(1,0) Image', originX + scale + 5, originY + 12);
            ctx.fillText('(0,-1) Image', originX + 5, originY - scale + 12);

            const toCanvas = (fracX, fracY) => {
                return {
                    x: originX + fracX * scale,
                    y: originY + (1 - fracY) * scale
                };
            };

            const rawPos = toCanvas(fx, fy);
            const wrapPos = toCanvas(wx, wy);

            // connector
            ctx.beginPath();
            ctx.setLineDash([3, 3]);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.moveTo(rawPos.x, rawPos.y);
            ctx.lineTo(wrapPos.x, wrapPos.y);
            ctx.stroke();
            ctx.setLineDash([]);

            // Wrap Point
            ctx.beginPath();
            ctx.arc(wrapPos.x, wrapPos.y, 8, 0, 2 * Math.PI);
            ctx.fillStyle = '#00f5d4';
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(0, 245, 212, 0.5)';
            ctx.fill();
            ctx.shadowBlur = 0;

            // Raw point
            if (Math.abs(fx - wx) > 0.01 || Math.abs(fy - wy) > 0.01) {
                ctx.beginPath();
                ctx.arc(rawPos.x, rawPos.y, 6, 0, 2 * Math.PI);
                ctx.fillStyle = '#00bbf9';
                ctx.shadowBlur = 6;
                ctx.shadowColor = 'rgba(0, 187, 249, 0.5)';
                ctx.fill();
                ctx.shadowBlur = 0;

                ctx.fillStyle = 'rgba(255,255,255,0.4)';
                ctx.font = '10px sans-serif';
                ctx.fillText('Raw Input', rawPos.x + 10, rawPos.y - 4);
            }

            ctx.fillStyle = '#ffffff';
            ctx.font = '10px sans-serif';
            ctx.fillText('Minimum Image', wrapPos.x + 12, wrapPos.y + 3);
        };

        fxSlider.addEventListener('input', draw);
        fySlider.addEventListener('input', draw);
        draw();
    },

    // --- Slide 4: Wyckoff Evaluator ---
    initWyckoffWidget() {
        const container = document.getElementById('widget-wyckoff');
        if (!container) return;

        const spaceGroups = {
            "227": {
                name: "Fd-3m (No. 227) - Cubic / Diamond",
                wyckoff: {
                    "8a": {
                        label: "8a (site symmetry: -43m) - C nodes",
                        coords: [
                            "x, y, z",
                            "x+0.25, y+0.25, z+0.25",
                            "-x, -y, -z",
                            "-x+0.25, -y+0.25, -z+0.25",
                            "x, -y+0.5, -z+0.5",
                            "x+0.25, -y+0.75, -z+0.75",
                            "-x, y+0.5, z+0.5",
                            "-x+0.25, y+0.75, z+0.75"
                        ],
                        defaultXYZ: [0, 0, 0]
                    },
                    "16c": {
                        label: "16c (site symmetry: -3m) - Pyrochlore",
                        coords: [
                            "x, y, z", "x+0.25, y+0.25, z+0.25",
                            "-x, -y, -z", "-x+0.25, -y+0.25, -z+0.25",
                            "x, -y+0.5, -z+0.5", "x+0.25, -y+0.75, -z+0.75",
                            "-x, y+0.5, z+0.5", "-x+0.25, y+0.75, z+0.75",
                            "-x+0.5, -y, -z+0.5", "-x+0.75, -y+0.25, -z+0.75",
                            "x+0.5, y, z+0.5", "x+0.75, y+0.25, z+0.75",
                            "-x+0.5, y+0.5, z", "-x+0.75, y+0.75, z+0.25",
                            "x+0.5, -y+0.5, -z", "x+0.75, -y+0.75, -z+0.25"
                        ],
                        defaultXYZ: [0.125, 0.125, 0.125]
                    },
                    "32e": {
                        label: "32e (site symmetry: .3m)",
                        coords: [
                            "x, x, x", "-x, -x, -x",
                            "x, -x+0.5, -x+0.5", "-x, x+0.5, x+0.5",
                            "-x+0.5, -x, -x+0.5", "x+0.5, x, x+0.5",
                            "-x+0.5, x+0.5, -x", "x+0.5, -x+0.5, x",
                            "x+0.25, x+0.25, x+0.25", "-x+0.25, -x+0.25, -x+0.25",
                            "x+0.25, -x+0.75, -x+0.75", "-x+0.25, x+0.75, x+0.75",
                            "-x+0.75, -x+0.25, -x+0.75", "x+0.75, x+0.25, x+0.75",
                            "-x+0.75, x+0.75, -x+0.25", "x+0.75, -x+0.75, x+0.25"
                        ],
                        defaultXYZ: [0.22, 0.22, 0.22]
                    }
                }
            },
            "225": {
                name: "Fm-3m (No. 225) - Cubic / FCC",
                wyckoff: {
                    "4a": {
                        label: "4a (site symmetry: m-3m) - FCC Nodes",
                        coords: [
                            "x, y, z",
                            "x+0.5, y+0.5, z",
                            "x+0.5, y, z+0.5",
                            "x, y+0.5, z+0.5"
                        ],
                        defaultXYZ: [0, 0, 0]
                    },
                    "24d": {
                        label: "24d (site symmetry: m.mm) - Octahedral edges",
                        coords: [
                            "x, y, z", "x+0.5, y+0.5, z", "x+0.5, y, z+0.5", "x, y+0.5, z+0.5",
                            "y, z, x", "y+0.5, z+0.5, x", "y+0.5, z, x+0.5", "y, z+0.5, x+0.5",
                            "z, x, y", "z+0.5, x+0.5, y", "z+0.5, x, y+0.5", "z, x+0.5, y+0.5"
                        ],
                        defaultXYZ: [0, 0.25, 0.25]
                    }
                }
            },
            "194": {
                name: "P6_3/mmc (No. 194) - Hexagonal / HCP",
                wyckoff: {
                    "2c": {
                        label: "2c (site symmetry: -6m2) - HCP lattice nodes",
                        coords: [
                            "0.3333, 0.6667, 0.25",
                            "0.6667, 0.3333, 0.75"
                        ],
                        defaultXYZ: [0.3333, 0.6667, 0.25]
                    },
                    "4f": {
                        label: "4f (site symmetry: 3m.) - HCP inner coords",
                        coords: [
                            "0.3333, 0.6667, z",
                            "0.6667, 0.3333, -z+0.5",
                            "0.6667, 0.3333, -z",
                            "0.3333, 0.6667, z+0.5"
                        ],
                        defaultXYZ: [0.3333, 0.6667, 0.06]
                    }
                }
            },
            "14": {
                name: "P2_1/c (No. 14) - Monoclinic",
                wyckoff: {
                    "4e": {
                        label: "4e (site symmetry: 1) - General Position",
                        coords: [
                            "x, y, z",
                            "-x, y+0.5, -z+0.5",
                            "-x, -y, -z",
                            "x, -y+0.5, z+0.5"
                        ],
                        defaultXYZ: [0.25, 0.15, 0.45]
                    },
                    "2a": {
                        label: "2a (site symmetry: -1) - Inversion Center",
                        coords: [
                            "0, 0, 0",
                            "0, 0.5, 0.5"
                        ],
                        defaultXYZ: [0, 0, 0]
                    }
                }
            }
        };

        container.innerHTML = `
            <div class="widget-title">
                <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                Wyckoff Operation & Lattice Generator
            </div>
            <div class="widget-body" style="gap: 8px;">
                <div class="input-row" style="gap: 10px; margin-bottom: 4px;">
                    <div class="input-group" style="flex: 1.2;">
                        <label style="font-size: 0.8rem;">Space Group</label>
                        <select id="wyk-sg-select" style="background: rgba(15, 23, 42, 0.85); width: 100%; border: 1px solid var(--border-glass); border-radius: 4px; padding: 4px; color: #fff; font-size: 0.85rem;">
                        </select>
                    </div>
                    <div class="input-group" style="flex: 1.8;">
                        <label style="font-size: 0.8rem;">Wyckoff Site</label>
                        <select id="wyk-pos-select" style="background: rgba(15, 23, 42, 0.85); width: 100%; border: 1px solid var(--border-glass); border-radius: 4px; padding: 4px; color: #fff; font-size: 0.85rem;">
                        </select>
                    </div>
                </div>

                <div class="input-row" style="margin-bottom: 2px;">
                    <div class="slider-group" style="flex: 1;">
                        <div class="slider-label-row" style="font-size: 0.75rem;"><span>x</span><span id="wyk-x-val">0.25</span></div>
                        <input type="range" id="wyk-x" min="0" max="1" step="0.01" value="0.25" style="width:100%;">
                    </div>
                    <div class="slider-group" style="flex: 1;">
                        <div class="slider-label-row" style="font-size: 0.75rem;"><span>y</span><span id="wyk-y-val">0.15</span></div>
                        <input type="range" id="wyk-y" min="0" max="1" step="0.01" value="0.15" style="width:100%;">
                    </div>
                    <div class="slider-group" style="flex: 1;">
                        <div class="slider-label-row" style="font-size: 0.75rem;"><span>z</span><span id="wyk-z-val">0.45</span></div>
                        <input type="range" id="wyk-z" min="0" max="1" step="0.01" value="0.45" style="width:100%;">
                    </div>
                </div>

                <div class="axis-analysis" style="margin-top: 2px; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; display: flex; justify-content: space-around; background: rgba(0,0,0,0.15); border: 1px solid var(--border-glass);">
                    <div>Axis X: <span id="pill-x" class="axis-pill free">Free</span></div>
                    <div>Axis Y: <span id="pill-y" class="axis-pill free">Free</span></div>
                    <div>Axis Z: <span id="pill-z" class="axis-pill free">Free</span></div>
                </div>

                <div class="canvas-container" style="background: #080c14; border: 1px solid var(--border-glass); border-radius: 8px; display: flex; justify-content: center; align-items: center; padding: 5px 0;">
                    <canvas id="wyk-canvas" width="280" height="155" style="display: block; width: 280px; height: 155px; background: transparent;"></canvas>
                </div>

                <div style="font-size: 0.75rem; font-weight: 700; color: #475569; text-transform: uppercase;">Equivalent coordinates:</div>
                <div class="wyckoff-results-list" id="wyk-results" style="max-height: 80px; overflow-y: auto; font-size: 0.8rem; font-family: var(--font-mono); gap: 4px; display: flex; flex-direction: column; padding-right: 5px;"></div>
            </div>
        `;

        const sgSelect = document.getElementById('wyk-sg-select');
        const posSelect = document.getElementById('wyk-pos-select');
        const sx = document.getElementById('wyk-x');
        const sy = document.getElementById('wyk-y');
        const sz = document.getElementById('wyk-z');
        const vx = document.getElementById('wyk-x-val');
        const vy = document.getElementById('wyk-y-val');
        const vz = document.getElementById('wyk-z-val');
        const pillX = document.getElementById('pill-x');
        const pillY = document.getElementById('pill-y');
        const pillZ = document.getElementById('pill-z');
        const results = document.getElementById('wyk-results');
        const canvas = document.getElementById('wyk-canvas');

        // Populate Space Group dropdown
        Object.keys(spaceGroups).forEach(key => {
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = spaceGroups[key].name;
            if (key === "227") opt.selected = true;
            sgSelect.appendChild(opt);
        });

        const parseOp = (opStr, x, y, z) => {
            let clean = opStr.trim()
                .replace(/&minus;/g, '-')
                .replace(/−/g, '-');
            const parts = clean.split(',');
            if (parts.length !== 3) return [0,0,0];

            const evaluate = (expr) => {
                try {
                    // Quick sanitize to allow decimal evaluation or variables
                    const func = new Function('x', 'y', 'z', `return ${expr};`);
                    let val = func(x, y, z);
                    val = val % 1;
                    if (val < 0) val += 1;
                    return val;
                } catch(e) {
                    return 0;
                }
            };
            return [evaluate(parts[0]), evaluate(parts[1]), evaluate(parts[2])];
        };

        const update = () => {
            const x = parseFloat(sx.value);
            const y = parseFloat(sy.value);
            const z = parseFloat(sz.value);

            vx.innerText = x.toFixed(3);
            vy.innerText = y.toFixed(3);
            vz.innerText = z.toFixed(3);

            const sgKey = sgSelect.value;
            const posKey = posSelect.value;
            const group = spaceGroups[sgKey];
            if (!group) return;
            const site = group.wyckoff[posKey];
            if (!site) return;

            const ops = site.coords;
            results.innerHTML = '';

            // Render Projection Canvas
            const ctx = canvas.getContext('2d');
            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);

            // 3D Isometric Projection
            const project = (px, py, pz) => {
                const size = 68; // bounding size
                const ax = size * 0.95;
                const ay = size * 0.15;
                const bx = -size * 0.5;
                const by = size * 0.45;
                const cx = 0;
                const cy = -size * 0.9;

                const rx = W / 2 + (px - 0.5) * ax + (py - 0.5) * bx + (pz - 0.5) * cx;
                const ry = H / 2 + 10 + (px - 0.5) * ay + (py - 0.5) * by + (pz - 0.5) * cy;
                return { x: rx, y: ry };
            };

            // Draw unit cell wireframe boundaries
            const edges = [
                [[0,0,0], [1,0,0]], [[0,0,0], [0,1,0]], [[0,0,0], [0,0,1]],
                [[1,0,0], [1,1,0]], [[1,0,0], [1,0,1]],
                [[0,1,0], [1,1,0]], [[0,1,0], [0,1,1]],
                [[0,0,1], [1,0,1]], [[0,0,1], [0,1,1]],
                [[1,1,1], [1,1,0]], [[1,1,1], [1,0,1]], [[1,1,1], [0,1,1]]
            ];
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
            ctx.lineWidth = 1.2;
            edges.forEach(edge => {
                const p1 = project(edge[0][0], edge[0][1], edge[0][2]);
                const p2 = project(edge[1][0], edge[1][1], edge[1][2]);
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            });

            // Draw generated lattice points
            ops.forEach((op, idx) => {
                const coord = parseOp(op, x, y, z);
                results.innerHTML += `
                    <div class="wyckoff-item" style="display: flex; justify-content: space-between; padding: 2px 6px; border-bottom: 1px solid rgba(255,255,255,0.03); background: ${idx === 0 ? 'rgba(0, 245, 212, 0.05)' : 'transparent'};">
                        <span style="color: ${idx === 0 ? 'var(--accent-mint)' : 'var(--text-muted)'}">${op.trim()}</span>
                        <span class="coord" style="color: #fff; font-weight: 500;">[${coord[0].toFixed(3)}, ${coord[1].toFixed(3)}, ${coord[2].toFixed(3)}]</span>
                    </div>
                `;

                const pos = project(coord[0], coord[1], coord[2]);
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, 7, 0, 2 * Math.PI);
                ctx.fillStyle = idx === 0 ? '#00f5d4' : '#00bbf9';
                ctx.shadowBlur = 4;
                ctx.shadowColor = idx === 0 ? 'rgba(0, 245, 212, 0.4)' : 'rgba(0, 187, 249, 0.3)';
                ctx.fill();
                ctx.shadowBlur = 0;

                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1.2;
                ctx.stroke();

                ctx.fillStyle = '#000000';
                ctx.font = 'bold 8px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(idx + 1, pos.x, pos.y);
            });
        };

        const handlePosSelectChange = () => {
            const sgKey = sgSelect.value;
            const posKey = posSelect.value;
            const group = spaceGroups[sgKey];
            if (!group) return;
            const site = group.wyckoff[posKey];
            if (!site) return;

            const ops = site.coords;
            let xFree = false, yFree = false, zFree = false;
            ops.forEach(op => {
                const ox1 = parseOp(op, 0.1, 0.5, 0.5);
                const ox2 = parseOp(op, 0.7, 0.5, 0.5);
                if (Math.abs(ox1[0]-ox2[0]) > 0.05 || Math.abs(ox1[1]-ox2[1]) > 0.05 || Math.abs(ox1[2]-ox2[2]) > 0.05) xFree = true;

                const oy1 = parseOp(op, 0.5, 0.1, 0.5);
                const oy2 = parseOp(op, 0.5, 0.7, 0.5);
                if (Math.abs(oy1[0]-oy2[0]) > 0.05 || Math.abs(oy1[1]-oy2[1]) > 0.05 || Math.abs(oy1[2]-oy2[2]) > 0.05) yFree = true;

                const oz1 = parseOp(op, 0.5, 0.5, 0.1);
                const oz2 = parseOp(op, 0.5, 0.5, 0.7);
                if (Math.abs(oz1[0]-oz2[0]) > 0.05 || Math.abs(oz1[1]-oz2[1]) > 0.05 || Math.abs(oz1[2]-oz2[2]) > 0.05) zFree = true;
            });

            // Set input disabled states and values
            const defaults = site.defaultXYZ;
            
            const configureSlider = (slider, isFree, lockedVal, valDisplay) => {
                if (!isFree) {
                    slider.value = lockedVal;
                    slider.disabled = true;
                    slider.style.opacity = '0.35';
                    slider.style.pointerEvents = 'none';
                    valDisplay.style.color = 'var(--color-red)';
                } else {
                    slider.disabled = false;
                    slider.style.opacity = '1';
                    slider.style.pointerEvents = 'auto';
                    valDisplay.style.color = 'var(--accent-blue)';
                }
            };

            configureSlider(sx, xFree, defaults[0], vx);
            configureSlider(sy, yFree, defaults[1], vy);
            configureSlider(sz, zFree, defaults[2], vz);

            const setPill = (el, isFree) => {
                el.className = isFree ? 'axis-pill free' : 'axis-pill fixed';
                el.innerText = isFree ? 'Free' : 'Fixed';
            };
            setPill(pillX, xFree);
            setPill(pillY, yFree);
            setPill(pillZ, zFree);

            update();
        };

        const handleSgSelectChange = () => {
            const sgKey = sgSelect.value;
            const group = spaceGroups[sgKey];
            if (!group) return;

            posSelect.innerHTML = '';
            Object.keys(group.wyckoff).forEach(key => {
                const opt = document.createElement('option');
                opt.value = key;
                opt.textContent = group.wyckoff[key].label;
                posSelect.appendChild(opt);
            });
            handlePosSelectChange();
        };

        sgSelect.addEventListener('change', handleSgSelectChange);
        posSelect.addEventListener('change', handlePosSelectChange);
        sx.addEventListener('input', update);
        sy.addEventListener('input', update);
        sz.addEventListener('input', update);

        handleSgSelectChange();
    },

    // --- Slide 5: GMM Simulator ---
    initGmmWidget() {
        const container = document.getElementById('widget-gmm');
        if (!container) return;
        container.innerHTML = '';  // clear placeholder

        // Create canvas matching container size
        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'width:100%; height:100%; border-radius:12px;';
        container.appendChild(canvas);

        const DPR = window.devicePixelRatio || 1;
        const offsetW = container.clientWidth || 420;
        const offsetH = container.clientHeight || 280;
        canvas.width = offsetW * DPR;
        canvas.height = offsetH * DPR;
        const ctx = canvas.getContext('2d');
        ctx.scale(DPR, DPR);
        const W = offsetW, H = offsetH;

        // Example pairs with synthetic GMM parameters
        const pairs = [
            {
                name: 'Si–O (Silicate)',
                color1: '#00f5d4', color2: '#00bbf9',
                components: [
                    { mu: 1.62, sigma: 0.045, weight: 0.85, color: '#00f5d4' },
                    { mu: 1.77, sigma: 0.08,  weight: 0.15, color: '#00bbf9' },
                ],
                xMin: 1.3, xMax: 2.1
            },
            {
                name: 'C–C (Organic)',
                color1: '#9b5de5', color2: '#00bbf9',
                components: [
                    { mu: 1.20, sigma: 0.030, weight: 0.18, color: '#ef4444' },  // triple
                    { mu: 1.34, sigma: 0.035, weight: 0.27, color: '#f97316' },  // double
                    { mu: 1.52, sigma: 0.055, weight: 0.55, color: '#9b5de5' },  // single
                ],
                xMin: 1.0, xMax: 1.85
            },
            {
                name: 'Fe–O (Oxide)',
                color1: '#f97316', color2: '#eab308',
                components: [
                    { mu: 1.94, sigma: 0.06, weight: 0.65, color: '#f97316' },
                    { mu: 2.12, sigma: 0.09, weight: 0.35, color: '#eab308' },
                ],
                xMin: 1.55, xMax: 2.55
            }
        ];

        const PAIR_DURATION = 8000;   // ms total per pair
        const HIST_PHASE    = 2000;   // ms to fill histogram
        const COMP_PHASE    = 3500;   // ms to reveal all components (staggered)
        const MIX_PHASE     = 1000;   // ms to fade in mixture curve
        const HOLD_PHASE    = 1500;   // ms to hold complete view

        let pairIdx = 0;
        let pairStart = performance.now();

        // Gaussian helper
        const gaussian = (x, mu, sigma) =>
            Math.exp(-0.5 * ((x-mu)/sigma)**2) / (sigma * Math.sqrt(2*Math.PI));

        const PAD = { l:38, r:16, t:28, b:44 };
        const plotW = W - PAD.l - PAD.r;
        const plotH = H - PAD.t - PAD.b;

        const animate = (now) => {
            this.gmmAnimFrameId = requestAnimationFrame(animate);
            const elapsed = now - pairStart;
            if (elapsed > PAIR_DURATION) {
                pairIdx = (pairIdx + 1) % pairs.length;
                pairStart = now;
            }

            const pair = pairs[pairIdx];
            const t = now - pairStart;
            const { xMin, xMax, components } = pair;

            // Build x-axis sample points
            const N = 200;
            const xs = Array.from({length:N}, (_,i) => xMin + (i/(N-1))*(xMax-xMin));

            // Compute mixture PDF at each x
            const mixtureY = xs.map(x => components.reduce(
                (s,c) => s + c.weight * gaussian(x, c.mu, c.sigma), 0
            ));
            const yMax = Math.max(...mixtureY) * 1.15;

            // Helper: data coords → canvas pixels
            const px = (x) => PAD.l + (x - xMin) / (xMax - xMin) * plotW;
            const py = (y) => PAD.t + plotH - (y / yMax) * plotH;

            ctx.clearRect(0, 0, W, H);

            // Dark background
            ctx.fillStyle = 'rgba(8,12,22,0.0)';
            ctx.fillRect(0, 0, W, H);

            // === PHASE 1: histogram bars grow ===
            const histT = Math.min(1, t / HIST_PHASE);
            const nBins = 30;
            const binW = (xMax - xMin) / nBins;
            for (let b=0; b<nBins; b++) {
                const bx = xMin + b * binW + binW/2;
                const trueH = components.reduce((s,c) => s + c.weight * gaussian(bx, c.mu, c.sigma), 0);
                const noise = 0.85 + 0.30 * Math.sin(b * 7.3 + pairIdx * 2.1);
                const barH = trueH * noise * histT;
                const bX1 = px(xMin + b*binW);
                const bX2 = px(xMin + (b+1)*binW) - 1;
                const bY  = py(barH);
                ctx.fillStyle = 'rgba(100,116,139,0.35)';
                ctx.fillRect(bX1, bY, bX2-bX1, plotH + PAD.t - bY);
            }

            // === PHASE 2: components appear one by one ===
            if (t > HIST_PHASE) {
                const compElapsed = t - HIST_PHASE;
                const perComp = COMP_PHASE / components.length;
                components.forEach((comp, ci) => {
                    const compT = Math.min(1, Math.max(0, (compElapsed - ci*perComp) / (perComp*0.7)));
                    if (compT <= 0) return;

                    // Draw filled Gaussian curve
                    const compY = xs.map(x => comp.weight * gaussian(x, comp.mu, comp.sigma));
                    ctx.beginPath();
                    ctx.moveTo(px(xs[0]), py(compY[0]));
                    xs.forEach((x,i) => ctx.lineTo(px(x), py(compY[i])));
                    ctx.lineTo(px(xs[N-1]), py(0));
                    ctx.lineTo(px(xs[0]), py(0));
                    ctx.closePath();
                    ctx.fillStyle = comp.color + Math.round(compT * 40).toString(16).padStart(2,'0');
                    ctx.fill();

                    // Stroke the curve
                    ctx.beginPath();
                    ctx.moveTo(px(xs[0]), py(compY[0]));
                    xs.forEach((x,i) => ctx.lineTo(px(x), py(compY[i])));
                    ctx.strokeStyle = comp.color;
                    ctx.globalAlpha = compT * 0.9;
                    ctx.lineWidth = 1.8;
                    ctx.stroke();
                    ctx.globalAlpha = 1;

                    // Label: μ = X.XX Å
                    if (compT > 0.8) {
                        const peakX = px(comp.mu);
                        const peakY = py(comp.weight * gaussian(comp.mu, comp.mu, comp.sigma));
                        ctx.fillStyle = comp.color;
                        ctx.font = '9px JetBrains Mono, monospace';
                        ctx.fillText(`μ=${comp.mu.toFixed(2)}Å`, peakX - 16, peakY - 8);
                    }
                });
            }

            // === PHASE 3: mixture sum curve ===
            const mixStart = HIST_PHASE + COMP_PHASE;
            if (t > mixStart) {
                const mixT = Math.min(1, (t - mixStart) / MIX_PHASE);
                ctx.beginPath();
                ctx.moveTo(px(xs[0]), py(mixtureY[0]));
                xs.forEach((x,i) => ctx.lineTo(px(x), py(mixtureY[i])));
                ctx.strokeStyle = '#ffffff';
                ctx.globalAlpha = mixT;
                ctx.lineWidth = 2.5;
                ctx.stroke();
                ctx.globalAlpha = 1;

                const peakIdx = mixtureY.indexOf(Math.max(...mixtureY));
                ctx.fillStyle = `rgba(255,255,255,${mixT})`;
                ctx.font = 'bold 11px JetBrains Mono, monospace';
                ctx.fillText('p(d)', px(xs[peakIdx]) + 6, py(mixtureY[peakIdx]) - 6);
            }

            // === Axes ===
            ctx.strokeStyle = 'rgba(100,116,139,0.6)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(PAD.l, PAD.t + plotH);
            ctx.lineTo(PAD.l + plotW, PAD.t + plotH);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(PAD.l, PAD.t);
            ctx.lineTo(PAD.l, PAD.t + plotH);
            ctx.stroke();

            // x-axis ticks
            ctx.fillStyle = '#64748b';
            ctx.font = '9px JetBrains Mono, monospace';
            [xMin, (xMin+xMax)/2, xMax].forEach(v => {
                const bx = px(v);
                ctx.beginPath(); ctx.moveTo(bx, PAD.t+plotH); ctx.lineTo(bx, PAD.t+plotH+4); ctx.stroke();
                ctx.fillText(v.toFixed(2), bx-12, PAD.t+plotH+14);
            });
            ctx.fillText('d (Å)', PAD.l + plotW/2 - 12, H - 6);

            // Title
            ctx.fillStyle = '#94a3b8';
            ctx.font = 'bold 10px Outfit, sans-serif';
            ctx.fillText(`${pair.name} — GMM fit`, PAD.l, PAD.t - 8);
        };

        this.gmmAnimFrameId = requestAnimationFrame(animate);
    },

    // --- Slide 7: Relaxation Adam Trace ---
    initRelaxationWidget() {
        const container = document.getElementById('widget-relax');
        if (!container) return;
        container.innerHTML = '';

        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'width:100%; height:100%; border-radius:12px;';
        container.appendChild(canvas);

        const DPR = window.devicePixelRatio || 1;
        const offsetW = container.clientWidth || 420;
        const offsetH = container.clientHeight || 320;
        canvas.width = offsetW * DPR;
        canvas.height = offsetH * DPR;
        const ctx = canvas.getContext('2d');
        ctx.scale(DPR, DPR);
        const W = offsetW, H = offsetH;

        const Y0 = 98;
        const eqPos = [
            [W/2,     Y0],
            [W/2-40,  Y0+69.282],
            [W/2+40,  Y0+69.282],
            [W/2-40,  Y0+149.282],
            [W/2+40,  Y0+149.282],
            [W/2,     Y0-80],
        ];
        const ATOM_R = 12;
        const MU = 80;
        const SIGMA_PX = 5;

        const bonds = [[0,1],[0,2],[1,3],[2,4],[3,4],[0,5],[1,2]];

        let positions, m, v, t_adam, score_hist;

        const reset = () => {
            let attempts = 0;
            while (attempts < 100) {
                positions = eqPos.map(([ex,ey]) => [
                    ex + (Math.random()-0.5)*44,
                    ey + (Math.random()-0.5)*44
                ]);
                let hasRed = bonds.some(([i,j]) => {
                    const dx = positions[i][0]-positions[j][0], dy = positions[i][1]-positions[j][1];
                    const d = Math.sqrt(dx*dx+dy*dy);
                    const z = Math.abs((d - MU) / SIGMA_PX);
                    return z > 3.0;
                });
                if (hasRed) break;
                attempts++;
            }
            m = positions.map(() => [0,0]);
            v = positions.map(() => [0,0]);
            t_adam = 0;
            score_hist = [];
        };
        reset();

        const BETA1 = 0.9, BETA2 = 0.999, EPS = 1e-8, LR = 0.6, MAX_STEP = 4.0;

        const computeScore = (pos) => {
            return bonds.reduce((s, [i,j]) => {
                const dx = pos[i][0]-pos[j][0], dy = pos[i][1]-pos[j][1];
                const d = Math.sqrt(dx*dx+dy*dy);
                const z = (d - MU) / SIGMA_PX;
                return s + 4.0 * Math.exp(-0.5*z*z);
            }, 0);
        };

        const computeGrad = (pos) => {
            const h = 0.5;
            return pos.map((p, i) => {
                const gx = (() => {
                    const p2 = pos.map((q,j)=>j===i?[q[0]+h,q[1]]:q);
                    const p3 = pos.map((q,j)=>j===i?[q[0]-h,q[1]]:q);
                    return (computeScore(p2)-computeScore(p3))/(2*h);
                })();
                const gy = (() => {
                    const p2 = pos.map((q,j)=>j===i?[q[0],q[1]+h]:q);
                    const p3 = pos.map((q,j)=>j===i?[q[0],q[1]-h]:q);
                    return (computeScore(p2)-computeScore(p3))/(2*h);
                })();
                return [gx, gy];
            });
        };

        const bondColor = (d) => {
            const z = Math.abs((d-MU)/SIGMA_PX);
            if (z<=1) return '#22c55e'; // Green
            if (z<=2) return '#eab308'; // Yellow
            if (z<=3) return '#f97316'; // Orange
            return '#ef4444';           // Red
        };

        let converged = false;
        let convergeTime = 0;
        const SCORE_PANEL_H = 55;

        const animate = (now) => {
            this.relaxAnimFrameId = requestAnimationFrame(animate);

            if (!converged) {
                for (let step=0; step<3; step++) {
                    t_adam++;
                    const grad = computeGrad(positions);
                    positions = positions.map((p, i) => {
                        return p.map((pv, d) => {
                            m[i][d] = BETA1*m[i][d] + (1-BETA1)*grad[i][d];
                            v[i][d] = BETA2*v[i][d] + (1-BETA2)*grad[i][d]**2;
                            const mHat = m[i][d]/(1-BETA1**t_adam);
                            const vHat = v[i][d]/(1-BETA2**t_adam);
                            const raw  = LR * mHat/(Math.sqrt(vHat)+EPS);
                            return pv + Math.max(-MAX_STEP, Math.min(MAX_STEP, raw));
                        });
                    });
                }
                const sc = computeScore(positions);
                score_hist.push(sc);
                if (score_hist.length > 120) score_hist.shift();

                const allGreen = bonds.every(([i,j]) => {
                    const dx = positions[i][0]-positions[j][0], dy = positions[i][1]-positions[j][1];
                    const d = Math.sqrt(dx*dx+dy*dy);
                    const z = Math.abs((d - MU) / SIGMA_PX);
                    return z <= 1.0;
                });
                if (allGreen && t_adam > 40) {
                    converged = true;
                    convergeTime = now;
                }
            } else if (now - convergeTime > 2200) {
                converged = false;
                reset();
            }

            ctx.clearRect(0, 0, W, H);

            // === SCORE HISTORY CHART ===
            const CHART_Y = H - SCORE_PANEL_H;
            ctx.fillStyle = 'rgba(15,23,42,0.5)';
            ctx.fillRect(0, CHART_Y, W, SCORE_PANEL_H);
            ctx.strokeStyle = 'rgba(100,116,139,0.4)';
            ctx.lineWidth = 1;
            ctx.strokeRect(0, CHART_Y, W, SCORE_PANEL_H);

            ctx.fillStyle = '#64748b';
            ctx.font = '9px JetBrains Mono, monospace';
            ctx.fillText('Score', 4, CHART_Y+12);
            ctx.fillText('Iter', W-20, H-4);

            if (score_hist.length > 1) {
                const maxSc = Math.max(...score_hist, bonds.length * 4);
                ctx.beginPath();
                score_hist.forEach((sc, i) => {
                    const sx = (i / 119) * W;
                    const sy = CHART_Y + SCORE_PANEL_H - 8 - (sc/maxSc)*(SCORE_PANEL_H-16);
                    i===0 ? ctx.moveTo(sx,sy) : ctx.lineTo(sx,sy);
                });
                ctx.strokeStyle = '#00f5d4';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }

            // === ATOMS AND BONDS ===
            bonds.forEach(([i,j]) => {
                const [ax,ay] = positions[i], [bx,by] = positions[j];
                const d = Math.sqrt((ax-bx)**2+(ay-by)**2);
                ctx.beginPath();
                ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
                ctx.strokeStyle = bondColor(d);
                ctx.lineWidth = 3;
                ctx.globalAlpha = 0.85;
                ctx.stroke();
                ctx.globalAlpha = 1;
            });

            eqPos.forEach(([ex,ey]) => {
                ctx.beginPath();
                ctx.arc(ex, ey, ATOM_R, 0, Math.PI*2);
                ctx.strokeStyle = 'rgba(255,255,255,0.08)';
                ctx.lineWidth = 1;
                ctx.setLineDash([3,3]);
                ctx.stroke();
                ctx.setLineDash([]);
            });

            positions.forEach(([ax,ay], i) => {
                ctx.beginPath();
                ctx.arc(ax, ay, ATOM_R, 0, Math.PI*2);
                ctx.fillStyle = i % 2 === 0 ? '#00f5d4' : '#9b5de5';
                ctx.fill();
            });

            if (converged) {
                ctx.fillStyle = 'rgba(34,197,94,0.15)';
                ctx.fillRect(0, 0, W, CHART_Y);
                ctx.fillStyle = '#22c55e';
                ctx.font = 'bold 18px Outfit, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('CONVERGED ✓', W/2, CHART_Y/2);
                ctx.font = '12px Outfit, sans-serif';
                ctx.fillStyle = '#94a3b8';
                ctx.fillText(`${t_adam} Adam iterations`, W/2, CHART_Y/2 + 22);
                ctx.textAlign = 'left';
            } else {
                ctx.fillStyle = 'rgba(100,116,139,0.8)';
                ctx.font = '10px JetBrains Mono, monospace';
                ctx.fillText(`iter ${t_adam}`, 8, 18);
            }
        };

        this.relaxAnimFrameId = requestAnimationFrame(animate);
    },

    // --- Slide 3 (index 2): Interatomic Bond Statistics ---
    bondDistributionData: null,
    initInteratomicDistancesWidget() {
        const container = document.getElementById('widget-interatomic-distances');
        if (!container) return;

        const elements = [
            { number: 1, symbol: 'H', name: 'Hydrogen', mass: 1.008, category: 'nonmetal', row: 1, col: 1 },
            { number: 2, symbol: 'He', name: 'Helium', mass: 4.0026, category: 'noble-gas', row: 1, col: 18 },
            { number: 3, symbol: 'Li', name: 'Lithium', mass: 6.94, category: 'alkali-metal', row: 2, col: 1 },
            { number: 4, symbol: 'Be', name: 'Beryllium', mass: 9.0122, category: 'alkaline-earth', row: 2, col: 2 },
            { number: 5, symbol: 'B', name: 'Boron', mass: 10.81, category: 'metalloid', row: 2, col: 13 },
            { number: 6, symbol: 'C', name: 'Carbon', mass: 12.011, category: 'nonmetal', row: 2, col: 14 },
            { number: 7, symbol: 'N', name: 'Nitrogen', mass: 14.007, category: 'nonmetal', row: 2, col: 15 },
            { number: 8, symbol: 'O', name: 'Oxygen', mass: 15.999, category: 'nonmetal', row: 2, col: 16 },
            { number: 9, symbol: 'F', name: 'Fluorine', mass: 18.998, category: 'halogen', row: 2, col: 17 },
            { number: 10, symbol: 'Ne', name: 'Neon', mass: 20.180, category: 'noble-gas', row: 2, col: 18 },
            { number: 11, symbol: 'Na', name: 'Sodium', mass: 22.990, category: 'alkali-metal', row: 3, col: 1 },
            { number: 12, symbol: 'Mg', name: 'Magnesium', mass: 24.305, category: 'alkaline-earth', row: 3, col: 2 },
            { number: 13, symbol: 'Al', name: 'Aluminium', mass: 26.982, category: 'post-transition', row: 3, col: 13 },
            { number: 14, symbol: 'Si', name: 'Silicon', mass: 28.085, category: 'metalloid', row: 3, col: 14 },
            { number: 15, symbol: 'P', name: 'Phosphorus', mass: 30.974, category: 'nonmetal', row: 3, col: 15 },
            { number: 16, symbol: 'S', name: 'Sulfur', mass: 32.06, category: 'nonmetal', row: 3, col: 16 },
            { number: 17, symbol: 'Cl', name: 'Chlorine', mass: 35.45, category: 'halogen', row: 3, col: 17 },
            { number: 18, symbol: 'Ar', name: 'Argon', mass: 39.948, category: 'noble-gas', row: 3, col: 18 },
            { number: 19, symbol: 'K', name: 'Potassium', mass: 39.098, category: 'alkali-metal', row: 4, col: 1 },
            { number: 20, symbol: 'Ca', name: 'Calcium', mass: 40.078, category: 'alkaline-earth', row: 4, col: 2 },
            { number: 21, symbol: 'Sc', name: 'Scandium', mass: 44.956, category: 'transition', row: 4, col: 3 },
            { number: 22, symbol: 'Ti', name: 'Titanium', mass: 47.867, category: 'transition', row: 4, col: 4 },
            { number: 23, symbol: 'V', name: 'Vanadium', mass: 50.942, category: 'transition', row: 4, col: 5 },
            { number: 24, symbol: 'Cr', name: 'Chromium', mass: 51.996, category: 'transition', row: 4, col: 6 },
            { number: 25, symbol: 'Mn', name: 'Manganese', mass: 54.938, category: 'transition', row: 4, col: 7 },
            { number: 26, symbol: 'Fe', name: 'Iron', mass: 55.845, category: 'transition', row: 4, col: 8 },
            { number: 27, symbol: 'Co', name: 'Cobalt', mass: 58.933, category: 'transition', row: 4, col: 9 },
            { number: 28, symbol: 'Ni', name: 'Nickel', mass: 58.693, category: 'transition', row: 4, col: 10 },
            { number: 29, symbol: 'Cu', name: 'Copper', mass: 63.546, category: 'transition', row: 4, col: 11 },
            { number: 30, symbol: 'Zn', name: 'Zinc', mass: 65.38, category: 'transition', row: 4, col: 12 },
            { number: 31, symbol: 'Ga', name: 'Gallium', mass: 69.723, category: 'post-transition', row: 4, col: 13 },
            { number: 32, symbol: 'Ge', name: 'Germanium', mass: 72.63, category: 'metalloid', row: 4, col: 14 },
            { number: 33, symbol: 'As', name: 'Arsenic', mass: 74.922, category: 'metalloid', row: 4, col: 15 },
            { number: 34, symbol: 'Se', name: 'Selenium', mass: 78.971, category: 'nonmetal', row: 4, col: 16 },
            { number: 35, symbol: 'Br', name: 'Bromine', mass: 79.904, category: 'halogen', row: 4, col: 17 },
            { number: 36, symbol: 'Kr', name: 'Krypton', mass: 83.798, category: 'noble-gas', row: 4, col: 18 },
            { number: 37, symbol: 'Rb', name: 'Rubidium', mass: 85.468, category: 'alkali-metal', row: 5, col: 1 },
            { number: 38, symbol: 'Sr', name: 'Strontium', mass: 87.62, category: 'alkaline-earth', row: 5, col: 2 },
            { number: 39, symbol: 'Y', name: 'Yttrium', mass: 88.906, category: 'transition', row: 5, col: 3 },
            { number: 40, symbol: 'Zr', name: 'Zirconium', mass: 91.224, category: 'transition', row: 5, col: 4 },
            { number: 41, symbol: 'Nb', name: 'Niobium', mass: 92.906, category: 'transition', row: 5, col: 5 },
            { number: 42, symbol: 'Mo', name: 'Molybdenum', mass: 95.95, category: 'transition', row: 5, col: 6 },
            { number: 43, symbol: 'Tc', name: 'Technetium', mass: 98, category: 'transition', row: 5, col: 7 },
            { number: 44, symbol: 'Ru', name: 'Ruthenium', mass: 101.07, category: 'transition', row: 5, col: 8 },
            { number: 45, symbol: 'Rh', name: 'Rhodium', mass: 102.91, category: 'transition', row: 5, col: 9 },
            { number: 46, symbol: 'Pd', name: 'Palladium', mass: 106.42, category: 'transition', row: 5, col: 10 },
            { number: 47, symbol: 'Ag', name: 'Silver', mass: 107.87, category: 'transition', row: 5, col: 11 },
            { number: 48, symbol: 'Cd', name: 'Cadmium', mass: 112.41, category: 'transition', row: 5, col: 12 },
            { number: 49, symbol: 'In', name: 'Indium', mass: 114.82, category: 'post-transition', row: 5, col: 13 },
            { number: 50, symbol: 'Sn', name: 'Tin', mass: 118.71, category: 'post-transition', row: 5, col: 14 },
            { number: 51, symbol: 'Sb', name: 'Antimony', mass: 121.76, category: 'metalloid', row: 5, col: 15 },
            { number: 52, symbol: 'Te', name: 'Tellurium', mass: 127.60, category: 'metalloid', row: 5, col: 16 },
            { number: 53, symbol: 'I', name: 'Iodine', mass: 126.90, category: 'halogen', row: 5, col: 17 },
            { number: 54, symbol: 'Xe', name: 'Xenon', mass: 131.29, category: 'noble-gas', row: 5, col: 18 },
            { number: 55, symbol: 'Cs', name: 'Caesium', mass: 132.91, category: 'alkali-metal', row: 6, col: 1 },
            { number: 56, symbol: 'Ba', name: 'Barium', mass: 137.33, category: 'alkaline-earth', row: 6, col: 2 },
            { symbol: 'La-Lu', name: 'Lanthanides', number: '57-71', category: 'lanthanide-spacer', row: 6, col: 3 },
            { number: 72, symbol: 'Hf', name: 'Hafnium', mass: 178.49, category: 'transition', row: 6, col: 4 },
            { number: 73, symbol: 'Ta', name: 'Tantalum', mass: 180.95, category: 'transition', row: 6, col: 5 },
            { number: 74, symbol: 'W', name: 'Tungsten', mass: 183.84, category: 'transition', row: 6, col: 6 },
            { number: 75, symbol: 'Re', name: 'Rhenium', mass: 186.21, category: 'transition', row: 6, col: 7 },
            { number: 76, symbol: 'Os', name: 'Osmium', mass: 190.23, category: 'transition', row: 6, col: 8 },
            { number: 77, symbol: 'Ir', name: 'Iridium', mass: 192.22, category: 'transition', row: 6, col: 9 },
            { number: 78, symbol: 'Pt', name: 'Platinum', mass: 195.08, category: 'transition', row: 6, col: 10 },
            { number: 79, symbol: 'Au', name: 'Gold', mass: 196.97, category: 'transition', row: 6, col: 11 },
            { number: 80, symbol: 'Hg', name: 'Mercury', mass: 200.59, category: 'transition', row: 6, col: 12 },
            { number: 81, symbol: 'Tl', name: 'Thallium', mass: 204.38, category: 'post-transition', row: 6, col: 13 },
            { number: 82, symbol: 'Pb', name: 'Lead', mass: 207.2, category: 'post-transition', row: 6, col: 14 },
            { number: 83, symbol: 'Bi', name: 'Bismuth', mass: 208.98, category: 'post-transition', row: 6, col: 15 },
            { number: 84, symbol: 'Po', name: 'Polonium', mass: 209, category: 'metalloid', row: 6, col: 16 },
            { number: 85, symbol: 'At', name: 'Astatine', mass: 210, category: 'halogen', row: 6, col: 17 },
            { number: 86, symbol: 'Rn', name: 'Radon', mass: 222, category: 'noble-gas', row: 6, col: 18 },
            { number: 87, symbol: 'Fr', name: 'Francium', mass: 223, category: 'alkali-metal', row: 7, col: 1 },
            { number: 88, symbol: 'Ra', name: 'Radium', mass: 226, category: 'alkaline-earth', row: 7, col: 2 },
            { symbol: 'Ac-Lr', name: 'Actinides', number: '89-103', category: 'actinide-spacer', row: 7, col: 3 },
            { number: 104, symbol: 'Rf', name: 'Rutherfordium', mass: 267, category: 'transition', row: 7, col: 4 },
            { number: 105, symbol: 'Db', name: 'Dubnium', mass: 268, category: 'transition', row: 7, col: 5 },
            { number: 106, symbol: 'Sg', name: 'Seaborgium', mass: 269, category: 'transition', row: 7, col: 6 },
            { number: 107, symbol: 'Bh', name: 'Bohrium', mass: 270, category: 'transition', row: 7, col: 7 },
            { number: 108, symbol: 'Hs', name: 'Hassium', mass: 277, category: 'transition', row: 7, col: 8 },
            { number: 109, symbol: 'Mt', name: 'Meitnerium', mass: 278, category: 'transition', row: 7, col: 9 },
            { number: 110, symbol: 'Ds', name: 'Darmstadtium', mass: 281, category: 'transition', row: 7, col: 10 },
            { number: 111, symbol: 'Rg', name: 'Roentgenium', mass: 282, category: 'transition', row: 7, col: 11 },
            { number: 112, symbol: 'Cn', name: 'Copernicium', mass: 285, category: 'transition', row: 7, col: 12 },
            { number: 113, symbol: 'Nh', name: 'Nihonium', mass: 286, category: 'post-transition', row: 7, col: 13 },
            { number: 114, symbol: 'Fl', name: 'Flerovium', mass: 289, category: 'post-transition', row: 7, col: 14 },
            { number: 115, symbol: 'Mc', name: 'Moscovium', mass: 290, category: 'post-transition', row: 7, col: 15 },
            { number: 116, symbol: 'Lv', name: 'Livermorium', mass: 293, category: 'post-transition', row: 7, col: 16 },
            { number: 117, symbol: 'Ts', name: 'Tennessine', mass: 294, category: 'halogen', row: 7, col: 17 },
            { number: 118, symbol: 'Og', name: 'Oganesson', mass: 294, category: 'noble-gas', row: 7, col: 18 },
            { number: 57, symbol: 'La', name: 'Lanthanum', mass: 138.91, category: 'lanthanide', row: 9, col: 3 },
            { number: 58, symbol: 'Ce', name: 'Cerium', mass: 140.12, category: 'lanthanide', row: 9, col: 4 },
            { number: 59, symbol: 'Pr', name: 'Praseodymium', mass: 140.91, category: 'lanthanide', row: 9, col: 5 },
            { number: 60, symbol: 'Nd', name: 'Neodymium', mass: 144.24, category: 'lanthanide', row: 9, col: 6 },
            { number: 61, symbol: 'Pm', name: 'Promethium', mass: 145, category: 'lanthanide', row: 9, col: 7 },
            { number: 62, symbol: 'Sm', name: 'Samarium', mass: 150.36, category: 'lanthanide', row: 9, col: 8 },
            { number: 63, symbol: 'Eu', name: 'Europium', mass: 151.96, category: 'lanthanide', row: 9, col: 9 },
            { number: 64, symbol: 'Gd', name: 'Gadolinium', mass: 157.25, category: 'lanthanide', row: 9, col: 10 },
            { number: 65, symbol: 'Tb', name: 'Terbium', mass: 158.93, category: 'lanthanide', row: 9, col: 11 },
            { number: 66, symbol: 'Dy', name: 'Dysprosium', mass: 162.50, category: 'lanthanide', row: 9, col: 12 },
            { number: 67, symbol: 'Ho', name: 'Holmium', mass: 164.93, category: 'lanthanide', row: 9, col: 13 },
            { number: 68, symbol: 'Er', name: 'Erbium', mass: 167.26, category: 'lanthanide', row: 9, col: 14 },
            { number: 69, symbol: 'Tm', name: 'Thulium', mass: 168.93, category: 'lanthanide', row: 9, col: 15 },
            { number: 70, symbol: 'Yb', name: 'Ytterbium', mass: 173.05, category: 'lanthanide', row: 9, col: 16 },
            { number: 71, symbol: 'Lu', name: 'Lutetium', mass: 174.97, category: 'lanthanide', row: 9, col: 17 },
            { number: 89, symbol: 'Ac', name: 'Actinium', mass: 227, category: 'actinide', row: 10, col: 3 },
            { number: 90, symbol: 'Th', name: 'Thorium', mass: 232.04, category: 'actinide', row: 10, col: 4 },
            { number: 91, symbol: 'Pa', name: 'Protactinium', mass: 231.04, category: 'actinide', row: 10, col: 5 },
            { number: 92, symbol: 'U', name: 'Uranium', mass: 238.03, category: 'actinide', row: 10, col: 6 },
            { number: 93, symbol: 'Np', name: 'Neptunium', mass: 237, category: 'actinide', row: 10, col: 7 },
            { number: 94, symbol: 'Pu', name: 'Plutonium', mass: 244, category: 'actinide', row: 10, col: 8 },
            { number: 95, symbol: 'Am', name: 'Americium', mass: 243, category: 'actinide', row: 10, col: 9 },
            { number: 96, symbol: 'Cm', name: 'Curium', mass: 247, category: 'actinide', row: 10, col: 10 },
            { number: 97, symbol: 'Bk', name: 'Berkelium', mass: 247, category: 'actinide', row: 10, col: 11 },
            { number: 98, symbol: 'Cf', name: 'Californium', mass: 251, category: 'actinide', row: 10, col: 12 },
            { number: 99, symbol: 'Es', name: 'Einsteinium', mass: 252, category: 'actinide', row: 10, col: 13 },
            { number: 100, symbol: 'Fm', name: 'Fermium', mass: 257, category: 'actinide', row: 10, col: 14 },
            { number: 101, symbol: 'Md', name: 'Mendelevium', mass: 258, category: 'actinide', row: 10, col: 15 },
            { number: 102, symbol: 'No', name: 'Nobelium', mass: 259, category: 'actinide', row: 10, col: 16 },
            { number: 103, symbol: 'Lr', name: 'Lawrencium', mass: 262, category: 'actinide', row: 10, col: 17 }
        ];

        let selectedAtomA = null;
        let selectedAtomB = null;
        let chartInstance = null;

        const tableContainer = document.getElementById('id-periodic-table');
        const loader = document.getElementById('id-loading');
        
        // Build periodic table UI
        tableContainer.innerHTML = '';
        elements.forEach(el => {
            const card = document.createElement('div');
            card.className = `element-card ${el.category}`;
            card.style.gridColumn = el.col;
            card.style.gridRow = el.row;
            card.setAttribute('data-symbol', el.symbol);

            if (el.category !== 'lanthanide-spacer' && el.category !== 'actinide-spacer') {
                card.onclick = () => handleElementClick(el.symbol);
            }

            const numSpan = document.createElement('span');
            numSpan.className = 'atomic-number';
            numSpan.textContent = el.number;
            card.appendChild(numSpan);

            const symSpan = document.createElement('span');
            symSpan.className = 'symbol';
            symSpan.textContent = el.symbol;
            card.appendChild(symSpan);

            const nameSpan = document.createElement('span');
            nameSpan.className = 'name';
            nameSpan.textContent = el.name;
            card.appendChild(nameSpan);

            if (el.mass) {
                const massSpan = document.createElement('span');
                massSpan.className = 'mass';
                massSpan.textContent = parseFloat(el.mass).toFixed(0);
                card.appendChild(massSpan);
            }

            tableContainer.appendChild(card);
        });

        const handleElementClick = (symbol) => {
            if (this.availableElements && !this.availableElements.has(symbol)) {
                return; // Disallow selecting elements not in the database
            }

            if (!selectedAtomA) {
                selectedAtomA = symbol;
            } else if (!selectedAtomB) {
                if (selectedAtomA === symbol) {
                    // Clicking the same atom again - check if self-pairing exists
                    const pair = `${symbol}-${symbol}`;
                    if (this.bondDistributionData && this.bondDistributionData[pair]) {
                        selectedAtomB = symbol;
                    } else {
                        clearSelection();
                    }
                } else {
                    const pair = [selectedAtomA, symbol].sort().join('-');
                    if (this.bondDistributionData && this.bondDistributionData[pair]) {
                        selectedAtomB = symbol;
                    } else {
                        selectedAtomA = symbol;
                        selectedAtomB = null;
                    }
                }
            } else {
                if (selectedAtomA === symbol && selectedAtomB === symbol) {
                    clearSelection();
                } else {
                    selectedAtomA = symbol;
                    selectedAtomB = null;
                }
            }
            updateUI();
        };

        const swapElements = () => {
            const temp = selectedAtomA;
            selectedAtomA = selectedAtomB;
            selectedAtomB = temp;
            updateUI();
        };

        const clearSelection = () => {
            selectedAtomA = null;
            selectedAtomB = null;
            updateUI();
        };

        document.getElementById('id-btn-swap').onclick = swapElements;
        document.getElementById('id-btn-clear').onclick = clearSelection;

        // Hook quick links
        document.querySelectorAll('.id-btn-quick').forEach(btn => {
            btn.onclick = () => {
                const pair = btn.getAttribute('data-pair');
                const parts = pair.split('-');
                selectedAtomA = parts[0];
                selectedAtomB = parts[1];
                updateUI();
            };
        });

        const updateUI = () => {
            // Update Selected Element Cards
            document.querySelectorAll('#id-periodic-table .element-card').forEach(card => {
                card.classList.remove('selected-a', 'selected-b', 'selected-both', 'inactive-element');
                const sym = card.getAttribute('data-symbol');
                if (!sym) return;

                if (selectedAtomA && selectedAtomB && selectedAtomA === selectedAtomB && sym === selectedAtomA) {
                    card.classList.add('selected-both');
                } else {
                    if (sym === selectedAtomA) card.classList.add('selected-a');
                    if (sym === selectedAtomB) card.classList.add('selected-b');
                }

                // Check if element has any data in the database, or can pair with selectedAtomA
                if (this.bondDistributionData) {
                    const isSpacer = card.classList.contains('lanthanide-spacer') || card.classList.contains('actinide-spacer');
                    if (!isSpacer) {
                        if (this.availableElements && !this.availableElements.has(sym)) {
                            card.classList.add('inactive-element');
                        } else if (selectedAtomA && !selectedAtomB) {
                            const pair = [selectedAtomA, sym].sort().join('-');
                            if (!this.bondDistributionData[pair]) {
                                card.classList.add('inactive-element');
                            }
                        }
                    }
                }
            });

            const cardA = document.getElementById('id-card-a');
            const cardB = document.getElementById('id-card-b');
            
            const updateCard = (cardEl, symbol, labelText) => {
                if (symbol) {
                    const el = elements.find(e => e.symbol === symbol);
                    cardEl.classList.remove('empty');
                    cardEl.querySelector('.symbol').textContent = el.symbol;
                    cardEl.querySelector('.name').textContent = el.name;
                    cardEl.style.borderColor = `var(--c-${el.category})`;
                } else {
                    cardEl.classList.add('empty');
                    cardEl.querySelector('.symbol').textContent = '-';
                    cardEl.querySelector('.name').textContent = labelText;
                    cardEl.style.borderColor = '';
                }
            };
            updateCard(cardA, selectedAtomA, 'Select Atom A');
            updateCard(cardB, selectedAtomB, 'Select Atom B');

            const onboarding = document.getElementById('id-onboarding');
            const noData = document.getElementById('id-no-data');
            const dashboard = document.getElementById('id-dashboard');

            if (!selectedAtomA || !selectedAtomB) {
                onboarding.classList.remove('hidden');
                noData.classList.add('hidden');
                dashboard.classList.add('hidden');
                return;
            }

            const pair = [selectedAtomA, selectedAtomB].sort().join('-');
            if (!this.bondDistributionData || !this.bondDistributionData[pair]) {
                onboarding.classList.add('hidden');
                dashboard.classList.add('hidden');
                document.getElementById('id-no-data-pair').textContent = `${selectedAtomA} - ${selectedAtomB}`;
                noData.classList.remove('hidden');
                return;
            }

            onboarding.classList.add('hidden');
            noData.classList.add('hidden');
            dashboard.classList.remove('hidden');

            const distributions = this.bondDistributionData[pair];
            const distanceKeys = Object.keys(distributions).sort((x, y) => parseFloat(x) - parseFloat(y));
            const chartData = [];

            let totalCount = 0;
            let sumDist = 0;
            let peakDist = '';
            let maxCount = -1;

            distanceKeys.forEach(dk => {
                const count = distributions[dk];
                const distVal = parseFloat(dk);
                chartData.push({ x: distVal, y: count });
                totalCount += count;
                sumDist += distVal * count;
                if (count > maxCount) {
                    maxCount = count;
                    peakDist = dk;
                }
            });

            const meanDist = sumDist / totalCount;
            let varianceSum = 0;
            distanceKeys.forEach(dk => {
                const count = distributions[dk];
                const distVal = parseFloat(dk);
                varianceSum += count * Math.pow(distVal - meanDist, 2);
            });
            const stdDev = Math.sqrt(varianceSum / totalCount);

            document.getElementById('id-stat-count').textContent = totalCount.toLocaleString();
            document.getElementById('id-stat-peak').textContent = `${parseFloat(peakDist).toFixed(2)} Å`;
            document.getElementById('id-stat-mean').textContent = `${meanDist.toFixed(3)} Å`;
            document.getElementById('id-stat-stddev').textContent = `${stdDev.toFixed(3)} Å`;
            const minDist = parseFloat(distanceKeys[0]).toFixed(2);
            const maxDist = parseFloat(distanceKeys[distanceKeys.length - 1]).toFixed(2);
            document.getElementById('id-stat-range').textContent = `${minDist} - ${maxDist} Å`;

            // Draw Chart.js Line Chart
            const ctx = document.getElementById('id-chart').getContext('2d');
            if (chartInstance) chartInstance.destroy();

            const gradient = ctx.createLinearGradient(0, 0, 0, 160);
            gradient.addColorStop(0, 'rgba(155, 93, 229, 0.45)');
            gradient.addColorStop(1, 'rgba(155, 93, 229, 0.02)');

            chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'Observations',
                        data: chartData,
                        borderColor: '#9b5de5',
                        borderWidth: 2,
                        backgroundColor: gradient,
                        fill: true,
                        tension: 0.3,
                        pointRadius: 1,
                        pointHoverRadius: 4,
                        pointBackgroundColor: '#9b5de5',
                        pointBorderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: 'rgba(8, 12, 22, 0.95)',
                            titleColor: '#fff',
                            bodyColor: '#cbd5e1',
                            borderColor: 'rgba(255,255,255,0.08)',
                            borderWidth: 1,
                            padding: 8,
                            displayColors: false,
                            callbacks: {
                                label: (c) => `Count: ${c.parsed.y.toLocaleString()}`,
                                title: (c) => `Length: ${c[0].parsed.x.toFixed(2)} Å`
                            }
                        }
                    },
                    scales: {
                        x: {
                            type: 'linear',
                            min: 1.0,
                            max: 4.5,
                            grid: { color: 'rgba(255,255,255,0.02)' },
                            ticks: { color: '#64748b', font: { size: 9 } }
                        },
                        y: {
                            grid: { color: 'rgba(255,255,255,0.02)' },
                            ticks: {
                                color: '#64748b',
                                font: { size: 9 },
                                callback: (v) => {
                                    if (v >= 1e6) return (v / 1e6).toFixed(1) + 'M';
                                    if (v >= 1e3) return (v / 1e3).toFixed(0) + 'k';
                                    return v;
                                }
                            }
                        }
                    }
                }
            });
        };

        const initAvailableElements = () => {
            this.availableElements = new Set();
            if (this.bondDistributionData) {
                Object.keys(this.bondDistributionData).forEach(pair => {
                    const parts = pair.split('-');
                    this.availableElements.add(parts[0]);
                    this.availableElements.add(parts[1]);
                });
            }
        };

        const setupFileReader = (fileInput) => {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const r = new FileReader();
                loader.style.display = 'flex';
                r.onload = (evt) => {
                    try {
                        this.bondDistributionData = JSON.parse(evt.target.result);
                        initAvailableElements();
                        loader.style.display = 'none';
                        clearSelection();
                    } catch (err) {
                        alert("Error parsing JSON database file.");
                        loader.style.display = 'none';
                    }
                };
                r.readAsText(file);
            });
        };

        // Async Loading trigger
        if (this.bondDistributionData) {
            initAvailableElements();
            loader.style.display = 'none';
            clearSelection();
        } else {
            fetch('data/cif_bonds_distribution.json')
                .then(res => {
                    if (!res.ok) throw new Error("HTTP " + res.status);
                    return res.json();
                })
                .then(data => {
                    this.bondDistributionData = data;
                    initAvailableElements();
                    loader.style.display = 'none';
                    clearSelection();
                })
                .catch(err => {
                    console.warn("COD Database JSON Fetch failed, prompting manual upload:", err);
                    loader.innerHTML = `
                        <span style="font-size:1.5rem; color:var(--color-orange); font-weight:700;">⚠️ CORS/Local File Block</span>
                        <p style="font-size:0.85rem; color:#64748b; max-width:280px; text-align:center; margin:0; line-height:1.4;">
                            Local fetch blocked. Select <code>cif_bonds_distribution.json</code> from the <code>data/</code> folder:
                        </p>
                        <label for="id-json-file" style="background:var(--accent-purple); color:#fff; border:none; padding:8px 16px; border-radius:6px; font-weight:bold; font-size:0.75rem; cursor:pointer; pointer-events:auto; display:inline-block;">Choose file</label>
                        <input type="file" id="id-json-file" accept=".json" style="display:none;">
                    `;
                    const fileInput = document.getElementById('id-json-file');
                    setupFileReader(fileInput);
                });
        }
    },

    // --- Slide 4 (index 3): Crystal Builder from Wyckoff Symmetries ---
    cbSpaceGroupsData: null,
    cbAtomsList: [],
    cbIdCounter: 0,
    cbSelectedSG: null,
    cbState: null,

    initCrystalBuilderWidget() {
        const container = document.getElementById('widget-crystal-builder');
        if (!container) return;

        const loader = document.getElementById('cb-loading');
        
        // Initialize persistent state if not already done
        if (!this.cbState) {
            this.cbState = {
                sgNum: "227",
                latA: "5.43",
                latB: "5.43",
                latC: "5.43",
                latAlpha: "90",
                latBeta: "90",
                latGamma: "90",
                scX: "1",
                scY: "1",
                scZ: "1",
                atomRadius: "0.30",
                drawBonds: false,
                bondTolerance: "1.2",
                bgMode: "dark",
                activeTab: "cb-tab-build",
                wyckoffLetter: "a",
                atomEl: "Si",
                atomX: "0.125",
                atomY: "0.125",
                atomZ: "0.125"
            };
            this.cbAtomsList = [];
            this.cbIdCounter = 0;
            this.cbSelectedSG = null;
        }

        // Helper to save current DOM state to persistent state cache
        const saveCbState = () => {
            if (!this.cbState) return;
            const sgSelect = document.getElementById('cb-sg-select');
            const wyckoffSelect = document.getElementById('cb-wyckoff-select');
            if (sgSelect) this.cbState.sgNum = sgSelect.value;
            if (wyckoffSelect) this.cbState.wyckoffLetter = wyckoffSelect.value;
            
            const latA = document.getElementById('cb-lat-a');
            const latB = document.getElementById('cb-lat-b');
            const latC = document.getElementById('cb-lat-c');
            const alpha = document.getElementById('cb-lat-alpha');
            const beta = document.getElementById('cb-lat-beta');
            const gamma = document.getElementById('cb-lat-gamma');
            if (latA) this.cbState.latA = latA.value;
            if (latB) this.cbState.latB = latB.value;
            if (latC) this.cbState.latC = latC.value;
            if (alpha) this.cbState.latAlpha = alpha.value;
            if (beta) this.cbState.latBeta = beta.value;
            if (gamma) this.cbState.latGamma = gamma.value;

            const scX = document.getElementById('cb-sc-x');
            const scY = document.getElementById('cb-sc-y');
            const scZ = document.getElementById('cb-sc-z');
            if (scX) this.cbState.scX = scX.value;
            if (scY) this.cbState.scY = scY.value;
            if (scZ) this.cbState.scZ = scZ.value;

            const atomScale = document.getElementById('cb-atom-scale');
            if (atomScale) this.cbState.atomRadius = atomScale.value;

            const drawBondsInp = document.getElementById('cb-toggle-bonds');
            if (drawBondsInp) this.cbState.drawBonds = drawBondsInp.checked;

            const bondTol = document.getElementById('cb-bond-tolerance');
            if (bondTol) this.cbState.bondTolerance = bondTol.value;

            const atomEl = document.getElementById('cb-atom-el');
            if (atomEl) this.cbState.atomEl = atomEl.value;

            const atomX = document.getElementById('cb-atom-x');
            const atomY = document.getElementById('cb-atom-y');
            const atomZ = document.getElementById('cb-atom-z');
            if (atomX) this.cbState.atomX = atomX.value;
            if (atomY) this.cbState.atomY = atomY.value;
            if (atomZ) this.cbState.atomZ = atomZ.value;
        };

        // CPK element attributes cache
        const elementData = {
            'H': { c: '#FFFFFF', r: 0.31 }, 'He': { c: '#D9FFFF', r: 0.28 }, 'Li': { c: '#CC80FF', r: 1.28 }, 'Be': { c: '#C2FF00', r: 0.96 },
            'B': { c: '#FFB5B5', r: 0.84 }, 'C': { c: '#909090', r: 0.76 }, 'N': { c: '#3050F8', r: 0.71 }, 'O': { c: '#FF0D0D', r: 0.66 },
            'F': { c: '#90E050', r: 0.57 }, 'Ne': { c: '#B3E3F5', r: 0.58 }, 'Na': { c: '#AB5CF2', r: 1.66 }, 'Mg': { c: '#8AFF00', r: 1.41 },
            'Al': { c: '#BFA6A6', r: 1.21 }, 'Si': { c: '#F0C8A0', r: 1.11 }, 'P': { c: '#FF8000', r: 1.07 }, 'S': { c: '#FFFF30', r: 1.05 },
            'Cl': { c: '#1FF01F', r: 1.02 }, 'Ar': { c: '#80D1E3', r: 1.06 }, 'K': { c: '#8F40D4', r: 2.03 }, 'Ca': { c: '#3DFF00', r: 1.76 },
            'Sc': { c: '#E6E6E6', r: 1.70 }, 'Ti': { c: '#BFC2C7', r: 1.60 }, 'V': { c: '#A6A6AB', r: 1.53 }, 'Cr': { c: '#8A99C7', r: 1.39 },
            'Mn': { c: '#9C7AC7', r: 1.39 }, 'Fe': { c: '#E06633', r: 1.32 }, 'Co': { c: '#F090A0', r: 1.26 }, 'Ni': { c: '#50D050', r: 1.24 },
            'Cu': { c: '#C88033', r: 1.32 }, 'Zn': { c: '#7D80B0', r: 1.22 }, 'Ga': { c: '#C28F8F', r: 1.22 }, 'Ge': { c: '#668F8F', r: 1.20 },
            'As': { c: '#BD80E3', r: 1.19 }, 'Se': { c: '#FFA100', r: 1.20 }, 'Br': { c: '#A62929', r: 1.20 }, 'Kr': { c: '#5CB8D1', r: 1.16 },
            'Rb': { c: '#702EB0', r: 2.20 }, 'Sr': { c: '#00FF00', r: 1.95 }, 'Y': { c: '#94FFFF', r: 1.90 }, 'Zr': { c: '#94E0E0', r: 1.75 },
            'Nb': { c: '#73C2C9', r: 1.64 }, 'Mo': { c: '#54B5B5', r: 1.54 }, 'Tc': { c: '#3B9E9E', r: 1.47 }, 'Ru': { c: '#248F8F', r: 1.46 },
            'Rh': { c: '#0A7D8C', r: 1.42 }, 'Pd': { c: '#006985', r: 1.39 }, 'Ag': { c: '#C0C0C0', r: 1.45 }, 'Cd': { c: '#FFD98F', r: 1.44 },
            'In': { c: '#A67573', r: 1.42 }, 'Sn': { c: '#668080', r: 1.39 }, 'Sb': { c: '#9E63B5', r: 1.39 }, 'Te': { c: '#D47A00', r: 1.38 },
            'I': { c: '#940094', r: 1.39 }, 'Xe': { c: '#429EB0', r: 1.40 }, 'Cs': { c: '#57178F', r: 2.44 }, 'Ba': { c: '#00C900', r: 2.15 },
            'La': { c: '#70D4FF', r: 2.07 }, 'Ce': { c: '#FFFFC7', r: 2.04 }, 'Pr': { c: '#D9FFC7', r: 2.03 }, 'Nd': { c: '#C7FFC7', r: 2.01 },
            'Pm': { c: '#A3FFC7', r: 1.99 }, 'Sm': { c: '#8FFFC7', r: 1.98 }, 'Eu': { c: '#61FFC7', r: 1.98 }, 'Gd': { c: '#45FFC7', r: 1.96 },
            'Tb': { c: '#30FFC7', r: 1.94 }, 'Dy': { c: '#1FFFC7', r: 1.92 }, 'Ho': { c: '#00FF9C', r: 1.92 }, 'Er': { c: '#00E675', r: 1.89 },
            'Tm': { c: '#00D452', r: 1.90 }, 'Yb': { c: '#00BF38', r: 1.87 }, 'Lu': { c: '#00AB24', r: 1.87 }, 'Hf': { c: '#4DC2FF', r: 1.75 },
            'Ta': { c: '#4DA6FF', r: 1.70 }, 'W': { c: '#2194D6', r: 1.62 }, 'Re': { c: '#267DAB', r: 1.51 }, 'Os': { c: '#266696', r: 1.44 },
            'Ir': { c: '#175487', r: 1.41 }, 'Pt': { c: '#D0D0E0', r: 1.36 }, 'Au': { c: '#FFD123', r: 1.36 }, 'Hg': { c: '#B8B8D0', r: 1.32 },
            'Tl': { c: '#A6544D', r: 1.45 }, 'Pb': { c: '#575961', r: 1.46 }, 'Bi': { c: '#9E4FB5', r: 1.48 }, 'Po': { c: '#AB5C00', r: 1.40 },
            'Gl': { c: '#754F45', r: 1.50 }, 'Rn': { c: '#428296', r: 1.50 }, 'Fr': { c: '#420066', r: 2.60 }, 'Ra': { c: '#007D00', r: 2.21 },
            'Ac': { c: '#70ABFA', r: 2.15 }, 'Th': { c: '#00BAFF', r: 2.06 }, 'Pa': { c: '#00A1FF', r: 2.00 }, 'U': { c: '#008FFF', r: 1.96 }
        };

        const getElementProps = (symbol) => {
            let norm = symbol.trim();
            if (norm.length > 0) norm = norm.charAt(0).toUpperCase() + norm.slice(1).toLowerCase();
            if (elementData[norm]) return elementData[norm];
            return { c: '#9b5de5', r: 1.2 };
        };

        // Fraction Helper
        const parseFraction = (valStr) => {
            valStr = valStr.trim();
            if (valStr.includes('/')) {
                const parts = valStr.split('/');
                if (parts.length === 2) {
                    return parseFloat(parts[0]) / parseFloat(parts[1]);
                }
            }
            return parseFloat(valStr) || 0;
        };

        // Safe Symmetry Op Evaluator
        const evalWyckoffOperation = (opStr, x, y, z) => {
            let clean = opStr.trim().replace(/minus/g, '-').replace(/−/g, '-');
            const parts = clean.split(',');
            if (parts.length !== 3) return [0, 0, 0];

            const evaluate = (expr) => {
                try {
                    // Replace fractions like 1/2 with (1/2) and variable coefficients like 2x with 2*x
                    const sanitized = expr.replace(/(\d+)\/(\d+)/g, '($1/$2)').replace(/(\d)([xyz])/g, '$1*$2');
                    const func = new Function('x', 'y', 'z', `return ${sanitized};`);
                    let val = func(x, y, z);
                    let wrapped = val % 1;
                    if (wrapped < 0) wrapped += 1;
                    return Math.round(wrapped * 10000) / 10000;
                } catch (e) {
                    return 0;
                }
            };
            return [evaluate(parts[0]), evaluate(parts[1]), evaluate(parts[2])];
        };

        // Cartesian Helper
        const getCartesian = (fx, fy, fz, a, b, c, alpha, beta, gamma) => {
            const alphaRad = alpha * Math.PI / 180;
            const betaRad = beta * Math.PI / 180;
            const gammaRad = gamma * Math.PI / 180;

            const cosA = Math.cos(alphaRad);
            const cosB = Math.cos(betaRad);
            const cosG = Math.cos(gammaRad);
            const sinG = Math.sin(gammaRad);

            const volTerm = 1 - cosA*cosA - cosB*cosB - cosG*cosG + 2*cosA*cosB*cosG;
            const V = a * b * c * (volTerm > 0 ? Math.sqrt(volTerm) : 0);

            const vA = new THREE.Vector3(a, 0, 0);
            const vB = new THREE.Vector3(b * cosG, b * sinG, 0);
            const cx = c * cosB;
            const cy = sinG !== 0 ? c * (cosA - cosB * cosG) / sinG : 0;
            const cz = (a * b * sinG) !== 0 ? V / (a * b * sinG) : 0;
            const vC = new THREE.Vector3(cx, cy, cz);

            const vec = new THREE.Vector3()
                .addScaledVector(vA, fx)
                .addScaledVector(vB, fy)
                .addScaledVector(vC, fz);

            return { vec, vA, vB, vC, V };
        };

        // 3D Scene Initialization
        const viewerContainer = document.getElementById('cb-viewer-container');
        this.cbScene = new THREE.Scene();
        this.cbCamera = new THREE.PerspectiveCamera(45, viewerContainer.clientWidth / viewerContainer.clientHeight, 0.1, 1000);
        this.cbCamera.position.set(8, 8, 12);

        this.cbRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
        this.cbRenderer.setSize(viewerContainer.clientWidth, viewerContainer.clientHeight);
        this.cbRenderer.shadowMap.enabled = true;
        
        // Pre-configure lighting background clear color based on saved state
        if (this.cbState && this.cbState.bgMode === 'light') {
            this.cbRenderer.setClearColor(0xffffff, 0.9);
        } else {
            this.cbRenderer.setClearColor(0x000000, 0);
        }
        viewerContainer.appendChild(this.cbRenderer.domElement);

        this.cbControls = new THREE.OrbitControls(this.cbCamera, this.cbRenderer.domElement);
        this.cbControls.enableDamping = true;
        this.cbControls.dampingFactor = 0.05;

        // Lighting
        const ambient = new THREE.AmbientLight(0xffffff, 0.45);
        this.cbScene.add(ambient);
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
        dirLight.position.set(5, 10, 7);
        this.cbScene.add(dirLight);

        // Cache material & geom
        const materialsCache = {};
        const getCachedMaterial = (colorStr) => {
            if (!materialsCache[colorStr]) {
                materialsCache[colorStr] = new THREE.MeshPhongMaterial({
                    color: new THREE.Color(colorStr),
                    shininess: 80,
                    specular: 0x444444
                });
            }
            return materialsCache[colorStr];
        };
        const sphereGeom = new THREE.SphereGeometry(1, 16, 16);

        // Drawing Groups
        const cellGroup = new THREE.Group();
        const atomsGroup = new THREE.Group();
        const bondsGroup = new THREE.Group();
        this.cbScene.add(cellGroup);
        this.cbScene.add(atomsGroup);
        this.cbScene.add(bondsGroup);

        // Raycasting and Mouse Actions
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseMove = (event) => {
            if (!this.cbRenderer) return;
            const rect = this.cbRenderer.domElement.getBoundingClientRect();
            const scaleX = rect.width / this.cbRenderer.domElement.clientWidth;
            const scaleY = rect.height / this.cbRenderer.domElement.clientHeight;

            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, this.cbCamera);
            const intersects = raycaster.intersectObjects(atomsGroup.children);

            const tooltip = document.getElementById('cb-atom-tooltip');
            if (intersects.length > 0) {
                const mesh = intersects[0].object;
                const u = mesh.userData;
                document.getElementById('cb-tt-el').textContent = u.element;
                document.getElementById('cb-tt-wp').textContent = u.wyckoff;
                document.getElementById('cb-tt-frac').textContent = `[${u.fx.toFixed(3)}, ${u.fy.toFixed(3)}, ${u.fz.toFixed(3)}]`;
                document.getElementById('cb-tt-cart').textContent = `[${u.cx.toFixed(2)}, ${u.cy.toFixed(2)}, ${u.cz.toFixed(2)}]`;
                
                tooltip.style.display = 'block';
                tooltip.style.left = (event.clientX - rect.left) / scaleX + 'px';
                tooltip.style.top = (event.clientY - rect.top) / scaleY + 'px';
            } else {
                tooltip.style.display = 'none';
            }
        };
        this.cbRenderer.domElement.addEventListener('mousemove', onMouseMove);

        // Tab Navigation click handlers
        const tabs = document.querySelectorAll('.cb-tab-btn');
        tabs.forEach(btn => {
            btn.onclick = () => {
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.style.color = '#64748b';
                });
                btn.classList.add('active');
                btn.style.color = 'var(--accent-mint)';
                
                document.querySelectorAll('.cb-tab-content').forEach(content => {
                    content.style.display = 'none';
                });
                document.getElementById(btn.getAttribute('data-target')).style.display = 'flex';
                
                this.cbState.activeTab = btn.getAttribute('data-target');
            };
        });

        const sgSelect = document.getElementById('cb-sg-select');
        const wyckoffSelect = document.getElementById('cb-wyckoff-select');
        
        // Populate inputs based on Space Group rules
        const handleSgChange = () => {
            const num = sgSelect.value;
            if (!this.cbSpaceGroupsData || !this.cbSpaceGroupsData[num]) return;
            this.cbSelectedSG = this.cbSpaceGroupsData[num];

            document.getElementById('cb-hud-sg').textContent = `${this.cbSelectedSG.space_group_symbol} (No. ${this.cbSelectedSG.space_group_number})`;
            document.getElementById('cb-hud-sg').title = `${this.cbSelectedSG.space_group_symbol} (No. ${this.cbSelectedSG.space_group_number})`;

            // Lattice parameters enforcement
            const latA = document.getElementById('cb-lat-a');
            const latB = document.getElementById('cb-lat-b');
            const latC = document.getElementById('cb-lat-c');
            const alpha = document.getElementById('cb-lat-alpha');
            const beta = document.getElementById('cb-lat-beta');
            const gamma = document.getElementById('cb-lat-gamma');

            [latA, latB, latC, alpha, beta, gamma].forEach(inp => inp.disabled = false);

            const sys = this.cbSelectedSG.crystal_system.toLowerCase();
            if (sys === 'cubic') {
                latB.disabled = true; latC.disabled = true;
                alpha.disabled = true; beta.disabled = true; gamma.disabled = true;
                latB.value = latA.value; latC.value = latA.value;
                alpha.value = 90; beta.value = 90; gamma.value = 90;
            } else if (sys === 'tetragonal') {
                latB.disabled = true;
                alpha.disabled = true; beta.disabled = true; gamma.disabled = true;
                latB.value = latA.value;
                alpha.value = 90; beta.value = 90; gamma.value = 90;
            } else if (sys === 'hexagonal' || sys === 'trigonal') {
                latB.disabled = true;
                alpha.disabled = true; beta.disabled = true; gamma.disabled = true;
                latB.value = latA.value;
                alpha.value = 90; beta.value = 90; gamma.value = 120;
            } else if (sys === 'orthorhombic') {
                alpha.disabled = true; beta.disabled = true; gamma.disabled = true;
                alpha.value = 90; beta.value = 90; gamma.value = 90;
            } else if (sys === 'monoclinic') {
                alpha.disabled = true; gamma.disabled = true;
                alpha.value = 90; gamma.value = 90;
            }

            // Populate Wyckoff Select
            wyckoffSelect.innerHTML = '';
            this.cbSelectedSG.wyckoff_positions.forEach(wp => {
                const opt = document.createElement('option');
                opt.value = wp.letter;
                const hint = wp.operations?.[0] || '';
                opt.textContent = `${wp.multiplicity}${wp.letter} (${hint})`;
                wyckoffSelect.appendChild(opt);
            });

            handleWyckoffSiteChange();
            buildAndRenderScene();
        };

        const handleWyckoffSiteChange = () => {
            const letter = wyckoffSelect.value;
            if (!this.cbSelectedSG) return;
            const wp = this.cbSelectedSG.wyckoff_positions.find(w => w.letter === letter);
            if (!wp) return;

            const op = wp.operations[0];
            const parts = op.split(',');
            
            const handleCoordSlider = (inpId, expr) => {
                const inp = document.getElementById(inpId);
                const hasVar = expr.includes('x') || expr.includes('y') || expr.includes('z');
                if (!hasVar) {
                    inp.value = parseFraction(expr);
                    inp.disabled = true;
                    inp.style.opacity = '0.4';
                } else {
                    inp.disabled = false;
                    inp.style.opacity = '1';
                }
            };
            handleCoordSlider('cb-atom-x', parts[0]);
            handleCoordSlider('cb-atom-y', parts[1]);
            handleCoordSlider('cb-atom-z', parts[2]);
        };

        // When space group select changes, clear the atoms list if it is a manual change
        sgSelect.onchange = () => {
            this.cbAtomsList = [];
            updateAtomsListHTML();
            handleSgChange();
            saveCbState();
        };

        wyckoffSelect.onchange = () => {
            handleWyckoffSiteChange();
            saveCbState();
        };

        // Form Inputs Actions
        const handleCellParamChange = () => {
            const sys = this.cbSelectedSG ? this.cbSelectedSG.crystal_system.toLowerCase() : '';
            if (sys === 'cubic') {
                document.getElementById('cb-lat-b').value = document.getElementById('cb-lat-a').value;
                document.getElementById('cb-lat-c').value = document.getElementById('cb-lat-a').value;
            } else if (sys === 'tetragonal' || sys === 'hexagonal' || sys === 'trigonal') {
                document.getElementById('cb-lat-b').value = document.getElementById('cb-lat-a').value;
            }
            buildAndRenderScene();
        };

        document.getElementById('cb-lat-a').oninput = () => { handleCellParamChange(); saveCbState(); };
        document.getElementById('cb-lat-b').oninput = () => { handleCellParamChange(); saveCbState(); };
        document.getElementById('cb-lat-c').oninput = () => { handleCellParamChange(); saveCbState(); };
        document.getElementById('cb-lat-alpha').oninput = () => { handleCellParamChange(); saveCbState(); };
        document.getElementById('cb-lat-beta').oninput = () => { handleCellParamChange(); saveCbState(); };
        document.getElementById('cb-lat-gamma').oninput = () => { handleCellParamChange(); saveCbState(); };

        document.getElementById('cb-sc-x').onchange = () => { buildAndRenderScene(); saveCbState(); };
        document.getElementById('cb-sc-y').onchange = () => { buildAndRenderScene(); saveCbState(); };
        document.getElementById('cb-sc-z').onchange = () => { buildAndRenderScene(); saveCbState(); };
        document.getElementById('cb-atom-scale').oninput = (e) => {
            document.getElementById('cb-scale-val').textContent = parseFloat(e.target.value).toFixed(2);
            buildAndRenderScene();
            saveCbState();
        };

        document.getElementById('cb-toggle-bonds').onchange = (e) => {
            const set = document.getElementById('cb-bond-settings');
            if (e.target.checked) {
                set.style.opacity = '1';
                set.style.pointerEvents = 'auto';
            } else {
                set.style.opacity = '0.4';
                set.style.pointerEvents = 'none';
            }
            buildAndRenderScene();
            saveCbState();
        };
        document.getElementById('cb-bond-tolerance').oninput = (e) => {
            document.getElementById('cb-bond-tol-val').textContent = parseFloat(e.target.value).toFixed(1) + 'x';
            buildAndRenderScene();
            saveCbState();
        };

        document.getElementById('cb-atom-el').oninput = () => saveCbState();
        document.getElementById('cb-atom-x').oninput = () => saveCbState();
        document.getElementById('cb-atom-y').oninput = () => saveCbState();
        document.getElementById('cb-atom-z').oninput = () => saveCbState();

        // Add Atom Logic
        document.getElementById('cb-btn-add-atom').onclick = () => {
            if (!this.cbSelectedSG) return;
            const element = document.getElementById('cb-atom-el').value.trim().toUpperCase();
            if (!element) return;

            const letter = wyckoffSelect.value;
            const wp = this.cbSelectedSG.wyckoff_positions.find(w => w.letter === letter);
            if (!wp) return;

            const rawX = document.getElementById('cb-atom-x').value;
            const rawY = document.getElementById('cb-atom-y').value;
            const rawZ = document.getElementById('cb-atom-z').value;

            const x = parseFraction(rawX);
            const y = parseFraction(rawY);
            const z = parseFraction(rawZ);

            const props = getElementProps(element);

            // Determine if the coordinates for this site are variable (contain x, y, or z)
            const op = wp.operations[0];
            const parts = op.split(',');
            const hasVarX = parts[0] ? (parts[0].includes('x') || parts[0].includes('y') || parts[0].includes('z')) : false;
            const hasVarY = parts[1] ? (parts[1].includes('x') || parts[1].includes('y') || parts[1].includes('z')) : false;
            const hasVarZ = parts[2] ? (parts[2].includes('x') || parts[2].includes('y') || parts[2].includes('z')) : false;

            const newAtom = {
                id: this.cbIdCounter++,
                element,
                x, y, z,
                baseCoords: [x, y, z],
                origStrings: { x: rawX, y: rawY, z: rawZ },
                wyckoffLetter: letter,
                multiplicity: wp.multiplicity,
                siteSymmetry: wp.site_symmetry,
                props,
                visible: true,
                hasVarX,
                hasVarY,
                hasVarZ
            };

            this.cbAtomsList.push(newAtom);
            updateAtomsListHTML();
            buildAndRenderScene();
            saveCbState();
        };

        const updateAtomsListHTML = () => {
            const list = document.getElementById('cb-atoms-list');
            list.innerHTML = '';
            if (this.cbAtomsList.length === 0) {
                list.innerHTML = '<div style="color:#64748b; font-size:0.7rem; text-align:center; padding-top:10px;">No atoms added.</div>';
                return;
            }

            this.cbAtomsList.forEach(atom => {
                // Ensure coordinate variable flags are set (handles backwards compatibility if any)
                if (atom.hasVarX === undefined) {
                    if (this.cbSelectedSG) {
                        const wp = this.cbSelectedSG.wyckoff_positions.find(w => w.letter === atom.wyckoffLetter);
                        if (wp) {
                            const op = wp.operations[0];
                            const parts = op.split(',');
                            atom.hasVarX = parts[0] ? (parts[0].includes('x') || parts[0].includes('y') || parts[0].includes('z')) : false;
                            atom.hasVarY = parts[1] ? (parts[1].includes('x') || parts[1].includes('y') || parts[1].includes('z')) : false;
                            atom.hasVarZ = parts[2] ? (parts[2].includes('x') || parts[2].includes('y') || parts[2].includes('z')) : false;
                        }
                    }
                }

                const item = document.createElement('div');
                item.style.cssText = 'display:flex; flex-direction:column; background:rgba(255,255,255,0.02); border:1px solid var(--border-glass); border-radius:4px; padding:6px; font-size:0.7rem; gap:4px;';
                
                // Top row: Label, multiplicity, site, and delete button
                const topRow = document.createElement('div');
                topRow.style.cssText = 'display:flex; justify-content:space-between; align-items:center; width:100%;';
                
                const label = document.createElement('span');
                label.style.fontWeight = 'bold';
                label.style.color = atom.props.c;
                label.textContent = `${atom.element} (${atom.multiplicity}${atom.wyckoffLetter})`;
                
                const deleteBtn = document.createElement('button');
                deleteBtn.style.cssText = 'background:transparent; border:none; color:var(--color-red); font-weight:bold; cursor:pointer; font-size:0.8rem; line-height: 1; margin-left: auto;';
                deleteBtn.textContent = '×';
                deleteBtn.onclick = () => {
                    this.cbAtomsList = this.cbAtomsList.filter(a => a.id !== atom.id);
                    updateAtomsListHTML();
                    buildAndRenderScene();
                    saveCbState();
                };
                
                topRow.appendChild(label);
                topRow.appendChild(deleteBtn);
                item.appendChild(topRow);

                // Bottom row: inline coordinate inputs (only if variables exist)
                if (atom.hasVarX || atom.hasVarY || atom.hasVarZ) {
                    const inputsRow = document.createElement('div');
                    inputsRow.style.cssText = 'display:flex; gap:8px; align-items:center; padding-top:4px; border-top:1px dashed rgba(255,255,255,0.04);';
                    
                    let xInp, yInp, zInp;
                    
                    const syncInputsAndModel = (changedCoord, valStr) => {
                        let val = parseFraction(valStr);
                        val = Math.max(0, Math.min(1, val)); // Enforce [0, 1] limit
                        if (!this.cbSelectedSG) return;
                        const wp = this.cbSelectedSG.wyckoff_positions.find(w => w.letter === atom.wyckoffLetter);
                        if (!wp) return;
                        const op = wp.operations[0];
                        const parts = op.split(',').map(p => p.trim());
                        
                        if (changedCoord === 'x') {
                            atom.x = val;
                            atom.baseCoords[0] = val;
                            if (parts[1] === 'x' || parts[1] === parts[0]) {
                                atom.y = val;
                                atom.baseCoords[1] = val;
                                if (yInp) yInp.value = val;
                            }
                            if (parts[2] === 'x' || parts[2] === parts[0]) {
                                atom.z = val;
                                atom.baseCoords[2] = val;
                                if (zInp) zInp.value = val;
                            }
                        } else if (changedCoord === 'y') {
                            atom.y = val;
                            atom.baseCoords[1] = val;
                            if (parts[0] === 'y' || parts[0] === parts[1]) {
                                atom.x = val;
                                atom.baseCoords[0] = val;
                                if (xInp) xInp.value = val;
                            }
                            if (parts[2] === 'y' || parts[2] === parts[1]) {
                                atom.z = val;
                                atom.baseCoords[2] = val;
                                if (zInp) zInp.value = val;
                            }
                        } else if (changedCoord === 'z') {
                            atom.z = val;
                            atom.baseCoords[2] = val;
                            if (parts[0] === 'z' || parts[0] === parts[2]) {
                                atom.x = val;
                                atom.baseCoords[0] = val;
                                if (xInp) xInp.value = val;
                            }
                            if (parts[1] === 'z' || parts[1] === parts[2]) {
                                atom.y = val;
                                atom.baseCoords[1] = val;
                                if (yInp) yInp.value = val;
                            }
                        }
                        
                        // Rebuild Visualizer Scene
                        buildAndRenderScene();
                        saveCbState();
                    };

                    if (atom.hasVarX) {
                        const wrap = document.createElement('div');
                        wrap.style.cssText = 'display:flex; align-items:center; gap:2px;';
                        wrap.innerHTML = '<span style="color:#64748b; font-size:0.6rem;">x:</span>';
                        xInp = document.createElement('input');
                        xInp.type = 'number';
                        xInp.step = '0.01';
                        xInp.min = '0';
                        xInp.max = '1';
                        xInp.value = atom.x;
                        xInp.style.cssText = 'width:60px; background:rgba(15,23,42,0.8); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:1px 2px; text-align:center; font-size:0.65rem; font-family:var(--font-mono); height:18px; outline:none;';
                        xInp.oninput = (e) => syncInputsAndModel('x', e.target.value);
                        wrap.appendChild(xInp);
                        inputsRow.appendChild(wrap);
                    }
                    if (atom.hasVarY) {
                        const wrap = document.createElement('div');
                        wrap.style.cssText = 'display:flex; align-items:center; gap:2px;';
                        wrap.innerHTML = '<span style="color:#64748b; font-size:0.6rem;">y:</span>';
                        yInp = document.createElement('input');
                        yInp.type = 'number';
                        yInp.step = '0.01';
                        yInp.min = '0';
                        yInp.max = '1';
                        yInp.value = atom.y;
                        yInp.style.cssText = 'width:60px; background:rgba(15,23,42,0.8); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:1px 2px; text-align:center; font-size:0.65rem; font-family:var(--font-mono); height:18px; outline:none;';
                        yInp.oninput = (e) => syncInputsAndModel('y', e.target.value);
                        wrap.appendChild(yInp);
                        inputsRow.appendChild(wrap);
                    }
                    if (atom.hasVarZ) {
                        const wrap = document.createElement('div');
                        wrap.style.cssText = 'display:flex; align-items:center; gap:2px;';
                        wrap.innerHTML = '<span style="color:#64748b; font-size:0.6rem;">z:</span>';
                        zInp = document.createElement('input');
                        zInp.type = 'number';
                        zInp.step = '0.01';
                        zInp.min = '0';
                        zInp.max = '1';
                        zInp.value = atom.z;
                        zInp.style.cssText = 'width:60px; background:rgba(15,23,42,0.8); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:1px 2px; text-align:center; font-size:0.65rem; font-family:var(--font-mono); height:18px; outline:none;';
                        zInp.oninput = (e) => syncInputsAndModel('z', e.target.value);
                        wrap.appendChild(zInp);
                        inputsRow.appendChild(wrap);
                    }
                    item.appendChild(inputsRow);
                }

                list.appendChild(item);
            });
        };

        document.getElementById('cb-btn-clear').onclick = () => {
            this.cbAtomsList = [];
            updateAtomsListHTML();
            buildAndRenderScene();
        };

        document.getElementById('cb-btn-recenter').onclick = () => {
            buildAndRenderScene(true);
        };

        // Screenshot
        document.getElementById('cb-btn-snap').onclick = () => {
            if (!this.cbRenderer) return;
            // Capture image from preserveDrawingBuffer
            const formula = getFormula();
            const dataUrl = this.cbRenderer.domElement.toDataURL("image/png");
            const link = document.createElement('a');
            link.download = `${formula || 'crystal'}_sg${this.cbSelectedSG ? this.cbSelectedSG.space_group_number : 'unknown'}.png`;
            link.href = dataUrl;
            link.click();
        };

        // Background switching
        document.getElementById('cb-bg-dark').onclick = () => {
            document.getElementById('cb-bg-dark').classList.add('active');
            document.getElementById('cb-bg-light').classList.remove('active');
            this.cbRenderer.setClearColor(0x000000, 0);
            this.cbState.bgMode = "dark";
            buildAndRenderScene();
        };
        document.getElementById('cb-bg-light').onclick = () => {
            document.getElementById('cb-bg-dark').classList.remove('active');
            document.getElementById('cb-bg-light').classList.add('active');
            this.cbRenderer.setClearColor(0xffffff, 0.9);
            this.cbState.bgMode = "light";
            buildAndRenderScene();
        };

        // Formula Calculation
        const getFormula = () => {
            if (this.cbAtomsList.length === 0) return 'Empty';
            const counts = {};
            this.cbAtomsList.forEach(a => {
                counts[a.element] = (counts[a.element] || 0) + a.multiplicity;
            });
            return Object.keys(counts).map(k => `${k}${counts[k] > 1 ? counts[k] : ''}`).join('');
        };

        // CIF Export
        document.getElementById('cb-btn-export-cif').onclick = () => {
            if (!this.cbSelectedSG) return;
            const a = document.getElementById('cb-lat-a').value;
            const b = document.getElementById('cb-lat-b').value;
            const c = document.getElementById('cb-lat-c').value;
            const formula = getFormula();

            let cif = `data_${formula}\n`;
            cif += `_chemical_formula_sum             '${formula}'\n\n`;
            cif += `_cell_length_a                    ${parseFloat(a).toFixed(4)}\n`;
            cif += `_cell_length_b                    ${parseFloat(b).toFixed(4)}\n`;
            cif += `_cell_length_c                    ${parseFloat(c).toFixed(4)}\n`;
            cif += `_cell_angle_alpha                 ${parseFloat(document.getElementById('cb-lat-alpha').value).toFixed(4)}\n`;
            cif += `_cell_angle_beta                  ${parseFloat(document.getElementById('cb-lat-beta').value).toFixed(4)}\n`;
            cif += `_cell_angle_gamma                 ${parseFloat(document.getElementById('cb-lat-gamma').value).toFixed(4)}\n\n`;
            cif += `_symmetry_space_group_name_H-M   '${this.cbSelectedSG.space_group_symbol}'\n`;
            cif += `_symmetry_Int_Tables_number       ${this.cbSelectedSG.space_group_number}\n\n`;

            const generalWP = this.cbSelectedSG.wyckoff_positions.reduce((p, c) => (p.multiplicity > c.multiplicity) ? p : c);
            cif += "loop_\n_space_group_symop_id\n_space_group_symop_operation_xyz\n";
            generalWP.operations.forEach((op, idx) => {
                cif += `${idx + 1} '${op}'\n`;
            });
            cif += "\n";

            cif += "loop_\n_atom_site_label\n_atom_site_type_symbol\n_atom_site_fract_x\n_atom_site_fract_y\n_atom_site_fract_z\n";
            this.cbAtomsList.forEach((atom, idx) => {
                cif += `${atom.element}${idx + 1} ${atom.element} ${atom.baseCoords[0].toFixed(5)} ${atom.baseCoords[1].toFixed(5)} ${atom.baseCoords[2].toFixed(5)}\n`;
            });

            const blob = new Blob([cif], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${formula}_sg${this.cbSelectedSG.space_group_number}.cif`;
            link.click();
        };

        // Render Scene Logic
        const buildAndRenderScene = (resetCam = false) => {
            // Empty Three Groups
            const clearGroup = (g) => {
                while (g.children.length > 0) {
                    const obj = g.children[0];
                    g.remove(obj);
                    if (obj.geometry) obj.geometry.dispose();
                    if (obj.material) {
                        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
                        else obj.material.dispose();
                    }
                }
            };
            clearGroup(cellGroup);
            clearGroup(atomsGroup);
            clearGroup(bondsGroup);

            const a = parseFloat(document.getElementById('cb-lat-a').value) || 5;
            const b = parseFloat(document.getElementById('cb-lat-b').value) || 5;
            const c = parseFloat(document.getElementById('cb-lat-c').value) || 5;
            const alpha = parseFloat(document.getElementById('cb-lat-alpha').value) || 90;
            const beta = parseFloat(document.getElementById('cb-lat-beta').value) || 90;
            const gamma = parseFloat(document.getElementById('cb-lat-gamma').value) || 90;

            const scX = parseInt(document.getElementById('cb-sc-x').value) || 1;
            const scY = parseInt(document.getElementById('cb-sc-y').value) || 1;
            const scZ = parseInt(document.getElementById('cb-sc-z').value) || 1;

            const radiusScale = parseFloat(document.getElementById('cb-atom-scale').value) || 0.3;
            const drawBonds = document.getElementById('cb-toggle-bonds').checked;
            const bondTol = parseFloat(document.getElementById('cb-bond-tolerance').value) || 1.2;

            const baseMetrics = getCartesian(0, 0, 0, a, b, c, alpha, beta, gamma);
            document.getElementById('cb-hud-volume').innerText = `Vol: ${baseMetrics.V.toFixed(1)} Å³`;
            document.getElementById('cb-hud-formula').innerText = `Formula: ${getFormula()}`;

            // Draw unit cell box boundaries
            const drawUnitCellBox = (offsetVec, isPrimary = true) => {
                const frac = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]];
                const corners = frac.map(f => getCartesian(f[0], f[1], f[2], a, b, c, alpha, beta, gamma).vec.add(offsetVec));

                const edges = [[0, 1], [0, 2], [0, 4], [1, 3], [1, 5], [2, 3], [2, 6], [4, 5], [4, 6], [3, 7], [5, 7], [6, 7]];
                const lineMat = new THREE.LineBasicMaterial({
                    color: isPrimary ? 0x00f5d4 : 0x334155,
                    transparent: true,
                    opacity: isPrimary ? 0.8 : 0.25
                });

                edges.forEach(idx => {
                    const geometry = new THREE.BufferGeometry().setFromPoints([corners[idx[0]], corners[idx[1]]]);
                    cellGroup.add(new THREE.Line(geometry, lineMat));
                });
            };

            for (let i = 0; i < scX; i++) {
                for (let j = 0; j < scY; j++) {
                    for (let k = 0; k < scZ; k++) {
                        const offset = new THREE.Vector3()
                            .addScaledVector(baseMetrics.vA, i)
                            .addScaledVector(baseMetrics.vB, j)
                            .addScaledVector(baseMetrics.vC, k);
                        drawUnitCellBox(offset, i === 0 && j === 0 && k === 0);
                    }
                }
            }

            let generatedAtoms = [];
            const unitCellAtoms = [];

            // 1. Symmetry coords resolution
            this.cbAtomsList.forEach(atomData => {
                const wpInfo = this.cbSelectedSG.wyckoff_positions.find(w => w.letter === atomData.wyckoffLetter);
                if (!wpInfo) return;

                let uniqueFrac = [];
                wpInfo.operations.forEach(opStr => {
                    let f = evalWyckoffOperation(opStr, atomData.x, atomData.y, atomData.z);
                    if (!uniqueFrac.some(uc => Math.abs(uc[0] - f[0]) < 1e-3 && Math.abs(uc[1] - f[1]) < 1e-3 && Math.abs(uc[2] - f[2]) < 1e-3)) {
                        uniqueFrac.push(f);
                    }
                });

                uniqueFrac.forEach(f => {
                    let dx = [0]; if (Math.abs(f[0]) < 1e-4) dx.push(1);
                    let dy = [0]; if (Math.abs(f[1]) < 1e-4) dy.push(1);
                    let dz = [0]; if (Math.abs(f[2]) < 1e-4) dz.push(1);
                    dx.forEach(x => dy.forEach(y => dz.forEach(z => {
                        unitCellAtoms.push({ f: [f[0] + x, f[1] + y, f[2] + z], data: atomData });
                    })));
                });
            });

            // 2. Expand supercell
            for (let i = 0; i < scX; i++) {
                for (let j = 0; j < scY; j++) {
                    for (let k = 0; k < scZ; k++) {
                        unitCellAtoms.forEach(uAt => {
                            if ((Math.abs(uAt.f[0] - 1) < 1e-4 && i !== scX - 1) ||
                                (Math.abs(uAt.f[1] - 1) < 1e-4 && j !== scY - 1) ||
                                (Math.abs(uAt.f[2] - 1) < 1e-4 && k !== scZ - 1)) return;

                            const cart = getCartesian(uAt.f[0], uAt.f[1], uAt.f[2], a, b, c, alpha, beta, gamma);
                            const offsetCart = new THREE.Vector3()
                                .addScaledVector(baseMetrics.vA, i)
                                .addScaledVector(baseMetrics.vB, j)
                                .addScaledVector(baseMetrics.vC, k)
                                .add(cart.vec);

                            const r = (uAt.data.props.r || 1.2) * radiusScale;
                            const mat = getCachedMaterial(uAt.data.props.c);
                            const mesh = new THREE.Mesh(sphereGeom, mat);

                            mesh.scale.set(r, r, r);
                            mesh.position.copy(offsetCart);
                            mesh.castShadow = true;
                            mesh.receiveShadow = true;

                            mesh.userData = {
                                element: uAt.data.element,
                                wyckoff: uAt.data.wyckoffLetter,
                                fx: uAt.f[0] + i, fy: uAt.f[1] + j, fz: uAt.f[2] + k,
                                cx: offsetCart.x, cy: offsetCart.y, cz: offsetCart.z
                            };

                            atomsGroup.add(mesh);

                            if (drawBonds) {
                                generatedAtoms.push({
                                    vec: offsetCart,
                                    r: uAt.data.props.r || 1.2,
                                    c: uAt.data.props.c
                                });
                            }
                        });
                    }
                }
            }

            // 3. Draw Cylindrical Bonds
            if (drawBonds && generatedAtoms.length < 1500) {
                const bondMat = getCachedMaterial('#64748b');
                for (let i = 0; i < generatedAtoms.length; i++) {
                    for (let j = i + 1; j < generatedAtoms.length; j++) {
                        const dist = generatedAtoms[i].vec.distanceTo(generatedAtoms[j].vec);
                        const rSum = generatedAtoms[i].r + generatedAtoms[j].r;

                        if (dist > 0.4 && dist <= rSum * bondTol) {
                            const direction = new THREE.Vector3().subVectors(generatedAtoms[j].vec, generatedAtoms[i].vec);
                            const length = direction.length();
                            const center = new THREE.Vector3().addVectors(generatedAtoms[i].vec, generatedAtoms[j].vec).multiplyScalar(0.5);

                            const cylGeom = new THREE.CylinderGeometry(0.06, 0.06, length, 6);
                            const cylinder = new THREE.Mesh(cylGeom, bondMat);
                            cylinder.position.copy(center);
                            cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
                            cylinder.castShadow = true;
                            bondsGroup.add(cylinder);
                        }
                    }
                }
            }

            // Target Camera Focus Point
            const targetPoint = new THREE.Vector3()
                .addScaledVector(baseMetrics.vA, scX / 2)
                .addScaledVector(baseMetrics.vB, scY / 2)
                .addScaledVector(baseMetrics.vC, scZ / 2);

            this.cbControls.target.copy(targetPoint);
            if (resetCam) {
                const dim = Math.max(a * scX, b * scY, c * scZ);
                this.cbCamera.position.set(targetPoint.x + dim * 1.3, targetPoint.y + dim * 0.9, targetPoint.z + dim * 1.6);
            }
        };

        // File loading handling
        const setupFileReader = (fileInput) => {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const r = new FileReader();
                loader.style.display = 'flex';
                r.onload = (evt) => {
                    try {
                        this.cbSpaceGroupsData = JSON.parse(evt.target.result);
                        loader.style.display = 'none';
                        populateSgDropdown();
                    } catch (err) {
                        alert("Error parsing JSON database file.");
                        loader.style.display = 'none';
                    }
                };
                r.readAsText(file);
            });
        };

        const populateSgDropdown = () => {
            sgSelect.innerHTML = '';
            Object.keys(this.cbSpaceGroupsData).forEach(num => {
                const opt = document.createElement('option');
                opt.value = num;
                opt.textContent = `${num} - ${this.cbSpaceGroupsData[num].space_group_symbol}`;
                if (num === this.cbState.sgNum) opt.selected = true;
                sgSelect.appendChild(opt);
            });
            handleSgChange();

            // Restore all state inputs to DOM elements
            document.getElementById('cb-lat-a').value = this.cbState.latA;
            document.getElementById('cb-lat-b').value = this.cbState.latB;
            document.getElementById('cb-lat-c').value = this.cbState.latC;
            document.getElementById('cb-lat-alpha').value = this.cbState.latAlpha;
            document.getElementById('cb-lat-beta').value = this.cbState.latBeta;
            document.getElementById('cb-lat-gamma').value = this.cbState.latGamma;

            document.getElementById('cb-sc-x').value = this.cbState.scX;
            document.getElementById('cb-sc-y').value = this.cbState.scY;
            document.getElementById('cb-sc-z').value = this.cbState.scZ;

            document.getElementById('cb-atom-scale').value = this.cbState.atomRadius;
            document.getElementById('cb-scale-val').textContent = parseFloat(this.cbState.atomRadius).toFixed(2);

            document.getElementById('cb-toggle-bonds').checked = this.cbState.drawBonds;
            const bondSettings = document.getElementById('cb-bond-settings');
            if (this.cbState.drawBonds) {
                bondSettings.style.opacity = '1';
                bondSettings.style.pointerEvents = 'auto';
            } else {
                bondSettings.style.opacity = '0.4';
                bondSettings.style.pointerEvents = 'none';
            }

            document.getElementById('cb-bond-tolerance').value = this.cbState.bondTolerance;
            document.getElementById('cb-bond-tol-val').textContent = parseFloat(this.cbState.bondTolerance).toFixed(1) + 'x';

            document.getElementById('cb-atom-el').value = this.cbState.atomEl;

            if (this.cbState.wyckoffLetter) {
                wyckoffSelect.value = this.cbState.wyckoffLetter;
                handleWyckoffSiteChange();
            }

            document.getElementById('cb-atom-x').value = this.cbState.atomX;
            document.getElementById('cb-atom-y').value = this.cbState.atomY;
            document.getElementById('cb-atom-z').value = this.cbState.atomZ;

            // Restore active tab
            tabs.forEach(t => {
                t.classList.remove('active');
                t.style.color = '#64748b';
                if (t.getAttribute('data-target') === this.cbState.activeTab) {
                    t.classList.add('active');
                    t.style.color = 'var(--accent-mint)';
                }
            });
            document.querySelectorAll('.cb-tab-content').forEach(content => {
                content.style.display = 'none';
                if (content.id === this.cbState.activeTab) {
                    content.style.display = 'flex';
                }
            });

            // Restore background mode active classes
            if (this.cbState.bgMode === 'light') {
                document.getElementById('cb-bg-dark').classList.remove('active');
                document.getElementById('cb-bg-light').classList.add('active');
                this.cbRenderer.setClearColor(0xffffff, 0.9);
            } else {
                document.getElementById('cb-bg-dark').classList.add('active');
                document.getElementById('cb-bg-light').classList.remove('active');
                this.cbRenderer.setClearColor(0x000000, 0);
            }

            updateAtomsListHTML();
            buildAndRenderScene();
        };

        // Trigger database load
        if (this.cbSpaceGroupsData) {
            loader.style.display = 'none';
            populateSgDropdown();
        } else {
            fetch('data/all_wyckoff_positions.json')
                .then(res => {
                    if (!res.ok) throw new Error("HTTP " + res.status);
                    return res.json();
                })
                .then(data => {
                    this.cbSpaceGroupsData = data;
                    loader.style.display = 'none';
                    populateSgDropdown();
                })
                .catch(err => {
                    console.warn("Wyckoff positions JSON Fetch failed, prompting manual upload:", err);
                    loader.innerHTML = `
                        <span style="font-size:1.5rem; color:var(--color-orange); font-weight:700;">⚠️ CORS/Local File Block</span>
                        <p style="font-size:0.85rem; color:#64748b; max-width:280px; text-align:center; margin:0; line-height:1.4;">
                            Local fetch blocked. Select <code>all_wyckoff_positions.json</code> from the <code>data/</code> folder:
                        </p>
                        <label for="cb-json-file" style="background:var(--accent-mint); color:#000; border:none; padding:8px 16px; border-radius:6px; font-weight:bold; font-size:0.75rem; cursor:pointer; pointer-events:auto; display:inline-block;">Choose file</label>
                        <input type="file" id="cb-json-file" accept=".json" style="display:none;">
                    `;
                    const fileInput = document.getElementById('cb-json-file');
                    setupFileReader(fileInput);
                });
        }

        // Animation Loop
        const animate = () => {
            if (!this.cbRenderer) return;
            this.cbAnimationFrameId = requestAnimationFrame(animate);
            this.cbControls.update();
            this.cbRenderer.render(this.cbScene, this.cbCamera);
        };
        animate();
    },

    // --- New slide: Bond Scoring Visualizer Widget ---
    initCrystalScoringWidget() {
        const container = document.getElementById('widget-crystal-scoring');
        if (!container) return;

        const loader = document.getElementById('cs-loading');
        
        // Initialize persistent state if not already done
        if (!this.csState) {
            this.csState = {
                sgNum: "227",
                latA: "5.43",
                latB: "5.43",
                latC: "5.43",
                latAlpha: "90",
                latBeta: "90",
                latGamma: "90",
                scX: "1",
                scY: "1",
                scZ: "1",
                atomRadius: "0.30",
                drawBonds: true,
                bondTolerance: "1.2",
                bgMode: "dark",
                activeTab: "cs-tab-build",
                wyckoffLetter: "a",
                atomEl: "Si",
                atomX: "0.125",
                atomY: "0.125",
                atomZ: "0.125"
            };
            this.csAtomsList = [];
            this.csIdCounter = 0;
            this.csSelectedSG = null;
        }

        // Helper to save current DOM state to persistent state cache
        const saveCsState = () => {
            if (!this.csState) return;
            const sgSelect = document.getElementById('cs-sg-select');
            const wyckoffSelect = document.getElementById('cs-wyckoff-select');
            if (sgSelect) this.csState.sgNum = sgSelect.value;
            if (wyckoffSelect) this.csState.wyckoffLetter = wyckoffSelect.value;
            
            const latA = document.getElementById('cs-lat-a');
            const latB = document.getElementById('cs-lat-b');
            const latC = document.getElementById('cs-lat-c');
            const alpha = document.getElementById('cs-lat-alpha');
            const beta = document.getElementById('cs-lat-beta');
            const gamma = document.getElementById('cs-lat-gamma');
            if (latA) this.csState.latA = latA.value;
            if (latB) this.csState.latB = latB.value;
            if (latC) this.csState.latC = latC.value;
            if (alpha) this.csState.latAlpha = alpha.value;
            if (beta) this.csState.latBeta = beta.value;
            if (gamma) this.csState.latGamma = gamma.value;

            const scX = document.getElementById('cs-sc-x');
            const scY = document.getElementById('cs-sc-y');
            const scZ = document.getElementById('cs-sc-z');
            if (scX) this.csState.scX = scX.value;
            if (scY) this.csState.scY = scY.value;
            if (scZ) this.csState.scZ = scZ.value;

            const atomScale = document.getElementById('cs-atom-scale');
            if (atomScale) this.csState.atomRadius = atomScale.value;

            const drawBondsInp = document.getElementById('cs-toggle-bonds');
            if (drawBondsInp) this.csState.drawBonds = drawBondsInp.checked;

            const bondTol = document.getElementById('cs-bond-tolerance');
            if (bondTol) this.csState.bondTolerance = bondTol.value;

            const atomEl = document.getElementById('cs-atom-el');
            if (atomEl) this.csState.atomEl = atomEl.value;

            const atomX = document.getElementById('cs-atom-x');
            const atomY = document.getElementById('cs-atom-y');
            const atomZ = document.getElementById('cs-atom-z');
            if (atomX) this.csState.atomX = atomX.value;
            if (atomY) this.csState.atomY = atomY.value;
            if (atomZ) this.csState.atomZ = atomZ.value;
        };

        // CPK element attributes cache (same as crystal builder)
        const elementData = {
            'H': { c: '#FFFFFF', r: 0.31 }, 'He': { c: '#D9FFFF', r: 0.28 }, 'Li': { c: '#CC80FF', r: 1.28 }, 'Be': { c: '#C2FF00', r: 0.96 },
            'B': { c: '#FFB5B5', r: 0.84 }, 'C': { c: '#909090', r: 0.76 }, 'N': { c: '#3050F8', r: 0.71 }, 'O': { c: '#FF0D0D', r: 0.66 },
            'F': { c: '#90E050', r: 0.57 }, 'Ne': { c: '#B3E3F5', r: 0.58 }, 'Na': { c: '#AB5CF2', r: 1.66 }, 'Mg': { c: '#8AFF00', r: 1.41 },
            'Al': { c: '#BFA6A6', r: 1.21 }, 'Si': { c: '#F0C8A0', r: 1.11 }, 'P': { c: '#FF8000', r: 1.07 }, 'S': { c: '#FFFF30', r: 1.05 },
            'Cl': { c: '#1FF01F', r: 1.02 }, 'Ar': { c: '#80D1E3', r: 1.06 }, 'K': { c: '#8F40D4', r: 2.03 }, 'Ca': { c: '#3DFF00', r: 1.76 },
            'Sc': { c: '#E6E6E6', r: 1.70 }, 'Ti': { c: '#BFC2C7', r: 1.60 }, 'V': { c: '#A6A6AB', r: 1.53 }, 'Cr': { c: '#8A99C7', r: 1.39 },
            'Mn': { c: '#9C7AC7', r: 1.39 }, 'Fe': { c: '#E06633', r: 1.32 }, 'Co': { c: '#F090A0', r: 1.26 }, 'Ni': { c: '#50D050', r: 1.24 },
            'Cu': { c: '#C88033', r: 1.32 }, 'Zn': { c: '#7D80B0', r: 1.22 }, 'Ga': { c: '#C28F8F', r: 1.22 }, 'Ge': { c: '#668F8F', r: 1.20 },
            'As': { c: '#BD80E3', r: 1.19 }, 'Se': { c: '#FFA100', r: 1.20 }, 'Br': { c: '#A62929', r: 1.20 }, 'Kr': { c: '#5CB8D1', r: 1.16 },
            'Rb': { c: '#702EB0', r: 2.20 }, 'Sr': { c: '#00FF00', r: 1.95 }, 'Y': { c: '#94FFFF', r: 1.90 }, 'Zr': { c: '#94E0E0', r: 1.75 },
            'Nb': { c: '#73C2C9', r: 1.64 }, 'Mo': { c: '#54B5B5', r: 1.54 }, 'Tc': { c: '#3B9E9E', r: 1.47 }, 'Ru': { c: '#248F8F', r: 1.46 },
            'Rh': { c: '#0A7D8C', r: 1.42 }, 'Pd': { c: '#006985', r: 1.39 }, 'Ag': { c: '#C0C0C0', r: 1.45 }, 'Cd': { c: '#FFD98F', r: 1.44 },
            'In': { c: '#A67573', r: 1.42 }, 'Sn': { c: '#668080', r: 1.39 }, 'Sb': { c: '#9E63B5', r: 1.39 }, 'Te': { c: '#D47A00', r: 1.38 },
            'I': { c: '#940094', r: 1.39 }, 'Xe': { c: '#429EB0', r: 1.40 }, 'Cs': { c: '#57178F', r: 2.44 }, 'Ba': { c: '#00C900', r: 2.15 },
            'La': { c: '#70D4FF', r: 2.07 }, 'Ce': { c: '#FFFFC7', r: 2.04 }, 'Pr': { c: '#D9FFC7', r: 2.03 }, 'Nd': { c: '#C7FFC7', r: 2.01 },
            'Pm': { c: '#A3FFC7', r: 1.99 }, 'Sm': { c: '#8FFFC7', r: 1.98 }, 'Eu': { c: '#61FFC7', r: 1.98 }, 'Gd': { c: '#45FFC7', r: 1.96 },
            'Tb': { c: '#30FFC7', r: 1.94 }, 'Dy': { c: '#1FFFC7', r: 1.92 }, 'Ho': { c: '#00FF9C', r: 1.92 }, 'Er': { c: '#00E675', r: 1.89 },
            'Tm': { c: '#00D452', r: 1.90 }, 'Yb': { c: '#00BF38', r: 1.87 }, 'Lu': { c: '#00AB24', r: 1.87 }, 'Hf': { c: '#4DC2FF', r: 1.75 },
            'Ta': { c: '#4DA6FF', r: 1.70 }, 'W': { c: '#2194D6', r: 1.62 }, 'Re': { c: '#267DAB', r: 1.51 }, 'Os': { c: '#266696', r: 1.44 },
            'Ir': { c: '#175487', r: 1.41 }, 'Pt': { c: '#D0D0E0', r: 1.36 }, 'Au': { c: '#FFD123', r: 1.36 }, 'Hg': { c: '#B8B8D0', r: 1.32 },
            'Tl': { c: '#A6544D', r: 1.45 }, 'Pb': { c: '#575961', r: 1.46 }, 'Bi': { c: '#9E4FB5', r: 1.48 }, 'Po': { c: '#AB5C00', r: 1.40 },
            'At': { c: '#754F45', r: 1.50 }, 'Rn': { c: '#428296', r: 1.50 }, 'Fr': { c: '#420066', r: 2.60 }, 'Ra': { c: '#007D00', r: 2.21 },
            'Ac': { c: '#70ABFA', r: 2.15 }, 'Th': { c: '#00BAFF', r: 2.06 }, 'Pa': { c: '#00A1FF', r: 2.00 }, 'U': { c: '#008FFF', r: 1.96 }
        };

        const getElementProps = (symbol) => {
            let norm = symbol.trim();
            if (norm.length > 0) norm = norm.charAt(0).toUpperCase() + norm.slice(1).toLowerCase();
            if (elementData[norm]) return elementData[norm];
            return { c: '#9b5de5', r: 1.2 };
        };

        const parseFraction = (valStr) => {
            valStr = valStr.trim();
            if (valStr.includes('/')) {
                const parts = valStr.split('/');
                if (parts.length === 2) {
                    return parseFloat(parts[0]) / parseFloat(parts[1]);
                }
            }
            return parseFloat(valStr) || 0;
        };

        const evalWyckoffOperation = (opStr, x, y, z) => {
            let clean = opStr.trim().replace(/minus/g, '-').replace(/−/g, '-');
            const parts = clean.split(',');
            if (parts.length !== 3) return [0, 0, 0];

            const evaluate = (expr) => {
                try {
                    const sanitized = expr.replace(/(\d+)\/(\d+)/g, '($1/$2)').replace(/(\d)([xyz])/g, '$1*$2');
                    const func = new Function('x', 'y', 'z', `return ${sanitized};`);
                    let val = func(x, y, z);
                    let wrapped = val % 1;
                    if (wrapped < 0) wrapped += 1;
                    return Math.round(wrapped * 10000) / 10000;
                } catch (e) {
                    return 0;
                }
            };
            return [evaluate(parts[0]), evaluate(parts[1]), evaluate(parts[2])];
        };

        const getCartesian = (fx, fy, fz, a, b, c, alpha, beta, gamma) => {
            const alphaRad = alpha * Math.PI / 180;
            const betaRad = beta * Math.PI / 180;
            const gammaRad = gamma * Math.PI / 180;

            const cosA = Math.cos(alphaRad);
            const cosB = Math.cos(betaRad);
            const cosG = Math.cos(gammaRad);
            const sinG = Math.sin(gammaRad);

            const volTerm = 1 - cosA*cosA - cosB*cosB - cosG*cosG + 2*cosA*cosB*cosG;
            const V = a * b * c * (volTerm > 0 ? Math.sqrt(volTerm) : 0);

            const vA = new THREE.Vector3(a, 0, 0);
            const vB = new THREE.Vector3(b * cosG, b * sinG, 0);
            const cx = c * cosB;
            const cy = sinG !== 0 ? c * (cosA - cosB * cosG) / sinG : 0;
            const cz = (a * b * sinG) !== 0 ? V / (a * b * sinG) : 0;
            const vC = new THREE.Vector3(cx, cy, cz);

            const vec = new THREE.Vector3()
                .addScaledVector(vA, fx)
                .addScaledVector(vB, fy)
                .addScaledVector(vC, fz);

            return { vec, vA, vB, vC, V };
        };

        // GMM parameters lookup and fallbacks
        const getDominantComponent = (elA, elB) => {
            const key = [elA, elB].sort().join('-');
            if (this.csPairsData && this.csPairsData[key]) {
                const entry = this.csPairsData[key];
                if (entry.components && entry.components.length > 0) {
                    const rA = getElementProps(elA).r;
                    const rB = getElementProps(elB).r;
                    const dCov = rA + rB;
                    const minBound = dCov * 0.75;
                    const maxBound = dCov * 1.45;
                    
                    const survivors = entry.components.filter(c => 
                        c.weight >= 0.05 && c.mu >= minBound && c.mu <= maxBound
                    );
                    const comps = survivors.length > 0 ? survivors : entry.components;
                    return comps.reduce((best, c) => (c.weight > best.weight ? c : best), comps[0]);
                }
            }
            const rA = getElementProps(elA).r;
            const rB = getElementProps(elB).r;
            return { mu: rA + rB, sigma: 0.15, weight: 1.0 };
        };

        const getDmin = (elA, elB) => {
            const key = [elA, elB].sort().join('-');
            if (this.csPairsData && this.csPairsData[key]) {
                const entry = this.csPairsData[key];
                if (entry.components && entry.components.length > 0) {
                    const rA = getElementProps(elA).r;
                    const rB = getElementProps(elB).r;
                    const dCov = rA + rB;
                    const minBound = dCov * 0.75;
                    const maxBound = dCov * 1.45;
                    const survivors = entry.components.filter(c => 
                        c.weight >= 0.05 && c.mu >= minBound && c.mu <= maxBound
                    );
                    const comps = survivors.length > 0 ? survivors : entry.components;
                    const minVal = comps.reduce((min, c) => Math.min(min, c.mu - 3 * c.sigma), Infinity);
                    return Math.max(0.3, minVal);
                }
            }
            const rA = getElementProps(elA).r;
            const rB = getElementProps(elB).r;
            return (rA + rB) * 0.85;
        };

        const getDpeak = (elA, elB) => {
            return getDominantComponent(elA, elB).mu;
        };

        const bondHealthColor = (d, elA, elB) => {
            const comp = getDominantComponent(elA, elB);
            const { mu, sigma } = comp;
            const dmin = getDmin(elA, elB);
            if (d < dmin) return '#ef4444'; // Steric red
            if (Math.abs(d - mu) <= sigma) return '#22c55e'; // Green 1s
            if (Math.abs(d - mu) <= 2 * sigma) return '#eab308'; // Yellow 2s
            return '#f97316'; // Outlier orange
        };

        const bondHealthStatus = (d, elA, elB) => {
            const comp = getDominantComponent(elA, elB);
            const { mu, sigma } = comp;
            const dmin = getDmin(elA, elB);
            if (d < dmin) return '🔴';
            if (Math.abs(d - mu) <= sigma) return '🟢';
            if (Math.abs(d - mu) <= 2 * sigma) return '🟡';
            return '🟠';
        };

        const _pairScoreUnified = (d, elA, elB) => {
            const comp = getDominantComponent(elA, elB);
            const { mu, sigma } = comp;
            
            const rA = getElementProps(elA).r;
            const rB = getElementProps(elB).r;
            const dCap = 1.45 * (rA + rB);
            if (d > dCap) d = dCap;
            
            const A = 4.0;
            const zBound = 2.0;
            
            const dTrans = mu + zBound * sigma;
            if (d <= dTrans) {
                const z = (d - mu) / sigma;
                return A * Math.exp(-0.5 * z * z);
            } else {
                const zSq = zBound * zBound;
                const sTrans = A * Math.exp(-0.5 * zSq);
                const B = (zBound * A / sigma) * Math.exp(-0.5 * zSq);
                return sTrans - B * (d - dTrans);
            }
        };

        const ATOMIC_MASSES = {
            'H': 1.008, 'He': 4.003, 'Li': 6.941, 'Be': 9.012, 'B': 10.811, 'C': 12.011, 'N': 14.007, 'O': 15.999,
            'F': 18.998, 'Ne': 20.180, 'Na': 22.990, 'Mg': 24.305, 'Al': 26.982, 'Si': 28.086, 'P': 30.974, 'S': 32.065,
            'Cl': 35.453, 'Ar': 39.948, 'K': 39.098, 'Ca': 40.078, 'Sc': 44.956, 'Ti': 47.867, 'V': 50.942, 'Cr': 51.996,
            'Mn': 54.938, 'Fe': 55.845, 'Co': 58.933, 'Ni': 58.693, 'Cu': 63.546, 'Zn': 65.38, 'Ga': 69.723, 'Ge': 72.64,
            'As': 74.922, 'Se': 78.96, 'Br': 79.904, 'Kr': 83.798, 'Rb': 85.468, 'Sr': 87.62, 'Y': 88.906, 'Zr': 91.224,
            'Nb': 92.906, 'Mo': 95.96, 'Tc': 97.907, 'Ru': 101.07, 'Rh': 102.906, 'Pd': 106.42, 'Ag': 107.868, 'Cd': 112.411,
            'In': 114.818, 'Sn': 118.710, 'Sb': 121.760, 'Te': 127.60, 'I': 126.904, 'Xe': 131.293, 'Cs': 132.905, 'Ba': 137.327,
            'La': 138.905, 'Ce': 140.116, 'Pr': 140.908, 'Nd': 144.242, 'Pm': 144.913, 'Sm': 150.36, 'Eu': 151.964, 'Gd': 157.25,
            'Tb': 158.925, 'Dy': 162.500, 'Ho': 164.930, 'Er': 167.259, 'Tm': 168.934, 'Yb': 173.054, 'Lu': 174.967, 'Hf': 178.49,
            'Ta': 180.948, 'W': 183.84, 'Re': 186.207, 'Os': 190.23, 'Ir': 192.217, 'Pt': 195.084, 'Au': 196.967, 'Hg': 200.592,
            'Tl': 204.38, 'Pb': 207.2, 'Bi': 208.980, 'Po': 208.982, 'At': 209.987, 'Rn': 222.018, 'Fr': 223.020, 'Ra': 226.025,
            'Ac': 227.028, 'Th': 232.038, 'Pa': 231.036, 'U': 238.029
        };

        const getPairWeight = (elA, elB) => {
            const mA = ATOMIC_MASSES[elA] || 12.0;
            const mB = ATOMIC_MASSES[elB] || 12.0;
            return Math.sqrt(mA) + Math.sqrt(mB);
        };

        const logSumExp = (scores) => {
            if (scores.length === 0) return -Infinity;
            const max = Math.max(...scores);
            const sum = scores.reduce((s, val) => s + Math.exp(val - max), 0);
            return max + Math.log(sum);
        };

        // 3D Scene Initialization
        const viewerContainer = document.getElementById('cs-viewer-container');
        this.csScene = new THREE.Scene();
        this.csCamera = new THREE.PerspectiveCamera(45, viewerContainer.clientWidth / viewerContainer.clientHeight, 0.1, 1000);
        this.csCamera.position.set(8, 8, 12);

        this.csRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
        this.csRenderer.setSize(viewerContainer.clientWidth, viewerContainer.clientHeight);
        this.csRenderer.shadowMap.enabled = true;
        
        if (this.csState && this.csState.bgMode === 'light') {
            this.csRenderer.setClearColor(0xffffff, 0.9);
        } else {
            this.csRenderer.setClearColor(0x000000, 0);
        }
        viewerContainer.appendChild(this.csRenderer.domElement);

        this.csControls = new THREE.OrbitControls(this.csCamera, this.csRenderer.domElement);
        this.csControls.enableDamping = true;
        this.csControls.dampingFactor = 0.05;

        // Lighting
        const ambient = new THREE.AmbientLight(0xffffff, 0.45);
        this.csScene.add(ambient);
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
        dirLight.position.set(5, 10, 7);
        this.csScene.add(dirLight);

        // Cache materials
        const materialsCache = {};
        const getCachedMaterial = (colorStr) => {
            if (!materialsCache[colorStr]) {
                materialsCache[colorStr] = new THREE.MeshPhongMaterial({
                    color: new THREE.Color(colorStr),
                    shininess: 80,
                    specular: 0x444444
                });
            }
            return materialsCache[colorStr];
        };
        const sphereGeom = new THREE.SphereGeometry(1, 16, 16);

        // Drawing Groups
        const cellGroup = new THREE.Group();
        const atomsGroup = new THREE.Group();
        const bondsGroup = new THREE.Group();
        this.csScene.add(cellGroup);
        this.csScene.add(atomsGroup);
        this.csScene.add(bondsGroup);

        // Raycasting for Tooltip
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseMove = (event) => {
            if (!this.csRenderer) return;
            const rect = this.csRenderer.domElement.getBoundingClientRect();
            const scaleX = rect.width / this.csRenderer.domElement.clientWidth;
            const scaleY = rect.height / this.csRenderer.domElement.clientHeight;

            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, this.csCamera);
            const intersects = raycaster.intersectObjects(atomsGroup.children);

            const tooltip = document.getElementById('cs-atom-tooltip');
            if (intersects.length > 0) {
                const mesh = intersects[0].object;
                const u = mesh.userData;
                document.getElementById('cs-tt-el').textContent = u.element;
                document.getElementById('cs-tt-wp').textContent = u.wyckoff;
                document.getElementById('cs-tt-frac').textContent = `[${u.fx.toFixed(3)}, ${u.fy.toFixed(3)}, ${u.fz.toFixed(3)}]`;
                document.getElementById('cs-tt-cart').textContent = `[${u.cx.toFixed(2)}, ${u.cy.toFixed(2)}, ${u.cz.toFixed(2)}]`;
                
                tooltip.style.display = 'block';
                tooltip.style.left = (event.clientX - rect.left) / scaleX + 'px';
                tooltip.style.top = (event.clientY - rect.top) / scaleY + 'px';
            } else {
                tooltip.style.display = 'none';
            }
        };
        this.csRenderer.domElement.addEventListener('mousemove', onMouseMove);

        // Tab Navigation click handlers
        const tabs = document.querySelectorAll('.cs-tab-btn');
        tabs.forEach(btn => {
            btn.onclick = () => {
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.style.color = '#64748b';
                });
                btn.classList.add('active');
                btn.style.color = 'var(--accent-mint)';
                
                document.querySelectorAll('.cs-tab-content').forEach(content => {
                    content.style.display = 'none';
                });
                document.getElementById(btn.getAttribute('data-target')).style.display = 'flex';
                
                this.csState.activeTab = btn.getAttribute('data-target');
            };
        });

        const sgSelect = document.getElementById('cs-sg-select');
        const wyckoffSelect = document.getElementById('cs-wyckoff-select');
        
        const handleSgChange = () => {
            const num = sgSelect.value;
            if (!this.csSpaceGroupsData || !this.csSpaceGroupsData[num]) return;
            this.csSelectedSG = this.csSpaceGroupsData[num];

            document.getElementById('cs-hud-sg').textContent = `${this.csSelectedSG.space_group_symbol} (No. ${this.csSelectedSG.space_group_number})`;
            document.getElementById('cs-hud-sg').title = `${this.csSelectedSG.space_group_symbol} (No. ${this.csSelectedSG.space_group_number})`;

            const latA = document.getElementById('cs-lat-a');
            const latB = document.getElementById('cs-lat-b');
            const latC = document.getElementById('cs-lat-c');
            const alpha = document.getElementById('cs-lat-alpha');
            const beta = document.getElementById('cs-lat-beta');
            const gamma = document.getElementById('cs-lat-gamma');

            [latA, latB, latC, alpha, beta, gamma].forEach(inp => inp.disabled = false);

            const sys = this.csSelectedSG.crystal_system.toLowerCase();
            if (sys === 'cubic') {
                latB.disabled = true; latC.disabled = true;
                alpha.disabled = true; beta.disabled = true; gamma.disabled = true;
                latB.value = latA.value; latC.value = latA.value;
                alpha.value = 90; beta.value = 90; gamma.value = 90;
            } else if (sys === 'tetragonal') {
                latB.disabled = true;
                alpha.disabled = true; beta.disabled = true; gamma.disabled = true;
                latB.value = latA.value;
                alpha.value = 90; beta.value = 90; gamma.value = 90;
            } else if (sys === 'hexagonal' || sys === 'trigonal') {
                latB.disabled = true;
                alpha.disabled = true; beta.disabled = true; gamma.disabled = true;
                latB.value = latA.value;
                alpha.value = 90; beta.value = 90; gamma.value = 120;
            } else if (sys === 'orthorhombic') {
                alpha.disabled = true; beta.disabled = true; gamma.disabled = true;
                alpha.value = 90; beta.value = 90; gamma.value = 90;
            } else if (sys === 'monoclinic') {
                alpha.disabled = true; gamma.disabled = true;
                alpha.value = 90; gamma.value = 90;
            }

            wyckoffSelect.innerHTML = '';
            this.csSelectedSG.wyckoff_positions.forEach(wp => {
                const opt = document.createElement('option');
                opt.value = wp.letter;
                const hint = wp.operations?.[0] || '';
                opt.textContent = `${wp.multiplicity}${wp.letter} (${hint})`;
                wyckoffSelect.appendChild(opt);
            });

            handleWyckoffSiteChange();
            buildAndRenderScene();
        };

        const handleWyckoffSiteChange = () => {
            const letter = wyckoffSelect.value;
            if (!this.csSelectedSG) return;
            const wp = this.csSelectedSG.wyckoff_positions.find(w => w.letter === letter);
            if (!wp) return;

            const op = wp.operations[0];
            const parts = op.split(',');
            
            const handleCoordSlider = (inpId, expr) => {
                const inp = document.getElementById(inpId);
                const hasVar = expr.includes('x') || expr.includes('y') || expr.includes('z');
                if (!hasVar) {
                    inp.value = parseFraction(expr);
                    inp.disabled = true;
                    inp.style.opacity = '0.4';
                } else {
                    inp.disabled = false;
                    inp.style.opacity = '1';
                }
            };
            handleCoordSlider('cs-atom-x', parts[0]);
            handleCoordSlider('cs-atom-y', parts[1]);
            handleCoordSlider('cs-atom-z', parts[2]);
        };

        sgSelect.onchange = () => {
            this.csAtomsList = [];
            updateAtomsListHTML();
            handleSgChange();
            saveCsState();
        };

        wyckoffSelect.onchange = () => {
            handleWyckoffSiteChange();
            saveCsState();
        };

        const handleCellParamChange = () => {
            const sys = this.csSelectedSG ? this.csSelectedSG.crystal_system.toLowerCase() : '';
            if (sys === 'cubic') {
                document.getElementById('cs-lat-b').value = document.getElementById('cs-lat-a').value;
                document.getElementById('cs-lat-c').value = document.getElementById('cs-lat-a').value;
            } else if (sys === 'tetragonal' || sys === 'hexagonal' || sys === 'trigonal') {
                document.getElementById('cs-lat-b').value = document.getElementById('cs-lat-a').value;
            }
            buildAndRenderScene();
        };

        document.getElementById('cs-lat-a').oninput = () => { handleCellParamChange(); saveCsState(); };
        document.getElementById('cs-lat-b').oninput = () => { handleCellParamChange(); saveCsState(); };
        document.getElementById('cs-lat-c').oninput = () => { handleCellParamChange(); saveCsState(); };
        document.getElementById('cs-lat-alpha').oninput = () => { handleCellParamChange(); saveCsState(); };
        document.getElementById('cs-lat-beta').oninput = () => { handleCellParamChange(); saveCsState(); };
        document.getElementById('cs-lat-gamma').oninput = () => { handleCellParamChange(); saveCsState(); };

        document.getElementById('cs-sc-x').onchange = () => { buildAndRenderScene(); saveCsState(); };
        document.getElementById('cs-sc-y').onchange = () => { buildAndRenderScene(); saveCsState(); };
        document.getElementById('cs-sc-z').onchange = () => { buildAndRenderScene(); saveCsState(); };
        
        document.getElementById('cs-atom-scale').oninput = (e) => {
            document.getElementById('cs-scale-val').textContent = parseFloat(e.target.value).toFixed(2);
            buildAndRenderScene();
            saveCsState();
        };

        document.getElementById('cs-toggle-bonds').onchange = (e) => {
            const set = document.getElementById('cs-bond-settings');
            if (e.target.checked) {
                set.style.opacity = '1';
                set.style.pointerEvents = 'auto';
            } else {
                set.style.opacity = '0.4';
                set.style.pointerEvents = 'none';
            }
            buildAndRenderScene();
            saveCsState();
        };
        
        document.getElementById('cs-bond-tolerance').oninput = (e) => {
            document.getElementById('cs-bond-tol-val').textContent = parseFloat(e.target.value).toFixed(1) + 'x';
            buildAndRenderScene();
            saveCsState();
        };

        document.getElementById('cs-atom-el').oninput = () => saveCsState();
        document.getElementById('cs-atom-x').oninput = () => saveCsState();
        document.getElementById('cs-atom-y').oninput = () => saveCsState();
        document.getElementById('cs-atom-z').oninput = () => saveCsState();

        // Add Atom Action
        document.getElementById('cs-btn-add-atom').onclick = () => {
            if (!this.csSelectedSG) return;
            const element = document.getElementById('cs-atom-el').value.trim().toUpperCase();
            if (!element) return;

            const letter = wyckoffSelect.value;
            const wp = this.csSelectedSG.wyckoff_positions.find(w => w.letter === letter);
            if (!wp) return;

            const rawX = document.getElementById('cs-atom-x').value;
            const rawY = document.getElementById('cs-atom-y').value;
            const rawZ = document.getElementById('cs-atom-z').value;

            const x = parseFraction(rawX);
            const y = parseFraction(rawY);
            const z = parseFraction(rawZ);

            const props = getElementProps(element);

            const op = wp.operations[0];
            const parts = op.split(',');
            const hasVarX = parts[0] ? (parts[0].includes('x') || parts[0].includes('y') || parts[0].includes('z')) : false;
            const hasVarY = parts[1] ? (parts[1].includes('x') || parts[1].includes('y') || parts[1].includes('z')) : false;
            const hasVarZ = parts[2] ? (parts[2].includes('x') || parts[2].includes('y') || parts[2].includes('z')) : false;

            const newAtom = {
                id: this.csIdCounter++,
                element,
                x, y, z,
                baseCoords: [x, y, z],
                origStrings: { x: rawX, y: rawY, z: rawZ },
                wyckoffLetter: letter,
                multiplicity: wp.multiplicity,
                siteSymmetry: wp.site_symmetry,
                props,
                visible: true,
                hasVarX,
                hasVarY,
                hasVarZ
            };

            this.csAtomsList.push(newAtom);
            updateAtomsListHTML();
            buildAndRenderScene();
            saveCsState();
        };

        const updateAtomsListHTML = () => {
            const list = document.getElementById('cs-atoms-list');
            list.innerHTML = '';
            if (this.csAtomsList.length === 0) {
                list.innerHTML = '<div style="color:#64748b; font-size:0.7rem; text-align:center; padding-top:10px;">No atoms added.</div>';
                return;
            }

            this.csAtomsList.forEach(atom => {
                const item = document.createElement('div');
                item.style.cssText = 'display:flex; flex-direction:column; background:rgba(255,255,255,0.02); border:1px solid var(--border-glass); border-radius:4px; padding:6px; font-size:0.7rem; gap:4px;';
                
                const topRow = document.createElement('div');
                topRow.style.cssText = 'display:flex; justify-content:space-between; align-items:center; width:100%;';
                
                const label = document.createElement('span');
                label.style.fontWeight = 'bold';
                label.style.color = atom.props.c;
                label.textContent = `${atom.element} (${atom.multiplicity}${atom.wyckoffLetter})`;
                
                const deleteBtn = document.createElement('button');
                deleteBtn.style.cssText = 'background:transparent; border:none; color:var(--color-red); font-weight:bold; cursor:pointer; font-size:0.8rem; line-height: 1; margin-left: auto;';
                deleteBtn.textContent = '×';
                deleteBtn.onclick = () => {
                    this.csAtomsList = this.csAtomsList.filter(a => a.id !== atom.id);
                    updateAtomsListHTML();
                    buildAndRenderScene();
                    saveCsState();
                };
                
                topRow.appendChild(label);
                topRow.appendChild(deleteBtn);
                item.appendChild(topRow);

                if (atom.hasVarX || atom.hasVarY || atom.hasVarZ) {
                    const inputsRow = document.createElement('div');
                    inputsRow.style.cssText = 'display:flex; gap:8px; align-items:center; padding-top:4px; border-top:1px dashed rgba(255,255,255,0.04);';
                    
                    let xInp, yInp, zInp;
                    
                    const syncInputsAndModel = (changedCoord, valStr) => {
                        let val = parseFraction(valStr);
                        val = Math.max(0, Math.min(1, val));
                        if (!this.csSelectedSG) return;
                        const wp = this.csSelectedSG.wyckoff_positions.find(w => w.letter === atom.wyckoffLetter);
                        if (!wp) return;
                        const op = wp.operations[0];
                        const parts = op.split(',').map(p => p.trim());
                        
                        if (changedCoord === 'x') {
                            atom.x = val;
                            atom.baseCoords[0] = val;
                            if (parts[1] === 'x' || parts[1] === parts[0]) {
                                atom.y = val;
                                atom.baseCoords[1] = val;
                                if (yInp) yInp.value = val;
                            }
                            if (parts[2] === 'x' || parts[2] === parts[0]) {
                                atom.z = val;
                                atom.baseCoords[2] = val;
                                if (zInp) zInp.value = val;
                            }
                        } else if (changedCoord === 'y') {
                            atom.y = val;
                            atom.baseCoords[1] = val;
                            if (parts[0] === 'y' || parts[0] === parts[1]) {
                                atom.x = val;
                                atom.baseCoords[0] = val;
                                if (xInp) xInp.value = val;
                            }
                            if (parts[2] === 'y' || parts[2] === parts[1]) {
                                atom.z = val;
                                atom.baseCoords[2] = val;
                                if (zInp) zInp.value = val;
                            }
                        } else if (changedCoord === 'z') {
                            atom.z = val;
                            atom.baseCoords[2] = val;
                            if (parts[0] === 'z' || parts[0] === parts[2]) {
                                atom.x = val;
                                atom.baseCoords[0] = val;
                                if (xInp) xInp.value = val;
                            }
                            if (parts[1] === 'z' || parts[1] === parts[2]) {
                                atom.y = val;
                                atom.baseCoords[1] = val;
                                if (yInp) yInp.value = val;
                            }
                        }
                        
                        buildAndRenderScene();
                        saveCsState();
                    };

                    if (atom.hasVarX) {
                        const wrap = document.createElement('div');
                        wrap.style.cssText = 'display:flex; align-items:center; gap:2px;';
                        wrap.innerHTML = '<span style="color:#64748b; font-size:0.6rem;">x:</span>';
                        xInp = document.createElement('input');
                        xInp.type = 'number';
                        xInp.step = '0.01';
                        xInp.min = '0';
                        xInp.max = '1';
                        xInp.value = atom.x;
                        xInp.style.cssText = 'width:55px; background:rgba(15,23,42,0.8); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:1px 2px; text-align:center; font-size:0.65rem; font-family:var(--font-mono); height:18px; outline:none;';
                        xInp.oninput = (e) => syncInputsAndModel('x', e.target.value);
                        wrap.appendChild(xInp);
                        inputsRow.appendChild(wrap);
                    }
                    if (atom.hasVarY) {
                        const wrap = document.createElement('div');
                        wrap.style.cssText = 'display:flex; align-items:center; gap:2px;';
                        wrap.innerHTML = '<span style="color:#64748b; font-size:0.6rem;">y:</span>';
                        yInp = document.createElement('input');
                        yInp.type = 'number';
                        yInp.step = '0.01';
                        yInp.min = '0';
                        yInp.max = '1';
                        yInp.value = atom.y;
                        yInp.style.cssText = 'width:55px; background:rgba(15,23,42,0.8); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:1px 2px; text-align:center; font-size:0.65rem; font-family:var(--font-mono); height:18px; outline:none;';
                        yInp.oninput = (e) => syncInputsAndModel('y', e.target.value);
                        wrap.appendChild(yInp);
                        inputsRow.appendChild(wrap);
                    }
                    if (atom.hasVarZ) {
                        const wrap = document.createElement('div');
                        wrap.style.cssText = 'display:flex; align-items:center; gap:2px;';
                        wrap.innerHTML = '<span style="color:#64748b; font-size:0.6rem;">z:</span>';
                        zInp = document.createElement('input');
                        zInp.type = 'number';
                        zInp.step = '0.01';
                        zInp.min = '0';
                        zInp.max = '1';
                        zInp.value = atom.z;
                        zInp.style.cssText = 'width:55px; background:rgba(15,23,42,0.8); color:#fff; border:1px solid var(--border-glass); border-radius:3px; padding:1px 2px; text-align:center; font-size:0.65rem; font-family:var(--font-mono); height:18px; outline:none;';
                        zInp.oninput = (e) => syncInputsAndModel('z', e.target.value);
                        wrap.appendChild(zInp);
                        inputsRow.appendChild(wrap);
                    }
                    item.appendChild(inputsRow);
                }
                list.appendChild(item);
            });
        };

        document.getElementById('cs-btn-clear').onclick = () => {
            this.csAtomsList = [];
            updateAtomsListHTML();
            buildAndRenderScene();
        };

        document.getElementById('cs-btn-recenter').onclick = () => {
            buildAndRenderScene(true);
        };

        document.getElementById('cs-btn-snap').onclick = () => {
            if (!this.csRenderer) return;
            const formula = getFormula();
            const dataUrl = this.csRenderer.domElement.toDataURL("image/png");
            const link = document.createElement('a');
            link.download = `${formula || 'crystal'}_scoring_sg${this.csSelectedSG ? this.csSelectedSG.space_group_number : 'unknown'}.png`;
            link.href = dataUrl;
            link.click();
        };

        document.getElementById('cs-bg-dark').onclick = () => {
            document.getElementById('cs-bg-dark').classList.add('active');
            document.getElementById('cs-bg-light').classList.remove('active');
            this.csRenderer.setClearColor(0x000000, 0);
            this.csState.bgMode = "dark";
            buildAndRenderScene();
        };
        document.getElementById('cs-bg-light').onclick = () => {
            document.getElementById('cs-bg-dark').classList.remove('active');
            document.getElementById('cs-bg-light').classList.add('active');
            this.csRenderer.setClearColor(0xffffff, 0.9);
            this.csState.bgMode = "light";
            buildAndRenderScene();
        };

        const getFormula = () => {
            if (this.csAtomsList.length === 0) return 'Empty';
            const counts = {};
            this.csAtomsList.forEach(a => {
                counts[a.element] = (counts[a.element] || 0) + a.multiplicity;
            });
            return Object.keys(counts).map(k => `${k}${counts[k] > 1 ? counts[k] : ''}`).join('');
        };

        // CIF Export
        document.getElementById('cs-btn-export-cif').onclick = () => {
            if (!this.csSelectedSG) return;
            const a = document.getElementById('cs-lat-a').value;
            const b = document.getElementById('cs-lat-b').value;
            const c = document.getElementById('cs-lat-c').value;
            const formula = getFormula();

            let cif = `data_${formula}\n`;
            cif += `_chemical_formula_sum             '${formula}'\n\n`;
            cif += `_cell_length_a                    ${parseFloat(a).toFixed(4)}\n`;
            cif += `_cell_length_b                    ${parseFloat(b).toFixed(4)}\n`;
            cif += `_cell_length_c                    ${parseFloat(c).toFixed(4)}\n`;
            cif += `_cell_angle_alpha                 ${parseFloat(document.getElementById('cs-lat-alpha').value).toFixed(4)}\n`;
            cif += `_cell_angle_beta                  ${parseFloat(document.getElementById('cs-lat-beta').value).toFixed(4)}\n`;
            cif += `_cell_angle_gamma                 ${parseFloat(document.getElementById('cs-lat-gamma').value).toFixed(4)}\n\n`;
            cif += `_symmetry_space_group_name_H-M   '${this.csSelectedSG.space_group_symbol}'\n`;
            cif += `_symmetry_Int_Tables_number       ${this.csSelectedSG.space_group_number}\n\n`;

            const generalWP = this.csSelectedSG.wyckoff_positions.reduce((p, c) => (p.multiplicity > c.multiplicity) ? p : c);
            cif += "loop_\n_space_group_symop_id\n_space_group_symop_operation_xyz\n";
            generalWP.operations.forEach((op, idx) => {
                cif += `${idx + 1} '${op}'\n`;
            });
            cif += "\n";

            cif += "loop_\n_atom_site_label\n_atom_site_type_symbol\n_atom_site_fract_x\n_atom_site_fract_y\n_atom_site_fract_z\n";
            this.csAtomsList.forEach((atom, idx) => {
                cif += `${atom.element}${idx + 1} ${atom.element} ${atom.baseCoords[0].toFixed(5)} ${atom.baseCoords[1].toFixed(5)} ${atom.baseCoords[2].toFixed(5)}\n`;
            });

            const blob = new Blob([cif], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${formula}_sg${this.csSelectedSG.space_group_number}.cif`;
            link.click();
        };

        // Render visual Scene & compute GMM z-scores / structure score in real-time
        const buildAndRenderScene = (resetCam = false) => {
            const clearGroup = (g) => {
                while (g.children.length > 0) {
                    const obj = g.children[0];
                    g.remove(obj);
                    if (obj.geometry) obj.geometry.dispose();
                    if (obj.material) {
                        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
                        else obj.material.dispose();
                    }
                }
            };
            clearGroup(cellGroup);
            clearGroup(atomsGroup);
            clearGroup(bondsGroup);

            const a = parseFloat(document.getElementById('cs-lat-a').value) || 5;
            const b = parseFloat(document.getElementById('cs-lat-b').value) || 5;
            const c = parseFloat(document.getElementById('cs-lat-c').value) || 5;
            const alpha = parseFloat(document.getElementById('cs-lat-alpha').value) || 90;
            const beta = parseFloat(document.getElementById('cs-lat-beta').value) || 90;
            const gamma = parseFloat(document.getElementById('cs-lat-gamma').value) || 90;

            const scX = parseInt(document.getElementById('cs-sc-x').value) || 1;
            const scY = parseInt(document.getElementById('cs-sc-y').value) || 1;
            const scZ = parseInt(document.getElementById('cs-sc-z').value) || 1;

            const radiusScale = parseFloat(document.getElementById('cs-atom-scale').value) || 0.3;
            const drawBonds = document.getElementById('cs-toggle-bonds').checked;
            const bondTol = parseFloat(document.getElementById('cs-bond-tolerance').value) || 1.2;

            const baseMetrics = getCartesian(0, 0, 0, a, b, c, alpha, beta, gamma);
            document.getElementById('cs-hud-volume').innerText = `Vol: ${baseMetrics.V.toFixed(1)} Å³`;
            document.getElementById('cs-hud-formula').innerText = `Formula: ${getFormula()}`;

            const drawUnitCellBox = (offsetVec, isPrimary = true) => {
                const frac = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]];
                const corners = frac.map(f => getCartesian(f[0], f[1], f[2], a, b, c, alpha, beta, gamma).vec.add(offsetVec));

                const edges = [[0, 1], [0, 2], [0, 4], [1, 3], [1, 5], [2, 3], [2, 6], [4, 5], [4, 6], [3, 7], [5, 7], [6, 7]];
                const lineMat = new THREE.LineBasicMaterial({
                    color: isPrimary ? 0x00f5d4 : 0x334155,
                    transparent: true,
                    opacity: isPrimary ? 0.8 : 0.25
                });

                edges.forEach(idx => {
                    const geometry = new THREE.BufferGeometry().setFromPoints([corners[idx[0]], corners[idx[1]]]);
                    cellGroup.add(new THREE.Line(geometry, lineMat));
                });
            };

            for (let i = 0; i < scX; i++) {
                for (let j = 0; j < scY; j++) {
                    for (let k = 0; k < scZ; k++) {
                        const offset = new THREE.Vector3()
                            .addScaledVector(baseMetrics.vA, i)
                            .addScaledVector(baseMetrics.vB, j)
                            .addScaledVector(baseMetrics.vC, k);
                        drawUnitCellBox(offset, i === 0 && j === 0 && k === 0);
                    }
                }
            }

            let generatedAtoms = [];
            const unitCellAtoms = [];

            this.csAtomsList.forEach(atomData => {
                const wpInfo = this.csSelectedSG.wyckoff_positions.find(w => w.letter === atomData.wyckoffLetter);
                if (!wpInfo) return;

                let uniqueFrac = [];
                wpInfo.operations.forEach(opStr => {
                    let f = evalWyckoffOperation(opStr, atomData.x, atomData.y, atomData.z);
                    if (!uniqueFrac.some(uc => Math.abs(uc[0] - f[0]) < 1e-3 && Math.abs(uc[1] - f[1]) < 1e-3 && Math.abs(uc[2] - f[2]) < 1e-3)) {
                        uniqueFrac.push(f);
                    }
                });

                uniqueFrac.forEach(f => {
                    let dx = [0]; if (Math.abs(f[0]) < 1e-4) dx.push(1);
                    let dy = [0]; if (Math.abs(f[1]) < 1e-4) dy.push(1);
                    let dz = [0]; if (Math.abs(f[2]) < 1e-4) dz.push(1);
                    dx.forEach(x => dy.forEach(y => dz.forEach(z => {
                        unitCellAtoms.push({ f: [f[0] + x, f[1] + y, f[2] + z], data: atomData });
                    })));
                });
            });

            for (let i = 0; i < scX; i++) {
                for (let j = 0; j < scY; j++) {
                    for (let k = 0; k < scZ; k++) {
                        unitCellAtoms.forEach(uAt => {
                            if ((Math.abs(uAt.f[0] - 1) < 1e-4 && i !== scX - 1) ||
                                (Math.abs(uAt.f[1] - 1) < 1e-4 && j !== scY - 1) ||
                                (Math.abs(uAt.f[2] - 1) < 1e-4 && k !== scZ - 1)) return;

                            const cart = getCartesian(uAt.f[0], uAt.f[1], uAt.f[2], a, b, c, alpha, beta, gamma);
                            const offsetCart = new THREE.Vector3()
                                .addScaledVector(baseMetrics.vA, i)
                                .addScaledVector(baseMetrics.vB, j)
                                .addScaledVector(baseMetrics.vC, k)
                                .add(cart.vec);

                            const r = (uAt.data.props.r || 1.2) * radiusScale;
                            const mat = getCachedMaterial(uAt.data.props.c);
                            const mesh = new THREE.Mesh(sphereGeom, mat);

                            mesh.scale.set(r, r, r);
                            mesh.position.copy(offsetCart);
                            mesh.castShadow = true;
                            mesh.receiveShadow = true;

                            mesh.userData = {
                                element: uAt.data.element,
                                wyckoff: uAt.data.wyckoffLetter,
                                fx: uAt.f[0] + i, fy: uAt.f[1] + j, fz: uAt.f[2] + k,
                                cx: offsetCart.x, cy: offsetCart.y, cz: offsetCart.z
                            };

                            atomsGroup.add(mesh);
                            
                            generatedAtoms.push({
                                vec: offsetCart,
                                r: uAt.data.props.r || 1.2,
                                c: uAt.data.props.c,
                                el: uAt.data.element
                            });
                        });
                    }
                }
            }

            // Draw Cylindrical Bonds with dynamic health-coloring based on CSD z-score
            if (drawBonds && generatedAtoms.length < 1500) {
                for (let i = 0; i < generatedAtoms.length; i++) {
                    for (let j = i + 1; j < generatedAtoms.length; j++) {
                        const dist = generatedAtoms[i].vec.distanceTo(generatedAtoms[j].vec);
                        const rSum = generatedAtoms[i].r + generatedAtoms[j].r;

                        if (dist > 0.4 && dist <= rSum * bondTol) {
                            const elA = generatedAtoms[i].el;
                            const elB = generatedAtoms[j].el;
                            const col = bondHealthColor(dist, elA, elB);
                            const mat = getCachedMaterial(col);

                            const direction = new THREE.Vector3().subVectors(generatedAtoms[j].vec, generatedAtoms[i].vec);
                            const length = direction.length();
                            const center = new THREE.Vector3().addVectors(generatedAtoms[i].vec, generatedAtoms[j].vec).multiplyScalar(0.5);

                            const cylGeom = new THREE.CylinderGeometry(0.06, 0.06, length, 6);
                            const cylinder = new THREE.Mesh(cylGeom, mat);
                            cylinder.position.copy(center);
                            cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
                            cylinder.castShadow = true;
                            bondsGroup.add(cylinder);
                        }
                    }
                }
            }

            // Compute pairwise distances for HUD, optimal green % and Unified Score table
            const rows = [];
            const CUTOFF = 6.0;
            
            for (let i = 0; i < generatedAtoms.length; i++) {
                for (let j = i + 1; j < generatedAtoms.length; j++) {
                    const dist = generatedAtoms[i].vec.distanceTo(generatedAtoms[j].vec);
                    if (dist > 0.1 && dist < CUTOFF) {
                        const elA = generatedAtoms[i].el;
                        const elB = generatedAtoms[j].el;
                        const key = [elA, elB].sort().join('-');
                        const dmin = getDmin(elA, elB);
                        const dpeak = getDpeak(elA, elB);
                        const status = bondHealthStatus(dist, elA, elB);
                        
                        rows.push({
                            pair: `${elA}–${elB}`,
                            d: dist,
                            dmin,
                            dpeak,
                            status,
                            key
                        });
                    }
                }
            }

            rows.sort((r1, r2) => r1.d - r2.d);

            // Populate scoring table HTML
            const tbody = document.getElementById('cs-dist-tbody');
            if (tbody) {
                if (rows.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#64748b; padding: 25px 0;">No bonds within 6.0 Å.</td></tr>';
                } else {
                    const topRows = rows.slice(0, 40);
                    tbody.innerHTML = topRows.map(r => `
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">
                            <td style="padding: 5px 2px; font-weight:bold; color:#fff;">${r.pair}</td>
                            <td style="padding: 5px 2px; font-family:var(--font-mono); color:var(--accent-blue);">${r.d.toFixed(3)}</td>
                            <td style="padding: 5px 2px; font-family:var(--font-mono); color:#64748b;">${r.dmin.toFixed(2)}</td>
                            <td style="padding: 5px 2px; font-family:var(--font-mono); color:#64748b;">${r.dpeak.toFixed(2)}</td>
                            <td style="padding: 5px 2px; text-align:center; font-size:0.95rem;">${r.status}</td>
                        </tr>
                    `).join('');
                }
            }

            const countEl = document.getElementById('cs-pairs-count');
            if (countEl) {
                countEl.textContent = `${rows.length} bond${rows.length === 1 ? '' : 's'}`;
            }

            // Compute Log-Sum-Exp Unified score
            let qualScore = 0;
            let weightSum = 0;
            const typeDists = {};
            rows.forEach(r => {
                if (!typeDists[r.key]) typeDists[r.key] = [];
                typeDists[r.key].push(r.d);
            });

            Object.keys(typeDists).forEach(key => {
                const dists = typeDists[key];
                const [elA, elB] = key.split('-');
                const uScores = dists.map(d => _pairScoreUnified(d, elA, elB));
                const w = getPairWeight(elA, elB);
                qualScore += w * logSumExp(uScores);
                weightSum += w;
            });

            // Compute forbidden zone penalty: P_forbidden = sum_k sum_{i,j d < dmin} K * (dmin - d)^2 / dmin^2
            let forbiddenPenalty = 0;
            const K_FORBID = 1000000;
            rows.forEach(r => {
                if (r.d < r.dmin) {
                    const vio = r.dmin - r.d;
                    forbiddenPenalty += K_FORBID * (vio * vio) / (r.dmin * r.dmin);
                }
            });

            const normScore = (weightSum > 0 ? qualScore / weightSum : 0) - forbiddenPenalty;
            const scoreEl = document.getElementById('cs-score-val');
            if (scoreEl) {
                if (this.csAtomsList.length === 0) {
                    scoreEl.textContent = '-0.000';
                    scoreEl.style.color = '#64748b';
                } else {
                    scoreEl.textContent = normScore.toFixed(3);
                    if (normScore >= 1.0) {
                        scoreEl.style.color = '#22c55e'; // Green
                    } else if (normScore >= 0.0) {
                        scoreEl.style.color = '#eab308'; // Yellow
                    } else {
                        scoreEl.style.color = '#ef4444'; // Red
                    }
                }
            }

            const optFractionEl = document.getElementById('cs-optimal-fraction');
            if (optFractionEl) {
                if (rows.length === 0) {
                    optFractionEl.textContent = '🟢 0% of bonds are within equilibrium (1σ)';
                } else {
                    const optimalCount = rows.filter(r => r.status === '🟢').length;
                    const pct = (optimalCount / rows.length) * 100;
                    optFractionEl.innerHTML = `🟢 <strong style="color:#22c55e;">${pct.toFixed(0)}%</strong> of bonds are optimal (1σ)`;
                }
            }

            // Target Camera Focus Point
            const targetPoint = new THREE.Vector3()
                .addScaledVector(baseMetrics.vA, scX / 2)
                .addScaledVector(baseMetrics.vB, scY / 2)
                .addScaledVector(baseMetrics.vC, scZ / 2);

            this.csControls.target.copy(targetPoint);
            if (resetCam) {
                const dim = Math.max(a * scX, b * scY, c * scZ);
                this.csCamera.position.set(targetPoint.x + dim * 1.3, targetPoint.y + dim * 0.9, targetPoint.z + dim * 1.6);
            }
        };

        const populateSgDropdown = () => {
            sgSelect.innerHTML = '';
            Object.keys(this.csSpaceGroupsData).forEach(num => {
                const opt = document.createElement('option');
                opt.value = num;
                opt.textContent = `${num} - ${this.csSpaceGroupsData[num].space_group_symbol}`;
                if (num === this.csState.sgNum) opt.selected = true;
                sgSelect.appendChild(opt);
            });
            handleSgChange();

            // Restore all state inputs to DOM elements
            document.getElementById('cs-lat-a').value = this.csState.latA;
            document.getElementById('cs-lat-b').value = this.csState.latB;
            document.getElementById('cs-lat-c').value = this.csState.latC;
            document.getElementById('cs-lat-alpha').value = this.csState.latAlpha;
            document.getElementById('cs-lat-beta').value = this.csState.latBeta;
            document.getElementById('cs-lat-gamma').value = this.csState.latGamma;

            document.getElementById('cs-sc-x').value = this.csState.scX;
            document.getElementById('cs-sc-y').value = this.csState.scY;
            document.getElementById('cs-sc-z').value = this.csState.scZ;

            document.getElementById('cs-atom-scale').value = this.csState.atomRadius;
            document.getElementById('cs-scale-val').textContent = parseFloat(this.csState.atomRadius).toFixed(2);

            document.getElementById('cs-toggle-bonds').checked = this.csState.drawBonds;
            const bondSettings = document.getElementById('cs-bond-settings');
            if (this.csState.drawBonds) {
                bondSettings.style.opacity = '1';
                bondSettings.style.pointerEvents = 'auto';
            } else {
                bondSettings.style.opacity = '0.4';
                bondSettings.style.pointerEvents = 'none';
            }

            document.getElementById('cs-bond-tolerance').value = this.csState.bondTolerance;
            document.getElementById('cs-bond-tol-val').textContent = parseFloat(this.csState.bondTolerance).toFixed(1) + 'x';

            document.getElementById('cs-atom-el').value = this.csState.atomEl;

            if (this.csState.wyckoffLetter) {
                wyckoffSelect.value = this.csState.wyckoffLetter;
                handleWyckoffSiteChange();
            }

            document.getElementById('cs-atom-x').value = this.csState.atomX;
            document.getElementById('cs-atom-y').value = this.csState.atomY;
            document.getElementById('cs-atom-z').value = this.csState.atomZ;

            // Restore active tab
            tabs.forEach(t => {
                t.classList.remove('active');
                t.style.color = '#64748b';
                if (t.getAttribute('data-target') === this.csState.activeTab) {
                    t.classList.add('active');
                    t.style.color = 'var(--accent-mint)';
                }
            });
            document.querySelectorAll('.cs-tab-content').forEach(content => {
                content.style.display = 'none';
                if (content.id === this.csState.activeTab) {
                    content.style.display = 'flex';
                }
            });

            // Restore background mode active classes
            if (this.csState.bgMode === 'light') {
                document.getElementById('cs-bg-dark').classList.remove('active');
                document.getElementById('cs-bg-light').classList.add('active');
                this.csRenderer.setClearColor(0xffffff, 0.9);
            } else {
                document.getElementById('cs-bg-dark').classList.add('active');
                document.getElementById('cs-bg-light').classList.remove('active');
                this.csRenderer.setClearColor(0x000000, 0);
            }

            updateAtomsListHTML();
            buildAndRenderScene();
        };

        const loadPairs = () => {
            if (this.csPairsData) {
                loader.style.display = 'none';
                populateSgDropdown();
            } else {
                fetch('data/pairs.json')
                    .then(res => {
                        if (!res.ok) throw new Error("HTTP " + res.status);
                        return res.json();
                    })
                    .then(data => {
                        this.csPairsData = {};
                        for (const [rawKey, val] of Object.entries(data)) {
                            const parts = rawKey.split('-');
                            const key = parts.sort().join('-');
                            this.csPairsData[key] = val;
                        }
                        loader.style.display = 'none';
                        populateSgDropdown();
                    })
                    .catch(err => {
                        console.warn("Pairs database fetch failed, using covalent fallback:", err);
                        loader.style.display = 'none';
                        populateSgDropdown();
                    });
            }
        };

        // Nested loading sequence (SpaceGroups -> Pairs -> Populate UI)
        if (this.csSpaceGroupsData) {
            loadPairs();
        } else {
            if (this.cbSpaceGroupsData) {
                this.csSpaceGroupsData = this.cbSpaceGroupsData;
                loadPairs();
            } else {
                fetch('data/all_wyckoff_positions.json')
                    .then(res => {
                        if (!res.ok) throw new Error("HTTP " + res.status);
                        return res.json();
                    })
                    .then(data => {
                        this.cbSpaceGroupsData = data;
                        this.csSpaceGroupsData = data;
                        loadPairs();
                    })
                    .catch(err => {
                        console.error("Failed to load Wyckoff database:", err);
                        loader.style.display = 'none';
                    });
            }
        }

        // Animation Loop
        const animate = () => {
            if (!this.csRenderer) return;
            this.csAnimationFrameId = requestAnimationFrame(animate);
            this.csControls.update();
            this.csRenderer.render(this.csScene, this.csCamera);
        };
        animate();
    },

    // SIM-1 — Crystal Self-Assembly (Title Slide)
    initTitleCrystalAnimation() {
        const canvas = document.getElementById('title-crystal-bg');
        if (!canvas) return;

        // --- Scene setup ---
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
        camera.position.set(8, 6, 10);
        camera.lookAt(0, 0, 0);

        // Ambient + directional lighting matching the dark theme
        scene.add(new THREE.AmbientLight(0x334466, 1.2));
        const dirLight = new THREE.DirectionalLight(0x00f5d4, 0.8); // accent-mint color
        dirLight.position.set(5, 10, 7);
        scene.add(dirLight);

        // --- Geometry: 2×2×2 diamond-cubic FCC Si supercell ---
        // Diamond cubic = FCC lattice + basis at (0,0,0) and (0.25,0.25,0.25)
        const a = 2.8; // scaled down for visual clarity
        const basis = [[0,0,0],[0.5,0.5,0],[0.5,0,0.5],[0,0.5,0.5],
                       [0.25,0.25,0.25],[0.75,0.75,0.25],[0.75,0.25,0.75],[0.25,0.75,0.75]];
        const atomPositions = [];
        for (let ix=0; ix<2; ix++) for (let iy=0; iy<2; iy++) for (let iz=0; iz<2; iz++) {
            basis.forEach(([bx,by,bz]) => {
                atomPositions.push(new THREE.Vector3(
                    (ix+bx)*a - a, (iy+by)*a - a, (iz+bz)*a - a
                ));
            });
        }

        // Accent colours: mix of accent-mint (#00f5d4) and accent-blue (#00bbf9)
        const atomGeo = new THREE.SphereGeometry(0.22, 20, 20);
        const atomMats = [
            new THREE.MeshStandardMaterial({ color: 0x00f5d4, roughness: 0.3, metalness: 0.4 }),
            new THREE.MeshStandardMaterial({ color: 0x00bbf9, roughness: 0.3, metalness: 0.4 }),
        ];
        const atomMeshes = atomPositions.map((pos, i) => {
            const mesh = new THREE.Mesh(atomGeo, atomMats[i % 2]);
            mesh.position.copy(pos);
            mesh.material = mesh.material.clone();
            mesh.material.transparent = true;
            mesh.material.opacity = 0;
            scene.add(mesh);
            return mesh;
        });

        // Build bond list (pairs closer than 1.05*a*sqrt(3)/4 ≈ bond length)
        const BOND_CUTOFF = a * 0.95;
        const bondPairs = [];
        for (let i=0; i<atomPositions.length; i++) {
            for (let j=i+1; j<atomPositions.length; j++) {
                if (atomPositions[i].distanceTo(atomPositions[j]) < BOND_CUTOFF) {
                    bondPairs.push([i, j]);
                }
            }
        }

        // Bond meshes (cylinder between each pair)
        const bondMeshes = bondPairs.map(([i, j]) => {
            const pA = atomPositions[i], pB = atomPositions[j];
            const mid = pA.clone().add(pB).multiplyScalar(0.5);
            const dir = pB.clone().sub(pA);
            const len = dir.length();
            const cyl = new THREE.CylinderGeometry(0.05, 0.05, len, 8);
            const mat = new THREE.MeshStandardMaterial({
                color: 0x334477, transparent: true, opacity: 0, roughness: 0.5
            });
            const mesh = new THREE.Mesh(cyl, mat);
            mesh.position.copy(mid);
            mesh.quaternion.setFromUnitVectors(
                new THREE.Vector3(0, 1, 0), dir.normalize()
            );
            scene.add(mesh);
            return mesh;
        });

        // --- Animation state machine ---
        const PHASE1_DURATION = 4000;  // ms: total time for all atoms to appear
        const PHASE2_DURATION = 2000;  // ms: total time for all bonds to appear
        const PHASE3_DURATION = 6000;  // ms: rotation before reset

        let startTime = performance.now();
        let phase = 1;

        const animate = (now) => {
            this.titleBgAnimFrameId = requestAnimationFrame(animate);
            const elapsed = now - startTime;

            if (phase === 1) {
                // Stagger atom opacity: atom i appears at time = i / N * PHASE1_DURATION
                const N = atomMeshes.length;
                atomMeshes.forEach((mesh, i) => {
                    const startAt = (i / N) * PHASE1_DURATION;
                    const t = Math.max(0, Math.min(1, (elapsed - startAt) / 400));
                    mesh.material.opacity = t * 0.92;
                });
                if (elapsed > PHASE1_DURATION) { phase = 2; startTime = now; }

            } else if (phase === 2) {
                const N = bondMeshes.length;
                bondMeshes.forEach((mesh, i) => {
                    const startAt = (i / N) * PHASE2_DURATION;
                    const t = Math.max(0, Math.min(1, (elapsed - startAt) / 200));
                    mesh.material.opacity = t * 0.7;
                });
                if (elapsed > PHASE2_DURATION) { phase = 3; startTime = now; }

            } else if (phase === 3) {
                // Slow rotation
                scene.rotation.y += 0.003;
                if (elapsed > PHASE3_DURATION) {
                    // Reset for next cycle
                    atomMeshes.forEach(m => { m.material.opacity = 0; });
                    bondMeshes.forEach(m => { m.material.opacity = 0; });
                    scene.rotation.y = 0;
                    phase = 1; startTime = now;
                }
            }

            renderer.render(scene, camera);
        };

        this.titleBgAnimFrameId = requestAnimationFrame(animate);

        // Resize handler
        const onResize = () => {
            const w = canvas.clientWidth, h = canvas.clientHeight;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', onResize);

        // Store cleanup refs
        this.titleBgRenderer = renderer;
        this.titleBgCleanup = () => {
            cancelAnimationFrame(this.titleBgAnimFrameId);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
        };
    },

    // SIM-2 — Wyckoff Symmetry Burst (Space Groups)
    initWyckoffBurstWidget() {
        const canvas = document.getElementById('widget-wyckoff-burst');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const DPR = window.devicePixelRatio || 1;
        canvas.width = 220 * DPR;
        canvas.height = 200 * DPR;
        canvas.style.width = '220px';
        canvas.style.height = '200px';
        ctx.scale(DPR, DPR);

        const scenarios = [
            {
                label: 'General position (8×)',
                seed: [0.2, 0.15],
                copies: [[0.2,0.15],[0.8,0.15],[0.2,0.85],[0.8,0.85],
                         [0.15,0.2],[0.15,0.8],[0.85,0.2],[0.85,0.8]],
                color: '#00f5d4'
            },
            {
                label: 'Edge midpoint (4×)',
                seed: [0.5, 0.18],
                copies: [[0.5,0.18],[0.5,0.82],[0.18,0.5],[0.82,0.5]],
                color: '#00bbf9'
            },
            {
                label: 'Corner (1×)',
                seed: [0.5, 0.5],
                copies: [[0.5,0.5]],
                color: '#9b5de5'
            }
        ];

        const SCENARIO_DURATION = 5500;
        const BURST_DELAY = 800;
        const BURST_FADE = 400;

        let scenarioIdx = 0;
        let scenarioStart = performance.now();

        const W = 220, H = 200;
        const PAD = 22;
        const cellX = (f) => PAD + f * (W - 2*PAD);
        const cellY = (f) => PAD + f * (H - 2*PAD - 22);

        const animate = (now) => {
            this.wyckoffAnimFrameId = requestAnimationFrame(animate);
            const elapsed = now - scenarioStart;

            if (elapsed > SCENARIO_DURATION) {
                scenarioIdx = (scenarioIdx + 1) % scenarios.length;
                scenarioStart = now;
            }

            const sc = scenarios[scenarioIdx];
            const t_elapsed = (now - scenarioStart);

            ctx.clearRect(0, 0, W, H);

            ctx.strokeStyle = 'rgba(100,116,139,0.5)';
            ctx.lineWidth = 1;
            ctx.strokeRect(PAD, PAD, W - 2*PAD, H - 2*PAD - 22);

            ctx.fillStyle = '#64748b';
            ctx.font = '10px JetBrains Mono, monospace';
            ctx.fillText('a', W - PAD - 6, H - PAD - 22 + 14);
            ctx.fillText('b', PAD + 4, PAD + 12);

            const sx = cellX(sc.seed[0]), sy = cellY(sc.seed[1]);
            ctx.beginPath();
            ctx.arc(sx, sy, 7, 0, Math.PI*2);
            ctx.fillStyle = sc.color;
            ctx.fill();

            if (t_elapsed < BURST_DELAY) {
                const ringR = 7 + (t_elapsed / BURST_DELAY) * 14;
                const ringOpacity = 1 - (t_elapsed / BURST_DELAY);
                ctx.beginPath();
                ctx.arc(sx, sy, ringR, 0, Math.PI*2);
                ctx.strokeStyle = `rgba(255,255,255,${ringOpacity * 0.7})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }

            if (t_elapsed > BURST_DELAY) {
                const fadeT = Math.min(1, (t_elapsed - BURST_DELAY) / BURST_FADE);
                sc.copies.forEach(([fx, fy], i) => {
                    if (i === 0) return;
                    const cx = cellX(fx), cy = cellY(fy);

                    const copyDelay = i * 40;
                    const copyT = Math.min(1, (t_elapsed - BURST_DELAY - copyDelay) / BURST_FADE);
                    if (copyT <= 0) return;

                    ctx.setLineDash([3, 3]);
                    ctx.strokeStyle = `rgba(100,116,139,${copyT * 0.5})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(cx, cy); ctx.stroke();
                    ctx.setLineDash([]);

                    ctx.beginPath();
                    ctx.arc(cx, cy, 7, 0, Math.PI*2);
                    ctx.fillStyle = sc.color;
                    ctx.globalAlpha = copyT * 0.85;
                    ctx.fill();
                    ctx.globalAlpha = 1;

                    if (copyT < 0.6) {
                        const ringR = 7 + copyT * 12;
                        ctx.beginPath();
                        ctx.arc(cx, cy, ringR, 0, Math.PI*2);
                        ctx.strokeStyle = `rgba(255,255,255,${(0.6-copyT)/0.6 * 0.6})`;
                        ctx.lineWidth = 1.2;
                        ctx.stroke();
                    }
                });
            }

            const shownCount = t_elapsed < BURST_DELAY ? 1
                : 1 + sc.copies.slice(1).filter((_,i) =>
                    (t_elapsed - BURST_DELAY - i*40) > 0).length;

            ctx.fillStyle = '#fff';
            ctx.font = 'bold 11px Outfit, sans-serif';
            ctx.fillText(sc.label, PAD, H - 6);

            ctx.fillStyle = sc.color;
            ctx.font = 'bold 13px JetBrains Mono, monospace';
            ctx.fillText(`${shownCount}× site`, W - PAD - 52, H - 6);
        };

        this.wyckoffAnimFrameId = requestAnimationFrame(animate);
    },

    // SIM-4 — Bond Zone Stretch & Color Cycle (Bond Zones)
    initBondZoneWidget() {
        const canvas = document.getElementById('widget-bond-zone');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const DPR = window.devicePixelRatio || 1;
        const offsetW = canvas.offsetWidth || 800;
        const offsetH = canvas.offsetHeight || 130;
        canvas.width  = offsetW * DPR;
        canvas.height = offsetH * DPR;
        ctx.scale(DPR, DPR);
        const W = offsetW, H = offsetH;

        const mu    = 1.62;
        const sigma = 0.045;
        const dMin  = 1.48;

        const zoneColor = (d) => {
            if (d < dMin)                           return { stroke:'#ef4444', fill:'rgba(239,68,68,0.15)', label:'Red — Forbidden' };
            const z = Math.abs((d - mu) / sigma);
            if (z <= 1.0) return { stroke:'#22c55e', fill:'rgba(34,197,94,0.15)',  label:'Green — Optimal (|z|≤1)' };
            if (z <= 2.0) return { stroke:'#eab308', fill:'rgba(234,179,8,0.15)',  label:'Yellow — Acceptable (|z|≤2)' };
            return              { stroke:'#f97316', fill:'rgba(249,115,22,0.15)', label:'Orange — Outlier (|z|>2)' };
        };

        const dLow  = dMin - 0.05;
        const dHigh = mu + 3.6 * sigma;
        const PERIOD = 4800;

        const animate = (now) => {
            this.bondZoneAnimFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, W, H);

            const tCycle = (now % PERIOD) / PERIOD;
            const dCurrent = dLow + (dHigh-dLow) * (0.5 - 0.5 * Math.cos(tCycle * Math.PI * 2));
            const zone = zoneColor(dCurrent);
            const zScore = (dCurrent - mu) / sigma;

            const GAUGE_TOP = 8;
            const GAUGE_H   = 22;
            const GAUGE_L   = 60;
            const GAUGE_R   = W - 60;
            const GAUGE_SPAN= GAUGE_R - GAUGE_L;

            const zMin = -4.5, zMax = 4.5;
            const gx = (z) => GAUGE_L + (z - zMin) / (zMax - zMin) * GAUGE_SPAN;

            const zDmin = (dMin - mu) / sigma;
            const gradBands = [
                [zMin,  zDmin, 'rgba(239,68,68,0.25)'],  // Red — Forbidden
                [zDmin, -2,    'rgba(249,115,22,0.25)'], // Orange — Outlier
                [-2,    -1,    'rgba(234,179,8,0.25)'],  // Yellow — Acceptable
                [-1,     1,    'rgba(34,197,94,0.25)'],  // Green — Optimal
                [1,      2,    'rgba(234,179,8,0.25)'],  // Yellow — Acceptable
                [2,     zMax,  'rgba(249,115,22,0.25)'], // Orange — Outlier
            ];
            gradBands.forEach(([z1, z2, col]) => {
                ctx.fillStyle = col;
                ctx.fillRect(gx(z1), GAUGE_TOP, gx(z2)-gx(z1), GAUGE_H);
            });

            ctx.strokeStyle = 'rgba(100,116,139,0.4)';
            ctx.lineWidth = 1;
            ctx.strokeRect(GAUGE_L, GAUGE_TOP, GAUGE_SPAN, GAUGE_H);

            ctx.fillStyle = '#64748b';
            ctx.font = '9px JetBrains Mono, monospace';
            [-4,-2,-1,0,1,2,4].forEach(z => {
                const gxz = gx(z);
                ctx.beginPath(); ctx.moveTo(gxz, GAUGE_TOP+GAUGE_H); ctx.lineTo(gxz, GAUGE_TOP+GAUGE_H+4); ctx.stroke();
                ctx.fillText(z, gxz-4, GAUGE_TOP+GAUGE_H+13);
            });
            ctx.fillText('z =', GAUGE_L - 36, GAUGE_TOP + GAUGE_H/2 + 4);

            const needleZ = Math.max(zMin, Math.min(zMax, zScore));
            const needleX = gx(needleZ);
            ctx.fillStyle = zone.stroke;
            ctx.beginPath();
            ctx.moveTo(needleX - 5, GAUGE_TOP);
            ctx.lineTo(needleX + 5, GAUGE_TOP);
            ctx.lineTo(needleX, GAUGE_TOP + GAUGE_H);
            ctx.closePath();
            ctx.fill();

            const zLabel = `z = ${zScore >= 0 ? '+' : ''}${zScore.toFixed(2)}`;
            ctx.fillStyle = zone.stroke;
            ctx.font = 'bold 10px JetBrains Mono, monospace';
            ctx.fillText(zLabel, needleX + 8, GAUGE_TOP + 14);

            const BOND_Y     = H - 34;
            const CENTER_X   = W / 2;
            const SCALE      = 120;
            const halfSep    = (dCurrent / 2) * SCALE;
            const ATOM_R     = 18;

            ctx.fillStyle = zone.fill;
            ctx.fillRect(CENTER_X - halfSep + ATOM_R, BOND_Y - 6, 2*(halfSep-ATOM_R), 12);

            ctx.fillStyle = zone.stroke;
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            const bondX1 = CENTER_X - halfSep + ATOM_R;
            const bondX2 = CENTER_X + halfSep - ATOM_R;
            if (ctx.roundRect) {
                ctx.roundRect(bondX1, BOND_Y - 4, bondX2 - bondX1, 8, 4);
            } else {
                ctx.rect(bondX1, BOND_Y - 4, bondX2 - bondX1, 8);
            }
            ctx.fill();
            ctx.globalAlpha = 1;

            [{label:'Si', x: CENTER_X - halfSep, color:'#9b5de5'},
             {label:'O',  x: CENTER_X + halfSep, color:'#f97316'}].forEach(({label, x, color}) => {
                ctx.beginPath();
                ctx.arc(x, BOND_Y, ATOM_R, 0, Math.PI*2);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 11px Outfit, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(label, x, BOND_Y + 4);
                ctx.textAlign = 'left';
            });

            ctx.fillStyle = '#94a3b8';
            ctx.font = '10px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`d = ${dCurrent.toFixed(3)} Å`, CENTER_X, BOND_Y + ATOM_R + 14);

            ctx.fillStyle = zone.stroke;
            ctx.font = 'bold 10px Outfit, sans-serif';
            ctx.fillText(zone.label, CENTER_X, H - 4);
            ctx.textAlign = 'left';
        };

        this.bondZoneAnimFrameId = requestAnimationFrame(animate);
    },

    // SIM-5 — Scoring Kernel Surfer (Kernels)
    initKernelSurferWidget() {
        const canvas = document.getElementById('widget-kernel-surf');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const DPR = window.devicePixelRatio || 1;
        const offsetW = canvas.offsetWidth || 380;
        const offsetH = canvas.offsetHeight || 180;
        canvas.width  = offsetW * DPR;
        canvas.height = offsetH * DPR;
        ctx.scale(DPR, DPR);
        const W = offsetW, H = offsetH;

        const A  = 4.0;
        const zb = 2.0;
        const Vb = A * Math.exp(-0.5 * zb * zb);
        const Sb = zb * A * Math.exp(-0.5 * zb * zb);

        const kernel = (z) => {
            if (z <= zb) return A * Math.exp(-0.5 * z * z);
            return Vb - Sb * (z - zb);
        };

        const zLow = -4.2, zHigh = 5.0;
        const N = 300;
        const zs = Array.from({length:N}, (_,i) => zLow + i * (zHigh-zLow)/(N-1));
        const ks = zs.map(kernel);
        const kMin = Math.min(...ks);
        const kMax = A;

        const PAD = { l:36, r:14, t:14, b:38 };
        const pW  = W - PAD.l - PAD.r;
        const pH  = H - PAD.t - PAD.b;

        const px = (z) => PAD.l + (z - zLow) / (zHigh - zLow) * pW;
        const py = (k) => PAD.t + pH - (k - kMin) / (kMax - kMin) * pH;

        const PERIOD = 5000;

        const animate = (now) => {
            this.kernelAnimFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, W, H);

            const tCycle = (now % PERIOD) / PERIOD;
            const zDot = zLow + (zHigh - zLow) * (0.5 - 0.5 * Math.cos(tCycle * Math.PI * 2));
            const kDot = kernel(zDot);

            const zDmin = -3.11;
            const zones = [
                [zLow,  zDmin, 'rgba(239,68,68,0.08)'],  // Red — Forbidden
                [zDmin, -2,    'rgba(249,115,22,0.08)'], // Orange — Outlier
                [-2,    -1,    'rgba(234,179,8,0.08)'],  // Yellow — Acceptable
                [-1,     1,    'rgba(34,197,94,0.1)'],   // Green — Optimal
                [1,      2,    'rgba(234,179,8,0.08)'],  // Yellow — Acceptable
                [2,    zHigh,  'rgba(249,115,22,0.08)'], // Orange — Outlier
            ];
            zones.forEach(([z1,z2,col]) => {
                ctx.fillStyle = col;
                ctx.fillRect(px(z1), PAD.t, px(z2)-px(z1), pH);
            });

            ctx.beginPath();
            let hasMoved = false;
            zs.forEach((z,i) => {
                const y = py(ks[i]);
                if (z > zb) return;
                if (!hasMoved) {
                    ctx.moveTo(px(z), y);
                    hasMoved = true;
                } else {
                    ctx.lineTo(px(z), y);
                }
            });
            const transIdx = zs.findIndex(z => z > zb);
            if (transIdx > 0) { ctx.lineTo(px(zb), py(kernel(zb))); }
            ctx.strokeStyle = '#00f5d4';
            ctx.lineWidth = 2.5;
            ctx.stroke();

            ctx.beginPath();
            let started = false;
            zs.forEach((z,i) => {
                if (z < zb) return;
                if (!started) { ctx.moveTo(px(z), py(ks[i])); started=true; }
                else ctx.lineTo(px(z), py(ks[i]));
            });
            ctx.strokeStyle = '#f97316';
            ctx.lineWidth = 2.5;
            ctx.stroke();

            ctx.setLineDash([4,4]);
            ctx.strokeStyle = 'rgba(100,116,139,0.6)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(px(zb), PAD.t);
            ctx.lineTo(px(zb), PAD.t + pH);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = '#64748b';
            ctx.font = '9px JetBrains Mono, monospace';
            ctx.fillText('z_b=2', px(zb)+3, PAD.t+11);

            const grd = ctx.createRadialGradient(px(zDot), py(kDot), 0, px(zDot), py(kDot), 14);
            grd.addColorStop(0, 'rgba(255,255,255,0.35)');
            grd.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(px(zDot), py(kDot), 14, 0, Math.PI*2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(px(zDot), py(kDot), 5, 0, Math.PI*2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();

            let annotText = '';
            let annotColor = '#ffffff';
            if (zDot < zDmin) {
                annotText = '← forbidden region';
                annotColor = '#ef4444';
            } else if (zDot < -2) {
                annotText = 'orange outlier';
                annotColor = '#f97316';
            } else if (Math.abs(zDot) <= 1) {
                annotText = '★ green reward peak';
                annotColor = '#00f5d4';
            } else if (Math.abs(zDot) <= 2) {
                annotText = 'yellow acceptable';
                annotColor = '#eab308';
            } else {
                annotText = 'linear attractor ↓';
                annotColor = '#f97316';
            }
            ctx.fillStyle = annotColor;
            ctx.font = 'bold 9.5px Outfit, sans-serif';
            const aX = Math.min(px(zDot)+10, W-90);
            ctx.fillText(annotText, aX, py(kDot)-10);

            ctx.strokeStyle = 'rgba(100,116,139,0.5)';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(PAD.l, PAD.t+pH); ctx.lineTo(PAD.l+pW, PAD.t+pH); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(PAD.l, PAD.t); ctx.lineTo(PAD.l, PAD.t+pH); ctx.stroke();

            ctx.fillStyle = '#64748b';
            ctx.font = '9px JetBrains Mono, monospace';
            [-4,-2,0,2,4].forEach(z => {
                ctx.fillText(z, px(z)-4, PAD.t+pH+12);
            });
            ctx.fillText('z', PAD.l+pW+2, PAD.t+pH+12);
            ctx.fillText('S(z)', PAD.l-28, PAD.t+9);

            ctx.fillStyle = '#94a3b8';
            ctx.font = '9px JetBrains Mono, monospace';
            ctx.fillText(`S = ${kDot.toFixed(3)}`, W-65, PAD.t+14);
        };

        this.kernelAnimFrameId = requestAnimationFrame(animate);
    },

    // SIM-7 — Lattice Breathing (Lattice Opt)
    initLatticeBreatheWidget() {
        const canvas = document.getElementById('widget-lattice-breathe');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const DPR = window.devicePixelRatio || 1;
        const offsetW = canvas.offsetWidth || 380;
        const offsetH = canvas.offsetHeight || 200;
        canvas.width  = offsetW * DPR;
        canvas.height = offsetH * DPR;
        ctx.scale(DPR, DPR);
        const W = offsetW, H = offsetH;

        const isoX = (x,y,z) => (x-z)*Math.cos(Math.PI/6);
        const isoY = (x,y,z) => (x+z)*Math.sin(Math.PI/6) - y;

        const CX = W * 0.40, CY = H * 0.58;

        const drawCell = (s, color, alpha) => {
            const pts3D = [
                [0,0,0],[1,0,0],[1,0,1],[0,0,1],
                [0,1,0],[1,1,0],[1,1,1],[0,1,1]
            ].map(([x,y,z]) => [x*s,y*s,z*s]);

            const proj = pts3D.map(([x,y,z]) => [
                CX + isoX(x,y,z)*55,
                CY - isoY(x,y,z)*55
            ]);

            const edges = [[0,1],[1,2],[2,3],[3,0],
                           [4,5],[5,6],[6,7],[7,4],
                           [0,4],[1,5],[2,6],[3,7]];
            ctx.strokeStyle = color;
            ctx.lineWidth   = 1.8;
            ctx.globalAlpha = alpha;
            edges.forEach(([a,b]) => {
                ctx.beginPath();
                ctx.moveTo(proj[a][0], proj[a][1]);
                ctx.lineTo(proj[b][0], proj[b][1]);
                ctx.stroke();
            });

            proj.forEach(([px,py]) => {
                ctx.beginPath();
                ctx.arc(px, py, 4, 0, Math.PI*2);
                ctx.fillStyle = color;
                ctx.fill();
            });
            ctx.globalAlpha = 1;
        };

        const scoreAt = (a_norm) => 4.0 * Math.exp(-3.0 * (a_norm-1.0)**2);

        const A_MIN = 0.60, A_MAX = 1.45, A_OPT = 1.00;
        const PERIOD = 5500;

        const GAUGE_L = W * 0.68;
        const GAUGE_W = W - GAUGE_L - 10;
        const GAUGE_T = 18, GAUGE_B = H - 32;
        const GAUGE_H = GAUGE_B - GAUGE_T;

        const gx = (a) => GAUGE_L + (a-A_MIN)/(A_MAX-A_MIN)*GAUGE_W;
        const gy = (sc) => GAUGE_B - (sc/4.0)*GAUGE_H;

        const animate = (now) => {
            this.breatheAnimFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, W, H);

            const tCycle = (now % PERIOD) / PERIOD;
            const a_norm = A_MIN + (A_MAX-A_MIN)*(0.5 - 0.5*Math.cos(tCycle*Math.PI*2));
            const score  = scoreAt(a_norm);

            const t = (score/4.0);
            const color = t > 0.85 ? '#22c55e' : (t > 0.45 ? '#eab308' : '#f97316');

            drawCell(a_norm, color, 0.9);

            const a_ang = (a_norm * 5.43).toFixed(2);
            ctx.fillStyle = color;
            ctx.font = 'bold 11px JetBrains Mono, monospace';
            ctx.fillText(`a = ${a_ang} Å`, 14, H - 10);
            ctx.fillStyle = '#64748b';
            ctx.font = '9px JetBrains Mono, monospace';
            ctx.fillText('Score:', 14, H - 26);
            ctx.fillStyle = color;
            ctx.fillText(score.toFixed(3), 55, H - 26);

            ctx.fillStyle = '#64748b';
            ctx.font = '9px Outfit, sans-serif';
            ctx.fillText('Bold-Driver optimization', 14, 14);

            ctx.fillStyle = 'rgba(15,23,42,0.4)';
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(GAUGE_L-4, GAUGE_T-8, GAUGE_W+14, GAUGE_H+20, 6);
            } else {
                ctx.rect(GAUGE_L-4, GAUGE_T-8, GAUGE_W+14, GAUGE_H+20);
            }
            ctx.fill();

            ctx.beginPath();
            const aVals = Array.from({length:50}, (_,i) => A_MIN + i*(A_MAX-A_MIN)/49);
            aVals.forEach((a,i) => {
                const sc = scoreAt(a);
                i===0 ? ctx.moveTo(gx(a), gy(sc)) : ctx.lineTo(gx(a), gy(sc));
            });
            ctx.strokeStyle = '#00f5d4';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.setLineDash([3,3]);
            ctx.strokeStyle = 'rgba(34,197,94,0.5)';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(gx(A_OPT), GAUGE_T); ctx.lineTo(gx(A_OPT), GAUGE_B); ctx.stroke();
            ctx.setLineDash([]);

            ctx.beginPath();
            ctx.arc(gx(a_norm), gy(score), 5, 0, Math.PI*2);
            ctx.fillStyle = color;
            ctx.fill();

            ctx.fillStyle = '#64748b';
            ctx.font = '8px JetBrains Mono, monospace';
            ctx.fillText('a', GAUGE_L + GAUGE_W/2 - 2, GAUGE_B + 12);
            ctx.fillText('S', GAUGE_L - 12, GAUGE_T + 4);
        };

        this.breatheAnimFrameId = requestAnimationFrame(animate);
    },

    // SIM-8 — Pipeline Phase Flow (Joint Pipeline)
    initPipelineFlowWidget() {
        const canvas = document.getElementById('widget-pipeline-flow');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const DPR = window.devicePixelRatio || 1;
        const offsetW = canvas.offsetWidth || 900;
        const offsetH = 68;
        canvas.width  = offsetW * DPR;
        canvas.height = offsetH * DPR;
        ctx.scale(DPR, DPR);
        const W = offsetW, H = offsetH;

        const phases = [
            { label:'1', sub:'GMM Seed',   color:'#9b5de5' },
            { label:'2', sub:'Axis Scan',  color:'#00bbf9' },
            { label:'3', sub:'Adam+Bold',  color:'#00f5d4' },
            { label:'4', sub:'Fine Pass',  color:'#eab308' },
            { label:'5', sub:'Verify',     color:'#22c55e' },
        ];
        const NODE_R = 18;
        const PAD_X  = 70;
        const STEP_X = (W - 2*PAD_X) / (phases.length-1);
        const NODE_Y  = H/2 - 4;

        const nodeX = (i) => PAD_X + i*STEP_X;

        const SEGMENT_DURATION = 900;
        const CONVERGE_HOLD    = 800;
        const TOTAL_SEGMENTS   = phases.length - 1;
        const CYCLE_DURATION   = SEGMENT_DURATION * TOTAL_SEGMENTS + CONVERGE_HOLD;

        const animate = (now) => {
            this.pipelineAnimFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, W, H);

            const tCycle = (now % CYCLE_DURATION);
            const isConverging = tCycle > SEGMENT_DURATION * TOTAL_SEGMENTS;

            const seg    = Math.min(Math.floor(tCycle / SEGMENT_DURATION), TOTAL_SEGMENTS-1);
            const segT   = (tCycle % SEGMENT_DURATION) / SEGMENT_DURATION;

            const particleX = isConverging
                ? nodeX(TOTAL_SEGMENTS)
                : nodeX(seg) + (nodeX(seg+1)-nodeX(seg))*segT;

            for (let i=0; i<phases.length-1; i++) {
                ctx.beginPath();
                ctx.moveTo(nodeX(i) + NODE_R, NODE_Y);
                ctx.lineTo(nodeX(i+1) - NODE_R, NODE_Y);
                const traveled = isConverging || i < seg || (i===seg && segT > 0.05);
                ctx.strokeStyle = traveled ? 'rgba(100,116,139,0.8)' : 'rgba(100,116,139,0.25)';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            phases.forEach((ph, i) => {
                const nx = nodeX(i);
                const isActive  = !isConverging && i === seg;
                const isDone    = isConverging || i < seg || (i===seg && segT > 0.8);

                if (isActive || (isConverging && i === TOTAL_SEGMENTS)) {
                    const glowColor = isConverging ? '#22c55e' : ph.color;
                    const grd = ctx.createRadialGradient(nx, NODE_Y, 0, nx, NODE_Y, NODE_R+10);
                    grd.addColorStop(0, glowColor + '60');
                    grd.addColorStop(1, glowColor + '00');
                    ctx.fillStyle = grd;
                    ctx.beginPath();
                    ctx.arc(nx, NODE_Y, NODE_R+10, 0, Math.PI*2);
                    ctx.fill();
                }

                ctx.beginPath();
                ctx.arc(nx, NODE_Y, NODE_R, 0, Math.PI*2);
                ctx.fillStyle = isDone || isConverging
                    ? ph.color
                    : 'rgba(15,23,42,0.8)';
                ctx.fill();
                ctx.strokeStyle = ph.color;
                ctx.lineWidth   = 2;
                ctx.stroke();

                ctx.fillStyle = isDone || isConverging ? '#000' : ph.color;
                ctx.font = `bold 13px Outfit, sans-serif`;
                ctx.textAlign = 'center';
                ctx.fillText(ph.label, nx, NODE_Y + 5);

                ctx.fillStyle = '#64748b';
                ctx.font = '8px Outfit, sans-serif';
                ctx.fillText(ph.sub, nx, NODE_Y + NODE_R + 11);
                ctx.textAlign = 'left';
            });

            if (!isConverging) {
                const pGrd = ctx.createRadialGradient(particleX, NODE_Y, 0, particleX, NODE_Y, 8);
                pGrd.addColorStop(0, 'rgba(255,255,255,0.9)');
                pGrd.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = pGrd;
                ctx.beginPath();
                ctx.arc(particleX, NODE_Y, 8, 0, Math.PI*2);
                ctx.fill();

                ctx.beginPath();
                ctx.arc(particleX, NODE_Y, 3, 0, Math.PI*2);
                ctx.fillStyle = '#fff';
                ctx.fill();
            } else {
                const pulse = 0.5 + 0.5*Math.sin((tCycle - SEGMENT_DURATION*TOTAL_SEGMENTS)/CONVERGE_HOLD * Math.PI * 3);
                ctx.fillStyle = `rgba(34,197,94,${pulse*0.3})`;
                ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = `rgba(34,197,94,${pulse*0.9})`;
                ctx.font = 'bold 12px Outfit, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('CONVERGED — restarting cycle', W/2, H - 6);
                ctx.textAlign = 'left';
            }

            for (let i=0; i<phases.length-1; i++) {
                const ax = nodeX(i)+NODE_R + (STEP_X-NODE_R*2)/2;
                ctx.fillStyle = 'rgba(100,116,139,0.5)';
                ctx.beginPath();
                ctx.moveTo(ax,   NODE_Y-4);
                ctx.lineTo(ax+7, NODE_Y);
                ctx.lineTo(ax,   NODE_Y+4);
                ctx.closePath();
                ctx.fill();
            }
        };

        this.pipelineAnimFrameId = requestAnimationFrame(animate);
    }
};
