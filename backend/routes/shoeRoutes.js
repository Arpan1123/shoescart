const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all shoes (with filters)
router.get("/", async (req, res) => {
  try {
    const { category, brand, gender, minPrice, maxPrice, search, sort } = req.query;
    
    let query = "SELECT * FROM shoes WHERE 1=1";
    const params = [];
    let paramIndex = 1;

    if (category) {
      query += ` AND LOWER(category) = LOWER($${paramIndex++})`;
      params.push(category);
    }
    if (brand) {
      query += ` AND LOWER(brand) = LOWER($${paramIndex++})`;
      params.push(brand);
    }
    if (gender) {
      query += ` AND (LOWER(gender) = LOWER($${paramIndex++}) OR gender = 'Unisex')`;
      params.push(gender);
    }
    if (minPrice) {
      query += ` AND price >= $${paramIndex++}`;
      params.push(Number(minPrice));
    }
    if (maxPrice) {
      query += ` AND price <= $${paramIndex++}`;
      params.push(Number(maxPrice));
    }
    if (search) {
      query += ` AND (LOWER(name) LIKE $${paramIndex} OR LOWER(brand) LIKE $${paramIndex})`;
      params.push(`%${search.toLowerCase()}%`);
      paramIndex++;
    }

    // Sorting
    if (sort === "price_asc") query += " ORDER BY price ASC";
    else if (sort === "price_desc") query += " ORDER BY price DESC";
    else if (sort === "rating") query += " ORDER BY rating DESC";
    else if (sort === "newest") query += " ORDER BY id DESC";

    const result = await pool.query(query, params);

    // Map column names to match frontend expectations (snake_case → camelCase)
    const shoes = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      brand: row.brand,
      price: parseFloat(row.price),
      originalPrice: parseFloat(row.original_price),
      image: row.image,
      images: row.images,
      category: row.category,
      gender: row.gender,
      rating: parseFloat(row.rating),
      reviews: row.reviews,
      description: row.description,
      sizes: row.sizes,
      colors: row.colors,
      inStock: row.in_stock,
      featured: row.featured,
      tag: row.tag,
    }));

    res.json({ count: shoes.length, shoes });
  } catch (err) {
    console.error("Error fetching shoes:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET featured shoes
router.get("/featured", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM shoes WHERE featured = true");
    const shoes = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      brand: row.brand,
      price: parseFloat(row.price),
      originalPrice: parseFloat(row.original_price),
      image: row.image,
      images: row.images,
      category: row.category,
      gender: row.gender,
      rating: parseFloat(row.rating),
      reviews: row.reviews,
      description: row.description,
      sizes: row.sizes,
      colors: row.colors,
      inStock: row.in_stock,
      featured: row.featured,
      tag: row.tag,
    }));
    res.json({ count: shoes.length, shoes });
  } catch (err) {
    console.error("Error fetching featured shoes:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET shoe by ID
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM shoes WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Shoe not found" });
    const row = result.rows[0];
    res.json({
      id: row.id,
      name: row.name,
      brand: row.brand,
      price: parseFloat(row.price),
      originalPrice: parseFloat(row.original_price),
      image: row.image,
      images: row.images,
      category: row.category,
      gender: row.gender,
      rating: parseFloat(row.rating),
      reviews: row.reviews,
      description: row.description,
      sizes: row.sizes,
      colors: row.colors,
      inStock: row.in_stock,
      featured: row.featured,
      tag: row.tag,
    });
  } catch (err) {
    console.error("Error fetching shoe:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET unique brands
router.get("/filters/brands", async (req, res) => {
  try {
    const result = await pool.query("SELECT DISTINCT brand FROM shoes ORDER BY brand");
    res.json(result.rows.map(r => r.brand));
  } catch (err) {
    console.error("Error fetching brands:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET unique categories
router.get("/filters/categories", async (req, res) => {
  try {
    const result = await pool.query("SELECT DISTINCT category FROM shoes ORDER BY category");
    res.json(result.rows.map(r => r.category));
  } catch (err) {
    console.error("Error fetching categories:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
