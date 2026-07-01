import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const input = join(root, 'assets', 'mentor.jpg');
const output = join(root, 'assets', 'mentor.webp');

const info = await sharp(input)
  .resize(760, 950, { fit: 'cover', position: 'centre' })
  .webp({ quality: 82 })
  .toFile(output);

console.log(`Built assets/mentor.webp (${info.width}x${info.height}, ${Math.round(info.size / 1024)}KB)`);
