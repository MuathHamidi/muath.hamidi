const EditorView = `
    <div id="tab-pages" class="tab-content" style="display:none; padding:0; width:100%; max-width:none; height:100%;">
        <div class="editor-layout">
            
            ${EditorSidebarView}

            <!-- CENTER: Workspace -->
            <div class="editor-center-col" id="editorWorkspace" style="display:none;">
                ${EditorToolbarView}
                ${EditorCanvasView}
            </div>
            
            ${EditorPropertiesView}

            ${EditorEmptyStateView}

        </div>
    </div>
`;