// ── DETECT SUBFOLDER ─────────────────────────────
var base = window.location.pathname.includes('/services/') ? '../' : '';

// ── FIREBASE — load first before anything else ────
(function() {
  var s1 = document.createElement('script');
  s1.src = 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js';
  s1.onload = function() {
    var s2 = document.createElement('script');
    s2.src = 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js';
    s2.onload = function() {
      firebase.initializeApp({
        apiKey: "AIzaSyBaRMQBLfDyufJkC4E8XCvzOIMEawOQObw",
        authDomain: "haulxify-app.firebaseapp.com",
        projectId: "haulxify-app",
        storageBucket: "haulxify-app.firebasestorage.app",
        messagingSenderId: "453228026261",
        appId: "1:453228026261:web:1d66ab1d47418906807e9c"
      });
      window.__firebaseReady = true;
      document.dispatchEvent(new Event('firebaseReady'));
    };
    document.head.appendChild(s2);
  };
  document.head.appendChild(s1);
})();

// ── FAVICON ───────────────────────────────────────
(function() {
  var link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = base + 'images/favicon.png';
  document.head.appendChild(link);
})();

// ── PRELOADER ─────────────────────────────────────
(function() {
  var preloader = document.createElement('div');
  preloader.id = 'preloader';
  preloader.setAttribute('role', 'status');
  preloader.setAttribute('aria-label', 'Loading');
  preloader.innerHTML =
    '<div class="preloader-logo-mark">' +
      '<div class="preloader-word">Haul<span>xify</span></div>' +
    '</div>' +
    '<div class="preloader-bar-wrap">' +
      '<div class="preloader-bar-fill"></div>' +
    '</div>';
  document.body.insertBefore(preloader, document.body.firstChild);
})();

// ── NAV + FOOTER INCLUDES ─────────────────────────
async function loadInclude(id, file) {
  try {
    var res = await fetch(base + file);
    if (!res.ok) return;
    var html = await res.text();
    var el = document.getElementById(id);
    if (el) el.outerHTML = html;
  } catch(e) {
    console.warn('Include failed:', file, e);
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  await loadInclude('nav-include', 'nav.html');
  await loadInclude('footer-include', 'footer.html');
  if (typeof initNav === 'function') initNav();
  if (typeof initMobileMenu === 'function') initMobileMenu();
  if (typeof initAnimations === 'function') initAnimations();
});
