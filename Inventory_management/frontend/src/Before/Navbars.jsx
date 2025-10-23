// 

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Search functionality
  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (query.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/grocery");
      const data = await response.json();
      
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(filtered.slice(0, 8)); // Limit to 8 results
      setShowResults(true);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleResultClick = (productId) => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
    navigate(`/product/${productId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleResultClick(searchResults[0].id);
    }
  };

  const handleBlur = () => {
    // Delay to allow click on search result
    setTimeout(() => setShowResults(false), 200);
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          padding: "10px 5px 10px 5px",
          position: "sticky",
          top: 0,
          zIndex: "1000",
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        }}
      >
        <div
          onClick={toggleMenu}
          style={{
            cursor: "pointer",
            padding: "8px",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            background: "rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <img
            src="/burger-bar.png"
            alt="menu"
            width="28px"
            height="28px"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>

        <div style={{ display: "flex", gap: "30px", alignItems: "center", position: "relative" }}>
          {/* Search Bar with Dropdown */}
          <div style={{ position: "relative" }}>
            <form onSubmit={handleSearchSubmit}>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchResults.length > 0 && setShowResults(true)}
                  onBlur={handleBlur}
                  style={{
                    height: "44px",
                    width: "450px",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    padding: "12px 45px 12px 20px",
                    borderRadius: "25px",
                    outline: "none",
                    fontSize: "15px",
                    background: "rgba(255, 255, 255, 0.95)",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
                  }}
                />
                <div style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "20px",
                  color: "#718096",
                  pointerEvents: "none"
                }}>
                  🔍
                </div>
              </div>
            </form>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  left: 0,
                  width: "100%",
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "16px",
                  maxHeight: "450px",
                  overflowY: "auto",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                  zIndex: 1001,
                }}
              >
                {searchResults.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => handleResultClick(item.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "15px",
                      cursor: "pointer",
                      borderBottom: index < searchResults.length - 1 ? "1px solid #f0f0f0" : "none",
                      gap: "15px",
                      transition: "all 0.2s ease",
                      borderRadius: index === 0 ? "16px 16px 0 0" : index === searchResults.length - 1 ? "0 0 16px 16px" : "0"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8faf9";
                      e.currentTarget.style.transform = "translateX(5px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "white";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <div style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "8px"
                    }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        width="100%"
                        height="100%"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontWeight: "600", 
                        fontSize: "15px",
                        color: "#2d3748",
                        marginBottom: "4px"
                      }}>
                        {item.name}
                      </div>
                      <div style={{ 
                        fontSize: "13px", 
                        color: "#718096",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}>
                        <span style={{
                          background: "#f7fafc",
                          padding: "2px 8px",
                          borderRadius: "6px",
                          fontSize: "12px"
                        }}>
                          {item.category}
                        </span>
                        <span style={{ fontWeight: "600", color: "#203e4fff" }}>
                          ₹{item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results Message */}
            {showResults && searchQuery.length >= 2 && searchResults.length === 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  left: 0,
                  width: "100%",
                  backgroundColor: "white",
                  borderRadius: "16px",
                  padding: "30px 20px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                  textAlign: "center",
                  zIndex: 1001,
                }}
              >
                <div style={{ fontSize: "40px", marginBottom: "10px" }}>🔍</div>
                <div style={{ color: "#2d3748", fontWeight: "600", fontSize: "16px" }}>
                  No products found
                </div>
                <div style={{ color: "#718096", fontSize: "14px", marginTop: "5px" }}>
                  Try a different search term
                </div>
              </div>
            )}
          </div>

          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "8px 16px",
              borderRadius: "12px",
              transition: "all 0.3s ease",
              background: "rgba(255, 255, 255, 0.1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "5px" }}>
              <img 
                src="/home_icon.png" 
                alt="home" 
                width="28px" 
                height="28px"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <p style={{ margin: "0", fontSize: "13px", fontWeight: "600" }}>Home</p>
            </div>
          </Link>

          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "8px 16px",
              borderRadius: "12px",
              transition: "all 0.3s ease",
              background: "rgba(255, 255, 255, 0.1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "5px" }}>
              <img 
                src="/userlogin.png" 
                alt="login" 
                width="28px" 
                height="28px"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <p style={{ margin: "0", fontSize: "13px", fontWeight: "600" }}>Login</p>
            </div>
          </Link>
        </div>
      </nav>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            left: "20px",
            width: "240px",
            background: "white",
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            padding: "0",
            zIndex: 2000,
            borderRadius: "16px",
            overflow: "hidden",
            animation: "slideIn 0.3s ease"
          }}
        >
          <div
            style={{
              padding: "20px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              borderBottom: "1px solid #f0f0f0",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f8faf9";
              e.currentTarget.style.paddingLeft = "25px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.paddingLeft = "20px";
            }}
          >
            <span style={{ fontSize: "20px" }}>⚙️</span>
            <p style={{ margin: "0", fontSize: "15px", fontWeight: "500", color: "#2d3748" }}>Settings</p>
          </div>
          <div
            style={{
              padding: "20px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              borderBottom: "1px solid #f0f0f0",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f8faf9";
              e.currentTarget.style.paddingLeft = "25px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.paddingLeft = "20px";
            }}
          >
            <span style={{ fontSize: "20px" }}>📧</span>
            <p style={{ margin: "0", fontSize: "15px", fontWeight: "500", color: "#2d3748" }}>Contact us</p>
          </div>
          <div
            style={{
              padding: "20px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f8faf9";
              e.currentTarget.style.paddingLeft = "25px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.paddingLeft = "20px";
            }}
          >
            <span style={{ fontSize: "20px" }}>❓</span>
            <p style={{ margin: "0", fontSize: "15px", fontWeight: "500", color: "#2d3748" }}>Help</p>
          </div>
        </div>
      )}
    </>
  );
}