import React from 'react'

function Favorites( { favorites,setFavorites }) {
  console.log("Cart page received:", favorites);
  const toggleFavorites = (item) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.filter((p) => p.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Favorites</h2>
      {favorites.length === 0 ?
        (<p>No favorite items added.</p>) :
        (<div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "flex-start" }}>
          {favorites.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                margin: "5px",
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

              <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
                <button
                  style={{
                    backgroundColor: "green",
                    border: "none",
                    color: "white",
                    padding: "8px",
                    borderRadius: "8px",
                  }}>
                  Buy now
                </button>
                <button onClick={() => toggleFavorites(item)}
                  style={{
                    backgroundColor: "red",
                    border: "none",
                    color: "white",
                    padding: "8px",
                    borderRadius: "8px",
                  }}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>)}
    </div>
  );
}

export default Favorites