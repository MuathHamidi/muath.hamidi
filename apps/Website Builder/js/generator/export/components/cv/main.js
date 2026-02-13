/* Main CV Builder Entry */
Generator.buildCV = function(data) {
    if(!data.cv.name) return '';

    const cv = data.cv;
    const s = cv.settings || { skillStyle: 'tags', showPhoto: true, accentColor: '#3b82f6' };
    
    // Components
    const components = {
        expHTML: Generator.CV.renderExperience(cv.entries),
        eduHTML: Generator.CV.renderEducation(cv.education),
        projHTML: Generator.CV.renderProjects(cv.projects),
        skillHTML: Generator.CV.renderSkills(cv.skills, s.skillStyle),
        langHTML: Generator.CV.renderLanguages(cv.languages),
        certHTML: Generator.CV.renderCerts(cv.certifications),
        contactHTML: Generator.CV.renderContact(cv.contact),
        // NEW
        customHTML: Generator.CV.renderCustom(cv.custom)
    };

    // Always return Modern layout
    if(Generator.CV.Layouts && Generator.CV.Layouts.modern) {
        return Generator.CV.Layouts.modern(cv, components, data, s);
    }

    return '';
};