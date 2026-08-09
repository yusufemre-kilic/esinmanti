/* ========================================
   ESİN MANTI — Main JS (optimized)
   ======================================== */


// ========== BOOT: loader + scroll unlock ==========
(function initBoot() {
  const loader = document.getElementById("site-loader");
  const MAX_WAIT = 1800; // ms — asla sonsuz bekleme

  var done = false;
  function finish() {
    if (done) return;
    done = true;
    // Scroll her zaman açık kalsın
    document.body.style.overflow = "";
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";
    document.body.classList.remove("nav-open");
    document.documentElement.style.overflow = "";

    if (loader) {
      loader.classList.add("is-done");
      setTimeout(function () {
        if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
      }, 500);
    }
    document.body.classList.add("page-loaded");
  }

  // DOM hazır
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      // kısa nefes — boyama için
      setTimeout(finish, 350);
    });
  } else {
    setTimeout(finish, 350);
  }

  // Güvenlik: max süre sonra mutlaka kapat
  setTimeout(finish, MAX_WAIT);

  // window load (görseller) gelirse daha erken bitir
  window.addEventListener("load", function () {
    setTimeout(finish, 150);
  });
})();


// ========== 1. CUSTOM CURSOR + TRAIL (desktop only) ==========
(function initCursor() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  const noHover = window.matchMedia('(hover: none)').matches;
  const isNarrow = window.matchMedia('(max-width: 900px)').matches;
  if (isTouch || isCoarse || noHover || isNarrow) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  const trailCount = 5;
  const trails = [];
  for (let i = 0; i < trailCount; i++) {
    const t = document.createElement('div');
    t.className = 'cursor-trail';
    t.style.opacity = (1 - i / trailCount) * 0.4;
    t.style.transform = `scale(${1 - i * 0.14})`;
    document.body.appendChild(t);
    trails.push({ el: t, x: 0, y: 0 });
  }

  let mouseX = -100, mouseY = -100;
  let cursorX = -100, cursorY = -100;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const hoverTargets = 'a, button, .menu-item, .full-menu-img, .nav-toggle, .lightbox-close';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) cursor.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) cursor.classList.remove('cursor-hover');
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    let prevX = cursorX, prevY = cursorY;
    trails.forEach((t) => {
      t.x += (prevX - t.x) * 0.22;
      t.y += (prevY - t.y) * 0.22;
      t.el.style.left = t.x + 'px';
      t.el.style.top = t.y + 'px';
      prevX = t.x;
      prevY = t.y;
    });
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
})();

// ========== 2. SMOOTH ANCHOR SCROLL (hafif, native wheel serbest) ==========
(function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();

      const offset = 80;
      const target = el.getBoundingClientRect().top + window.scrollY - offset;

      // Native smooth — tarayıcıya bırak, kasmaz
      window.scrollTo({ top: target, behavior: 'smooth' });
    });
  });
})();

// ========== 3. PARALLAX (hafif) ==========
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      // Sadece hero — çok hafif
      if (y < window.innerHeight * 1.2) {
        heroBg.style.transform = `scale(1.05) translateY(${y * 0.25}px)`;
      }
      ticking = false;
    });
  }, { passive: true });
})();

// ========== 4. MENU LIGHTBOX ==========
(function initLightbox() {
  const img = document.querySelector('.full-menu-img');
  if (!img) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Kapat">&times;</button>
    <img src="${img.src}" alt="Esin Mantı Tam Menü" />
  `;
  document.body.appendChild(overlay);

  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  overlay.querySelector('.lightbox-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

// ========== 5. WHATSAPP ==========
(function initWhatsApp() {
  const btn = document.createElement('a');
  btn.href = 'https://wa.me/905356250125?text=Merhaba%2C%20Esin%20Mant%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.';
  btn.target = '_blank';
  btn.rel = 'noopener';
  btn.className = 'whatsapp-btn';
  btn.setAttribute('aria-label', 'WhatsApp');
  btn.innerHTML = '<i class="fab fa-whatsapp"></i>';
  document.body.appendChild(btn);
})();

// ========== 6. REVEALS + PAGE LOAD ==========
(function initReveals() {
  document.body.classList.add('page-loaded');

  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
  );

  revealEls.forEach((el) => {
    // Zaten ekrandaysa hemen göster (ilk kartlar kaybolmasın)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      observer.observe(el);
    }
  });
})();

// ========== NAV ==========
(function initNav() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navbar = document.getElementById("navbar");
  if (!navToggle || !navMenu) return;

  // Backdrop
  let backdrop = document.querySelector(".nav-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    document.body.appendChild(backdrop);
  }

  function isOpen() {
    return navMenu.classList.contains("open");
  }

  function openMenu() {
    navMenu.classList.add("open");
    navToggle.classList.add("active");
    backdrop.classList.add("open");
    document.body.classList.add("nav-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Menü kapat");
  }

  function closeMenu() {
    navMenu.classList.remove("open");
    navToggle.classList.remove("active");
    backdrop.classList.remove("open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Menü aç");
  }

  function toggleMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isOpen()) closeMenu();
    else openMenu();
  }

  navToggle.addEventListener("click", toggleMenu);
  backdrop.addEventListener("click", closeMenu);

  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Esc
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen()) closeMenu();
  });

  // Scroll: navbar scrolled class
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 60) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    }, { passive: true });
  }
})();

// ========== HERO LETTER ANIMATION ==========
document.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById('hero-title');
  if (!title) return;
  const text = title.textContent.trim();
  title.textContent = '';
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.animationDelay = `${0.35 + i * 0.055}s`;
    title.appendChild(span);
  });
});

// ========== GSAP — belirgin scroll animasyonları ==========
(function initGSAP() {
  function run() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Menü kartları — net stagger (opacity CSS'te de var, GSAP y ile güçlendirir)
    gsap.from('.menu-item', {
      scrollTrigger: {
        trigger: '.menu-grid',
        start: 'top 85%',
        once: true
      },
      y: 80,
      duration: 0.85,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'transform'
    });

    // Intro metin
    gsap.from('.intro-text h2, .intro-text .intro-desc', {
      scrollTrigger: { trigger: '.intro', start: 'top 75%', once: true },
      y: 40,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
      clearProps: 'transform'
    });

    // About paragrafları
    gsap.from('.about-content p', {
      scrollTrigger: { trigger: '.about', start: 'top 70%', once: true },
      y: 35,
      duration: 0.65,
      stagger: 0.18,
      ease: 'power2.out',
      clearProps: 'transform'
    });

    // Contact blokları
    gsap.from('.contact-block', {
      scrollTrigger: { trigger: '.contact-details', start: 'top 85%', once: true },
      y: 30,
      duration: 0.55,
      stagger: 0.12,
      ease: 'power2.out',
      clearProps: 'transform'
    });

    // Harita hafif scale
    gsap.from('.contact-map', {
      scrollTrigger: { trigger: '.contact-map', start: 'top 90%', once: true },
      scale: 0.96,
      duration: 0.8,
      ease: 'power2.out',
      clearProps: 'transform'
    });
  }

  if (typeof gsap !== 'undefined') run();
  else window.addEventListener('load', () => setTimeout(run, 120));
})();



// ========== THEME TOGGLE (dark / light) ==========
(function initThemeToggle() {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const meta = document.getElementById('meta-theme-color');
  const STORAGE_KEY = 'esin-theme';

  function getPreferred() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {}
    return 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      if (meta) meta.setAttribute('content', '#f7f4ef');
    } else {
      root.removeAttribute('data-theme');
      if (meta) meta.setAttribute('content', '#0c0c0c');
    }
    if (btn) {
      btn.setAttribute('aria-label', theme === 'light' ? 'Koyu temaya geç' : 'Açık temaya geç');
      btn.setAttribute('title', theme === 'light' ? 'Koyu tema' : 'Açık tema');
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
  }

  applyTheme(getPreferred());

  if (!btn) return;
  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
  });
})();
