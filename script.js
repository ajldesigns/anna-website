// ===== Anna Lu — site interactions =====

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const siteHeader = document.querySelector('.top');

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

// ---- Scroll reveal ----
// A group is marked up with .reveal. If it has several element children they
// arrive in sequence; otherwise the element itself animates. The .rv class that
// drives the animation is added here, never in the markup, so a group is only
// ever animated once. Only things that start below the fold are held back, so an
// element already on screen is never hidden — and with the script switched off
// nothing is hidden at all.
const STAGGER = 70;     // ms between siblings in a group
const STAGGER_CAP = 5;  // past this many, the rest land together
const FOLD = 0.9;       // hold back only what starts below 90% of the viewport

const animated = [];
document.querySelectorAll('.reveal').forEach(group => {
  const kids = Array.from(group.children);
  const set = kids.length > 1 ? kids : [group];
  set.forEach((el, i) => {
    el.classList.add('rv');
    if (set.length > 1) el.style.setProperty('--d', Math.min(i, STAGGER_CAP) * STAGGER + 'ms');
    animated.push(el);
  });
});

if (!reduceMotion && 'IntersectionObserver' in window) {
  const fold = (window.innerHeight || document.documentElement.clientHeight) * FOLD;
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('hold');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -6% 0px' });

  animated.forEach(el => {
    if (el.getBoundingClientRect().top > fold) {
      el.classList.add('hold');
      io.observe(el);
    }
  });
}

// ---- Photos ----
// Hide the section until at least one photo exists, and number the figures so
// the wipe-in staggers.
document.querySelectorAll('.frames').forEach(section => {
  if (!section.querySelector('img')) section.hidden = true;
  const grid = section.querySelector('.frames-grid');
  if (grid) Array.from(grid.children).forEach((fig, i) => fig.style.setProperty('--i', i));
});

// ---- Scroll-linked motion ----
// A reading-progress hairline along the header, plus a slight lag on two
// details so the page has depth without anything moving very far.
const drifting = [
  { el: document.querySelector('.arch'), k: 0.035, max: 18 },
  { el: document.querySelector('.divider'), k: 0.06, max: 26 }
].filter(d => d.el && !reduceMotion);

let progress = null;
if (siteHeader) {
  progress = document.createElement('span');
  progress.className = 'progress';
  progress.setAttribute('aria-hidden', 'true');
  siteHeader.appendChild(progress);
}

let queued = false;
function frame() {
  queued = false;
  const y = window.scrollY || window.pageYOffset || 0;
  const vh = window.innerHeight || document.documentElement.clientHeight;

  if (siteHeader) siteHeader.classList.toggle('scrolled', y > 10);

  if (progress) {
    const room = document.documentElement.scrollHeight - vh;
    progress.style.transform = 'scaleX(' + (room > 0 ? Math.min(1, y / room) : 0) + ')';
    progress.classList.toggle('on', y > 40);
  }

  const mid = vh / 2;
  drifting.forEach(({ el, k, max }) => {
    const r = el.getBoundingClientRect();
    const lag = Math.max(0, mid - (r.top + r.height / 2));
    const off = Math.min(max, lag * k);
    el.style.transform = off ? 'translate3d(0,' + off.toFixed(2) + 'px,0)' : '';
  });
}
function requestFrame() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(frame);
}
window.addEventListener('scroll', requestFrame, { passive: true });
window.addEventListener('resize', requestFrame, { passive: true });
frame();
