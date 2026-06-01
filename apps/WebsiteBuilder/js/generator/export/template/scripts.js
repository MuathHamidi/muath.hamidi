Generator.getTemplateScripts = function(fullData) {
    return `
    <!-- BUILDER STATE -->
    <script id="builder-state" type="application/json">
        ${JSON.stringify(fullData)}
    <\/script>

    <script>
        function route(id) {
            document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
            
            const target = document.getElementById('page-' + id);
            if(target) target.classList.add('active');
            
            const navBtn = document.getElementById('nav-' + id);
            if(navBtn) navBtn.classList.add('active');
        }

        function toggleTheme() {
            const body = document.documentElement;
            const current = body.getAttribute('data-theme');
            body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
        }
        
        window.onload = () => {
            const hash = window.location.hash.replace('#', '');
            if(hash) route(hash);
        }
    <\/script>`;
};