# HighTech Women — Todo list de melhorias

Checklist das sugestões de evolução do site. Marque `[x]` conforme for concluindo.

---

## ✅ Já feito

### Base e visual
- [x] Paleta de cores mais suave
- [x] Linguagem casual e tom brasileiro (você / paulistana)
- [x] Corrigir foto da mentora (`assets/mentor.jpg`)
- [x] WhatsApp real com mensagem pré-preenchida (`+55 14 93618-0712`)
- [x] Renomear "Desbloqueio Express" → **Grupo Tech & Posicionamento**
- [x] Widget interativo → **Painel de Conquistas** (seção `#conquistas-verificadas`)
- [x] CTAs principais apontando pro WhatsApp (hero, header, mobile, cards)
- [x] CTA secundário rolando pra seção (`Ver os programas`)
- [x] Bloco final de conversão após o FAQ
- [x] Logo do header → scroll ao topo (`#top`)
- [x] Favicon (`favicon.svg`) + Apple touch icon
- [x] Comprimir `assets/mentor.jpg` (~177 KB, max 900px)
- [x] Fontes Google: remover peso Montserrat 500 não usado
- [x] FAQ: `aria-expanded`, formato online, seleção/vagas
- [x] Menu mobile: fechar ao clicar fora
- [x] Focus visível (`focus-visible`) em links e botões
- [x] Fluxo em 1 linha no FAQ (*Manda mensagem → conversa sem compromisso → proposta*)
- [x] Investimento: *Valores e formas de pagamento na conversa inicial*
- [x] Micro-CTA no Painel de Conquistas (após marcar conquistas)
- [x] Card 1:1: grupo incluso como bônus (alinhado ao FAQ)
- [x] Badges da mentora sem logos de empresas
- [x] Tailwind CSS buildado (`dist/styles.css`)
- [x] Credencial discreta: GitHub, Vivo, Nubank, Google na bio
- [x] Blog com Artigo #1 (manifesto)

### Refatoração (jun/2026)
- [x] Reordenar homepage: Hero → Diagnóstico → Dados teaser → Sobre → Programas → Blog → Painel → FAQ → CTA
- [x] Nav simplificado: O problema · Programas · Sobre mim · Blog
- [x] Seção `#depoimentos` removida (reativar quando houver citações reais)
- [x] `#dados-mercado` enxugado com link pro artigo #1
- [x] Faixa "Do blog" na homepage
- [x] FAQ operacional: duração (60 min), reagendamento (24h), contrato, investimento
- [x] Imagem OG branded (`assets/og-image.png` 1200×630)
- [x] Build HTML com partials (`src/pages/` → raiz)
- [x] JS extraído: `assets/site.js`, `assets/conquistas.js`
- [x] `site.config.json` centralizado
- [x] Footer com "Receber artigos" via WhatsApp
- [x] `netlify.toml` para deploy

### SEO, performance e alcance (jul/2026)
- [x] `<link rel="canonical">` e `og:url` corretos por página (via build)
- [x] JSON-LD: `Article` nos posts, `ProfessionalService` na home, `FAQPage` no FAQ
- [x] `article:published_time` nos posts do blog
- [x] `sitemap.xml` gerado no build
- [x] `robots.txt` na raiz
- [x] `feed.xml` (RSS) do blog
- [x] OG image por post (`assets/og/<slug>.png`)
- [x] Font Awesome removido → SVGs inline no build (`scripts/icons.mjs`)
- [x] Fontes Google enxugadas (Montserrat 700/800, Fira Code 400)
- [x] `mentor.webp` gerado no build (760×950, ~71 KB) + `<picture>`
- [x] Cache longo em `/assets/*` e `/dist/*` (`netlify.toml`)

---

## 🔴 Prioridade alta — precisa do seu input

### Prova social
- [ ] Substituir placeholders por depoimentos reais (seção `#depoimentos` — reativar quando pronta)
- [ ] Pedir autorização antes de publicar qualquer citação

**Para reativar depoimentos:** adicionar seção `#depoimentos` de volta em `src/pages/index.html` após `#mentora` ou `#programas`, com 2–3 citações reais autorizadas.

### FAQ (confirmar copy)
- [ ] Confirmar duração das sessões (placeholder: **60 min**)
- [ ] Confirmar política de reagendamento (placeholder: **24h de aviso**)
- [ ] Confirmar texto sobre contrato/termo
- [ ] Horários fixos da agenda (se quiser publicar)

### Analytics e indexação (manual)
- [ ] Instalar **GA4** — substituir `G-XXXXXXXX` em `site.config.json`
- [ ] (Opcional) Validar evento `whatsapp_click` no GA4
- [ ] Cadastrar site no **Google Search Console**
- [ ] Enviar `https://hightechwomen.netlify.app/sitemap.xml` no Search Console

---

## 🟢 Antes de divulgar em escala

### Compartilhamento
- [x] `og:title`, `og:description`, `og:image` branded
- [x] `twitter:card`
- [ ] Atualizar `siteUrl` em `site.config.json` com domínio final (ex.: `hightechwomen.com.br`)

### Deploy (Netlify)
- [ ] Conectar repositório ao Netlify
- [ ] Build command: `npm run build` · Publish: `.` (raiz)
- [ ] Configurar domínio custom + HTTPS
- [ ] Atualizar `siteUrl` → rodar `npm run build` → redeploy

---

## 🔵 Quando estabilizar o produto

### Conteúdo
- [x] FAQ cobre diferença 1:1 vs grupo, formato online, seleção/vagas
- [ ] Atualizar copy se preço ou duração dos programas mudar
- [ ] Revisar textos a cada nova turma (vagas, datas)

---

## Notas rápidas

**Desenvolvimento — editar sempre os templates em `src/pages/`, não os HTML na raiz:**

```bash
npm install              # primeira vez
npm run build:css        # só CSS
npm run build:img        # mentor.jpg → mentor.webp
npm run build:og         # OG default + uma imagem por post
npm run build:html       # partials → index.html, blog/ + sitemap + feed + ícones SVG
npm run build            # tudo (CSS + img + OG + HTML)
npm run watch:css        # rebuild CSS ao salvar
```

**Config central:** [`site.config.json`](site.config.json)
- `siteUrl` — URL absoluta para OG tags
- `ga4Id` — Measurement ID (deixe `G-XXXXXXXX` para desligado)
- `whatsapp` — número sem formatação

**Link WhatsApp (padrão):**
```
https://wa.me/5514936180712?text=Oi!%20Quero%20saber%20mais%20sobre%20a%20mentoria%20HighTech%20Women
```

**Programas atuais:**
| Formato | Nome | Duração |
|---------|------|---------|
| Individual | Tech & Posicionamento — 1:1 | 3 meses, quinzenal + WhatsApp |
| Grupo | Grupo Tech & Posicionamento | 2 meses, quinzenal |
| Bônus | Grupo incluso na mentoria 1:1 | — |

---

*Última atualização: junho/2026*
