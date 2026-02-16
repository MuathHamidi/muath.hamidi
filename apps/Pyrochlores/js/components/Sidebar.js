export function getSidebarHTML() {
    return `
        <aside class="sidebar">
            <div class="brand">
                <h2>Pyrochlore<span>DB</span></h2>
                <p>A<sub>2</sub>B<sub>2</sub>O<sub>7</sub> Research Suite</p>
            </div>

            <div id="toast-container"></div>
            <div id="db-status" class="status-badge loading"><span class="dot"></span> Connecting...</div>

            <div class="selection-panel">
                <div class="section-title">Composition</div>
                <div class="atom-selectors">
                    <div class="atom-box" id="atom-a-display">
                        <span class="label">Site A</span>
                        <span class="symbol">--</span>
                        <span class="full-name">&nbsp;</span>
                    </div>
                    <div class="atom-box" id="atom-b-display">
                        <span class="label">Site B</span>
                        <span class="symbol">--</span>
                        <span class="full-name">&nbsp;</span>
                    </div>
                </div>
                <div class="formula-preview">
                    <span id="formula-display">A₂B₂O₇</span>
                </div>
            </div>

            <div class="sidebar-ptable-container">
                <div class="section-title">Quick Select</div>
                <div id="sidebar-ptable" class="sidebar-ptable"></div>
            </div>

            <div class="file-navigator">
                <div class="section-title">Filters & Matching</div>

                <div class="search-container">
                    <input type="text" id="file-search" placeholder="Search filename..." disabled>
                </div>
                
                <div class="list-header">
                    <span id="match-count">0 found</span>
                </div>

                <div id="file-list" class="file-list">
                    <div class="empty-state">Loading database...</div>
                </div>
            </div>
        </aside>
    `;
}