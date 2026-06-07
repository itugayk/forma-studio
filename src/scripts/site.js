// ============================================================
// Forma Studio — etkileşim katmanı
// GSAP + ScrollTrigger + Lenis smooth scroll + custom cursor
// Astro ClientRouter (view transitions) ile uyumlu yaşam döngüsü.
//
// Kalıcılık modeli:
//  - Bu modül bir kez çalışır ve ClientRouter swap'leri arasında yaşar.
//  - .cursor-root ve .page-transition öğeleri layout'ta transition:persist
//    ile sunucudan gelir → swap'lerde silinmez, tekrar oluşturulmaz.
//  - İçerik animasyonları (reveal/parallax/hscroll) her astro:page-load'da
//    yeniden kurulur; before-swap'te temizlenir.
// ============================================================
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

let lenis = null;
let pageCtx = null; // her sayfanın gsap.context'i
let cursorActive = false; // özel imleç gerçekten devreye girdi mi?

/* ----------------------------------------------------------
   <html> sınıfları — swap her seferinde sıfırladığı için tekrar uygula
   not: 'has-cursor' (native imleci gizler) yalnızca özel imleç
   aktifleştikten SONRA eklenir → asla "imleçsiz" durum oluşmaz.
---------------------------------------------------------- */
function ensureHtmlClasses() {
  const html = document.documentElement;
  if (lenis) html.classList.add('lenis', 'lenis-smooth');
  if (cursorActive) html.classList.add('has-cursor');
}

/* ----------------------------------------------------------
   Lenis smooth scroll — bir kez kurulur, sayfalar arası yaşar
---------------------------------------------------------- */
function initLenis() {
  if (reduceMotion || lenis) return;
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis && lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // anchor linkleri lenis ile yumuşat
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (!id || id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -60, duration: 1.2 });
  });
}

/* ----------------------------------------------------------
   Custom cursor — bir kez bağlanır (window/document kalıcıdır)
---------------------------------------------------------- */
function setupCursor() {
  if (!finePointer || reduceMotion) return;
  let root = document.querySelector('.cursor-root');
  if (!root) {
    root = document.createElement('div');
    root.className = 'cursor-root';
    root.setAttribute('aria-hidden', 'true');
    root.innerHTML =
      '<div class="cursor-dot"></div>' +
      '<div class="cursor-ring"><span class="cursor-label"></span></div>';
    document.body.appendChild(root);
  }
  const dot = root.querySelector('.cursor-dot');
  const ring = root.querySelector('.cursor-ring');
  const label = root.querySelector('.cursor-label');

  const xDot = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3' });
  const yDot = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3' });
  const xRing = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
  const yRing = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });

  // İlk gerçek fare hareketinde devreye gir: imleci o ana konumla,
  // CSS ile görünür yap ve ancak şimdi native imleci gizle.
  const activate = (e) => {
    if (cursorActive) return;
    cursorActive = true;
    gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
    root.classList.add('is-active');
    document.documentElement.classList.add('has-cursor');
  };

  window.addEventListener('mousemove', (e) => {
    activate(e);
    xDot(e.clientX);
    yDot(e.clientY);
    xRing(e.clientX);
    yRing(e.clientY);
  });
  // viewport'tan çıkınca gizle, geri gelince göster
  document.addEventListener('mouseleave', () => root.classList.remove('is-active'));
  document.addEventListener('mouseenter', () => {
    if (cursorActive) root.classList.add('is-active');
  });

  // delegasyon: interaktif öğeler üzerinde ring büyür / etiket
  document.addEventListener('mouseover', (e) => {
    const t = e.target.closest('a, button, [data-cursor]');
    if (!t) return;
    const text = t.getAttribute('data-cursor');
    gsap.to(ring, { scale: text ? 2.3 : 1.7, duration: 0.4, ease: 'power3' });
    gsap.to(dot, { scale: 0.3, duration: 0.4 });
    if (text) {
      label.textContent = text;
      gsap.to(label, { autoAlpha: 1, scale: 1 / 2.3, duration: 0.3 });
    }
  });
  document.addEventListener('mouseout', (e) => {
    const t = e.target.closest('a, button, [data-cursor]');
    if (!t) return;
    gsap.to(ring, { scale: 1, duration: 0.4, ease: 'power3' });
    gsap.to(dot, { scale: 1, duration: 0.4 });
    gsap.to(label, { autoAlpha: 0, duration: 0.2 });
  });
}

/* ----------------------------------------------------------
   Satır bazlı metin bölme (SplitText'siz)
---------------------------------------------------------- */
function splitToLines(el) {
  const text = el.textContent.trim();
  const words = text.split(/\s+/);
  el.setAttribute('aria-label', text);
  el.innerHTML = words
    .map((w) => `<span class="w" style="display:inline-block">${w}&nbsp;</span>`)
    .join('');
  const wordSpans = Array.from(el.querySelectorAll('.w'));
  const lines = [];
  let current = null;
  let lastTop = null;
  wordSpans.forEach((span) => {
    const top = span.offsetTop;
    if (lastTop === null || Math.abs(top - lastTop) > 4) {
      current = [];
      lines.push(current);
      lastTop = top;
    }
    current.push(span);
  });
  el.innerHTML = lines
    .map((line) => {
      const inner = line.map((s) => s.outerHTML).join('');
      return `<span class="line-mask"><span class="line-inner">${inner}</span></span>`;
    })
    .join('');
  return Array.from(el.querySelectorAll('.line-inner'));
}

/* ----------------------------------------------------------
   Sayfa içeriği animasyonları — her page-load'da
---------------------------------------------------------- */
function initContent() {
  pageCtx = gsap.context(() => {
    // nav scroll durumu: 40px sonra katı açık bar + koyu metin
    const navEl = document.querySelector('[data-nav]');
    if (navEl) {
      const setNav = () =>
        navEl.classList.toggle('is-scrolled', (lenis ? lenis.scroll : window.scrollY) > 40);
      setNav();
      ScrollTrigger.create({ start: 0, end: 'max', onUpdate: setNav, onRefresh: setNav });
    }

    // başlık / metin satır reveal
    gsap.utils.toArray('[data-reveal="lines"]').forEach((el) => {
      if (reduceMotion) return;
      const lines = splitToLines(el);
      gsap.set(lines, { yPercent: 115 });
      gsap.to(lines, {
        yPercent: 0,
        duration: 1.05,
        ease: 'expo.out',
        stagger: 0.09,
        delay: el.hasAttribute('data-hero') ? 0.35 : 0,
        scrollTrigger: el.hasAttribute('data-hero')
          ? undefined
          : { trigger: el, start: 'top 88%' },
      });
    });

    // görsel reveal (clip-path mask) + hafif zoom
    gsap.utils.toArray('[data-reveal="img"]').forEach((el) => {
      if (reduceMotion) {
        el.style.clipPath = 'none';
        return;
      }
      const img = el.querySelector('img');
      gsap.set(el, { clipPath: 'inset(0% 0% 100% 0%)' });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 85%' },
        delay: parseFloat(el.dataset.delay || 0),
      });
      tl.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.out' });
      if (img) tl.from(img, { scale: 1.3, duration: 1.5, ease: 'expo.out' }, 0);
    });

    // basit fade-up
    gsap.utils.toArray('[data-reveal="up"]').forEach((el) => {
      if (reduceMotion) return;
      gsap.from(el, {
        y: 42,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        delay: parseFloat(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: 'top 90%' },
      });
    });

    // manifesto: kelime kelime scrub reveal
    gsap.utils.toArray('[data-reveal="words-scrub"]').forEach((el) => {
      const text = el.textContent.trim();
      el.setAttribute('aria-label', text);
      el.innerHTML = text
        .split(/\s+/)
        .map((w) => `<span class="ws" style="display:inline-block">${w}&nbsp;</span>`)
        .join('');
      const ws = el.querySelectorAll('.ws');
      if (reduceMotion) {
        gsap.set(ws, { opacity: 1 });
        return;
      }
      gsap.set(ws, { opacity: 0.16 });
      gsap.to(ws, {
        opacity: 1,
        ease: 'none',
        stagger: 0.5,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 58%',
          scrub: true,
        },
      });
    });

    // parallax
    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      if (reduceMotion) return;
      const speed = parseFloat(el.dataset.parallax) || 0.2;
      gsap.fromTo(
        el,
        { yPercent: -speed * 50 },
        {
          yPercent: speed * 50,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('[data-parallax-wrap]') || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });

    // yatay scroll (Süreç)
    gsap.utils.toArray('[data-hscroll]').forEach((section) => {
      const track = section.querySelector('[data-hscroll-track]');
      if (!track || reduceMotion) return;
      const amount = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -amount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + amount(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    // marquee sonsuz akış
    gsap.utils.toArray('[data-marquee]').forEach((el) => {
      const speed = parseFloat(el.dataset.marquee) || 30;
      const first = el.firstElementChild;
      if (!first) return;
      const w = first.getBoundingClientRect().width;
      gsap.fromTo(
        el,
        { x: 0 },
        { x: -w, duration: speed, ease: 'none', repeat: -1 },
      );
    });

    // magnetic butonlar (yeni DOM → her sayfada yeniden bağla)
    if (finePointer && !reduceMotion) {
      gsap.utils.toArray('[data-magnetic]').forEach((el) => {
        const strength = parseFloat(el.dataset.magnetic) || 0.4;
        const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
        el.addEventListener('mousemove', (e) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * strength);
          yTo((e.clientY - (r.top + r.height / 2)) * strength);
        });
        el.addEventListener('mouseleave', () => {
          xTo(0);
          yTo(0);
        });
      });
    }
  });
}

/* ----------------------------------------------------------
   Sayfa geçiş örtüsü (wipe) — kalıcı .page-transition öğesi
---------------------------------------------------------- */
function getOverlay() {
  let ov = document.querySelector('.page-transition');
  if (!ov) {
    ov = document.createElement('div');
    ov.className = 'page-transition';
    ov.setAttribute('aria-hidden', 'true');
    ov.innerHTML = '<span class="page-transition__mark">FORMA</span>';
    document.body.appendChild(ov);
  }
  return ov;
}

function coverScreen() {
  if (reduceMotion) return Promise.resolve();
  const ov = getOverlay();
  const mark = ov.querySelector('.page-transition__mark');
  return new Promise((resolve) => {
    gsap.set(ov, { display: 'flex', transformOrigin: 'bottom', scaleY: 0 });
    gsap.set(mark, { autoAlpha: 0, y: 24 });
    gsap
      .timeline({ onComplete: resolve })
      .to(ov, { scaleY: 1, duration: 0.55, ease: 'power4.inOut' })
      .to(mark, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.18);
  });
}

function revealScreen() {
  const ov = document.querySelector('.page-transition');
  if (!ov || getComputedStyle(ov).display === 'none') return; // ilk yükleme
  const mark = ov.querySelector('.page-transition__mark');
  gsap
    .timeline({ onComplete: () => gsap.set(ov, { display: 'none' }) })
    .to(mark, { autoAlpha: 0, y: -24, duration: 0.3, ease: 'power2.in' })
    .to(ov, { transformOrigin: 'top', scaleY: 0, duration: 0.6, ease: 'power4.inOut' }, 0.08);
}

/* ----------------------------------------------------------
   Boot / teardown
---------------------------------------------------------- */
function initNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const overlay = document.querySelector('[data-nav-overlay]');
  if (!toggle || !overlay) return;
  const close = () => {
    overlay.classList.remove('open');
    document.body.classList.remove('nav-open');
    overlay.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    if (lenis) lenis.start();
  };
  const open = () => {
    overlay.classList.add('open');
    document.body.classList.add('nav-open');
    overlay.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    if (lenis) lenis.stop();
  };
  toggle.addEventListener('click', () => {
    overlay.classList.contains('open') ? close() : open();
  });
  overlay.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', close),
  );
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

function closeNav() {
  const overlay = document.querySelector('[data-nav-overlay]');
  if (overlay) overlay.classList.remove('open');
  document.body.classList.remove('nav-open');
  if (lenis) lenis.start();
}

function initFilter() {
  const bar = document.querySelector('[data-filter-bar]');
  const grid = document.querySelector('[data-filter-grid]');
  if (!bar || !grid) return;
  const cards = Array.from(grid.querySelectorAll('[data-cat]'));
  const countEl = document.querySelector('[data-filter-count]');

  const apply = (key) => {
    const matched = [];
    cards.forEach((card) => {
      const show = key === 'tum' || card.dataset.cat === key;
      if (show) {
        matched.push(card);
        card.classList.remove('is-hidden');
      } else {
        card.classList.add('is-hidden');
      }
    });
    if (countEl) countEl.textContent = `${matched.length} proje`;
    if (!reduceMotion) {
      gsap.fromTo(
        matched,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.05, overwrite: true },
      );
    }
    ScrollTrigger.refresh();
  };

  bar.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      bar.querySelectorAll('[data-filter]').forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      apply(btn.dataset.filter);
    });
  });
}

function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const success = form.querySelector('[data-contact-success]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (success) {
      success.hidden = false;
      if (!reduceMotion) gsap.from(success, { autoAlpha: 0, y: 10, duration: 0.5 });
    }
    form.reset();
  });
}

function boot() {
  ensureHtmlClasses();
  initNav();
  initFilter();
  initContactForm();
  initContent();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

function teardown() {
  if (pageCtx) {
    pageCtx.revert();
    pageCtx = null;
  }
  ScrollTrigger.getAll().forEach((t) => t.kill());
}

/* ----------------------------------------------------------
   Bir kez kurulanlar (modül kalıcı)
---------------------------------------------------------- */
initLenis();
setupCursor();
ensureHtmlClasses();

/* ----------------------------------------------------------
   ClientRouter yaşam döngüsü
---------------------------------------------------------- */
document.addEventListener('astro:before-preparation', (event) => {
  closeNav();
  const original = event.loader;
  event.loader = async () => {
    await coverScreen();
    await original();
  };
});

document.addEventListener('astro:before-swap', () => {
  teardown();
});

document.addEventListener('astro:after-swap', () => {
  ensureHtmlClasses();
  window.scrollTo(0, 0);
  if (lenis) lenis.scrollTo(0, { immediate: true });
});

// ilk tam yüklemede de tetiklenir
document.addEventListener('astro:page-load', () => {
  boot();
  revealScreen();
});
