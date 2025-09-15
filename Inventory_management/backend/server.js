const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs= require("fs");
const path=require("path");
const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));


// MongoDB connection
const mongoURI = "mongodb+srv://lkgcoding:code%40lkg@inventory-management.lu8yxdh.mongodb.net/inventorydb?retryWrites=true&w=majority&appName=Inventory-Management";

mongoose.connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    // Start server only after DB connection succeeds
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });

// --- SCHEMA & MODEL ---
const grocerySchema = new mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  brand: String,
  price: Number,
  unit: String,
  stock: Number,
  expiry_date: String,
  supplier: String,
  image: String
});

const Grocery = mongoose.model("Grocery", grocerySchema, "grocery"); 
// ⚠️ third param "grocery" must match your collection name

// --- ROUTES ---
// Home
app.get("/", (req, res) => {
  res.send("Welcome to Grocery API! Use /api/grocery to fetch grocery data.");
});

// Fetch groceries from MongoDB
app.get("/api/grocery", async (req, res) => {
  try {
    const groceries = await Grocery.find();
    res.json(groceries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch groceries" });
  }
});

