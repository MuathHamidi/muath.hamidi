import { app } from '../core.js';

app.showModal = (html) => {
    document.getElementById('modal-content').innerHTML = html;
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('hidden');
    // slight delay for animation
    setTimeout(() => {
        document.getElementById('modal-content').classList.remove('scale-95');
        document.getElementById('modal-content').classList.add('scale-100');
    }, 10);
    lucide.createIcons();
};

app.closeModal = () => {
    document.getElementById('modal-content').classList.remove('scale-100');
    document.getElementById('modal-content').classList.add('scale-95');
    setTimeout(() => {
        document.getElementById('modal-overlay').classList.add('hidden');
    }, 150); // match transition duration
};