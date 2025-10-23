import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import ProductManager from "./ProductManager";
import Orders from "./orders";
import Billing from "./Billing";

const adminStyles = `
/* General Layout */
body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f7f6;
}

.admin-container {
  display: flex;
  height: 100vh;
  width: 100%;
}

/* Sidebar Styles */
/* Sidebar Styles */
.sidebar {
  width: 300px;
  background: linear-gradient(180deg, #b6c4d8ff, #79877eff); /* Gradient from top to bottom */
  color: white;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  position: fixed;
  height: 100vh;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  box-shadow: 3px 0 10px rgba(0,0,0,0.1);
}


.sidebar .logo {
  text-align: center;
  font-size: 1.6em;
  font-weight: bold;
  padding: 20px 10cpx;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  margin-bottom: 20px;
  letter-spacing: 1px;
}

.nav-item {
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.2em;
  cursor: pointer;
  color: #030303ff;
  border-radius: 10px;
  margin: 5px 10px;
  transition: background 0.3s, transform 0.2s;
  font-weight: bold;
}

.nav-item:hover {
  background-color: #2e5a6f; /* Hover color */
  transform: translateX(4px);
  color: #ffffffff;

}

.nav-item.active {
  fbackground-color: #2e5a6f; /* Active color */
  font-weight: bold;
  color: #f3eeeeff;
}

.nav-item i {
  font-size: 1.4em;
}

/* Main Content */
.main-content {
  margin-left: 150px; /* match sidebar width */
  padding: 30px;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f4f7f6;
}

/* Headings */
h1, h2 {
  color: #203a43;
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
    { id: "billing", label: "Billing", icon: "fa-analytics" },
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
      case "billing":
        return <Billing/>;
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
