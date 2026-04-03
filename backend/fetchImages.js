// fetchImages.js — run once to get real image URLs for each shoe
// Usage: node fetchImages.js YOUR_PEXELS_API_KEY
const https = require('https');

const API_KEY = process.argv[2];
if (!API_KEY) { console.error('Usage: node fetchImages.js YOUR_PEXELS_API_KEY'); process.exit(1); }

const shoes = [
  { name: 'Nike Air Max Pulse',          query: 'Nike Air Max sneaker red black' },
  { name: 'Adidas Ultraboost Light',     query: 'Adidas Ultraboost running shoe white' },
  { name: 'Puma RS-X Reinvention',       query: 'Puma RS-X chunky sneaker white' },
  { name: 'Asics Gel-Kayano 30',         query: 'Asics running shoe stability' },
  { name: 'Reebok Classic Leather',      query: 'Reebok Classic leather sneaker white' },
  { name: 'Vans Old Skool',              query: 'Vans Old Skool black white sneaker' },
  { name: 'Converse Chuck Taylor',       query: 'Converse Chuck Taylor All Star sneaker' },
  { name: 'New Balance 574',             query: 'New Balance 574 grey sneaker' },
  { name: 'Puma Suede Classic',          query: 'Puma Suede classic sneaker' },
  { name: 'Nike Air Jordan 1 Retro',     query: 'Air Jordan 1 basketball sneaker' },
  { name: 'Adidas Gazelle Bold',         query: 'Adidas Gazelle sneaker suede' },
  { name: 'Hoka Clifton 9',              query: 'Hoka running shoe cushion' },
  { name: 'Nike Dunk Low Retro',         query: 'Nike Dunk Low retro sneaker' },
  { name: 'Adidas Samba OG',             query: 'Adidas Samba OG white black gum sole' },
  { name: 'New Balance 990v6',           query: 'New Balance 990 grey suede sneaker' },
  { name: 'Puma MB03 LaMelo',            query: 'Puma basketball shoe colorful' },
  { name: 'Under Armour HOVR Phantom',   query: 'Under Armour running shoe black' },
  { name: 'Nike Air Force 1',            query: 'Nike Air Force 1 white low top sneaker' },
  { name: 'Adidas NMD R1',              query: 'Adidas NMD sneaker boost sole colorful' },
  { name: 'Reebok Nano X3',             query: 'Reebok training cross training shoe' },
];

function get(url, headers) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  const results = {};
  for (const shoe of shoes) {
    const encoded = encodeURIComponent(shoe.query);
    const url = `https://api.pexels.com/v1/search?query=${encoded}&per_page=5&orientation=landscape`;
    try {
      const data = await get(url, { Authorization: API_KEY });
      const imgs = (data.photos || []).map(p => p.src.large);
      results[shoe.name] = imgs;
      console.log(`✅ ${shoe.name}: ${imgs.length} images`);
    } catch(e) {
      console.error(`❌ ${shoe.name}:`, e.message);
      results[shoe.name] = [];
    }
    await new Promise(r => setTimeout(r, 300)); // rate limit
  }
  console.log('\n\n=== RESULTS ===');
  console.log(JSON.stringify(results, null, 2));
}

main();
