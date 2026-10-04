# WhispererDeck: immediate fix and evidence-led review

## Goal
Fix the custom-cursor error now, preserve the current library, and produce the data and design evidence needed before changing card content or visual direction. No card redesign, copy gate, profile flow, or authentication change in this phase.

## Work
1. **Cursor safety:** Guard event targets before calling `closest()` in the custom cursor's enter/leave handlers. Keep the existing cursor, mouse-following edge glow, observer, and performance gates unchanged. Reproduce the non-Element target case and verify ordinary hover and glow still work.
2. **Current-data export:** Export all 275 current prompts into a reviewable CSV, keyed by immutable ID and including title, category, description, example prompt, “why this is a hack,” and existing score. Keep the app's prompt source unchanged; label this export as a snapshot, not proposed copy.
3. **Prompt archaeology:** Compare the available historical source revisions against the current 275 by stable ID. A 250-prompt source revision exists, as do later 275-prompt revisions; some earliest revisions only contained 12 entries. Record which revisions and fields were actually compared, additions and changed/unchanged text, and distinguish missing earlier prompts from deletions. Produce a concise per-prompt review map for the original 250 plus the 25 later prompts, flagging only candidates for expanded descriptions, title wrapping, prompt usability, and clearer “why” explanations. Preserve every current title, category, ID, example, and explanation for now. Do not manufacture missing history or create 250 duplicate app files; the numbered review map identifies prompts by their existing IDs.
4. **Design-system critique:** Document the current tokens, type stacks and roles, card states, category colors, spacing, motion, and responsive rules using current source and screenshots. Assess the empty area within fixed 300px closed cards, two-line title wrapping, number placement, search/filter alignment, and glass/edge effects; recommend small options rather than applying a redesign. Explicitly keep natural expanded height and independent column stacks.
5. **Light-mode contrast audit:** Measure actual rendered foreground/background combinations at representative desktop and mobile widths, including body text, descriptions, tags, controls, placeholders and expanded “why” panels. Report WCAG contrast failures and targeted token-level fixes as recommendations; defer the broader light-mode visual revision as requested.
6. **Validation and handoff:** Test hover with ordinary and unusual event targets, expansion and card controls across light/dark, check console and automatic build result. Deliver the CSV and review documents as files, with a short prioritized list of subsequent design decisions and unresolved issues. No database or OAuth configuration changes.

## Decisions reserved for the next phase
- Prototype a more saturated open-card surface and denser grid spacing while retaining the iridescent border and performance limits; do not add a four-stop gradient or refraction until visually compared and performance-checked.
- Decide title/description rewrites per prompt from the historical comparison, not a blanket expansion; keep closed cards equal-height and open cards content-height.
- Plan multi-card copy, complete-card copy format, sign-in gating, recommended search results, profile questions, avatar, account menu, and architect greeting separately. These change access and user data, and are not part of the immediate review. Before any authentication implementation, confirm whether user profiles are needed and define safe access rules; a frontend-only copy block cannot protect publicly shipped prompt text.

## Technical scope
- Cursor fix limited to `src/components/CustomCursor.tsx` and a focused regression test if suitable.
- Read-only data and UI analysis against `src/data/prompts.ts`, historical repository revisions, `PromptCard`, `PromptGrid`, `CategoryFilter`, `Header`, theme styles and search logic. Review deliverables live outside app source; no prompt-data edits.
- Do not remove the existing card order, favorites, cursor glow, auth route, or Chain Builder/Templates code.
