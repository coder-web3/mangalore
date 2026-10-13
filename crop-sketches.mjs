import sharp from 'sharp';

const input = 'C:/Users/Fine-PC081/.gemini/antigravity/brain/66364a82-d9ba-4eaa-8a72-2084c07d2981/.user_uploaded/media_1791523839528.png';

async function main() {
  // Extract left palm sketch
  await sharp(input)
    .extract({ left: 0, top: 0, width: 170, height: 190 })
    .toFile('public/bg-sketch-left.png');

  // Extract right lighthouse sketch
  await sharp(input)
    .extract({ left: 860, top: 0, width: 164, height: 190 })
    .toFile('public/bg-sketch-right.png');

  console.log('Sketches saved!');
}

main();
