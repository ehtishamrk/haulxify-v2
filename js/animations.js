/* =================================================================
   HAULXIFY — ANIMATIONS.JS
   GSAP ScrollTrigger reveals, parallax, text splits
   ================================================================= */

'use strict';

function initGSAPAnimations() {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // ---------------------------------------------------------------
  // HERO PARALLAX
  // ---------------------------------------------------------------
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    gsap.to(heroBg, {
      y: 120,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      }
    });
  }

  // Hero card subtle float
  const heroCard = document.querySelector('.hero-card');
  if (heroCard) {
    gsap.to(heroCard, {
      y: 40,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      }
    });
  }

  // ---------------------------------------------------------------
  // SECTION HEADERS — REVEAL FROM BELOW
  // ---------------------------------------------------------------
  gsap.utils.toArray('.section-header').forEach(header => {
    const children = header.querySelectorAll('.eyebrow, h2, p');
    gsap.fromTo(
      children,
      { y: 48, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 82%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // ---------------------------------------------------------------
  // SERVICE CARDS — STAGGERED GRID REVEAL
  // ---------------------------------------------------------------
  const serviceGrids = document.querySelectorAll('.services-grid, .industries-grid');
  serviceGrids.forEach(grid => {
    const cards = grid.querySelectorAll(':scope > *');
    gsap.fromTo(
      cards,
      { y: 56, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // ---------------------------------------------------------------
  // STATS BAR — COUNT UP TRIGGER
  // ---------------------------------------------------------------
  const statsBar = document.querySelector('.stats-bar, .stats-section');
  if (statsBar) {
    ScrollTrigger.create({
      trigger: statsBar,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        document.querySelectorAll('[data-count]').forEach(el => {
          if (!el.dataset.animated) {
            el.dataset.animated = 'true';
            // Trigger counter if main.js hasn't already
          }
        });
      }
    });
  }

  // ---------------------------------------------------------------
  // WHY SECTION — SPLIT LAYOUT
  // ---------------------------------------------------------------
  const whyVisual = document.querySelector('.why-visual');
  const whyPoints = document.querySelector('.why-points');
  if (whyVisual && whyPoints) {
    gsap.fromTo(
      whyVisual,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.why-layout',
          start: 'top 75%',
          toggleActions: 'play none none none',
        }
      }
    );

    const points = whyPoints.querySelectorAll('.why-point');
    gsap.fromTo(
      points,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.why-layout',
          start: 'top 75%',
          toggleActions: 'play none none none',
        }
      }
    );
  }

  // ---------------------------------------------------------------
  // TESTIMONIALS — STAGGER
  // ---------------------------------------------------------------
  const testimonialGrid = document.querySelector('.testimonials-grid');
  if (testimonialGrid) {
    gsap.fromTo(
      testimonialGrid.children,
      { y: 48, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: testimonialGrid,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );
  }

  // ---------------------------------------------------------------
  // CTA BANNER — SCALE IN
  // ---------------------------------------------------------------
  const ctaBanner = document.querySelector('.cta-banner');
  if (ctaBanner) {
    gsap.fromTo(
      ctaBanner,
      { scale: 0.94, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaBanner,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );
  }

  // ---------------------------------------------------------------
  // HORIZONTAL LINE DRAW
  // ---------------------------------------------------------------
  gsap.utils.toArray('.animate-line').forEach(line => {
    gsap.fromTo(
      line,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: line,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // ---------------------------------------------------------------
  // NUMBER BIG REVEAL
  // ---------------------------------------------------------------
  gsap.utils.toArray('.stat-big-num, .why-card-number').forEach(el => {
    gsap.fromTo(
      el,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );
  });
}

// ---------------------------------------------------------------
// HAULER PAGE SPECIFIC ANIMATIONS
// ---------------------------------------------------------------
function initHaulerAnimations() {
  if (typeof gsap === 'undefined') return;
  if (!document.querySelector('.hauler-hero')) return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero title reveal - character by character effect
  const title = document.querySelector('.hauler-hero-title');
  if (title) {
    const text = title.innerHTML;
    gsap.fromTo(
      title,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.5 }
    );
  }

  // Feature cards scroll-pin
  const features = document.querySelectorAll('.hauler-feature');
  if (features.length) {
    gsap.fromTo(
      features,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.hauler-features',
          start: 'top 75%',
        }
      }
    );
  }

  // Phone mockup parallax
  const phone = document.querySelector('.hauler-phone-mock');
  if (phone) {
    gsap.to(phone, {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hauler-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });
  }

  // Countdown ticker
  initHaulerCountdown();
}

function initHaulerCountdown() {
  // Set launch date (6 months from now as placeholder)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 180);

  function updateCountdown() {
    const now = new Date();
    const diff = launchDate - now;

    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(val).padStart(2, '0');
    };

    setVal('cd-days', days);
    setVal('cd-hours', hours);
    setVal('cd-mins', mins);
    setVal('cd-secs', secs);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ---------------------------------------------------------------
// INIT
// ---------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Small delay ensures DOM + fonts are ready
  setTimeout(() => {
    initGSAPAnimations();
    initHaulerAnimations();
  }, 100);
});
