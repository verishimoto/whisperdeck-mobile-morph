
# Fixes for WhispererDeck UI

## Overview
This plan addresses three issues you identified:

1. **Mouse-following light effect** - Currently applies everywhere; needs to only project iridescent glow onto card borders
2. **Background opacity** - Dark mode is too dark, light mode is too white; needs reduced opacity for all backdrops/backgrounds
3. **Prompt Chaining for Architect** - The ChainBuilder component exists but is hidden from architects

---

## Issue 1: Remove Mouse-Following Light, Apply Border-Only Glow

### Current Behavior
The `CustomCursor.tsx` component creates a large iridescent glow that follows the mouse everywhere. The `.liquid-glass-card::after` has an iridescent border effect, but the cursor effect is separate and fills the cursor area, not just the borders.

### Solution
Modify the cursor effects to **only** apply the iridescent glow to card borders when the cursor is near them, not as a radial glow around the cursor itself.

**File: `src/components/CustomCursor.tsx`**
- Keep the edge detection logic (`closestEdgePoint`, `distanceToRect`)
- Instead of making the cursor glow, communicate the edge proximity to the nearest card
- Add a custom event or CSS variable on cards when cursor approaches their edges
- The cursor itself becomes a simple, minimal pointer (no large iridescent blob)

**File: `src/index.css`**
- Modify `#custom-cursor` styles to remove the large radial gradients
- Make cursor smaller and simpler (just a clean pointer)
- Enhance `.liquid-glass-card::after` to respond to `--edge-intensity` CSS variable
- The card's border glow intensifies based on cursor proximity to that specific card's edge

### Specific CSS Changes

```css
/* Minimal cursor - no glowing blob */
#custom-cursor {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.4);
  /* Remove all gradient backgrounds */
}

/* Remove .near-card and .burning states that create cursor glow */

/* Card receives --edge-intensity from JS and glows its border */
.liquid-glass-card {
  --edge-intensity: 0;
}

.liquid-glass-card::after {
  opacity: var(--edge-intensity, 0);
  /* Border-only glow with mask-composite already in place */
}
```

**File: `src/components/CustomCursor.tsx`**
- When near a card edge, find the actual card element and set `--edge-intensity` CSS variable on it
- This makes the **card's border** glow, not the cursor itself

---

## Issue 2: Reduce Background/Backdrop Opacity

### Current Behavior
- Dark mode: `linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #0a0a12 100%)` - very dark
- Light mode: `linear-gradient(135deg, #f8f9fc 0%, #f0f2f8 50%, #f5f7fc 100%)` - very white
- Glassmorphism cards, header, and ChainBuilder have heavy opacity values

### Solution
Reduce opacity across all backgrounds and backdrops so the iridescent motion gradient shows through better.

**File: `src/index.css`**

**Dark Mode Background (lines 564-581)**
```css
#root::before {
  /* Reduce base gradient opacity - make it more transparent */
  background: 
    radial-gradient(ellipse at 20% 30%, hsl(280 95% 82% / 0.25), transparent 50%),
    radial-gradient(ellipse at 80% 20%, hsl(180 100% 70% / 0.2), transparent 45%),
    radial-gradient(ellipse at 40% 70%, hsl(320 95% 85% / 0.25), transparent 50%),
    radial-gradient(ellipse at 70% 80%, hsl(150 85% 75% / 0.2), transparent 48%),
    radial-gradient(ellipse at 50% 50%, hsl(210 100% 78% / 0.18), transparent 55%),
    /* Lighter base - more transparent */
    linear-gradient(135deg, rgba(10, 10, 15, 0.6) 0%, rgba(18, 18, 26, 0.5) 100%);
}
```

**Light Mode Background (lines 584-592)**
```css
.light #root::before {
  /* Add more color, less white opacity */
  background:
    radial-gradient(ellipse at 20% 30%, hsl(280 60% 75% / 0.5), transparent 50%),
    radial-gradient(ellipse at 80% 20%, hsl(180 50% 70% / 0.45), transparent 45%),
    radial-gradient(ellipse at 40% 70%, hsl(320 55% 78% / 0.45), transparent 50%),
    radial-gradient(ellipse at 70% 80%, hsl(150 45% 72% / 0.4), transparent 48%),
    radial-gradient(ellipse at 50% 50%, hsl(210 55% 75% / 0.4), transparent 55%),
    /* More transparent white base */
    linear-gradient(135deg, rgba(248, 249, 252, 0.7) 0%, rgba(240, 242, 248, 0.6) 100%);
}
```

**Card Backgrounds**
- `.liquid-glass-card` - reduce `rgba(255, 255, 255, 0.08)` values
- `.liquid-glass-header` - reduce opacity from 0.7 to 0.5

**Vignette Effect (lines 621-627)**
```css
body {
  box-shadow: inset 0 0 200px rgba(0, 0, 0, 0.3); /* was 0.5 */
}
```

---

## Issue 3: Add Prompt Chaining for Architect Mode

### Current Behavior
Looking at `src/pages/Index.tsx` lines 179-187:
```tsx
{!isArchitect && (
  <>
    <PromptComposer />
    <ProgressDashboard />
    <ModelToggle />
    <ChainBuilder />  // ← Hidden from architects!
  </>
)}
```

The `ChainBuilder` component exists and works, but it's explicitly **hidden** when `isArchitect` is true.

### Solution
Show the `ChainBuilder` for architects, but with enhanced features:

1. **Keep ChainBuilder visible for architects** - Remove the `!isArchitect` condition for `ChainBuilder`
2. **Add a toggle for viewing mode** - Architects should see: "Cards | Chains" toggle in header area
3. **Enhance ChainBuilder for architects** - Unlimited chain length, no restrictions

**File: `src/pages/Index.tsx`**
```tsx
{/* User-only gamification features */}
{!isArchitect && (
  <>
    <PromptComposer />
    <ProgressDashboard />
    <ModelToggle />
  </>
)}

{/* Chain Builder - Available to ALL users including architects */}
<ChainBuilder />
```

**File: `src/components/ChainBuilder.tsx`**
Add architect-specific enhancements:
- Remove the limit of 10 nodes for architects
- Show "Architect Mode" indicator
- Add upward/downward chain toggle for viewing chains in different orders

---

## Summary of Files to Modify

| File | Changes |
|------|---------|
| `src/index.css` | Simplify cursor styles, reduce all background/backdrop opacity values, enhance card border glow to respond to edge intensity |
| `src/components/CustomCursor.tsx` | Project edge intensity onto card elements instead of cursor glow, apply `--edge-intensity` CSS variable to nearest card |
| `src/pages/Index.tsx` | Move `ChainBuilder` outside of `!isArchitect` block so architects can use it |
| `src/components/ChainBuilder.tsx` | Add architect-specific enhancements (unlimited nodes, enhanced UI) |

---

## Implementation Order

1. **Cursor + Border Glow** - Modify CustomCursor to set CSS variables on cards, update CSS to respond
2. **Background Opacity** - Update all opacity values in index.css
3. **Architect ChainBuilder** - Move component and enhance for architects
