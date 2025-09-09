// const express = require("express");
// const app = express();
// const data = require("./grocery.json"); 
// app.get("/", (req, res) => {
//   res.send("Welcome to Grocery API! Use /api to get data.");
// });

// app.get("/api", (req, res) => {
//   //res.json(data);
//   res.json(data);
// });



// app.listen(5000, () => console.log("API running on http://localhost:5000"));
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const path=require("path");
app.use(cors()); // allow requests from React frontend

app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/api/grocery", (req, res) => {
  fs.readFile("grocery.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to read file" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});
app.get("/",(req,res)=>{
  
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
