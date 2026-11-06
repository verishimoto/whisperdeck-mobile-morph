# Project architecture

- Render prompt-library cards in round-robin independent column stacks, with viewport breakpoints matched to CSS; this prevents one expanded card from shifting cards in other columns.- AI features (AI Finder, Adapt) run only in the `prompt-ai` edge function and require a signed-in user; the browser never holds the AI key, which protects credits.
- Recommended badges are computed in `Index.tsx` (curated set while browsing, top matches while searching or using AI Finder), never by list position, so the badge carries meaning.
- Modal content must not use the layout-oriented `liquid-glass-card` class: its relative positioning and hover transforms override viewport placement.
- On-demand Prompt Chains uses a separate dialog with selected-card snapshots; the preserved legacy builder is not mounted because its execution action only records gamification.
