const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 4000;

// ==========================
// Middleware
// ==========================
app.use(cors());
app.use(express.json({ limit: "10mb" })); // To handle image base64 data
app.use("/images", express.static(path.join(__dirname, "images")));
// ==========================
// MongoDB Connection
// ==========================
const mongoURI =
  "mongodb+srv://lkgcoding:code%40lkg@inventory-management.lu8yxdh.mongodb.net/inventorydb?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// ==========================
// Schema & Model
// ==========================
const grocerySchema = new mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  brand: String,
  price: Number,
  unit: { type: String, default: "-" },
  stock: { type: Number, default: 0 },
  expiry_date: String,
  supplier: { type: String, default: "-" },
  image: String,
  initial_quantity: { type: Number, default: 0 }
});
const Grocery = mongoose.model("Grocery", grocerySchema, "grocery");

// ==========================
// Routes
// ==========================

// ✅ 1. Get all grocery items
app.get("/api/grocery", async (req, res) => {
  try {
    const groceries = await Grocery.find();
    res.json(groceries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch groceries" });
  }
});

// ✅ 2. Add new product
app.post("/api/grocery", async (req, res) => {
  try {
    const newProduct = new Grocery(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ 3. Update existing product
// Delete product by ID
app.delete("/api/grocery/:id", async (req, res) => {
  try {
    const deleted = await Grocery.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});

// Update product by ID
app.put("/api/grocery/:id", async (req, res) => {
  try {
    const updated = await Grocery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product" });
  }
});

// ==========================
// Root Route
// ==========================
app.get("/", (req, res) => {
  res.send("🛒 Inventory Management API is running...");
});
