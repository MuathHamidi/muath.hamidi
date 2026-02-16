/* js/components/modals/merge-modals.js */
export function getMergeModalsHTML() {
    return `
        <!-- MERGE CREATION MODAL -->
        <div id="merge-modal" class="modal-overlay" style="display: none;">
            <div class="modal-content" style="width: 400px; max-height: 80vh;">
                <div class="modal-header">
                    <h3>Create New Merge</h3>
                    <button id="btn-close-merge-modal" class="close-modal">&times;</button>
                </div>
                <div class="modal-body" style="overflow-y: hidden; display: flex; flex-direction: column;">
                    <div class="form-group">
                        <label>Merge Name</label>
                        <input type="text" id="merge-name-input" class="viz-input" style="width: 100%; text-align: left;" placeholder="e.g. Titanates vs Stannates">
                    </div>
                    <div class="form-group" style="flex: 1; display: flex; flex-direction: column; min-height: 0;">
                        <label>Select Constituents</label>
                        <div style="margin-bottom: 5px;">
                            <input type="text" id="merge-search" placeholder="Filter..." class="viz-input" style="width: 100%; text-align: left; font-size: 0.8em;">
                        </div>
                        <div id="merge-list-container" style="flex: 1; overflow-y: auto; border: 1px solid var(--border); background: var(--bg-dark); border-radius: 4px; padding: 5px;"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div style="flex:1; font-size:0.8em; color:var(--text-muted);" id="merge-selection-count">0 selected</div>
                    <button id="btn-save-merge" class="viz-select" style="background: var(--primary); color: #000; border-color: var(--primary);">Create</button>
                </div>
            </div>
        </div>

        <!-- MERGE DETAILS MODAL -->
        <div id="merge-details-modal" class="modal-overlay" style="display: none;">
            <div class="modal-content" style="width: 500px; max-height: 80vh;">
                <div class="modal-header">
                    <h3>Merge Details: <span id="merge-details-title" style="color:var(--primary)"></span></h3>
                    <button id="btn-close-merge-details" class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div id="merge-details-content" style="overflow-y:auto; max-height:400px; display:flex; flex-direction:column; gap:10px;">
                        <!-- Injected via JS -->
                    </div>
                </div>
            </div>
        </div>
    `;
}