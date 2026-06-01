/* Website Builder/js/generator/export/template/css.js */
Generator.getTemplateCSS = function(settings) {
    const radius = settings.borderRadius + 'px';
    const btnRadius = settings.buttonStyle === 'pill' ? '50px' : (settings.buttonStyle === 'sharp' ? '0px' : '6px');
    
    return `<style>
    :root { 
        --bg: #ffffff; --text: #2d2d2d; 
        --accent: ${settings.accent}; 
        --surface: #f8f9fa; --border: #e9ecef; 
        --radius: ${radius};
        --btn-radius: ${btnRadius};
    }
    [data-theme="dark"] { 
        --bg: #121212; --text: #e0e0e0; 
        --accent: ${settings.accent}; 
        --surface: #1e1e1e; --border: #333; 
    }
    
    body { margin:0; font-family: '${settings.fontBody}', sans-serif; background: var(--bg); color: var(--text); line-height: 1.7; transition: 0.3s; }
    h1, h2, h3, h4 { font-family: '${settings.fontHeading}', sans-serif; color: var(--text); letter-spacing: -0.5px; margin-top: 1.5em; line-height: 1.2; }
    
    /* Navigation */
    nav { display: flex; align-items: center; justify-content: space-between; padding: 20px 5%; background: var(--surface); border-bottom: 1px solid var(--border); position: sticky; top:0; z-index:100; backdrop-filter: blur(10px); }
    .logo { font-weight: 800; font-size: 1.4rem; letter-spacing: -1px; }
    .links a { text-decoration: none; color: var(--text); margin-left: 20px; opacity: 0.7; transition: 0.2s; font-size: 0.95rem; font-weight: 500; }
    .links a:hover, .links a.active { opacity: 1; color: var(--accent); }
    .theme-toggle { cursor:pointer; background:none; border:none; font-size: 1.2rem; margin-left:20px; }

    /* Layout Container - Updated to match Editor Flex Grid */
    .container { 
        max-width: 1100px; 
        margin: 0 auto; 
        padding: 60px 20px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        gap: 0; /* Gaps handled by padding inside elements */
    }
    
    .page-section { display: none; min-height: 80vh; animation: fadeIn 0.5s ease; position: relative; }
    .page-section.active { display: block; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    /* Elements */
    img { max-width: 100%; border-radius: var(--radius); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
    .btn-action { display: inline-block; background: var(--accent); color: white; padding: 12px 30px; border-radius: var(--btn-radius); text-decoration: none; font-weight: 600; transition: transform 0.2s; border: 1px solid transparent; }
    .btn-action:hover { transform: translateY(-2px); filter: brightness(1.1); }
    
    /* Print Button */
    .print-btn {
        position: fixed; bottom: 30px; right: 30px;
        width: 50px; height: 50px;
        background: var(--accent); color: white;
        border-radius: 50%; border: none;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        transition: transform 0.2s;
    }
    .print-btn:hover { transform: scale(1.1); }

    /* CV / Resume Styles */
    .cv-header-block { display: flex; gap: 40px; align-items: center; margin-bottom: 40px; }
    .cv-avatar { width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 4px solid var(--accent); }
    .cv-contact-grid { display: flex; flex-wrap: wrap; gap: 15px 25px; margin-top: 15px; }
    .contact-item { display: flex; align-items: center; gap: 8px; color: var(--text); opacity: 0.8; text-decoration: none; font-size: 0.95rem; }
    .cv-layout-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 50px; }
    .skill-tag { display: inline-block; background: var(--bg); border: 1px solid var(--border); padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; margin: 0 5px 8px 0; font-weight: 500; }
    
    footer { text-align: center; padding: 60px; border-top: 1px solid var(--border); opacity: 0.6; font-size: 0.9rem; margin-top: auto; }
    
    /* Responsive */
    @media(max-width: 768px) {
        /* Force full width on mobile */
        section[style*="flex-basis"] { flex-basis: 100% !important; max-width: 100% !important; }
        .cv-header-block { flex-direction: column; text-align: center; }
        .cv-grid-sidebar { grid-template-columns: 1fr; }
        .print-btn { bottom: 20px; right: 20px; }
    }

    /* Print Specifics - FORCE CLEAN LIGHT THEME */
    @media print {
        /* Override all theme variables to white/black */
        :root, [data-theme="dark"] {
            --bg: #ffffff !important; 
            --text: #000000 !important; 
            --surface: #ffffff !important; 
            --border: #cccccc !important;
        }

        /* Hide UI */
        nav, footer, .print-btn, .theme-toggle { display: none !important; }
        
        /* Reset Body */
        body { background: white !important; color: black !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        
        /* Layout Fixes */
        .page-section { display: block !important; animation: none !important; opacity: 1 !important; transform: none !important; }
        .page-section:not(.active) { display: none !important; }
        
        /* Fix Specific CV Elements that rely on surface colors */
        .sidebar-box, .cv-box { 
            background: white !important; 
            border: 1px solid #ddd !important;
            color: black !important;
            box-shadow: none !important;
        }

        /* Ensure Text Contrast is High */
        h1, h2, h3, h4, p, span, div, strong { color: black !important; }
        .cv-title i { color: var(--accent) !important; }
        .contact-item { color: black !important; }
        .skill-tag { border-color: #000 !important; color: #000 !important; }
        
        /* Remove Shadows */
        * { box-shadow: none !important; text-shadow: none !important; }
        
        /* Ensure Container uses full width on paper */
        .container { max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
    }
    </style>`;
};