import sharp from 'sharp';

const input = 'C:/Users/Fine-PC081/.gemini/antigravity/brain/66364a82-d9ba-4eaa-8a72-2084c07d2981/.user_uploaded/media_1791523839528.png';

async function main() {
  const { data, info } = await sharp(input)
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Let's check card 1 (x: 20 to 180, y: 195 to 230)
  // Find where non-white pixels start for each x in card 1
  for (let x = 30; x <= 170; x += 20) {
    for (let y = 195; y <= 230; y++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // if not near white (background)
      if (r < 240 || g < 240 || b < 240) {
        console.log(`x=${x}, top_y=${y}, rgb=(${r},${g},${b})`);
        break;
      }
    }
  }

  console.log('--- Card 2 ---');
  for (let x = 190; x <= 330; x += 20) {
    for (let y = 195; y <= 230; y++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (r < 240 || g < 240 || b < 240) {
        console.log(`x=${x}, top_y=${y}, rgb=(${r},${g},${b})`);
        break;
      }
    }
  }
}

main();
