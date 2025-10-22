import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import ProductManager from "./ProductManager";
import Orders from "./orders";

const adminStyles = `
/* General Layout */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f4f7f6;
}

.admin-container {
  display: flex;
  height: 100vh;
  width: 100%;
}

/* Sidebar Styles */
.sidebar {
  width: 300px;
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  position: fixed;
  height: 100vh;
}

.sidebar .logo {
  text-align: center;
  font-size: 1.4em;
  font-weight: bold;
  padding: 15px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 20px;
}

.nav-item {
  padding: 15px 25px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.3em;
  cursor: pointer;
  color: #ecf0f1;
  transition: background 0.3s;
}

.nav-item:hover,
.nav-item.active {
  background-color: #34495e;
}

.nav-item i {
  font-size: 1.8em;
}

/* Main Content */
.main-content {
  margin-left: 200px;       /* match your .sidebar width */
  padding: 30px;
  width: calc(100vw - 200px);
  height: 100vh;
  overflow-y: auto;          /* scroll if content is too tall */
  overflow-x: hidden;
}

h1 {
  color: #2c3e50;
}

/* Icon Placeholders */
.fa-dashboard::before { content: "🏠"; }
.fa-products::before { content: "🛍️"; }
.fa-orders::before { content: "📋"; }
.fa-analytics::before { content: "📈"; }
`;

const Admin = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "fa-dashboard" },
    { id: "products", label: "Products", icon: "fa-products" },
    { id: "orders", label: "Orders", icon: "fa-orders" },
    { id: "analytics", label: "Analytics", icon: "fa-analytics" },
  ];

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    document.body.className = "admin-body";
  }, []);

  // ✅ Render selected page dynamically
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <ProductManager />;
      case "orders":
        return <Orders/>
      case "analytics":
        return <h1>Analytics Page (Coming Soon)</h1>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-container">
      <style dangerouslySetInnerHTML={{ __html: adminStyles }} />

      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">ADMIN PANEL</div>
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${currentPage === item.id ? "active" : ""}`}
            onClick={() => handleNavClick(item.id)}
          >
            <i className={item.icon}></i>
            {item.label}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="main-content">{renderPage()}</div>
    </div>
  );
};

export default Admin;
