UI.toggleAppTheme = function() {
    const body = document.body;
    const current = body.getAttribute('data-theme');
    body.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
};

UI.updateAccent = function(color) {
    document.documentElement.style.setProperty('--accent', color);
};