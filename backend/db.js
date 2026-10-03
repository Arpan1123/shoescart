const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Render's PostgreSQL
  },
});

// Test the connection
pool.query("SELECT NOW()")
  .then(() => console.log("✅ Connected to PostgreSQL database"))
  .catch((err) => console.error("❌ Database connection error:", err.message));

module.exports = pool;
