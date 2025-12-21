// Page Generator - Creates different types of dynamic pages
window.PageGenerator = {
    dashboard: function() {
        // Always generate fresh timestamp
        const timestamp = new Date().toLocaleString();
        const pageTimestamp = new Date().toISOString();
        return `
            <div class="dynamic-page dashboard-page" data-page-timestamp="${pageTimestamp}">
                <header class="page-header">
                    <h1>📊 Dashboard</h1>
                    <p class="last-updated">Page generated: <span id="page-generated-time">${timestamp}</span> | Last updated: <span id="dashboard-time">${timestamp}</span></p>
                </header>
                
                <div class="dashboard-grid">
                    <div class="dashboard-card">
                        <div class="card-icon">👥</div>
                        <div class="card-content">
                            <h3>Active Users</h3>
                            <p class="card-value" id="active-users">0</p>
                            <span class="card-change positive">+12%</span>
                        </div>
                    </div>
                    
                    <div class="dashboard-card">
                        <div class="card-icon">📈</div>
                        <div class="card-content">
                            <h3>Revenue</h3>
                            <p class="card-value" id="revenue">$0</p>
                            <span class="card-change positive">+8%</span>
                        </div>
                    </div>
                    
                    <div class="dashboard-card">
                        <div class="card-icon">📦</div>
                        <div class="card-content">
                            <h3>Orders</h3>
                            <p class="card-value" id="orders">0</p>
                            <span class="card-change positive">+5%</span>
                        </div>
                    </div>
                    
                    <div class="dashboard-card">
                        <div class="card-icon">⚡</div>
                        <div class="card-content">
                            <h3>Performance</h3>
                            <p class="card-value" id="performance">0%</p>
                            <span class="card-change negative">-2%</span>
                        </div>
                    </div>
                </div>
                
                <div class="dashboard-chart">
                    <h2>Activity Chart</h2>
                    <div class="chart-container" id="dashboard-chart">
                        <canvas id="activityChart"></canvas>
                    </div>
                </div>
            </div>
        `;
    },

    content: function() {
        const timestamp = new Date().toLocaleString();
        const pageTimestamp = new Date().toISOString();
        return `
            <div class="dynamic-page content-page" data-page-timestamp="${pageTimestamp}">
                <header class="page-header">
                    <h1>📝 Content Management</h1>
                    <div>
                        <span class="last-updated" style="margin-right: 15px;">Page generated: ${timestamp}</span>
                        <button class="btn-primary" onclick="window.ContentManager.addNewItem()">+ Add New</button>
                    </div>
                </header>
                
                <div class="content-filters">
                    <input type="text" id="content-search" placeholder="Search content..." class="search-input">
                    <select id="content-filter" class="filter-select">
                        <option value="all">All Types</option>
                        <option value="article">Articles</option>
                        <option value="video">Videos</option>
                        <option value="image">Images</option>
                        <option value="document">Documents</option>
                    </select>
                </div>
                
                <div class="content-grid" id="content-grid">
                    <!-- Content items will be dynamically loaded here -->
                </div>
                
                <div class="pagination" id="content-pagination">
                    <!-- Pagination will be added here -->
                </div>
            </div>
        `;
    },

    data: function() {
        const timestamp = new Date().toLocaleString();
        const pageTimestamp = new Date().toISOString();
        return `
            <div class="dynamic-page data-page" data-page-timestamp="${pageTimestamp}">
                <header class="page-header">
                    <h1>📊 Data Visualization</h1>
                    <div class="data-controls">
                        <span class="last-updated" style="margin-right: 15px;">Page generated: ${timestamp}</span>
                        <select id="data-source" class="filter-select">
                            <option value="realtime">Real-time Data</option>
                            <option value="historical">Historical Data</option>
                            <option value="forecast">Forecast Data</option>
                        </select>
                        <button class="btn-secondary" onclick="window.DataVisualizer.refresh()">🔄 Refresh</button>
                    </div>
                </header>
                
                <div class="data-visualization">
                    <div class="viz-container">
                        <h2>Live Data Stream</h2>
                        <div class="data-stream" id="data-stream">
                            <!-- Data points will appear here -->
                        </div>
                    </div>
                    
                    <div class="viz-container">
                        <h2>Data Table</h2>
                        <div class="table-container">
                            <table class="data-table" id="data-table">
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Value</th>
                                        <th>Status</th>
                                        <th>Trend</th>
                                    </tr>
                                </thead>
                                <tbody id="data-table-body">
                                    <!-- Table rows will be added here -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    feed: function() {
        const timestamp = new Date().toLocaleString();
        const pageTimestamp = new Date().toISOString();
        return `
            <div class="dynamic-page feed-page" data-page-timestamp="${pageTimestamp}">
                <header class="page-header">
                    <h1>📰 Live Feed</h1>
                    <div class="feed-controls">
                        <span class="last-updated" style="margin-right: 15px;">Page generated: ${timestamp}</span>
                        <label class="toggle-switch">
                            <input type="checkbox" id="auto-refresh" checked>
                            <span>Auto-refresh</span>
                        </label>
                        <span class="feed-status" id="feed-status">● Live</span>
                    </div>
                </header>
                
                <div class="feed-container" id="feed-container">
                    <!-- Feed items will be dynamically added here -->
                </div>
            </div>
        `;
    },

    analytics: function() {
        const timestamp = new Date().toLocaleString();
        const pageTimestamp = new Date().toISOString();
        return `
            <div class="dynamic-page analytics-page" data-page-timestamp="${pageTimestamp}">
                <header class="page-header">
                    <h1>📈 Analytics</h1>
                    <div class="analytics-period">
                        <span class="last-updated" style="margin-right: 15px;">Page generated: ${timestamp}</span>
                        <select id="analytics-period" class="filter-select">
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </select>
                    </div>
                </header>
                
                <div class="analytics-grid">
                    <div class="analytics-section">
                        <h2>Traffic Overview</h2>
                        <div class="metric-list" id="traffic-metrics">
                            <!-- Metrics will be added here -->
                        </div>
                    </div>
                    
                    <div class="analytics-section">
                        <h2>User Behavior</h2>
                        <div class="behavior-chart" id="behavior-chart">
                            <!-- Chart will be rendered here -->
                        </div>
                    </div>
                    
                    <div class="analytics-section">
                        <h2>Top Pages</h2>
                        <div class="top-pages-list" id="top-pages">
                            <!-- Top pages will be listed here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    settings: function() {
        const timestamp = new Date().toLocaleString();
        const pageTimestamp = new Date().toISOString();
        return `
            <div class="dynamic-page settings-page" data-page-timestamp="${pageTimestamp}">
                <header class="page-header">
                    <h1>⚙️ Settings</h1>
                    <p class="last-updated">Page generated: ${timestamp}</p>
                </header>
                
                <div class="settings-container">
                    <div class="settings-section">
                        <h2>Page Preferences</h2>
                        <div class="setting-item">
                            <label>Auto-refresh interval (seconds)</label>
                            <input type="number" id="refresh-interval" value="5" min="1" max="60">
                        </div>
                        <div class="setting-item">
                            <label>Theme</label>
                            <select id="theme-select" class="filter-select">
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="auto">Auto</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="settings-section">
                        <h2>Notifications</h2>
                        <div class="setting-item">
                            <label class="toggle-switch">
                                <input type="checkbox" id="notifications-enabled" checked>
                                <span>Enable notifications</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="settings-section">
                        <h2>Data Management</h2>
                        <button class="btn-secondary" onclick="window.SettingsManager.clearCache()">Clear Cache</button>
                        <button class="btn-secondary" onclick="window.SettingsManager.exportData()">Export Data</button>
                    </div>
                </div>
            </div>
        `;
    }
};


