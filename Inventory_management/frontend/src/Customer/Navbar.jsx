// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar({ user, setUser }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false); // for logout dropdown
//   const navigate = useNavigate();

//   const toggleMenu = () => setMenuOpen((prev) => !prev);
//   const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     setUserMenuOpen(false);
//     navigate("/"); // redirect to Before/Homes
//   };

//   return (
//     <>
//       <nav
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           width: "100%",
//           boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//           padding: "5px 5px",
//           position: "sticky",
//           top: 0,
//           backgroundColor: "#fff",
//           zIndex: 1000,
//         }}
//       >
//         <img
//           src="/burger-bar.png"
//           alt="logo"
//           width={25}
//           height={25}
//           onClick={toggleMenu}
//           style={{ cursor: "pointer" }}
//         />

//         <div style={{ display: "flex", gap: "20px", marginRight: "10px" }}>
//           <input
//             type="text"
//             placeholder="search"
//             style={{
//               height: 25,
//               width: 400,
//               border: "1px solid #ddd",
//               padding: "8px 12px",
//               borderRadius: 8,
//               outline: "none",
//               fontSize: 15,
//               boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
//             }}
//           />

//           <Link to="/" style={{ textDecoration: "none", color: "black" }}>
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
//               <img src="/home_icon.png" alt="home" width={25} height={25} />
//               <p style={{ marginTop: -2, fontSize: 14 }}>Home</p>
//             </div>
//           </Link>

//           {/* User icon */}
//           <div style={{ position: "relative", cursor: user ? "pointer" : "default" }} onClick={user ? toggleUserMenu : null}>
//             <img src="/userlogin.png" alt="user" width={25} height={25} />
//             <p style={{ marginTop: -2, fontSize: 14 }}>{user ? user.name : <Link to="/login">Login</Link>}</p>

//             {user && userMenuOpen && (
//               <div
//                 style={{
//                   position: "absolute",
//                   top: 40,
//                   background: "#fff",
//                   border: "1px solid #ccc",
//                   borderRadius: 5,
//                   boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
//                   padding: "5px 0",
//                   minWidth: 120,
//                   textAlign: "center",
//                   zIndex: 10,
//                 }}
//               >
//                 <p onClick={handleLogout} style={{ margin: 0, padding: 8, cursor: "pointer", fontWeight: "bold" }}>
//                   Logout
//                 </p>
//               </div>
//             )}
//           </div>

//           <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
//               <img src="/cart.png" alt="cart" width={25} height={25} />
//               <p style={{ marginTop: -2, fontSize: 14 }}>Cart</p>
//             </div>
//           </Link>
//         </div>
//       </nav>

//       {menuOpen && (
//         <div style={{ position: "absolute", top: 90, left: 10, width: 200, background: "#fafafaf8", boxShadow: "2px 0 6px rgba(0,0,0,0.1)", padding: 10, zIndex: 2 }}>
//           <Link to="/orders" style={{ textDecoration: "none", color: "black" }}>
//             <p style={{ margin: "10px 0" }}>Your Orders</p>
//           </Link>
//           <Link to="/favorites" style={{ textDecoration: "none", color: "inherit" }}>
//             <p style={{ marginTop: -2, fontSize: 14 }}>Favorites</p>
//           </Link>
//           <p>Settings</p>
//           <p>Contact us</p>
//           <p>Help</p>
//         </div>
//       )}
//     </>
//   );
// }

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setUserMenuOpen(false);
    navigate("/");
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
      handleResultClick(searchResults[0]._id);
    }
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          padding: "5px 5px",
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          zIndex: 1000,
        }}
      >
        <img
          src="/burger-bar.png"
          alt="logo"
          width={25}
          height={25}
          onClick={toggleMenu}
          style={{ cursor: "pointer" }}
        />

        <div style={{ display: "flex", gap: "20px", marginRight: "10px", position: "relative" }}>
          {/* Search Bar with Dropdown */}
          <div style={{ position: "relative" }}>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                style={{
                  height: 25,
                  width: 400,
                  border: "1px solid #ddd",
                  padding: "8px 12px",
                  borderRadius: 8,
                  outline: "none",
                  fontSize: 15,
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                }}
              />
            </form>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  marginTop: "5px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  zIndex: 1001,
                }}
              >
                {searchResults.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => handleResultClick(item._id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      cursor: "pointer",
                      borderBottom: "1px solid #f0f0f0",
                      gap: "10px",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      width="50"
                      height="50"
                      style={{ objectFit: "cover", borderRadius: "5px" }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "500", fontSize: "14px" }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        {item.category} • ₹{item.price}
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
                  top: "100%",
                  left: 0,
                  width: "100%",
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  marginTop: "5px",
                  padding: "15px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  textAlign: "center",
                  color: "#666",
                  zIndex: 1001,
                }}
              >
                No products found
              </div>
            )}
          </div>

          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <img src="/home_icon.png" alt="home" width={25} height={25} />
              <p style={{ marginTop: -2, fontSize: 14 }}>Home</p>
            </div>
          </Link>

          {/* User icon */}
          <div style={{ position: "relative", cursor: user ? "pointer" : "default" }} onClick={user ? toggleUserMenu : null}>
            <img src="/userlogin.png" alt="user" width={25} height={25} />
            <p style={{ marginTop: -2, fontSize: 14 }}>{user ? user.name : <Link to="/login">Login</Link>}</p>

            {user && userMenuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: 40,
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: 5,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  padding: "5px 0",
                  minWidth: 120,
                  textAlign: "center",
                  zIndex: 10,
                }}
              >
                <p onClick={handleLogout} style={{ margin: 0, padding: 8, cursor: "pointer", fontWeight: "bold" }}>
                  Logout
                </p>
              </div>
            )}
          </div>

          <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <img src="/cart.png" alt="cart" width={25} height={25} />
              <p style={{ marginTop: -2, fontSize: 14 }}>Cart</p>
            </div>
          </Link>
        </div>
      </nav>

      {menuOpen && (
        <div style={{ position: "absolute", top: 90, left: 10, width: 200, background: "#fafafaf8", boxShadow: "2px 0 6px rgba(0,0,0,0.1)", padding: 10, zIndex: 2 }}>
          <Link to="/orders" style={{ textDecoration: "none", color: "black" }}>
            <p style={{ margin: "10px 0" }}>Your Orders</p>
          </Link>
          <Link to="/favorites" style={{ textDecoration: "none", color: "inherit" }}>
            <p style={{ marginTop: -2, fontSize: 14 }}>Favorites</p>
          </Link>
          <p>Settings</p>
          <p>Contact us</p>
          <p>Help</p>
        </div>
      )}
    </>
  );
}