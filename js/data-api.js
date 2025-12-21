// Data API Simulation - Provides dynamic data for pages
window.DataAPI = {
    // Simulate API delay
    delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

    // Dashboard data
    async getDashboardData() {
        await this.delay(500);
        return {
            activeUsers: Math.floor(Math.random() * 1000) + 500,
            revenue: Math.random() * 10000 + 5000,
            orders: Math.floor(Math.random() * 500) + 100,
            performance: Math.random() * 20 + 80
        };
    },

    // Content data
    async getContentItems(page = 1, limit = 12, filter = 'all', search = '') {
        await this.delay(300);
        const types = ['article', 'video', 'image', 'document'];
        const titles = [
            'Getting Started Guide', 'Advanced Techniques', 'Best Practices',
            'Case Study Analysis', 'Product Overview', 'User Guide',
            'API Documentation', 'Tutorial Series', 'Feature Highlights'
        ];
        
        let items = Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            title: titles[i % titles.length] + ' ' + (Math.floor(i / titles.length) + 1),
            type: types[i % types.length],
            date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            views: Math.floor(Math.random() * 10000)
        }));

        // Apply filters
        if (filter !== 'all') {
            items = items.filter(item => item.type === filter);
        }
        if (search) {
            items = items.filter(item => 
                item.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Paginate
        const start = (page - 1) * limit;
        const end = start + limit;
        
        return {
            items: items.slice(start, end),
            total: items.length,
            page: page,
            totalPages: Math.ceil(items.length / limit)
        };
    },

    // Real-time data stream
    async getDataStream(count = 10) {
        await this.delay(200);
        return Array.from({ length: count }, (_, i) => ({
            id: Date.now() + i,
            time: new Date().toLocaleTimeString(),
            value: (Math.random() * 100).toFixed(2),
            status: Math.random() > 0.8 ? 'warning' : 'normal',
            trend: Math.random() > 0.5 ? 'up' : 'down'
        }));
    },

    // Feed items
    async getFeedItems(count = 20) {
        await this.delay(300);
        const feedTypes = ['news', 'update', 'alert', 'event'];
        const messages = [
            'New feature released',
            'System maintenance scheduled',
            'Performance improvements deployed',
            'Security update available',
            'New content published',
            'User milestone reached',
            'API endpoint updated',
            'Database optimization completed',
            'New user registration',
            'Content moderation update'
        ];
        
        return Array.from({ length: count }, (_, i) => ({
            id: Date.now() - i * 1000,
            type: feedTypes[Math.floor(Math.random() * feedTypes.length)],
            message: messages[Math.floor(Math.random() * messages.length)],
            time: new Date(Date.now() - i * 60000).toLocaleString(),
            priority: Math.random() > 0.7 ? 'high' : 'normal'
        }));
    },

    // Analytics data
    async getAnalyticsData(period = 'today') {
        await this.delay(400);
        const multipliers = {
            today: 1,
            week: 7,
            month: 30,
            year: 365
        };
        const multiplier = multipliers[period] || 1;
        
        return {
            pageViews: Math.floor((Math.random() * 10000 + 5000) * multiplier),
            uniqueVisitors: Math.floor((Math.random() * 5000 + 2000) * multiplier),
            bounceRate: (Math.random() * 30 + 20).toFixed(1),
            avgSession: (Math.random() * 5 + 2).toFixed(1),
            topPages: [
                { path: '/dashboard', views: Math.floor(Math.random() * 1000 + 100) },
                { path: '/content', views: Math.floor(Math.random() * 1000 + 100) },
                { path: '/data', views: Math.floor(Math.random() * 1000 + 100) },
                { path: '/feed', views: Math.floor(Math.random() * 1000 + 100) },
                { path: '/analytics', views: Math.floor(Math.random() * 1000 + 100) }
            ]
        };
    },

    // WebSocket simulation for real-time updates
    subscribeToUpdates(callback) {
        const interval = setInterval(() => {
            callback({
                type: 'update',
                data: {
                    timestamp: new Date().toISOString(),
                    value: Math.random() * 100
                }
            });
        }, 2000);
        
        return () => clearInterval(interval);
    }
};


