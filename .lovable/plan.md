

# Improve Lazy Loading: Larger Batches + "Load All" Button

## Problem
With 275 cards and a batch size of 20, users must scroll through ~14 load cycles to see everything. This is tedious for power users doing audits or searches.

## Changes

### File: `src/components/PromptGrid.tsx`

1. **Increase batch size from 20 to 40** — cuts scroll cycles in half (7 instead of 14)
   - Change initial `renderedCount` from `useState(20)` to `useState(40)`
   - Change the increment in the IntersectionObserver callback from `prev + 20` to `prev + 40`
   - Change the reset value in the filter effect from `setRenderedCount(20)` to `setRenderedCount(40)`

2. **Add a "Load All" button** when there are still unloaded cards
   - Place it just above the lazy-load sentinel div
   - Clicking it sets `renderedCount` to `prompts.length`
   - Style: subtle ghost button matching the existing glass aesthetic (`backdrop-blur`, border, muted text)
   - Shows remaining count: e.g. "Load all 235 remaining prompts"
   - Only visible when `renderedCount < prompts.length`

### Technical Detail

```tsx
// Updated state and observer
const [renderedCount, setRenderedCount] = useState(40);

// In load-more observer callback
setRenderedCount(prev => Math.min(prev + 40, prompts.length));

// In reset effect
setRenderedCount(40);

// New "Load All" button (placed before the sentinel)
{renderedCount < prompts.length && (
  <div className="flex justify-center mt-6 mb-2">
    <button
      onClick={() => setRenderedCount(prompts.length)}
      className="px-6 py-2.5 text-sm font-light text-foreground/60 
                 hover:text-foreground backdrop-blur-xl border 
                 border-white/10 hover:border-white/30 
                 rounded-lg transition-all"
    >
      Load all {prompts.length - renderedCount} remaining prompts
    </button>
  </div>
)}
```

No other files need changes.

