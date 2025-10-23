// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import "../Customer/Productpage.css";

// function ProductDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [allProducts, setAllProducts] = useState([]);
//   const [product, setProduct] = useState(null);
//   const [categoryProducts, setCategoryProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [expandedCategory, setExpandedCategory] = useState(null);

//   // --- Fetch products ---
//   useEffect(() => {
//     fetch("http://localhost:4000/api/grocery")
//       .then((res) => res.json())
//       .then((data) => {
//         setAllProducts(data);

//         const uniqueCategories = [...new Set(data.map((item) => item.category))];
//         setCategories(uniqueCategories);

//         const current = data.find((item) => item.id.toString() === id);
//         setProduct(current);

//         if (current) {
//           const sameCategory = data.filter(
//             (item) => item.category === current.category && item.id.toString() !== id
//           );
//           setCategoryProducts(sameCategory);
//           setExpandedCategory(current.category);
//         }
//       })
//       .catch((err) => console.error(err));
//   }, [id]);

//   if (!product) return <p>Loading...</p>;

//   const toggleCategory = (cat) => {
//     setExpandedCategory((prev) => (prev === cat ? null : cat));
//   };

//   // --- Buy Now Handler ---
//   const handleBuyNow = () => {
   
//     navigate("/Login");
//     return;
//   };

//   return (
//     <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
//       {/* LEFT SIDEBAR */}
//       <div
//         style={{
//           width: "25%",
//           borderRight: "1px solid #ccc",
//           paddingRight: "10px",
//           overflowY: "auto",
//           height: "90vh",
//         }}
//       >
//         <h2>Categories</h2>
//         {categories.map((cat) => {
//           const catProducts = allProducts.filter((p) => p.category === cat);
//           const isExpanded = expandedCategory === cat;
//           return (
//             <div key={cat} style={{ marginBottom: "10px" }}>
//               <div
//                 onClick={() => toggleCategory(cat)}
//                 style={{
//                   cursor: "pointer",
//                   background: isExpanded ? "#c2f0c2" : "#f5f5f5",
//                   padding: "10px",
//                   borderRadius: "6px",
//                   fontWeight: isExpanded ? "bold" : "normal",
//                   boxShadow: isExpanded ? "0 0 8px rgba(0,0,0,0.2)" : "none",
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 {cat}
//               </div>
//               <div
//                 style={{
//                   maxHeight: isExpanded ? `${catProducts.length * 70}px` : "0px",
//                   overflow: "hidden",
//                   transition: "max-height 0.4s ease",
//                   marginLeft: "10px",
//                 }}
//               >
//                 {catProducts.map((p) => (
//                   <div
//                     key={p.id}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "10px",
//                       margin: "8px 0",
//                       cursor: "pointer",
//                       backgroundColor: p.id.toString() === id ? "#e6ffe6" : "transparent",
//                       padding: "5px",
//                       borderRadius: "5px",
//                     }}
//                     onClick={() => navigate(`/product/${p.id}`)}
//                   >
//                     <img
//                       src={p.image}
//                       alt={p.name}
//                       width="40px"
//                       height="40px"
//                       style={{ borderRadius: "5px", objectFit: "cover" }}
//                     />
//                     <span>{p.name}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* RIGHT SIDE */}
//       <div style={{ width: "75%" }}>
//         {/* MAIN PRODUCT */}
//         <div
//           style={{
//             display: "flex",
//             gap: "20px",
//             marginBottom: "40px",
//             border: "1px solid #ccc",
//             padding: "15px",
//             borderRadius: "10px",
//             alignItems: "flex-start",
//           }}
//         >
//           <img
//             src={product.image}
//             alt={product.name}
//             width="250px"
//             height="250px"
//             style={{ objectFit: "cover", borderRadius: "10px" }}
//           />
//           <div>
//             <h1>{product.name}</h1>
//             <p>Price: ₹{product.price}</p>
//             <p>Unit: {product.unit}</p>
//             <p>Stock: {product.stock}</p>
//             <button
//               onClick={handleBuyNow}
//               disabled={product.stock <= 0}
//               style={{
//                 padding: "8px 14px",
//                 backgroundColor: product.stock <= 0 ? "gray" : "#28a745",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "6px",
//                 cursor: product.stock <= 0 ? "not-allowed" : "pointer",
//                 marginTop: "10px",
//               }}
//             >
//               {product.stock > 0 ? "Buy Now" : "Out of Stock"}
//             </button>
//           </div>
//         </div>

//         {/* RELATED PRODUCTS */}
//         <h2>More in {product.category}</h2>
//         <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
//           {categoryProducts.map((item) => (
//             <div
//               key={item.id}
//               style={{
//                 position: "relative",
//                 border: "1px solid #ccc",
//                 padding: "10px",
//                 borderRadius: "8px",
//                 width: "180px",
//                 textAlign: "center",
//               }}
//             >
//               <Link
//                 to={`/product/${item.id}`}
//                 style={{ textDecoration: "none", color: "inherit" }}
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   width="100px"
//                   height="100px"
//                 />
//                 <h4>{item.name}</h4>
//                 <p>Price:₹{item.price}</p>
//                 <p>Stock: {item.stock}</p>
//               </Link>
//               <button
//                 onClick={handleBuyNow}
//                 style={{
//                   padding: "5px 10px",
//                   marginTop: "5px",
//                   backgroundColor: "#28a745",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "5px",
//                 }}
//               >
//                 Buy Now
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;

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

  const handleBuyNow = () => {
    navigate("/Login");
  };

  return (
    <div
      style={{
        display: "flex",
        background: "linear-gradient(to right, #e6f2f0, #f8fafa)",
        height: "80vh",
        overflow: "hidden", // prevent full-page scroll
      }}
    >
      {/* LEFT SIDEBAR */}
      <div
        style={{
          width: "25%",
          borderRight: "2px solid rgba(0,0,0,0.08)",
          padding: "5px",
          overflowY: "auto", // independent scroll
          height: "100%",
          background: "white",
          boxShadow: "4px 0 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            color: "#203a43",
            marginBottom: "15px",
            borderBottom: "2px solid #203a43",
            paddingBottom: "8px",
          }}
        >
          Categories
        </h2>

        {categories.map((cat) => {
          const catProducts = allProducts.filter((p) => p.category === cat);
          const isExpanded = expandedCategory === cat;
          return (
            <div key={cat} style={{ marginBottom: "10px" }}>
              <div
                onClick={() => toggleCategory(cat)}
                style={{
                  cursor: "pointer",
                  background: isExpanded
                    ? "linear-gradient(90deg, #0f2027, #203a43, #2c5364)"
                    : "#f5f5f5",
                  color: isExpanded ? "white" : "#203a43",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  boxShadow: isExpanded
                    ? "0 6px 14px rgba(0,0,0,0.25)"
                    : "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                {cat}
              </div>
              <div
                style={{
                  maxHeight: isExpanded ? `${catProducts.length * 68}px` : "0px",
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
                      margin: "10px 0",
                      cursor: "pointer",
                      padding: "6px",
                      borderRadius: "8px",
                      backgroundColor: p.id.toString() === id ? "#e6fff0" : "transparent",
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => navigate(`/product/${p.id}`)}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f9f6")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        p.id.toString() === id ? "#e6fff0" : "transparent")
                    }
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      width="45px"
                      height="45px"
                      style={{
                        borderRadius: "8px",
                        objectFit: "cover",
                        boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
                      }}
                    />
                    <span style={{ fontSize: "14px", color: "#2d3748" }}>{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          width: "75%",
          padding: "5px",
          overflowY: "auto", // independent scroll
          height: "100%",
        }}
      >
        {/* MAIN PRODUCT */}
        <div
          style={{
            display: "flex",
            gap: "25px",
            marginBottom: "40px",
            background: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            alignItems: "flex-start",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            width="280px"
            height="280px"
            style={{
              objectFit: "cover",
              borderRadius: "16px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
            }}
          />
          <div style={{lineHeight: "50px"}}>
            <h1 style={{ margin: "0 0 10px", color: "#203a43" }}>{product.name}</h1>
            <p style={{ fontSize: "18px", margin: "6px 0" }}>
              <strong>Price:</strong> ₹{product.price}
            </p>
            <p style={{ fontSize: "16px", margin: "4px 0" }}>
              <strong>Unit:</strong> {product.unit}
            </p>
            <p style={{ fontSize: "16px", margin: "4px 0" }}>
              <strong>Stock:</strong> {product.stock}
            </p>
            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              style={{
                padding: "10px 20px",
                background: product.stock <= 0
                  ? "gray"
                  : "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: product.stock <= 0 ? "not-allowed" : "pointer",
                marginTop: "15px",
                fontSize: "15px",
                fontWeight: "600",
                boxShadow:
                  product.stock > 0 ? "0 5px 14px rgba(32,58,67,0.3)" : "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (product.stock > 0) e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {product.stock > 0 ? "Buy Now" : "Out of Stock"}
            </button>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <h2
          style={{
            color: "#203a43",
            marginBottom: "15px",
            borderBottom: "2px solid #203a43",
            display: "inline-block",
            paddingBottom: "4px",
          }}
        >
          More in {product.category}
        </h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {categoryProducts.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                background: "white",
                borderRadius: "16px",
                width: "190px",
                padding: "15px",
                boxShadow: "0 8px 18px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 18px rgba(0,0,0,0.1)";
              }}
            >
              <Link
                to={`/product/${item.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  width="120px"
                  height="120px"
                  style={{
                    borderRadius: "12px",
                    objectFit: "cover",
                    boxShadow: "0 5px 10px rgba(0,0,0,0.15)",
                  }}
                />
                <h4 style={{ margin: "10px 0 4px", color: "#203a43" }}>{item.name}</h4>
                <p style={{ margin: 0, fontSize: "14px" }}>₹{item.price}</p>
                <p style={{ margin: 0, fontSize: "13px", color: "#555" }}>
                  Stock: {item.stock}
                </p>
              </Link>
              <button
                onClick={handleBuyNow}
                style={{
                  marginTop: "10px",
                  padding: "6px 10px",
                  background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "500",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
