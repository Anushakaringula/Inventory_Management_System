import React, { useState, useEffect } from 'react';

const dashboardStyles = `
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

  .main-content {
    margin-left: 250px;
    padding: 30px;
    flex-grow: 1;
    width: calc(100% - 250px);
  }

  h1 {
    color: #333;
    margin-bottom: 30px;
  }

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
    margin-top: 5px;
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }

  .chart-container {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }

  .chart-title {
    font-size: 1.2em;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
  }

  .alert-item {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 4px;
    font-size: 0.9em;
  }

  .low-stock {
    background-color: #fceceb;
    color: #e74c3c;
    border-left: 4px solid #e74c3c;
  }

  .out-of-stock {
    background-color: #fadbd8;
    color: #c0392b;
    border-left: 4px solid #c0392b;
  }

  .expiring-soon {
    background-color: #fff3cd;
    color: #856404;
    border-left: 4px solid #ffc107;
  }

  .bar-chart {
    display: flex;
    align-items: flex-end;
    height: 200px;
    gap: 8px;
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
  }

  .bar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    position: relative;
  }

  .bar {
    width: 80%;
    background-color: #3498db;
    transition: height 0.5s;
    position: relative;
    border-radius: 4px 4px 0 0;
  }

  .bar-value {
    position: absolute;
    top: -20px;
    font-size: 0.75em;
    font-weight: bold;
    color: #2c3e50;
  }

  .label-x {
    margin-top: 5px;
    font-size: 0.75em;
    color: #7f8c8d;
    text-align: center;
    word-wrap: break-word;
  }

  .fa-box:before { content: '📦'; }
  .fa-money:before { content: '💰'; }
  .fa-alert:before { content: '⚠️'; }

  .action-button {
    margin-top: 15px;
    width: 100%;
    background-color: #3498db;
    border: none;
    color: white;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }

  .action-button:hover {
    background-color: #2980b9;
  }

  .no-alerts {
    text-align: center;
    color: #95a5a6;
    padding: 20px;
  }
`;

const CategoryChart = ({ grocery }) => {
  const categoryData = grocery.reduce((acc, item) => {
    const cat = item.category || 'Unknown';
    if (!acc[cat]) {
      acc[cat] = 0;
    }
    acc[cat] += Number(item.stock) || 0;
    return acc;
  }, {});

  const categories = Object.entries(categoryData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7);

  const maxStock = Math.max(...categories.map(c => c[1]), 1);

  return (
    <div className="bar-chart">
      {categories.map(([category, stock], index) => {
        const heightPercent = (stock / maxStock) * 100;
        const barHeight = Math.max(heightPercent * 0.7, 5);

        return (
          <div key={index} className="bar-container">
            <div className="bar-value">{stock}</div>
            <div 
              className="bar" 
              style={{ 
                height: `${barHeight}px`,
                backgroundColor: `hsl(${210 + index * 30}, 70%, 50%)`
              }}
            ></div>
            <div className="label-x">{category}</div>
          </div>
        );
      })}
    </div>
  );
};

const Dashboard = () => {
  const [grocery, setGrocery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previousStats, setPreviousStats] = useState(null);

  useEffect(() => {
    fetchGroceryData();
  }, []);

  const fetchGroceryData = () => {
    fetch("http://localhost:4000/api/grocery")
      .then(res => res.json())
      .then(data => {
        setGrocery(data);
        setLoading(false);
        
        if (!previousStats) {
          setPreviousStats({
            totalProducts: data.length,
            totalStockValue: calculateTotalValue(data),
            lowStockCount: getLowStockItems(data).length
          });
        }
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  };

  const calculateTotalValue = (items) => {
    return items.reduce((sum, item) => {
      const stock = Number(item.stock) || 0;
      const price = Number(item.price) || 0;
      return sum + stock * price;
    }, 0);
  };

  const getLowStockItems = (items) => {
    return items.filter(item => {
      const stock = Number(item.stock) || 0;
      const initialQty = Number(item.initial_quantity) || 100;
      return stock > 0 && stock < initialQty * 0.3;
    });
  };

  const getOutOfStockItems = (items) => {
    return items.filter(item => Number(item.stock) === 0);
  };

  const getExpiringSoonItems = (items) => {
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    return items.filter(item => {
      if (!item.expiry_date) return false;
      const expiryDate = new Date(item.expiry_date);
      return expiryDate > today && expiryDate <= thirtyDaysFromNow;
    });
  };

  const calculateTrend = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  if (loading) {
    return (
      <div className="app-container">
        <style dangerouslySetInnerHTML={{ __html: dashboardStyles }} />
        <div className="main-content">
          <h1>Loading Dashboard...</h1>
        </div>
      </div>
    );
  }

  const totalProducts = grocery.length;
  const totalStockValue = calculateTotalValue(grocery);
  const lowStockItems = getLowStockItems(grocery);
  const outOfStockItems = getOutOfStockItems(grocery);
  const expiringSoonItems = getExpiringSoonItems(grocery);
  
  const productTrend = previousStats ? calculateTrend(totalProducts, previousStats.totalProducts) : 0;
  const valueTrend = previousStats ? calculateTrend(totalStockValue, previousStats.totalStockValue) : 0;
  const alertTrend = previousStats ? calculateTrend(lowStockItems.length, previousStats.lowStockCount) : 0;

  return (
    <div className="app-container">
      <style dangerouslySetInnerHTML={{ __html: dashboardStyles }} />
      <div className="main-content">
        <h1>Dashboard Overview</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="icon fa-box"></div>
            <div className="value">{totalProducts}</div>
            <div className="label">TOTAL PRODUCTS</div>
            <div className="trend" style={{ color: productTrend >= 0 ? '#2ecc71' : '#e74c3c' }}>
              {productTrend >= 0 ? '↑' : '↓'} {Math.abs(productTrend)}% from last update
            </div>
          </div>
          
          <div className="stat-card">
            <div className="icon fa-money"></div>
            <div className="value">₹ {totalStockValue.toLocaleString()}</div>
            <div className="label">CURRENT STOCK VALUE</div>
            <div className="trend" style={{ color: valueTrend >= 0 ? '#2ecc71' : '#e74c3c' }}>
              {valueTrend >= 0 ? '↑' : '↓'} {Math.abs(valueTrend)}% from last update
            </div>
          </div>
          
          <div className="stat-card">
            <div className="icon fa-alert"></div>
            <div className="value">{lowStockItems.length + outOfStockItems.length}</div>
            <div className="label">STOCK ALERTS</div>
            <div className="trend" style={{ color: alertTrend <= 0 ? '#2ecc71' : '#e74c3c' }}>
              {alertTrend <= 0 ? '↓' : '↑'} {Math.abs(alertTrend)}% from last update
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="chart-container">
            <div className="chart-title">STOCK BY CATEGORY</div>
            <CategoryChart grocery={grocery} />
            <p style={{ fontSize: '0.8em', color: '#7f8c8d', textAlign: 'center', marginTop: '15px' }}>
              Stock distribution across different product categories
            </p>
          </div>

          <div className="chart-container">
            <div className="chart-title" style={{ marginBottom: '20px' }}>STOCK ALERTS</div>
            
            {outOfStockItems.length === 0 && lowStockItems.length === 0 && expiringSoonItems.length === 0 ? (
              <div className="no-alerts">✅ No alerts at the moment!</div>
            ) : (
              <>
                {outOfStockItems.length > 0 && (
                  <div className="alert-item out-of-stock">
                    <strong>OUT OF STOCK ({outOfStockItems.length}):</strong><br />
                    {outOfStockItems.slice(0, 3).map(item => item.name).join(', ')}
                    {outOfStockItems.length > 3 && ` +${outOfStockItems.length - 3} more`}
                  </div>
                )}
                
                {lowStockItems.length > 0 && (
                  <div className="alert-item low-stock">
                    <strong>LOW STOCK ({lowStockItems.length}):</strong><br />
                    {lowStockItems.slice(0, 3).map(item => `${item.name} (${item.stock})`).join(', ')}
                    {lowStockItems.length > 3 && ` +${lowStockItems.length - 3} more`}
                  </div>
                )}
                
                {expiringSoonItems.length > 0 && (
                  <div className="alert-item expiring-soon">
                    <strong>EXPIRING SOON ({expiringSoonItems.length}):</strong><br />
                    {expiringSoonItems.slice(0, 3).map(item => item.name).join(', ')}
                    {expiringSoonItems.length > 3 && ` +${expiringSoonItems.length - 3} more`}
                  </div>
                )}
              </>
            )}
            
            <button className="action-button" onClick={fetchGroceryData}>
              REFRESH DATA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;