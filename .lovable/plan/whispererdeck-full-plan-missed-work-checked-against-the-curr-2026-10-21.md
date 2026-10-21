# WhispererDeck Full Plan: Missed Work Checked Against the Current Preview

Every idea from earlier in this chat is listed here with its status in the current preview. Prompt IDs, titles, example prompts and the stored category names stay the same unless noted.

## Status in the current preview

| # | Item | Status now | Action |
|---|---|---|---|
| 1 | Cursor safety fix | Done | Keep |
| 2 | Independent columns (opening a card moves only its column) | Done | Keep, add tests |
| 3 | Short tag names + tooltip | Done | Review if they fit (step 6) |
| 4 | Number placement | "#ID" sits next to the tag (you rejected this) | Move "#1" in front of the title |
| 5 | Equal gaps, 1-2-3 / 4-5-6 order | Gaps are 1.5rem but uneven around cards; order is row by row | One shared gap, about 25% tighter (18px) |
| 6 | Longer descriptions (Option A) | Not started: descriptions are 4–10 words, and no card has extra fields | Write all 275 |
| 7 | "Use when…" + input tags on closed cards | Not started | Add |
| 8 | Copy the full card (sign-in required) | Not started: copy only grabs the prompt | Add |
| 9 | Multi-card selection copy (with a limit) | Not started | Add, signed in only, up to 5 |
| 10 | Recommended badge | Still just the first 10 cards | Hand-picked core set + top search matches |
| 11 | AI Finder (describe a task, get ranked prompts) | Not started | Add with Lovable AI |
| 12 | Visual regression tests | Only the cursor test exists | Add for all 5 widths |
| 13 | Light-mode contrast (95 failures) | Not fixed | Fix light-mode colors only |
| 14 | Richer color for open cards | Not started | Restrained violet-blue surface, behind the speed check |
| 15 | Filters and search line up | Not done (1280 vs 1600 widths) | Use one width |
| 16 | Account menu, initials or photo, sign out | Not started | Add |
| 17 | "Welcome, Architect!" for vg.contato@gmail.com | Not started | Display-only greeting |
| 18 | Page title / description | Still the old "Enterprise… 250+" title | Change to WhispererDeck + subtitle |
| 19 | Templates save (database access missing) | Broken | Fix access rules (needs your OK) |
| 20 | Leaked-password protection | Warning only | Turn on (needs your OK) |
| 21 | Card-by-card CSV for database review | Not started | Final step |
| 22 | Profile onboarding (one question per screen, Mercor style) | Not started | Later sprint (reminder kept) |
| 23 | Shareable links, Markdown copy, similar prompts, category counts | Not started | Later |
| 24 | Prompts moved into the database + admin editing | Not started | Later |

## Build order

1. **Layout:** "#1" in front of the title, one even gap, filters and search lined up, page title fixed.
2. **Content:** a 2–3 sentence description, a "Use when…" line and input tags for all 275 cards. The original short text is kept in its own field. Wording stays honest, for example "constrains reasoning steps" instead of "rewires neurons".
3. **Copy:** quick copy stays free. "Copy full card" and multi-select copy (up to 5) need sign-in, and signed-out visitors go to the sign-in page.
4. **Recommended + AI Finder:** a hand-picked core set (#1, #6, #28, #54, #251…) plus top search matches. The AI Finder ranks 3–5 cards and explains why each fits, and matching cards shimmer once.
5. **Account:** a menu with initials or Google photo, email and sign out, plus the Architect greeting (display only).
6. **Visual:** light-mode contrast fixes and the open-card color. The moving border stays as it is.
7. **Tag check:** look at every card under its tag. Cards that fit poorly are flagged in the CSV, not moved.
8. **Checks:** visual tests at 1440, 1280, 1024, 768 and 390, a security scan (only errors get fixed), then publish and confirm the live site.
9. **CSV:** `WhispererDeck_Cards_v2.csv`, collected card by card from the finished preview and matched against the source by ID. Columns: ID, Title, Category, Short tag, New description, Original description, Use when, Input tags, Prompt, Why it's a hack, Score, Recommended, Tag-fit flag, Character counts, Database-ready (yes/no + reason). It's added to the "WhispererDeck Review" collection.

GitHub: the connected repo isn't visible from here. You can find its name in Connectors, then GitHub.

## Technical details
- `HackPrompt` gets these optional fields: `descriptionShort`, `useWhen`, `inputTags[]`, `tags[]`. Fuse search adds them with small weights.
- Grid: one gap token used for both the column gap and the stack gap. Round-robin distribution stays.
- AI Finder: an edge function that calls the AI Gateway with structured output `{id, score, reason}`. The key stays on the server, and 429 and 402 errors are handled.
- Copy gating uses `useAuth()`. The Architect greeting is display only and gives no extra rights.
- Items 19–20 change database or sign-in settings and are done only after your explicit approval.
- `roadmap.md` is updated with this list at the start of building.
