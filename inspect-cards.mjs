import sharp from 'sharp';

const input = 'C:/Users/Fine-PC081/.gemini/antigravity/brain/66364a82-d9ba-4eaa-8a72-2084c07d2981/.user_uploaded/media_1791523839528.png';

async function main() {
  // Let's crop just card 1 and card 2 area from the original mockup
  await sharp(input)
    .extract({ left: 20, top: 195, width: 340, height: 215 })
    .toFile('public/inspect-cards-1-2.png');
  console.log('Saved inspect-cards-1-2.png');
}

main();
