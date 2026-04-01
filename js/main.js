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
        const a = i.querySelector('.faq-answer');
        if (a) a.style.maxHeight = '0';
      });

      // Open clicked if it wasn't open
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
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
