/* js/components/modals/structure-modal.js */
export function getStructureModalHTML() {
    return `
        <!-- STRUCTURE DATA SELECTION MODAL -->
        <div id="structure-select-modal" class="modal-overlay" style="display: none;">
            <div class="modal-content" style="width: 500px; max-height: 80vh;">
                <div class="modal-header">
                    <h3>Select Data Source</h3>
                    <button id="btn-close-struct-modal" class="close-modal">&times;</button>
                </div>
                <div class="modal-body" style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="font-size: 0.9em; color: var(--text-muted);">
                        Composition: <span id="struct-modal-comp" style="color: #fff; font-weight: bold;"></span>
                    </div>
                    <button id="btn-struct-use-avg" class="file-item" style="justify-content: space-between; border: 1px dashed var(--primary);">
                        <span>Use Average</span>
                        <span id="struct-avg-val" class="file-gap-badge">--</span>
                    </button>
                    <div style="height: 1px; background: var(--border); margin: 5px 0;"></div>
                    <div style="font-size: 0.8em; color: var(--text-muted);">Available Files:</div>
                    <div id="struct-file-list" class="file-list" style="max-height: 300px;"></div>
                </div>
            </div>
        </div>
    `;
}