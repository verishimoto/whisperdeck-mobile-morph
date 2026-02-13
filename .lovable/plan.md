

## Restore Column-Based Masonry Layout

### Problem
The current CSS Grid layout (`grid-template-columns: repeat(4, 1fr)` + `grid-auto-rows: auto`) causes the entire row to grow when one card expands. In the previous version, CSS Columns were used, which naturally flow cards into independent columns -- expanding a card only pushes down cards below it in the same column.

### Solution
Replace the CSS Grid with `CSS columns` (multi-column layout) for `.prompt-grid`. This restores the true masonry behavior where each column is independent.

### Changes

**File: `src/index.css`** (lines ~811-817)

Replace the grid definition:
```css
/* Before */
.prompt-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 1.5rem;
}

/* After */
.prompt-grid {
  columns: 4;
  column-gap: 1.5rem;
}
```

Update `.masonry-item` to prevent cards from breaking across columns:
```css
.masonry-item {
  break-inside: avoid;
  margin-bottom: 1.5rem;
  /* existing animation styles remain */
}
```

Update responsive breakpoints similarly:
- 1280px: `columns: 3`
- 1024px: `columns: 2`
- 640px: `columns: 1`

This is a CSS-only change -- no component files need modification. Card expansion will naturally push only same-column cards downward.
