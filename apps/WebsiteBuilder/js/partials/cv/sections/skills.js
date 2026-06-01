CvSections.skills = `
<!-- 6. SKILLS & EXTRAS -->
<details>
    <summary>
        <span class="material-icons-round section-icon">psychology</span> Skills & Extras
    </summary>
    <div class="cv-section-content">
        
        <!-- Skills -->
        <h4 style="margin:0 0 10px 0; color:var(--text-secondary); font-size:0.8rem; text-transform:uppercase;">Technical Skills</h4>
        <div id="cvSkills" style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:20px;"></div>
        <button class="btn btn-outline btn-sm btn-full" onclick="UI.addSkill()" style="margin-bottom:25px;">
            <span class="material-icons-round">add</span> Add Skill
        </button>

        <!-- Languages -->
        <h4 style="margin:0 0 10px 0; color:var(--text-secondary); font-size:0.8rem; text-transform:uppercase; border-top:1px solid var(--border); padding-top:20px;">Languages</h4>
        <div id="cvLanguages" style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:20px;"></div>
        <button class="btn btn-outline btn-sm btn-full" onclick="UI.addLanguage()" style="margin-bottom:25px;">
            <span class="material-icons-round">add</span> Add Language
        </button>

        <!-- Certifications -->
        <h4 style="margin:0 0 10px 0; color:var(--text-secondary); font-size:0.8rem; text-transform:uppercase; border-top:1px solid var(--border); padding-top:20px;">Certifications</h4>
        <div id="cvCerts"></div>
        <button class="btn btn-outline btn-sm btn-full" onclick="UI.addCert()">
            <span class="material-icons-round">add</span> Add Certification
        </button>
        
    </div>
</details>`;