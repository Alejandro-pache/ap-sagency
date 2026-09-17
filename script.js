const menu=document.querySelector('.menu'),nav=document.querySelector('.header nav');
const setMenu=open=>{nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú')};
menu.addEventListener('click',()=>setMenu(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){setMenu(false);menu.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.header'))setMenu(false)});
matchMedia('(min-width: 1001px)').addEventListener('change',()=>setMenu(false));
document.getElementById('year').textContent=new Date().getFullYear();
document.querySelectorAll('[data-plan]').forEach(b=>b.addEventListener('click',()=>{document.querySelector('[name=plan]').value=b.dataset.plan}));
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
let scrollFrame=0;
const syncProgress=()=>{const h=document.documentElement,total=h.scrollHeight-h.clientHeight;document.querySelector('.scroll-progress').style.width=(total>0?Math.min(100,Math.max(0,h.scrollTop/total*100)):0)+'%';scrollFrame=0};
addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(syncProgress)},{passive:true});
addEventListener('resize',syncProgress,{passive:true});
syncProgress();
const finishLoader=()=>{document.body.classList.remove('is-loading');document.body.classList.add('loaded')};
addEventListener('load',()=>setTimeout(finishLoader,reduced?0:1850));
setTimeout(finishLoader,3200);

// Animated loading progress for the F5 splash screen.
(() => {
  if (reduced) return;
  const fill = document.querySelector('.loader-progress-fill');
  const dot = document.querySelector('.loader-progress-dot');
  if (!fill || !dot) return;

  let progress = 0;
  const checkpoints = [7, 16, 29, 43, 58, 70, 82, 91, 97];
  let checkpoint = 0;

  const paint = value => {
    const pct = Math.max(0, Math.min(100, value));
    fill.style.width = pct + '%';
    dot.style.left = pct + '%';
  };

  paint(0);
  const timer = setInterval(() => {
    const target = checkpoints[Math.min(checkpoint, checkpoints.length - 1)];
    progress += Math.max(0.7, (target - progress) * 0.22);
    if (Math.abs(target - progress) < 1.4 && checkpoint < checkpoints.length - 1) checkpoint++;
    paint(progress);
  }, 70);

  window.addEventListener('load', () => {
    clearInterval(timer);
    const start = progress;
    const startedAt = performance.now();
    const duration = 520;
    const complete = now => {
      const t = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      paint(start + (100 - start) * eased);
      if (t < 1) requestAnimationFrame(complete);
    };
    requestAnimationFrame(complete);
  }, { once: true });
})();

// Premium interaction layer — visual only, no content changes.
(() => {
  const header = document.querySelector('.header');
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.header nav a[href^="#"]')];
  const syncHeader = () => header?.classList.toggle('scrolled', scrollY > 24);
  syncHeader();
  addEventListener('scroll', syncHeader, {passive:true});

  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
      });
    }, {rootMargin:'-35% 0px -55% 0px', threshold:0});
    sections.forEach(section => spy.observe(section));
  }

})();

// Preselect the requested plan when arriving from a service page.
(() => {
  const planField = document.querySelector('[name="plan"]');
  const requested = new URLSearchParams(location.search).get('plan');
  const plans = {creacion:'Creación de Contenido',gestion:'Gestión Total'};
  if (planField && Object.hasOwn(plans, requested)) planField.value = plans[requested];
})();

// The contact module is loaded only on the home page, after its public config
// has been evaluated. The rest of the static pages remain dependency-free.
if (document.getElementById('leadForm')) {
  const configScript = document.createElement('script');
  configScript.src = 'contact-config.js';
  configScript.onload = () => {
    const contactScript = document.createElement('script');
    contactScript.src = 'contact.js';
    document.body.appendChild(contactScript);
  };
  document.body.appendChild(configScript);
}
