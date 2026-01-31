
# WhispererDeck Enhancement Plan

## Overview

This plan addresses multiple enhancements across performance, UI/UX, authentication, and feature completeness. I'll organize these into logical implementation phases.

---

## Phase 1: Auto-Detect Performance Mode with Levels

### Current State
- Manual toggle between "high-quality" and "performance" modes exists in Header.tsx
- Performance mode reduces blur effects and disables animations

### Implementation

**New File: `src/hooks/useFrameRateDetector.ts`**

```typescript
interface FrameRateResult {
  fps: number;
  performanceLevel: 'high' | 'medium' | 'low' | 'critical';
}
```

**Logic:**
- Measure frame rate using `requestAnimationFrame` over 2-second intervals
- Detect performance levels:
  - **High** (55+ FPS): Full effects enabled
  - **Medium** (40-54 FPS): Reduce blur, keep animations
  - **Low** (25-39 FPS): Minimal blur, reduce animations
  - **Critical** (<25 FPS): Maximum performance mode, disable all effects

**Update: `PerformanceContext.tsx`**
- Add `autoDetect: boolean` state (default: true)
- Add `performanceLevel: 'high' | 'medium' | 'low' | 'critical'` state
- Integrate frame rate detector hook
- Auto-switch modes based on detected FPS
- Store preference in localStorage

**Update: `src/index.css`**
Add graduated CSS classes:
```css
.performance-level-medium { ... }  /* blur(12px), reduced animations */
.performance-level-low { ... }     /* blur(6px), minimal animations */
.performance-level-critical { ... } /* blur(2px), no animations */
```

---

## Phase 2: Light Theme Iridescence Enhancement

### Problem
Light mode appears too white and lacks the glassmorphism iridescent feel visible in dark mode.

### Changes to `src/index.css`

**Current Light Mode (lines 53-97):**
```css
.light {
  --background: 220 20% 98%;  /* Too white */
  --opal-purple: 280 60% 65%; /* Too muted */
  ...
}
```

**Enhanced Light Mode:**
```css
.light {
  --background: 230 25% 94%;  /* Slight purple tint */
  
  /* Brighter iridescent opal palette */
  --opal-purple: 280 80% 72%;
  --opal-cyan: 180 75% 58%;
  --opal-pink: 320 75% 72%;
  --opal-green: 150 65% 60%;
  --opal-blue: 210 80% 65%;
  
  /* Glass effects with more color */
  --glass-bg: 260 20% 98% / 0.55;  /* Purple-tinted glass */
}
```

**Light mode background (line 603-612):**
- Increase color saturation from 0.45-0.5 to 0.6-0.7
- Add animated hue shift
- Reduce white base opacity

**Light mode card styling (lines 447-496):**
- Add iridescent border glow on hover
- Increase backdrop-filter blur to match dark mode feel
- Add subtle rainbow gradient to borders

---

## Phase 3: Chain Templates System for Architects

### Problem
The Chain Builder exists but lacks pre-made prompt chain templates for architects.

### Database Schema
```sql
CREATE TABLE public.chain_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  prompt_ids INTEGER[] NOT NULL,
  category TEXT DEFAULT 'General',
  is_public BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  use_count INTEGER DEFAULT 0
);
```

### New Files

**`src/contexts/ChainTemplatesContext.tsx`**
- CRUD operations for templates
- Fetch user's templates + public templates
- Track usage counts

**`src/components/ChainTemplatesPanel.tsx`**
- Slide-out panel in ChainBuilder header
- Two sections: "My Templates" and "Community Templates"
- Load/Share/Delete actions

**`src/components/SaveTemplateDialog.tsx`**
- Modal for saving current chain as template
- Name, description, category fields
- Public/private toggle

### Pre-built Seed Templates (5 templates)
| Name | Prompts |
|------|---------|
| Vibe Coding Starter | 1, 7, 16, 31 |
| Deep Analysis | 6, 8, 9, 13, 27 |
| Creative Synthesis | 15, 17, 19, 23, 28 |
| Socratic Foundation | 3, 16, 22, 32 |
| Systems Thinking | 13, 25, 30, 39, 40 |

### ChainBuilder.tsx Updates
- Add "Templates" button next to Save
- Add template loading functionality
- Show templates panel when clicked

---

## Phase 4: UI/UX Refinements

### 4.1 Remove Notification Bar
**Issue:** Extra notification section appearing on large screens

**Investigation:** I did not find a dedicated "Notifications alt+T" section in the current code. The header (`Header.tsx`) shows only:
- WhispererDeck title
- Tagline (hidden on mobile)
- Performance toggle, Keyboard shortcuts, User, Theme buttons

If this refers to a browser extension or Lovable preview banner, that's external to the codebase.

### 4.2 Card Number Formatting
**Change in `PromptCard.tsx` (line 167):**
```tsx
// Current
<span className="number-display">{rank}</span>

// Updated - Add period after number
<span className="number-display">{rank}.</span>
```

### 4.3 Card Title Size Matching
**Update `src/index.css`:**
```css
.number-display {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem); /* Match h3 sizing */
}

h3.card-title {
  font-size: clamp(1.1rem, 2vw, 1.4rem); /* Closer to number size */
}
```

### 4.4 Category Button Styling Consistency
**Update `CategoryFilter.tsx`:**
- Match filter buttons to card tag colors exactly
- Non-hovered: muted color with matching border
- Hovered: brighter saturation, matching glow effect

### 4.5 Search Bar Layout
**Update `CategoryFilter.tsx`:**
- Move search bar to right side
- Add `justify-between` layout between category buttons and search/sort
- Match search border to rounded-full pill style

### 4.6 Tooltip/Alt Text for Icons
**Add tooltips throughout using existing Tooltip component:**
- Performance toggle: "Switch to Performance Mode / High Quality Mode"
- Keyboard shortcuts: "Keyboard Shortcuts (Cmd+/)"
- User icon: "Sign In / Sign Out"
- Theme toggle: "Toggle Dark/Light Theme (T)"
- Sort button: "Sort Ascending/Descending"
- View mode buttons: "Grid View / Carousel View / Tree View"
- Chain Builder buttons: "Execute Chain / Save Chain / Clear Chain"

**Implementation:**
Wrap each button with `<Tooltip>` and `<TooltipContent>` with appropriate delay (500ms default).

---

## Phase 5: Header & Layout Improvements

### 5.1 Header Max-Width Alignment
**Update `Header.tsx`:**
- Add `max-w-7xl mx-auto` to match card grid width
- Remove header bottom border (`border-bottom: none`)

### 5.2 Padding Adjustments
- Add proper `py-4` padding to header
- Ensure alignment with scrollbar and grid edges

### 5.3 Button Menu Styling
**Update `CategoryFilter.tsx`:**
- When not hovered: show category color on border and font (muted)
- When hovered: increase saturation, add glow
- Matches tag styling on cards

---

## Phase 6: Authentication Review

### Current State
- Email/password authentication works
- Google OAuth configured via Lovable Cloud managed credentials
- Auth context properly handles sign in/out/up

### Enhancements for Monetization
**Add to `GamificationContext.tsx`:**
- Non-authenticated users: 3 copies per day (reduced from 5)
- Authenticated users: 5 copies per day
- Architect mode bypasses limits entirely

**Add UI prompts:**
- When copy limit reached: "Sign in for more copies"
- When attempting locked prompts: "Create account to unlock"

**Update `PromptCard.tsx`:**
- Check `useAuth().user` before allowing actions
- Show sign-in prompt when limits reached

---

## Phase 7: Background Opalescent Gradient Enhancement

### Ensure visibility through glass
**Update `src/index.css`:**

**Header transparency (lines 498-517):**
```css
.liquid-glass-header {
  background: linear-gradient(
    180deg,
    rgba(10, 10, 15, 0.35) 0%,  /* More transparent */
    rgba(10, 10, 15, 0.25) 100%
  );
}
```

**Card transparency (lines 322-352):**
- Reduce card background opacity to show more gradient through glass

**Background motion enhancement:**
- Keep existing bg-drift animation
- Add subtle hue-rotate animation for more iridescence
- Increase radial gradient intensities slightly

---

## Phase 8: 25 New UI/UX Socratic Prompts

### Category: Design (New category or under existing)
These prompts would be added to `src/data/prompts.ts`:

| ID | Title | Category |
|----|-------|----------|
| 251 | Glassmorphism Depth Hierarchy | Advanced |
| 252 | Iridescent State Communication | Advanced |
| 253 | Micro-Interaction Choreography | Creativity |
| 254 | Cognitive Load Reduction Mapping | Psychology |
| 255 | Gestalt Principle Application | Analysis |
| 256 | Motion Semantics Design | Creativity |
| 257 | Color Accessibility Matrix | Analysis |
| 258 | Touch Target Optimization | Strategy |
| 259 | Visual Rhythm Composition | Creativity |
| 260 | Empty State Personality | Psychology |
| 261 | Error Recovery Flow Design | Strategy |
| 262 | Progressive Disclosure Patterns | Strategy |
| 263 | Skeleton Loading Psychology | Psychology |
| 264 | Morphism Transition Logic | Advanced |
| 265 | AI-First Interface Patterns | Advanced |
| 266 | Voice UI Visual Feedback | Creativity |
| 267 | Haptic Feedback Mapping | Analysis |
| 268 | Dark Mode Contrast Rules | Analysis |
| 269 | Responsive Breakpoint Philosophy | Strategy |
| 270 | Scroll-Triggered Animation Timing | Creativity |
| 271 | Brand Personality in UI Motion | Psychology |
| 272 | Accessibility-First Component Design | Analysis |
| 273 | Onboarding Flow Optimization | Strategy |
| 274 | Feedback Loop Visualization | Advanced |
| 275 | Neubrutalism Balance Techniques | Creativity |

Each prompt would follow the existing format with:
- title, description, category
- example (the actual prompt text)
- whyHack (explanation of effectiveness)
- score (76-50 range for new prompts)

---

## Implementation Order

1. **Performance Auto-Detect** (Phase 1) - Core functionality
2. **Light Theme Enhancement** (Phase 2) - Visual polish
3. **UI Refinements** (Phase 4) - Quick wins
4. **Header/Layout** (Phase 5) - Layout fixes
5. **Background Enhancement** (Phase 7) - Visual polish
6. **Tooltips** (Phase 4.6) - UX improvement
7. **Auth Enhancements** (Phase 6) - Monetization logic
8. **Chain Templates** (Phase 3) - Major feature (requires database)
9. **New Prompts** (Phase 8) - Content addition

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/hooks/useFrameRateDetector.ts` | FPS detection for auto performance mode |
| `src/contexts/ChainTemplatesContext.tsx` | Template management |
| `src/components/ChainTemplatesPanel.tsx` | Template browser UI |
| `src/components/SaveTemplateDialog.tsx` | Save template modal |

## Files to Modify

| File | Changes |
|------|---------|
| `src/contexts/PerformanceContext.tsx` | Add auto-detect, performance levels |
| `src/index.css` | Light theme colors, performance levels, layout fixes |
| `src/components/Header.tsx` | Add tooltips, max-width alignment |
| `src/components/CategoryFilter.tsx` | Button styling, layout, tooltips |
| `src/components/PromptCard.tsx` | Number formatting, auth checks |
| `src/components/ChainBuilder.tsx` | Templates integration |
| `src/data/prompts.ts` | Add 25 new UI/UX prompts |
| `src/types/index.ts` | Add ChainTemplate interface |
| `src/App.tsx` | Add ChainTemplatesProvider |

## Database Changes

| Table | Purpose |
|-------|---------|
| `chain_templates` | Store saved prompt chain templates |

---

## Technical Notes

### How Chain Builder Works (Current)
1. Users select prompts from the card grid (checkbox icon)
2. Selected prompts appear in the ChainBuilder staging area at bottom
3. Click "Add to chain" to move prompts to the canvas
4. Drag nodes to reorder
5. Click "Execute" to trigger the chain (currently just increments counter)
6. Click "Save" shows toast (not persisted to database)

### Why "Select Prompt" Button Not Visible
The select button (checkbox icon) is only shown for **non-Architect users**:
```tsx
{!isArchitect && (
  <button onClick={handleSelect} ...>
    {selected ? <CheckSquare /> : <Square />}
  </button>
)}
```

For Architects, the button is intentionally hidden since they have unlimited access and don't need the selection-based workflow. To enable it for Architects, we would modify this condition.
