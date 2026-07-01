(function () {
  const presetAchievements = [
    {
      tag: 'COMUNICAÇÃO',
      desc: 'Defendi uma nova arquitetura na planning sem recuar, mesmo com a equipe toda olhando.',
      impact: 'Ganhei respeito técnico e a solução ficou protegida de feedbacks só por gosto pessoal.',
    },
    {
      tag: 'PERFORMANCE',
      desc: 'Liderei uma refatoração que cortou o tempo de resposta do checkout em 40%.',
      impact: 'Melhorou a conversão e a performance do produto — impacto direto no negócio.',
    },
    {
      tag: 'COMPARTILHAMENTO DE CONHECIMENTO',
      desc: 'Fiz onboarding de novas engenheiras e organizei a documentação da arquitetura.',
      impact: 'A equipe se integrou 30% mais rápido — conhecimento que ficou pra todo mundo.',
    },
  ];

  const activeAchievements = new Set();

  window.toggleAchievement = function (index) {
    const selector = document.getElementById(`selector-${index}`);
    const checkIcon = document.getElementById(`check-${index}`);
    const text = document.getElementById(`text-${index}`);
    if (!selector || !checkIcon || !text) return;

    const check = checkIcon.querySelector('i');

    if (activeAchievements.has(index)) {
      activeAchievements.delete(index);
      selector.classList.remove('border-tech-gold');
      selector.classList.add('border-tech-purple-light');
      check.classList.add('hidden');
      text.classList.remove('text-white');
      text.classList.add('text-tech-text-muted');
    } else {
      activeAchievements.add(index);
      selector.classList.add('border-tech-gold');
      selector.classList.remove('border-tech-purple-light');
      check.classList.remove('hidden');
      text.classList.add('text-white');
      text.classList.remove('text-tech-text-muted');
    }

    updateWallPreview();
  };

  function updateWallPreview() {
    const container = document.getElementById('wall-preview-container');
    const countEl = document.getElementById('wall-count');
    if (!container || !countEl) return;

    countEl.innerText = activeAchievements.size;

    if (activeAchievements.size === 0) {
      container.innerHTML = `
        <div id="empty-wall-state" class="text-center p-8 border border-dashed border-tech-purple-light rounded-xl">
          <i class="fa-solid fa-folder-open text-tech-purple-light text-4xl mb-3"></i>
          <p class="text-sm text-tech-text-muted font-mono">Marca uma conquista do lado pra começar a montar seu Painel de Conquistas</p>
        </div>
      `;
      return;
    }

    let html = '';

    activeAchievements.forEach((index) => {
      const item = presetAchievements[index];
      html += `
        <div class="border border-tech-gold/30 bg-tech-purple-dark/90 rounded-xl p-4 sm:p-5 shadow-[0_0_15px_rgba(212,160,136,0.05)] transition-all duration-300">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[10px] font-mono text-tech-gold border border-tech-gold/30 px-2 py-0.5 rounded tracking-widest bg-tech-gold/5 uppercase">${item.tag}</span>
            <span class="text-[10px] font-mono text-tech-text-muted">STATUS: VERIFICADO</span>
          </div>
          <p class="text-sm text-white font-semibold mb-1">${item.desc}</p>
          <p class="text-xs text-tech-text-muted italic flex items-start">
            <span class="text-tech-gold mr-1.5">&gt;_ IMPACTO:</span>
            <span>${item.impact}</span>
          </p>
        </div>
      `;
    });

    html += `
      <div class="flex flex-col sm:flex-row gap-3 pt-2">
        <a href="https://wa.me/5514936180712?text=Oi!%20Quero%20montar%20meu%20Painel%20de%20Conquistas%20na%20mentoria" target="_blank" rel="noopener noreferrer" data-track="whatsapp" class="flex-1 text-center py-3 px-4 rounded-lg border border-tech-gold/60 text-tech-gold hover:bg-tech-gold hover:text-tech-bg text-sm font-semibold transition-all duration-300">
          <i class="fa-brands fa-whatsapp mr-2"></i>Quer montar o seu de verdade?
        </a>
        <a href="blog/painel-de-conquistas-negociacao.html" class="flex-1 text-center py-3 px-4 rounded-lg border border-tech-purple-light text-tech-text-muted hover:text-tech-gold hover:border-tech-gold/50 text-sm font-semibold transition-all duration-300">
          Ler no blog <i class="fa-solid fa-arrow-right ml-1 text-xs"></i>
        </a>
      </div>
    `;

    container.innerHTML = html;

    container.querySelectorAll('[data-track="whatsapp"]').forEach((link) => {
      link.addEventListener('click', () => {
        if (typeof gtag === 'function') {
          gtag('event', 'whatsapp_click', { event_category: 'engagement' });
        }
      });
    });
  }
})();
