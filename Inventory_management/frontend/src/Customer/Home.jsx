// import React, { useEffect, useState } from "react";
// import Category from "./Category";
// import { Link } from "react-router-dom";

// function Home({ cart, setCart, favorites, setFavorites }) {
//   const [grocery, setGrocery] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   // ✅ Fetch groceries
//   useEffect(() => {
//     fetch("http://localhost:4000/api/grocery")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched data:", data);
//         setGrocery(data);
//       })
//       .catch((err) => console.error("Error fetching:", err));
//   }, []);

//   const filteredItems = selectedCategory
//     ? grocery.filter((item) => selectedCategory.includes(item.category))
//     : grocery;

//   // ✅ Get current logged-in user
//   const user = JSON.parse(localStorage.getItem("user"));

//   // ✅ Toggle Cart + Update DB
//   const toggleCart = async (item) => {
//     if (!user) {
//       alert("Please login to add items to cart");
//       return;
//     }

//     try {
//       const res = await fetch(
//         `http://localhost:4000/api/users/cart/${item._id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userId: user._id }),
//         }
//       );

//       const data = await res.json();
//       console.log("Cart updated in DB:", data);

//       // Update frontend cart
//       setCart((prev) => {
//         const exists = prev.find((p) => p._id === item._id);
//         if (exists) {
//           return prev.filter((p) => p._id !== item._id);
//         } else {
//           return [...prev, item];
//         }
//       });
//     } catch (err) {
//       console.error("Error updating cart:", err);
//     }
//   };

//   // ✅ Toggle Favorites + Update DB
//   const toggleFavorites = async (item) => {
//     if (!user) {
//       alert("Please login to add favorites");
//       return;
//     }

//     try {
//       const res = await fetch(
//         `http://localhost:4000/api/users/favorites/${item._id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userId: user._id }),
//         }
//       );

//       const data = await res.json();
//       console.log("Favorites updated in DB:", data);

//       // Update frontend favorites
//       setFavorites((prev) => {
//         const exists = prev.find((p) => p._id === item._id);
//         if (exists) {
//           return prev.filter((p) => p._id !== item._id);
//         } else {
//           return [...prev, item];
//         }
//       });
//     } catch (err) {
//       console.error("Error updating favorites:", err);
//     }
//   };

//   return (
//     <>
//       {/* ✅ Categories */}
//       <div style={{ display: "flex", marginBottom: "20px", marginTop: "10px" }}>
//         {Category.map((cat) => (
//           <div
//             key={cat.id}
//             style={{
//               textAlign: "center",
//               cursor: "pointer",
//               padding: "10px",
//               margin: "10px",
//             }}
//             onClick={() => setSelectedCategory(cat.match)}
//           >
//             <div style={{ borderRadius: "50%", padding: "10px" }}>
//               <img src={cat.image} alt={cat.label} width="60px" height="60px" />
//             </div>
//             <p>{cat.label}</p>
//           </div>
//         ))}
//       </div>

//       {/* ✅ Grocery Cards */}
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           alignItems: "flex-start",
//           justifyContent: "space-evenly",
//         }}
//       >
//         {filteredItems.map((item) => (
//           <div
//             key={item._id}
//             style={{
//               border: "1px solid #ccc",
//               padding: "10px",
//               borderRadius: "8px",
//               margin: "5px",
//               width: "12%",
//               display: "flex",
//               flexDirection: "column",
//               position: "relative",
//               zIndex: 1,
//             }}
//           >
//             {/* Only wrap image and title in Link */}
//             <div style={{ cursor: "pointer" }}>
//               <Link
//                 to={`/product/${item._id}`}
//                 style={{ textDecoration: "none", color: "inherit" }}
//               >
//                 <img src={item.image} alt={item.name} width="100px" height="100px" />
//                 <h3>{item.name}</h3>
//               </Link>

//               {/* Outside Link */}
//               <p>Price: ₹{item.price}</p>
//               <p>Unit: {item.unit}</p>
//               <p>Category: {item.category}</p>
//             </div>

//             {/* ❤️ Favorite icon */}
//             <span
//               style={{
//                 position: "absolute",
//                 top: "10px",
//                 right: "10px",
//                 fontSize: "30px",
//                 cursor: "pointer",
//                 zIndex: 2,
//               }}
//             >
//               <img
//                 src={
//                   favorites.find((fav) => fav._id === item._id)
//                     ? "red-heart.png"
//                     : "heart.jpg"
//                 }
//                 alt="fav"
//                 width={"20px"}
//                 height={"20px"}
//                 onClick={() => toggleFavorites(item)}
//               />
//             </span>

//             {/* 🛒 Add to Cart */}
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 gap: "15px",
//                 marginTop: "10px",
//                 zIndex: 2,
//               }}
//             >
//               <button
//                 onClick={() => toggleCart(item)}
//                 style={{
//                   backgroundColor: "red",
//                   border: "none",
//                   color: "white",
//                   padding: "8px",
//                   borderRadius: "8px",
//                   cursor: "pointer"
//                 }}
//               >
//                 {cart.find((p) => p._id === item._id)
//                   ? "Remove from Cart"
//                   : "Add to Cart"}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default Home;



import React, { useEffect, useState } from "react";
import Category from "./Category";
import { Link } from "react-router-dom";

function Home({ cart, setCart, favorites, setFavorites }) {
  const [grocery, setGrocery] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch ALL data and wait for everything to complete
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        console.log("Starting data fetch...");
        
        // First, fetch user cart and favorites if user exists
        let userCartIds = [];
        let userFavIds = [];
        
        if (user) {
          // Fetch cart
          const cartRes = await fetch(`http://localhost:4000/api/users/${user._id}/cart`);
          const cartData = await cartRes.json();
          userCartIds = cartData.cart || [];
          console.log("Cart IDs from DB:", userCartIds);
          
          // Fetch favorites
          const favRes = await fetch(`http://localhost:4000/api/users/${user._id}/favourites`);
          const favData = await favRes.json();
          userFavIds = favData.favourites || [];
          console.log("Favorites IDs from DB:", userFavIds);
          
          setCart(userCartIds);
          setFavorites(userFavIds);
        }

        // Then fetch groceries
        const groceryRes = await fetch("http://localhost:4000/api/grocery");
        const groceryData = await groceryRes.json();
        console.log("Groceries fetched:", groceryData.length, "items");
        
        // Merge the data immediately
        const mergedData = groceryData.map((item) => ({
          ...item,
          inCart: userCartIds.includes(item._id),
          isFav: userFavIds.includes(item._id),
        }));
        
        console.log("Merged data sample:", mergedData.slice(0, 3));
        setGrocery(mergedData);
        setDataLoaded(true);
        
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllData();
  }, []); // Only run once on mount

  // Toggle Cart
  const toggleCart = async (item) => {
    if (!user) {
      alert("Please login");
      return;
    }

    const isInCart = item.inCart;
    
    // Update the grocery array immediately
    setGrocery(prevGrocery => 
      prevGrocery.map(g => 
        g._id === item._id ? { ...g, inCart: !isInCart } : g
      )
    );
    
    // Update cart array
    const updatedCart = isInCart
      ? cart.filter((id) => id !== item._id)
      : [...cart, item._id];
    setCart(updatedCart);

    try {
      const response = await fetch(`http://localhost:4000/api/users/cart/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      });
      console.log("Cart update response:", response.ok);
    } catch (err) {
      console.error("Error updating cart:", err);
      // Revert on error
      setGrocery(prevGrocery => 
        prevGrocery.map(g => 
          g._id === item._id ? { ...g, inCart: isInCart } : g
        )
      );
      setCart(cart);
      alert("Failed to update cart. Please try again.");
    }
  };

  // Toggle Favorites
  const toggleFavorites = async (item) => {
    if (!user) {
      alert("Please login");
      return;
    }

    const isFav = item.isFav;
    
    // Update the grocery array immediately
    setGrocery(prevGrocery => 
      prevGrocery.map(g => 
        g._id === item._id ? { ...g, isFav: !isFav } : g
      )
    );
    
    // Update favorites array
    const updatedFav = isFav
      ? favorites.filter((id) => id !== item._id)
      : [...favorites, item._id];
    setFavorites(updatedFav);

    try {
      const response = await fetch(`http://localhost:4000/api/users/favorites/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      });
      console.log("Favorites update response:", response.ok);
    } catch (err) {
      console.error("Error updating favorites:", err);
      // Revert on error
      setGrocery(prevGrocery => 
        prevGrocery.map(g => 
          g._id === item._id ? { ...g, isFav: isFav } : g
        )
      );
      setFavorites(favorites);
      alert("Failed to update favorites. Please try again.");
    }
  };

  if (loading || !dataLoaded) {
    return (
      <div style={{
        background: "linear-gradient(to bottom, #f8faf9 0%, #ffffff 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          textAlign: "center",
          padding: "40px",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
        }}>
          <div style={{
            width: "50px",
            height: "50px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #275659ff",
            borderRadius: "50%",
            margin: "0 auto 20px",
            animation: "spin 1s linear infinite"
          }}></div>
          <p style={{ fontSize: "18px", color: "#2d3748", fontWeight: "600" }}>Loading...</p>
        </div>
      </div>
    );
  }

  const filteredItems = selectedCategory
    ? grocery.filter((item) => selectedCategory.includes(item.category))
    : grocery;

  return (
    <div style={{
      background: "linear-gradient(to bottom, #f8faf9 0%, #ffffff 100%)",
      minHeight: "100vh",
      paddingBottom: "40px"
    }}>
      {/* Categories Section */}
      <div style={{ padding: "0 20px", marginBottom: "40px", marginTop: "20px" }}>
        <h2 style={{
          fontSize: "28px",
          fontWeight: "600",
          color: "#2d3748",
          marginBottom: "20px",
          textAlign: "center"
        }}>
          Live Data. Limitless Control
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
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "40px",
          padding: "10px 0"
        }}>
          {filteredItems.map((item) => (
            <div
              key={item._id}
              style={{
                background: "white",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative"
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
              <Link 
                to={`/product/${item._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {/* Image Container */}
                <div style={{
                  width: "100%",
                  height: "160px",
                  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "15px",
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
                    left: "10px",
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
                <div style={{ padding: "14px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#2d3748",
                    margin: "0 0 8px 0",
                    lineHeight: "1.3",
                    minHeight: "40px"
                  }}>
                    {item.name}
                  </h3>
                  
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                    flexWrap: "wrap"
                  }}>
                    <div><span style={{
                      fontSize: "20px",
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
                    </div>
                    
                    <div><span style={{
                      fontSize: "13px",
                      color: "#1f3932ff",
                      background: "#f7fafc",
                      padding: "4px 8px",
                      borderRadius: "6px"
                    }}>
                      {item.stock} left
                    </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Favorite Icon */}
              {user && (
                <span
                  style={{ 
                    position: "absolute", 
                    top: "10px", 
                    right: "10px", 
                    cursor: "pointer", 
                    zIndex: 10,
                    background: "white",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    transition: "all 0.3s ease"
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorites(item);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <img 
                    src={item.isFav ? "red-heart.png" : "heart.jpg"} 
                    alt="fav" 
                    width="18px" 
                    height="18px"
                  />
                </span>
              )}

              {/* Cart Button */}
              <div style={{ padding: "0 14px 14px 14px" }}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleCart(item);
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 16px",
                    background: item.inCart 
                      ? "#6c757d" 
                      : "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    if (!item.inCart) {
                      e.currentTarget.style.transform = "scale(1.02)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {item.inCart ? "Remove from Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
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

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Home;