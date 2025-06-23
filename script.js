// Dark theme toggle
const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const themeToggles = [themeToggleDesktop, themeToggleMobile].filter(Boolean);

function setTheme(dark) {
  document.body.classList.toggle('dark', dark);
  themeToggles.forEach(toggle => {
    const icon = toggle.querySelector('.theme-icon');
    if (icon) icon.textContent = dark ? '\u2600' : '\u263D'; // sun or moon
  });
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

// Load theme from storage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') setTheme(true);
else setTheme(false);

themeToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('dark'));
  });
});

// Gallery carousel slider
(function() {
  const slides = document.querySelectorAll('.gallery-slide');
  const left = document.querySelector('.gallery-arrow-left');
  const right = document.querySelector('.gallery-arrow-right');
  let current = 0;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  if (left && right && slides.length > 1) {
    left.addEventListener('click', prevSlide);
    right.addEventListener('click', nextSlide);
  }

  // Touch/swipe support
  let startX = null;
  const wrapper = document.querySelector('.gallery-slide-wrapper');
  if (wrapper) {
    wrapper.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });
    wrapper.addEventListener('touchend', e => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (dx > 40) prevSlide();
      else if (dx < -40) nextSlide();
      startX = null;
    });
  }
})();

// Site cover shutter effect
(function() {
  const cover = document.querySelector('.site-cover');
  const arrowBtn = document.querySelector('.site-cover-arrow-btn');
  if (!cover || !arrowBtn) return;
  let dismissed = false;
  function dismissCover() {
    if (dismissed) return;
    dismissed = true;
    cover.classList.add('slide-up');
    setTimeout(() => { cover.remove(); }, 1100);
  }
  arrowBtn.addEventListener('click', dismissCover);
  arrowBtn.addEventListener('touchstart', dismissCover);
  window.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp') dismissCover();
  });
})();

// Smooth scroll for nav links with header offset
(function() {
  const header = document.querySelector('.site-header');
  const headerHeight = header ? header.offsetHeight : 0;
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });
})();

// Mobile nav hamburger toggle
(function() {
  const toggler = document.getElementById('navbarToggler');
  const mobileNav = document.getElementById('mobileNav');
  if (!toggler || !mobileNav) return;
  toggler.addEventListener('click', function() {
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      mobileNav.classList.remove('open');
    });
  });
})();
