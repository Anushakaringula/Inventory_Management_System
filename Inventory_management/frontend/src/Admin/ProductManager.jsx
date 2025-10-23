import React, { useState, useEffect } from 'react';

// =================================================================
// CSS Styles (Embedded for simplicity)
// =================================================================
// =================================================================
// CSS Styles with Gradients
// =================================================================
const productManagerStyles = `
* { box-sizing: border-box; }

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f7f6;
}

.app-container { display: flex; height: 100vh; width: 100vw; }

.main-content {
  padding: 20px;
  width: 100%; /* full width inside container */
  height: 100%;
  overflow: hidden;
}

h1 { color: #333; margin-bottom: 20px; }

.product-table-container {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  padding: 5px 10px 10px 10px;
 height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
}

.table-btn-edit, .table-btn-remove {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  transition: all 0.3s;
  color: white;
}

/* Gradient for Edit */
.table-btn-edit {
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  margin-right: 10px; /* Gap between buttons */
}
.table-btn-edit:hover {
  background: linear-gradient(to right, #203a43, #2c5364, #0f2027);
  transform: translateY(-2px);
}

/* Gradient for Remove */
.table-btn-remove {
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
}
.table-btn-remove:hover {
  background: linear-gradient(to right, #203a43, #2c5364, #0f2027);
  transform: translateY(-2px);
}
.scrollable-table-wrapper {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.product-table { width: 100%; border-collapse: collapse; }

.product-table th, .product-table td {
  padding: 8px 1px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.product-table th {
  background-color: #f0f0f0;
  font-weight: bold;
  color: #555;
  position: sticky;
  top: 0;
  z-index: 1;
  white-space: nowrap;
}

.product-info-cell { display: flex; align-items: center; }
.product-info-cell img { 
  width: 60px; 
  height: 60px; 
  border-radius: 6px; 
  margin-right: 15px; 
  object-fit: cover; 
  border: 1px solid #eee; 
}
.product-info-details { display: flex; flex-direction: column; }
.product-name { font-weight: bold; color: #333; font-size: 1.1em; }
.product-id { font-size: 0.9em; color: #777; }

/* Buttons with gradient */
.table-btn-edit, .table-btn-remove, .btn-add-product, .modal-form .btn-cancel, .modal-form .btn-submit {
  padding: 10px 18px 10px 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
  transition: all 0.3s ease;
  color: white;
  background: linear-gradient(to right, #144a61ff, #203a43, #2c5364);
  white-space: nowrap;
}

.table-btn-edit:hover, .table-btn-remove:hover, .btn-add-product:hover, .modal-form .btn-cancel:hover, .modal-form .btn-submit:hover {
  filter: brightness(1.2);
}

.bottom-actions {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  padding-top: 15px;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

/* Modal Form Styles */
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: rgba(0,0,0,0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-form {
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.modal-form h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.6em;
  color: #333;
  text-align: center;
}

.modal-form .form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.modal-form .form-group label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
  font-size: 0.95em;
}

.modal-form .form-group input {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1em;
  outline: none;
  transition: border-color 0.3s;
}

.modal-form .form-group input:focus { border-color: #203a43; }

.modal-form .form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
  margin-bottom:20px;
}

/* Scrollbar customization */
.scrollable-table-wrapper::-webkit-scrollbar {
  width: 8px;
}
.scrollable-table-wrapper::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #2a4049ff, #8098a0ff, #8aa4afff);
  border-radius: 4px;
}
.scrollable-table-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
}
  .bottom-actions {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  padding: 15px 0;
  position: sticky;
  top: 0; /* keeps it visible at top of table container */
  background: white;
  z-index: 10;
}

`;



// =================================================================
// React Component
// =================================================================
const ProductManager = () => {
  const [activePage, setActivePage] = useState('products');
  const [grocery, setGrocery] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    brand: "",
    price: "",
    unit: "",
    stock: "",
    supplier: "",
    image: "",
    expiry_date: "",
    initial_quantity:""
  });

  // Fetch existing products
  useEffect(() => {
    fetch("http://localhost:4000/api/grocery")
      .then(res => res.json())
      .then(data => setGrocery(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData({ ...formData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };
  const handleEdit = (product) => {
    setFormData(product);
    setShowForm(true);
  };

  // Delete Product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`http://localhost:4000/api/grocery/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete");
        setGrocery((prev) => prev.filter((item) => item._id !== id));
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete product.");
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = formData._id ? "PUT" : "POST";
      const url = formData._id
        ? `http://localhost:4000/api/grocery/${formData._id}`
        : "http://localhost:4000/api/grocery";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();

      if (method === "POST") {
        setGrocery((prev) => [...prev, data]);
      } else {
        setGrocery((prev) =>
          prev.map((item) => (item._id === data._id ? data : item))
        );
      }

      setShowForm(false);
      setFormData({
        id: "",
        name: "",
        category: "",
        brand: "",
        price: "",
        unit: "",
        stock: "",
        supplier: "",
        image: "",
        expiry_date: "",
        initial_quantity:""
      });
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product. Check server logs.");
    }
  };


  return (
    <div className="app-container">
      <style dangerouslySetInnerHTML={{ __html: productManagerStyles }} />
      
      <div className="main-content">
        <h1>Product Management</h1>

        <div className="product-table-container">
          <div className="scrollable-table-wrapper">
            <table className="product-table">
              <thead>
                <tr>
                  <th>Product Info</th>
                  <th>Initial Quantity</th>
                  <th>Present Quantity</th>
                  <th>Sold items</th>
                  <th>Price</th>
                  <th>Expiry</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {grocery.map((product) => (
                  <tr key={product._id || product.id}>
                    <td className="product-info-cell">
                      <img 
  src={product.image || "https://via.placeholder.com/60"} 
  alt={product.name} 
/>


                      <div className="product-info-details">
                        <span className="product-name">{product.name}</span>
                        <span className="product-id">ID: {product.id}</span>
                      </div>
                    </td>
                    <td>{product.initial_quantity}</td>
                    <td>{product.stock}</td>
                    <td>{product.initial_quantity-product.stock}</td>
                    <td>{product.price}</td>
                    <td>{product.expiry_date || "-"}</td>
                    <td>
                      <button
                        className="table-btn-edit"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="table-btn-remove"
                        onClick={() => handleDelete(product._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bottom-actions">
            <button
              className="btn-add-product"
              onClick={() => setShowForm(true)}
            >
              Add New Product
            </button>
          </div>
        </div>

        {showForm && (
          <div className="modal-overlay">
            <form className="modal-form" onSubmit={handleSubmit}>
              <h2>Add Product</h2>

              {[
                "id",
                "name",
                "category",
                "brand",
                "price",
                "unit",
                "stock",
                "supplier",
                "expiry_date",
                "initial_quantity"
              ].map((field) => (
                <div className="form-group" key={field}>
                  <label>{field.replace("_", " ").toUpperCase()}</label>
                  <input
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    type={
                      field === "price" || field === "stock"
                        ? "number"
                        : field === "expiry_date"
                        ? "date"
                        : "text"
                    }
                    required
                  />
                </div>
              ))}

              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required={!formData._id} 
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManager;
