import sharp from 'sharp';

const input = 'C:/Users/Fine-PC081/.gemini/antigravity/brain/66364a82-d9ba-4eaa-8a72-2084c07d2981/.user_uploaded/media_1791523839528.png';

async function main() {
  const { data, info } = await sharp(input)
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log('--- Card 1 bottom ---');
  for (let x = 50; x <= 170; x += 30) {
    for (let y = 415; y >= 380; y--) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (r < 240 || g < 240 || b < 240) {
        console.log(`x=${x}, bottom_y=${y}, rgb=(${r},${g},${b})`);
        break;
      }
    }
  }

  console.log('--- Card 2 bottom ---');
  for (let x = 210; x <= 330; x += 30) {
    for (let y = 415; y >= 380; y--) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (r < 240 || g < 240 || b < 240) {
        console.log(`x=${x}, bottom_y=${y}, rgb=(${r},${g},${b})`);
        break;
      }
    }
  }
}

main();
