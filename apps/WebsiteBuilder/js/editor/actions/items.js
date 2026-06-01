/* List Actions */
Editor.addListItem = function(idx) {
    Data.state.pages[this.currentPageIndex].blocks[idx].items.push('New Item');
    Data.save(); this.renderCanvas(); this.renderProperties();
};
Editor.updateListItem = function(bIdx, iIdx, val) {
    Data.state.pages[this.currentPageIndex].blocks[bIdx].items[iIdx] = val;
    Data.save(); this.renderCanvas();
};
Editor.removeListItem = function(bIdx, iIdx) {
    Data.state.pages[this.currentPageIndex].blocks[bIdx].items.splice(iIdx, 1);
    Data.save(); this.renderCanvas(); this.renderProperties();
};

/* Feature Actions */
Editor.addFeatureItem = function(idx) {
    Data.state.pages[this.currentPageIndex].blocks[idx].items.push({ title: 'New', text: 'Desc', icon: 'star' });
    Data.save(); this.renderCanvas(); this.renderProperties();
};
Editor.updateFeature = function(bIdx, iIdx, f, v) {
    Data.state.pages[this.currentPageIndex].blocks[bIdx].items[iIdx][f] = v;
    Data.save(); this.renderCanvas();
};
Editor.removeFeatureItem = function(bIdx, iIdx) {
    Data.state.pages[this.currentPageIndex].blocks[bIdx].items.splice(iIdx, 1);
    Data.save(); this.renderCanvas(); this.renderProperties();
};