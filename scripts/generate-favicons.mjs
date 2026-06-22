import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const sourceLogo = path.join(rootDir, 'src/assets/logos/ananta-one.png');
const publicDir = path.join(rootDir, 'public');
const brandDark = '#0a0a1b';

async function createSquareIcon(size, logoScale = 0.72) {
  const logoSize = Math.round(size * logoScale);
  const logoBuffer = await sharp(sourceLogo)
    .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const offset = Math.round((size - logoSize) / 2);

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: brandDark,
    },
  })
    .composite([{ input: logoBuffer, left: offset, top: offset }])
    .png()
    .toBuffer();
}

async function main() {
  await mkdir(publicDir, { recursive: true });

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'favicon-192x192.png', size: 192 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon.png', size: 48 },
    { name: 'og-image.png', size: 512, scale: 0.62 },
  ];

  const icoBuffers = [];

  for (const { name, size, scale = 0.72 } of sizes) {
    const buffer = await createSquareIcon(size, scale);
    await writeFile(path.join(publicDir, name), buffer);

    if ([16, 32, 48].includes(size)) {
      icoBuffers.push(buffer);
    }
  }

  const ico = await pngToIco(icoBuffers);
  await writeFile(path.join(publicDir, 'favicon.ico'), ico);

  console.log('Generated favicons in public/');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
