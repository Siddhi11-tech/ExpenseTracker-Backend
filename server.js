require("dotenv").config();

const express = require("express");
const cors = require("cors");
require("./config/db"); // Import DB connection

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 API Running on Railway!");
});

// Use Railway's assigned port
const PORT = process.env.PORT || 5000;
console.log("ENV CHECK:", process.env.DB_HOST);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});