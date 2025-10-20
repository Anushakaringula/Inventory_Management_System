import React, { useEffect, useState } from "react";
import Category from "./Category";
import { Link } from "react-router-dom";

function Home({ cart, setCart, favorites, setFavorites }) {
  const [grocery, setGrocery] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ✅ Fetch groceries
  useEffect(() => {
    fetch("http://localhost:4000/api/grocery")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setGrocery(data);
      })
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  const filteredItems = selectedCategory
    ? grocery.filter((item) => selectedCategory.includes(item.category))
    : grocery;

  // ✅ Get current logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Toggle Cart + Update DB
  const toggleCart = async (item) => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:4000/api/users/cart/${item._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id }),
        }
      );

      const data = await res.json();
      console.log("Cart updated in DB:", data);

      // Update frontend cart
      setCart((prev) => {
        const exists = prev.find((p) => p._id === item._id);
        if (exists) {
          return prev.filter((p) => p._id !== item._id);
        } else {
          return [...prev, item];
        }
      });
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  // ✅ Toggle Favorites + Update DB
  const toggleFavorites = async (item) => {
    if (!user) {
      alert("Please login to add favorites");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:4000/api/users/favorites/${item._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id }),
        }
      );

      const data = await res.json();
      console.log("Favorites updated in DB:", data);

      // Update frontend favorites
      setFavorites((prev) => {
        const exists = prev.find((p) => p._id === item._id);
        if (exists) {
          return prev.filter((p) => p._id !== item._id);
        } else {
          return [...prev, item];
        }
      });
    } catch (err) {
      console.error("Error updating favorites:", err);
    }
  };

  return (
    <>
      {/* ✅ Categories */}
      <div style={{ display: "flex", marginBottom: "20px", marginTop: "10px" }}>
        {Category.map((cat) => (
          <div
            key={cat.id}
            style={{
              textAlign: "center",
              cursor: "pointer",
              padding: "10px",
              margin: "10px",
            }}
            onClick={() => setSelectedCategory(cat.match)}
          >
            <div style={{ borderRadius: "50%", padding: "10px" }}>
              <img src={cat.image} alt={cat.label} width="60px" height="60px" />
            </div>
            <p>{cat.label}</p>
          </div>
        ))}
      </div>

      {/* ✅ Grocery Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-evenly",
        }}
      >
        {filteredItems.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              margin: "5px",
              width: "12%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Only wrap image and title in Link */}
            <div style={{ cursor: "pointer" }}>
              <Link
                to={`/product/${item._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img src={item.image} alt={item.name} width="100px" height="100px" />
                <h3>{item.name}</h3>
              </Link>

              {/* Outside Link */}
              <p>Price: ₹{item.price}</p>
              <p>Unit: {item.unit}</p>
              <p>Category: {item.category}</p>
            </div>

            {/* ❤️ Favorite icon */}
            <span
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "30px",
                cursor: "pointer",
                zIndex: 2,
              }}
            >
              <img
                src={
                  favorites.find((fav) => fav._id === item._id)
                    ? "red-heart.png"
                    : "heart.jpg"
                }
                alt="fav"
                width={"20px"}
                height={"20px"}
                onClick={() => toggleFavorites(item)}
              />
            </span>

            {/* 🛒 Add to Cart */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "15px",
                marginTop: "10px",
                zIndex: 2,
              }}
            >
              <button
                onClick={() => toggleCart(item)}
                style={{
                  backgroundColor: "red",
                  border: "none",
                  color: "white",
                  padding: "8px",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                {cart.find((p) => p._id === item._id)
                  ? "Remove from Cart"
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
