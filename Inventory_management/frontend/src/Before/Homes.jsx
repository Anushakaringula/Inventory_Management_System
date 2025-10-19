import React, { useEffect, useState } from "react";
import Category from "../Customer/Category";
import { Link } from "react-router-dom";

function Home() {
  const [grocery, setGrocery] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  useEffect(() => {
  fetch("http://localhost:4000/api/grocery")
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched data:", data); 
      setGrocery(data); // <-- directly set the array
    })
    .catch((err) => console.error("Error fetching:", err));
}, []);

  const filteredItems=selectedCategory?grocery.filter((item)=> selectedCategory.includes(item.category)):grocery;

  


  return (
    <>
      <div style={{ display: "flex", marginBottom: "20px",marginTop:"10px" }}>
        {Category.map((cat) => (
          <div key={cat.id}
            style={{
              textAlign: "center",
              cursor: "pointer",
              padding: "10px",
              margin:"10px",
            }}
            onClick={()=> setSelectedCategory(cat.match)}>
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
              }}>
               <Link to={`/product/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <img src={item.image} alt={item.name} width="100px" height="100px" />
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>
                  <p>Unit: {item.unit}</p>
                  <p>Category: {item.category}</p>
            </Link>

            </div>
          ))
      )}</div>
    </>
  );
}

export default Home;
