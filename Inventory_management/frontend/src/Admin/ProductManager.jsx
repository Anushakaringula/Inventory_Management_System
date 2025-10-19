import React, { useState, useEffect } from 'react';

// =================================================================
// CSS Styles (Embedded for simplicity)
// =================================================================
const productManagerStyles = `
* { box-sizing: border-box; }

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f7f6;
  overflow: hidden;
}

.app-container { display: flex; height: 100vh; width: 100vw; }

.main-content {
  padding: 0px;
  width: 80%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}


h1 { color: #333; margin-bottom: 20px; }

.product-table-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  padding: 20px;
  height: calc(100vh - 120px);
  overflow: hidden;
}

.scrollable-table-wrapper {
  height: calc(100% - 70px);
  overflow-y: auto;
  overflow-x: hidden;
}

.product-table { width: 100%; border-collapse: collapse; }

.product-table th, .product-table td {
  padding: 15px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.product-table th {
  background-color: #f8f8f8;
  font-weight: bold;
  color: #555;
  position: sticky;
  top: 0;
  z-index: 1;
  white-space: nowrap;
}

.product-info-cell { display: flex; align-items: center; }
.product-info-cell img { width: 60px; height: 60px; border-radius: 4px; margin-right: 15px; object-fit: cover; border: 1px solid #eee; }
.product-info-details { display: flex; flex-direction: column; }
.product-name { font-weight: bold; color: #333; font-size: 1.3em; }
.product-id { font-size: 1em; color: #777; }

.table-btn-edit, .table-btn-remove {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2em;
  margin-right: 5px;
  transition: background-color 0.3s;
  white-space: nowrap;
}

.table-btn-edit { background-color: #3498db; color: white; }
.table-btn-edit:hover { background-color: #2980b9; }
.table-btn-remove { background-color: #e74c3c; color: white; }
.table-btn-remove:hover { background-color: #c0392b; }

.bottom-actions {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  padding-top: 15px;
}

.btn-add-product {
  padding: 12px 25px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
  transition: background-color 0.3s;
  background-color: #2ecc71;
  color: white;
}

.btn-add-product:hover { background-color: #27ae60; }

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
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
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
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1em;
  outline: none;
  transition: border-color 0.3s;
}

.modal-form .form-group input:focus { border-color: #3498db; }

.modal-form .form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.modal-form .btn-cancel {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: #e74c3c;
  color: white;
  transition: background-color 0.3s;
}

.modal-form .btn-cancel:hover { background-color: #c0392b; }

.modal-form .btn-submit {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: #2ecc71;
  color: white;
  transition: background-color 0.3s;
}

.modal-form .btn-submit:hover { background-color: #27ae60; }
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
