export function getRawCard() {
    return `
        <div class="card raw-card" id="card-raw">
            <div class="card-header">
                <h3>Source CIF</h3>
                <div class="header-right">
                    <button class="copy-btn">📋 Copy</button>
                    <button class="expand-btn" data-target="card-raw">⤢</button>
                </div>
            </div>
            <div class="panel-content code-view">
                <div class="code-block" id="cif-content">Select a file.</div>
            </div>
        </div>
    `;
}