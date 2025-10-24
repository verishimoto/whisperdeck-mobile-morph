/* ==========================================
   WhisperDeck UI Enhancer
   ========================================== */
(function(){

  // 1️⃣ Copy footer background color or gradient to --app-bg
  function syncFooterBackground(){
    try{
      const footer = document.querySelector('footer, .site-footer, .app-footer');
      if(!footer) return;
      const cs = getComputedStyle(footer);
      const bgImage = cs.backgroundImage && cs.backgroundImage !== 'none' ? cs.backgroundImage : null;
      const bgColor = cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)' ? cs.backgroundColor : null;
      const bg = bgImage || bgColor || '#0f0f12';
      document.documentElement.style.setProperty('--app-bg', bg);
    }catch(e){
      console.warn('[WhisperDeck] Footer sync error:', e);
    }
  }

  // 2️⃣ Disable hover effects on tags (just in case some JS re-adds them)
  function neutralizeTagHover(){
    const tags = document.querySelectorAll('.tag, .chip, .badge-tag');
    tags.forEach(el=>{
      el.addEventListener('mouseenter', e=>{
        e.stopImmediatePropagation();
        return false;
      }, {passive:true});
    });
  }

  // 3️⃣ Add “Sort by” icon automatically if not already added
  function ensureSortIcon(){
    const sortBtn = document.querySelector('.btn-top.sort, .btn-top[data-role="sort"]');
    if(!sortBtn) return;
    if(sortBtn.querySelector('.icon')) return; // already added

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = `
      <path d="M3 7h14M3 12h10M3 17h6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round" />
    `;
    sortBtn.insertBefore(svg, sortBtn.firstChild);
  }

  // 4️⃣ Enable per-card expand/collapse (column pushdown)
  function setupCollapsibleCards(){
    const cards = document.querySelectorAll('.card.is-collapsible');
    cards.forEach(card=>{
      const btn = card.querySelector('.btn-expander');
      if(!btn) return;

      const id = card.id || ('card-' + Math.random().toString(36).slice(2));
      card.id = id;
      btn.setAttribute('aria-controls', id);

      const toggle = (open)=>{
        const isOpen = typeof open === 'boolean' ? open : !card.classList.contains('is-open');
        card.classList.toggle('is-open', isOpen);
        card.setAttribute('aria-expanded', String(isOpen));
        btn.setAttribute('aria-expanded', String(isOpen));
      };

      btn.addEventListener('click', e=>{
        e.preventDefault();
        toggle();
      });

      // Default collapsed
      toggle(false);
    });
  }

  // 5️⃣ Initialize on DOM ready
  function ready(fn){
    if(document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(()=>{
    syncFooterBackground();
    neutralizeTagHover();
    ensureSortIcon();
    setupCollapsibleCards();
  });

  // Re-sync background on resize (for responsive footers)
  window.addEventListener('resize', syncFooterBackground);

})();
