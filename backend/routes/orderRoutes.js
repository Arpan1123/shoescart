const express = require("express");
const router = express.Router();
const pool = require("../db");
const auth = require("../middleware/auth");

// POST /api/orders — Place a new order (protected)
router.post("/", auth, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    const userId = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must have at least one item." });
    }

    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address is required." });
    }

    // Calculate total
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create the order
    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, total, shipping_address, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, Math.round(total * 100) / 100, shippingAddress, "confirmed"]
    );

    const order = orderResult.rows[0];

    // Insert order items
    for (const item of items) {
      await pool.query(
        `INSERT INTO order_items (order_id, shoe_id, name, brand, price, size, color, quantity, image)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [order.id, item.id, item.name, item.brand, item.price, item.size, item.color, item.quantity, item.image]
      );
    }

    // Clear the user's cart after placing the order
    await pool.query("DELETE FROM cart_items");

    // Fetch the complete order with items
    const orderItems = await pool.query(
      "SELECT * FROM order_items WHERE order_id = $1",
      [order.id]
    );

    res.status(201).json({
      message: "Order placed successfully!",
      order: {
        id: order.id,
        userId: order.user_id,
        total: parseFloat(order.total),
        status: order.status,
        shippingAddress: order.shipping_address,
        createdAt: order.created_at,
        items: orderItems.rows.map(item => ({
          id: item.id,
          shoeId: item.shoe_id,
          name: item.name,
          brand: item.brand,
          price: parseFloat(item.price),
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          image: item.image,
        })),
      },
    });
  } catch (err) {
    console.error("Order creation error:", err.message);
    res.status(500).json({ message: "Server error while placing order." });
  }
});

// GET /api/orders — Get all orders for the logged-in user (protected)
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const ordersResult = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    const orders = [];

    for (const order of ordersResult.rows) {
      const itemsResult = await pool.query(
        "SELECT * FROM order_items WHERE order_id = $1",
        [order.id]
      );

      orders.push({
        id: order.id,
        total: parseFloat(order.total),
        status: order.status,
        shippingAddress: order.shipping_address,
        createdAt: order.created_at,
        items: itemsResult.rows.map(item => ({
          id: item.id,
          shoeId: item.shoe_id,
          name: item.name,
          brand: item.brand,
          price: parseFloat(item.price),
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          image: item.image,
        })),
      });
    }

    res.json({ count: orders.length, orders });
  } catch (err) {
    console.error("Fetch orders error:", err.message);
    res.status(500).json({ message: "Server error while fetching orders." });
  }
});

// GET /api/orders/:id — Get a specific order by ID (protected)
router.get("/:id", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const orderResult = await pool.query(
      "SELECT * FROM orders WHERE id = $1 AND user_id = $2",
      [req.params.id, userId]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: "Order not found." });
    }

    const order = orderResult.rows[0];

    const itemsResult = await pool.query(
      "SELECT * FROM order_items WHERE order_id = $1",
      [order.id]
    );

    res.json({
      id: order.id,
      total: parseFloat(order.total),
      status: order.status,
      shippingAddress: order.shipping_address,
      createdAt: order.created_at,
      items: itemsResult.rows.map(item => ({
        id: item.id,
        shoeId: item.shoe_id,
        name: item.name,
        brand: item.brand,
        price: parseFloat(item.price),
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        image: item.image,
      })),
    });
  } catch (err) {
    console.error("Fetch order error:", err.message);
    res.status(500).json({ message: "Server error while fetching order." });
  }
});

module.exports = router;
