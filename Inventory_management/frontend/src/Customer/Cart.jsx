

// import React, { useEffect, useState } from "react";

// function Cart() {
//   const [cartProducts, setCartProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const user = JSON.parse(localStorage.getItem("user"));
//   if (!user) return <p>Please login to see your cart</p>;

//   useEffect(() => {
//     const fetchCartData = async () => {
//       try {
//         setLoading(true);

//         // 1️⃣ Get user's cart IDs from DB
//         const cartRes = await fetch(`http://localhost:4000/api/users/${user._id}/cart`);
//         const cartData = await cartRes.json();
//         const cartIds = cartData.cart; // array of product _id

//         // 2️⃣ Fetch all groceries
//         const groceriesRes = await fetch("http://localhost:4000/api/grocery");
//         const groceries = await groceriesRes.json();

//         // 3️⃣ Filter groceries by cart IDs
//         const filteredProducts = groceries.filter((item) => cartIds.includes(item._id));
//         setCartProducts(filteredProducts);
//       } catch (err) {
//         console.error("Error fetching cart products:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCartData();
//   }, [user._id]);

//   const removeFromCart = async (productId) => {
//     setLoading(true);
//     try {
//       await fetch(`http://localhost:4000/api/users/cart/${productId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user._id, remove: true }),
//       });

//       setCartProducts((prev) => prev.filter((item) => item._id !== productId));
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading cart...</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Your Cart</h2>
//       {cartProducts.length === 0 ? (
//         <p>No items in your cart.</p>
//       ) : (
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//           {cartProducts.map((item) => (
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
//               }}
//             >
//               <img src={item.image} alt={item.name} width="100px" height="100px" />
//               <h4>{item.name}</h4>
//               <p>Price: ₹{item.price}</p>
//               <p>Unit: {item.unit}</p>
//               <button
//                 onClick={() => removeFromCart(item._id)}
//                 style={{
//                   backgroundColor: "red",
//                   color: "white",
//                   border: "none",
//                   padding: "5px 10px",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                   marginTop: "5px",
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

// export default Cart;

import React, { useEffect, useState } from "react";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <p style={{ padding: "20px", color: "#203a43" }}>Please login to see your cart</p>;

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true);
        const cartRes = await fetch(`http://localhost:4000/api/users/${user._id}/cart`);
        const cartData = await cartRes.json();
        const cartIds = cartData.cart;

        const groceriesRes = await fetch("http://localhost:4000/api/grocery");
        const groceries = await groceriesRes.json();

        const filteredProducts = groceries.filter((item) => cartIds.includes(item._id));
        setCartProducts(filteredProducts);
      } catch (err) {
        console.error("Error fetching cart products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [user._id]);

  const removeFromCart = async (productId) => {
    setLoading(true);
    try {
      await fetch(`http://localhost:4000/api/users/cart/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, remove: true }),
      });

      setCartProducts((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p style={{ padding: "20px", color: "#203a43" }}>Loading cart...</p>;

  return (
    <div style={{ padding: "20px", background: "#f8fafa", minHeight: "90vh" }}>
      <h2 style={{ color: "#203a43", borderBottom: "2px solid #203a43", display: "inline-block", paddingBottom: "6px" }}>Your Cart</h2>

      {cartProducts.length === 0 ? (
        <p style={{ marginTop: "20px", color: "#555" }}>No items in your cart.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
          {cartProducts.map((item) => (
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
              <img
                src={item.image}
                alt={item.name}
                width="120px"
                height="120px"
                style={{ borderRadius: "12px", objectFit: "cover", marginBottom: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.15)" }}
              />
              <h4 style={{ margin: "0 0 6px", color: "#203a43", textAlign: "center" }}>{item.name}</h4>
              <p style={{ margin: "2px 0", fontSize: "14px", color: "#2d3748" }}>Price: ₹{item.price}</p>
              <p style={{ margin: "2px 0", fontSize: "13px", color: "#555" }}>Unit: {item.unit}</p>
              <button
                onClick={() => removeFromCart(item._id)}
                style={{
                  marginTop: "10px",
                  padding: "6px 12px",
                  backgroundColor: "#125948ff",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#559284ff")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#11634aff")}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;

