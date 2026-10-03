const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET cart items
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cart_items ORDER BY created_at DESC");
    const items = result.rows.map(row => ({
      id: row.shoe_id,
      name: row.name,
      brand: row.brand,
      price: parseFloat(row.price),
      image: row.image,
      size: row.size,
      color: row.color,
      quantity: row.quantity,
    }));
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.json({ items, total: Math.round(total * 100) / 100, count: items.length });
  } catch (err) {
    console.error("Error fetching cart:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST add to cart
router.post("/add", async (req, res) => {
  try {
    const { id, name, brand, price, image, size, color, quantity = 1 } = req.body;

    // Check if item already exists in cart
    const existing = await pool.query(
      "SELECT * FROM cart_items WHERE shoe_id = $1 AND size = $2 AND color = $3",
      [id, size, color]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        "UPDATE cart_items SET quantity = quantity + $1 WHERE shoe_id = $2 AND size = $3 AND color = $4",
        [quantity, id, size, color]
      );
    } else {
      await pool.query(
        "INSERT INTO cart_items (shoe_id, name, brand, price, image, size, color, quantity) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
        [id, name, brand, price, image, size, color, quantity]
      );
    }

    // Return updated cart
    const cart = await pool.query("SELECT * FROM cart_items ORDER BY created_at DESC");
    const items = cart.rows.map(row => ({
      id: row.shoe_id,
      name: row.name,
      brand: row.brand,
      price: parseFloat(row.price),
      image: row.image,
      size: row.size,
      color: row.color,
      quantity: row.quantity,
    }));
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.json({ message: "Added to cart", items, total: Math.round(total * 100) / 100, count: items.length });
  } catch (err) {
    console.error("Error adding to cart:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT update quantity
router.put("/update/:id", async (req, res) => {
  try {
    const { size, color, quantity } = req.body;

    if (quantity <= 0) {
      await pool.query(
        "DELETE FROM cart_items WHERE shoe_id = $1 AND size = $2 AND color = $3",
        [req.params.id, size, color]
      );
    } else {
      await pool.query(
        "UPDATE cart_items SET quantity = $1 WHERE shoe_id = $2 AND size = $3 AND color = $4",
        [quantity, req.params.id, size, color]
      );
    }

    const cart = await pool.query("SELECT * FROM cart_items ORDER BY created_at DESC");
    const items = cart.rows.map(row => ({
      id: row.shoe_id,
      name: row.name,
      brand: row.brand,
      price: parseFloat(row.price),
      image: row.image,
      size: row.size,
      color: row.color,
      quantity: row.quantity,
    }));
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.json({ message: "Cart updated", items, total: Math.round(total * 100) / 100, count: items.length });
  } catch (err) {
    console.error("Error updating cart:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE remove from cart
router.delete("/remove/:id", async (req, res) => {
  try {
    const { size, color } = req.body;
    await pool.query(
      "DELETE FROM cart_items WHERE shoe_id = $1 AND size = $2 AND color = $3",
      [req.params.id, size, color]
    );

    const cart = await pool.query("SELECT * FROM cart_items ORDER BY created_at DESC");
    const items = cart.rows.map(row => ({
      id: row.shoe_id,
      name: row.name,
      brand: row.brand,
      price: parseFloat(row.price),
      image: row.image,
      size: row.size,
      color: row.color,
      quantity: row.quantity,
    }));
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.json({ message: "Removed from cart", items, total: Math.round(total * 100) / 100, count: items.length });
  } catch (err) {
    console.error("Error removing from cart:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE clear cart
router.delete("/clear", async (req, res) => {
  try {
    await pool.query("DELETE FROM cart_items");
    res.json({ message: "Cart cleared", items: [], total: 0, count: 0 });
  } catch (err) {
    console.error("Error clearing cart:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
