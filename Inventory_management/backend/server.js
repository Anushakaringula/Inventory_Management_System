// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const fs= require("fs");
// const path=require("path");
// const app = express();
// const PORT = 4000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use("/images", express.static(path.join(__dirname, "images")));


// // MongoDB connection
// const mongoURI = "mongodb+srv://lkgcoding:code%40lkg@inventory-management.lu8yxdh.mongodb.net/inventorydb?retryWrites=true&w=majority&appName=Inventory-Management";

// mongoose.connect(mongoURI)
//   .then(() => {
//     console.log("✅ MongoDB connected successfully");

//     // Start server only after DB connection succeeds
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection failed:", err);
//   });

// // --- SCHEMA & MODEL ---
// const grocerySchema = new mongoose.Schema({
//   id: Number,
//   name: String,
//   category: String,
//   brand: String,
//   price: Number,
//   unit: String,
//   stock: Number,
//   expiry_date: String,
//   supplier: String,
//   image: String
// });

// const Grocery = mongoose.model("Grocery", grocerySchema, "grocery"); 
// // ⚠️ third param "grocery" must match your collection name

// // --- ROUTES ---
// // Home
// app.get("/", (req, res) => {
//   res.send("Welcome to Grocery API! Use /api/grocery to fetch grocery data.");
// });

// // Fetch groceries from MongoDB
// app.get("/api/grocery", async (req, res) => {
//   try {
//     const groceries = await Grocery.find();
//     res.json(groceries);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch groceries" });
//   }
// });








// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const path = require("path");

// const app = express();
// const PORT = 4000;

// // ==========================
// // Middleware
// // ==========================
// app.use(cors());
// app.use(express.json({ limit: "10mb" })); // To handle image base64 data
// app.use("/images", express.static(path.join(__dirname, "images")));
// // ==========================
// // MongoDB Connection
// // ==========================
// const mongoURI =
//   "mongodb+srv://lkgcoding:code%40lkg@inventory-management.lu8yxdh.mongodb.net/inventorydb?retryWrites=true&w=majority";

// mongoose
//   .connect(mongoURI)
//   .then(() => {
//     console.log("✅ MongoDB connected successfully");
//     app.listen(PORT, () =>
//       console.log(`🚀 Server running on http://localhost:${PORT}`)
//     );
//   })
//   .catch((err) => console.error("❌ MongoDB connection failed:", err));

// // ==========================
// // Schema & Model
// // ==========================
// const grocerySchema = new mongoose.Schema({
//   id: Number,
//   name: String,
//   category: String,
//   brand: String,
//   price: Number,
//   unit: { type: String, default: "-" },
//   stock: { type: Number, default: 0 },
//   expiry_date: String,
//   supplier: { type: String, default: "-" },
//   image: String,
//   initial_quantity: { type: Number, default: 0 }
// });
// const Grocery = mongoose.model("Grocery", grocerySchema, "grocery");

// // ==========================
// // Routes
// // ==========================

// // ✅ 1. Get all grocery items
// app.get("/api/grocery", async (req, res) => {
//   try {
//     const groceries = await Grocery.find();
//     res.json(groceries);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch groceries" });
//   }
// });

// // ✅ 2. Add new product
// app.post("/api/grocery", async (req, res) => {
//   try {
//     const newProduct = new Grocery(req.body);
//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (err) {
//     console.error("Error adding product:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ✅ 3. Update existing product
// // Delete product by ID
// app.delete("/api/grocery/:id", async (req, res) => {
//   try {
//     const deleted = await Grocery.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Product not found" });
//     res.json({ message: "Product deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to delete product" });
//   }
// });

// // Update product by ID
// app.put("/api/grocery/:id", async (req, res) => {
//   try {
//     const updated = await Grocery.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updated) return res.status(404).json({ message: "Product not found" });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update product" });
//   }
// });

// // ==========================
// // Root Route
// // ==========================
// app.get("/", (req, res) => {
//   res.send("🛒 Inventory Management API is running...");
// });

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   village: String,
//   mandal: String,
//   district: String,
//   state: String,
//   orders: { type: Array, default: [] },
//   favourites: { type: Array, default: [] },
//   cart: { type: Array, default: [] }
// });

// const User = mongoose.model("User", userSchema, "users");

// // ==========================
// // User Routes
// // ==========================

// // ✅ Get all users
// app.post("/api/users", async (req, res) => {
//   const { name, email, password, village, mandal, district, state } = req.body;

//   if (!name || !email || !password || !village || !mandal || !district || !state) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     // Check if email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "Email already registered" });

//     const newUser = new User({ name, email, password, village, mandal, district, state });
//     const savedUser = await newUser.save();

//     res.status(201).json({ message: "Signup successful", user: savedUser });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ message: "Server error during signup" });
//   }
// });

// // Login
// app.post("/api/users/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) return res.status(400).json({ message: "Email and password required" });

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     if (user.password !== password) return res.status(400).json({ message: "Invalid credentials" });

//     res.status(200).json({ message: "Login successful", user });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error during login" });
//   }
// });

// // Optional: Get all users
// app.get("/api/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch users" });
//   }
// });

// // Add/Remove from Cart
// // PUT /api/users/cart/:productId
// app.put("/api/users/cart/:productId", async (req, res) => {
//   const { userId } = req.body;
//   const { productId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (user.cart.includes(productId)) {
//       // Remove if already in cart (toggle behavior)
//       user.cart = user.cart.filter((id) => id.toString() !== productId);
//     } else {
//       // Add to cart
//       user.cart.push(productId);
//     }

//     await user.save();
//     res.status(200).json({ cart: user.cart }); // returns array of product IDs
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.post("/api/products/cart-items", async (req, res) => {
//   const { ids } = req.body; // array of product _id strings

//   try {
//     // fetch full product documents
//     const products = await Product.find({ _id: { $in: ids } });
//     res.status(200).json(products); // returns array of full products
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // GET /api/users/:userId/cart
// app.get("/api/users/:userId/cart", async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.status(200).json({ cart: user.cart }); // only returns array of _id's
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });



// // Add/Remove from Favorites










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
app.use(express.json({ limit: "10mb" }));
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
// Schemas & Models
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
  initial_quantity: { type: Number, default: 0 },
});

const Grocery = mongoose.model("Grocery", grocerySchema, "grocery");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  village: String,
  mandal: String,
  district: String,
  state: String,
  orders: { type: Array, default: [] },
  favourites: { type: Array, default: [] },
  cart: { type: Array, default: [] },
});

const User = mongoose.model("User", userSchema, "users");

// ==========================
// Routes
// ==========================

// Root
app.get("/", (req, res) => {
  res.send("🛒 Inventory Management API is running...");
});

// Grocery Routes
app.get("/api/grocery", async (req, res) => {
  try {
    const groceries = await Grocery.find();
    res.json(groceries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch groceries" });
  }
});

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

app.delete("/api/grocery/:id", async (req, res) => {
  try {
    const deleted = await Grocery.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});

// User Routes
app.post("/api/users", async (req, res) => {
  const { name, email, password, village, mandal, district, state } = req.body;

  if (!name || !email || !password || !village || !mandal || !district || !state) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const newUser = new User({ name, email, password, village, mandal, district, state });
    const savedUser = await newUser.save();

    res.status(201).json({ message: "Signup successful", user: savedUser });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.password !== password) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Add/Remove from Cart
app.put("/api/users/cart/:productId", async (req, res) => {
  const { userId } = req.body;
  const { productId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.cart.includes(productId)) {
      user.cart = user.cart.filter((id) => id.toString() !== productId);
    } else {
      user.cart.push(productId);
    }

    await user.save();
    res.status(200).json({ cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's cart (_ids only)
app.get("/api/users/:userId/cart", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ cart: user.cart }); // only array of product IDs
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// PUT /api/users/favorites/:productId
app.put("/api/users/favorites/:productId", async (req, res) => {
  const { userId } = req.body;
  const { productId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.favourites.includes(productId)) {
      user.favourites = user.favourites.filter((id) => id.toString() !== productId);
    } else {
      user.favourites.push(productId);
    }

    await user.save();
    res.status(200).json({ favourites: user.favourites }); // returns updated array of IDs
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/users/:userId/favourites
app.get("/api/users/:userId/favourites", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ favourites: user.favourites });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
