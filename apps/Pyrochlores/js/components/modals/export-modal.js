/* js/components/modals/export-modal.js */
export function getExportModalHTML() {
    return `
        <!-- EXPORT MODAL -->
        <div id="export-modal" class="modal-overlay" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Export Settings</h3>
                    <button id="btn-close-modal" class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Width (px)</label>
                            <input type="number" id="exp-width" value="1600" class="viz-input" style="width:100%">
                        </div>
                        <div class="form-group">
                            <label>Height (px)</label>
                            <input type="number" id="exp-height" value="900" class="viz-input" style="width:100%">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Font Size</label>
                            <input type="number" id="exp-font" value="18" class="viz-input" style="width:100%">
                        </div>
                        <div class="form-group">
                            <label>Marker Size</label>
                            <input type="number" id="exp-marker" value="30" class="viz-input" style="width:100%">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Theme</label>
                            <select id="exp-theme" class="viz-select" style="width:100%">
                                <option value="dark">Dark (Default)</option>
                                <option value="light">Light (Publication)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Format</label>
                            <select id="exp-format" class="viz-select" style="width:100%">
                                <option value="png">PNG Image</option>
                                <option value="pdf">PDF Document</option>
                                <option value="svg">SVG Vector</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btn-export-copy" class="viz-select">📋 Copy to Clipboard</button>
                    <button id="btn-export-download" class="viz-select" style="background: var(--primary); color: #000; border-color: var(--primary);">Download</button>
                </div>
            </div>
        </div>
    `;
}