export const loadHTMLComponents = async () => {
    // 1. Load the root views and overlays
    const rootComponents = [
        { id: 'overlays-mount', url: 'components/overlays.html' },
        { id: 'setup-mount', url: 'components/setup.html' },
        { id: 'auth-mount', url: 'components/auth.html' },
        { id: 'app-mount', url: 'components/app-layout.html' }
    ];

    for (const comp of rootComponents) {
        const response = await fetch(comp.url);
        document.getElementById(comp.id).innerHTML = await response.text();
    }

    // 2. Load the nested pieces inside the 'app-layout'
    const appComponents = [
        { id: 'nav-mount', url: 'components/nav.html' },
        { id: 'sidebar-mount', url: 'components/sidebar.html' },
        { id: 'chat-mount', url: 'components/chat.html' },
        { id: 'members-mount', url: 'components/members.html' }
    ];

    for (const comp of appComponents) {
        const response = await fetch(comp.url);
        document.getElementById(comp.id).innerHTML = await response.text();
    }
};