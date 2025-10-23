

// import React, { useEffect, useState } from "react";

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [removingOrderId, setRemovingOrderId] = useState(null);
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     if (!user) {
//       setLoading(false);
//       return;
//     }
//     fetchOrdersWithProducts();
//   }, []);

//   const fetchOrdersWithProducts = async () => {
//   try {
//     const ordersRes = await fetch(`http://localhost:4000/api/orders/`);
//     const ordersData = await ordersRes.json();

//     // ✅ Filter only logged-in user's orders
//     const userOrders = (ordersData.orders || []).filter(
//       (order) => order.email === user.email
//     );

//     const productsRes = await fetch(`http://localhost:4000/api/grocery`);
//     const productsData = await productsRes.json();

//     const ordersWithProducts = userOrders.map(order => {
//       const product = productsData.find(p => p._id === order.productId);
//       return {
//         ...order,
//         productName: product?.name || "Product Not Found",
//         productImage: product?.image || "",
//         productPrice: product?.price || 0
//       };
//     });

//     setOrders(ordersWithProducts);
//   } catch (err) {
//     console.error("Error fetching orders:", err);
//   } finally {
//     setLoading(false);
//   }
// };


//   const handleRemoveOrder = async (orderId) => {
//     if (!window.confirm("Are you sure you want to remove this order?")) {
//       return;
//     }

//     setRemovingOrderId(orderId);
//     try {
//       const res = await fetch(`http://localhost:4000/api/orders/${orderId}`, {
//         method: "DELETE",
//       });

//       if (res.ok) {
//         // Remove order from state
//         setOrders(orders.filter(order => order._id !== orderId));
//         alert("Order removed successfully!");
//       } else {
//         alert("Failed to remove \order");
//       }
//     } catch (err) {
//       console.error("Error removing order:", err);
//       alert("Error removing order");
//     } finally {
//       setRemovingOrderId(null);
//     }
//   };

//   if (!user) {
//     return (
//       <div style={{ textAlign: "center", padding: "50px" }}>
//         <h3>Please login to view your orders.</h3>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", padding: "50px" }}>
//         <p>Loading orders...</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
//       <h2 style={{ marginBottom: "20px" }}>Your Orders</h2>
      
//       {orders.length === 0 ? (
//         <div style={{ textAlign: "center", padding: "40px" }}>
//           <p style={{ fontSize: "18px", color: "#666" }}>No orders found.</p>
//           <p style={{ color: "#999" }}>Your order history will appear here.</p>
//         </div>
//       ) : (
//         <>
//           <p style={{ marginBottom: "20px", color: "#666" }}>
//             Total Orders: <strong>{orders.length}</strong>
//           </p>
//           <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
//             {orders.map((order) => (
//               <div
//                 key={order._id}
//                 style={{
//                   border: "1px solid #ddd",
//                   borderRadius: "10px",
//                   padding: "20px",
//                   backgroundColor: "#fff",
//                   boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   gap: "20px"
//                 }}
//               >
//                 {/* Product Image */}
//                 <div style={{ flexShrink: 0 }}>
//                   {order.productImage ? (
//                     <img 
//                       src={order.productImage} 
//                       alt={order.productName}
//                       style={{
//                         width: "120px",
//                         height: "120px",
//                         objectFit: "cover",
//                         borderRadius: "8px",
//                         border: "1px solid #eee"
//                       }}
//                     />
//                   ) : (
//                     <div style={{
//                       width: "120px",
//                       height: "120px",
//                       backgroundColor: "#f0f0f0",
//                       borderRadius: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "12px",
//                       color: "#999"
//                     }}>
//                       No Image
//                     </div>
//                   )}
//                 </div>

//                 {/* Product Details */}
//                 <div style={{ flex: 1, minWidth: "200px" }}>
//                   <h3 style={{ margin: "0 0 10px 0", color: "#333", fontSize: "18px" }}>
//                     {order.productName}
//                   </h3>
//                   <div style={{ display: "grid", gap: "6px", fontSize: "14px", color: "#555" }}>
//                     <p style={{ margin: 0 }}>
//                       <strong>Product ID:</strong> {order.productId}
//                     </p>
//                     <p style={{ margin: 0 }}>
//                       <strong>Quantity:</strong> {order.quantity}
//                     </p>
//                     <p style={{ margin: 0 }}>
//                       <strong>Price per unit:</strong> ₹{order.productPrice}
//                     </p>
//                     <p style={{ margin: 0 }}>
//                       <strong>Total Price:</strong> <span style={{ fontSize: "16px", fontWeight: "bold", color: "#2e7d32" }}>₹{order.totalPrice}</span>
//                     </p>
//                   </div>
//                 </div>

//                 {/* Order Info */}
//                 <div style={{ minWidth: "150px" }}>
//                   <div style={{ display: "grid", gap: "8px", fontSize: "13px", color: "#666" }}>
//                     <p style={{ margin: 0 }}>
//                       <strong>Order Date:</strong><br />
//                       {new Date(order.date).toLocaleDateString("en-IN", {
//                         day: "numeric",
//                         month: "short",
//                         year: "numeric"
//                       })}
//                     </p>
//                     <p style={{ margin: 0 }}>
//                       <strong>Status:</strong>
//                     </p>
//                     <span
//                       style={{
//                         padding: "6px 12px",
//                         borderRadius: "5px",
//                         fontSize: "13px",
//                         fontWeight: "bold",
//                         textAlign: "center",
//                         backgroundColor:
//                           order.status === "Placed"
//                             ? "#e3f2fd"
//                             : order.status === "Shipped"
//                             ? "#fff3e0"
//                             : order.status === "Delivered"
//                             ? "#e8f5e9"
//                             : "#ffebee",
//                         color:
//                           order.status === "Placed"
//                             ? "#1976d2"
//                             : order.status === "Shipped"
//                             ? "#f57c00"
//                             : order.status === "Delivered"
//                             ? "#388e3c"
//                             : "#d32f2f",
//                       }}
//                     >
//                       {order.status}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Remove Button */}
//                 <div style={{ flexShrink: 0 }}>
//                   <button
//                     onClick={() => handleRemoveOrder(order._id)}
//                     disabled={removingOrderId === order._id}
//                     style={{
//                       padding: "10px 20px",
//                       backgroundColor: removingOrderId === order._id ? "#ccc" : "#dc3545",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "5px",
//                       cursor: removingOrderId === order._id ? "not-allowed" : "pointer",
//                       fontSize: "14px",
//                       fontWeight: "bold",
//                       transition: "background-color 0.3s",
//                       minWidth: "120px"
//                     }}
//                     onMouseEnter={(e) => {
//                       if (removingOrderId !== order._id) {
//                         e.target.style.backgroundColor = "#c82333";
//                       }
//                     }}
//                     onMouseLeave={(e) => {
//                       if (removingOrderId !== order._id) {
//                         e.target.style.backgroundColor = "#dc3545";
//                       }
//                     }}
//                   >
//                     {removingOrderId === order._id ? "Removing..." : "Remove"}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Orders;

import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingOrderId, setRemovingOrderId] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetchOrdersWithProducts();
  }, []);

  const fetchOrdersWithProducts = async () => {
    try {
      const ordersRes = await fetch(`http://localhost:4000/api/orders/`);
      const ordersData = await ordersRes.json();

      const userOrders = (ordersData.orders || []).filter(
        (order) => order.email === user.email
      );

      const productsRes = await fetch(`http://localhost:4000/api/grocery`);
      const productsData = await productsRes.json();

      const ordersWithProducts = userOrders.map((order) => {
        const product = productsData.find((p) => p._id === order.productId);
        return {
          ...order,
          productName: product?.name || "Product Not Found",
          productImage: product?.image || "",
          productPrice: product?.price || 0,
        };
      });

      setOrders(ordersWithProducts);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to remove this order?")) return;

    setRemovingOrderId(orderId);
    try {
      const res = await fetch(`http://localhost:4000/api/orders/${orderId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setOrders(orders.filter((order) => order._id !== orderId));
        alert("Order removed successfully!");
      } else {
        alert("Failed to remove order");
      }
    } catch (err) {
      console.error("Error removing order:", err);
      alert("Error removing order");
    } finally {
      setRemovingOrderId(null);
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h3>Please login to view your orders.</h3>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2
        style={{
          marginBottom: "20px",
          color: "#203a43",
          borderBottom: "2px solid #203a43",
          display: "inline-block",
          paddingBottom: "6px",
        }}
      >
        Your Orders
      </h2>

      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p style={{ fontSize: "18px", color: "#555" }}>No orders found.</p>
          <p style={{ color: "#888" }}>Your order history will appear here.</p>
        </div>
      ) : (
        <>
          <p style={{ marginBottom: "20px", color: "#555" }}>
            Total Orders: <strong>{orders.length}</strong>
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {orders.map((order) => (
              <div
                key={order._id}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "20px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "20px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
                }}
              >
                {/* Product Image */}
                <div style={{ flexShrink: 0 }}>
                  {order.productImage ? (
                    <img
                      src={order.productImage}
                      alt={order.productName}
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        border: "1px solid #eee",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "120px",
                        height: "120px",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        color: "#999",
                      }}
                    >
                      No Image
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <h3
                    style={{
                      margin: "0 0 10px 0",
                      color: "#203a43",
                      fontSize: "18px",
                    }}
                  >
                    {order.productName}
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gap: "6px",
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    <p style={{ margin: 0 }}>
                      <strong>Product ID:</strong> {order.productId}
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Quantity:</strong> {order.quantity}
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Price per unit:</strong> ₹{order.productPrice}
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Total Price:</strong>{" "}
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#2e7d32",
                        }}
                      >
                        ₹{order.totalPrice}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Order Info */}
                <div style={{ minWidth: "150px" }}>
                  <div
                    style={{
                      display: "grid",
                      gap: "8px",
                      fontSize: "13px",
                      color: "#555",
                    }}
                  >
                    <p style={{ margin: 0 }}>
                      <strong>Order Date:</strong>
                      <br />
                      {new Date(order.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: "bold",
                        textAlign: "center",
                        backgroundColor:
                          order.status === "Placed"
                            ? "#e3f2fd"
                            : order.status === "Shipped"
                            ? "#fff3e0"
                            : order.status === "Delivered"
                            ? "#e8f5e9"
                            : "#ffebee",
                        color:
                          order.status === "Placed"
                            ? "#1976d2"
                            : order.status === "Shipped"
                            ? "#f57c00"
                            : order.status === "Delivered"
                            ? "#388e3c"
                            : "#d32f2f",
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Remove Button */}
                <div style={{ flexShrink: 0 }}>
                  <button
                    onClick={() => handleRemoveOrder(order._id)}
                    disabled={removingOrderId === order._id}
                    style={{
                      padding: "10px 18px",
                      backgroundColor:
                        removingOrderId === order._id ? "#ccc" : "#203a43",
                      color: "#fff",
                      border: "none",
                      borderRadius: "10px",
                      cursor:
                        removingOrderId === order._id ? "not-allowed" : "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      transition: "all 0.2s ease",
                      minWidth: "120px",
                    }}
                    onMouseEnter={(e) => {
                      if (removingOrderId !== order._id) {
                        e.target.style.backgroundColor = "#0f3932";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (removingOrderId !== order._id) {
                        e.target.style.backgroundColor = "#203a43";
                      }
                    }}
                  >
                    {removingOrderId === order._id ? "Removing..." : "Remove"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Orders;
