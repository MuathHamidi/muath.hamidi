/* Unified Media Template (Image, Video, Audio) */
Editor.Templates.media = function(block, index) {
    const type = block.mediaType || 'image';

    return `
        <div class="prop-section">
            <div class="prop-section-title">Media Content</div>
            
            <!-- New Unified Control -->
            ${Editor.Helpers.mediaControl(index, block.src, type)}
            
            <div class="form-group" style="margin-top:15px;">
                <label>Caption / Alt Text</label>
                <input type="text" value="${block.caption || ''}" placeholder="Description for accessibility" oninput="Editor.updateBlock(${index}, 'caption', this.value)">
            </div>
        </div>

        <div class="prop-section">
            <div class="prop-section-title">Media Type Override</div>
             <div class="segmented-control">
                <button class="segmented-btn ${type==='image'?'active':''}" onclick="Editor.updateBlock(${index}, 'mediaType', 'image', true)">Image</button>
                <button class="segmented-btn ${type==='video'?'active':''}" onclick="Editor.updateBlock(${index}, 'mediaType', 'video', true)">Video</button>
                <button class="segmented-btn ${type==='audio'?'active':''}" onclick="Editor.updateBlock(${index}, 'mediaType', 'audio', true)">Audio</button>
            </div>
        </div>
    `;
};