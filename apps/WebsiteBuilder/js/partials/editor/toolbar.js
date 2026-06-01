const EditorToolbarView = `
    <!-- Editor Toolbar -->
    <div class="editor-toolbar">
        <div class="tool-group">
            <button class="tool-btn" draggable="true" ondragstart="DragOps.startNew(event, 'heading')" onclick="Editor.addBlock('heading')" title="Heading"><span class="material-icons-round">title</span></button>
            <button class="tool-btn" draggable="true" ondragstart="DragOps.startNew(event, 'text')" onclick="Editor.addBlock('text')" title="Text"><span class="material-icons-round">notes</span></button>
            <button class="tool-btn" draggable="true" ondragstart="DragOps.startNew(event, 'media')" onclick="Editor.addBlock('media')" title="Media (Image/Video/Audio)"><span class="material-icons-round">perm_media</span></button>
        </div>

        <div class="tool-divider"></div>

        <div class="tool-group">
            <button class="tool-btn" draggable="true" ondragstart="DragOps.startNew(event, 'hero')" onclick="Editor.addBlock('hero')" title="Hero Section"><span class="material-icons-round">web_asset</span></button>
            <button class="tool-btn" draggable="true" ondragstart="DragOps.startNew(event, 'text-media')" onclick="Editor.addBlock('text-media')" title="Text & Media Mixed"><span class="material-icons-round">featured_video</span></button>
            <button class="tool-btn" draggable="true" ondragstart="DragOps.startNew(event, 'features')" onclick="Editor.addBlock('features')" title="Features Grid"><span class="material-icons-round">grid_view</span></button>
        </div>

        <div class="tool-divider"></div>

        <!-- Advanced Blocks -->
        <div class="tool-group">
            <button class="tool-btn" draggable="true" ondragstart="DragOps.startNew(event, 'pricing')" onclick="Editor.addBlock('pricing')" title="Pricing"><span class="material-icons-round">sell</span></button>
            <button class="tool-btn" draggable="true" ondragstart="DragOps.startNew(event, 'testimonials')" onclick="Editor.addBlock('testimonials')" title="Testimonials"><span class="material-icons-round">forum</span></button>
            <button class="tool-btn" draggable="true" ondragstart="DragOps.startNew(event, 'faq')" onclick="Editor.addBlock('faq')" title="FAQ"><span class="material-icons-round">quiz</span></button>
            <button class="tool-btn" draggable="true" ondragstart="DragOps.startNew(event, 'contact')" onclick="Editor.addBlock('contact')" title="Contact Form"><span class="material-icons-round">contact_mail</span></button>
        </div>

        <div class="tool-divider"></div>
        
        <div class="tool-group">
            <button class="tool-btn" draggable="true" ondragstart="DragOps.startNew(event, 'button')" onclick="Editor.addBlock('button')" title="Button"><span class="material-icons-round">smart_button</span></button>
            <button class="tool-btn" draggable="true" ondragstart="DragOps.startNew(event, 'table')" onclick="Editor.addBlock('table')" title="Table"><span class="material-icons-round">table_chart</span></button>
            <button class="tool-btn" draggable="true" ondragstart="DragOps.startNew(event, 'divider')" onclick="Editor.addBlock('divider')" title="Divider"><span class="material-icons-round">horizontal_rule</span></button>
            <button class="tool-btn" draggable="true" ondragstart="DragOps.startNew(event, 'spacer')" onclick="Editor.addBlock('spacer')" title="Spacer"><span class="material-icons-round">height</span></button>
        </div>
    </div>
`;