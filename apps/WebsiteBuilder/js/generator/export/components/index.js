Generator.buildExportComponents = function(data) {
    return { 
        fullNav: this.buildNav(data), 
        pagesHTML: this.buildPages(data), 
        cvHTML: this.buildCV(data) 
    };
};