const CvStyles = `
<style>
    /* Main Layout */
    .cv-container { 
        max-width: 900px; 
        margin: 0 auto; 
        padding: 0 20px 100px 20px;
        animation: fadeIn 0.4s ease;
    }
    
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    /* Sticky Header - Theme Adaptive */
    .cv-header-sticky {
        position: sticky;
        top: 0;
        z-index: 50;
        background: var(--bg-glass); /* Uses theme variable */
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--border);
        margin: 0 -20px 25px -20px;
        padding: 15px 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: var(--shadow-sm);
        transition: background 0.3s, border-color 0.3s;
    }

    .cv-header-title h2 { 
        margin: 0; 
        font-size: 1.2rem; 
        letter-spacing: -0.5px; 
        color: var(--text-primary); /* Explicit theme color */
    }
    .cv-header-title span { 
        font-size: 0.8rem; 
        color: var(--text-secondary); 
        font-weight: 500; 
    }

    /* Modern Accordion */
    details { 
        background: var(--bg-secondary); 
        border: 1px solid var(--border); 
        border-radius: var(--radius-md); 
        margin-bottom: 16px; 
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    details[open] {
        border-color: var(--accent);
        box-shadow: var(--shadow-md);
        background: var(--bg-secondary);
    }

    summary { 
        padding: 18px 24px; 
        cursor: pointer; 
        font-weight: 600; 
        color: var(--text-primary);
        display: flex;
        align-items: center;
        gap: 15px;
        list-style: none;
        transition: background 0.2s;
        user-select: none;
    }
    
    summary:hover { background: var(--bg-tertiary); }
    summary::-webkit-details-marker { display: none; }
    
    summary .section-icon { 
        color: var(--accent); 
        background: rgba(139, 92, 246, 0.1);
        padding: 8px;
        border-radius: 8px;
        font-size: 20px;
        transition: transform 0.2s;
    }

    details[open] summary .section-icon {
        background: var(--accent);
        color: white;
        transform: scale(1.1);
    }

    summary::after {
        content: 'expand_more';
        font-family: 'Material Icons Round';
        margin-left: auto;
        font-size: 1.5rem;
        color: var(--text-secondary);
        transition: transform 0.3s ease;
    }
    
    details[open] summary::after { transform: rotate(180deg); color: var(--text-primary); }
    
    .cv-section-content { 
        padding: 25px; 
        border-top: 1px solid var(--border);
        background: var(--bg-primary); 
        animation: slideDown 0.3s ease;
    }

    @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

    /* Entry Cards */
    .cv-card { 
        background: var(--bg-secondary); 
        padding: 20px; 
        border-radius: var(--radius-sm); 
        margin-bottom: 15px; 
        border: 1px solid var(--border);
        border-left: 3px solid var(--border);
        transition: all 0.2s ease;
    }
    
    .cv-card:hover { 
        transform: translateY(-2px); 
        border-left-color: var(--accent);
        box-shadow: var(--shadow-sm);
    }

    .cv-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--border);
    }

    .cv-card-title {
        font-weight: 700;
        font-size: 0.9rem;
        color: var(--text-primary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: flex; align-items: center; gap: 8px;
    }

    .action-icon {
        color: var(--text-secondary);
        cursor: pointer;
        padding: 6px;
        border-radius: 4px;
        transition: 0.2s;
    }
    .action-icon:hover { background: var(--bg-tertiary); color: var(--text-primary); }
    .action-icon.delete:hover { background: rgba(255, 59, 48, 0.1); color: #ff3b30; }

    /* Photo Upload Styling */
    .photo-upload-wrapper {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 20px;
        padding: 15px;
        background: var(--bg-secondary);
        border-radius: var(--radius-sm);
        border: 1px solid var(--border);
    }
    .photo-preview {
        width: 80px; height: 80px;
        border-radius: 50%;
        object-fit: cover;
        background: var(--bg-tertiary);
        border: 2px solid var(--border);
    }
    .photo-controls { flex: 1; }

    /* Form Controls */
    input, textarea, select { 
        background: var(--bg-tertiary); 
        color: var(--text-primary);
        border-color: var(--border);
    }
    input:focus, textarea:focus { 
        background: var(--bg-primary); 
        border-color: var(--accent);
    }
    label { color: var(--text-secondary); }

    /* Skill Chips */
    .skill-chip {
        display: flex;
        align-items: center;
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        padding: 6px 6px 6px 12px;
        border-radius: 30px;
        gap: 8px;
        transition: 0.2s;
        flex: 1 1 auto;
        max-width: 250px;
    }
    
    .skill-chip:focus-within {
        border-color: var(--accent);
        box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
    }

    .skill-chip input {
        border: none;
        background: transparent;
        padding: 0;
        font-size: 0.9rem;
        width: 100%;
        color: var(--text-primary);
    }
    .skill-chip input:focus { outline: none; box-shadow: none; }

</style>
`;