/* Website Builder/js/partials/settings.js */
const SettingsView = `
    <div id="tab-settings" class="tab-content" style="display:none;">
        <div class="content-wrapper">
            <h2>Site Configuration</h2>
            
            <!-- Global Design System -->
            <div style="background:var(--bg-tertiary); padding:20px; border-radius:8px; border:1px solid var(--border); margin-bottom:30px;">
                <h3 style="margin-bottom:15px; color:var(--accent);">Global Design System</h3>
                <div class="grid-2">
                    <div class="form-group">
                        <label>Global Border Radius: <span id="lblRadius">8px</span></label>
                        <input type="range" min="0" max="30" step="2" id="globalRadius" 
                            oninput="document.getElementById('lblRadius').innerText=this.value+'px'; Data.state.settings.borderRadius=this.value; Data.save();">
                    </div>
                    <div class="form-group">
                        <label>Button Style</label>
                        <select id="globalBtnStyle" onchange="Data.state.settings.buttonStyle=this.value; Data.save();">
                            <option value="rounded">Rounded (Default)</option>
                            <option value="pill">Pill (Oval)</option>
                            <option value="sharp">Sharp (Square)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="grid-2">
                <div class="form-group">
                    <label>Website Title</label>
                    <input type="text" id="siteTitle" oninput="Data.save()" placeholder="My Portfolio">
                </div>
                <div class="form-group">
                    <label>Author</label>
                    <input type="text" id="siteAuthor" oninput="Data.save()" placeholder="John Doe">
                </div>
            </div>

            <div class="grid-2">
                <div class="form-group">
                    <label>Accent Color</label>
                    <input type="color" id="accentColor" value="#bb86fc" oninput="UI.updateAccent(this.value); Data.save()">
                </div>
                <div class="form-group">
                    <label>Visitor Theme Default</label>
                    <select id="defaultTheme" onchange="Data.save()">
                        <option value="dark">Dark Mode</option>
                        <option value="light">Light Mode</option>
                    </select>
                </div>
            </div>
            
            <div class="grid-2">
                <div class="form-group">
                    <label>Heading Font</label>
                    <select id="fontHeading" onchange="Data.save()">
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Playfair Display">Playfair Display</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Oswald">Oswald</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Body Font</label>
                    <select id="fontBody" onchange="Data.save()">
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Open Sans">Open Sans</option>
                        <option value="Lato">Lato</option>
                        <option value="Merriweather">Merriweather</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label>Profile Image URL</label>
                <input type="text" id="profileImg" oninput="Data.save()" placeholder="https://...">
            </div>
            
            <div class="form-group">
                <label>Footer Text</label>
                <input type="text" id="footerText" oninput="Data.save()" placeholder="All rights reserved.">
            </div>
        </div>
    </div>
    <script>
        // Inject logic to pre-fill these specific inputs on load since they aren't in standard Data.init
        window.addEventListener('load', () => {
            setTimeout(() => {
                if(Data.state.settings.borderRadius) {
                    document.getElementById('globalRadius').value = Data.state.settings.borderRadius;
                    document.getElementById('lblRadius').innerText = Data.state.settings.borderRadius + 'px';
                }
                if(Data.state.settings.buttonStyle) {
                    document.getElementById('globalBtnStyle').value = Data.state.settings.buttonStyle;
                }
            }, 500);
        });
    </script>
`;