// import React, { useEffect, useState } from "react";

// function Cart({ user, cart, setCart }) {
//   const [loading, setLoading] = useState(false);

//   // Fetch cart items from DB
//   useEffect(() => {
//     if (!user) return;

//     const fetchCart = async () => {
//       try {
//         const res = await fetch(`http://localhost:4000/api/users/${user._id}/cart`);
//         const data = await res.json();
//         setCart(data);
//       } catch (err) {
//         console.error("Error fetching cart:", err);
//       }
//     };

//     fetchCart();
//   }, [user, setCart]);

//   // ✅ Remove item from cart
//   const removeFromCart = async (productId) => {
//     if (!user) {
//       alert("Please login to modify cart");
//       return;
//     }

//     setLoading(true);
//     try {
//       await fetch(`http://localhost:4000/api/users/cart/${productId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user._id, remove: true }),
//       });

//       setCart((prev) => prev.filter((item) => item._id !== productId));
//     } catch (err) {
//       console.error("Failed to remove from cart:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Your Cart</h2>
//       {loading && <p>Updating...</p>}
//       {cart.length === 0 ? (
//         <p>No items in your cart.</p>
//       ) : (
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             alignItems: "flex-start",
//             justifyContent: "flex-start",
//           }}
//         >
//           {cart.map((item) => (
//             <div
//               key={item._id}
//               style={{
//                 border: "1px solid #ccc",
//                 padding: "10px",
//                 borderRadius: "8px",
//                 margin: "5px",
//                 width: "12%",
//                 display: "flex",
//                 flexDirection: "column",
//                 position: "relative",
//               }}
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 width="100px"
//                 height="100px"
//               />
//               <h3>{item.name}</h3>
//               <p>Price: ₹{item.price}</p>
//               <p>Unit: {item.unit}</p>
//               <p>Category: {item.category}</p>

//               <button
//                 onClick={() => removeFromCart(item._id)}
//                 style={{
//                   backgroundColor: "red",
//                   border: "none",
//                   color: "white",
//                   padding: "8px",
//                   borderRadius: "8px",
//                   cursor: "pointer",
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
  if (!user) return <p>Please login to see your cart</p>;

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true);

        // 1️⃣ Get user's cart IDs from DB
        const cartRes = await fetch(`http://localhost:4000/api/users/${user._id}/cart`);
        const cartData = await cartRes.json();
        const cartIds = cartData.cart; // array of product _id

        // 2️⃣ Fetch all groceries
        const groceriesRes = await fetch("http://localhost:4000/api/grocery");
        const groceries = await groceriesRes.json();

        // 3️⃣ Filter groceries by cart IDs
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

  if (loading) return <p>Loading cart...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cartProducts.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {cartProducts.map((item) => (
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
              }}
            >
              <img src={item.image} alt={item.name} width="100px" height="100px" />
              <h4>{item.name}</h4>
              <p>Price: ₹{item.price}</p>
              <p>Unit: {item.unit}</p>
              <button
                onClick={() => removeFromCart(item._id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "5px",
                }}
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
