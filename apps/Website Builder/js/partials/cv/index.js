/* Website Builder/js/partials/cv/index.js */
const CVView = `
    <div id="tab-cv" class="tab-content" style="display:none; height:100%; overflow-y:auto; background:var(--bg-primary);">
        ${CvStyles}
        <div class="cv-container">
            <!-- Sticky Header -->
            <div class="cv-header-sticky">
                <div class="cv-header-title">
                    <h2>Resume Builder</h2>
                    <span>Craft your professional story</span>
                </div>
                <button class="btn btn-primary btn-sm" onclick="UI.printCV()">
                    <span class="material-icons-round" style="font-size:18px">print</span> Print / Save PDF
                </button>
            </div>

            ${CvSections.personal}
            ${CvSections.contact}
            ${CvSections.experience}
            ${CvSections.projects}
            ${CvSections.education}
            ${CvSections.skills}
            ${CvSections.custom}
            
            <div style="text-align:center; padding: 40px 0; opacity:0.6; font-size:0.85rem;">
                Changes save automatically
            </div>
        </div>
    </div>
`;