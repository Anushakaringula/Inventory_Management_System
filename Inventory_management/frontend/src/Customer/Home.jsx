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
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>Loading...</p>
      </div>
    );
  }

  const filteredItems = selectedCategory
    ? grocery.filter((item) => selectedCategory.includes(item.category))
    : grocery;

  return (
    <>
      {/* Categories */}
      <div style={{ display: "flex", marginBottom: "20px", marginTop: "10px", overflowX: "auto" }}>
        {Category.map((cat) => (
          <div
            key={cat.id}
            style={{ 
              textAlign: "center", 
              cursor: "pointer", 
              padding: "10px", 
              margin: "10px",
              minWidth: "80px"
            }}
            onClick={() => setSelectedCategory(cat.match)}
          >
            <div style={{ borderRadius: "50%", padding: "10px" }}>
              <img src={cat.image} alt={cat.label} width="60px" height="60px" />
            </div>
            <p>{cat.label}</p>
          </div>
        ))}
      </div>

      {/* Grocery Cards */}
      {filteredItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>No products available</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
          {filteredItems.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                margin: "5px",
                width: "12%",
                minWidth: "150px",
                position: "relative",
              }}
            >
              <Link to={`/product/${item._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  width="100px" 
                  height="100px"
                  style={{ objectFit: "cover" }}
                />
                <h3 style={{ fontSize: "16px", margin: "5px 0" }}>{item.name}</h3>
              </Link>

              <p style={{ margin: "3px 0" }}>Price: ₹{item.price}</p>
              <p style={{ margin: "3px 0" }}>Unit: {item.unit}</p>
              <p style={{ margin: "3px 0", fontSize: "12px", color: "#666" }}>
                Category: {item.category}
              </p>

              {/* Favorite Icon */}
              {user && (
                <span
                  style={{ 
                    position: "absolute", 
                    top: "10px", 
                    right: "10px", 
                    cursor: "pointer", 
                    zIndex: 2 
                  }}
                  onClick={() => toggleFavorites(item)}
                >
                  <img 
                    src={item.isFav ? "red-heart.png" : "heart.jpg"} 
                    alt="fav" 
                    width="25px" 
                    height="25px"
                  />
                </span>
              )}

              {/* Cart Button */}
              <button
                onClick={() => toggleCart(item)}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  backgroundColor: item.inCart ? "#6c757d" : "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "8px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.3s"
                }}
              >
                {item.inCart ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Home;