// ===== Anna Lu — site interactions =====

// Nav border on scroll
const siteHeader = document.querySelector('.top');
if (siteHeader) {
  const onScroll = () => siteHeader.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobile menu
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    })
  );
}

// Scroll reveal
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

// Paper viewer: shows a paper as page images (no PDF file is served).
// Markup: <div class="viewer" data-dir="papers/nhd" data-pages="12"></div>
// Pages are expected at papers/nhd/1.webp ... papers/nhd/12.webp
document.querySelectorAll('.viewer').forEach(v => {
  const dir = v.dataset.dir;
  const count = parseInt(v.dataset.pages || '0', 10);
  const bar = document.createElement('div');
  bar.className = 'viewer-bar';
  const pagesEl = document.createElement('div');
  pagesEl.className = 'viewer-pages';

  if (!dir || !count) {
    v.innerHTML = '<div class="viewer-empty">Full paper coming soon.</div>';
    return;
  }

  bar.innerHTML = `<span>${count} page${count > 1 ? 's' : ''} · read-only preview</span>`;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = 'Read the paper';
  btn.setAttribute('aria-expanded', 'false');
  bar.appendChild(btn);

  let loaded = false;
  btn.addEventListener('click', () => {
    if (!loaded) {
      for (let i = 1; i <= count; i++) {
        const img = document.createElement('img');
        img.src = `${dir}/${i}.webp`;
        img.alt = `Page ${i}`;
        img.loading = 'lazy';
        img.draggable = false;
        pagesEl.appendChild(img);
      }
      loaded = true;
    }
    const open = v.classList.toggle('open');
    btn.textContent = open ? 'Close' : 'Read the paper';
    btn.setAttribute('aria-expanded', String(open));
  });

  // Discourage right-click saving inside the viewer
  pagesEl.addEventListener('contextmenu', e => e.preventDefault());

  v.appendChild(bar);
  v.appendChild(pagesEl);
});

// Photos section: hide it entirely until at least one photo has been added
document.querySelectorAll('.frames').forEach(s => {
  if (!s.querySelector('img')) s.hidden = true;
});
