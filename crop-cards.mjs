import sharp from 'sharp';

const input = 'C:/Users/Fine-PC081/.gemini/antigravity/brain/66364a82-d9ba-4eaa-8a72-2084c07d2981/.user_uploaded/media_1791523839528.png';

async function main() {
  // Let's crop each of the 6 cards:
  // Card 1: Panambur Beach
  // Card 2: Tannirbhavi Beach
  // Card 3: Someshwar Beach
  // Card 4: Sultan Battery
  // Card 5: Pilikula Nisargadhama
  // Card 6: Kadri Manjunath Temple
  
  // Total width: 1024. Left margin ~24, right margin ~24.
  // Card width ~150-160px, gap ~12-16px.
  // Card height: ~210px (y ~ 205 to 405).

  const cards = [
    { name: 'card-panambur.jpg', left: 23, top: 205, width: 153, height: 195 },
    { name: 'card-tannirbhavi.jpg', left: 184, top: 215, width: 152, height: 182 },
    { name: 'card-someshwar.jpg', left: 344, top: 215, width: 152, height: 182 },
    { name: 'card-sultan.jpg', left: 504, top: 215, width: 152, height: 182 },
    { name: 'card-pilikula.jpg', left: 664, top: 215, width: 152, height: 182 },
    { name: 'card-kadri.jpg', left: 824, top: 215, width: 152, height: 182 },
  ];

  for (const c of cards) {
    await sharp(input)
      .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
      .toFile(`public/${c.name}`);
    console.log('Saved', c.name);
  }
}

main();
