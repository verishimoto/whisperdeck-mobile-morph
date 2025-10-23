# WhisperDeck-Premium Specification
## Version 1.1 "Opal" • AI-Assisted Prompt Engineering System

---

## A. System Overview

### Core Principles
- **Uniform Card Architecture**: All cards maintain identical visual height regardless of content length
- **Constraint-Driven Design**: Enforce strict text length limits at the data layer to prevent overflow
- **Meta-Prompting Foundation**: Every prompt undergoes 20× self-refinement + 5× dialectical review cycles
- **Semantic Hierarchy**: Four-tier classification system (Beginner, Advanced, Premium, LovableX)

### Card Data Structure
Each prompt card contains:
1. **Name** (Original identifier, 2-4 words)
2. **Adjusted Title** (User-facing, optimized for clarity, 5-12 words)
3. **Why This Is a Hack** (Core value proposition, 25-40 words)
4. **Category/Tag** (Primary classification)
5. **Internal Commentary** (Meta-notes for future refinement, not user-facing)
6. **Semantic Tags** (Array: tier level, domain, technique type)

### Text Constraints (Enforced at Validation Layer)
- **Adjusted Title**: 60 characters max
- **Why This Is a Hack**: 280 characters max (≈40 words)
- **Description**: 150 characters max
- **Example**: 500 characters max
- **Advanced Example** (if applicable): 800 characters max

---

## B. UI/UX Design Specification

### Visual Identity: "Opal Glass"
**Color System** (HSL-based semantic tokens):
```
Primary Palette:
- opal-base: hsl(280, 70%, 65%)
- opal-glow: hsl(280, 80%, 75%)
- opal-deep: hsl(280, 65%, 45%)

Iridescent Shifts (animated gradient stops):
- cyan: hsl(180, 75%, 60%)
- violet: hsl(270, 70%, 65%)
- rose: hsl(330, 65%, 60%)
- amber: hsl(45, 80%, 65%)

Glass Effects:
- backdrop-blur: 24px
- background-opacity: 0.08 (light mode) / 0.12 (dark mode)
- border-opacity: 0.2
- edge-glow: 0 0 20px hsla(280, 80%, 70%, 0.3)
```

### Typography Stack
- **Headers**: Nimbus Sans Extended (fallback: system-ui)
  - H1: 3.5rem / 700 / tight
  - H2: 2.25rem / 600 / tight
  - H3: 1.5rem / 600 / normal
- **Body**: Inter (400-600 weights)
  - Base: 1rem / 400 / relaxed
  - Emphasis: 1rem / 500 / relaxed
- **Auxiliary**: Nirmala UI (fallback: sans-serif)
  - Tags/Metadata: 0.875rem / 400 / normal

### Layout System
**Grid Configuration**:
- Desktop (≥1280px): 3 columns, 24px gap
- Tablet (768-1279px): 2 columns, 20px gap
- Mobile (<768px): 1 column, 16px gap

**Card Anatomy** (fixed height: 320px):
```
┌─────────────────────────────────┐
│ [Score Badge]    [Category Tag] │ ← Header (48px)
│                                 │
│ Adjusted Title                  │ ← Title (72px)
│                                 │
│ Why This Is a Hack              │ ← Value Prop (80px)
│ (truncated if needed)           │
│                                 │
│ [Expand ▼]        [Copy Icon]   │ ← Actions (48px)
│─────────────────────────────────│
│ [Expandable Section - Hidden]   │ ← Overflow (0-∞px)
│ • Example                       │   (appears below on expand)
│ • Advanced Example              │
│ • Full "Why" text               │
└─────────────────────────────────┘
```

**Glass Card Styling**:
- Border-radius: 16px
- Box-shadow: 0 8px 32px rgba(0,0,0,0.1)
- Hover state: Lift (translateY -4px) + glow intensify
- Active state: Scale (0.98) + edge-glow pulse

### Animation Specifications
**Parallax Scroll**:
- Cards translate Y at 0.3× scroll speed
- Blur increases from 0px → 12px as element exits viewport

**Reveal Sequence** (on page load):
- Stagger: 80ms per card
- Opacity: 0 → 1 over 400ms
- TranslateY: 20px → 0px with cubic-bezier(0.4, 0, 0.2, 1)

**Interaction Transitions**:
- Hover: 200ms ease-out
- Expand/collapse: 300ms ease-in-out (height + opacity)
- Copy feedback: 150ms scale pulse on icon

### Responsiveness Rules
- Maintain 320px card height across all breakpoints
- On mobile: Reduce internal padding (24px → 16px)
- Font-size scales: Desktop 1× / Tablet 0.95× / Mobile 0.9×
- Premium badge shrinks from 120px → 80px on mobile

---

## C. Premium Workflow Specification

### Premium Trigger & Placement
**Trigger Conditions**:
1. User attempts to copy a "Premium" or "LovableX" tagged prompt
2. User clicks "View Advanced Example" on gated content
3. User filters specifically for premium-tier prompts

**Pop-Up Placement**:
- **Primary**: Modal overlay (centered, z-index: 1000)
- **Alternative**: Inline expansion within card (for gentle upsell)

**Pop-Up Components**:
```
┌─────────────────────────────────────┐
│  [×]                                │ ← Dismiss (top-right)
│                                     │
│  ✨ Premium Prompts                 │ ← Icon + Header
│                                     │
│  Unlock advanced techniques with:   │
│  • 200+ exclusive prompts           │
│  • Advanced examples & breakdowns   │
│  • Priority updates                 │
│                                     │
│  [Upgrade Now] [Maybe Later]        │ ← CTAs
└─────────────────────────────────────┘
```

**State Transitions**:
- **Free → Premium Teaser**: Show title + truncated "Why" + "Unlock" badge
- **Premium → Full Access**: Remove locks, show full examples, add "Premium" watermark

### Premium Theme Variant
**Enhanced Opal Styling**:
- Background iridescence: 20% more color saturation
- Edge glow: Thicker (2px vs 1px) + animated pulse (2s loop)
- Accent gradient: Rotate through 5 colors vs 3
- Border: Gold shimmer overlay (hsla(45, 90%, 60%, 0.4))

**Exclusive Elements**:
- Premium badge: Animated holographic texture
- Card footer: "Premium" watermark (subtle, 0.1 opacity)

### Access Logic (Spec-Level)
```
IF user.tier === "free":
  - Display: All free + beginner tags
  - Premium cards: Show preview only (title + truncated why)
  - Action: Clicking triggers premium pop-up

IF user.tier === "premium":
  - Display: All tiers including LovableX
  - Premium cards: Full access (examples, advanced content)
  - Visual: Premium theme active, gold accents

State Storage:
- Check user tier: Local storage (client) + database (server)
- Cache tier status: 5 min TTL
- Gating enforcement: Both frontend (UX) + backend (API)
```

---

## D. Prompt Engine & Verification System

### COVE (Chain of Verification) Routine
**20× Self-Refinement Cycle**:
```
FOR iteration 1 to 20:
  1. Generate prompt variant
  2. Check against clarity rubric (5 criteria)
  3. Measure semantic drift from original intent
  4. Compare length constraints (char count validation)
  5. IF all checks pass: Store variant
  6. ELSE: Re-generate with failure context
  
Output: Best 3 variants ranked by clarity + intent preservation
```

**Clarity Rubric** (scored 0-5 each):
- **Specificity**: Avoids vague terms ("better", "good")
- **Actionability**: Includes concrete next steps
- **Brevity**: Meets length constraints without padding
- **Unique Value**: Differentiates from similar prompts
- **Testability**: Can verify if prompt worked

### COT (Chain of Thought) Dialectical Review
**5× Argument vs Counterargument**:
```
Round 1: Thesis → Antithesis → Synthesis
Round 2: Challenge synthesis → Defend → Refine
Round 3: Edge case testing → Mitigation → Update
Round 4: Cross-category comparison → Differentiation → Polish
Round 5: Final verification → Human-readability check → Lock

Output: Change log showing evolution from round 1 → 5
```

**Delta Summarization**:
- Track word changes per round
- Flag if "Why This Is a Hack" meaning shifted >15%
- Preserve original if refinements reduced clarity

### "Cut Onto It, Not Into It" Principle
**Layered Reasoning** (not compression):
- Keep full context in backend (internal commentary field)
- Display layers progressively (title → why → example → advanced)
- Never truncate mid-sentence; use complete thoughts

### Contrast & Balance Checker
**Pre-Render Validation**:
```
FOR each card in batch:
  1. Count words in "Why This Is a Hack" (target: 30-40)
  2. Count chars in "Adjusted Title" (max: 60)
  3. Verify example exists (non-empty)
  4. Check semantic tags array (min: 3 tags)
  5. IF any fail: Reject + re-generate
  
Pass Criteria:
- Word count variance <10% across batch
- All cards fit 320px height in preview mode
```

### Debugging Prompt Catalog
**Common Failure Cases**:

1. **Overflow**:
   - Symptom: Card height >320px
   - Fix: Truncate example to 500 chars, move rest to "Advanced"

2. **Vagueness**:
   - Symptom: Clarity score <3/5
   - Fix: Add specific example, remove abstract terms

3. **Missing "Why"**:
   - Symptom: "Why This Is a Hack" empty or generic
   - Fix: Reverse-engineer from example, extract unique value

4. **Tag Mismatch**:
   - Symptom: Semantic tags don't match content
   - Fix: Re-tag using keyword extraction + manual review

5. **Duplicate Content**:
   - Symptom: >70% similarity to existing card
   - Fix: Merge or differentiate with new angle

---

## E. Data Pipeline & Backend (Spec-Level)

### Data Flow Architecture
```
┌─────────────────┐
│ WhisperDeck     │ (Source: Existing prompt database)
│ Scraper         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ CSV Ingestion   │ (Validation: Schema check + length bounds)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Semantic Tagger │ (AI: Categorize + assign tier + extract keywords)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ COVE/COT Engine │ (Refinement: 20× + 5× verification loops)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Card Generator  │ (Output: JSON objects with all fields)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Frontend Render │ (UI: Filter + sort + display with premium gating)
└─────────────────┘
```

### CSV Schema Definition
**File Format**: `prompts_export.csv`

**Required Columns** (order-sensitive):
```
name,adjusted_title,why_hack,category_tag,internal_commentary,semantic_tags,example,advanced_example,score

Example Row:
"Meta-Prompt","Self-Refining Prompt Generator","This teaches AI to critique its own output before finalizing, reducing iteration cycles by 60%","Reasoning","Original WhisperDeck #47; strong beginner appeal","beginner,meta-cognition,automation","Ask AI: 'Generate 3 versions of X, then critique each, then pick the best'","Use dialectical method: Generate thesis → antithesis → synthesis for controversial topics",8
```

**Field Specifications**:
- `name`: String, 2-20 chars, alphanumeric + spaces
- `adjusted_title`: String, 10-60 chars, must be unique
- `why_hack`: String, 50-280 chars, non-empty, starts with action verb
- `category_tag`: Enum [Reasoning, Creativity, Debugging, Meta, Advanced]
- `internal_commentary`: String, 0-500 chars, optional
- `semantic_tags`: Comma-separated, min 2, max 5 tags
- `example`: String, 50-500 chars, non-empty
- `advanced_example`: String, 0-800 chars, optional
- `score`: Integer, 1-10, based on impact/uniqueness

### Validation Rules (Enforced on Ingest)
**Automatic Rejections**:
- Missing required fields (name, adjusted_title, why_hack, example)
- Length violations (checked against specs in section A)
- Duplicate `adjusted_title` (case-insensitive match)
- Invalid category_tag (not in enum)
- Empty semantic_tags array

**Warnings (Manual Review)**:
- `score` missing (default to 5)
- `advanced_example` empty (flag for future enhancement)
- `why_hack` <50 chars (may lack depth)

### Consistency Mechanisms
**Version Control**:
- CSV stored in Git with date-stamped commits
- Schema changes tracked in separate `schema_changelog.md`

**Deduplication**:
- Hash `adjusted_title` + `example` (first 100 chars)
- Flag if hash collision (>85% similarity threshold)

**Audit Trail**:
- Log all ingests: timestamp, row count, rejection count
- Track field-level changes (before/after snapshots)

---

## F. Deliverables Checklist

### 1. Spec Document
✅ This Markdown file covering sections A-G

### 2. Prompt Card Template (Copy-Ready)
```markdown
## [Adjusted Title]

**Category**: [Category Tag]  
**Tier**: [Beginner/Advanced/Premium/LovableX]  
**Score**: [1-10]

### Why This Is a Hack
[25-40 word explanation of unique value. Starts with action verb. Quantifies impact when possible.]

### Example
[50-500 char demonstration. Includes AI instruction format. Shows input → output pattern.]

### Advanced Example (Optional)
[0-800 char deep-dive. Multi-step process or edge case handling.]

### Semantic Tags
`tag1`, `tag2`, `tag3`

---
Internal Commentary: [Meta-notes for future refinement. Not user-facing.]
```

### 3. Data Flow Description
**List Format** (as shown in Section E):
1. **Scrape**: Extract from WhisperDeck source
2. **Validate**: CSV schema + length checks
3. **Tag**: AI-powered categorization
4. **Refine**: 20× COVE + 5× COT loops
5. **Generate**: JSON card objects
6. **Render**: Frontend display with gating

**Simple Diagram** (ASCII):
```
[Source] → [CSV] → [Tagger] → [Verification] → [Cards] → [UI]
            ↓                      ↓
        [Reject]              [Change Log]
```

### 4. Verification Routine Documentation
**20× Self-Refinement**:
- Input: Raw prompt text
- Process: Clarity rubric scoring (5 criteria × 20 iterations)
- Stop Condition: Score ≥4.5/5 on all criteria OR 20 iterations complete
- Output: Top 3 variants with scores

**5× Dialectical Review**:
- Input: Best variant from 20× cycle
- Process: Thesis → Antithesis → Synthesis (5 rounds)
- Stop Condition: Semantic drift <10% from round 4 → 5
- Output: Final prompt + evolution change log

### 5. Premium UI Notes
**Pop-Up Placement**: Centered modal overlay (480px width on desktop)

**Theme Tokens** (extend base opal system):
```css
--premium-bg: hsla(280, 70%, 65%, 0.15);
--premium-border: hsla(45, 90%, 60%, 0.4); /* Gold shimmer */
--premium-glow: 0 0 24px hsla(280, 80%, 70%, 0.5);
--premium-accent: hsl(45, 90%, 60%); /* Gold */
```

**Interaction States**:
- Locked: Grayscale (0.6) + blur (4px) + "🔒" overlay
- Hover (on locked): Lift + preview (show first line of example)
- Unlocked: Full color + remove blur + animate gold border

---

## G. Risks & Mitigations

### Risk 1: Text Overflow / Uneven Card Heights
**Impact**: Breaks visual uniformity, layout shifts
**Likelihood**: High (without strict enforcement)

**Mitigations**:
1. **Hard Caps**: Validate length at ingest (reject non-compliant rows)
2. **Auto-Truncation**: CSS `overflow: hidden` + `text-overflow: ellipsis` as fallback
3. **Integrity Test**: "Why This Is a Hack" must be complete sentence (no mid-word cuts)
4. **Pre-Render Check**: Simulate card height in headless browser before deployment

**Success Metric**: 0% of cards exceed 320px in production

---

### Risk 2: Animation Performance on Low-End Devices
**Impact**: Janky scrolling, battery drain
**Likelihood**: Medium (parallax + blur are GPU-intensive)

**Mitigations**:
1. **Feature Detection**: Use `prefers-reduced-motion` media query to disable animations
2. **Blur Reduction**: Cap at 8px on devices with <4GB RAM (detect via JS)
3. **CSS Transform Priority**: Use `transform: translateY()` (GPU) over `top` (CPU)
4. **Debounce**: Throttle parallax scroll listener to 16ms (60fps)

**Success Metric**: Maintain ≥45fps on iPhone SE (2020) during scroll

---

### Risk 3: CSV Data Drift
**Impact**: Schema mismatches, missing fields, duplicate entries
**Likelihood**: Medium (manual edits, scraper bugs)

**Mitigations**:
1. **Validation on Ingest**: Reject rows missing core fields (automated)
2. **Schema Locking**: Define TypeScript interfaces matching CSV columns
3. **Deduplication**: Hash-based check before adding to database
4. **Manual Review Queue**: Flag rows with warnings (score missing, short why_hack)
5. **Rollback Mechanism**: Git versioning allows revert to last known-good CSV

**Success Metric**: <5% rejection rate on ingests; 0% duplicate cards in production

---

### Risk 4: Premium Paywall Confusion
**Impact**: Users frustrated by unclear access limitations
**Likelihood**: Low (if messaging is clear)

**Mitigations**:
1. **Visual Clarity**: Use 🔒 icon + "Premium" badge consistently
2. **Transparent Pricing**: Link to pricing page from pop-up (not buried)
3. **Free Preview**: Show enough content to demonstrate value (title + why_hack)
4. **Soft Upsell**: "Maybe Later" option vs aggressive blocking

**Success Metric**: <10% support tickets about access confusion

---

### Risk 5: Verification Loop Overfitting
**Impact**: Prompts become too polished, lose authenticity
**Likelihood**: Medium (20× refinement can homogenize voice)

**Mitigations**:
1. **Preserve Original**: Store raw version in `internal_commentary`
2. **Drift Threshold**: Reject refinements if >25% semantic change
3. **Human-in-Loop**: Final review by curator before batch approval
4. **A/B Testing**: Compare user engagement (free vs refined versions)

**Success Metric**: User preference score ≥4/5 for refined vs original

---

## H. Implementation Phases (Roadmap)

### Phase 1: MVP (Weeks 1-3)
- [ ] CSV schema finalized + sample data (50 prompts)
- [ ] Basic card UI (no premium features)
- [ ] Single-pass verification (5× COT only)
- [ ] Desktop-only responsive design

### Phase 2: Core Features (Weeks 4-6)
- [ ] Premium pop-up + gating logic
- [ ] 20× COVE refinement pipeline
- [ ] Mobile responsive layout
- [ ] Animation implementation (parallax + reveal)

### Phase 3: Polish (Weeks 7-8)
- [ ] Premium theme variant
- [ ] Advanced example expansion
- [ ] Performance optimization (lazy loading, blur reduction)
- [ ] A/B testing setup

### Phase 4: Scale (Weeks 9+)
- [ ] Full WhisperDeck scrape (500+ prompts)
- [ ] Automated re-ingestion (weekly sync)
- [ ] Analytics dashboard (card engagement metrics)
- [ ] User feedback loop (voting, comments)

---

## Appendix A: Example Card (JSON Format)

```json
{
  "id": "wp_047",
  "name": "Meta-Prompt",
  "adjusted_title": "Self-Refining Prompt Generator",
  "why_hack": "This teaches AI to critique its own output before finalizing, reducing iteration cycles by 60% and improving first-draft quality.",
  "category_tag": "Reasoning",
  "semantic_tags": ["beginner", "meta-cognition", "automation", "efficiency"],
  "example": "Prompt: 'Generate 3 product descriptions, critique each for clarity and appeal, then output only the best version.'",
  "advanced_example": "Use dialectical method: 'Generate a thesis on X, then argue the opposite (antithesis), finally synthesize both into a balanced conclusion.' Ideal for controversial topics.",
  "score": 8,
  "tier": "free",
  "internal_commentary": "Original WhisperDeck #47. Strong beginner appeal. Consider adding code-generation variant for advanced tier.",
  "created_at": "2025-01-15T10:30:00Z",
  "last_verified": "2025-01-20T14:22:00Z"
}
```

---

## Appendix B: Glossary

- **COVE**: Chain of Verification (iterative refinement with rubric scoring)
- **COT**: Chain of Thought (dialectical reasoning process)
- **Semantic Tags**: Metadata for filtering (tier, domain, technique type)
- **Glass Card**: UI component with glassmorphism styling
- **Premium Tier**: Paid access level unlocking advanced prompts
- **Opal Theme**: Iridescent color system with cyan/violet/rose/amber shifts

---

## Final Notes

**This specification is designed to be**:
- **Modular**: Each section can be implemented independently
- **Testable**: Success metrics defined for each risk
- **Scalable**: CSV pipeline supports 100s → 1000s of prompts
- **Designer-Friendly**: Visual specs use named tokens (no hardcoded hex)
- **Engineer-Friendly**: Data flow + validation rules are explicit

**Next Steps**:
1. Share this spec with UI/UX designer for mockups
2. Backend engineer implements CSV validation + ingestion
3. Frontend engineer builds card component + grid layout
4. AI engineer sets up COVE/COT verification pipeline
5. QA tests against constraints (height, length, performance)

**Maintenance**:
- Review this spec quarterly as WhisperDeck source evolves
- Update validation rules if new prompt categories emerge
- A/B test refinement loops (10× vs 20× vs 30×) for efficiency

---

**Document Version**: 1.1.0  
**Last Updated**: 2025-01-20  
**Owner**: WhisperDeck Team  
**Status**: Ready for Implementation