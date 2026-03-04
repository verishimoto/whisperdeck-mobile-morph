

# WhispererDeck Comprehensive Roadmap

This plan consolidates all pending and new requests into a sequential, data-first implementation roadmap. Each phase builds on the previous one.

---

## Phase 1: Data Layer — Re-tag & Add "Design" Category (Highest Priority)

**Problem**: The 25 design prompts (IDs 251-275) are currently scattered across existing categories (Advanced, Creativity, Psychology, Analysis, Strategy) instead of being tagged as "Design". Additionally, prompt #227 ("Brand Personality in UI Motion") is tagged Psychology but should be Design. The overall 250 original prompts need cognitive re-sorting into 5 balanced groups of 50.

**What changes**:
1. **Add "Design" as a 6th category** in the system (CategoryFilter, PromptCard color maps, ChainBuilder color map, CSS variables)
2. **Re-tag all 25 prompts (IDs 251-275) to `category: "Design"`** in `src/data/prompts.ts`
3. **Move prompt #227 from Psychology to Design** (making 26 Design prompts, or we keep 25 and leave 227 as-is per your preference — plan assumes moving it to Design for 26)
4. **Cognitively re-sort the remaining 250 prompts** into 5 balanced groups of ~50 each, using chain-of-thought analysis to match each prompt's core cognitive function to the best-fit category. No changes to title, description, example, or whyHack — only the `category` field changes.
5. **Design color theme**: Warm pastel-orange (`hsl(30 90% 80%)`) in dark mode, adjusted for light mode. Added as `--level-design` CSS variable.

**Files affected**: `src/data/prompts.ts`, `src/index.css`, `src/components/CategoryFilter.tsx`, `src/components/PromptCard.tsx`, `src/components/ChainBuilder.tsx`

---

## Phase 2: Category Menu & Filter Bar Refinements

**What changes**:
1. **Add "Design" button** to the CategoryFilter bar with warm orange color styling
2. **Rename category labels** to better reflect Level 4 prompt engineering vocabulary (keeping existing category string values in data, just updating display labels if needed — or renaming the actual category strings if preferred). Categories would be renamed to more meaningful names for prompt engineers while keeping the same cognitive groupings.
3. **Fix spacing** between category buttons — ensure proper `justify-between` layout with search/sort controls on the right

**Files affected**: `src/components/CategoryFilter.tsx`

---

## Phase 3: Card UI Polish

Based on the uploaded reference images, these are fine visual adjustments:

1. **Remove the HR/border-t separator** between card description and the expand chevron button (line 179: `border-t border-border/50` → removed)
2. **Prompt panel border fix**: Change from `border-border/50` (white) to `border` with `rgba(11, 11, 19, 0.15)` (50% of the dark background, ~semi-transparent). Light mode gets equivalent treatment.
3. **"Why This Is a Hack" panel border**: Apply the category-colored fill at higher opacity (`/20` → `/15` border matching the background fill), removing any white border appearance
4. **Remove the HR after the "Why is it a hack" panel** if one exists (currently there's no explicit HR there, but the `space-y-3` gap may create visual separation)
5. **Uniform button sizing**: Make favorite (Heart) and copy (Copy) buttons match the select (Square) button size — all use `p-1.5` padding and consistent `h-4 w-4` icons, aligned in a tight grid row matching the tag height
6. **Selected state color**: Change from category-color pink to **green success color** (`bg-emerald-500/20 text-emerald-400 border-emerald-500/50`)

**Files affected**: `src/components/PromptCard.tsx`, `src/index.css`

---

## Phase 4: Chain Templates → Dedicated Page

**Problem**: The Chain Templates panel is a popup/overlay that's cut off and can't be scrolled, especially for architects.

**What changes**:
1. Create a new route `/templates` with a dedicated `ChainTemplates` page
2. Full-page layout with public/personal tabs, search, scrollable grid of template cards
3. Each template card shows name, description, prompt count, usage count, load/delete actions
4. Update the "Templates" button in ChainBuilder to navigate to `/templates` instead of opening the popup
5. Add route in `App.tsx`

**Files affected**: New `src/pages/Templates.tsx`, `src/App.tsx`, `src/components/ChainBuilder.tsx`

---

## Phase 5: Move Gamification Panels into Chain Builder

**Problem**: ProgressDashboard and ModelToggle float on screen as separate glassmorphism panels, feeling "polluted" alongside the "Showing X of Y" display.

**What changes**:
1. **Relocate ProgressDashboard and ModelToggle** inside the Chain Builder area as collapsible sections/tabs within the control bar
2. They appear as small tab icons in the Chain Builder header row (only visible for non-architects, hidden for architects as before)
3. When expanded, they render inline within the Chain Builder panel rather than floating independently
4. Remove the standalone floating renders from `Index.tsx`

**Files affected**: `src/pages/Index.tsx`, `src/components/ChainBuilder.tsx`, `src/components/ProgressDashboard.tsx`, `src/components/ModelToggle.tsx`

---

## Phase 6: Chain Builder UX & Padding

1. **Better padding**: Increase internal padding of chain nodes and canvas area
2. **Improved spacing** between node cards and connectors
3. **Better empty state** messaging and visual hierarchy

**Files affected**: `src/components/ChainBuilder.tsx`

---

## Execution Order

Phases are sequenced data-first:
1. Phase 1 (data re-tagging) — foundational, everything depends on this
2. Phase 2 (menu updates) — follows immediately from new categories  
3. Phase 3 (card UI polish) — independent visual refinements
4. Phase 4 (templates page) — independent feature
5. Phase 5 (panel relocation) — depends on Chain Builder structure
6. Phase 6 (Chain Builder UX) — final polish

Each phase is a separate implementation step to keep changes manageable.

