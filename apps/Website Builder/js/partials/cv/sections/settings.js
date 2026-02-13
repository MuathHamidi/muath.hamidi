CvSections.settings = `
<!-- 0. CV SETTINGS -->
<div style="background:var(--bg-tertiary); padding:20px; border-radius:8px; border:1px solid var(--border); margin-bottom:20px;">
    <h3 style="margin-top:0; color:var(--accent); display:flex; align-items:center; gap:8px;">
        <span class="material-icons-round">tune</span> CV Configuration
    </h3>
    <div class="grid-2">
        <div class="form-group">
            <label>CV Accent Color</label>
            <input type="color" id="cvAccent" onchange="UI.updateCVSettings('accentColor', this.value)">
        </div>
        <div class="form-group">
            <label>Skill Visualization</label>
            <select id="cvSkillStyle" onchange="UI.updateCVSettings('skillStyle', this.value)">
                <option value="tags">Tags (Standard)</option>
                <option value="bars">Progress Bars</option>
            </select>
        </div>
    </div>
    <div class="form-group" style="margin-bottom:0;">
        <label style="display:flex; align-items:center; gap:10px; cursor:pointer; font-weight:normal; text-transform:none;">
            <input type="checkbox" id="cvShowPhoto" onchange="UI.updateCVSettings('showPhoto', this.checked)" style="width:auto;"> 
            Show Profile Photo on CV
        </label>
    </div>
</div>`;