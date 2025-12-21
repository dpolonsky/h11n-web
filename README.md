# h11n-web

A dynamic web application with constantly updating pages, serving PDF, DOC, HTML files and images using GitHub Pages.

## Structure

```
/
├── index.html       # Main application page with dynamic routing
├── 404.html         # GitHub Pages fallback for SPA routing
├── js/              # JavaScript files
│   ├── router.js           # Dynamic router system
│   ├── page-generator.js   # Page type generators
│   ├── page-initializers.js # Page initialization logic
│   └── data-api.js         # Data API simulation
├── css/             # Stylesheets
│   └── dynamic-pages.css   # Dynamic pages styling
├── pdfs/           # PDF files directory
├── docs/           # DOCX files directory  
├── pages/          # HTML pages directory
├── images/         # Images directory
├── pptx/           # PowerPoint files directory
└── xlsx/           # Excel files directory
```

## Setup

1. Push your files to the `main` branch
2. Enable GitHub Pages in repository settings (Settings → Pages)
3. Select source: `main` branch and folder: `/ (root)`
4. Add your files to the corresponding directories:
   - PDF files → `pdfs/`
   - DOCX files → `docs/`
   - HTML files → `pages/`
   - Images → `images/`
   - PPTX files → `pptx/`
   - XLSX files → `xlsx/`

## Customization

Edit `index.html` and update the `files` object in the JavaScript section to list your files:

```javascript
const files = {
    pdfs: [
        { name: 'My Document', path: 'pdfs/mydocument.pdf' }
    ],
    docs: [
        { name: 'Report.docx', path: 'docs/report.docx' }
    ],
    html: [
        { name: 'About', path: 'pages/about.html' }
    ],
    images: [
        { name: 'Photo', path: 'images/photo.jpg' }
    ],
    pptx: [
        { name: 'Presentation', path: 'pptx/presentation.pptx' }
    ],
    xlsx: [
        { name: 'Data', path: 'xlsx/data.xlsx' }
    ]
};
```

Your site will be available at: `https://username.github.io/h11n-web/`

## Dynamic Pages Features

This application includes a dynamic routing system with constantly updating pages:

- **Dashboard**: Real-time metrics and charts that update every 3 seconds
- **Content**: Content management with search, filtering, and pagination
- **Data**: Live data visualization with streaming updates every 2 seconds
- **Feed**: Auto-refreshing feed with new items every 5 seconds
- **Analytics**: Analytics dashboard with periodic updates
- **Settings**: User preferences and configuration

### GitHub Pages Compatibility

The application uses **hash-based routing** (`#/dashboard` instead of `/dashboard`) for full GitHub Pages compatibility. This ensures:
- ✅ All routes work without server configuration
- ✅ Direct URL access works (e.g., `yoursite.github.io/h11n-web/#dashboard`)
- ✅ Browser back/forward buttons work correctly
- ✅ No 404 errors on page refresh

The `404.html` file serves as a fallback for any direct path access, redirecting to the main application.
