import { readdir, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceFolder = path.resolve('backend/vinyl-images');
const outputFolder = path.resolve('src/assets/vinyls');

await mkdir(outputFolder, { recursive: true });

const files = await readdir(sourceFolder, { withFileTypes: true });
const sources = files.filter((entry) => entry.isFile()).map((entry) => entry.name);
const placeholderSource = sources.find((name) => path.parse(name).name === 'vinyl-one');

if (placeholderSource) sources.push(`${placeholderSource}\0placeholder`);

for (const sourceEntry of sources) {
  const [sourceName, outputAlias] = sourceEntry.split('\0');
  const sourcePath = path.join(sourceFolder, sourceName);
  const outputName = `${outputAlias ?? path.parse(sourceName).name}.webp`;

  try {
    const input = await readFile(sourcePath);
    const trimmed = await sharp(input).trim().toBuffer();
    let output;
    let finalQuality = 70;

    for (const quality of [85, 80, 75, 70]) {
      output = await sharp(trimmed)
        .resize(1200, 675, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .webp({ quality })
        .toBuffer();
      finalQuality = quality;
      if (output.length < 200 * 1024) break;
    }

    await writeFile(path.join(outputFolder, outputName), output);
    console.log(`${outputName}, ${finalQuality}, ${(output.length / 1024).toFixed(1)} KB`);
  } catch (error) {
    console.log(`${sourceName}: skipped, could not read image (${error.message})`);
  }
}
