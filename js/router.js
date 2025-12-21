// Dynamic Router System
class DynamicRouter {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        this.pageTypes = {
            dashboard: 'Dashboard',
            content: 'Content',
            data: 'Data Visualization',
            feed: 'Feed',
            analytics: 'Analytics',
            settings: 'Settings'
        };
        this.init();
    }

    init() {
        // Register all routes (using hash-based routing for GitHub Pages compatibility)
        this.registerRoute('', () => this.showHomePage());
        this.registerRoute('dashboard', () => this.showPage('dashboard'));
        this.registerRoute('content', () => this.showPage('content'));
        this.registerRoute('data', () => this.showPage('data'));
        this.registerRoute('feed', () => this.showPage('feed'));
        this.registerRoute('analytics', () => this.showPage('analytics'));
        this.registerRoute('settings', () => this.showPage('settings'));

        // Handle browser navigation (hash-based for GitHub Pages)
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('popstate', () => this.handleRoute());
        this.handleRoute();
    }

    registerRoute(path, handler) {
        this.routes.set(path, handler);
    }

    navigate(path) {
        // Use hash-based routing for GitHub Pages compatibility
        // Remove leading slash if present
        const cleanPath = path.replace(/^\/+/, '');
        window.location.hash = cleanPath ? '#' + cleanPath : '';
        this.handleRoute();
    }

    handleRoute() {
        // Get route from hash (GitHub Pages compatible)
        let path = window.location.hash.slice(1); // Remove '#'
        if (!path) path = ''; // Default to home
        
        const handler = this.routes.get(path) || this.routes.get('');
        if (handler) {
            handler();
        }
    }

    showHomePage() {
        const app = document.getElementById('app');
        if (!app) return;
        
        // Hide any dynamic page content
        const dynamicPages = app.querySelectorAll('.dynamic-page');
        dynamicPages.forEach(page => page.remove());
        
        // Show the file browser container
        const container = document.getElementById('home-container');
        if (container) {
            container.style.display = 'block';
        }
    }

    async showPage(type) {
        const app = document.getElementById('app');
        if (!app) return;
        
        // Clean up any existing intervals from previous pages
        this.cleanupIntervals();
        
        // Hide the file browser container
        const container = app.querySelector('.container');
        if (container) {
            container.style.display = 'none';
        }
        
        // Remove any existing dynamic pages
        const existingPages = app.querySelectorAll('.dynamic-page');
        existingPages.forEach(page => page.remove());
        
        // Show loading state
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.textContent = 'Loading...';
        app.appendChild(loading);
        
        try {
            const pageContent = await this.loadPageType(type);
            loading.remove();
            
            // Create page wrapper
            const pageWrapper = document.createElement('div');
            pageWrapper.innerHTML = pageContent;
            app.appendChild(pageWrapper);
            
            // Store current page type for regeneration
            this.currentPageType = type;
            
            this.initializePage(type);
            
            // Set up periodic page regeneration with new timestamps
            this.startPageRegeneration(type);
        } catch (error) {
            console.error('Error loading page:', error);
            loading.innerHTML = '<div class="error">Error loading page</div>';
        }
    }
    
    cleanupIntervals() {
        // Clean up all known intervals
        if (window.dashboardInterval) {
            clearInterval(window.dashboardInterval);
            window.dashboardInterval = null;
        }
        if (window.chartInterval) {
            clearInterval(window.chartInterval);
            window.chartInterval = null;
        }
        if (window.dataStreamInterval) {
            clearInterval(window.dataStreamInterval);
            window.dataStreamInterval = null;
        }
        if (window.feedRefreshInterval) {
            clearInterval(window.feedRefreshInterval);
            window.feedRefreshInterval = null;
        }
        if (window.analyticsInterval) {
            clearInterval(window.analyticsInterval);
            window.analyticsInterval = null;
        }
        if (window.pageRegenerationInterval) {
            clearInterval(window.pageRegenerationInterval);
            window.pageRegenerationInterval = null;
        }
        
        // Clean up FeedManager interval if it exists
        if (window.FeedManager && window.FeedManager.refreshInterval) {
            clearInterval(window.FeedManager.refreshInterval);
            window.FeedManager.refreshInterval = null;
        }
    }
    
    startPageRegeneration(type) {
        // Regenerate page content with fresh timestamps every 30 seconds
        // This ensures the page HTML itself gets new timestamps
        if (window.pageRegenerationInterval) {
            clearInterval(window.pageRegenerationInterval);
        }
        
        window.pageRegenerationInterval = setInterval(async () => {
            // Only regenerate if we're still on the same page type
            if (this.currentPageType === type) {
                const app = document.getElementById('app');
                if (!app) return;
                
                const existingPage = app.querySelector('.dynamic-page');
                if (existingPage) {
                    // Regenerate page with fresh timestamp
                    const pageContent = await this.loadPageType(type);
                    existingPage.outerHTML = pageContent;
                    // Re-initialize to restart intervals
                    this.initializePage(type);
                }
            }
        }, 30000); // Regenerate every 30 seconds
    }

    async loadPageType(type) {
        // This would typically fetch from a server, but for static site we'll generate dynamically
        const PageGenerator = window.PageGenerator;
        if (PageGenerator && PageGenerator[type]) {
            return PageGenerator[type]();
        }
        return `<div class="page"><h1>${this.pageTypes[type] || type}</h1><p>Page type: ${type}</p></div>`;
    }

    initializePage(type) {
        // Initialize page-specific functionality
        if (window.PageInitializers && window.PageInitializers[type]) {
            window.PageInitializers[type]();
        }
    }

    async loadPage(url) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            const app = document.getElementById('app');
            if (app) {
                app.innerHTML = html;
            }
        } catch (error) {
            console.error('Error loading page:', error);
        }
    }
}

// Initialize router when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.router = new DynamicRouter();
    });
} else {
    window.router = new DynamicRouter();
}

