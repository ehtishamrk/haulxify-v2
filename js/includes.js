// Detect if we're in a subfolder
const isSubfolder = window.location.pathname.includes('/services/');
const base = isSubfolder ? '../' : '';

// ── FAVICON ──────────────────────────────────────
(function() {
  var base = window.location.pathname.includes('/services/') ? '../' : '';
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
async function loadInclude(id, file) {
  try {
    const res = await fetch(base + file);
    if (!res.ok) return;
    const html = await res.text();
    const el = document.getElementById(id);
    if (el) el.outerHTML = html;
  } catch (e) {
    console.warn('Include failed:', file, e);
  }
}
async function loadInclude(id, file) {
  try {
    const res = await fetch(file);
    if (!res.ok) return;
    const html = await res.text();
    const el = document.getElementById(id);
    if (el) el.outerHTML = html;
  } catch (e) {
    console.warn('Include failed:', file, e);
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  await loadInclude('nav-include', 'nav.html');
  await loadInclude('footer-include', 'footer.html');

  // Re-run main.js init after includes load
  if (typeof initNav === 'function') initNav();
  if (typeof initAnimations === 'function') initAnimations();
});
