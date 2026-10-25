(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches || !('IntersectionObserver' in window)) return;

  const revealTargets = document.querySelectorAll([
    '.hero-copy', '.hero-art', '.intro-grid > *', '.audiences-heading', '.audience-card',
    '.journey-heading', '.journey-step', '.section-heading', '.service-card',
    '.showcase-heading', '.showcase-card', '.case-heading', '.case-card',
    '.knowledge-heading', '.knowledge-card', '.trust-heading', '.trust-card',
    '.process-copy', '.steps .step', '.assistant-intro', '.assistant-card',
    '.faq-intro', '.faq-list details', '.followup-heading', '.followup-steps article',
    '.quote-copy', '.quote-form', '.privacy-heading', '.privacy-content > article',
    '.projects-hero .container > *', '.projects-heading', '.project-entry',
    '.record-examples > *', '.projects-cta', '.insights-hero .container > *',
    '.insight-article', '.insights-bottom', '.service-detail-hero > *',
    '.service-detail-content > *', '.service-detail-note', '.not-found-copy > *'
  ].join(','));

  if (!revealTargets.length) return;

  document.documentElement.classList.add('motion-enabled');
  revealTargets.forEach((element) => {
    const siblings = element.parentElement ? [...element.parentElement.children] : [];
    const position = siblings.indexOf(element);
    element.classList.add(`motion-delay-${Math.min(Math.max(position, 0), 4)}`);
    element.classList.add('motion-reveal');
  });

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      activeObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

  revealTargets.forEach((element) => observer.observe(element));
})();
