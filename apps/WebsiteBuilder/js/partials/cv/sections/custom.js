/* Website Builder/js/partials/cv/sections/custom.js */

CvSections.custom = `
<!-- 7. CUSTOM SECTIONS -->
<details>
    <summary>
        <span class="material-icons-round section-icon">dashboard_customize</span> Custom Sections
    </summary>
    <div class="cv-section-content">
        <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:15px;">
            Add flexible sections for Awards, Publications, Volunteering, etc.
        </div>
        
        <div id="cvCustomContainer"></div>

        <button class="btn btn-primary btn-full" onclick="UI.addCustomSection()" style="margin-top:20px;">
            <span class="material-icons-round">add_circle</span> Create New Section
        </button>
    </div>
</details>
`;