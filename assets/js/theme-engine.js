(function() {
    // --- Phase 1: Immediate Execution in Head ---
    const savedTheme = localStorage.getItem('site-theme') || 'system';
    const savedAccent = localStorage.getItem('site-accent') || 'indigo';
    const animationsDisabled = localStorage.getItem('site-animations-disabled') === 'true';

    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function applyTheme(theme) {
        const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;
        document.documentElement.setAttribute('data-theme', resolvedTheme);
        document.documentElement.setAttribute('data-theme-setting', theme);
    }

    function applyAccent(accent) {
        document.documentElement.setAttribute('data-accent', accent);
    }

    function applyAnimations(disabled) {
        if (disabled) {
            document.body?.classList.add('no-animations');
        } else {
            document.body?.classList.remove('no-animations');
        }
    }

    // Apply attributes immediately to prevent flashes of unstyled content
    applyTheme(savedTheme);
    applyAccent(savedAccent);

    // Watch system color scheme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const activeSetting = localStorage.getItem('site-theme') || 'system';
        if (activeSetting === 'system') {
            applyTheme('system');
        }
    });

    // --- Phase 2: Interactive Controls Init on DOM Loaded ---
    function initThemeControls() {
        applyAnimations(animationsDisabled);

        const openBtn = document.getElementById('themeWidgetOpen');
        const closeBtn = document.getElementById('themeWidgetClose');
        const drawer = document.getElementById('themeWidgetDrawer');
        const overlay = document.getElementById('themeWidgetOverlay');

        if (!drawer) return; // Exit if drawer elements are not on the page

        // Open/Close handlers
        function toggleDrawer(open) {
            drawer.classList.toggle('open', open);
            overlay.classList.toggle('visible', open);
        }

        openBtn?.addEventListener('click', () => toggleDrawer(true));
        closeBtn?.addEventListener('click', () => toggleDrawer(false));
        overlay?.addEventListener('click', () => toggleDrawer(false));

        // Theme modes selection
        const modeButtons = document.querySelectorAll('.theme-mode-btn');
        modeButtons.forEach(btn => {
            const mode = btn.getAttribute('data-mode');
            btn.addEventListener('click', () => {
                localStorage.setItem('site-theme', mode);
                applyTheme(mode);
                updateActiveModeUI(mode);
            });
        });

        function updateActiveModeUI(activeMode) {
            modeButtons.forEach(btn => {
                const mode = btn.getAttribute('data-mode');
                btn.classList.toggle('active', mode === activeMode);
            });
        }
        updateActiveModeUI(savedTheme);

        // Accent selection
        const accentButtons = document.querySelectorAll('.theme-accent-btn');
        accentButtons.forEach(btn => {
            const accent = btn.getAttribute('data-accent');
            btn.addEventListener('click', () => {
                localStorage.setItem('site-accent', accent);
                applyAccent(accent);
                updateActiveAccentUI(accent);
            });
        });

        function updateActiveAccentUI(activeAccent) {
            accentButtons.forEach(btn => {
                const accent = btn.getAttribute('data-accent');
                btn.classList.toggle('active', accent === activeAccent);
            });
        }
        updateActiveAccentUI(savedAccent);

        // Animations Toggle
        const animInput = document.getElementById('themeAnimationsToggle');
        if (animInput) {
            animInput.checked = !animationsDisabled;
            animInput.addEventListener('change', () => {
                const disabled = !animInput.checked;
                localStorage.setItem('site-animations-disabled', disabled);
                applyAnimations(disabled);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeControls);
    } else {
        initThemeControls();
    }
})();
