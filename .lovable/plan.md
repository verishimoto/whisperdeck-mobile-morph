# CoVe + Prismatic Review: Labels, Data and Card Information

The same review as before, this time applied to the prompt data. It covers the category labels, the fields stored for each card and what a card shows. This is a review plan only. Every ID, title, example and explanation stays as it is unless you approve a specific change.

## 1. Verification matrix (what the evidence shows)

| # | Idea | Verified fact | Verdict |
|---|---|---|---|
| 1 | Single-word labels (e.g. "Meta-Cognition") | 6 labels in use; 4 are two words and cause pill wrapping in the filter bar | Keep: short display label + full label as tooltip |
| 2 | Richer descriptions | Current descriptions are 4–10 words; history shows no richer versions were lost | Keep, but only for cards flagged in the review file |
| 3 | Cards closed at the same 1:1 height | Closed cards are 300px; the empty space comes from short descriptions | Depends on #2 |
| 4 | "Score" as a difficulty level | Score has no rubric; it only drives sorting | Fix: define a rubric or rename it as editorial order |
| 5 | "Recommended" badge | It just marks the first 10 cards; it has no meaning | Replace with a search-based or AI-ranked badge (AI Finder exists) |
| 6 | Number shown as a small "#" before the tag | The number is the stable ID; showing it is presentation only | Keep, low risk |
| 7 | Labels and cards moved into the database | All 275 cards are built into the app; only templates are in the database | Defer: no benefit until admin editing exists |
| 8 | Extra fields (use case, input placeholder, model fit, difficulty) | Review flags show missing input placeholders in many examples | Keep as optional fields, filled in batches |
| 9 | Tags beyond the single category | Each card has exactly one category | Keep: 2–3 secondary tags help search and AI ranking |

## 2. Prismatic review (each angle in one line)

- **Reader:** a 4–10-word description doesn't say when to use the prompt. A short "Use when…" line is worth more than a longer description.
- **Search/AI:** secondary tags and a use-case line make search and AI Finder results much better at no visual cost.
- **Visual:** shorter labels align the filter pills with search, and the "# + tag" header row frees up space for the title.
- **Data integrity:** new fields are added alongside the old ones. Nothing is renamed or overwritten, and IDs stay unchanged.
- **Performance:** the data file grows about 30%; it stays in the app with no extra loading.
- **Future profile matching:** tags and use-case are the hooks that later profile answers (profession, problems) can match against.

## 3. Ideas left out that would build on the live site

- Shareable card links (/#78) that open and scroll to a card.
- A "Copy as Markdown" format alongside the full-card copy.
- A "Similar prompts" row inside an open card, based on shared tags.
- Category counts and a short description for each category in the filter pills.

## 4. Proposed phases (each needs your approval)

1. **Label pass:** short display names plus tooltips, with the colors kept. Display only.
2. **Data fields:** add optional `useWhen`, `tags[]`, `inputHint` and `scoreBasis`. Write a draft CSV for your review first; nothing goes into the app until you approve it.
3. **Card header:** "#78" in small raised text before the tag, aligned with the icons along the bottom; the title gets more line spacing; "Use when…" shows on closed cards so the empty space gets used.
4. **Recommended:** driven by search and AI Finder results instead of position.
5. **Later:** moving cards into the database, admin editing, profile matching.

## Technical details

- Add optional fields to the prompt record; old data remains valid.
- Batch drafts are exported to a review CSV with the ID as the key, then merged only after approval.
- The fuzzy search and the AI ranking take in `tags` and `useWhen`.
- No database or sign-in changes.
