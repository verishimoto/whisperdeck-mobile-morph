
# WhispererDeck Premium Enhancement Plan

## Executive Summary
This plan addresses a comprehensive overhaul spanning favorites, typography, cursor effects, backgrounds, authentication, keyboard shortcuts, and a new Prompt Chaining Composer system for architects.

---

## Phase 1: Favorites System (User Feature)

### 1.1 Create FavoritesContext
**New File: `src/contexts/FavoritesContext.tsx`**

- Store `favoriteIds: Set<number>` persisted to localStorage
- Functions: `toggleFavorite(promptId)`, `isFavorite(promptId)`, `getFavorites()`
- Auto-save on change

### 1.2 Add Star Button to PromptCard
**Modify: `src/components/PromptCard.tsx`**

- Add Heart/Star icon next to copy button
- Filled when favorited, outline when not
- Click toggles favorite state with animation

### 1.3 Create Favorites Filter Tab
**Modify: `src/components/CategoryFilter.tsx`**

- Add "Favorites" button with heart icon
- When active, filter prompts to only show favorited ones

---

## Phase 2: Typography Overhaul

### 2.1 Bebas Neue-style Numbers
**Modify: `src/index.css`**

```css
.number-display {
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 200;  /* Ultra-light */
  font-stretch: ultra-condensed;
  letter-spacing: -0.04em;
  font-size: clamp(2rem, 5vw, 3.5rem);
}
```

### 2.2 Update PromptCard Number Styling
**Modify: `src/components/PromptCard.tsx`**

Replace current number span with:
```tsx
<span className="number-display text-foreground/40">{rank}</span>
```

### 2.3 H1 Header Enhancement (Antigravity-inspired)
**Modify: `src/components/Header.tsx`**

- Large, clean, minimal typography
- Weight: 500-600, tracking tight
- Subtle gradient text effect on hover

---

## Phase 3: Enhanced Cursor & Card Refraction Effects

### 3.1 "Burning" Cursor Near Card Edges
**Modify: `src/components/CustomCursor.tsx`**

- Calculate distance to nearest card edge (not just center)
- Apply intensity gradient: closer = brighter iridescent glow
- Add pulsing animation when very close (<20px)

### 3.2 Glass Refraction Lighting
**Modify: `src/index.css`**

Add new class `.liquid-glass-card-active` for expanded cards:
```css
.liquid-glass-card-active {
  --mouse-x: 50%;
  --mouse-y: 50%;
}

.liquid-glass-card-active::before {
  background: radial-gradient(
    circle at var(--mouse-x) var(--mouse-y),
    rgba(255, 255, 255, 0.15) 0%,
    transparent 60%
  );
}
```

### 3.3 Opposite-Side Glare Effect
**Modify: `src/components/PromptCard.tsx`**

- Track mouse position within expanded card
- Calculate opposite position for glare highlight
- Apply CSS custom properties for dynamic gradient

---

## Phase 4: Background & Light Mode Improvements

### 4.1 Optimize Motion Background
**Modify: `src/index.css`**

Replace image-based background with pure CSS gradient:
```css
#root::before {
  background: 
    radial-gradient(ellipse at 20% 30%, hsl(280 95% 82% / 0.4), transparent 45%),
    /* ... more gradients */
    linear-gradient(135deg, #0a0a0f, #12121a);
  animation: bg-morph 45s ease-in-out infinite alternate;
}
```

### 4.2 Enhanced Light Mode
**Modify: `src/index.css`**

- Increase iridescent saturation in light mode
- Add more visible glassmorphism borders
- Deeper shadows for card depth
- Light mode variables adjusted for better contrast

### 4.3 Remove `body::before` from styles.css
**Modify: `src/assets/styles.css`**

Remove the duplicate background image animation that conflicts with index.css

---

## Phase 5: Header & UI Cleanup

### 5.1 Remove "Notifications alt+T" aria-label
**Search & Remove**: Find and remove this element (not found in current search - may be in a component not yet viewed)

### 5.2 Antigravity-Inspired Header
**Modify: `src/components/Header.tsx`**

```tsx
<header className="sticky top-0 z-50 liquid-glass-header">
  <div className="px-8 py-4 flex items-center justify-between">
    <h1 className="text-3xl font-medium tracking-tight text-foreground">
      WhispererDeck
    </h1>
    {/* Clean, minimal - just theme toggle */}
    <ThemeToggle />
  </div>
</header>
```

---

## Phase 6: Scroll & Touch Animations

### 6.1 Scroll-Triggered Card Animations
**Modify: `src/components/PromptGrid.tsx`**

- Use Intersection Observer API
- Cards fade in + slide up when entering viewport
- Staggered animation delay based on column position

### 6.2 Touch Feedback for Mobile
**Modify: `src/index.css`**

```css
.liquid-glass-card:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}

@media (hover: none) {
  .liquid-glass-card {
    transition: transform 0.15s ease;
  }
}
```

---

## Phase 7: OAuth Authentication System

### 7.1 Create Auth Context
**New File: `src/contexts/AuthContext.tsx`**

- Integrate with Supabase Auth
- Handle sign-in, sign-up, sign-out
- Session persistence

### 7.2 Auth Pages
**New File: `src/pages/Auth.tsx`**

- Sign in with email/password
- Google OAuth button (using Supabase)
- Clean glassmorphism design matching app theme

### 7.3 Protected Routes
**Modify: `src/App.tsx`**

- Wrap routes with auth check
- Redirect unauthenticated users to auth page
- Persist user session

---

## Phase 8: Keyboard Shortcuts

### 8.1 Create KeyboardShortcuts Hook
**New File: `src/hooks/useKeyboardShortcuts.ts`**

Shortcuts:
- `Cmd/Ctrl + K` - Focus search
- `Cmd/Ctrl + /` - Show shortcuts help
- `1-5` - Switch categories
- `Escape` - Close expanded card/modal
- `T` - Toggle theme

### 8.2 Shortcuts Help Modal
**New File: `src/components/KeyboardShortcutsModal.tsx`**

- Glassmorphism modal listing all shortcuts
- Triggered by `Cmd/Ctrl + /`

---

## Phase 9: Architect Mode - Prompt Chaining Composer

### 9.1 Pre-Made Prompt Chain Panels
**New File: `src/components/PromptChainPanels.tsx`**

Structure:
```typescript
interface PromptChain {
  id: string;
  name: string;          // "VIBE CODING PROMPT CHAIN"
  description: string;   // Purpose/use case
  promptIds: number[];   // [172, 199, 229, 238, 249]
  reasoning: string;     // Why these prompts together
  category: 'vibe-coding' | 'prompt-engineering' | 'analysis' | 'creative';
}
```

Display:
- Large glassmorphism panels in a grid
- Show prompt IDs in Helvetica Neue condensed
- Hover to reveal prompt titles
- Copy button for formatted chain output
- Optional flowchart visualization

### 9.2 Inquiry-Based Chain Generator
**New File: `src/components/ChainInquiry.tsx`**

Features:
- Glassmorphism text input centered at top
- Placeholder: "Describe the prompt chain you need..."
- Recent searches displayed below
- Submit generates suggested prompt combination
- Uses RAG-like matching against prompt metadata

### 9.3 Architect Prompt Chain View Toggle
**Modify: `src/pages/Index.tsx`**

For architects:
- Add toggle: "Cards" | "Chains"
- Chains view shows pre-made panels
- Inquiry box at top
- Unlimited selection for custom chains

### 9.4 Chain Visualization Flowchart
**New File: `src/components/ChainFlowchart.tsx`**

- Use React Flow library (already installed)
- Display prompt chain as connected nodes
- Category-colored nodes
- Arrows showing flow direction

---

## Phase 10: Prompt Category Reorganization

### 10.1 Balanced Category Distribution
**Analysis Task (No Code Change Yet)**

Current prompts need redistribution to ensure 50 prompts per category:
- Advanced: 50
- Strategy: 50
- Analysis: 50
- Creativity: 50
- Psychology: 50

### 10.2 Static Ranking Preservation
**Already Implemented**: Prompt numbers remain fixed (1-250) regardless of filter

---

## Technical Notes

### Files to Create
1. `src/contexts/FavoritesContext.tsx`
2. `src/contexts/AuthContext.tsx`
3. `src/pages/Auth.tsx`
4. `src/hooks/useKeyboardShortcuts.ts`
5. `src/components/KeyboardShortcutsModal.tsx`
6. `src/components/PromptChainPanels.tsx`
7. `src/components/ChainInquiry.tsx`
8. `src/components/ChainFlowchart.tsx`

### Files to Modify
1. `src/index.css` - Typography, cursor, backgrounds, animations
2. `src/components/Header.tsx` - Minimal Antigravity-style
3. `src/components/PromptCard.tsx` - Numbers, favorites, refraction
4. `src/components/CategoryFilter.tsx` - Favorites tab
5. `src/components/PromptGrid.tsx` - Scroll animations
6. `src/components/CustomCursor.tsx` - Edge burning effect
7. `src/pages/Index.tsx` - Architect chain view toggle
8. `src/App.tsx` - Auth provider, routes
9. `src/assets/styles.css` - Remove duplicate background

### Database Requirements (Supabase)
For persistent favorites and saved chains:
```sql
-- User favorites
CREATE TABLE user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt_id INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, prompt_id)
);

-- Saved prompt chains
CREATE TABLE prompt_chains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  prompt_ids INTEGER[] NOT NULL,
  reasoning TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_chains ENABLE ROW LEVEL SECURITY;
```

---

## Implementation Priority

**MVP (Do First):**
1. Favorites system (localStorage first, then DB)
2. Typography updates
3. Light mode improvements
4. Scroll animations
5. Remove duplicate backgrounds

**Enhancement (Phase 2):**
6. Enhanced cursor effects
7. Card refraction lighting
8. Keyboard shortcuts

**Advanced (Phase 3):**
9. OAuth authentication
10. Architect prompt chain panels
11. Chain inquiry system
12. Flowchart visualization

---

## Estimated Effort
- MVP Features: 3-4 implementation cycles
- Enhancement Features: 2-3 cycles
- Advanced Features: 4-5 cycles

This plan transforms WhispererDeck into a premium prompt engineering platform with professional-grade UX, proper user accounts, and powerful prompt chaining tools for architects.
