CvSections.experience = `
<!-- 3. WORK EXPERIENCE -->
<details>
    <summary>
        <span class="material-icons-round section-icon">work</span> Work Experience
    </summary>
    <div class="cv-section-content">
        <div style="display:flex; justify-content:flex-end; margin-bottom:10px;">
            <button class="btn btn-sm btn-outline" onclick="UI.autoSortCV()">
                <span class="material-icons-round" style="font-size:16px;">sort</span> Auto-Sort by Date
            </button>
        </div>
        <div id="cvEntries"></div>
        <button class="btn btn-outline btn-full" onclick="UI.addCVEntry()">
            <span class="material-icons-round">add</span> Add Position
        </button>
    </div>
</details>`;