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

    const check = checkIcon.querySelector('svg') || checkIcon.querySelector('i');

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
          <svg class="w-10 h-10 inline-block fill-current shrink-0 text-tech-purple-light text-4xl mb-3" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M88.7 223.8L0 375.8V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l27.2 36.1 7.9 10.5c5.9 7.9 15.2 12.6 25 12.6H416c35.3 0 64 28.7 64 64v32H144c-22.8 0-43.7 12.3-54.9 32.2zM0 480V176c0-26.5 21.5-48 48-48H400c26.5 0 48 21.5 48 48V480c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48z"/></svg>
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
          <svg class="w-[1em] h-[1em] inline-block fill-current shrink-0 mr-2" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M380.9 97.1C339 55.2 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.1c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.7-32.8-16.2-37.9-18-5.1-1.9-8.8-2.7-12.5 2.7-3.7 5.5-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.7-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>Quer montar o seu de verdade?
        </a>
        <a href="blog/painel-de-conquistas-negociacao.html" class="flex-1 text-center py-3 px-4 rounded-lg border border-tech-purple-light text-tech-text-muted hover:text-tech-gold hover:border-tech-gold/50 text-sm font-semibold transition-all duration-300">
          Ler no blog <svg class="w-3 h-3 inline-block fill-current shrink-0 ml-1 text-xs" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 256 233.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
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
