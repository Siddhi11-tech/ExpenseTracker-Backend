console.log("ENV CHECK:", process.env.DB_HOST);


const mysql = require("mysql2");

// create connection
const connection = mysql.createConnection({
  host: "metro.proxy.rlwy.net",
  port: 28378,
  user: "root",
  password: "ZWyelxnkuFZJkYJOImCimPiWJerRGPsB",
  database: "railway"
});

// connect
connection.connect((err) => {
  if (err) {
    console.error("❌ Connection failed:", err);
    return;
  }
  console.log("✅ Connected to Railway MySQL!");
});

// test query
