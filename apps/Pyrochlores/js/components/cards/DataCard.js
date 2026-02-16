export function getDataCard() {
    return `
        <div class="card data-card" id="card-data">
            <div class="card-header tabs-header">
                <h3>Simulation Data</h3>
                <div class="header-right">
                    <div class="tabs">
                        <button class="tab-btn active">Table</button>
                        <button class="tab-btn">Raw</button>
                    </div>
                    <button class="expand-btn" data-target="card-data">⤢</button>
                </div>
            </div>
            <div id="view-parsed" class="panel-content table-view">
                <div class="empty-state-panel">Select a file.</div>
            </div>
            <div id="view-raw" class="panel-content code-view" style="display:none;">
                <div class="code-block" id="log-content">No data.</div>
            </div>
        </div>
    `;
}