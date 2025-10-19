import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../Customer/Productpage.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

  // --- Fetch products ---
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
            (item) => item.category === current.category && item.id.toString() !== id
          );
          setCategoryProducts(sameCategory);
          setExpandedCategory(current.category);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const toggleCategory = (cat) => {
    setExpandedCategory((prev) => (prev === cat ? null : cat));
  };

  // --- Buy Now Handler ---
  const handleBuyNow = () => {
   
    navigate("/Login");
    return;
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
                      backgroundColor: p.id.toString() === id ? "#e6ffe6" : "transparent",
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
            <h1>{product.name}</h1>
            <p>Price: ₹{product.price}</p>
            <p>Unit: {product.unit}</p>
            <p>Stock: {product.stock}</p>
            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              style={{
                padding: "8px 14px",
                backgroundColor: product.stock <= 0 ? "gray" : "#28a745",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: product.stock <= 0 ? "not-allowed" : "pointer",
                marginTop: "10px",
              }}
            >
              {product.stock > 0 ? "Buy Now" : "Out of Stock"}
            </button>
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
              }}
            >
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
                <p>Stock: {item.stock}</p>
              </Link>
              <button
                onClick={handleBuyNow}
                style={{
                  padding: "5px 10px",
                  marginTop: "5px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
