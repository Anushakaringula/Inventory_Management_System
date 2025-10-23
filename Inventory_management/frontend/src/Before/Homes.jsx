import React, { useEffect, useState } from "react";
import Category from "../Customer/Category";
import { Link } from "react-router-dom";

function Home() {
  const [grocery, setGrocery] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/grocery")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setGrocery(data);
      })
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  const filteredItems = selectedCategory
    ? grocery.filter((item) => selectedCategory.includes(item.category))
    : grocery;

  return (
    <div style={{
      background: "linear-gradient(to bottom, #f8faf9 0%, #ffffff 100%)",
      minHeight: "100vh",
      paddingBottom: "40px"
    }}>
      {/* Hero Section */}
      
      {/* Categories Section */}
      <div style={{ padding: "0 20px", marginBottom: "40px" }}>
        <h2 style={{
          fontSize: "28px",
          fontWeight: "600",
          color: "#2d3748",
          marginBottom: "20px",
          textAlign: "center"
        }}>
          Shop by Category
        </h2>
        <div style={{
          display: "flex",
          gap: "15px",
          overflowX: "auto",
          padding: "10px 0",
          scrollbarWidth: "thin",
          scrollbarColor: "#0f2027 #f1f1f1"
        }}>
          {/* All Categories Button */}
          <div
            style={{
              textAlign: "center",
              cursor: "pointer",
              padding: "15px",
              minWidth: "100px",
              borderRadius: "16px",
              background: !selectedCategory 
                ? "linear-gradient(to right, #0f2027, #203a43, #2c5364)" 
                : "white",
              color: !selectedCategory ? "white" : "#2d3748",
              boxShadow: !selectedCategory 
                ? "0 8px 20px rgba(102, 126, 234, 0.4)" 
                : "0 4px 12px rgba(0,0,0,0.08)",
              transform: !selectedCategory ? "translateY(-5px)" : "translateY(0)",
              transition: "all 0.3s ease"
            }}
            onClick={() => setSelectedCategory(null)}
            onMouseEnter={(e) => {
              if (selectedCategory !== null) {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== null) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              }
            }}
          >
            <div style={{
              width: "60px",
              height: "60px",
              margin: "0 auto 10px",
              borderRadius: "50%",
              background: !selectedCategory ? "rgba(255,255,255,0.2)" : "#f7fafc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px"
            }}>
              🛒
            </div>
            <p style={{ margin: "0", fontWeight: "600", fontSize: "14px" }}>All</p>
          </div>

          {Category.map((cat) => {
            const isSelected = selectedCategory && selectedCategory.includes(cat.match[0]);
            return (
              <div
                key={cat.id}
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                  padding: "15px",
                  minWidth: "100px",
                  borderRadius: "16px",
                  background: isSelected 
                    ? "linear-gradient(to right, #0f2027, #203a43, #2c5364)" 
                    : "white",
                  color: isSelected ? "white" : "#2d3748",
                  boxShadow: isSelected 
                    ? "0 8px 20px rgba(24, 69, 67, 0.4)" 
                    : "0 4px 12px rgba(0,0,0,0.08)",
                  transform: isSelected ? "translateY(-5px)" : "translateY(0)",
                  transition: "all 0.3s ease"
                }}
                onClick={() => setSelectedCategory(cat.match)}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                  }
                }}
              >
                <div style={{
                  borderRadius: "50%",
                  padding: "10px",
                  background: isSelected ? "rgba(255,255,255,0.2)" : "#f7fafc"
                }}>
                  <img 
                    src={cat.image} 
                    alt={cat.label} 
                    width="60px" 
                    height="60px"
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <p style={{ margin: "10px 0 0 0", fontWeight: "600", fontSize: "14px" }}>
                  {cat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ padding: "0 20px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#2d3748",
            margin: "0"
          }}>
            {selectedCategory ? "Filtered Products" : "All Products"}
          </h2>
          <span style={{
            background: "#275659ff",
            color: "white",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "600"
          }}>
            {filteredItems.length} items
          </span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "25px",
          padding: "10px 0"
        }}>
          {filteredItems.map((item) => (
            <Link 
              to={`/product/${item.id}`} 
              key={item.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                }}
              >
                {/* Image Container */}
                <div style={{
                  width: "100%",
                  height: "200px",
                  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      transition: "transform 0.3s ease"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                  {/* Category Badge */}
                  <span style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "rgba(61, 107, 121, 0.9)",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "12px",
                    fontSize: "11px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#2d3748",
                    margin: "0 0 8px 0",
                    lineHeight: "1.4",
                    minHeight: "44px"
                  }}>
                    {item.name}
                  </h3>
                  
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px"
                  }}>
                    <span style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#203e4fff"
                    }}>
                      ₹{item.price}
                    </span>
                    <span style={{
                      fontSize: "13px",
                      color: "#718096",
                      background: "#f7fafc",
                      padding: "4px 8px",
                      borderRadius: "6px"
                    }}>
                      per {item.unit}
                    </span>
                    <span style={{
                      fontSize: "15px",
                      fontWeight: "100",
                      color: "#203e4fff"
                    }}>
                      {item.stock} left
                    </span> 
                  </div>

                  {/* View Details Button */}
                  <div style={{
                    marginTop: "auto",
                    padding: "10px 16px",
                    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                    color: "white",
                    borderRadius: "10px",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: "14px",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  >
                    View Details →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
          }}>
            <div style={{ fontSize: "60px", marginBottom: "20px" }}>🔍</div>
            <h3 style={{ color: "#2d3748", fontSize: "24px", marginBottom: "10px" }}>
              No Products Found
            </h3>
            <p style={{ color: "#718096", fontSize: "16px" }}>
              Try selecting a different category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;