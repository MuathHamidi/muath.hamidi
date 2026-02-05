const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const toggleIcon = themeToggle.querySelector('i');

function initTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
        html.classList.remove('dark');
        toggleIcon.className = 'fa-solid fa-moon text-lg';
    } else {
        html.classList.add('dark');
        toggleIcon.className = 'fa-solid fa-sun text-lg';
    }
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggleIcon.className = isDark ? 'fa-solid fa-sun text-lg' : 'fa-solid fa-moon text-lg';
});
initTheme();