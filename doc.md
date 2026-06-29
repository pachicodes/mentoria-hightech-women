# HighTech Women — Todo list de melhorias

Checklist das sugestões de evolução do site. Marque `[x]` conforme for concluindo.

---

## ✅ Já feito

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
- [x] `alt` da foto: *Pachi — mentora de carreira em tech*
- [x] `loading="lazy"` na foto da mentora
- [x] Meta tags Open Graph + Twitter Card
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

---

## 🔴 Prioridade alta — precisa do seu input

### Prova social
- [ ] Substituir placeholders por depoimentos reais (`#depoimentos`)
- [ ] Pedir autorização antes de publicar qualquer citação

### Sobre mim
- [ ] Linha de resultado (*"já acompanhei X mulheres..."*) — precisa do número real
- [ ] Credenciais: **palestras** — só se quiser citar eventos específicos

### FAQ (políticas operacionais)
- [ ] Quanto tempo dura cada sessão? (ex.: 60 ou 90 min)
- [ ] Horários fixos da agenda
- [ ] E se eu perder uma sessão? (reagendamento)
- [ ] Tem contrato ou termo de participação? (link ou PDF)

### Investimento
- [ ] (Opcional) Parcelamento ou faixa de preço

### Analytics
- [ ] Instalar **GA4** — aguardando Measurement ID (`G-XXXXXXXX`)
- [ ] (Opcional) Rastrear cliques nos botões de WhatsApp

---

## 🟢 Antes de divulgar em escala

### Compartilhamento
- [x] `og:title`, `og:description`, `og:image` (fallback: `assets/mentor.jpg`)
- [x] `twitter:card`
- [ ] Criar imagem OG branded (~1200×630) — portrait atual não é ideal

### Deploy
- [ ] Atualizar `og:image` com URL absoluta quando tiver domínio
- [ ] Publicar em domínio próprio (ex.: hightechwomen.com.br)
- [ ] HTTPS configurado no host

---

## 🔵 Quando estabilizar o produto

### Técnico
- [ ] Trocar Tailwind CDN por CSS buildado (produção)

### Conteúdo
- [x] FAQ cobre diferença 1:1 vs grupo, formato online, seleção/vagas
- [ ] Atualizar copy se preço ou duração dos programas mudar
- [ ] Revisar textos a cada nova turma (vagas, datas)

---

## Notas rápidas

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
