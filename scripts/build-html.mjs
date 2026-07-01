import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';
import { replaceIcons } from './icons.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcPages = join(root, 'src', 'pages');

const config = JSON.parse(readFileSync(join(root, 'site.config.json'), 'utf8'));
const pagesMeta = JSON.parse(readFileSync(join(__dirname, 'pages.json'), 'utf8'));

const waDefault = encodeURIComponent(config.whatsappDefaultText);
const waNewsletter = encodeURIComponent(config.whatsappNewsletterText);

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function pageUrl(relPath) {
  const normalized = relPath.replace(/\\/g, '/');
  if (normalized === 'index.html') return `${config.siteUrl}/`;
  return `${config.siteUrl}/${normalized}`;
}

function getOgImage(relPath, meta) {
  if (meta.ogType === 'article') {
    const slug = relPath.replace(/^blog[/\\]/, '').replace(/\.html$/, '');
    const ogPath = join(root, 'assets', 'og', `${slug}.png`);
    if (existsSync(ogPath)) {
      return `${config.siteUrl}/assets/og/${slug}.png`;
    }
  }
  return `${config.siteUrl}/assets/og-image.png`;
}

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

function buildJsonLd(relPath, meta, pageUrlValue, ogImage) {
  const scripts = [];

  if (relPath.replace(/\\/g, '/') === 'index.html') {
    scripts.push({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'HighTech Women',
      url: config.siteUrl,
      description: meta.description,
      image: ogImage,
      areaServed: 'BR',
      serviceType: 'Mentoria de carreira e posicionamento para mulheres em tecnologia',
      founder: { '@type': 'Person', name: 'Pachi' },
    });
  }

  if (meta.ogType === 'article' && meta.datePublished) {
    scripts.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: meta.ogTitle || meta.title,
      description: meta.ogDescription || meta.description,
      image: ogImage,
      datePublished: meta.datePublished,
      dateModified: meta.dateModified || meta.datePublished,
      author: {
        '@type': 'Person',
        name: meta.author || 'Pachi',
      },
      publisher: {
        '@type': 'Organization',
        name: 'HighTech Women',
        logo: {
          '@type': 'ImageObject',
          url: `${config.siteUrl}/assets/og-image.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrlValue,
      },
    });
  }

  if (!scripts.length) return '';
  return scripts
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n  ');
}

function buildArticleMeta(meta) {
  if (meta.ogType !== 'article' || !meta.datePublished) return '';
  return `<meta property="article:published_time" content="${meta.datePublished}">`;
}

function formatDateShort(isoDate) {
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const [year, month, day] = isoDate.split('-');
  return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
}

function buildRelatedPosts(relPath) {
  const normalized = relPath.replace(/\\/g, '/');
  if (!normalized.startsWith('blog/') || normalized === 'blog/index.html') return '';

  const articles = Object.entries(pagesMeta)
    .filter(([path, meta]) => meta.ogType === 'article' && path !== normalized)
    .sort((a, b) => (b[1].datePublished || '').localeCompare(a[1].datePublished || ''))
    .slice(0, 2);

  if (!articles.length) return '';

  return articles
    .map(([path, meta]) => {
      const slug = path.replace(/^blog\//, '');
      const title = meta.ogTitle || meta.title.replace(/ — Blog.*$/, '');
      const category = meta.category || '';
      const date = meta.datePublished ? formatDateShort(meta.datePublished) : '';

      return `<article class="group flex flex-col rounded-2xl border border-tech-purple-light/60 bg-tech-purple-dark/40 overflow-hidden transition-all duration-300 hover:border-tech-gold/50 hover:shadow-[0_0_25px_rgba(212,160,136,0.06)]">
  <div class="p-6 flex flex-col flex-grow">
    <div class="flex items-center justify-between gap-3 mb-4">
      <span class="font-mono text-[10px] text-tech-gold border border-tech-gold/30 px-2 py-0.5 rounded uppercase tracking-widest">${category}</span>
      <time datetime="${meta.datePublished}" class="text-xs font-mono text-tech-text-muted">${date}</time>
    </div>
    <h3 class="font-display font-bold text-lg text-white mb-3 group-hover:text-tech-gold transition-colors leading-snug">
      <a href="${slug}">${title}</a>
    </h3>
    <p class="text-sm text-tech-text-muted leading-relaxed flex-grow">${meta.description}</p>
    <a href="${slug}" class="inline-flex items-center text-sm font-semibold text-tech-gold mt-4 group-hover:translate-x-1 transition-transform">
      Ler artigo <i class="fa-solid fa-arrow-right ml-2 text-xs"></i>
    </a>
  </div>
</article>`;
    })
    .join('\n');
}

function resolveIncludes(content, depth = 0) {
  if (depth > 10) throw new Error('Include depth exceeded');
  return content.replace(/<!-- @include ([^\s]+) -->/g, (_, partialPath) => {
    const fullPath = join(root, partialPath);
    const partial = readFileSync(fullPath, 'utf8');
    return resolveIncludes(partial, depth + 1);
  });
}

function applyTokens(content, meta, relPath) {
  const cssPrefix = meta.cssPrefix || '';
  const ogTitle = meta.ogTitle || meta.title;
  const ogDescription = meta.ogDescription || meta.description;
  const pageUrlValue = pageUrl(relPath);
  const ogImage = getOgImage(relPath, meta);
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
    .replace(/@PAGE_URL@/g, pageUrlValue)
    .replace(/@GA4_SCRIPT@/g, buildGa4Script())
    .replace(/@TITLE@/g, meta.title)
    .replace(/@DESCRIPTION@/g, meta.description)
    .replace(/@OG_TYPE@/g, meta.ogType || 'website')
    .replace(/@OG_TITLE@/g, ogTitle)
    .replace(/@OG_DESCRIPTION@/g, ogDescription)
    .replace(/@OG_IMAGE@/g, ogImage)
    .replace(/@ARTICLE_META@/g, buildArticleMeta(meta))
    .replace(/@JSONLD@/g, buildJsonLd(relPath, meta, pageUrlValue, ogImage))
    .replace(/@CSS_PREFIX@/g, cssPrefix)
    .replace(/@WA_URL@/g, waUrl)
    .replace(/@WA_NEWSLETTER_URL@/g, waNewsletterUrl)
    .replace(/@RELATED_POSTS@/g, buildRelatedPosts(relPath))
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

function buildSitemap(pages) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map(({ relPath, meta }) => {
      const loc = pageUrl(relPath);
      const lastmod = meta.dateModified || meta.datePublished || today;
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRss(articles) {
  const items = articles
    .sort((a, b) => (b.meta.datePublished || '').localeCompare(a.meta.datePublished || ''))
    .map(({ relPath, meta }) => {
      const link = pageUrl(relPath);
      const pubDate = new Date(meta.datePublished).toUTCString();
      return `    <item>\n      <title>${escapeXml(meta.ogTitle || meta.title)}</title>\n      <link>${escapeXml(link)}</link>\n      <guid isPermaLink="true">${escapeXml(link)}</guid>\n      <description>${escapeXml(meta.description)}</description>\n      <pubDate>${pubDate}</pubDate>\n    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Blog HighTech Women</title>\n    <link>${escapeXml(config.siteUrl)}/blog/</link>\n    <description>Artigos sobre carreira, posicionamento e liderança para mulheres em tecnologia.</description>\n    <language>pt-BR</language>\n${items}\n  </channel>\n</rss>\n`;
}

const htmlFiles = walkHtmlFiles(srcPages);
const builtPages = [];

for (const srcFile of htmlFiles) {
  const relPath = relative(srcPages, srcFile).replace(/\\/g, '/');
  const meta = pagesMeta[relPath];
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
  content = applyTokens(content, pageMeta, relPath);
  content = replaceIcons(content);

  const outFile = join(root, relPath);
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, content, 'utf8');
  builtPages.push({ relPath, meta: pageMeta });
  console.log(`Built ${relPath}`);
}

writeFileSync(join(root, 'sitemap.xml'), buildSitemap(builtPages), 'utf8');
console.log('Built sitemap.xml');

const articles = builtPages.filter((p) => p.meta.ogType === 'article');
writeFileSync(join(root, 'feed.xml'), buildRss(articles), 'utf8');
console.log('Built feed.xml');

const jsAssets = ['assets/conquistas.js'];
for (const jsFile of jsAssets) {
  const jsPath = join(root, jsFile);
  let js = readFileSync(jsPath, 'utf8');
  js = replaceIcons(js);
  writeFileSync(jsPath, js, 'utf8');
  console.log(`Processed icons in ${jsFile}`);
}

console.log('HTML build complete.');
