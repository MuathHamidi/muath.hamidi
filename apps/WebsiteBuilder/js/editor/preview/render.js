Editor.renderPreviewContent = function() {
    const d = Data.state;
    const s = d.settings;

    // 1. GENERATE COMPONENTS
    const components = Generator.buildExportComponents(d);
    
    // 2. GET TEMPLATE
    let fullHTML = Generator.getTemplate(s, components, d);

    // 3. AUTO-NAVIGATE
    // Route to the current page ID being edited
    let activePageId = null;
    if(this.currentPageIndex !== null && d.pages[this.currentPageIndex]) {
        activePageId = d.pages[this.currentPageIndex].id;
    }
    
    if(activePageId) {
        const autoRouteScript = `
            <script>
                window.addEventListener('load', function() {
                    if(typeof route === 'function') {
                        route('${activePageId}');
                    }
                });
            </script>
        </body>`;
        fullHTML = fullHTML.replace('</body>', autoRouteScript);
    }

    // 4. WRITE TO IFRAME
    const frame = document.getElementById('livePreviewFrame');
    const doc = frame.contentDocument || frame.contentWindow.document;

    doc.open();
    doc.write(fullHTML);
    doc.close();
};