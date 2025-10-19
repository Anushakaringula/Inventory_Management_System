import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./Productpage.css";

function ProductDetails({ cart, setCart, favorites, setFavorites }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    quantity: 1,
  });

  // --- Fetch products and setup ---
  useEffect(() => {
    fetch("http://localhost:4000/api/grocery")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        const uniqueCategories = [...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);

        const current = data.find((item) => item.id.toString() === id);
        setProduct(current);

        if (current) {
          const sameCategory = data.filter(
            (item) =>
              item.category === current.category && item.id.toString() !== id
          );
          setCategoryProducts(sameCategory);
          setExpandedCategory(current.category);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  // --- Toggle Cart & Favorites ---
  const toggleCart = (p) => {
    setCart((prev) =>
      prev.find((item) => item.id === p.id)
        ? prev.filter((item) => item.id !== p.id)
        : [...prev, p]
    );
  };

  const toggleFavorites = (p) => {
    setFavorites((prev) =>
      prev.find((item) => item.id === p.id)
        ? prev.filter((item) => item.id !== p.id)
        : [...prev, p]
    );
  };

  const toggleCategory = (cat) => {
    setExpandedCategory((prev) => (prev === cat ? null : cat));
  };

  const rating = 4.5;
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i}>{i < Math.floor(rating) ? "⭐" : i < rating ? "✨" : "☆"}</span>
  ));

  // --- Buy Now Form Handlers ---
  const handleBuyNow = () => {
    if (product.stock <= 0) {
      alert("❌ Out of stock!");
      return;
    }

    // Decrease stock locally in product
    setProduct((prev) => ({ ...prev, stock: prev.stock - 1 }));

    // Update in allProducts list
    setAllProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p
      )
    );

    // Open the order form
    setShowForm(true);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `✅ Thank you, ${formData.name}! Your order for ${formData.quantity} ${product.name} has been placed successfully.`
    );
    setShowForm(false);
    setFormData({ name: "", address: "", contact: "", quantity: 1 });
  };

  return (
    <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
      {/* LEFT SIDEBAR */}
      <div
        style={{
          width: "25%",
          borderRight: "1px solid #ccc",
          paddingRight: "10px",
          overflowY: "auto",
          height: "90vh",
        }}
      >
        <h2>Categories</h2>
        {categories.map((cat) => {
          const catProducts = allProducts.filter((p) => p.category === cat);
          const isExpanded = expandedCategory === cat;
          return (
            <div key={cat} style={{ marginBottom: "10px" }}>
              <div
                onClick={() => toggleCategory(cat)}
                style={{
                  cursor: "pointer",
                  background: isExpanded ? "#c2f0c2" : "#f5f5f5",
                  padding: "10px",
                  borderRadius: "6px",
                  fontWeight: isExpanded ? "bold" : "normal",
                  boxShadow: isExpanded ? "0 0 8px rgba(0,0,0,0.2)" : "none",
                  transition: "all 0.3s ease",
                }}
              >
                {cat}
              </div>
              <div
                style={{
                  maxHeight: isExpanded ? `${catProducts.length * 70}px` : "0px",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                  marginLeft: "10px",
                }}
              >
                {catProducts.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      margin: "8px 0",
                      cursor: "pointer",
                      backgroundColor:
                        p.id.toString() === id ? "#e6ffe6" : "transparent",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                    onClick={() => navigate(`/product/${p.id}`)}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      width="40px"
                      height="40px"
                      style={{ borderRadius: "5px", objectFit: "cover" }}
                    />
                    <span>{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT SIDE */}
      <div style={{ width: "75%" }}>
        {/* MAIN PRODUCT */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "40px",
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "10px",
            alignItems: "flex-start",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            width="250px"
            height="250px"
            style={{ objectFit: "cover", borderRadius: "10px" }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h1>{product.name}</h1>
              <img
                src={
                  favorites.find((fav) => fav.id === product.id)
                    ? "/red-heart.png"
                    : "/heart.jpg"
                }
                alt="favorite"
                width="25px"
                height="25px"
                style={{ cursor: "pointer" }}
                onClick={() => toggleFavorites(product)}
              />
            </div>

            <div style={{ fontSize: "20px", marginBottom: "10px" }}>
              {stars} <span style={{ fontSize: "14px" }}>({rating})</span>
            </div>

            <p>Price: ₹{product.price}</p>
            <p>Unit: {product.unit}</p>
            <p>Stock: {product.stock}</p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                onClick={() => toggleCart(product)}
                style={{
                  padding: "8px 14px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                {cart.find((p) => p.id === product.id)
                  ? "Remove from Cart"
                  : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                style={{
                  padding: "8px 14px",
                  backgroundColor:
                    product.stock <= 0 ? "gray" : "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor:
                    product.stock <= 0 ? "not-allowed" : "pointer",
                }}
              >
                {product.stock > 0 ? "Buy Now" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <h2>More in {product.category}</h2>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {categoryProducts.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                width: "180px",
                textAlign: "center",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <span
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  cursor: "pointer",
                }}
              >
                <img
                  src={
                    favorites.find((fav) => fav.id === item.id)
                      ? "/red-heart.png"
                      : "/heart.jpg"
                  }
                  alt="fav"
                  width="20px"
                  height="20px"
                  onClick={() => toggleFavorites(item)}
                />
              </span>
              <Link
                to={`/product/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  width="100px"
                  height="100px"
                />
                <h4>{item.name}</h4>
                <p>Price:₹{item.price}</p>
                <p>Quantity:{item.stock}</p>
              </Link>
              <button
                onClick={() => toggleCart(item)}
                style={{
                  padding: "5px 10px",
                  marginTop: "5px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                {cart.find((p) => p.id === item.id) ? "Remove" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- BUY NOW FORM MODAL --- */}
      {showForm && (
        <div className="buy-form-overlay">
          <div className="buy-form">
            <h3>🛒 Order Details</h3>
            <form onSubmit={handleSubmit}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label>Address:</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />

              <label>Contact Number:</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />

              <label>Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
              />

              <div className="form-buttons">
                <button type="submit">Confirm Order</button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
