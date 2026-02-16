export function getVisualizerCard() {
    return `
        <div class="card visualizer-card" id="card-3d">
            <div class="card-header">
                <h3>Structure <span id="structure-label"></span></h3>
                <div class="viz-controls">
                    <!-- Supercell Toggle -->
                    <button title="Toggle Supercell (2x2x2)" id="btn-supercell" class="viz-toggle">📦 2x</button>
                    
                    <select id="viz-mode-select" class="viz-select">
                        <option value="cell">Unit Cell</option>
                        <option value="poly">Polyhedra (B)</option>
                        <option value="site-a">A-Site Local</option>
                        <option value="site-b">B-Site Local</option>
                    </select>
                    <button title="Toggle Spin" id="btn-spin">🔄</button>
                    <button title="Save Image" id="btn-snap">📷</button>
                    <button title="Reset Camera" id="btn-reset">🎯</button>
                    <button class="expand-btn" data-target="card-3d">⤢</button>
                </div>
            </div>
            <div id="mol-container" class="mol-container"></div>
        </div>
    `;
}