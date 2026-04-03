const express = require("express");
const router = express.Router();
const shoes = require("../data/shoes");

// GET all shoes
router.get("/", (req, res) => {
  const { category, brand, gender, minPrice, maxPrice, search, sort } = req.query;
  let result = [...shoes];

  if (category) result = result.filter(s => s.category.toLowerCase() === category.toLowerCase());
  if (brand) result = result.filter(s => s.brand.toLowerCase() === brand.toLowerCase());
  if (gender) result = result.filter(s => s.gender.toLowerCase() === gender.toLowerCase() || s.gender === "Unisex");
  if (minPrice) result = result.filter(s => s.price >= Number(minPrice));
  if (maxPrice) result = result.filter(s => s.price <= Number(maxPrice));
  if (search) result = result.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.brand.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "price_asc") result.sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") result.sort((a, b) => b.price - a.price);
  else if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
  else if (sort === "newest") result.sort((a, b) => b.id - a.id);

  res.json({ count: result.length, shoes: result });
});

// GET featured shoes
router.get("/featured", (req, res) => {
  const featured = shoes.filter(s => s.featured);
  res.json({ count: featured.length, shoes: featured });
});

// GET shoe by ID
router.get("/:id", (req, res) => {
  const shoe = shoes.find(s => s.id === Number(req.params.id));
  if (!shoe) return res.status(404).json({ message: "Shoe not found" });
  res.json(shoe);
});

// GET unique brands
router.get("/filters/brands", (req, res) => {
  const brands = [...new Set(shoes.map(s => s.brand))];
  res.json(brands);
});

// GET unique categories
router.get("/filters/categories", (req, res) => {
  const categories = [...new Set(shoes.map(s => s.category))];
  res.json(categories);
});

module.exports = router;
