/* Website Builder/js/generator/export/components/cv/layouts/modern/css.js */
Generator.CV = Generator.CV || {};
Generator.CV.Layouts = Generator.CV.Layouts || {};
Generator.CV.Layouts.Modern = Generator.CV.Layouts.Modern || {};

Generator.CV.Layouts.Modern.getCSS = function(settings) {
    // Default safe fallbacks
    const s = settings || {};
    const side = s.sidebarSide || 'right';
    const font = s.fontPair || 'sans';
    const density = s.density || 'comfortable';

    // 1. Sidebar Logic (Grid areas or Column Ordering)
    // If 'left', sidebar is col 1, main is col 2.
    // If 'right', main is col 1, sidebar is col 2.
    const gridCols = side === 'left' ? '1fr 2.5fr' : '2.5fr 1fr';
    const sidebarOrder = side === 'left' ? '0' : '1'; 
    const mainOrder = side === 'left' ? '1' : '0';

    // 2. Font Logic
    let fontHead = "'Inter', sans-serif";
    let fontBody = "'Inter', sans-serif";

    if(font === 'serif') {
        fontHead = "'Merriweather', serif";
        fontBody = "'Merriweather', serif";
    } else if(font === 'mono') {
        fontHead = "'Fira Code', monospace";
        fontBody = "'Fira Code', monospace";
    } else if(font === 'mixed') {
        fontHead = "'Merriweather', serif";
        fontBody = "'Inter', sans-serif";
    }

    // 3. Density Logic (Margins/Padding)
    let spacing = '50px'; // comfortable
    let cardPad = '25px';
    let fontSize = '16px';

    if(density === 'compact') {
        spacing = '30px';
        cardPad = '15px';
        fontSize = '14px';
    } else if(density === 'spacious') {
        spacing = '70px';
        cardPad = '35px';
        fontSize = '17px';
    }

    return `
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Merriweather:wght@300;400;700&family=Fira+Code:wght@400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --cv-gap: ${spacing};
            --cv-card-pad: ${cardPad};
            --cv-font-head: ${fontHead};
            --cv-font-body: ${fontBody};
            --cv-base-size: ${fontSize};
        }

        body { font-size: var(--cv-base-size); font-family: var(--cv-font-body); }
        h1, h2, h3, h4, .cv-web-role, .cv-web-heading { font-family: var(--cv-font-head); }

        /* Modern Web CV Layout */
        .cv-web-section {
            padding-top: var(--cv-gap);
            padding-bottom: var(--cv-gap);
            animation: fadeIn 0.6s ease;
        }

        /* 1. Header Area */
        .cv-web-header {
            display: flex;
            align-items: center;
            gap: 40px;
            margin-bottom: var(--cv-gap);
            padding-bottom: 40px;
            border-bottom: 1px solid var(--border);
        }
        
        .cv-web-avatar {
            width: 140px; height: 140px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid var(--surface);
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            background: var(--surface);
        }

        .cv-web-title-block h1 { margin: 0; font-size: 3rem; line-height: 1.1; letter-spacing: -1px; }
        .cv-web-role { 
            font-size: 1.25rem; 
            color: var(--accent); 
            font-weight: 600; 
            margin: 10px 0 20px 0; 
            text-transform: uppercase; 
            letter-spacing: 1px;
        }

        /* 2. Grid Layout */
        .cv-web-grid {
            display: grid;
            grid-template-columns: ${gridCols};
            gap: var(--cv-gap);
        }

        /* 3. Cards & Sections */
        .cv-web-block { margin-bottom: var(--cv-gap); }
        
        .cv-web-heading {
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: var(--text);
            opacity: 0.9;
            font-weight: 800;
            display: flex; align-items: center; gap: 12px;
            margin-bottom: 25px;
        }
        .cv-web-heading::after { content:''; flex:1; height:1px; background:var(--border); }
        .cv-web-heading i { color: var(--accent); font-size: 20px; }

        /* Timeline Items */
        .cv-web-entry {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: var(--cv-card-pad);
            margin-bottom: 20px;
            transition: transform 0.2s, box-shadow 0.2s;
            page-break-inside: avoid;
        }
        .cv-web-entry:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.05);
            border-color: var(--accent);
        }

        .cv-entry-top { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 8px; }
        .cv-entry-role { font-weight: 700; font-size: 1.1rem; color: var(--text); }
        .cv-entry-time { font-family: monospace; font-size: 0.85rem; color: var(--accent); background: rgba(0,0,0,0.05); padding: 2px 8px; border-radius: 4px; }
        
        .cv-entry-sub { font-weight: 600; font-size: 0.95rem; opacity: 0.8; margin-bottom: 12px; display: block; }
        .cv-entry-desc { font-size: 0.95rem; line-height: 1.6; opacity: 0.8; }

        /* Sidebar Styling */
        .cv-sidebar-box {
            background: var(--surface);
            padding: var(--cv-card-pad);
            border-radius: var(--radius);
            border: 1px solid var(--border);
            margin-bottom: 30px;
            page-break-inside: avoid;
        }
        .cv-sidebar-box h3 { margin-top: 0; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 20px; }

        /* Contact List in Sidebar */
        .web-contact-list { display: flex; flex-direction: column; gap: 15px; }
        .web-contact-item { display: flex; align-items: center; gap: 12px; color: var(--text); text-decoration: none; font-size: 0.9rem; opacity: 0.9; transition: 0.2s; }
        .web-contact-item:hover { color: var(--accent); opacity: 1; }
        .web-contact-icon { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: var(--bg); border-radius: 50%; color: var(--accent); font-size: 16px; border: 1px solid var(--border); }

        /* Skills */
        .web-skills { display: flex; flex-wrap: wrap; gap: 8px; }
        .web-skill-tag { 
            background: var(--bg); 
            border: 1px solid var(--border); 
            color: var(--text); 
            padding: 6px 14px; 
            border-radius: 20px; 
            font-size: 0.85rem; 
            font-weight: 600;
        }

        /* Mobile */
        @media (max-width: 800px) {
            .cv-web-header { flex-direction: column; text-align: center; }
            .cv-web-grid { grid-template-columns: 1fr; }
        }

        /* Print Override */
        @media print {
            .cv-web-section { padding: 0; }
            .cv-web-entry, .cv-sidebar-box { border: none; padding: 0; background: transparent; margin-bottom: 30px; box-shadow: none !important; }
            .cv-web-avatar { border-color: #ddd; }
            .cv-entry-time { border: 1px solid #ddd; }
            
            /* Enforce Sidebar Side in Print */
            .cv-web-grid { display: grid !important; gap: 40px; grid-template-columns: ${gridCols} !important; }
            
            .cv-sidebar-box { border-bottom: 1px solid #eee; padding-bottom: 20px; }
            
            /* Page Break Control */
            h1, h2, h3, h4 { page-break-after: avoid; }
            img { page-break-inside: avoid; }
        }
    </style>`;
};