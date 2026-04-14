require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 API Running on Railway!");
});

// Database Test Route
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS result");
    res.json({ message: "Database connected!", rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});