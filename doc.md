# HighTech Women — Todo list de melhorias

Checklist das sugestões de evolução do site. Marque `[x]` conforme for concluindo.

---

## ✅ Já feito

- [x] Paleta de cores mais suave
- [x] Linguagem casual e tom brasileiro (você / paulistana)
- [x] Corrigir foto da mentora (`assets/mentor.jpg`)
- [x] WhatsApp real com mensagem pré-preenchida (`+55 14 93618-0712`)
- [x] Renomear "Desbloqueio Express" → **Grupo Tech & Posicionamento**
- [x] Renomear Achievement Wall → **Conquistas Verificadas**
- [x] CTAs principais apontando pro WhatsApp (hero, header, mobile, cards)
- [x] CTA secundário rolando pra seção (`Ver os programas`)
- [x] Bloco final de conversão após o FAQ

---

## 🔴 Prioridade alta

### Prova social
- [x] Adicionar seção de depoimentos (2–3 quotes) → *placeholders em `#depoimentos`*
- [x] Incluir nome, cargo e empresa de quem depoimentou → *estrutura com `[Nome]`, `[Cargo]`, `[Empresa]`*
- [ ] Substituir placeholders por depoimentos reais
- [ ] Pedir autorização antes de publicar qualquer citação

### Sobre mim
- [x] Colocar seu **nome** no lugar de "sou sua mentora" → `h2`: *"Oi, eu sou a Pachi!"*
- [x] Credenciais: **empresas** (GitHub, Google, Vivo, Nubank no texto)
- [x] Credenciais: **comunidades** (DevRel, estratégia de comunidades no texto + grid)


### Links sociais
- [ ] LinkedIn no rodapé → URL real (ou remover até ter)
- [ ] GitHub no rodapé → URL real (ou remover até ter)
- [ ] Logo do header: trocar `href="#"` por link útil (topo da página ou WhatsApp)

---

## 🟡 Conversão e clareza

### Processo
- [ ] Explicar o fluxo em 1 linha ou mini-seção  
  *Ex.: "Manda mensagem → conversa de 20 min → proposta personalizada"*

### Investimento
- [ ] Deixar claro que valores vêm na conversa inicial  
  *Ex.: "Valores e formas de pagamento na conversa inicial"*
- [ ] (Opcional) Indicar se há parcelamento ou faixa de investimento

### FAQ
- [ ] Quanto tempo dura cada sessão?
- [ ] Qual horário / formato (online)?
- [ ] E se eu perder uma sessão?
- [ ] Tem contrato ou termo de participação?
- [ ] Como funciona a seleção / vagas limitadas?

### Conquistas Verificadas
- [ ] Micro-CTA depois que a pessoa marca conquistas no painel interativo  
  *Ex.: "Quer montar o seu de verdade? Fala comigo no WhatsApp"*

---

## 🟢 Antes de divulgar em escala

### Compartilhamento
- [ ] Adicionar `og:title`, `og:description`, `og:image`
- [ ] Adicionar `twitter:card` (opcional)
- [ ] Criar imagem de preview (~1200×630) pra link no WhatsApp/LinkedIn

### Identidade visual
- [ ] Favicon (ícone `</>` ou logo da marca)
- [ ] Apple touch icon (opcional)

### Performance
- [ ] Comprimir `assets/mentor.jpg`
- [ ] Adicionar `loading="lazy"` na foto da mentora
- [ ] Reduzir peso das fontes Google (só os pesos usados)

### Analytics
- [ ] Instalar Plausible, GA4 ou similar
- [ ] (Opcional) Rastrear cliques nos botões de WhatsApp

---

## 🔵 Quando estabilizar o produto

### Técnico
- [ ] Trocar Tailwind CDN por CSS buildado (produção)
- [ ] Publicar em domínio próprio (ex.: hightechwomen.com.br)
- [ ] HTTPS configurado no host

### Conteúdo
- [ ] Seção "Como funciona" com passos da mentoria (1:1 e grupo)
- [ ] Atualizar copy se preço ou duração dos programas mudar
- [ ] Revisar textos a cada nova turma (vagas, datas)

### Acessibilidade
- [ ] FAQ: `aria-expanded` nos accordions
- [ ] Menu mobile: fechar ao clicar fora
- [ ] Focus visível nos botões e links

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
