Generator.exportWebsite = function() {
    const d = Data.state;
    const s = d.settings;

    // 1. Build Components (Nav, Pages, CV)
    const components = this.buildExportComponents(d);

    // 2. Get Full HTML String
    const htmlContent = this.getTemplate(s, components, d);

    // 3. Trigger Download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${s.title.replace(/\s+/g,'_').toLowerCase() || 'website'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    UI.notify('Website Exported!');
};