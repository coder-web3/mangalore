import sharp from 'sharp';

const input = 'C:/Users/Fine-PC081/.gemini/antigravity/brain/66364a82-d9ba-4eaa-8a72-2084c07d2981/.user_uploaded/media_1791523839528.png';

async function main() {
  // Card dimensions in the 1024x426 mockup:
  // Card 1: left: 23, top: 205, width: 153, height: 195
  // Card 2: left: 184, top: 215, width: 152, height: 182
  // Card 3: left: 344, top: 215, width: 152, height: 182
  // Card 4: left: 504, top: 215, width: 152, height: 182
  // Card 5: left: 664, top: 215, width: 152, height: 182
  // Card 6: left: 824, top: 215, width: 152, height: 182

  const cards = [
    { name: 'panambur-photo.jpg', left: 25, top: 207, width: 149, height: 125 },
    { name: 'tannirbhavi-photo.jpg', left: 185, top: 216, width: 150, height: 120 },
    { name: 'someshwar-photo.jpg', left: 345, top: 216, width: 150, height: 120 },
    { name: 'sultan-photo.jpg', left: 505, top: 216, width: 150, height: 120 },
    { name: 'pilikula-photo.jpg', left: 665, top: 216, width: 150, height: 120 },
    { name: 'kadri-photo.jpg', left: 825, top: 216, width: 150, height: 120 },
  ];

  for (const c of cards) {
    // Resize each to crisp 2x resolution so they look ultra-sharp on retina displays
    await sharp(input)
      .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
      .resize(400, 320, { fit: 'cover' })
      .toFile(`public/${c.name}`);
    console.log('Saved photo:', c.name);
  }
}

main();
