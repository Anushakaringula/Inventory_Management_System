


// import React, { useEffect, useState } from "react";

// function Favorites({ favorites, setFavorites }) {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [allProducts, setAllProducts] = useState([]);
  

//   // Fetch all grocery products
//   useEffect(() => {
//     const fetchAllProducts = async () => {
//       try {
//         const res = await fetch("http://localhost:4000/api/grocery");
//         const data = await res.json();
//         setAllProducts(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchAllProducts();
//   }, []);

//   // Fetch user's favourites from DB
//   useEffect(() => {
//     if (!user || allProducts.length === 0) return;

//     const fetchFavourites = async () => {
//       try {
//         const res = await fetch(`http://localhost:4000/api/users/${user._id}/favourites`);
//         const data = await res.json();
//         const favProducts = allProducts.filter((item) => data.favourites.includes(item._id));
//         setFavorites(favProducts);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchFavourites();
//   }, [user, allProducts, setFavorites]);

//   // Toggle favorite
//   const toggleFavorites = async (item) => {
//     try {
//       const res = await fetch(`http://localhost:4000/api/users/favorites/${item._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user._id }),
//       });
//       const data = await res.json();

//       // Update frontend state
//       setFavorites((prev) => {
//         const exists = prev.find((p) => p._id === item._id);
//         if (exists) {
//           return prev.filter((p) => p._id !== item._id);
//         } else {
//           return [...prev, item];
//         }
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Your Favorites</h2>
//       {favorites.length === 0 ? (
//         <p>No favorite items.</p>
//       ) : (
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//           {favorites.map((item) => (
//             <div
//               key={item._id}
//               style={{
//                 border: "1px solid #ccc",
//                 padding: "10px",
//                 borderRadius: "8px",
//                 width: "150px",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 position: "relative",
//               }}
//             >
//               <img src={item.image} alt={item.name} width="100px" height="100px" />
//               <h4>{item.name}</h4>
//               <p>Price: ₹{item.price}</p>
//               <p>Unit: {item.unit}</p>

//               {/* Heart icon */}
//               <img
//                 src={favorites.find((fav) => fav._id === item._id) ? "red-heart.png" : "heart.jpg"}
//                 alt="fav"
//                 width="20px"
//                 height="20px"
//                 style={{ position: "absolute", top: "5px", right: "5px", cursor: "pointer" }}
//                 onClick={() => toggleFavorites(item)}
//               />
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
        const favProducts = allProducts.filter((item) =>
          data.favourites.includes(item._id)
        );
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
      await fetch(`http://localhost:4000/api/users/favorites/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      });

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
    <div style={{ padding: "20px", background: "#f8fafa", minHeight: "90vh" }}>
      <h2
        style={{
          color: "#203a43",
          borderBottom: "2px solid #203a43",
          display: "inline-block",
          paddingBottom: "6px",
        }}
      >
        Your Favorites
      </h2>

      {favorites.length === 0 ? (
        <p style={{ marginTop: "20px", color: "#555" }}>No favorite items.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {favorites.map((item) => (
            <div
              key={item._id}
              style={{
                background: "white",
                borderRadius: "16px",
                width: "180px",
                padding: "15px",
                boxShadow: "0 8px 18px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 18px rgba(0,0,0,0.1)";
              }}
            >
              {/* Heart icon */}
              <img
                src={
                  favorites.find((fav) => fav._id === item._id)
                    ? "/red-heart.png"
                    : "/heart.jpg"
                }
                alt="fav"
                width="22px"
                height="22px"
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  cursor: "pointer",
                }}
                onClick={() => toggleFavorites(item)}
              />

              <img
                src={item.image}
                alt={item.name}
                width="120px"
                height="120px"
                style={{
                  borderRadius: "12px",
                  objectFit: "cover",
                  marginBottom: "10px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                }}
              />
              <h4 style={{ margin: "0 0 6px", color: "#203a43", textAlign: "center" }}>
                {item.name}
              </h4>
              <p style={{ margin: "2px 0", fontSize: "14px", color: "#2d3748" }}>
                Price: ₹{item.price}
              </p>
              <p style={{ margin: "2px 0", fontSize: "13px", color: "#555" }}>
                Unit: {item.unit}
              </p>

              <button
                onClick={() => toggleFavorites(item)}
                style={{
                  marginTop: "10px",
                  padding: "6px 12px",
                  backgroundColor: "#203a43",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4f706bff")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#203a43")}
              >
                {favorites.find((fav) => fav._id === item._id) ? "Remove" : "Add to Favorites"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
