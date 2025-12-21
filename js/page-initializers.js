// Page Initializers - Sets up dynamic functionality for each page type
window.PageInitializers = {
    dashboard: function() {
        // Initialize dashboard with live data updates
        const updateDashboard = () => {
            // Simulate dynamic data
            document.getElementById('active-users').textContent = 
                Math.floor(Math.random() * 1000) + 500;
            document.getElementById('revenue').textContent = 
                '$' + (Math.random() * 10000 + 5000).toFixed(2);
            document.getElementById('orders').textContent = 
                Math.floor(Math.random() * 500) + 100;
            document.getElementById('performance').textContent = 
                (Math.random() * 20 + 80).toFixed(1) + '%';
            document.getElementById('dashboard-time').textContent = 
                new Date().toLocaleString();
        };

        // Update immediately and then every 3 seconds
        updateDashboard();
        const interval = setInterval(updateDashboard, 3000);

        // Store interval ID for cleanup
        window.dashboardInterval = interval;
        
        // Also update page generated time every 3 seconds
        const updatePageTime = () => {
            const pageTimeEl = document.getElementById('page-generated-time');
            if (pageTimeEl) {
                pageTimeEl.textContent = new Date().toLocaleString();
            }
        };
        setInterval(updatePageTime, 3000);

        // Simple chart visualization
        const canvas = document.getElementById('activityChart');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = 200;
            
            const drawChart = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.strokeStyle = '#667eea';
                ctx.lineWidth = 2;
                ctx.beginPath();
                
                const points = 20;
                const step = canvas.width / points;
                for (let i = 0; i < points; i++) {
                    const x = i * step;
                    const y = canvas.height - (Math.random() * canvas.height * 0.8 + canvas.height * 0.1);
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            };
            
            drawChart();
            window.chartInterval = setInterval(drawChart, 2000);
        }
    },

    content: function() {
        // Initialize content manager
        if (!window.ContentManager) {
            window.ContentManager = {
                items: [],
                currentPage: 1,
                itemsPerPage: 12,
                
                loadContent: function() {
                    // Generate sample content items
                    const types = ['article', 'video', 'image', 'document'];
                    const titles = [
                        'Getting Started Guide', 'Advanced Techniques', 'Best Practices',
                        'Case Study Analysis', 'Product Overview', 'User Guide',
                        'API Documentation', 'Tutorial Series', 'Feature Highlights'
                    ];
                    
                    this.items = Array.from({ length: 24 }, (_, i) => ({
                        id: i + 1,
                        title: titles[i % titles.length] + ' ' + (Math.floor(i / titles.length) + 1),
                        type: types[i % types.length],
                        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                        views: Math.floor(Math.random() * 10000)
                    }));
                    
                    this.renderContent();
                },
                
                renderContent: function() {
                    const grid = document.getElementById('content-grid');
                    if (!grid) return;
                    
                    const searchTerm = document.getElementById('content-search')?.value.toLowerCase() || '';
                    const filterType = document.getElementById('content-filter')?.value || 'all';
                    
                    let filtered = this.items.filter(item => {
                        const matchesSearch = item.title.toLowerCase().includes(searchTerm);
                        const matchesFilter = filterType === 'all' || item.type === filterType;
                        return matchesSearch && matchesFilter;
                    });
                    
                    const start = (this.currentPage - 1) * this.itemsPerPage;
                    const end = start + this.itemsPerPage;
                    const pageItems = filtered.slice(start, end);
                    
                    grid.innerHTML = pageItems.map(item => `
                        <div class="content-item" data-type="${item.type}">
                            <div class="content-item-icon">${this.getIcon(item.type)}</div>
                            <h3>${item.title}</h3>
                            <p class="content-meta">${item.type} • ${item.date} • ${item.views} views</p>
                            <div class="content-actions">
                                <button onclick="window.ContentManager.editItem(${item.id})">Edit</button>
                                <button onclick="window.ContentManager.deleteItem(${item.id})">Delete</button>
                            </div>
                        </div>
                    `).join('');
                    
                    this.renderPagination(filtered.length);
                },
                
                getIcon: function(type) {
                    const icons = {
                        article: '📄',
                        video: '🎥',
                        image: '🖼️',
                        document: '📋'
                    };
                    return icons[type] || '📄';
                },
                
                renderPagination: function(totalItems) {
                    const pagination = document.getElementById('content-pagination');
                    if (!pagination) return;
                    
                    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
                    pagination.innerHTML = Array.from({ length: totalPages }, (_, i) => 
                        `<button class="page-btn ${i + 1 === this.currentPage ? 'active' : ''}" 
                                 onclick="window.ContentManager.goToPage(${i + 1})">${i + 1}</button>`
                    ).join('');
                },
                
                goToPage: function(page) {
                    this.currentPage = page;
                    this.renderContent();
                },
                
                addNewItem: function() {
                    const title = prompt('Enter content title:');
                    if (title) {
                        const newItem = {
                            id: this.items.length + 1,
                            title: title,
                            type: 'article',
                            date: new Date().toLocaleDateString(),
                            views: 0
                        };
                        this.items.unshift(newItem);
                        this.renderContent();
                    }
                },
                
                editItem: function(id) {
                    const item = this.items.find(i => i.id === id);
                    if (item) {
                        const newTitle = prompt('Edit title:', item.title);
                        if (newTitle) {
                            item.title = newTitle;
                            this.renderContent();
                        }
                    }
                },
                
                deleteItem: function(id) {
                    if (confirm('Are you sure you want to delete this item?')) {
                        this.items = this.items.filter(i => i.id !== id);
                        this.renderContent();
                    }
                }
            };
        }
        
        // Set up event listeners
        const searchInput = document.getElementById('content-search');
        const filterSelect = document.getElementById('content-filter');
        
        if (searchInput) {
            searchInput.addEventListener('input', () => window.ContentManager.renderContent());
        }
        if (filterSelect) {
            filterSelect.addEventListener('change', () => {
                window.ContentManager.currentPage = 1;
                window.ContentManager.renderContent();
            });
        }
        
        // Load initial content
        window.ContentManager.loadContent();
        
        // Update page timestamp periodically
        const updateContentPageTime = () => {
            const header = document.querySelector('.content-page .page-header');
            if (header) {
                const timeSpan = header.querySelector('.last-updated');
                if (timeSpan) {
                    timeSpan.textContent = 'Page generated: ' + new Date().toLocaleString();
                }
            }
        };
        setInterval(updateContentPageTime, 5000);
    },

    data: function() {
        if (!window.DataVisualizer) {
            window.DataVisualizer = {
                dataPoints: [],
                maxPoints: 50,
                
                init: function() {
                    this.startDataStream();
                    this.updateTable();
                },
                
                startDataStream: function() {
                    const stream = document.getElementById('data-stream');
                    if (!stream) return;
                    
                    const addDataPoint = () => {
                        const value = (Math.random() * 100).toFixed(2);
                        const status = Math.random() > 0.8 ? 'warning' : 'normal';
                        const trend = Math.random() > 0.5 ? 'up' : 'down';
                        
                        this.dataPoints.unshift({
                            time: new Date().toLocaleTimeString(),
                            value: value,
                            status: status,
                            trend: trend
                        });
                        
                        if (this.dataPoints.length > this.maxPoints) {
                            this.dataPoints.pop();
                        }
                        
                        this.renderStream();
                        this.updateTable();
                    };
                    
                    addDataPoint();
                    window.dataStreamInterval = setInterval(addDataPoint, 2000);
                },
                
                renderStream: function() {
                    const stream = document.getElementById('data-stream');
                    if (!stream) return;
                    
                    stream.innerHTML = this.dataPoints.slice(0, 10).map(point => `
                        <div class="data-point ${point.status}">
                            <span class="data-time">${point.time}</span>
                            <span class="data-value">${point.value}</span>
                            <span class="data-trend ${point.trend}">${point.trend === 'up' ? '↑' : '↓'}</span>
                        </div>
                    `).join('');
                },
                
                updateTable: function() {
                    const tbody = document.getElementById('data-table-body');
                    if (!tbody) return;
                    
                    tbody.innerHTML = this.dataPoints.slice(0, 20).map(point => `
                        <tr>
                            <td>${point.time}</td>
                            <td>${point.value}</td>
                            <td><span class="status-badge ${point.status}">${point.status}</span></td>
                            <td><span class="trend ${point.trend}">${point.trend === 'up' ? '↑' : '↓'}</span></td>
                        </tr>
                    `).join('');
                },
                
                refresh: function() {
                    this.dataPoints = [];
                    this.init();
                }
            };
        }
        
        window.DataVisualizer.init();
    },

    feed: function() {
        if (!window.FeedManager) {
            window.FeedManager = {
                feedItems: [],
                autoRefresh: true,
                
                init: function() {
                    const checkbox = document.getElementById('auto-refresh');
                    if (checkbox) {
                        checkbox.addEventListener('change', (e) => {
                            this.autoRefresh = e.target.checked;
                            if (this.autoRefresh) {
                                this.startAutoRefresh();
                            }
                        });
                    }
                    
                    this.loadFeed();
                    if (this.autoRefresh) {
                        this.startAutoRefresh();
                    }
                },
                
                loadFeed: function() {
                    const feedTypes = ['news', 'update', 'alert', 'event'];
                    const messages = [
                        'New feature released',
                        'System maintenance scheduled',
                        'Performance improvements deployed',
                        'Security update available',
                        'New content published',
                        'User milestone reached',
                        'API endpoint updated'
                    ];
                    
                    const newItem = {
                        id: Date.now(),
                        type: feedTypes[Math.floor(Math.random() * feedTypes.length)],
                        message: messages[Math.floor(Math.random() * messages.length)],
                        time: new Date().toLocaleString(),
                        priority: Math.random() > 0.7 ? 'high' : 'normal'
                    };
                    
                    this.feedItems.unshift(newItem);
                    if (this.feedItems.length > 50) {
                        this.feedItems.pop();
                    }
                    
                    this.renderFeed();
                },
                
                renderFeed: function() {
                    const container = document.getElementById('feed-container');
                    if (!container) return;
                    
                    container.innerHTML = this.feedItems.map(item => `
                        <div class="feed-item ${item.priority}">
                            <div class="feed-icon">${this.getIcon(item.type)}</div>
                            <div class="feed-content">
                                <p class="feed-message">${item.message}</p>
                                <span class="feed-time">${item.time}</span>
                            </div>
                        </div>
                    `).join('');
                    
                    const status = document.getElementById('feed-status');
                    if (status) {
                        status.textContent = '● Live';
                        status.className = 'feed-status live';
                    }
                },
                
                getIcon: function(type) {
                    const icons = {
                        news: '📰',
                        update: '🔄',
                        alert: '⚠️',
                        event: '🎉'
                    };
                    return icons[type] || '📄';
                },
                
                startAutoRefresh: function() {
                    if (this.refreshInterval) {
                        clearInterval(this.refreshInterval);
                    }
                    this.refreshInterval = setInterval(() => {
                        this.loadFeed();
                    }, 5000);
                }
            };
        }
        
        window.FeedManager.init();
    },

    analytics: function() {
        const updateAnalytics = () => {
            // Update traffic metrics
            const metrics = document.getElementById('traffic-metrics');
            if (metrics) {
                metrics.innerHTML = `
                    <div class="metric-item">
                        <span class="metric-label">Page Views</span>
                        <span class="metric-value">${(Math.random() * 10000 + 5000).toFixed(0)}</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">Unique Visitors</span>
                        <span class="metric-value">${(Math.random() * 5000 + 2000).toFixed(0)}</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">Bounce Rate</span>
                        <span class="metric-value">${(Math.random() * 30 + 20).toFixed(1)}%</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">Avg. Session</span>
                        <span class="metric-value">${(Math.random() * 5 + 2).toFixed(1)}m</span>
                    </div>
                `;
            }
            
            // Update top pages
            const topPages = document.getElementById('top-pages');
            if (topPages) {
                const pages = ['/dashboard', '/content', '/data', '/feed', '/analytics'];
                topPages.innerHTML = pages.map((page, i) => `
                    <div class="top-page-item">
                        <span class="page-rank">${i + 1}</span>
                        <span class="page-path">${page}</span>
                        <span class="page-views">${(Math.random() * 1000 + 100).toFixed(0)} views</span>
                    </div>
                `).join('');
            }
        };
        
        updateAnalytics();
        window.analyticsInterval = setInterval(updateAnalytics, 10000);
        
        const periodSelect = document.getElementById('analytics-period');
        if (periodSelect) {
            periodSelect.addEventListener('change', updateAnalytics);
        }
    },

    settings: function() {
        if (!window.SettingsManager) {
            window.SettingsManager = {
                clearCache: function() {
                    if (confirm('Clear all cached data?')) {
                        localStorage.clear();
                        alert('Cache cleared!');
                    }
                },
                
                exportData: function() {
                    const data = {
                        timestamp: new Date().toISOString(),
                        settings: {
                            refreshInterval: document.getElementById('refresh-interval')?.value,
                            theme: document.getElementById('theme-select')?.value
                        }
                    };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'settings-export.json';
                    a.click();
                    URL.revokeObjectURL(url);
                }
            };
        }
        
        // Load saved settings
        const savedInterval = localStorage.getItem('refreshInterval');
        const savedTheme = localStorage.getItem('theme');
        
        if (savedInterval && document.getElementById('refresh-interval')) {
            document.getElementById('refresh-interval').value = savedInterval;
        }
        if (savedTheme && document.getElementById('theme-select')) {
            document.getElementById('theme-select').value = savedTheme;
        }
        
        // Save settings on change
        const refreshInput = document.getElementById('refresh-interval');
        const themeSelect = document.getElementById('theme-select');
        
        if (refreshInput) {
            refreshInput.addEventListener('change', (e) => {
                localStorage.setItem('refreshInterval', e.target.value);
            });
        }
        if (themeSelect) {
            themeSelect.addEventListener('change', (e) => {
                localStorage.setItem('theme', e.target.value);
                document.body.setAttribute('data-theme', e.target.value);
            });
        }
    }
};


