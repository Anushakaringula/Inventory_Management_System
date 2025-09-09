import React from 'react'
import { Link } from 'react-router-dom'

const cart = ({cart}) => {
  console.log("Cart page received:", cart);
  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No favorite items added.</p>
      ) : (
        <div style={{display:"flex",flexWrap:"wrap",alignItems:"flex-start",justifyContent:"flex-start"}}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                margin:"5px",
                width: "12%",
                display: "flex",
                flexDirection: "column",
                 position: "relative"
              }}>
                <img src={item.image} alt={item.name} width="100px" height="100px" />
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <p>Unit: {item.unit}</p>
              <p>Category: {item.category}</p>

              <button
                style={{
                  backgroundColor: "green",
                  border: "none",
                  color: "white",
                  padding: "8px",
                  borderRadius: "8px",
                }}
              >
                Buy now
              </button>
              </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default cart