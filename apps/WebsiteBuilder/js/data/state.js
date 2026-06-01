/* Website Builder/js/data/state.js */
const DEFAULT_STATE = {
    pages: [
        { 
            id: 1, 
            title: 'Home', 
            blocks: [
                { 
                    id: 'b1', type: 'hero', 
                    title: 'Design the Future', 
                    subtitle: 'Create stunning, responsive websites in minutes.', 
                    ctaText: 'Get Started',
                    bg: '',
                    styles: { align: 'center', padding: '100', bg: '#1a1a1a', color: '#ffffff' }
                }
            ] 
        }
    ],
    cv: { 
        name: '', 
        title: '', 
        summary: '',
        contact: { 
            email: '', phone: '', location: '', website: '', linkedin: '', github: ''
        },
        settings: {
            layout: 'modern',    
            showPhoto: true,
            accentColor: '#3b82f6'
        },
        entries: [],   
        education: [], 
        skills: [],
        projects: [],
        languages: [],
        certifications: [],
        custom: [] 
    },
    settings: {
        title: 'New Website', 
        author: '', 
        theme: 'dark', 
        accent: '#6c5ce7', 
        fontHeading: 'Inter', 
        fontBody: 'Inter', 
        profileImg: '', 
        footerText: '',
        borderRadius: '8', 
        buttonStyle: 'rounded' 
    }
};

const Data = {
    state: JSON.parse(JSON.stringify(DEFAULT_STATE)),
    history: [],
    historyIndex: -1,
    MAX_HISTORY: 20
};