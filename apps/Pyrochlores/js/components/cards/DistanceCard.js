/* js/components/cards/DistanceCard.js */
export function getDistanceCard() {
    return `
        <div class="card distance-card" id="card-distance">
            <div class="card-header">
                <h3>Atomic Distances & Bond Analysis</h3>
                <div class="header-right">
                    <button class="expand-btn" data-target="card-distance">⤢</button>
                </div>
            </div>
            
            <div class="panel-content" style="display: flex; flex-direction: row; height: 100%;">
                
                <!-- LEFT: 3D VIEWER -->
                <div style="flex: 1.5; position: relative; border-right: 1px solid var(--border); background: #000;">
                    <div id="dist-mol-container" class="mol-container">
                        <div class="empty-state-panel" style="pointer-events:none;">
                            Load structure to analyze bonds.
                        </div>
                    </div>
                    
                    <!-- Floating Controls -->
                    <div style="position: absolute; top: 10px; left: 10px; background: rgba(15, 16, 20, 0.9); padding: 10px; border-radius: 8px; border: 1px solid var(--border); pointer-events: auto; width: 190px; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
                        <label style="font-size:0.7em; color:var(--text-muted); display:block; margin-bottom:4px;">Bond Type</label>
                        <select id="dist-mode-select" class="viz-select" style="width: 100%; margin-bottom: 10px;">
                            <option value="A-O">A - O (Coordination)</option>
                            <option value="B-O">B - O (Octahedral)</option>
                            <option value="A-A">A - A (Neighbor)</option>
                            <option value="B-B">B - B (Neighbor)</option>
                            <option value="A-B">A - B (Cation-Cation)</option>
                            <option value="O-O">O - O (Edges)</option>
                        </select>
                        
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <label style="font-size:0.7em; color:var(--text-muted);">Max Dist.</label>
                            <span id="dist-cutoff-val" style="font-size:0.8em; color:var(--primary); font-family:var(--font-code);">3.0</span>
                        </div>
                        <input type="range" id="dist-cutoff-slider" min="1.5" max="6.0" step="0.1" value="3.0" style="width: 100%; cursor: pointer; margin: 5px 0 10px 0;">
                        
                        <div style="margin-top:5px; font-size:0.75em; display:flex; justify-content:space-between;">
                            <label style="cursor:pointer; display:flex; align-items:center; gap:5px;"><input type="checkbox" id="dist-ghost-check" checked> Ghost</label>
                            <label style="cursor:pointer; display:flex; align-items:center; gap:5px;"><input type="checkbox" id="dist-heat-check" checked> Color</label>
                        </div>
                        
                        <div style="margin-top:10px; border-top:1px solid #333; padding-top:8px; text-align:center;">
                            <button id="btn-dist-reset" class="viz-select" style="width:100%; font-size:0.8em;">🎯 Reset Camera</button>
                        </div>
                    </div>
                </div>

                <!-- RIGHT: STATISTICS -->
                <div style="flex: 1; display: flex; flex-direction: column; background: var(--bg-panel); min-width: 280px; overflow: hidden;">
                    <!-- Stats Grid -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 15px; border-bottom: 1px solid var(--border); background: var(--bg-dark);">
                        <div class="stat-box">
                            <span style="display:block; font-size:0.7em; color:var(--text-muted);">Count</span>
                            <span id="dist-stat-count" style="font-size:1.1em; font-weight:bold; color:#fff;">--</span>
                        </div>
                        <div class="stat-box">
                            <span style="display:block; font-size:0.7em; color:var(--text-muted);">Mean Bond</span>
                            <span id="dist-stat-mean" style="font-size:1.1em; font-weight:bold; color:var(--primary);">--</span>
                        </div>
                        <div class="stat-box">
                            <span style="display:block; font-size:0.7em; color:var(--text-muted);">Min / Max</span>
                            <span id="dist-stat-range" style="font-size:0.85em; color:#fff;">-- / --</span>
                        </div>
                        <div class="stat-box">
                            <span style="display:block; font-size:0.7em; color:var(--text-muted);">Std. Dev</span>
                            <span id="dist-stat-std" style="font-size:0.85em; color:#fff;">--</span>
                        </div>
                    </div>

                    <!-- Histogram -->
                    <div style="flex: 1; position: relative; padding: 5px;">
                        <h4 style="margin: 5px 0 0 10px; font-size: 0.8em; color: var(--text-muted);">Distribution</h4>
                        <div id="dist-histogram" style="width: 100%; height: 90%;"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}