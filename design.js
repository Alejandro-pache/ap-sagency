/* Visual enhancements. Business copy, prices, form and loading screen are unchanged. */
(() => {
  'use strict';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const svg = (paths, viewBox = '0 0 64 64') =>
    `<svg viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;

  // Code-native drawings: no remote assets or extra dependencies.
  const serviceDrawings = [
    '<rect x="14" y="9" width="36" height="46" rx="5"/><path d="M23 22h18M23 30h18M23 38h9M41 45l9-9 5 5-9 9-7 2z"/>',
    '<rect x="13" y="8" width="28" height="48" rx="6"/><path d="m41 25 13-7v28l-13-7M23 14h8M24 49h6"/><circle cx="27" cy="32" r="7"/>',
    '<rect x="8" y="12" width="48" height="38" rx="5"/><path d="M8 39h48M20 12v27M44 12v27M15 45h10M30 45h4M38 45h11m-17-23 8 5-8 5z"/>',
    '<rect x="22" y="7" width="20" height="34" rx="4"/><path d="M22 22H10v28h18V41m14-19h12v28H36V41M29 13h6M28 35h8"/>',
    '<path d="M37 37H17l-9 8V17a7 7 0 0 1 7-7h26a7 7 0 0 1 7 7v12M26 43v3a6 6 0 0 0 6 6h15l9 6V34a6 6 0 0 0-6-6h-4M18 22h20M18 29h12"/>',
    '<path d="M10 9v45h45M18 45V33h7v12M32 45V26h7v19M46 45V18h7v27M18 22l14-8 9 3L54 7m-9 0h9v9"/>'
  ];
  document.querySelectorAll('.services article').forEach((card, index) => {
    const art = document.createElement('div');
    art.className = 'service-art';
    art.setAttribute('aria-hidden', 'true');
    art.innerHTML = svg(serviceDrawings[index]);
    card.prepend(art);
  });

  const projectDrawings = [
    '<path d="M30 130V52l38-20v98m0-98 33 19v79M101 75l28-15v70M18 130h124M40 63l16-9m-16 28 16-9m-16 28 16-9m-16 28 16-9M80 57v11m11-5v11M80 82v11m11-5v11M80 107v11m11-5v11m22-31 6-3m-6 20 6-3"/>',
    '<path d="M32 76h80v20a30 30 0 0 1-30 30H62a30 30 0 0 1-30-30V76Zm80 4h10a15 15 0 0 1 0 30h-15M22 133h114M50 62c-16-17 12-20 0-37m24 37c-16-17 12-20 0-37m24 37c-16-17 12-20 0-37"/>',
    '<rect x="26" y="55" width="108" height="72" rx="7"/><path d="M58 55V41a8 8 0 0 1 8-8h28a8 8 0 0 1 8 8v14M26 82c32 18 76 18 108 0M74 82h12v20H74zM38 117h15M112 117h9"/>',
    '<path d="M32 72v58h98V72M23 70l10-35h96l10 35M23 70a12 12 0 0 0 24 0 12 12 0 0 0 24 0 12 12 0 0 0 24 0 12 12 0 0 0 24 0 10 10 0 0 0 20 0M48 35l-1 35m25-35-1 35m24-35v35m21-35 3 35M45 95h30v35M87 96h27v20H87zM21 130h120"/>'
  ];
  document.querySelectorAll('.portfolio article').forEach((card, index) => {
    const art = document.createElement('div');
    art.className = 'project-art';
    art.setAttribute('aria-hidden', 'true');
    art.innerHTML = svg(projectDrawings[index], '0 0 160 160');
    card.prepend(art);
  });

  const visual = document.querySelector('.hero-visual');
  if (visual) {
    const decor = document.createElement('div');
    decor.className = 'visual-decoration';
    decor.setAttribute('aria-hidden', 'true');
    const bars = Array.from({ length: 29 }, (_, i) => {
      const height = 6 + Math.round((Math.sin(i * 1.8) + 1) * 10);
      return `<i style="--bar-height:${height}px;--bar-delay:${-i * .14}s"></i>`;
    }).join('');
    decor.innerHTML = `<div class="visual-reel reel-back"></div><div class="visual-reel reel-front"></div><div class="visual-timeline">${bars}</div>`;
    visual.prepend(decor);
    if ('IntersectionObserver' in window) {
      const visualObserver = new IntersectionObserver(entries => {
        visual.classList.toggle('visual-in-view', entries[0].isIntersecting);
      });
      visualObserver.observe(visual);
    } else visual.classList.add('visual-in-view');
  }

  // Reveal individual elements after the original loading animation has finished.
  const entranceSelector = [
    '.hero > div:first-child > *', '.hero-visual', '.problem-copy', '.problem-grid article',
    '.problem blockquote', '#servicios > .eyebrow', '#servicios > h2', '.services article',
    '.pricing > .eyebrow', '.pricing > h2', '.plan', '.process .section-head', '.steps article',
    '.approval', '.results > div', '.results figure', '#portfolio > .eyebrow', '#portfolio > h2',
    '.portfolio article', '#faq > .eyebrow', '#faq .section-head', '.faq details',
    '.contact-copy', '.contact form'
  ].join(',');
  const entrances = [...document.querySelectorAll(entranceSelector)];
  let revealObserver;
  let loaderObserver;
  let entranceTimer;
  const showAll = () => {
    clearTimeout(entranceTimer);
    revealObserver?.disconnect();
    loaderObserver?.disconnect();
    entrances.forEach(element => {
      element.classList.remove('ap-pending');
      element.classList.add('ap-visible');
    });
  };
  const startEntrances = () => {
    if (motion.matches) return showAll();
    entrances.forEach(element => revealObserver.observe(element));
  };
  const afterSplash = () => {
    const splash = document.querySelector('.page-loader');
    if (!splash || getComputedStyle(splash).visibility === 'hidden') return startEntrances();
    let started = false;
    const begin = () => {
      if (started) return;
      started = true;
      clearTimeout(entranceTimer);
      splash.removeEventListener('transitionend', onEnd);
      startEntrances();
    };
    const onEnd = event => {
      if (event.target === splash && event.propertyName === 'opacity') begin();
    };
    splash.addEventListener('transitionend', onEnd);
    entranceTimer = setTimeout(begin, 900);
  };
  if (!motion.matches && 'IntersectionObserver' in window) {
    try {
      revealObserver = new IntersectionObserver(entries => {
        let order = 0;
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.style.setProperty('--entry-delay', `${Math.min(order++, 4) * 65}ms`);
          entry.target.classList.remove('ap-pending');
          entry.target.classList.add('ap-visible');
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });
      entrances.forEach(element => element.classList.add('ap-enter', 'ap-pending'));
      if (document.body.classList.contains('loaded')) afterSplash();
      else {
        loaderObserver = new MutationObserver(() => {
          if (document.body.classList.contains('loaded')) {
            loaderObserver.disconnect();
            afterSplash();
          }
        });
        loaderObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
      }
    } catch { showAll(); }
  } else showAll();

  // Follow the actual pointer only on devices with a mouse; no artificial cursor.
  const tiltCard = visual?.querySelector('.hero-card');
  let pointerFrame = 0;
  let tiltFrame = 0;
  document.querySelectorAll('.services article').forEach(card => {
    card.addEventListener('pointermove', event => {
      if (motion.matches || !finePointer.matches) return;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const bounds = card.getBoundingClientRect();
        card.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
        card.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
      });
    }, { passive: true });
  });
  if (visual && tiltCard) {
    visual.addEventListener('pointermove', event => {
      if (motion.matches || !finePointer.matches) return;
      cancelAnimationFrame(tiltFrame);
      tiltFrame = requestAnimationFrame(() => {
        const bounds = visual.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        tiltCard.style.transform = `rotate(-5deg) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
      });
    }, { passive: true });
    visual.addEventListener('pointerleave', () => {
      cancelAnimationFrame(tiltFrame);
      tiltCard.style.removeProperty('transform');
    });
  }

  // Native <details> keeps keyboard support. WAAPI adds reversible height changes.
  const faqAnimations = new Map();
  document.querySelectorAll('.faq details').forEach(details => {
    const summary = details.querySelector('summary');
    let desiredOpen = details.open;
    summary.addEventListener('click', event => {
      if (motion.matches || typeof details.animate !== 'function') return;
      event.preventDefault();
      const startHeight = details.getBoundingClientRect().height;
      desiredOpen = !desiredOpen;
      faqAnimations.get(details)?.cancel();
      details.style.height = '';
      details.open = true;
      const summaryHeight = summary.getBoundingClientRect().height;
      const endHeight = desiredOpen ? details.getBoundingClientRect().height : summaryHeight + 1;
      const animation = details.animate(
        { height: [`${startHeight}px`, `${endHeight}px`] },
        { duration: 320, easing: 'cubic-bezier(.22, 1, .36, 1)' }
      );
      faqAnimations.set(details, animation);
      animation.onfinish = () => {
        details.open = desiredOpen;
        faqAnimations.delete(details);
      };
    });
    details.addEventListener('toggle', () => {
      if (!faqAnimations.has(details)) desiredOpen = details.open;
    });
  });

  // Respect an accessibility preference even when changed with the page open.
  motion.addEventListener('change', () => {
    if (!motion.matches) return;
    showAll();
    cancelAnimationFrame(tiltFrame);
    cancelAnimationFrame(pointerFrame);
    tiltCard?.style.removeProperty('transform');
    faqAnimations.forEach(animation => animation.finish());
  });

  // Native links keep their normal URL and browser history; the selected plan stays visible.
  document.querySelectorAll('[data-plan]').forEach(link => {
    link.addEventListener('click', () => {
      const select = document.querySelector('[name="plan"]');
      if (!select || motion.matches || !select.animate) return;
      select.animate(
        [{ boxShadow: '0 0 0 0 #b7934700' }, { boxShadow: '0 0 0 4px #b7934738' }, { boxShadow: '0 0 0 0 #b7934700' }],
        { duration: 1000, delay: 500, easing: 'ease-out' }
      );
    });
  });
})();
