const pool = require("./db");

const createTables = async () => {
  try {
    // Create shoes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS shoes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        original_price DECIMAL(10,2),
        image TEXT,
        images TEXT[],
        category VARCHAR(100),
        gender VARCHAR(50),
        rating DECIMAL(2,1),
        reviews INTEGER DEFAULT 0,
        description TEXT,
        sizes INTEGER[],
        colors TEXT[],
        in_stock BOOLEAN DEFAULT true,
        featured BOOLEAN DEFAULT false,
        tag VARCHAR(100)
      );
    `);
    console.log("✅ shoes table created");

    // Create cart table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        shoe_id INTEGER REFERENCES shoes(id),
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(100),
        price DECIMAL(10,2) NOT NULL,
        image TEXT,
        size INTEGER,
        color VARCHAR(100),
        quantity INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("✅ cart_items table created");

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("✅ users table created");

    // Create orders table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        total DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'confirmed',
        shipping_address TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("✅ orders table created");

    // Create order_items table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        shoe_id INTEGER REFERENCES shoes(id),
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(100),
        price DECIMAL(10,2) NOT NULL,
        size INTEGER,
        color VARCHAR(100),
        quantity INTEGER DEFAULT 1,
        image TEXT
      );
    `);
    console.log("✅ order_items table created");

    console.log("\n🎉 All tables created successfully!");
  } catch (err) {
    console.error("❌ Error creating tables:", err.message);
  } finally {
    await pool.end();
  }
};

createTables();
