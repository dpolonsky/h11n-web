# h11n-web

A simple static website for serving PDF, DOC, HTML files and images using GitHub Pages.

## Structure

```
/
├── index.html       # Main file browser page
├── pdfs/           # PDF files directory
├── docs/           # DOC files directory  
├── pages/          # HTML pages directory
└── images/         # Images directory
```

## Setup

1. Push your files to the `main` branch
2. Enable GitHub Pages in repository settings (Settings → Pages)
3. Select source: `main` branch and folder: `/ (root)`
4. Add your files to the corresponding directories:
   - PDF files → `pdfs/`
   - DOC files → `docs/`
   - HTML files → `pages/`
   - Images → `images/`

## Customization

Edit `index.html` and update the `files` object in the JavaScript section to list your files:

```javascript
const files = {
    pdfs: [
        { name: 'My Document', path: 'pdfs/mydocument.pdf' }
    ],
    docs: [
        { name: 'Report.doc', path: 'docs/report.doc' }
    ],
    html: [
        { name: 'About', path: 'pages/about.html' }
    ],
    images: [
        { name: 'Photo', path: 'images/photo.jpg' }
    ]
};
```

Your site will be available at: `https://username.github.io/h11n-web/`
