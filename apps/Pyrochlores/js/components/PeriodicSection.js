export function getPeriodicSectionHTML() {
    return `
        <section class="periodic-section">
            <div class="ptable-wrapper" id="ptable"></div>
            <div class="legend">
                <span class="dot" style="background:var(--bg-hover)"></span> No Data
                <span class="dot" style="background:#2d4a57; margin-left:8px;"></span> Low
                <span class="dot" style="background:#4cc9f0; margin-left:8px;"></span> High Count
                <div style="flex:1"></div>
                <span class="dot selected-a"></span> Site A
                <span class="dot selected-b"></span> Site B
            </div>
        </section>
    `;
}