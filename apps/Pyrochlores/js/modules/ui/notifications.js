/* js/modules/ui/notifications.js */
export function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return; // Guard clause
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    const close = document.createElement('span');
    close.innerHTML = ' &times;';
    close.style.cursor = 'pointer';
    close.onclick = () => toast.remove();
    toast.appendChild(close);
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}