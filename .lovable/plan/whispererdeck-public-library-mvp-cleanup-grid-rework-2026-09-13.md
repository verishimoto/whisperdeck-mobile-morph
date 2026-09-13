# WhispererDeck — Public Library MVP Cleanup + Grid Rework

Two jobs in one pass: strip the app back to a public prompt library, and rebuild the card grid as a clean equal-height 5-column layout.

## Part 1 — Public library cleanup

**Removed from the public page**
- Architect entry point: the wand button and "Architect" badge in the header, and the password modal. The architect files stay in the project, just unreferenced from the public UI.
- All architect-only branching in cards, grid, chain builder and templates — everyone now sees the same full library.
- Copy limits and prompt locks: every prompt is open and copyable, no daily cap, no "use 10 prompts to unlock" overlay.
- The "Mastered" badge and the progress/level UI inside the Chain Builder.
- The upgrade / "Contact Sales" pricing dialog (no real payment exists behind it).
- The select-a-prompt button on each card.
- The carousel and tree view switchers — the responsive grid becomes the only view.
- The effects on/off button in the header (automatic quality detection keeps running behind the scenes).

**Kept and untouched**
- Dark visual identity, typography, card design, category tag colours.
- Search, category filters, favourites, card expansion, copy.
- The sign-in button and the working sign-in page.
- Custom cursor and the mouse-following edge glow.
- All prompt titles, descriptions, examples, IDs — no content changes.

**Not deleted, only hidden**
- Chain Builder and the Prompt Composer no longer appear on the public page (your choice), but every file stays in place for a later decision.
- Chain templates and the `/templates` page stay reachable.

**Routes**
- `/login` is a fake sign-in that waits a second and pretends to authenticate. It will simply redirect to the real sign-in page, so no one can be fooled by it. Nothing about working authentication changes.

### One conflict to flag
Earlier you asked to drop the "Recommended" badge along with the rest of the gamification; the newer grid brief asks to keep it. I will **keep "Recommended"** on the first ten cards as a plain static highlight, and remove "Mastered". Say the word if you'd rather both go.

## Part 2 — Grid and card behaviour

- The grid becomes a real CSS grid: 5 columns on large desktop, 4 at 1280, 3 at 1024, 2 at 768, 1 on mobile. No masonry, no floating, no overlap.
- Every closed card gets the same height, so rows line up cleanly.
- Titles always reserve the same two lines and cut off with "…" instead of spilling onto a third line.
- Expanding a card grows the card itself; the row below moves down naturally. Nothing is absolutely positioned and no heights are measured in code.
- The existing open/close animation stays, kept light.
- Hover effects will not shift the layout, and there is no sideways scrolling at any width.

## Verification

Build, then check in the live preview at 1440, 1280, 1024, 768 and 390 px: grid columns, equal closed heights, two-line titles, expand/collapse, copy, favourite, search, category filter, sign-in page opens, custom cursor present, edge glow responds, and no architect button anywhere.

## Technical notes

- `src/components/PromptGrid.tsx`: drop the JS column distribution and `useColumnCount`; render one `.prompt-grid` container with responsive `grid-template-columns`. Keep the fade-in and the 40-at-a-time lazy loading.
- `src/index.css`: replace `.prompt-grid-flex` / `.prompt-grid-column` with grid rules; set a fixed closed card height on `.card-fixed-height` with `align-self: start` on grid items so expansion doesn't stretch siblings; add a two-line title clamp class with fixed `line-height` and reserved height.
- `src/components/PromptCard.tsx`: remove `useSelection`, `useGamification` and `useArchitect` usage, the select button, lock overlay, copy gating and the Mastered badge.
- `src/pages/Index.tsx`: remove view-mode state and toggles, `PromptComposer`, `ChainBuilder`, `ArchitectGate`, architect padding/class branches.
- `src/components/Header.tsx`: remove the architect badge/trigger and the performance toggle button.
- `src/components/ChainBuilder.tsx`, `ChainTemplatesPanel.tsx`, `Templates.tsx`, `SelectionContext.tsx`: strip architect branches; delete the progress/model tabs from Chain Builder. Files remain in the project.
- `src/pages/Login.tsx`: replace body with a `<Navigate to="/auth" replace />`.
- No database changes, no auth-provider changes, no edits to `src/data/prompts.ts`.
- Source control: this project's history is managed by Lovable; I can't run git commands, so I'll report changed files rather than a commit hash.
