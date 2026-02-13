Generator.buildNav = function(data) {
    const navLinks = data.pages.map((p, i) => 
        `<a href="#${p.id}" onclick="route('${p.id}')" class="nav-link ${i===0?'active':''}" id="nav-${p.id}">${p.title}</a>`
    ).join('');

    return navLinks + (data.cv.name ? `<a href="#cv" onclick="route('cv')" class="nav-link" id="nav-cv">Resume</a>` : '');
};