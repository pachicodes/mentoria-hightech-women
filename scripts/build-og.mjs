import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const pagesMeta = JSON.parse(readFileSync(join(__dirname, 'pages.json'), 'utf8'));
const ogDir = join(root, 'assets', 'og');

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapTitle(title, maxChars = 32) {
  const words = title.split(/\s+/);
  const lines = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function buildOgSvg(title, subtitle = 'Blog HighTech Women') {
  const lines = wrapTitle(title);
  const titleY = lines.length === 1 ? 300 : lines.length === 2 ? 280 : 260;
  const titleTspans = lines
    .map((line, i) => `<tspan x="600" dy="${i === 0 ? 0 : 52}">${escapeXml(line)}</tspan>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D4A088" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1E1A2E"/>
      <stop offset="50%" style="stop-color:#252038"/>
      <stop offset="100%" style="stop-color:#3D3658"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <circle cx="200" cy="500" r="250" fill="#3D3658" fill-opacity="0.3"/>
  <circle cx="1000" cy="130" r="200" fill="#D4A088" fill-opacity="0.08"/>
  <rect x="80" y="80" width="56" height="56" rx="12" fill="#3D3658" stroke="#D4A088" stroke-opacity="0.5" stroke-width="2"/>
  <text x="108" y="118" font-family="monospace" font-size="28" font-weight="bold" fill="#D4A088" text-anchor="middle">&lt;/&gt;</text>
  <text x="600" y="${titleY}" font-family="Montserrat, Arial, sans-serif" font-size="48" font-weight="800" fill="#F5F3F0" text-anchor="middle">${titleTspans}</text>
  <text x="600" y="420" font-family="Inter, Arial, sans-serif" font-size="26" fill="#D4A088" text-anchor="middle">${escapeXml(subtitle)}</text>
  <line x1="460" y1="460" x2="740" y2="460" stroke="#D4A088" stroke-width="3" stroke-opacity="0.6"/>
</svg>`;
}

function renderPng(svg, outPath) {
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  writeFileSync(outPath, resvg.render().asPng());
}

mkdirSync(ogDir, { recursive: true });

const defaultSvg = readFileSync(join(root, 'assets', 'og-image.svg'), 'utf8');
renderPng(defaultSvg, join(root, 'assets', 'og-image.png'));
console.log('Built assets/og-image.png');

for (const [relPath, meta] of Object.entries(pagesMeta)) {
  if (meta.ogType !== 'article') continue;
  const slug = relPath.replace(/^blog\//, '').replace(/\.html$/, '');
  const title = meta.ogTitle || meta.title.replace(/ — Blog.*$/, '');
  const svg = buildOgSvg(title);
  renderPng(svg, join(ogDir, `${slug}.png`));
  console.log(`Built assets/og/${slug}.png`);
}
