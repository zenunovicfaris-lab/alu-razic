/* ═══════════════════════════════════════════
   ALU RAZIĆ — MAIN JS
   Vanilla, no dependencies
═══════════════════════════════════════════ */



/* ── HEADER: scroll shadow + active nav ── */
(function () {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Highlight active nav link
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 90;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── HAMBURGER MENU ────────────────────── */
(function () {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (!btn || !nav) return;

  function close() {
    btn.classList.remove('open');
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', outsideClick);
  }

  function outsideClick(e) {
    if (!nav.contains(e.target) && !btn.contains(e.target)) close();
  }

  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) setTimeout(() => document.addEventListener('click', outsideClick), 10);
    else document.removeEventListener('click', outsideClick);
  });

  // Close on nav link click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', close);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) close();
  });
})();

/* ── SMOOTH SCROLL ─────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 70;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── REVEAL ON SCROLL ──────────────────── */
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));
})();

/* ── CONTACT FORM ──────────────────────── */
(function () {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  const msgs = {
    name:    'Unesite ime i prezime (min. 2 slova).',
    phone:   'Unesite broj telefona.',
    message: 'Poruka mora sadržavati najmanje 10 znakova.',
  };

  function validate(field) {
    const err = field.parentElement.querySelector('.field-error');
    let msg = '';
    if (!field.value.trim()) {
      msg = 'Ovo polje je obavezno.';
    } else if (field.minLength && field.value.trim().length < field.minLength) {
      msg = msgs[field.id] || 'Unos je prekratak.';
    }
    if (err) err.textContent = msg;
    field.classList.toggle('error', !!msg);
    return !msg;
  }

  ['name', 'phone', 'message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('blur', () => validate(el));
      el.addEventListener('input', () => {
        if (el.classList.contains('error')) validate(el);
      });
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const nameEl = document.getElementById('name');
    const phoneEl = document.getElementById('phone');
    const msgEl = document.getElementById('message');

    const valid = [validate(nameEl), validate(phoneEl), validate(msgEl)].every(Boolean);
    if (!valid) {
      const firstErr = form.querySelector('.error');
      if (firstErr) firstErr.focus();
      return;
    }

    // Demo — show success without sending
    form.querySelectorAll('input,textarea,select,button').forEach(el => el.disabled = true);
    success.removeAttribute('hidden');
    success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
})();

/* ── LIGHTBOX ──────────────────────────── */
(function () {
  const lb = document.getElementById('lightbox');
  const backdrop = document.getElementById('lightbox-backdrop');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  if (!lb) return;

  const galleries = {
    vikendica: [
      { src: 'assets/img/projekti/vikendica-pvc/1.jpg', alt: 'Vikendica — LB PVC stolarija, pogled izvana' },
      { src: 'assets/img/projekti/vikendica-pvc/2.jpg', alt: 'Vikendica — LB PVC stolarija, detalj prozora' },
      { src: 'assets/img/projekti/vikendica-pvc/3.jpg', alt: 'Vikendica — LB PVC stolarija, bočni pogled' },
      { src: 'assets/img/projekti/vikendica-pvc/4.jpg', alt: 'Vikendica — ugradnja završena' },
    ],
    rolo: [
      { src: 'assets/img/projekti/rolo-vrata-6m/1.jpg', alt: 'Rolo vrata 6m — završena ugradnja' },
      { src: 'assets/img/projekti/rolo-vrata-6m/2.jpg', alt: 'Rolo vrata 6m — detalj mehanizma' },
      { src: 'assets/img/projekti/rolo-vrata-6m/3.jpg', alt: 'Rolo vrata 6m — pogled iznutra' },
    ],
    zenica: [
      { src: 'assets/img/projekti/roletne-komarnici-zenica/1.jpg', alt: 'Roletne i komarnici, Zenica — fasada' },
      { src: 'assets/img/projekti/roletne-komarnici-zenica/2.jpg', alt: 'Roletne i komarnici, Zenica — detalj' },
      { src: 'assets/img/projekti/roletne-komarnici-zenica/3.jpg', alt: 'Roletne i komarnici, Zenica — spuštene roletne' },
      { src: 'assets/img/projekti/roletne-komarnici-zenica/4.jpg', alt: 'Roletne i komarnici, Zenica — ugradnja završena' },
    ],
  };

  let currentGallery = [];
  let currentIndex = 0;
  let prevFocus = null;

  function open(galleryKey, index) {
    currentGallery = galleries[galleryKey] || [];
    currentIndex = index;
    show();
  }

  function show() {
    const item = currentGallery[currentIndex];
    if (!item) return;
    img.src = item.src;
    img.alt = item.alt;
    caption.textContent = item.alt;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === currentGallery.length - 1;
    lb.removeAttribute('hidden');
    backdrop.removeAttribute('hidden');
    requestAnimationFrame(() => backdrop.classList.add('visible'));
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function close() {
    backdrop.classList.remove('visible');
    setTimeout(() => {
      lb.setAttribute('hidden', '');
      backdrop.setAttribute('hidden', '');
      document.body.style.overflow = '';
      if (prevFocus) prevFocus.focus();
    }, 300);
  }

  function prev() { if (currentIndex > 0) { currentIndex--; show(); } }
  function next() { if (currentIndex < currentGallery.length - 1) { currentIndex++; show(); } }

  document.querySelectorAll('.project-thumb[data-gallery]').forEach(btn => {
    btn.addEventListener('click', () => {
      prevFocus = btn;
      open(btn.dataset.gallery, parseInt(btn.dataset.index, 10) || 0);
    });
  });

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  document.addEventListener('keydown', e => {
    if (lb.hasAttribute('hidden')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
})();
