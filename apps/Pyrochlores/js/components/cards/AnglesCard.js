/* js/components/cards/AnglesCard.js */
export function getAnglesCard() {
    return `
        <div class="card angles-card" id="card-angles">
            <div class="card-header">
                <h3>Bond Angles Analysis</h3>
                <div class="header-right">
                    <button class="expand-btn" data-target="card-angles">⤢</button>
                </div>
            </div>
            
            <div class="panel-content" style="display: flex; flex-direction: row; height: 100%;">
                
                <!-- LEFT: 3D VIEWER (Focus View) -->
                <div style="flex: 1.2; position: relative; border-right: 1px solid var(--border); background: #000;">
                    <div id="angles-mol-container" class="mol-container">
                        <div class="empty-state-panel" style="pointer-events:none; display:flex; align-items:center; justify-content:center;">
                            <span>Select an angle from the list<br>to visualize geometry.</span>
                        </div>
                    </div>
                    <!-- Overlay Legend -->
                    <div id="angle-viz-overlay" style="position: absolute; bottom: 10px; left: 10px; background: rgba(0,0,0,0.85); padding: 8px 12px; border-radius: 6px; border:1px solid var(--border); display:none;">
                        <div id="angle-viz-title" style="font-weight:bold; color:var(--primary); font-size:0.9em; margin-bottom:4px;"></div>
                        <div id="angle-viz-val" style="color:#fff; font-size:1.1em; font-family:var(--font-code);"></div>
                    </div>
                </div>

                <!-- RIGHT: TABLE LIST -->
                <div style="flex: 1; display: flex; flex-direction: column; background: var(--bg-panel); min-width: 320px;">
                    
                    <div style="padding: 10px; border-bottom: 1px solid var(--border); background: var(--bg-dark); display:flex; gap:10px;">
                        <input type="text" id="angle-search" placeholder="Search (e.g. O1-Ti)" class="viz-input" style="flex:1;">
                        <div class="stat-box" style="padding: 4px 10px; min-width:80px;">
                            <span style="font-size:0.6em; color:#888;">Unique Angles</span>
                            <span id="angle-unique-count" style="font-weight:bold;">0</span>
                        </div>
                    </div>

                    <div class="table-view" style="flex: 1; padding: 0; overflow-y:auto;">
                        <table class="data-table" id="angles-table">
                            <thead style="position:sticky; top:0; background:var(--bg-hover); z-index:2;">
                                <tr>
                                    <th style="padding: 10px; text-align:left;">Geometry (A-B-C)</th>
                                    <th style="padding: 10px; text-align:right;">Angle (°)</th>
                                    <th style="padding: 10px; text-align:right;">σ</th>
                                    <th style="padding: 10px; text-align:right;">Count</th>
                                </tr>
                            </thead>
                            <tbody id="angles-tbody">
                                <!-- Populated by JS -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}