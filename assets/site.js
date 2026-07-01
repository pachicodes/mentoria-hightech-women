(function () {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (
        !mobileMenu.classList.contains('hidden') &&
        !mobileMenu.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        mobileMenu.classList.add('hidden');
      }
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  window.toggleFaq = function (id) {
    const answer = document.getElementById(`faq-answer-${id}`);
    const icon = document.getElementById(`faq-icon-${id}`);
    const button = document.getElementById(`faq-btn-${id}`);
    if (!answer || !icon || !button) return;

    const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

    if (isOpen) {
      answer.style.maxHeight = '0px';
      icon.classList.remove('rotate-180');
      button.setAttribute('aria-expanded', 'false');
    } else {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      icon.classList.add('rotate-180');
      button.setAttribute('aria-expanded', 'true');
    }
  };

  document.querySelectorAll('[data-track="whatsapp"]').forEach((link) => {
    link.addEventListener('click', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'whatsapp_click', { event_category: 'engagement' });
      }
    });
  });
})();
