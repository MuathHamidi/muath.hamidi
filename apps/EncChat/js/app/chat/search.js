import { app } from '../core.js';

app.handleSearch = () => {
    const searchInput = document.getElementById('chat-search');
    app.searchQuery = searchInput.value.trim();
    app.renderMessages(); // re-render and re-decrypt on the fly
};