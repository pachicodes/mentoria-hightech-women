import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcPages = join(root, 'src', 'pages');
const partialsDir = join(root, 'partials');

const config = JSON.parse(readFileSync(join(root, 'site.config.json'), 'utf8'));
const pagesMeta = JSON.parse(readFileSync(join(__dirname, 'pages.json'), 'utf8'));

const waDefault = encodeURIComponent(config.whatsappDefaultText);
const waNewsletter = encodeURIComponent(config.whatsappNewsletterText);

function buildGa4Script() {
  if (!config.ga4Id || config.ga4Id === 'G-XXXXXXXX') return '';
  return `<!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${config.ga4Id}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${config.ga4Id}');
  </script>`;
}

function resolveIncludes(content, depth = 0) {
  if (depth > 10) throw new Error('Include depth exceeded');
  return content.replace(/<!-- @include ([^\s]+) -->/g, (_, partialPath) => {
    const fullPath = join(root, partialPath);
    const partial = readFileSync(fullPath, 'utf8');
    return resolveIncludes(partial, depth + 1);
  });
}

function applyTokens(content, meta) {
  const cssPrefix = meta.cssPrefix || '';
  const ogTitle = meta.ogTitle || meta.title;
  const ogDescription = meta.ogDescription || meta.description;
  const ogImage = `${config.siteUrl}/assets/og-image.png`;
  const waUrl = `https://wa.me/${config.whatsapp}?text=${waDefault}`;
  const waNewsletterUrl = `https://wa.me/${config.whatsapp}?text=${waNewsletter}`;

  let scripts = '';
  if (meta.scripts && meta.scripts.length) {
    scripts = meta.scripts
      .map((s) => `<script src="${cssPrefix}${s}"></script>`)
      .join('\n  ');
  }

  return content
    .replace(/@SITE_URL@/g, config.siteUrl)
    .replace(/@GA4_SCRIPT@/g, buildGa4Script())
    .replace(/@TITLE@/g, meta.title)
    .replace(/@DESCRIPTION@/g, meta.description)
    .replace(/@OG_TYPE@/g, meta.ogType || 'website')
    .replace(/@OG_TITLE@/g, ogTitle)
    .replace(/@OG_DESCRIPTION@/g, ogDescription)
    .replace(/@OG_IMAGE@/g, ogImage)
    .replace(/@CSS_PREFIX@/g, cssPrefix)
    .replace(/@WA_URL@/g, waUrl)
    .replace(/@WA_NEWSLETTER_URL@/g, waNewsletterUrl)
    .replace(/@SCRIPTS@/g, scripts);
}

function walkHtmlFiles(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walkHtmlFiles(full, files);
    } else if (entry.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const htmlFiles = walkHtmlFiles(srcPages);

for (const srcFile of htmlFiles) {
  const relPath = relative(srcPages, srcFile);
  const meta = pagesMeta[relPath.replace(/\\/g, '/')];
  if (!meta) {
    console.warn(`Warning: no metadata for ${relPath}, using defaults`);
  }

  const pageMeta = meta || {
    title: 'HighTech Women',
    description: '',
    ogType: 'website',
    cssPrefix: relPath.includes('/') ? '../'.repeat(relPath.split('/').length - 1) : '',
    scripts: [],
  };

  let content = readFileSync(srcFile, 'utf8');
  content = resolveIncludes(content);
  content = applyTokens(content, pageMeta);

  const outFile = join(root, relPath);
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, content, 'utf8');
  console.log(`Built ${relPath}`);
}

console.log('HTML build complete.');
