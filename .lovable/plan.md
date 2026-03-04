
# WhispererDeck Roadmap — Status

## ✅ Phase 1: Design Category & Data Re-tagging
- Added `--level-design` CSS variable (warm pastel-orange `30 90% 80%`)
- Re-tagged all 25 prompts (IDs 251-275) to `category: "Design"` including #271 ("Brand Personality in UI Motion")
- Added Design to color maps in PromptCard, CategoryFilter, ChainBuilder

## ✅ Phase 2: Category Menu Refinements
- Added "Design" button to CategoryFilter bar with warm orange styling
- 6 categories now: Advanced, Strategy, Analysis, Creativity, Psychology, Design

## ✅ Phase 3: Card UI Polish
- Removed `border-t` separator above expand chevron
- Prompt panel border: changed from white to `border-foreground/[0.08]` (semi-transparent)
- "Why This Is a Hack" panel: border now uses category fill color at `/15` opacity
- Uniform button sizing: Heart, Copy, Select all use `p-1.5`
- Selected state: green (`bg-emerald-500/20 text-emerald-400`) instead of category pink

## ✅ Phase 4: Dedicated Templates Page
- Created `/templates` route with full-page layout
- Public/personal tabs, search, scrollable grid of template cards
- ChainBuilder "Templates" button now navigates to `/templates`

## ✅ Phase 5: Gamification Panels → Chain Builder
- Moved ProgressDashboard and ModelToggle into ChainBuilder as inline tabs
- Award and Brain icons in header row (non-architect only)
- Removed standalone floating panel renders from Index.tsx

## ✅ Phase 6: Chain Builder UX
- Increased canvas and node padding (px-6, p-5, rounded-2xl)
- Wider node cards (240px), more gap between nodes (gap-4)
- Better empty state spacing

## 🔲 Pending: Cognitive Re-sorting
- Re-sort 250 original prompts into 5 balanced groups of ~50 using chain-of-thought analysis
- Rename category labels to better reflect Level 4 prompt engineering vocabulary
- This is a large data task that requires careful analysis of each prompt's cognitive function
