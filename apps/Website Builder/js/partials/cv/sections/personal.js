CvSections.personal = `
<!-- 1. PERSONAL DETAILS -->
<details open>
    <summary>
        <span class="material-icons-round section-icon">person</span> Personal Details
    </summary>
    <div class="cv-section-content">
        
        <!-- NEW: Photo Upload -->
        <div class="photo-upload-wrapper">
            <img id="cvPhotoPreview" class="photo-preview" src="https://via.placeholder.com/150?text=Photo">
            <div class="photo-controls">
                <label style="display:block; margin-bottom:5px; font-weight:600;">Profile Photo</label>
                <input type="file" accept="image/*" onchange="UI.handlePhotoUpload(this)" style="font-size:0.85rem;">
                <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:5px;">
                    This image will appear on supported layouts (Modern, Creative).
                </div>
            </div>
        </div>

        <div class="grid-2">
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" id="cvName" oninput="Data.save()">
            </div>
            <div class="form-group">
                <label>Professional Title</label>
                <input type="text" id="cvTitle" oninput="Data.save()" placeholder="e.g. Senior Product Designer">
            </div>
        </div>
        <div class="form-group">
            <label>Professional Summary</label>
            <textarea id="cvSummary" style="height:120px" oninput="Data.save()" placeholder="Briefly describe your experience and goals..."></textarea>
        </div>
    </div>
</details>`;