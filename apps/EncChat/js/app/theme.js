import { app } from './core.js';
import DB from '../db.js';

// Helper to convert arbitrary HEX string to distinct R G B values
const hexToRgb = (hex) => {
    let r = 0, g = 0, b = 0;
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    }
    return { r, g, b };
};

// Helper to clamp color values to generate hover/light shades dynamically
const clamp = (val) => Math.max(0, Math.min(255, val));

app.applyUserTheme = () => {
    let config = DB.currentUser?.settings?.themeConfig;
    if (!config) {
        config = { preset: 'dark', noise: '0.5', accent: '#8ab4f8' };
    }

    // Apply base preset (dark/light)
    document.body.setAttribute('data-theme', config.preset);

    // Apply granular overrides via inline root CSS variables to the body tag
    const root = document.body;
    root.style.setProperty('--noise-opacity', config.noise);
    
    // Dynamic RGB generation for the Accent Color
    if (config.accent && config.accent.startsWith('#')) {
        const { r, g, b } = hexToRgb(config.accent);
        root.style.setProperty('--color-accent', `${r} ${g} ${b}`);
        
        // Darken for hover, Lighten for muted highlights
        root.style.setProperty('--color-accent-hover', `${clamp(r - 35)} ${clamp(g - 35)} ${clamp(b - 35)}`);
        root.style.setProperty('--color-accent-light', `${clamp(r + 35)} ${clamp(g + 35)} ${clamp(b + 35)}`);
    }
};

app.updateThemeParam = async (key, value) => {
    if (!DB.currentUser) return;
    
    if (!DB.currentUser.settings.themeConfig) {
        DB.currentUser.settings.themeConfig = { preset: 'dark', noise: '0.5', accent: '#8ab4f8' };
    }
    
    // Update value
    DB.currentUser.settings.themeConfig[key] = value;
    
    // Apply changes immediately for real-time feedback
    app.applyUserTheme();
    
    // Update UI active states dynamically (for presets only)
    if (key === 'preset') {
        document.querySelectorAll(`[data-theme-key="${key}"]`).forEach(el => {
            if (el.dataset.themeVal === String(value)) {
                el.classList.add('border-indigo-500', 'ring-2', 'ring-indigo-500/30', 'bg-gray-700');
                el.classList.remove('border-gray-700', 'bg-gray-800');
            } else {
                el.classList.remove('border-indigo-500', 'ring-2', 'ring-indigo-500/30', 'bg-gray-700');
                el.classList.add('border-gray-700', 'bg-gray-800');
            }
        });
    }

    // Background save to DB Vault
    DB.users[DB.currentUser.username].settings = DB.currentUser.settings;
    await app.saveDB();
};