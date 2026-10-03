const pool = require("./db");
const shoes = require("./data/shoes");

const seedShoes = async () => {
  try {
    // Clear existing data (cart first due to foreign key)
    await pool.query("DELETE FROM cart_items");
    await pool.query("DELETE FROM shoes");

    let seeded = 0;

    for (const shoe of shoes) {
      await pool.query(
        `INSERT INTO shoes 
         (id, name, brand, price, original_price, image, images, category, gender, rating, reviews, description, sizes, colors, in_stock, featured, tag)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
        [
          shoe.id,
          shoe.name,
          shoe.brand,
          shoe.price,
          shoe.originalPrice,
          shoe.image,
          shoe.images,
          shoe.category,
          shoe.gender,
          shoe.rating,
          shoe.reviews,
          shoe.description,
          shoe.sizes,
          shoe.colors,
          shoe.inStock,
          shoe.featured,
          shoe.tag,
        ]
      );
      seeded++;
    }

    // Reset the auto-increment sequence to be after our max id
    await pool.query("SELECT setval('shoes_id_seq', (SELECT MAX(id) FROM shoes))");

    console.log(`✅ Seeded ${seeded} shoes into the database`);
  } catch (err) {
    console.error("❌ Error seeding data:", err.message);
  } finally {
    await pool.end();
  }
};

seedShoes();
