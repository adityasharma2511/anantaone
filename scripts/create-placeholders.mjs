import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const pngBase64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

const pngBuffer = Buffer.from(pngBase64, 'base64');

const files = [
  'src/assets/logos/ananta-logo.png',
  'src/assets/images/collection-tree.png',
  'src/assets/images/store-radar.png',
];

for (const file of files) {
  const fullPath = join(root, file);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, pngBuffer);
}

console.log('PNG placeholders created');
