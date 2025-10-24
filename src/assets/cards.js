// WhisperDeck UI Enhancer (Vite + React compatible)
export default (function(){
  // Footer background sync
 // Mirror footer background onto the whole page
function syncFooterBackground() {
  const footer = document.querySelector("footer, .site-footer, .app-footer");
  const root = document.documentElement;
  if (!footer) return;

  const style = getComputedStyle(footer);
  const footerBg =
    style.backgroundImage && style.backgroundImage !== "none"
      ? style.backgroundImage
      : style.backgroundColor || "#0f0f12";

  root.style.setProperty("--app-bg", footerBg);
  document.querySelector("#bg-motion")?.style.setProperty("background", footerBg);
}

// Run on load + resize
window.addEventListener("load", syncFooterBackground);
window.addEventListener("resize", syncFooterBackground);

  // Add “Sort by” icon automatically
  function ensureSortIcon(){
    const sortBtn = document.querySelector('.btn-top.sort, .btn-top[data-role="sort"]');
    if(!sortBtn || sortBtn.querySelector('.icon')) return;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.innerHTML = `<path d="M3 7h14M3 12h10M3 17h6"
      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`;
    sortBtn.insertBefore(svg, sortBtn.firstChild);
  }

  // Card expand/collapse behavior
  function setupCollapsibleCards(){
    document.querySelectorAll('.card.is-collapsible').forEach(card=>{
      const btn = card.querySelector('.btn-expander');
      if(!btn) return;
      const id = card.id || ('card-' + Math.random().toString(36).slice(2));
      card.id = id;
      btn.setAttribute('aria-controls', id);

      function toggle(open){
        const isOpen = typeof open === 'boolean' ? open : !card.classList.contains('is-open');
        card.classList.toggle('is-open', isOpen);
        card.setAttribute('aria-expanded', String(isOpen));
        btn.setAttribute('aria-expanded', String(isOpen));
      }

      btn.addEventListener('click', e=>{
        e.preventDefault();
        toggle();
      });

      toggle(false);
    });
  }

  // Initialize after DOM loads
  function ready(fn){ 
    document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);
  }

  ready(()=>{
    syncFooterBackground();
    neutralizeTagHover();
    ensureSortIcon();
    setupCollapsibleCards();
  });

  window.addEventListener('resize', syncFooterBackground);
})();
