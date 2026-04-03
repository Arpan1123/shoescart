const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const shoeRoutes = require("./routes/shoeRoutes");
const cartRoutes = require("./routes/cartRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/shoes", shoeRoutes);
app.use("/api/cart", cartRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "ShoesCart API is running 🏃‍♂️👟" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
