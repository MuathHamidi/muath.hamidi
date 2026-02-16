export function getHeatmapCard() {
    return `
        <div class="card heatmap-card" id="card-heatmap">
            <div class="card-header">
                <h3>Crystal Field Gap (meV)</h3>
                <div class="header-right">
                    <span style="font-size: 0.8em; color: var(--text-muted); margin-right: 5px;">State:</span>
                    <input type="number" id="heatmap-state-input" class="viz-input" value="1" min="1" max="50">
                    
                    <div class="legend-inline" style="margin-left: 15px;">
                        <span class="dot-legend" style="background: #d62728;"></span> Kramers
                        <span class="dot-legend" style="background: #1f77b4;"></span> Non-Kramers
                    </div>
                    <button class="expand-btn" data-target="card-heatmap">⤢</button>
                </div>
            </div>
            <div class="panel-content">
                <div id="heatmap-plot" style="width:100%; height:100%;"></div>
            </div>
        </div>
    `;
}