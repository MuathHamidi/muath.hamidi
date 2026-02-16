/* js/components/modals/spectrum-modal.js */
export function getSpectrumModalHTML() {
    return `
        <!-- SPECTRUM FILE FILTER MODAL -->
        <div id="spectrum-filter-modal" class="modal-overlay" style="display: none;">
            <div class="modal-content" style="width: 450px; max-height: 80vh;">
                <div class="modal-header">
                    <h3>Filter Spectra Files</h3>
                    <button id="btn-close-spectrum-filter" class="close-modal">&times;</button>
                </div>
                <div class="modal-body" style="display: flex; flex-direction: column; gap: 10px;">
                     <div style="font-size: 0.9em; color: var(--text-muted);">
                        Filter files for: <span id="spectrum-filter-title" style="color: var(--primary); font-weight: bold;"></span>
                    </div>
                    
                    <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                        <button id="btn-spectrum-select-all" class="copy-btn-small">Select All</button>
                        <button id="btn-spectrum-select-none" class="copy-btn-small">Select None</button>
                    </div>

                    <div id="spectrum-file-list" class="file-list" style="max-height: 300px; border: 1px solid var(--border); padding: 5px; border-radius: 4px;">
                        <!-- Checkboxes injected here -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btn-save-spectrum-filter" class="viz-select" style="background: var(--primary); color: #000; border-color: var(--primary);">Apply Filter</button>
                </div>
            </div>
        </div>
    `;
}