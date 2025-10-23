// import React, { useEffect, useState } from "react";

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updatingOrderId, setUpdatingOrderId] = useState(null);
//   const [removingOrderId, setRemovingOrderId] = useState(null);

//   useEffect(() => {
//     fetchOrdersWithProducts();
//   }, []);

//   const fetchOrdersWithProducts = async () => {
//     try {
//       // Fetch ALL orders from the orders collection (no email filter for admin)
//       const ordersRes = await fetch(`http://localhost:4000/api/orders`);
//       const ordersData = await ordersRes.json();
//       const allOrders = ordersData.orders || [];

//       // Fetch all products
//       const productsRes = await fetch(`http://localhost:4000/api/grocery`);
//       const productsData = await productsRes.json();

//       // Map orders with product details
//       const ordersWithProducts = allOrders.map(order => {
//         const product = productsData.find(p => p._id === order.productId);
//         return {
//           ...order,
//           productName: product?.name || "Product Not Found",
//           productImage: product?.image || "",
//           productPrice: product?.price || 0
//         };
//       });

//       setOrders(ordersWithProducts);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateStatus = async (orderId, newStatus) => {
//     setUpdatingOrderId(orderId);
//     try {
//       const res = await fetch(`http://localhost:4000/api/orders/${orderId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ status: newStatus })
//       });

//       if (res.ok) {
//         // Update order status in state
//         setOrders(orders.map(order => 
//           order._id === orderId ? { ...order, status: newStatus } : order
//         ));
//         alert("Order status updated successfully!");
//       } else {
//         alert("Failed to update order status");
//       }
//     } catch (err) {
//       console.error("Error updating order status:", err);
//       alert("Error updating order status");
//     } finally {
//       setUpdatingOrderId(null);
//     }
//   };

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
//         alert("Failed to remove order");
//       }
//     } catch (err) {
//       console.error("Error removing order:", err);
//       alert("Error removing order");
//     } finally {
//       setRemovingOrderId(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", padding: "50px" }}>
//         <p style={{ fontSize: "18px" }}>Loading orders...</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
//       <h2 style={{ marginBottom: "20px", color: "#2c3e50" }}>All Customer Orders</h2>
      
//       {orders.length === 0 ? (
//         <div style={{ textAlign: "center", padding: "40px" }}>
//           <p style={{ fontSize: "18px", color: "#666" }}>No orders found.</p>
//           <p style={{ color: "#999" }}>Orders will appear here once customers place them.</p>
//         </div>
//       ) : (
//         <>
//           <div style={{ 
//             marginBottom: "20px", 
//             padding: "15px", 
//             backgroundColor: "#e8f5e9", 
//             borderRadius: "8px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center"
//           }}>
//             <p style={{ margin: 0, color: "#2e7d32", fontSize: "16px" }}>
//               <strong>Total Orders:</strong> {orders.length}
//             </p>
//             <button
//               onClick={fetchOrdersWithProducts}
//               style={{
//                 padding: "8px 16px",
//                 backgroundColor: "#2e7d32",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 fontSize: "14px",
//                 fontWeight: "bold"
//               }}
//             >
//               Refresh Orders
//             </button>
//           </div>

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
//                   gap: "20px",
//                   flexWrap: "wrap"
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

//                 {/* Customer Details */}
//                 <div style={{ flex: 1, minWidth: "200px" }}>
//                   <h4 style={{ margin: "0 0 10px 0", color: "#333", fontSize: "16px" }}>
//                     Customer Details
//                   </h4>
//                   <div style={{ display: "grid", gap: "6px", fontSize: "13px", color: "#555" }}>
//                     <p style={{ margin: 0 }}>
//                       <strong>Name:</strong> {order.customerName}
//                     </p>
//                     <p style={{ margin: 0 }}>
//                       <strong>Email:</strong> {order.email}
//                     </p>
//                     <p style={{ margin: 0 }}>
//                       <strong>Contact:</strong> {order.contact}
//                     </p>
//                     <p style={{ margin: 0 }}>
//                       <strong>Address:</strong> {order.address}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Order Info & Status */}
//                 <div style={{ minWidth: "180px" }}>
//                   <div style={{ display: "grid", gap: "8px", fontSize: "13px", color: "#666" }}>
//                     <p style={{ margin: 0 }}>
//                       <strong>Order Date:</strong><br />
//                       {new Date(order.date).toLocaleDateString("en-IN", {
//                         day: "numeric",
//                         month: "short",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit"
//                       })}
//                     </p>
//                     <p style={{ margin: "8px 0 4px 0" }}>
//                       <strong>Update Status:</strong>
//                     </p>
                    
//                     {/* Status Dropdown */}
//                     <select
//                       value={order.status}
//                       onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
//                       disabled={updatingOrderId === order._id}
//                       style={{
//                         padding: "8px 12px",
//                         borderRadius: "5px",
//                         border: "2px solid #ddd",
//                         fontSize: "13px",
//                         fontWeight: "bold",
//                         cursor: updatingOrderId === order._id ? "not-allowed" : "pointer",
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
//                       <option value="Placed">Placed</option>
//                       <option value="Shipped">Shipped</option>
//                       <option value="Delivered">Delivered</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
                    
//                     {updatingOrderId === order._id && (
//                       <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#666" }}>
//                         Updating...
//                       </p>
//                     )}
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
//                     {removingOrderId === order._id ? "Removing..." : "Remove Order"}
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

const ordersStyles = `
.orders-container {
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.orders-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.orders-header h2 {
  color: #203a43;
  margin: 0;
}

.orders-header button {
  padding: 8px 16px;
  background: linear-gradient(90deg, #0f2027, #203a43, #2c5364);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s;
}

.orders-header button:hover {
  transform: translateY(-2px);
}

.order-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.order-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.order-image {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  border: 1px solid #eee;
  object-fit: cover;
  flex-shrink: 0;
}

.order-image-placeholder {
  width: 120px;
  height: 120px;
  background-color: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #999;
  flex-shrink: 0;
}

.order-details, .customer-details, .order-info {
  flex: 1;
  min-width: 200px;
}

.order-details h3, .customer-details h4 {
  margin: 0 0 10px 0;
  color: #203a43;
}

.order-details p, .customer-details p, .order-info p {
  margin: 0;
  font-size: 14px;
  color: #555;
}

.order-info select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 2px solid #ddd;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.order-info select.Placed { background-color: #e3f2fd; color: #1976d2; }
.order-info select.Shipped { background-color: #fff3e0; color: #f57c00; }
.order-info select.Delivered { background-color: #e8f5e9; color: #388e3c; }
.order-info select.Cancelled { background-color: #ffebee; color: #d32f2f; }


`;

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [removingOrderId, setRemovingOrderId] = useState(null);

  useEffect(() => {
    fetchOrdersWithProducts();
  }, []);

  const fetchOrdersWithProducts = async () => {
    try {
      const ordersRes = await fetch(`http://localhost:4000/api/orders`);
      const ordersData = await ordersRes.json();
      const allOrders = ordersData.orders || [];

      const productsRes = await fetch(`http://localhost:4000/api/grocery`);
      const productsData = await productsRes.json();

      const ordersWithProducts = allOrders.map(order => {
        const product = productsData.find(p => p._id === order.productId);
        return {
          ...order,
          productName: product?.name || "Product Not Found",
          productImage: product?.image || "",
          productPrice: product?.price || 0
        };
      });

      setOrders(ordersWithProducts);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      const res = await fetch(`http://localhost:4000/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
      } else { alert("Failed to update order status"); }
    } catch (err) { console.error(err); alert("Error updating order status"); }
    finally { setUpdatingOrderId(null); }
  };

  const handleRemoveOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to remove this order?")) return;
    setRemovingOrderId(orderId);
    try {
      const res = await fetch(`http://localhost:4000/api/orders/${orderId}`, { method: "DELETE" });
      if (res.ok) setOrders(orders.filter(order => order._id !== orderId));
      else alert("Failed to remove order");
    } catch (err) { console.error(err); alert("Error removing order"); }
    finally { setRemovingOrderId(null); }
  };

  if (loading) return <div style={{ textAlign: "center", padding: "50px" }}>Loading orders...</div>;

  return (
    <div className="orders-container">
      <style dangerouslySetInnerHTML={{ __html: ordersStyles }} />
      <div className="orders-header">
        <h2>All Customer Orders</h2>
        <button onClick={fetchOrdersWithProducts}>Refresh Orders</button>
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
          No orders found. Orders will appear here once customers place them.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {orders.map(order => (
            <div key={order._id} className="order-card">
              {/* Product Image */}
              {order.productImage ? (
                <img src={order.productImage} alt={order.productName} className="order-image" />
              ) : (
                <div className="order-image-placeholder">No Image</div>
              )}

              {/* Product Details */}
              <div className="order-details">
                <h3>{order.productName}</h3>
                <p><strong>Product ID:</strong> {order.productId}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Price/unit:</strong> ₹{order.productPrice}</p>
                <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
              </div>

              {/* Customer Details */}
              <div className="customer-details">
                <h4>Customer Details</h4>
                <p><strong>Name:</strong> {order.customerName}</p>
                <p><strong>Email:</strong> {order.email}</p>
                <p><strong>Contact:</strong> {order.contact}</p>
                <p><strong>Address:</strong> {order.address}</p>
              </div>

              {/* Order Status */}
              <div className="order-info">
                <p><strong>Order Date:</strong> {new Date(order.date).toLocaleString("en-IN")}</p>
                <select
                  className={order.status}
                  value={order.status}
                  onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                  disabled={updatingOrderId === order._id}
                >
                  <option value="Placed">Placed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Remove Button */}
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
