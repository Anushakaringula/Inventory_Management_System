
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./Productpage.css";

// function ProductDetails({ cart, setCart, favorites, setFavorites }) {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [allProducts, setAllProducts] = useState([]);
//   const [product, setProduct] = useState(null);
//   const [categoryProducts, setCategoryProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [expandedCategory, setExpandedCategory] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     address: "",
//     contact: "",
//     quantity: 1,
//   });

//   const user = JSON.parse(localStorage.getItem("user"));

//   // Fetch all products and user cart/favorites
//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         let userCartIds = [];
//         let userFavIds = [];

//         if (user) {
//           const [cartRes, favRes] = await Promise.all([
//             fetch(`http://localhost:4000/api/users/${user._id}/cart`),
//             fetch(`http://localhost:4000/api/users/${user._id}/favourites`),
//           ]);
//           const cartData = await cartRes.json();
//           const favData = await favRes.json();
//           userCartIds = cartData.cart || [];
//           userFavIds = favData.favourites || [];
//           setCart(userCartIds);
//           setFavorites(userFavIds);
//         }

//         const res = await fetch("http://localhost:4000/api/grocery");
//         const data = await res.json();

//         const updatedProducts = data.map((item) => ({
//           ...item,
//           inCart: userCartIds.includes(item._id),
//           isFav: userFavIds.includes(item._id),
//         }));

//         setAllProducts(updatedProducts);

//         const current = updatedProducts.find(
//           (item) => item._id.toString() === id
//         );
//         setProduct(current);

//         if (current) {
//           const sameCat = updatedProducts.filter(
//             (p) => p.category === current.category && p._id.toString() !== id
//           );
//           setCategoryProducts(sameCat);
//           setExpandedCategory(current.category);
//         }

//         const uniqueCats = [...new Set(updatedProducts.map((p) => p.category))];
//         setCategories(uniqueCats);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchAllData();
//   }, [id]);

//   if (!product) return <p>Loading product...</p>;

//   // Toggle Cart
//   const toggleCart = async (item, e) => {
//     e?.stopPropagation();
//     if (!user) return alert("Please login");

//     const updated = !item.inCart;

//     // Update local state
//     setAllProducts((prev) =>
//       prev.map((p) => (p._id === item._id ? { ...p, inCart: updated } : p))
//     );
//     setCategoryProducts((prev) =>
//       prev.map((p) => (p._id === item._id ? { ...p, inCart: updated } : p))
//     );
//     if (product._id === item._id)
//       setProduct((prev) => ({ ...prev, inCart: updated }));

//     const updatedCart = updated
//       ? [...cart, item._id]
//       : cart.filter((i) => i !== item._id);
//     setCart(updatedCart);

//     try {
//       await fetch(`http://localhost:4000/api/users/cart/${item._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user._id }),
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Toggle Favorites
//   const toggleFavorites = async (item, e) => {
//     e?.stopPropagation();
//     if (!user) return alert("Please login");

//     const updated = !item.isFav;

//     setAllProducts((prev) =>
//       prev.map((p) => (p._id === item._id ? { ...p, isFav: updated } : p))
//     );
//     setCategoryProducts((prev) =>
//       prev.map((p) => (p._id === item._id ? { ...p, isFav: updated } : p))
//     );
//     if (product._id === item._id)
//       setProduct((prev) => ({ ...prev, isFav: updated }));

//     const updatedFav = updated
//       ? [...favorites, item._id]
//       : favorites.filter((i) => i !== item._id);
//     setFavorites(updatedFav);

//     try {
//       await fetch(`http://localhost:4000/api/users/favorites/${item._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user._id }),
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const toggleCategory = (cat) =>
//     setExpandedCategory((prev) => (prev === cat ? null : cat));

//   const rating = 4.5;
//   const stars = Array.from({ length: 5 }, (_, i) => (
//     <span key={i}>{i < Math.floor(rating) ? "⭐" : i < rating ? "✨" : "☆"}</span>
//   ));

//   const handleBuyNow = () => {
//     if (!user) {
//       alert("Please login to place an order");
//       return;
//     }
//     if (product.stock <= 0) return alert("Out of stock");
//     setShowForm(true);
//   };

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // 🛒 UPDATED handleSubmit - Now saves to orders collection
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const qty = parseInt(formData.quantity);

//     if (qty > product.stock) {
//       alert(`Only ${product.stock} units available.`);
//       return;
//     }

//     const newStock = product.stock - qty;
//     const totalPrice = product.price * qty;
//     const orderDate = new Date().toISOString();

//     try {
//       // 1. Update product stock
//       const stockRes = await fetch(`http://localhost:4000/api/grocery/${product._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ stock: newStock }),
//       });

//       if (!stockRes.ok) {
//         alert("Failed to update stock in the database.");
//         return;
//       }

//       // 2. Create order in orders collection
//       const orderData = {
//         productId: product._id,
//         quantity: qty,
//         customerName: formData.name,
//         address: formData.address,
//         contact: formData.contact,
//         status: "pending",
//         date: orderDate,
//         totalPrice: totalPrice,
//         email: user.email
//       };

//       const orderRes = await fetch("http://localhost:4000/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       });

//       if (!orderRes.ok) {
//         alert("Failed to create order. Please try again.");
//         return;
//       }

//       const orderResult = await orderRes.json();

//       // 3. Update local state
//       setProduct((prev) => ({ ...prev, stock: newStock }));
//       setCategoryProducts((prev) =>
//         prev.map((p) =>
//           p._id === product._id ? { ...p, stock: newStock } : p
//         )
//       );
//       setAllProducts((prev) =>
//         prev.map((p) =>
//           p._id === product._id ? { ...p, stock: newStock } : p
//         )
//       );

//       alert(
//         `✅ Thank you ${formData.name}!\n\nYour order for ${qty} ${product.name}${
//           qty > 1 ? "s" : ""
//         } has been placed successfully!\n\nOrder ID: ${orderResult._id}\nTotal: ₹${totalPrice}\nStatus: Pending`
//       );

//       setShowForm(false);
//       setFormData({ name: "", address: "", contact: "", quantity: 1 });
      
//     } catch (err) {
//       console.error(err);
//       alert("Error processing order. Please try again.");
//     }
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
//                     key={p._id}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "10px",
//                       margin: "8px 0",
//                       cursor: "pointer",
//                       backgroundColor:
//                         p._id === id ? "#e6ffe6" : "transparent",
//                       padding: "5px",
//                       borderRadius: "5px",
//                     }}
//                     onClick={() => navigate(`/product/${p._id}`)}
//                   >
//                     <img
//                       src={p.image}
//                       alt={p.name}
//                       width="40"
//                       height="40"
//                       style={{
//                         borderRadius: "5px",
//                         objectFit: "cover",
//                       }}
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
//             width="250"
//             height="250"
//             style={{ objectFit: "cover", borderRadius: "10px" }}
//           />
//           <div>
//             <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//               <h1>{product.name}</h1>
//               <img
//                 src={product.isFav ? "/red-heart.png" : "/heart.jpg"}
//                 alt="fav"
//                 width="25"
//                 height="25"
//                 style={{ cursor: "pointer" }}
//                 onClick={(e) => toggleFavorites(product, e)}
//               />
//             </div>
//             <div style={{ fontSize: "20px", marginBottom: "10px" }}>
//               {stars} <span style={{ fontSize: "14px" }}>({rating})</span>
//             </div>
//             <p>Price: ₹{product.price}</p>
//             <p>Unit: {product.unit}</p>
//             <p>Stock: {product.stock}</p>
//             <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
//               <button
//                 onClick={(e) => toggleCart(product, e)}
//                 style={{
//                   padding: "8px 14px",
//                   backgroundColor: product.inCart ? "#6c757d" : "#007bff",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "6px",
//                 }}
//               >
//                 {product.inCart ? "Remove from Cart" : "Add to Cart"}
//               </button>
//               <button
//                 onClick={handleBuyNow}
//                 disabled={product.stock <= 0}
//                 style={{
//                   padding: "8px 14px",
//                   backgroundColor:
//                     product.stock <= 0 ? "gray" : "#28a745",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "6px",
//                 }}
//               >
//                 {product.stock > 0 ? "Buy Now" : "Out of Stock"}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* RELATED PRODUCTS */}
//         <h2>More in {product.category}</h2>
//         <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
//           {categoryProducts.map((item) => (
//             <div
//               key={item._id}
//               style={{
//                 position: "relative",
//                 border: "1px solid #ccc",
//                 padding: "10px",
//                 borderRadius: "8px",
//                 width: "180px",
//                 textAlign: "center",
//                 cursor: "pointer",
//               }}
//             >
//               {/* Heart */}
//               <span
//                 style={{
//                   position: "absolute",
//                   top: "5px",
//                   right: "5px",
//                   cursor: "pointer",
//                 }}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleFavorites(item, e);
//                 }}
//               >
//                 <img
//                   src={item.isFav ? "/red-heart.png" : "/heart.jpg"}
//                   alt="fav"
//                   width="20"
//                   height="20"
//                 />
//               </span>

//               {/* Product Info */}
//               <div onClick={() => navigate(`/product/${item._id}`)}>
//                 <img src={item.image} alt={item.name} width="100" height="100" />
//                 <h4>{item.name}</h4>
//                 <p>Price: ₹{item.price}</p>
//                 <p>Stock: {item.stock}</p>
//               </div>

//               {/* Cart Button */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleCart(item, e);
//                 }}
//                 style={{
//                   padding: "5px 10px",
//                   marginTop: "5px",
//                   backgroundColor: item.inCart ? "#6c757d" : "#007bff",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "5px",
//                 }}
//               >
//                 {item.inCart ? "Remove" : "Add to Cart"}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* BUY FORM */}
//       {showForm && (
//         <div className="buy-form-overlay">
//           <div className="buy-form">
//             <h3>🛒 Order Details</h3>
//             <form onSubmit={handleSubmit}>
//               <label>Name:</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//               <label>Address:</label>
//               <textarea
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//               />
//               <label>Contact Number:</label>
//               <input
//                 type="text"
//                 name="contact"
//                 value={formData.contact}
//                 onChange={handleChange}
//                 required
//               />
//               <label>Quantity:</label>
//               <input
//                 type="number"
//                 name="quantity"
//                 value={formData.quantity}
//                 onChange={handleChange}
//                 min="1"
//                 required
//               />
//               <div className="form-buttons">
//                 <button type="submit">Confirm Order</button>
//                 <button type="button" onClick={() => setShowForm(false)}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch products + user cart/favorites
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        let userCartIds = [];
        let userFavIds = [];

        if (user) {
          const [cartRes, favRes] = await Promise.all([
            fetch(`http://localhost:4000/api/users/${user._id}/cart`),
            fetch(`http://localhost:4000/api/users/${user._id}/favourites`),
          ]);
          const cartData = await cartRes.json();
          const favData = await favRes.json();
          userCartIds = cartData.cart || [];
          userFavIds = favData.favourites || [];
          setCart(userCartIds);
          setFavorites(userFavIds);
        }

        const res = await fetch("http://localhost:4000/api/grocery");
        const data = await res.json();

        const updatedProducts = data.map((item) => ({
          ...item,
          inCart: userCartIds.includes(item._id),
          isFav: userFavIds.includes(item._id),
        }));

        setAllProducts(updatedProducts);

        const current = updatedProducts.find(
          (item) => item._id.toString() === id
        );
        setProduct(current);

        if (current) {
          const sameCat = updatedProducts.filter(
            (p) => p.category === current.category && p._id.toString() !== id
          );
          setCategoryProducts(sameCat);
          setExpandedCategory(current.category);
        }

        const uniqueCats = [...new Set(updatedProducts.map((p) => p.category))];
        setCategories(uniqueCats);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllData();
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  const toggleCart = async (item, e) => {
    e?.stopPropagation();
    if (!user) return alert("Please login");
    const updated = !item.inCart;

    setAllProducts((prev) =>
      prev.map((p) => (p._id === item._id ? { ...p, inCart: updated } : p))
    );
    setCategoryProducts((prev) =>
      prev.map((p) => (p._id === item._id ? { ...p, inCart: updated } : p))
    );
    if (product._id === item._id) setProduct((prev) => ({ ...prev, inCart: updated }));

    const updatedCart = updated
      ? [...cart, item._id]
      : cart.filter((i) => i !== item._id);
    setCart(updatedCart);

    try {
      await fetch(`http://localhost:4000/api/users/cart/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFavorites = async (item, e) => {
    e?.stopPropagation();
    if (!user) return alert("Please login");
    const updated = !item.isFav;

    setAllProducts((prev) =>
      prev.map((p) => (p._id === item._id ? { ...p, isFav: updated } : p))
    );
    setCategoryProducts((prev) =>
      prev.map((p) => (p._id === item._id ? { ...p, isFav: updated } : p))
    );
    if (product._id === item._id) setProduct((prev) => ({ ...prev, isFav: updated }));

    const updatedFav = updated
      ? [...favorites, item._id]
      : favorites.filter((i) => i !== item._id);
    setFavorites(updatedFav);

    try {
      await fetch(`http://localhost:4000/api/users/favorites/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCategory = (cat) =>
    setExpandedCategory((prev) => (prev === cat ? null : cat));

  const rating = 4.5;
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i}>{i < Math.floor(rating) ? "⭐" : i < rating ? "✨" : "☆"}</span>
  ));

  const handleBuyNow = () => {
    if (!user) {
      alert("Please login to place an order");
      return;
    }
    if (product.stock <= 0) return alert("Out of stock");
    setShowForm(true);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const qty = parseInt(formData.quantity);
    if (qty > product.stock) {
      alert(`Only ${product.stock} units available.`);
      return;
    }
    const newStock = product.stock - qty;
    const totalPrice = product.price * qty;
    const orderDate = new Date().toISOString();

    try {
      await fetch(`http://localhost:4000/api/grocery/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: newStock }),
      });

      const orderData = {
        productId: product._id,
        quantity: qty,
        customerName: formData.name,
        address: formData.address,
        contact: formData.contact,
        status: "pending",
        date: orderDate,
        totalPrice: totalPrice,
        email: user.email
      };

      const orderRes = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!orderRes.ok) throw new Error("Failed to create order");

      const orderResult = await orderRes.json();

      setProduct((prev) => ({ ...prev, stock: newStock }));
      setCategoryProducts((prev) =>
        prev.map((p) => (p._id === product._id ? { ...p, stock: newStock } : p))
      );
      setAllProducts((prev) =>
        prev.map((p) => (p._id === product._id ? { ...p, stock: newStock } : p))
      );

      alert(
        `✅ Thank you ${formData.name}! Your order for ${qty} ${product.name}${
          qty > 1 ? "s" : ""
        } has been placed.\nOrder ID: ${orderResult._id}\nTotal: ₹${totalPrice}`
      );

      setShowForm(false);
      setFormData({ name: "", address: "", contact: "", quantity: 1 });
    } catch (err) {
      console.error(err);
      alert("Error processing order. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        background: "linear-gradient(to right, #e6f2f0, #f8fafa)",
        height: "80vh",
        overflow: "hidden",
      }}
    >
      {/* LEFT SIDEBAR */}
      <div
        style={{
          width: "25%",
          borderRight: "2px solid rgba(0,0,0,0.08)",
          padding: "5px",
          overflowY: "auto",
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
                    key={p._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      margin: "10px 0",
                      cursor: "pointer",
                      padding: "6px",
                      borderRadius: "8px",
                      backgroundColor:
                        p._id.toString() === id ? "#e6fff0" : "transparent",
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => navigate(`/product/${p._id}`)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f1f9f6")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        p._id.toString() === id ? "#e6fff0" : "transparent")
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
          overflowY: "auto",
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
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h1 style={{ margin: 0, color: "#203a43" }}>{product.name}</h1>
              <img
                src={product.isFav ? "/red-heart.png" : "/heart.jpg"}
                alt="fav"
                width="25"
                height="25"
                style={{ cursor: "pointer" }}
                onClick={(e) => toggleFavorites(product, e)}
              />
            </div>
            <div style={{ fontSize: "20px", margin: "6px 0" }}>
              {stars} <span style={{ fontSize: "14px" }}>({rating})</span>
            </div>
            <p style={{ fontSize: "18px", margin: "6px 0" }}>
              <strong>Price:</strong> ₹{product.price}
            </p>
            <p style={{ fontSize: "16px", margin: "4px 0" }}>
              <strong>Unit:</strong> {product.unit}
            </p>
            <p style={{ fontSize: "16px", margin: "4px 0" }}>
              <strong>Stock:</strong> {product.stock}
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <button
                onClick={(e) => toggleCart(product, e)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: product.inCart ? "#6c757d" : "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                {product.inCart ? "Remove from Cart" : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                style={{
                  padding: "10px 20px",
                  background: product.stock <= 0 ? "gray" : "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: product.stock <= 0 ? "not-allowed" : "pointer",
                  fontWeight: "600",
                }}
              >
                {product.stock > 0 ? "Buy Now" : "Out of Stock"}
              </button>
            </div>
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
              key={item._id}
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
              <span
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorites(item, e);
                }}
              >
                <img
                  src={item.isFav ? "/red-heart.png" : "/heart.jpg"}
                  alt="fav"
                  width="20"
                  height="20"
                />
              </span>
              <div onClick={() => navigate(`/product/${item._id}`)} style={{ textAlign: "center" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  width="120px"
                  height="120px"
                  style={{ borderRadius: "12px", objectFit: "cover", marginBottom: "10px" }}
                />
                <h4 style={{ margin: "0 0 4px", color: "#203a43" }}>{item.name}</h4>
                <p style={{ margin: "0", fontSize: "14px" }}>₹{item.price}</p>
                <p style={{ margin: "0", fontSize: "13px", color: "#555" }}>Stock: {item.stock}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCart(item, e);
                }}
                style={{
                  marginTop: "10px",
                  padding: "6px 10px",
                  backgroundColor: item.inCart ? "#909497ff" : "#3b6462ff",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                {item.inCart ? "Remove" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* BUY FORM */}
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
                required
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
