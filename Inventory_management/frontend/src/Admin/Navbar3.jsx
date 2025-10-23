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

//           {/* User icon for admin */}
//           <div style={{ position: "relative", cursor: user ? "pointer" : "default" }} onClick={user ? toggleUserMenu : null}>
//             <img src="/userlogin.png" alt="user" width={25} height={25} />
//             <p style={{ marginTop: -2, fontSize: 14 }}>{user ? user.name : "Admin"}</p>

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
//         </div>
//       </nav>

//       {menuOpen && (
//         <div
//           style={{
//             position: "absolute",
//             top: 90,
//             left: 10,
//             width: 200,
//             background: "rgba(250, 250, 250, 0.97)",
//             boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
//             padding: 10,
//             zIndex: 2,
//           }}
//         >
//           <p>Admin Settings</p>
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

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    try {
      const res = await fetch("http://localhost:4000/api/grocery");
      const data = await res.json();
      const filtered = data.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 8));
      setShowResults(true);
    } catch (err) {
      console.error(err);
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
    if (searchResults.length > 0) handleResultClick(searchResults[0].id);
  };

  const handleBlur = () => setTimeout(() => setShowResults(false), 200);

  return (
    <>
      <nav
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: "10px 5px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        }}
      >
        {/* Menu Icon */}
        <div
          onClick={toggleMenu}
          style={{
            cursor: "pointer",
            padding: "8px",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            background: "rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
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

        {/* Search Bar */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center", position: "relative" }}>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowResults(true)}
              onBlur={handleBlur}
              style={{
                height: "44px",
                width: "400px",
                borderRadius: "25px",
                padding: "12px 20px",
                outline: "none",
                fontSize: "15px",
                border: "2px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
            />
          </form>

          {/* Search Results */}
          {showResults && searchResults.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 10px)",
                left: 0,
                width: "100%",
                background: "white",
                borderRadius: "16px",
                maxHeight: "400px",
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
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8faf9")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "8px",
                    }}
                  >
                    <img src={item.image} alt={item.name} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "600", fontSize: "15px", color: "#2d3748" }}>{item.name}</div>
                    <div style={{ fontSize: "13px", color: "#718096", display: "flex", gap: "8px" }}>
                      <span style={{ background: "#f7fafc", padding: "2px 8px", borderRadius: "6px", fontSize: "12px" }}>
                        {item.category}
                      </span>
                      <span style={{ fontWeight: "600", color: "#203e4fff" }}>₹{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Home Link */}
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
              background: "rgba(255,255,255,0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <img src="/home_icon.png" alt="home" width="28px" height="28px" style={{ filter: "brightness(0) invert(1)" }} />
            <p style={{ margin: "0", fontSize: "13px", fontWeight: "600" }}>Home</p>
          </Link>

          {/* User/Admin */}
          {user ? (
  <div style={{ position: "relative" }}>
    <div
      onClick={toggleUserMenu} // click to toggle dropdown
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "8px 16px",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        background: "rgba(255,255,255,0.1)",
      }}
      
      onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
      onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
    >
      <img src="/userlogin.png" alt="user" width="28px" height="28px" style={{ filter: "brightness(0) invert(1)" }} />
      <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color:"white" }}>{user.name}</p>
    </div>

    {userMenuOpen && (
      <div
        style={{
          position: "absolute",
          top: "50px",
          right: 0,
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          minWidth: 120,
          textAlign: "center",
          zIndex: 1001,
        }}
      >
        <p
          onClick={handleLogout}
          style={{ margin: 0, padding: "10px", cursor: "pointer", fontWeight: "600" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f8faf9")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
        >
          Logout
        </p>
      </div>
    )}
  </div>
) : (
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
                background: "rgba(255,255,255,0.1)",
              }}
            >
              <img src="/userlogin.png" alt="login" width="28px" height="28px" style={{ filter: "brightness(0) invert(1)" }} />
              <p style={{ margin: "0", fontSize: "13px", fontWeight: "600" }}>Login</p>
            </Link>
          )}
        </div>
      </nav>

      {/* Side Menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            left: "20px",
            width: "240px",
            background: "white",
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            borderRadius: "16px",
            overflow: "hidden",
            zIndex: 2000,
          }}
        >
          {["Settings ⚙️", "Contact Us 📧", "Help ❓"].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "20px",
                cursor: "pointer",
                borderBottom: i < 2 ? "1px solid #f0f0f0" : "none",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f8faf9")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              <p style={{ margin: 0, fontSize: "15px", fontWeight: "500", color: "#2d3748" }}>{item}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
