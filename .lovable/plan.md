# Card Enrichment, Grid Fix, Full Copy, Publish and Card-Level CSV

This plan brings together everything approved and requested so far. Prompt IDs, titles, example prompts and the stored category names stay the same. Only the descriptions get longer, and new optional fields are added next to the existing ones.

## 1. Grid spacing and order
- Every card gets the same gap on all sides, both between columns and between cards in a column.
- The order reads row by row (1 2 3 in the first row, 4 5 6 in the second). Each column still moves on its own, so opening a card only pushes down cards in that column.

## 2. Card header and number
- The top row goes back to the tag on the left and favorite and copy on the right.
- The number moves back in front of the title with the same styling: "#1 Neural Pathway Reconstruction". The "#" sits on the same line as the number.

## 3. Longer descriptions (Option A, closed cards stay 300px)
- Each card gets a 2–3 sentence description: what the prompt does, how it works and what it is used for.
- A "Use when…" line and input tags such as [PROBLEM] or [QUERY] fill the empty space on closed cards.
- Wording stays honest. For example, "rewire neurons" becomes "constrains the reasoning steps". Titles stay unchanged.
- All 275 cards are written, and the original short description is kept in a separate field so nothing is lost.

## 4. Copyable hack prompts
- Quick copy (the prompt only) stays free for everyone.
- "Copy full card" copies the number, title, tag, description, Use when, prompt and Why it's a hack. You must be signed in to use it; signed-out visitors are sent to the sign-in page.

## 5. Tags and Recommended
- Check that the short tag names (Metacognition, Strategy, Analysis, Divergence, Psychology, Design) fit the cards in each group. Where a card fits poorly, flag it in the CSV instead of moving it.
- "Recommended" stops meaning "first 10 cards". It goes on a hand-picked set of core prompts, and on the top matches while you search.

## 6. Checks, security and publish
- Automated visual tests at all five screen widths: card order, gaps, each column opening on its own and no sideways overflow.
- Run a security scan and report problems and failures. Only error-level findings get fixed.
- Publish, then confirm the live site responds.
- GitHub: the GitHub repo can't be seen from here. I'll tell you where to find the connected repo name, under Connectors then GitHub.

## 7. Card-by-card CSV for database review (final step)
- `WhispererDeck_Cards_v2.csv` is collected from the finished cards on the live preview, one row per card, and checked against the source data.
- Columns: ID, Title, Category, Short tag, Description (new), Description (original), Use when, Input tags, Prompt, Why it's a hack, Score, Recommended, Fit flag, Character counts, Ready for database (yes/no + reason).
- It's added to the "WhispererDeck Review" collection.

## Technical details
- `HackPrompt` gets these optional fields: `descriptionShort`, `useWhen`, `inputTags[]`, `tags[]`. Search also looks at them.
- Grid: one shared gap token; round-robin columns keep the row-by-row reading order.
- The full copy uses `useAuth()` and sends signed-out users to `/auth`.
- The CSV comes from the rendered page (Playwright) and is compared by ID against `prompts.ts`.
- No database or sign-in setting changes.
