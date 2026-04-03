const express = require("express");
const router = express.Router();

// In-memory cart storage
let cart = [];

// GET cart items
router.get("/", (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ items: cart, total: Math.round(total * 100) / 100, count: cart.length });
});

// POST add to cart
router.post("/add", (req, res) => {
  const { id, name, brand, price, image, size, color, quantity = 1 } = req.body;
  const existing = cart.find(item => item.id === id && item.size === size && item.color === color);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id, name, brand, price, image, size, color, quantity });
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ message: "Added to cart", items: cart, total: Math.round(total * 100) / 100, count: cart.length });
});

// PUT update quantity
router.put("/update/:id", (req, res) => {
  const { size, color, quantity } = req.body;
  const item = cart.find(i => i.id === Number(req.params.id) && i.size === size && i.color === color);

  if (!item) return res.status(404).json({ message: "Item not found in cart" });

  if (quantity <= 0) {
    cart = cart.filter(i => !(i.id === Number(req.params.id) && i.size === size && i.color === color));
  } else {
    item.quantity = quantity;
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  res.json({ message: "Cart updated", items: cart, total: Math.round(total * 100) / 100, count: cart.length });
});

// DELETE remove from cart
router.delete("/remove/:id", (req, res) => {
  const { size, color } = req.body;
  cart = cart.filter(i => !(i.id === Number(req.params.id) && i.size === size && i.color === color));

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  res.json({ message: "Removed from cart", items: cart, total: Math.round(total * 100) / 100, count: cart.length });
});

// DELETE clear cart
router.delete("/clear", (req, res) => {
  cart = [];
  res.json({ message: "Cart cleared", items: [], total: 0, count: 0 });
});

module.exports = router;
