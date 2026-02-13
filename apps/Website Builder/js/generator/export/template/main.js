Generator.getTemplate = function(settings, components, fullData) {
    const fontH = settings.fontHeading.replace(' ', '+');
    const fontB = settings.fontBody.replace(' ', '+');
    const css = this.getTemplateCSS(settings);
    const scripts = this.getTemplateScripts(fullData);
    
    return `<!DOCTYPE html>
<html lang="en" data-theme="${settings.theme}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${settings.title}</title>
    <link href="https://fonts.googleapis.com/css2?family=${fontH}:wght@400;700;800&family=${fontB}:wght@300;400;600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
    ${css}
</head>
<body>
    <nav>
        <div class="logo">${settings.title}</div>
        <div class="links">
            ${components.fullNav}
            <button class="theme-toggle" onclick="toggleTheme()">🌗</button>
        </div>
    </nav>

    <main>
        ${components.pagesHTML}
        ${components.cvHTML}
    </main>

    <footer>
        &copy; ${new Date().getFullYear()} ${settings.author}. ${settings.footerText || ''}
    </footer>

    ${scripts}
</body>
</html>`;
};