console.log("ENV FILE TEST:", process.env.DB_HOST);
require("dotenv").config();
console.log("AFTER DOTENV:", process.env.DB_HOST);

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Connection failed:", err);
  } else {
    console.log("✅ Connected to Railway MySQL!");
  }
});

module.exports = connection;