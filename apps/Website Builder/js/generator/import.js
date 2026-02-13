Generator.importWebsite = function(inputElement) {
    const file = inputElement.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const htmlContent = e.target.result;
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');
            
            const scriptTag = doc.getElementById('builder-state');
            if (scriptTag) {
                const importedState = JSON.parse(scriptTag.textContent);
                Data.loadState(importedState);
                UI.init(); // Refresh UI
                UI.notify('Website Imported Successfully!');
            } else {
                alert('Error: This file does not contain compatible WebBuilder data.');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to parse the file.');
        }
    };
    reader.readAsText(file);
    // Reset input
    inputElement.value = '';
};