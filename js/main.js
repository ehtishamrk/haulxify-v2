/* =================================================================
   HAULXIFY — MAIN.JS
   Navigation · Preloader · Mobile Menu · Scroll Reveals
   ================================================================= */

'use strict';

// =================================================================
// PRELOADER
// =================================================================
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1200);
  });

  // Absolute failsafe
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }, 3500);
}

// =================================================================
// NAVIGATION — SCROLL BEHAVIOR
// =================================================================
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Add scrolled class for shadow
    if (currentScroll > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // Set active link based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// =================================================================
// MOBILE MENU
// =================================================================
function initMobileMenu() {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    isOpen = false;
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (isOpen && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });
}

// =================================================================
// SCROLL REVEAL
// =================================================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
  );

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Unobserve after reveal (performance)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  revealElements.forEach(el => observer.observe(el));
}

// =================================================================
// COUNTER ANIMATION
// =================================================================
function animateCounter(element, target, duration = 2000, suffix = '') {
  const start = performance.now();
  const startVal = 0;

  function update(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quart
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(startVal + (target - startVal) * eased);
    element.textContent = current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString() + suffix;
    }
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          if (!isNaN(target)) {
            animateCounter(el, target, 2000, suffix);
          }
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach(counter => observer.observe(counter));
}

// =================================================================
// SMOOTH ANCHOR SCROLL
// =================================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = 88;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
}

// =================================================================
// FAQ ACCORDION
// =================================================================
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach(i => {
        i.classList.remove('open');
        const q = i.querySelector('.faq-question');
        const a = i.querySelector('.faq-answer');
        if (a) a.style.maxHeight = '0';
        if (q) q.setAttribute('aria-expanded', 'false');  // ← added
      });

      // Open clicked if it wasn't open
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');   // ← added
      }
    });

    // Keyboard support — Enter and Space trigger click  // ← added block
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });
}

// =================================================================
// PRICING SELECTOR (for pricing page)
// =================================================================
function initPricingSelector() {
  const industryBtns = document.querySelectorAll('[data-industry-btn]');
  const planCards = document.querySelectorAll('[data-industry-content]');
  if (!industryBtns.length) return;

  industryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const industry = btn.dataset.industryBtn;

      // Update active button
      industryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show matching content
      planCards.forEach(card => {
        if (card.dataset.industryContent === industry) {
          card.classList.add('active');
          card.style.display = 'grid';
        } else {
          card.classList.remove('active');
          card.style.display = 'none';
        }
      });
    });
  });
}

// =================================================================
// PRICING BILLING TOGGLE (weekly / monthly / quarterly)
// =================================================================
function initBillingToggle() {
  const toggleBtns = document.querySelectorAll('[data-billing]');
  if (!toggleBtns.length) return;

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const billing = btn.dataset.billing;

      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('[data-price]').forEach(priceEl => {
        const prices = JSON.parse(priceEl.dataset.price || '{}');
        if (prices[billing] !== undefined) {
          priceEl.textContent = prices[billing];
        }
      });
    });
  });
}

// =================================================================
// CONTACT FORM MODAL (signup popup)
// =================================================================
function initModal() {
  const modal = document.getElementById('signup-modal');
  const openBtns = document.querySelectorAll('[data-open-modal]');
  const closeBtn = document.querySelector('[data-close-modal]');
  if (!modal) return;

  function openModal(industry = '', plan = '') {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Pre-fill hidden fields
    const industryField = document.getElementById('modal-industry');
    const planField = document.getElementById('modal-plan');
    if (industryField && industry) industryField.value = industry;
    if (planField && plan) planField.value = plan;
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const industry = btn.dataset.industry || '';
      const plan = btn.dataset.plan || '';
      openModal(industry, plan);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// =================================================================
// NOTIFICATION TOAST
// =================================================================
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// Toast styles injected dynamically
const toastStyles = document.createElement('style');
toastStyles.textContent = `
  .toast {
    position: fixed;
    bottom: 32px;
    right: 32px;
    padding: 14px 24px;
    border-radius: 10px;
    font-family: var(--font-body);
    font-size: 0.9375rem;
    font-weight: 500;
    color: white;
    z-index: 99999;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
    max-width: 320px;
  }
  .toast.show { transform: translateY(0); opacity: 1; }
  .toast-success { background: #0D1929; }
  .toast-error { background: #dc2626; }
`;
document.head.appendChild(toastStyles);

// =================================================================
// INIT ALL
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNav();
  initMobileMenu();
  initScrollReveal();
  initCounters();
  initSmoothScroll();
  initFAQ();
  initPricingSelector();
  initBillingToggle();
  initModal();
});

// Export for use in other scripts
window.HaulxifyApp = {
  showToast,
  initPricingSelector,
  initModal
};
// =================================================================
// NEWSLETTER SUBMIT
// =================================================================
function nlSubmit() {
  var email = document.getElementById('nl-email').value;
  if (!email) return;
  var formData = new FormData();
  formData.append('entry.1829529202', email);
  fetch('https://docs.google.com/forms/d/e/1FAIpQLSfa8U_1NQgykdUOcLKABOIlHMulFilp5tFA05XqqDT6jnPkIQ/formResponse', {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  });
  document.getElementById('nl-email').value = '';
  document.getElementById('nl-wrap').style.display = 'none';
  document.getElementById('nl-success').style.display = 'block';
}
/* =================================================================
   TESTIMONIALS — 3D RING CAROUSEL
   ================================================================= */
(function () {
  var stage = document.getElementById('tring-stage');
  if (!stage) return;

  var DATA = [
    { av:'TR', name:'Tyler R.',  role:'Fleet Owner · 22 trucks · Texas',       stat:'$7,200 saved / month',    q:'Haulxify cut our back office costs by $7,200 every month. Dispatching, BOL, driver HR — everything runs better. It genuinely transformed how we operate.' },
    { av:'JK', name:'James K.',  role:'Owner-Operator · 5 trucks · Ohio',       stat:'+31% revenue in Q1',      q:'Revenue went up 31% in Q1 because we stopped missing loads. I used to dispatch myself at 2am — now I sleep through the night.' },
    { av:'MD', name:'Mark D.',   role:'Freight Broker · Ontario, Canada',       stat:'Onboarded in 48 hours',   q:'BOL processing, carrier outreach, invoicing — all running in 48 hours. Professional, fluent, absolutely reliable. Recommended to three other brokers.' },
    { av:'RT', name:'Rachel T.', role:'Tow Operator · 14 trucks · Atlanta',     stat:'12 days → 3 days billing',q:'Billing turnaround dropped from 12 days to 3. Insurance claims, impound paperwork, city contracts — all handled. That alone covers the cost ten times over.' },
    { av:'SP', name:'Sarah P.',  role:'NEMT Operator · Florida',                stat:'24/7 dispatch coverage',  q:'Medicaid billing understood from day one — faster than any local hire I could have trained in three months. These people genuinely know logistics.' },
    { av:'DL', name:'Diana L.',  role:'Logistics Manager · Melbourne, AU',      stat:'75% less than local staff',q:'Three months in and my after-hours coverage is better than anything local in Melbourne. Response times, professionalism, freight knowledge — outstanding.' }
  ];

  /* Slot positions on the ring: index 0 = front */
  var SLOTS = [
    { x:0,    z:200,  ry:0,    s:1,    o:1,    zi:10 },
    { x:190,  z:66,   ry:-32,  s:0.78, o:0.65, zi:7  },
    { x:310,  z:-72,  ry:-58,  s:0.55, o:0.3,  zi:4  },
    { x:0,    z:-200, ry:180,  s:0.28, o:0,    zi:1  },
    { x:-310, z:-72,  ry:58,   s:0.55, o:0.3,  zi:4  },
    { x:-190, z:66,   ry:32,   s:0.78, o:0.65, zi:7  }
  ];

  var N = DATA.length;
  var active = 0;
  var timer = null;
  var paused = false;

  var ring  = document.getElementById('tring-ring');
  var dotsW = document.getElementById('tring-dots');
  var iName = document.getElementById('tring-iname');
  var iRole = document.getElementById('tring-irole');
  var iStat = document.getElementById('tring-istat');

  /* Build cards */
  var cards = DATA.map(function (t, i) {
    var d = document.createElement('div');
    d.className = 'tring-card';
    d.innerHTML =
      '<div class="tring-card-top">' +
        '<span class="tring-stars">★★★★★</span>' +
        '<span class="tring-qmark">\u201C</span>' +
      '</div>' +
      '<div class="tring-quote">' + t.q + '</div>' +
      '<div class="tring-div"></div>' +
      '<div class="tring-foot">' +
        '<div class="tring-av">' + t.av + '</div>' +
        '<div>' +
          '<div class="tring-name">' + t.name + '</div>' +
          '<div class="tring-role">' + t.role + '</div>' +
        '</div>' +
      '</div>';
    d.addEventListener('click', function () { goTo(i); });
    ring.appendChild(d);
    return d;
  });

  /* Build dots */
  var dots = DATA.map(function (_, i) {
    var b = document.createElement('button');
    b.className = 'tring-dot';
    b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    b.addEventListener('click', function () { goTo(i); });
    dotsW.appendChild(b);
    return b;
  });

  function render(instant) {
    if (instant) {
      cards.forEach(function (c) { c.style.transition = 'none'; });
      requestAnimationFrame(function () {
        cards.forEach(function (c) { c.style.transition = ''; });
      });
    }

    cards.forEach(function (c, i) {
      var si = ((i - active) % N + N) % N;
      var sl = SLOTS[si];
      c.style.transform = 'translateX(' + sl.x + 'px) translateZ(' + sl.z + 'px) rotateY(' + sl.ry + 'deg) scale(' + sl.s + ')';
      c.style.opacity   = sl.o;
      c.style.zIndex    = sl.zi;
      c.classList.toggle('is-front', si === 0);
    });

    dots.forEach(function (d, i) { d.classList.toggle('is-active', i === active); });

    var t = DATA[active];
    iName.textContent = t.name;
    iRole.textContent = t.role;
    iStat.textContent = t.stat;
  }

  function goTo(i) { active = i; render(); }
  function next()  { active = (active + 1) % N; render(); }
  function prev()  { active = (active - 1 + N) % N; render(); }

  document.getElementById('tring-next').addEventListener('click', next);
  document.getElementById('tring-prev').addEventListener('click', prev);

  /* Auto-rotate */
  function startTimer() { timer = setInterval(next, 2800); }
  function stopTimer()  { clearInterval(timer); }

  stage.addEventListener('mouseenter', function () { paused = true;  stopTimer(); });
  stage.addEventListener('mouseleave', function () { paused = false; startTimer(); });

  /* Touch swipe on stage */
  var txStart = null;
  stage.addEventListener('touchstart', function (e) { txStart = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (txStart === null) return;
    var dx = e.changedTouches[0].clientX - txStart;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
    txStart = null;
  });

  render(true);
  startTimer();
})();
