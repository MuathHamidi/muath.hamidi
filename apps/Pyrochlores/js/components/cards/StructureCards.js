/* js/components/cards/StructureCards.js */
export function getLatticeCard() {
    return `
        <div class="card lattice-card" id="card-lattice">
            <div class="card-header">
                <h3>Lattice Parameter (Å)</h3>
                <div class="header-right">
                    <button class="expand-btn" data-target="card-lattice">⤢</button>
                </div>
            </div>
            <div class="panel-content">
                <div id="lattice-plot" style="width:100%; height:100%;">
                    <div class="empty-state-panel">
                        <button id="btn-scan-struct" class="viz-select" style="padding: 10px 20px;">
                            Scan CIFs for Structure Data
                        </button>
                        <br><br>
                        <span style="font-size:0.8em">Reads _cell_length_a from all files</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function getOxygenCard() {
    return `
        <div class="card oxygen-card" id="card-oxygen">
            <div class="card-header">
                <h3>Oxygen Position x (48f)</h3>
                <div class="header-right">
                    <button class="expand-btn" data-target="card-oxygen">⤢</button>
                </div>
            </div>
            <div class="panel-content">
                <div id="oxygen-plot" style="width:100%; height:100%;">
                     <div class="empty-state-panel">Waiting for scan...</div>
                </div>
            </div>
        </div>
    `;
}

export function getCorrelationCard() {
    return `
        <div class="card corr-card" id="card-correlation">
            <div class="card-header">
                <h3>Lattice vs Oxygen x</h3>
                <div class="header-right">
                     <span style="font-size:0.8em; color:var(--text-muted); margin-right:5px" class="hide-mobile">Color by:</span>
                     <select id="corr-color-select" class="viz-select">
                        <option value="B" selected>B-Site</option>
                        <option value="A">A-Site</option>
                     </select>
                     <div class="vert-divider"></div>
                     <button class="expand-btn" data-target="card-correlation">⤢</button>
                </div>
            </div>
            <div class="panel-content">
                <div id="correlation-plot" style="width:100%; height:100%;">
                     <div class="empty-state-panel">Waiting for scan...</div>
                </div>
            </div>
        </div>
    `;
}