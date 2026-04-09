// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

// Import database connection from config/db.js
const db = require("./config/db");

// Import routes
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Prevent caching of responses
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});


// Authentication Routes

//  REGISTER
app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Encrypt password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("Registration Error:", err);
          return res.status(500).send("User already exists or DB error");
        }
        res.status(201).send("Registered Successfully");
      }
    );
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//  LOGIN
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Database Error");
      }

      if (result.length === 0) {
        return res.status(401).send("User not found");
      }

      const user = result[0];

      // Compare encrypted password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).send("Wrong password");
      }

      // Do not send password in response
      delete user.password;

      res.status(200).json(user);
    }
  );
});


// Expense Routes
app.use("/expenses", expenseRoutes);

// Budget Routes
app.use("/budget", budgetRoutes);

// user apis 

// Create User
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({
        message: "User created successfully",
        userId: result.insertId,
      });
    }
  );
});

// Get All Users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Update User
app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE users SET name=?, email=? WHERE id=?",
    [name, email, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});

// Delete User
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM users WHERE id=?",
    [id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});

// category apis

// Create Category
app.post("/categories", (req, res) => {
  const { name } = req.body;

  db.query(
    "INSERT INTO categories (name) VALUES (?)",
    [name],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});

// Get All Categories
app.get("/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Update Category
app.put("/categories/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE categories SET name=? WHERE id=?",
    [name, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});

// Delete Category
app.delete("/categories/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM categories WHERE id=?",
    [id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});

// testing api 
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});