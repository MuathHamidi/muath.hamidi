Editor.Templates.hero = function(block, index) {
    // Detect if background is likely a video
    const isVideo = block.bg && (block.bg.includes('mp4') || block.bg.includes('webm') || block.bg.includes('data:video'));
    const type = isVideo ? 'video' : 'image';

    return `
        <div class="prop-section">
            <div class="prop-section-title">Hero Content</div>
            <div class="form-group">
                <label>Headline</label>
                <textarea style="height:60px" oninput="Editor.updateBlock(${index}, 'title', this.value)">${block.title || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Subtitle</label>
                <textarea style="height:50px" oninput="Editor.updateBlock(${index}, 'subtitle', this.value)">${block.subtitle || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Call to Action Button</label>
                <input type="text" value="${block.ctaText || ''}" placeholder="Button Text" oninput="Editor.updateBlock(${index}, 'ctaText', this.value)">
            </div>
        </div>

        <div class="prop-section">
            <div class="prop-section-title">Background Media</div>
            <!-- Unified Control -->
            ${Editor.Helpers.mediaControl(index, block.bg, type)}
            <div style="margin-top:5px; font-size:0.7rem; color:var(--text-secondary);">
                Tip: Use the "Appearance" tab to adjust the overlay opacity for better text readability.
            </div>
        </div>
    `;
};