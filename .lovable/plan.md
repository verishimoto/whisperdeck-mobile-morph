

# Cognitive Archeology: Restoring the Iridescent Border Glow

## Root Cause Trace

The iridescent water-ripple border glow worked in earlier versions because performance mode CSS used a simple `.performance-mode` selector. When the last edit changed selectors to `.performance-mode:not(.performance-mode-high)`, it intended to preserve effects on high-performance systems. However, the **PerformanceContext never adds the `performance-mode-high` class** to the DOM -- it only adds `performance-level-high`. This means the `:not(.performance-mode-high)` check always passes, and the `::after { display: none !important }` rule kills the glow unconditionally.

There is also a secondary interference source: `cards.js` runs a DOM polling loop every 2 seconds that fights React's rendering.

## What Broke (Timeline)

1. Original: `.performance-mode` rules killed effects (no level awareness)
2. Fix attempt: Changed to `.performance-mode:not(.performance-mode-high)` to allow glow on capable systems
3. But PerformanceContext only adds `performance-level-high`, never `performance-mode-high`
4. Result: The `:not()` always matches, glow stays killed

## Fix Plan

### Step 1: Fix PerformanceContext class names

In `src/contexts/PerformanceContext.tsx`, update the classList logic to also add/remove `performance-mode-high` when performance level is high and performance mode is active:

- Add `performance-mode-high` to the removal list (line 64)
- After adding `performance-mode`, also add `performance-mode-high` when `performanceLevel === 'high'`

### Step 2: Remove legacy `cards.js`

Delete `src/assets/cards.js` and remove its import from `src/main.tsx`. This file runs raw DOM manipulation (MutationObserver, setInterval, inline style injection) that conflicts with React and wastes CPU cycles.

### Step 3: Stop frame rate detector when stable

In `src/hooks/useFrameRateDetector.ts`, cancel the `requestAnimationFrame` loop once stability is reached (3 consecutive readings at the same level). Restart only at the next check interval. Currently the RAF loop runs on every single frame indefinitely, burning CPU even after performance has been classified.

### Step 4: Clean up dead files

Remove unused files that add confusion:
- `src/components/VirtualizedPromptGrid.tsx` (no longer imported)
- `src/components/PromptCard.backup.tsx` (backup)
- `src/index.backup.css` (backup)

---

### Technical Detail

**PerformanceContext fix** (the critical change):

```typescript
// In the useEffect that applies CSS classes:
root.classList.remove(
  "performance-mode",
  "performance-mode-high",  // ADD THIS
  "performance-level-high",
  "performance-level-medium",
  "performance-level-low",
  "performance-level-critical"
);

if (state.mode === "performance") {
  root.classList.add("performance-mode");
  if (performanceLevel === "high") {
    root.classList.add("performance-mode-high");  // ADD THIS
  }
}

root.classList.add(`performance-level-${performanceLevel}`);
```

This ensures the CSS selector `.performance-mode:not(.performance-mode-high)` correctly excludes high-performance systems, allowing the `::after` pseudo-element (iridescent ripple) to render.

