

# WhispererDeck Fix and Enhancement Plan

## Critical Issues Identified

### 1. Card Overlap When Expanded (P0)
**Root cause**: The masonry grid (`columns: 4 280px`) uses CSS multi-column layout which does NOT properly reflow when cards expand. When a card expands to show "Why This Is a Hack", it overflows into the card below it because CSS columns calculate positions statically.

**Solution**: Replace inline card expansion with a fixed-height grid layout. All cards will have the same height. Expanding a card opens a **slide-down detail panel below the card row** or a **modal/drawer** instead of expanding inline.

- Change `.masonry-grid` from CSS columns to CSS Grid (`display: grid; grid-template-columns: repeat(4, 1fr)`)
- Set all cards to a fixed height (~280px) with `overflow: hidden`
- Replace the inline expand with a modal/drawer that shows the prompt example and "Why This Is a Hack"
- This eliminates ALL overlap issues and improves performance (no reflow)

### 2. Iridescent Border Glow Lost
**Root cause**: The architect-mode CSS (lines 1044-1052 of index.css) sets `opacity: 0` on `::after` (the ripple effect) by default, only showing on hover. Additionally, `contain: strict` on `::after` may clip the effect.

**Fix**:
- Remove the architect-mode `::after` opacity override
- Change `contain: strict` to `contain: layout` on `::after`
- Ensure the CustomCursor properly sets `--edge-intensity` on visible cards
- Verify the glass refraction `::before` on expanded cards still works

### 3. Performance Lag (P0)
**Root causes**:
- 275 cards rendered simultaneously in masonry mode (no virtualization for architect)
- `backdrop-filter: blur(20px)` on every card = massive GPU load
- `body::before` in `src/assets/styles.css` duplicates the background animation (DOUBLE rendering)
- CSS `content-visibility: auto` conflicts with IntersectionObserver
- MutationObserver in CustomCursor watching entire DOM tree
- `useFrameRateDetector` running continuous `requestAnimationFrame` loop

**Fixes**:
- **Remove `src/assets/styles.css` entirely** - it duplicates everything already in `index.css` (background, card styles, etc.) and adds a SECOND `body::before` animation
- Use IntersectionObserver-based lazy rendering for PromptGrid (only render cards within viewport + buffer)
- Reduce card `backdrop-filter` to `blur(12px)` default, `blur(20px)` on hover only
- Remove `will-change: transform` from all cards (causes GPU memory allocation for each)
- Disable `content-visibility: auto` (breaks intersection observers)

### 4. "Notification Bar" Above Header (Image 2)
**Root cause**: `src/assets/styles.css` has a `section` selector that applies `background: rgba(20, 20, 30, 0.5); backdrop-filter: blur(15px)` to ALL `<section>` elements, AND a second `body::before` with its own background animation. This creates the dark bar effect above the header.

**Fix**: Delete `src/assets/styles.css` completely. It's a legacy file that conflicts with `index.css`.

### 5. Cards Must Have Same Height
- Set all `.liquid-glass-card` to a fixed height of 280px
- Use `overflow: hidden` to clip any overflow
- The expand button opens a dialog/drawer instead of inline expansion

### 6. Search Bar Width
- Increase the search input width from `w-48` to `w-64` in CategoryFilter.tsx

### 7. Max-Width for FHD+ Screens
- Already using `max-w-[1400px]` in Index.tsx, which is correct
- Ensure header and filter bar also use `max-w-[1400px]` instead of `max-w-7xl` (1280px)

### 8. Background Transparency
- Reduce `liquid-glass-header` background opacity from `0.5/0.35` to `0.35/0.2`
- Reduce card backgrounds slightly to let the orb show through more

### 9. Chain Builder Almost Cut Off
- Increase bottom padding on the main content area
- Ensure ChainBuilder has proper `max-w-[1400px]` alignment

### 10. Export 25 New Prompts
- Create a `docs/new-ui-ux-prompts.md` file containing all 25 prompts (IDs 251-275)

### 11. Floating Panels (Chain Templates)
- Add a tab-based layout option: ChainTemplatesPanel can dock as a tab alongside Chain Builder instead of floating

---

## Technical Implementation Details

### Files to Delete
| File | Reason |
|------|--------|
| `src/assets/styles.css` | Duplicate of index.css, causes double background, notification bar artifact |

### Files to Create
| File | Purpose |
|------|---------|
| `docs/new-ui-ux-prompts.md` | Export of 25 new design prompts (251-275) |

### Files to Modify
| File | Changes |
|------|---------|
| `src/index.css` | Fix card height, remove contain:strict, reduce blur defaults, fix architect-mode ::after |
| `src/components/PromptCard.tsx` | Replace inline expand with dialog/drawer for details |
| `src/components/PromptGrid.tsx` | Switch from CSS columns to CSS grid, add lazy rendering |
| `src/components/VirtualizedPromptGrid.tsx` | Increase row height to match fixed card height |
| `src/components/CategoryFilter.tsx` | Widen search bar |
| `src/components/Header.tsx` | Use max-w-[1400px] instead of max-w-7xl |
| `src/components/ChainBuilder.tsx` | Add max-w-[1400px], increase z-index |
| `src/components/CustomCursor.tsx` | Remove MutationObserver, simplify card tracking |
| `src/components/ui/card.tsx` | Remove import of deleted styles.css |
| `src/pages/Index.tsx` | Increase bottom padding |

### CSS Changes Summary

**Card Grid (replacing masonry):**
```css
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.liquid-glass-card {
  height: 280px;
  overflow: hidden;
}
```

**Reduced blur defaults:**
```css
.liquid-glass-card {
  backdrop-filter: blur(12px) saturate(140%);
}

.liquid-glass-card:hover {
  backdrop-filter: blur(20px) saturate(150%);
}
```

**Fix architect-mode ripple:**
```css
.architect-mode .liquid-glass-card::after {
  /* Remove opacity:0 override - let edge-intensity control it */
}
```

**More transparent backgrounds:**
```css
.liquid-glass-header {
  background: linear-gradient(
    180deg,
    rgba(10, 10, 15, 0.35) 0%,
    rgba(10, 10, 15, 0.2) 100%
  );
}
```

### Performance Optimization Checklist
1. Remove duplicate `body::before` from styles.css (delete file)
2. Remove `will-change: transform` from cards (only keep on hover)
3. Remove `content-visibility: auto` (breaks observers)
4. Change `contain: layout style paint` to `contain: layout style` on cards
5. Use CSS grid instead of CSS columns (no reflow on height changes)
6. Reduce default blur from 20px to 12px (hover gets 20px)
7. Lazy render cards outside viewport in PromptGrid
8. Remove MutationObserver from CustomCursor (use delegated approach)

