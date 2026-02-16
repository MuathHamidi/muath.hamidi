/* js/components/cards/SpectrumCard.js */
export function getSpectrumCard() {
    return `
        <div class="card spectrum-card" id="card-spectrum">
            <div class="card-header">
                <h3>Energy Spectrum (meV)</h3>
                <div class="header-right">
                    <!-- Controls -->
                    <label class="viz-label" title="Show individual files as separate lines">
                        <input type="checkbox" id="spectrum-split-toggle"> Split
                    </label>
                    <label class="viz-label" id="lbl-avg-toggle" title="Average values from multiple files">
                        <input type="checkbox" id="spectrum-avg-toggle"> Avg
                    </label>

                    <div class="vert-divider"></div>

                    <!-- Hint -->
                    <span style="font-size: 0.7em; color: var(--text-muted); margin-right: 5px;" class="hide-mobile">
                        (Drag lines to move)
                    </span>
                    
                    <!-- Range -->
                    <input type="number" id="spectrum-min" class="viz-input" value="0" placeholder="Min" style="width: 45px;">
                    <span style="color: var(--text-muted);">-</span>
                    <input type="number" id="spectrum-max" class="viz-input" value="1000" placeholder="Max" style="width: 45px;">
                    
                    <!-- Actions -->
                    <button id="btn-distribute-spectrum" class="viz-select" title="Evenly distribute traces">Distribute</button>
                    <button id="btn-add-spectrum" class="viz-select" style="width: auto;" title="Pin current crystal to plot">+ Pin</button>
                    <button id="btn-clear-spectrum" class="viz-select" style="width: auto;">Clear</button>
                    <button id="btn-open-export" class="viz-select" style="width: auto;">⚙️</button>
                    <button class="expand-btn" data-target="card-spectrum">⤢</button>
                </div>
            </div>
            
            <div class="panel-content">
                <div id="spectrum-plot" style="width:100%; height:100%;"></div>
            </div>
            
            <!-- CONTEXT MENU (Hidden) -->
            <div id="spectrum-context-menu">
                <div class="ctx-item" id="ctx-header" style="font-weight:bold; border-bottom:1px solid var(--border); color:var(--primary); cursor:default;">
                    Trace Name
                </div>
                <div class="ctx-item">
                    <input type="color" id="ctx-color-input" class="ctx-color-picker">
                    <span>Change Color</span>
                </div>
                
                <!-- NEW MERGE BUTTONS -->
                <div class="ctx-item" id="ctx-btn-merge-new" style="border-top:1px solid var(--border);">
                    <span>✨ New Merge Group</span>
                </div>
                <div class="ctx-item" id="ctx-btn-merge-add">
                    <span>➕ Add to Last Merge</span>
                </div>

                <div class="ctx-item" id="ctx-btn-reset" style="border-top:1px solid var(--border);">
                    <span>📍 Reset Position</span>
                </div>
                <div class="ctx-item danger" id="ctx-btn-remove">
                    <span>🗑️ Remove</span>
                </div>
            </div>
        </div>
    `;
}