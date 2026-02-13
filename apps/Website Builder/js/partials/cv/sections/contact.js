CvSections.contact = `
<!-- 2. CONTACT & SOCIALS -->
<details>
    <summary>
        <span class="material-icons-round section-icon">contact_mail</span> Contact & Socials
    </summary>
    <div class="cv-section-content">
        <div class="grid-2">
            <div class="form-group">
                <label>Email Address</label>
                <input type="text" id="cvEmail" oninput="Data.save()">
            </div>
            <div class="form-group">
                <label>Phone Number</label>
                <input type="text" id="cvPhone" oninput="Data.save()">
            </div>
        </div>
        <div class="grid-2">
            <div class="form-group">
                <label>Location (City, Country)</label>
                <input type="text" id="cvLocation" oninput="Data.save()">
            </div>
            <div class="form-group">
                <label>Website / Portfolio URL</label>
                <input type="text" id="cvWebsite" oninput="Data.save()" placeholder="https://mysite.com">
            </div>
        </div>
        <div class="grid-2">
            <div class="form-group">
                <label>LinkedIn URL</label>
                <input type="text" id="cvLinkedin" oninput="Data.save()" placeholder="https://linkedin.com/in/...">
            </div>
            <div class="form-group">
                <label>GitHub URL</label>
                <input type="text" id="cvGithub" oninput="Data.save()" placeholder="https://github.com/...">
            </div>
        </div>
    </div>
</details>`;