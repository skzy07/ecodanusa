/* ============================================================
   ECODANUSA — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ─────────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ── Mobile menu ──────────────────────────────────────────── */
  const hamburger   = document.querySelector('.hamburger');
  const mobileNav   = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  hamburger?.addEventListener('click', () => {
    mobileNav?.classList.toggle('open');
    document.body.style.overflow = mobileNav?.classList.contains('open') ? 'hidden' : '';
  });
  mobileLinks.forEach(l => l.addEventListener('click', () => {
    mobileNav?.classList.remove('open');
    document.body.style.overflow = '';
  }));

  /* ── Scroll-triggered animations ─────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => observer.observe(el));

  /* ── Product category filter (home) ──────────────────────── */
  const catTabs  = document.querySelectorAll('.cat-tab');
  const prodCards = document.querySelectorAll('.product-card[data-cat]');

  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      prodCards.forEach(c => {
        if (cat === 'all' || c.dataset.cat === cat) {
          c.style.display = '';
        } else {
          c.style.display = 'none';
        }
      });
    });
  });

  /* ── Products page filter ─────────────────────────────────── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const prodPageCards = document.querySelectorAll('.prod-page-card[data-cat]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      prodPageCards.forEach(c => {
        c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none';
      });
    });
  });

  /* ── Contact form submission ──────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    btn.textContent = 'A enviar...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Mensagem enviada!';
      btn.style.background = 'var(--success)';
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = 'Enviar mensagem';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1200);
  });

  /* ── Careers CV upload ────────────────────────────────────── */
  const careersForm = document.getElementById('careersForm');
  careersForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = careersForm.querySelector('.form-submit');
    btn.textContent = 'A enviar...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Candidatura enviada!';
      btn.style.background = 'var(--success)';
      careersForm.reset();
      setTimeout(() => {
        btn.textContent = 'Enviar candidatura';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1200);
  });

  /* ── Animated counters ────────────────────────────────────── */
  const counters = document.querySelectorAll('.stat-num[data-target]');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.done) {
        e.target.dataset.done = '1';
        const target = parseInt(e.target.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const suffix = e.target.dataset.suffix || '';
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          e.target.querySelector('.num-value').textContent = Math.floor(current) + suffix;
          if (current >= target) clearInterval(timer);
        }, 16);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObs.observe(c));

  /* ── Smooth active nav link highlight ────────────────────── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href')?.split('/').pop() || '';
    if (href === currentPath) link.classList.add('active');
  });
  /* ── i18n ────────────────────────────────────────────────── */
  if (typeof EcoI18n !== 'undefined') EcoI18n.init();
});
