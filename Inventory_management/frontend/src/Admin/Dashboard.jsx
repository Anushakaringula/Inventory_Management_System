import React, { useState, useEffect } from 'react';
const dashboardStyles = `
    /* Base Styles */
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f7f6;
    }
    .app-container {
        display: flex;
        min-height: 100vh;
    }

    
    
    /* Main Content Area Styles (Right Side) */
    .main-content {
        margin-left: 250px; /* Offset for fixed sidebar */
        padding: 30px;
        flex-grow: 1;
        width: calc(100% - 250px);
    }

    h1 {
        color: #333;
        margin-bottom: 30px;
    }

    /* Stats Card Section */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-bottom: 30px;
    }

    .stat-card {
        background-color: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        text-align: center;
    }

    .stat-card .icon {
        font-size: 2.5em;
        color: #3498db;
        margin-bottom: 10px;
    }

    .stat-card .value {
        font-size: 2.2em;
        font-weight: bold;
        color: #2c3e50;
    }

    .stat-card .label {
        font-size: 0.9em;
        color: #7f8c8d;
        margin-top: 5px;
    }

    .stat-card .trend {
        font-size: 0.8em;
        color: #2ecc71; /* Green for positive trend */
        margin-top: 5px;
    }

    /* Analytics and Actions Grid */
    .dashboard-grid {
        display: grid;
        grid-template-columns: 2fr 1fr; /* 2/3 for chart, 1/3 for alerts */
        gap: 20px;
        margin-bottom: 30px;
    }

    /* Chart/Graph Area */
    .chart-container {
        background-color: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .chart-title {
        font-size: 1.2em;
        font-weight: bold;
        color: #333;
        margin-bottom: 15px;
    }

    /* Stock Alerts */
    .stock-alerts {
        /* No extra padding needed, using .chart-container padding */
    }

    .alert-item {
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 4px;
    }

    .low-stock {
        background-color: #fceceb;
        color: #e74c3c;
        border-left: 4px solid #e74c3c;
    }

    .new-arrival {
        background-color: #e8f9e9;
        color: #2ecc71;
        border-left: 4px solid #2ecc71;
    }

    /* Simple Chart CSS */
    .bar-chart {
        display: flex;
        align-items: flex-end;
        height: 200px;
        gap: 5px;
        border-left: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        padding: 10px 0;
    }

    .bar-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 12%;
        position: relative;
    }

    .bar {
        width: 80%;
        background-color: #3498db;
        transition: height 0.5s;
        position: relative;
    }

    .bar.sales-bar {
        background-color: #2ecc71; /* Green bar for sales value */
        margin-top: -1px; /* Overlap slightly for visual grouping */
    }

    .label-x {
        margin-top: 5px;
        font-size: 0.8em;
        color: #7f8c8d;
        text-align: center;
    }

    /* Icon Font Placeholder (for simplicity, using simple characters) */
    .fa-box:before { content: '📦'; }
    .fa-money:before { content: '💰'; }
    .fa-cart:before { content: '🛒'; }
    .fa-dashboard:before { content: '🏠'; }
    .fa-products:before { content: '🛍️'; }
    .fa-orders:before { content: '📋'; }
    .fa-analytics:before { content: '📈'; }
`;

// =================================================================
// 2. Chart Data and Logic
// =================================================================
const salesData = [
    { day: 'MON', value: 150, trend: 10 },
    { day: 'TUE', value: 220, trend: 15 },
    { day: 'WED', value: 350, trend: 22 },
    { day: 'THU', value: 180, trend: 12 },
    { day: 'FRI', value: 250, trend: 18 },
    { day: 'SAT', value: 400, trend: 25 },
    { day: 'SUN', value: 300, trend: 20 }
];

const maxUnits = Math.max(...salesData.map(d => d.value));

// Component for the Bar Chart
const SalesChart = () => {
    return (
        <div className="bar-chart">
            {salesData.map((item, index) => {
                const heightPercent = (item.value / maxUnits) * 100;
                const barHeight = heightPercent * 0.7; // Scale down for visual fit
                const trendHeight = item.trend * 4; // Arbitrary scaling for visual effect

                return (
                    <div key={index} className="bar-container">
                        {/* Bar for Sales Trend (Green) */}
                        <div
                            className="bar sales-bar"
                            style={{ height: `${trendHeight}px` }}
                        ></div>
                        {/* Bar for Units Sold (Blue) */}
                        <div
                            className="bar"
                            style={{ height: `${barHeight}px`, backgroundColor: '#3498db' }}
                        ></div>
                        <div className="label-x">{item.day}</div>
                    </div>
                );
            })}
        </div>
    );
};

// =================================================================
// 3. Main React Component
// =================================================================

const Dashboard = () => {
    // State to manage the active navigation item
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [pageTitle, setPageTitle] = useState('Dashboard Overview');

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
        { id: 'products', label: 'Products', icon: '🛍️' },
        { id: 'orders', label: 'Orders', icon: '📋' },
        { id: 'analytics', label: 'Analytics', icon: '📈' },
    ];

    // Function to handle navigation click
    const handleNavClick = (pageId) => {
        setCurrentPage(pageId);
        // Simulate changing the page title
        setPageTitle(pageId.charAt(0).toUpperCase() + pageId.slice(1) + ' Overview');
        console.log(`Navigating to ${pageId} page...`);
        // In a real application, you would render the corresponding component here.
    };
    
    // Set body class for correct layout on mount
    useEffect(() => {
        document.body.className = 'app-container';
    }, []);

    // Function to render the main content based on the active page (currently only rendering Dashboard)
    const renderContent = () => {
        // Since the original HTML only contained the Dashboard content, we render that here.
        return (
            <>
                <h1>{pageTitle}</h1>

                {/* 1. Key Statistics Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="icon fa-box"></div>
                        <div className="value">450</div>
                        <div className="label">TOTAL PRODUCTS</div>
                        <div className="trend" style={{ color: '#2ecc71' }}>↑ +5% from last week</div>
                    </div>
                    <div className="stat-card">
                        <div className="icon fa-money"></div>
                        <div className="value">₹ 5,80,000</div>
                        <div className="label">CURRENT STOCK VALUE</div>
                        <div className="trend" style={{ color: '#e74c3c' }}>↓ -2% from last week</div>
                    </div>
                    <div className="stat-card">
                        <div className="icon fa-cart"></div>
                        <div className="value">12</div>
                        <div className="label">PENDING ORDERS</div>
                        <div className="trend" style={{ color: '#2ecc71' }}>↑ +15% from last week</div>
                    </div>
                </div>

                <div className="dashboard-grid">
                    {/* Weekly Sales Trend (Graphical Representation) */}
                    <div className="chart-container">
                        <div className="chart-title">WEEKLY SALES TREND (Units Sold)</div>
                        <SalesChart />
                        <p style={{ fontSize: '0.8em', color: '#7f8c8d', textAlign: 'center', marginTop: '15px' }}>Green means more sales! Up trend is good.</p>
                    </div>

                    {/* Stock Alerts */}
                    <div className="chart-container stock-alerts">
                        <div className="chart-title" style={{ marginBottom: '20px' }}>STOCK ALERTS</div>
                        <div className="alert-item low-stock">
                            <strong>LOW STOCK:</strong> Atta (5), Sugar (10), Dal (8)
                        </div>
                        <div className="alert-item new-arrival">
                            <strong>NEW ARRIVALS:</strong> Rice (50), Oil (20)
                        </div>
                        <button style={{ marginTop: '15px', width: '100%', backgroundColor: '#95a5a6', border: 'none', color: 'white', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>VIEW ALL PRODUCTS</button>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="app-container">
            {/* Injecting CSS into the DOM */}
            <style dangerouslySetInnerHTML={{ __html: dashboardStyles }} />

            {/* Left Sidebar for Navigation */}
            

            {/* Right Main Content Area */}
            <div className="main-content" id="mainContent">
                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;