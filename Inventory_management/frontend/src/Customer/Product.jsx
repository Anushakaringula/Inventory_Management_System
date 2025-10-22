// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
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

//   // ✅ Get logged-in user
//   const user = JSON.parse(localStorage.getItem("user"));

//   // --- Fetch products and setup ---
//   useEffect(() => {
//     fetch("http://localhost:4000/api/grocery")
//       .then((res) => res.json())
//       .then((data) => {
//         setAllProducts(data);

//         // Set unique categories
//         const uniqueCategories = [...new Set(data.map((item) => item.category))];
//         setCategories(uniqueCategories);

//         // Find current product
//         const current = data.find((item) => item._id.toString() === id);
//         setProduct(current);

//         // Find other products in same category
//         if (current) {
//           const sameCategory = data.filter(
//             (item) => item.category === current.category && item._id.toString() !== id
//           );
//           setCategoryProducts(sameCategory);
//           setExpandedCategory(current.category);
//         }
//       })
//       .catch((err) => console.error("Error fetching products:", err));
//   }, [id]);

//   if (!product) return <p>Loading product or product not found...</p>;

//   // --- Toggle Cart & Update Backend ---
//   const toggleCart = async (item) => {
//     if (!user) {
//       alert("Please login to add items to cart");
//       return;
//     }

//     try {
//       const res = await fetch(
//         `http://localhost:4000/api/users/cart/${item._id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userId: user._id }),
//         }
//       );
//       const data = await res.json();
//       console.log("Cart updated in DB:", data);

//       setCart((prev) => {
//         const exists = prev.find((p) => p._id === item._id);
//         if (exists) {
//           return prev.filter((p) => p._id !== item._id);
//         } else {
//           return [...prev, item];
//         }
//       });
//     } catch (err) {
//       console.error("Error updating cart:", err);
//     }
//   };

//   // --- Toggle Favorites & Update Frontend ---
//   const toggleFavorites = async (item) => {
//     if (!user) {
//       alert("Please login to add favorites");
//       return;
//     }

//     try {
//       const res = await fetch(
//         `http://localhost:4000/api/users/favorites/${item._id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userId: user._id }),
//         }
//       );
//       const data = await res.json();
//       console.log("Favorites updated in DB:", data);

//       setFavorites((prev) => {
//         const exists = prev.find((p) => p._id === item._id);
//         if (exists) {
//           return prev.filter((p) => p._id !== item._id);
//         } else {
//           return [...prev, item];
//         }
//       });
//     } catch (err) {
//       console.error("Error updating favorites:", err);
//     }
//   };

//   // --- Expand/Collapse Category ---
//   const toggleCategory = (cat) => {
//     setExpandedCategory((prev) => (prev === cat ? null : cat));
//   };

//   // --- Rating Display ---
//   const rating = 4.5;
//   const stars = Array.from({ length: 5 }, (_, i) => (
//     <span key={i}>{i < Math.floor(rating) ? "⭐" : i < rating ? "✨" : "☆"}</span>
//   ));

//   // --- Buy Now Handlers ---
//   const handleBuyNow = () => {
//     if (product.stock <= 0) {
//       alert("❌ Out of stock!");
//       return;
//     }

//     setProduct((prev) => ({ ...prev, stock: prev.stock - 1 }));
//     setAllProducts((prev) =>
//       prev.map((p) => (p._id === product._id ? { ...p, stock: p.stock - 1 } : p))
//     );

//     setShowForm(true);
//   };

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(
//       `✅ Thank you, ${formData.name}! Your order for ${formData.quantity} ${product.name} has been placed successfully.`
//     );
//     setShowForm(false);
//     setFormData({ name: "", address: "", contact: "", quantity: 1 });
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
//                     key={p._id}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "10px",
//                       margin: "8px 0",
//                       cursor: "pointer",
//                       backgroundColor: p._id === id ? "#e6ffe6" : "transparent",
//                       padding: "5px",
//                       borderRadius: "5px",
//                     }}
//                     onClick={() => navigate(`/product/${p._id}`)}
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
//             <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//               <h1>{product.name}</h1>
//               <img
//                 src={
//                   favorites.find((fav) => fav._id === product._id)
//                     ? "/red-heart.png"
//                     : "/heart.jpg"
//                 }
//                 alt="favorite"
//                 width="25px"
//                 height="25px"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => toggleFavorites(product)}
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
//                 onClick={() => toggleCart(product)}
//                 style={{
//                   padding: "8px 14px",
//                   backgroundColor: "#007bff",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "6px",
//                   cursor: "pointer",
//                 }}
//               >
//                 {cart.find((p) => p._id === product._id)
//                   ? "Remove from Cart"
//                   : "Add to Cart"}
//               </button>

//               <button
//                 onClick={handleBuyNow}
//                 disabled={product.stock <= 0}
//                 style={{
//                   padding: "8px 14px",
//                   backgroundColor: product.stock <= 0 ? "gray" : "#28a745",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "6px",
//                   cursor: product.stock <= 0 ? "not-allowed" : "pointer",
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
//                 transition: "transform 0.2s ease",
//               }}
//               onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
//               onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//             >
//               <span
//                 style={{
//                   position: "absolute",
//                   top: "5px",
//                   right: "5px",
//                   cursor: "pointer",
//                 }}
//               >
//                 <img
//                   src={
//                     favorites.find((fav) => fav._id === item._id)
//                       ? "/red-heart.png"
//                       : "/heart.jpg"
//                   }
//                   alt="fav"
//                   width="20px"
//                   height="20px"
//                   onClick={() => toggleFavorites(item)}
//                 />
//               </span>
//               <Link
//                 to={`/product/${item._id}`}
//                 style={{ textDecoration: "none", color: "inherit" }}
//               >
//                 <img src={item.image} alt={item.name} width="100px" height="100px" />
//                 <h4>{item.name}</h4>
//                 <p>Price: ₹{item.price}</p>
//                 <p>Quantity: {item.stock}</p>
//               </Link>
//               <button
//                 onClick={() => toggleCart(item)}
//                 style={{
//                   padding: "5px 10px",
//                   marginTop: "5px",
//                   backgroundColor: "#007bff",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "5px",
//                 }}
//               >
//                 {cart.find((p) => p._id === item._id) ? "Remove" : "Add to Cart"}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* --- BUY NOW FORM MODAL --- */}
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
// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
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

//   // ✅ Fetch products + user's cart + favorites
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

//         const updated = data.map((item) => ({
//           ...item,
//           inCart: userCartIds.includes(item._id),
//           isFav: userFavIds.includes(item._id),
//         }));

//         setAllProducts(updated);

//         const current = updated.find((item) => item._id.toString() === id);
//         setProduct(current);

//         if (current) {
//           const sameCat = updated.filter(
//             (p) => p.category === current.category && p._id.toString() !== id
//           );
//           setCategoryProducts(sameCat);
//           setExpandedCategory(current.category);
//         }

//         const uniqueCats = [...new Set(updated.map((i) => i.category))];
//         setCategories(uniqueCats);
//       } catch (err) {
//         console.error("Error fetching product data:", err);
//       }
//     };

//     fetchAllData();
//   }, [id]);

//   if (!product) return <p>Loading product or product not found...</p>;

//   // ✅ Toggle Cart
//   const toggleCart = async (item, event) => {
//     event?.stopPropagation();
//     if (!user) {
//       alert("Please login to continue");
//       return;
//     }

//     const updated = !item.inCart;

//     // Update local immediately
//     setAllProducts((prev) =>
//       prev.map((g) => (g._id === item._id ? { ...g, inCart: updated } : g))
//     );
//     if (product && product._id === item._id)
//       setProduct((prev) => ({ ...prev, inCart: updated }));

//     const updatedCart = updated
//       ? [...cart, item._id]
//       : cart.filter((id) => id !== item._id);
//     setCart(updatedCart);

//     try {
//       await fetch(`http://localhost:4000/api/users/cart/${item._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user._id }),
//       });
//     } catch (err) {
//       console.error("Error updating cart:", err);
//     }
//   };

//   // ✅ Toggle Favorites
//   const toggleFavorites = async (item, event) => {
//     event?.stopPropagation();
//     if (!user) {
//       alert("Please login to continue");
//       return;
//     }

//     const updated = !item.isFav;

//     // Update local immediately
//     setAllProducts((prev) =>
//       prev.map((g) => (g._id === item._id ? { ...g, isFav: updated } : g))
//     );
//     if (product && product._id === item._id)
//       setProduct((prev) => ({ ...prev, isFav: updated }));

//     const updatedFav = updated
//       ? [...favorites, item._id]
//       : favorites.filter((id) => id !== item._id);
//     setFavorites(updatedFav);

//     try {
//       await fetch(`http://localhost:4000/api/users/favorites/${item._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user._id }),
//       });
//     } catch (err) {
//       console.error("Error updating favorites:", err);
//     }
//   };

//   const toggleCategory = (cat) =>
//     setExpandedCategory((prev) => (prev === cat ? null : cat));

//   // --- Rating Display ---
//   const rating = 4.5;
//   const stars = Array.from({ length: 5 }, (_, i) => (
//     <span key={i}>{i < Math.floor(rating) ? "⭐" : i < rating ? "✨" : "☆"}</span>
//   ));

//   // --- Buy Now Handlers ---
//   const handleBuyNow = () => {
//     if (product.stock <= 0) {
//       alert("❌ Out of stock!");
//       return;
//     }
//     setProduct((prev) => ({ ...prev, stock: prev.stock - 1 }));
//     setShowForm(true);
//   };

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(
//       `✅ Thank you, ${formData.name}! Your order for ${formData.quantity} ${product.name} has been placed successfully.`
//     );
//     setShowForm(false);
//     setFormData({ name: "", address: "", contact: "", quantity: 1 });
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
//                     key={p._id}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "10px",
//                       margin: "8px 0",
//                       cursor: "pointer",
//                       backgroundColor: p._id === id ? "#e6ffe6" : "transparent",
//                       padding: "5px",
//                       borderRadius: "5px",
//                     }}
//                     onClick={() => navigate(`/product/${p._id}`)}
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
//             <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//               <h1>{product.name}</h1>
//               <img
//                 src={product.isFav ? "/red-heart.png" : "/heart.jpg"}
//                 alt="favorite"
//                 width="25px"
//                 height="25px"
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
//                   cursor: "pointer",
//                 }}
//               >
//                 {product.inCart ? "Remove from Cart" : "Add to Cart"}
//               </button>

//               <button
//                 onClick={handleBuyNow}
//                 disabled={product.stock <= 0}
//                 style={{
//                   padding: "8px 14px",
//                   backgroundColor: product.stock <= 0 ? "gray" : "#28a745",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "6px",
//                   cursor: product.stock <= 0 ? "not-allowed" : "pointer",
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
//                 transition: "transform 0.2s ease",
//               }}
//               onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
//               onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//             >
//               <span
//                 style={{
//                   position: "absolute",
//                   top: "5px",
//                   right: "5px",
//                   cursor: "pointer",
//                 }}
//                 onClick={(e) => toggleFavorites(item, e)}
//               >
//                 <img
//                   src={item.isFav ? "/red-heart.png" : "/heart.jpg"}
//                   alt="fav"
//                   width="20px"
//                   height="20px"
//                 />
//               </span>
//               <Link
//                 to={`/product/${item._id}`}
//                 style={{ textDecoration: "none", color: "inherit" }}
//               >
//                 <img src={item.image} alt={item.name} width="100px" height="100px" />
//                 <h4>{item.name}</h4>
//                 <p>Price: ₹{item.price}</p>
//                 <p>Quantity: {item.stock}</p>
//               </Link>
//               <button
//                 onClick={(e) => toggleCart(item, e)}
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

//       {/* --- BUY NOW FORM --- */}
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
//     if (product.stock <= 0) return alert("Out of stock");
//     setShowForm(true);
//   };

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // 🧩 UPDATED handleSubmit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const qty = parseInt(formData.quantity);

//     if (qty > product.stock) {
//       alert(`Only ${product.stock} units available.`);
//       return;
//     }

//     const newStock = product.stock - qty;

//     try {
//       const res = await fetch(`http://localhost:4000/api/grocery/${product._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ stock: newStock }),
//       });

//       if (res.ok) {
//         setProduct((prev) => ({ ...prev, stock: newStock }));

//         // Update categoryProducts & allProducts too
//         setCategoryProducts((prev) =>
//           prev.map((p) =>
//             p._id === product._id ? { ...p, stock: newStock } : p
//           )
//         );
//         setAllProducts((prev) =>
//           prev.map((p) =>
//             p._id === product._id ? { ...p, stock: newStock } : p
//           )
//         );

//         alert(
//           `✅ Thank you ${formData.name}, your order for ${qty} ${product.name}${
//             qty > 1 ? "s" : ""
//           } has been placed successfully!`
//         );
//       } else {
//         alert("Failed to update stock in the database.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error updating stock.");
//     }

//     setShowForm(false);
//     setFormData({ name: "", address: "", contact: "", quantity: 1 });
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

  // Fetch all products and user cart/favorites
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

  // Toggle Cart
  const toggleCart = async (item, e) => {
    e?.stopPropagation();
    if (!user) return alert("Please login");

    const updated = !item.inCart;

    // Update local state
    setAllProducts((prev) =>
      prev.map((p) => (p._id === item._id ? { ...p, inCart: updated } : p))
    );
    setCategoryProducts((prev) =>
      prev.map((p) => (p._id === item._id ? { ...p, inCart: updated } : p))
    );
    if (product._id === item._id)
      setProduct((prev) => ({ ...prev, inCart: updated }));

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

  // Toggle Favorites
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
    if (product._id === item._id)
      setProduct((prev) => ({ ...prev, isFav: updated }));

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

  // 🛒 UPDATED handleSubmit - Now saves to orders collection
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
      // 1. Update product stock
      const stockRes = await fetch(`http://localhost:4000/api/grocery/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: newStock }),
      });

      if (!stockRes.ok) {
        alert("Failed to update stock in the database.");
        return;
      }

      // 2. Create order in orders collection
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

      if (!orderRes.ok) {
        alert("Failed to create order. Please try again.");
        return;
      }

      const orderResult = await orderRes.json();

      // 3. Update local state
      setProduct((prev) => ({ ...prev, stock: newStock }));
      setCategoryProducts((prev) =>
        prev.map((p) =>
          p._id === product._id ? { ...p, stock: newStock } : p
        )
      );
      setAllProducts((prev) =>
        prev.map((p) =>
          p._id === product._id ? { ...p, stock: newStock } : p
        )
      );

      alert(
        `✅ Thank you ${formData.name}!\n\nYour order for ${qty} ${product.name}${
          qty > 1 ? "s" : ""
        } has been placed successfully!\n\nOrder ID: ${orderResult._id}\nTotal: ₹${totalPrice}\nStatus: Pending`
      );

      setShowForm(false);
      setFormData({ name: "", address: "", contact: "", quantity: 1 });
      
    } catch (err) {
      console.error(err);
      alert("Error processing order. Please try again.");
    }
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
                    key={p._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      margin: "8px 0",
                      cursor: "pointer",
                      backgroundColor:
                        p._id === id ? "#e6ffe6" : "transparent",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                    onClick={() => navigate(`/product/${p._id}`)}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      width="40"
                      height="40"
                      style={{
                        borderRadius: "5px",
                        objectFit: "cover",
                      }}
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
            width="250"
            height="250"
            style={{ objectFit: "cover", borderRadius: "10px" }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h1>{product.name}</h1>
              <img
                src={product.isFav ? "/red-heart.png" : "/heart.jpg"}
                alt="fav"
                width="25"
                height="25"
                style={{ cursor: "pointer" }}
                onClick={(e) => toggleFavorites(product, e)}
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
                onClick={(e) => toggleCart(product, e)}
                style={{
                  padding: "8px 14px",
                  backgroundColor: product.inCart ? "#6c757d" : "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                }}
              >
                {product.inCart ? "Remove from Cart" : "Add to Cart"}
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
              key={item._id}
              style={{
                position: "relative",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                width: "180px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              {/* Heart */}
              <span
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
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

              {/* Product Info */}
              <div onClick={() => navigate(`/product/${item._id}`)}>
                <img src={item.image} alt={item.name} width="100" height="100" />
                <h4>{item.name}</h4>
                <p>Price: ₹{item.price}</p>
                <p>Stock: {item.stock}</p>
              </div>

              {/* Cart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCart(item, e);
                }}
                style={{
                  padding: "5px 10px",
                  marginTop: "5px",
                  backgroundColor: item.inCart ? "#6c757d" : "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
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