# Restore independent prompt columns

## What changes

The current library renders every card as a direct child of one CSS grid. That grid shares row tracks: expanding one card increases its row height and moves cards below it in *all* columns. Replace only this layout arrangement with a responsive grid of independent column containers, each containing its own vertical stack of cards. Expanding a card will then push down only later cards in that column.

Keep the existing card visuals, 300px closed height, two-line title clamp, inline expanded content and lightweight animation. Do not change prompt data, sorting, searching, filters, favorites, copying, authentication, cursor or edge glow. Keep lazy loading and the public-library-only page.

## Ordering and breakpoints

Distribute the already filtered/sorted list round-robin into 5, 4, 3, 2 or 1 stable columns. This preserves the visible left-to-right order of the first row and continues predictably in successive rows while cards are closed. When a card expands, the stacks intentionally diverge vertically; prompt numbers and list order remain unchanged. Each column is a single DOM group, so keyboard/screen-reader traversal proceeds down one column before the next rather than across each visual row; this trade-off will be disclosed, not disguised as row-major accessibility order.

Use viewport-aware column count matching the current breakpoints: ≥1440: 5; 1181–1439: 4; 901–1180: 3; 641–900: 2; ≤640: 1. A width change redistributes cards, without altering their source order. Preserve stable card keys and the existing 40-at-a-time loading. Avoid CSS multicolumn reflow, absolute positioning, overlap, height measurements or animation libraries.

## Technical scope

- `src/components/PromptGrid.tsx`: compute column count from the same media breakpoints; partition the displayed cards into arrays by list index modulo column count; render one outer grid with one flex-column stack per track. Keep the existing card index mapping, loading control, summary and empty state.
- `src/index.css`: move item spacing and fade-in rules to the independent-column structure; retain existing responsive track counts and card/title styling. No shared card row tracks.
- `src/components/PromptCard.tsx` and `src/pages/Index.tsx`: leave unchanged unless validation reveals a narrowly related issue.

The preview currently also records a cursor event error (`target.closest is not a function`). Do not change cursor behavior as part of the layout work; if it recurs in validation, report it separately rather than claiming zero console errors.

## Validation before completion

Build and test the live library at 1440, 1280, 1024, 768 and 390px. At 1440px, expand cards in columns 1, 2 and 5; measure that only subsequent cards in the active column move, including with two columns open simultaneously, then collapse each independently. Repeat column-isolation checks at the remaining breakpoints. Check closed heights, title clamp, no overlap or horizontal overflow, loading, and console errors. Report exact files changed, architecture and ordering trade-off, observed results per width, build result and any unresolved error; do not claim success based on column count alone.
