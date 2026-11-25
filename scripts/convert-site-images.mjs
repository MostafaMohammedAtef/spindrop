import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceFolder = path.resolve('src/assets');
const outputFolder = path.resolve('src/assets/optimized');
const inputFiles = [
  'artist-sol.png',
  'artist-mayaewk.png',
  'crowdfunding.png',
  'footer-img.png',
  'here-to-help.jpg',
  'image-one.png',
  'image-two.png',
  'image-three.png',
  'image-four.png',
  'image-five.png',
  'our-sponsers.png',
  'peek-icon.png',
  'press-and-sell.png',
  'vinyl-sleeve.jpg',
  'vinyl-stack.jpg',
  'you-do-the-music-we-do-the-rest.jpg',
  'icons/headphones.png',
  'icons/music-notes.png',
  'icons/record-needle.png',
  'icons/record-sleeve.png',
];

await mkdir(outputFolder, { recursive: true });

for (const file of inputFiles) {
  const sourcePath = path.join(sourceFolder, file);
  const outputName = `${path.parse(file).name}.webp`;
  const outputPath = path.join(outputFolder, outputName);
  await sharp(sourcePath)
    .resize(800, 1200, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outputPath);
  const info = await sharp(outputPath).metadata();
  const size = await stat(outputPath);
  console.log(`${outputName} ${info.width}x${info.height} ${(size.size / 1024).toFixed(1)} KB`);
}
