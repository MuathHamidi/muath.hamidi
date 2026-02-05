function cleanTeX(str) {
    if (!str) return "";
    return str.replace(/[\{\}]/g, '').replace(/\\/g, '');
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

function copyText(text) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        showToast("Copied to clipboard!");
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function copyToClipboard(elementId) {
    const el = document.getElementById(elementId);
    if (el) copyText(el.innerText);
}

function downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    showToast("Download started");
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast) return;
    
    toastMsg.innerText = msg;
    toast.classList.remove('opacity-0', 'translate-y-24');
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-24');
    }, 2500);
}