

# Performance Optimization Plan

## Identified Performance Bottlenecks

After analyzing the codebase, I've found several performance issues causing lag:

### 1. CustomCursor - Querying ALL Cards Every Frame
```typescript
// Current: Queries DOM on every mouse move
const cards = document.querySelectorAll('.liquid-glass-card');
cards.forEach(card => { ... });
```
With 250 cards, this runs expensive calculations 60+ times/second.

### 2. Heavy CSS Effects
- `backdrop-filter: blur(40px) saturate(180%)` on every card
- Complex `conic-gradient` with CSS Houdini `@property` animation
- `iridescent-rotate` animation triggers paint on every frame
- Background gradient with `blur(80px)` filter

### 3. PromptGrid - Staggered Transition Delays
```typescript
style={{ transitionDelay: `${Math.min(filteredIndex * 30, 300)}ms` }}
```
Causes layout thrashing with 250 cards.

### 4. PromptCard - Mouse Move Handler
```typescript
const handleMouseMove = useCallback((e: React.MouseEvent) => {
  // Runs on EVERY mouse move event, even when not needed
});
```

---

## Optimization Strategy

### Phase 1: CustomCursor Optimization (Biggest Impact)

**Problem:** Iterating through all 250 cards on every mouse move  
**Solution:** Use spatial indexing and limit to visible cards only

```typescript
// Optimized: Only check cards near cursor using bounding check
const updateCardEdgeIntensity = useCallback((x: number, y: number) => {
  // Use cached viewport bounds
  const viewportCards = cardsInViewportRef.current;
  
  // Quick bounding box check before detailed calculation
  let closestCard: HTMLElement | null = null;
  let minDist = Infinity;
  
  for (const card of viewportCards) {
    const rect = card.getBoundingClientRect();
    
    // Skip cards clearly out of range (150px buffer)
    if (x < rect.left - 150 || x > rect.right + 150 ||
        y < rect.top - 150 || y > rect.bottom + 150) {
      continue;
    }
    
    const { distance } = closestEdgePoint(x, y, rect);
    if (distance < minDist) {
      minDist = distance;
      closestCard = card;
    }
  }
  // ... rest of logic
}, []);
```

**Additional optimizations:**
- Cache visible cards using IntersectionObserver (update on scroll, not every frame)
- Throttle updates to 30fps instead of 60fps when cursor is far from cards
- Use `element.style.cssText` for batch style updates

---

### Phase 2: CSS Performance Optimizations

**A. Reduce backdrop-filter intensity:**
```css
/* Before: blur(40px) - very expensive */
.liquid-glass-card {
  backdrop-filter: blur(20px) saturate(150%);
}

/* Mobile: Even lighter */
@media (max-width: 768px) {
  .liquid-glass-card {
    backdrop-filter: blur(12px) saturate(120%);
  }
}
```

**B. Remove CSS Houdini animation (poor browser support, expensive):**
```css
/* Remove @property --iridescent-angle */
/* Replace with transform-based animation (GPU-accelerated) */

.liquid-glass-card::after {
  /* Use static gradient, animate via JS only on active card */
  background: conic-gradient(
    from 0deg,
    hsl(280 95% 82% / 0.5) 0deg,
    hsl(180 100% 70% / 0.5) 72deg,
    hsl(320 95% 85% / 0.5) 144deg,
    hsl(150 85% 75% / 0.5) 216deg,
    hsl(210 100% 78% / 0.5) 288deg,
    hsl(280 95% 82% / 0.5) 360deg
  );
  /* Remove animation: iridescent-rotate */
}
```

**C. Use CSS containment:**
```css
.liquid-glass-card {
  contain: layout style paint;
  content-visibility: auto;
}

.masonry-item {
  contain: layout style;
}
```

**D. Reduce background blur:**
```css
#root::before {
  filter: blur(50px) saturate(1.2); /* was blur(80px) saturate(1.3) */
}
```

---

### Phase 3: PromptCard Optimization

**A. Memoize card component:**
```typescript
import { memo } from 'react';

export const PromptCard = memo(function PromptCard({ prompt, index, onCategoryFilter }: PromptCardProps) {
  // ... existing code
}, (prev, next) => {
  // Custom comparison - only re-render when these change
  return prev.prompt.id === next.prompt.id && 
         prev.index === next.index;
});
```

**B. Remove mouse move listener when not expanded:**
```typescript
// Only attach listener when card is expanded
useEffect(() => {
  if (!expanded || !cardRef.current) return;
  
  const handleMove = (e: MouseEvent) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };
  
  cardRef.current.addEventListener('mousemove', handleMove, { passive: true });
  return () => cardRef.current?.removeEventListener('mousemove', handleMove);
}, [expanded]);
```

---

### Phase 4: PromptGrid Optimization

**A. Remove staggered transition delays:**
```typescript
// Remove this - causes reflow calculation for each card
style={{ transitionDelay: `${Math.min(filteredIndex * 30, 300)}ms` }}

// Replace with CSS-only animation using nth-child
```

**B. Virtual scrolling consideration (future):**
For 250 cards, consider react-window or virtualization if issues persist.

---

## Implementation Summary

| File | Changes |
|------|---------|
| `src/components/CustomCursor.tsx` | Spatial indexing, viewport caching, throttled updates |
| `src/index.css` | Reduce blur values, remove Houdini animation, add containment |
| `src/components/PromptCard.tsx` | Memoize component, conditional mouse listener |
| `src/components/PromptGrid.tsx` | Remove inline transition delays |

---

## Expected Performance Gains

| Optimization | Impact |
|--------------|--------|
| Spatial indexing in CustomCursor | ~70% reduction in JS execution time |
| Reduced backdrop-filter blur | ~40% reduction in paint time |
| Removing Houdini animation | ~30% reduction in composite time |
| CSS containment | ~25% reduction in layout time |
| Memoized PromptCard | ~50% reduction in React reconciliation |

---

## Water Ripple Effect Integration

The water ripple effect you requested will be implemented alongside these optimizations:

**Key performance considerations:**
- Ripple calculations only on the SINGLE closest card (not all cards)
- CSS variables (`--edge-x`, `--edge-y`, `--edge-intensity`) for GPU-accelerated updates
- Static gradient layers that respond to variables (no JS animation loop)
- `will-change: opacity` on the border pseudo-element only

```css
.liquid-glass-card::after {
  /* Ripple gradient - only activated when --edge-intensity > 0 */
  background: 
    radial-gradient(
      circle at var(--edge-x, 50%) var(--edge-y, 50%),
      hsl(280 95% 82% / calc(0.6 * var(--edge-intensity, 0))) 0%,
      hsl(180 100% 70% / calc(0.4 * var(--edge-intensity, 0))) 20%,
      transparent 40%
    );
  will-change: opacity;
  contain: strict;
}
```

This approach keeps the iridescent glow following the cursor on borders while remaining performant.

