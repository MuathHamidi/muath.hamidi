/* js/components/index.js */
import { getSidebarHTML } from './Sidebar.js';
import { getPeriodicSectionHTML } from './PeriodicSection.js';
import { getResultsGridHTML } from './ResultsGrid.js';
// Updated Import to the new directory
import { getModalsHTML } from './modals/index.js';

export function renderLayout() {
    const root = document.getElementById('app-root');
    if (!root) return;

    root.innerHTML = `
        ${getSidebarHTML()}
        <main class="main-content">
            ${getPeriodicSectionHTML()}
            ${getResultsGridHTML()}
        </main>
        ${getModalsHTML()}
    `;
}