import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/users/${user._id}/orders`);
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) return <p style={{ textAlign: "center" }}>Please login to view your orders.</p>;
  if (loading) return <p style={{ textAlign: "center" }}>Loading orders...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {orders.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                width: "180px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={item.image} alt={item.name} width="100px" height="100px" />
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
              <p>Qty: {item.quantity}</p>
              <p style={{ color: "green" }}>Status: {item.status}</p>
              <p style={{ fontSize: "12px", color: "#777" }}>
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
