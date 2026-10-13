import sharp from 'sharp';

const input = 'C:/Users/Fine-PC081/.gemini/antigravity/brain/66364a82-d9ba-4eaa-8a72-2084c07d2981/.user_uploaded/media_1791523839528.png';

async function main() {
  // Let's inspect the bounding box of card 1 in original mockup
  // Card 1 top-left vs top-right corner
  const img = sharp(input);
  const { width, height } = await img.metadata();
  console.log('Mockup size:', width, height);
}

main();
