/* js/components/cards/MergerCard.js */
export function getMergerCard() {
    return `
        <div class="card merger-card" id="card-merger">
            <div class="card-header">
                <h3>Merged Spectra</h3>
                <div class="header-right">
                    <span style="font-size: 0.7em; color: var(--text-muted);" class="hide-mobile">
                        (Group different crystals)
                    </span>
                    
                    <div class="vert-divider"></div>

                    <label class="viz-label">
                        <input type="checkbox" id="merger-avg-toggle" checked> Average
                    </label>

                    <!-- NEW: Range Inputs -->
                    <input type="number" id="merger-min" class="viz-input" value="0" placeholder="Min" style="width: 45px;">
                    <span style="color: var(--text-muted);">-</span>
                    <input type="number" id="merger-max" class="viz-input" value="1000" placeholder="Max" style="width: 45px;">

                    <button id="btn-create-merge" class="viz-select" style="width: auto; background: var(--bg-hover);">+ Create Merge</button>
                    <button id="btn-clear-merger" class="viz-select" style="width: auto;">Clear</button>
                    <button class="expand-btn" data-target="card-merger">⤢</button>
                </div>
            </div>
            <div class="panel-content">
                <div id="merger-plot" style="width:100%; height:100%;">
                    <div class="empty-state-panel">Create a merge to combine datasets.</div>
                </div>
            </div>
        </div>
    `;
}