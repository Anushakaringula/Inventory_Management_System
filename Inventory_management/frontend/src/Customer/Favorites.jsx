// import React from 'react'

// function Favorites( { favorites,setFavorites }) {
//   console.log("Cart page received:", favorites);
//   const toggleFavorites = (item) => {
//     setFavorites((prev) => {
//       const exists = prev.find((p) => p.id === item.id);
//       if (exists) {
//         return prev.filter((p) => p.id !== item.id);
//       } else {
//         return [...prev, item];
//       }
//     });
//   };
//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Your Favorites</h2>
//       {favorites.length === 0 ?
//         (<p>No favorite items added.</p>) :
//         (<div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "flex-start" }}>
//           {favorites.map((item) => (
//             <div
//               key={item.id}
//               style={{
//                 border: "1px solid #ccc",
//                 padding: "10px",
//                 borderRadius: "8px",
//                 margin: "5px",
//                 width: "12%",
//                 display: "flex",
//                 flexDirection: "column",
//                 position: "relative"
//               }}>
//               <img src={item.image} alt={item.name} width="100px" height="100px" />
//               <h3>{item.name}</h3>
//               <p>Price: ₹{item.price}</p>
//               <p>Unit: {item.unit}</p>
//               <p>Category: {item.category}</p>

//               <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
        
//                 <button onClick={() => toggleFavorites(item)}
//                   style={{
//                     backgroundColor: "red",
//                     border: "none",
//                     color: "white",
//                     padding: "8px",
//                     borderRadius: "8px",
//                   }}>
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>)}
//     </div>
//   );
// }

// export default Favorites




// import React, { useEffect, useState } from "react";

// function Favorites({ currentUser }) {
//   const [favorites, setFavorites] = useState([]);

//   // Fetch user's favorite products from backend
//   useEffect(() => {
//     if (!currentUser) return;

//     const fetchFavorites = async () => {
//       try {
//         const res = await fetch(`http://localhost:4000/api/users/${currentUser._id}/favourites`);
//         const data = await res.json();
//         setFavorites(data);
//       } catch (err) {
//         console.error("Failed to fetch favorites:", err);
//       }
//     };

//     fetchFavorites();
//   }, [currentUser]);

//   // Remove item from favorites
//   const removeFromFavorites = async (productId) => {
//     try {
//       await fetch(`http://localhost:4000/api/users/favourites/${productId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: currentUser._id,
//           remove: true, // backend should handle remove
//         }),
//       });

//       setFavorites((prev) => prev.filter((item) => item._id !== productId));
//     } catch (err) {
//       console.error("Failed to remove favorite:", err);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Your Favorites</h2>
//       {favorites.length === 0 ? (
//         <p>No favorite items added.</p>
//       ) : (
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//           {favorites.map((item) => (
//             <div
//               key={item._id}
//               style={{
//                 border: "1px solid #ccc",
//                 padding: "10px",
//                 borderRadius: "8px",
//                 width: "200px",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <img src={item.image} alt={item.name} width="100" height="100" />
//               <h3>{item.name}</h3>
//               <p>Price: ₹{item.price}</p>
//               <p>Unit: {item.unit}</p>
//               <p>Category: {item.category}</p>

//               <button
//                 onClick={() => removeFromFavorites(item._id)}
//                 style={{
//                   backgroundColor: "red",
//                   border: "none",
//                   color: "white",
//                   padding: "8px",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                   marginTop: "10px",
//                 }}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Favorites;



import React, { useEffect, useState } from "react";

function Favorites({ favorites, setFavorites }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [allProducts, setAllProducts] = useState([]);

  // Fetch all grocery products
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/grocery");
        const data = await res.json();
        setAllProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllProducts();
  }, []);

  // Fetch user's favourites from DB
  useEffect(() => {
    if (!user || allProducts.length === 0) return;

    const fetchFavourites = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/users/${user._id}/favourites`);
        const data = await res.json();
        const favProducts = allProducts.filter((item) => data.favourites.includes(item._id));
        setFavorites(favProducts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFavourites();
  }, [user, allProducts, setFavorites]);

  // Toggle favorite
  const toggleFavorites = async (item) => {
    try {
      const res = await fetch(`http://localhost:4000/api/users/favorites/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      });
      const data = await res.json();

      // Update frontend state
      setFavorites((prev) => {
        const exists = prev.find((p) => p._id === item._id);
        if (exists) {
          return prev.filter((p) => p._id !== item._id);
        } else {
          return [...prev, item];
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite items.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {favorites.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                width: "150px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              <img src={item.image} alt={item.name} width="100px" height="100px" />
              <h4>{item.name}</h4>
              <p>Price: ₹{item.price}</p>
              <p>Unit: {item.unit}</p>

              {/* Heart icon */}
              <img
                src={favorites.find((fav) => fav._id === item._id) ? "red-heart.png" : "heart.jpg"}
                alt="fav"
                width="20px"
                height="20px"
                style={{ position: "absolute", top: "5px", right: "5px", cursor: "pointer" }}
                onClick={() => toggleFavorites(item)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
