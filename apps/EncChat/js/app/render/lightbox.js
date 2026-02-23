import { app } from '../core.js';

app.openLightbox = (src) => {
    const overlay = document.getElementById('lightbox-overlay');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    overlay.classList.remove('hidden');
    lucide.createIcons();
};

app.closeLightbox = () => {
    const overlay = document.getElementById('lightbox-overlay');
    overlay.classList.add('hidden');
    setTimeout(() => {
        document.getElementById('lightbox-img').src = '';
    }, 200);
};