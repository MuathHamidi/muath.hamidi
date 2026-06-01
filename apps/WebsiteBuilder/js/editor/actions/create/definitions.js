// Holds the raw data structure for new blocks
Editor.BlockDefinitions = {
    // Basic
    'heading': {
        level: 'h2',
        value: 'New Heading'
    },
    'text': {
        value: 'Start typing your text here...'
    },
    'media': {
        mediaType: 'image',
        src: 'https://via.placeholder.com/800x400',
        caption: '',
        value: undefined // removed
    },
    'table': {
        rows: 3,
        cols: 3,
        data: [
            ['Header 1', 'Header 2', 'Header 3'],
            ['Cell 1-1', 'Cell 1-2', 'Cell 1-3'],
            ['Cell 2-1', 'Cell 2-2', 'Cell 2-3']
        ],
        styles: { align: 'left' },
        value: undefined
    },
    'list': {
        items: ['List Item 1', 'List Item 2'],
        value: undefined
    },
    'button': {
        text: 'Click Me',
        url: '#',
        styles: { align: 'center', width: 'auto' },
        value: undefined
    },
    'quote': {
        text: 'Inspirational Quote',
        author: 'Author',
        styles: { bg: 'rgba(255,255,255,0.05)' },
        value: undefined
    },
    'code': {
        code: 'console.log("Hello");',
        lang: 'javascript',
        value: undefined
    },
    'divider': {
        style: 'solid',
        styles: { padding: '40' },
        value: undefined
    },
    'spacer': {
        height: '50',
        value: undefined
    },

    // Layout
    'text-media': {
        layout: 'left',
        mediaType: 'image',
        src: 'https://via.placeholder.com/600x400',
        title: 'Engaging Title',
        text: 'Describe your media here.',
        value: undefined
    },
    'hero': {
        title: 'Hero Section',
        subtitle: 'Catchy tagline goes here',
        bg: '',
        ctaText: 'Call to Action',
        styles: { padding: '80', align: 'center' },
        value: undefined
    },
    'features': {
        items: [{ title: 'Feature 1', text: 'Description', icon: 'star' }],
        styles: { padding: '60' },
        value: undefined
    },

    // Advanced
    'pricing': {
        items: [
            { plan: 'Basic', price: '$9', features: 'Feature A\nFeature B', highlight: false },
            { plan: 'Pro', price: '$29', features: 'Everything in Basic\nFeature C\nFeature D', highlight: true }
        ],
        styles: { align: 'center' },
        value: undefined
    },
    'testimonials': {
        items: [
            { name: 'Jane Doe', role: 'CEO', quote: 'Amazing service! Highly recommended.', img: '' },
            { name: 'John Smith', role: 'Developer', quote: 'The best tool I have ever used.', img: '' }
        ],
        styles: { bg: 'var(--bg-secondary)' },
        value: undefined
    },
    'faq': {
        items: [
            { question: 'Is this free?', answer: 'Yes, there is a free tier available.' },
            { question: 'How do I export?', answer: 'Click the Export button in the top right.' }
        ],
        value: undefined
    },
    'contact': {
        title: 'Contact Us',
        email: 'email@example.com',
        fields: [
            { type: 'text', label: 'Name', required: true },
            { type: 'email', label: 'Email', required: true },
            { type: 'textarea', label: 'Message', required: true }
        ],
        submitText: 'Send Message',
        styles: { bg: 'var(--bg-secondary)', paddingTop: '60', paddingBottom: '60' },
        value: undefined
    }
};