import React, { useEffect, useState } from "react";
import Category from "./Category";

function Home({cart, setCart, favorites, setFavorites}) {
  const [grocery, setGrocery] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState(null);
  
  useEffect(() => {
    fetch("http://localhost:4000/api/grocery")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data); 
        setGrocery(data.inventory);
      })
      .catch((err) => console.error("Error fetching:", err));
  }, []);
  const filteredItems=selectedCategory?grocery.filter((item)=> selectedCategory.includes(item.category)):grocery;

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
       const updated = { ...prev, [id]: !prev[id] };

      // update cart whenever favorites change
      const favItems = grocery.filter((item) => updated[item.id]);
      setCart(favItems);
      return updated;
    });
  };

  return (
    <>
      <div style={{ display: "flex", marginBottom: "20px",marginTop:"10px" }}>
        {Category.map((cat) => (
          <div
            key={cat.id}
            style={{
              textAlign: "center",
              cursor: "pointer",
              padding: "10px",
              margin:"10px",
            }}
            onClick={()=> setSelectedCategory(cat.match)}
          >
            <div style={{borderRadius:"50%",padding:"10px"}}><img src={cat.image} alt={cat.label} width="60px" height="60px" /></div>
            <p>{cat.label}</p> 

          </div>
        ))}
      </div>

    <div style={{display:"flex",flexWrap:"wrap",alignItems:"flex-start",justifyContent:"space-evenly"}}>
      {(
          filteredItems.map((item) => (
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
              }}
            >
               <span
              onClick={() => toggleFavorite(item.id)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "30px",
                cursor: "pointer",
              }}
            >
              <img src={favorites[item.id] ? "red-heart.png" : "heart.jpg"} alt="fav" width={"20px"} height={"20px"} />
            </span>

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
          ))
        )}
      </div>
    </>
  );
}

export default Home;
