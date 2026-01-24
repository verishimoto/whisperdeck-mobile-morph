
# Liquid Glass Apple UI Overhaul - Complete Implementation Plan

## Overview
Transform WhispererDeck into a modern 2026 iOS-inspired liquid glass interface with mouse-reactive iridescent effects, proper light/dark theme support, and refined glassmorphism aesthetics.

---

## Phase 1: Theme System & Light Mode

### 1.1 Add Light Mode CSS Variables (`src/index.css`)
Create a complete light mode palette with Apple-style iridescent colors:

```css
.light {
  --background: 220 20% 98%;
  --foreground: 220 15% 10%;
  
  /* Light mode opal palette - soft pastels */
  --opal-purple: 280 60% 75%;
  --opal-cyan: 180 50% 65%;
  --opal-pink: 320 55% 80%;
  --opal-green: 150 45% 70%;
  --opal-blue: 210 55% 72%;
  
  /* Glass effects - frosted white */
  --card: 0 0% 100%;
  --glass-bg: 0 0% 100% / 0.65;
  --glass-border: 220 30% 80% / 0.4;
}
```

### 1.2 Integrate next-themes (`src/App.tsx`)
Add ThemeProvider wrapper for proper theme switching:

```tsx
import { ThemeProvider } from 'next-themes';

<ThemeProvider attribute="class" defaultTheme="dark">
  <ArchitectProvider>
    {/* ... */}
  </ArchitectProvider>
</ThemeProvider>
```

### 1.3 Connect Theme Toggle (`src/components/Header.tsx`)
Replace local state with `useTheme()` hook:

```tsx
import { useTheme } from 'next-themes';

const { theme, setTheme } = useTheme();

<button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
  {theme === 'dark' ? <Sun /> : <Moon />}
</button>
```

---

## Phase 2: Liquid Glass Card System

### 2.1 Pure Glass Card Styling (`src/index.css`)
Create truly transparent glass cards with refined effects:

```css
.liquid-glass-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.03) 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(40px) saturate(180%) brightness(1.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.15),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Noise texture for glass realism */
.liquid-glass-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,...noise...");
  opacity: 0.025;
  pointer-events: none;
  border-radius: inherit;
}

/* Light mode glass */
.light .liquid-glass-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.75) 0%,
    rgba(255, 255, 255, 0.5) 100%
  );
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}
```

### 2.2 Iridescent Border Flares (`src/index.css`)
Add animated rainbow edge effects that respond to hover:

```css
.liquid-glass-card::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(
    var(--iridescent-angle, 135deg),
    hsl(280 95% 82% / 0),
    hsl(180 100% 70% / 0.3),
    hsl(320 95% 85% / 0.4),
    hsl(150 85% 75% / 0.3),
    hsl(210 100% 78% / 0)
  );
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
  z-index: -1;
}

.liquid-glass-card:hover::after {
  opacity: 1;
  animation: iridescent-shift 3s linear infinite;
}

@keyframes iridescent-shift {
  0% { --iridescent-angle: 0deg; }
  100% { --iridescent-angle: 360deg; }
}
```

### 2.3 Update PromptCard Component (`src/components/PromptCard.tsx`)
Replace current glass styling with new liquid glass class:

```tsx
<div className={`
  liquid-glass-card 
  relative w-full rounded-2xl 
  transform-gpu transition-all duration-400
  ${isHovered ? 'scale-[1.02] shadow-2xl' : ''}
`}>
```

---

## Phase 3: Mouse-Reactive Effects

### 3.1 Enhanced Custom Cursor (`src/components/CustomCursor.tsx`)
Add iridescent glow that intensifies near card edges:

```tsx
const [nearCard, setNearCard] = useState(false);
const [cardDistance, setCardDistance] = useState(100);

// Detect proximity to cards
const checkCardProximity = (x: number, y: number) => {
  const cards = document.querySelectorAll('.liquid-glass-card');
  let minDist = Infinity;
  
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const dist = distanceToRect(x, y, rect);
    if (dist < minDist) minDist = dist;
  });
  
  setNearCard(minDist < 50);
  setCardDistance(minDist);
};
```

### 3.2 Cursor Iridescent Glow Styles (`src/index.css`)

```css
#custom-cursor {
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.4) 0%,
    transparent 70%
  );
  transition: all 0.15s ease-out;
}

#custom-cursor.near-card {
  width: 48px;
  height: 48px;
  background: radial-gradient(
    circle,
    hsl(var(--opal-purple) / 0.4) 0%,
    hsl(var(--opal-cyan) / 0.3) 35%,
    hsl(var(--opal-pink) / 0.2) 60%,
    transparent 80%
  );
  border: 1px solid hsl(var(--opal-purple) / 0.5);
  box-shadow: 
    0 0 30px hsl(var(--opal-purple) / 0.4),
    0 0 60px hsl(var(--opal-cyan) / 0.2);
}
```

### 3.3 Mouse-Reactive Background Gradient (`src/index.css`)
Add subtle mouse-following glow to background:

```css
#mouse-glow {
  position: fixed;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    hsl(var(--opal-purple) / 0.08) 0%,
    transparent 70%
  );
  filter: blur(100px);
  pointer-events: none;
  z-index: -1;
  transition: transform 0.3s ease-out;
}
```

---

## Phase 4: Background & Visual Effects

### 4.1 Optimized Motion Background (`src/index.css`)
Keep opal gradient but optimize for GPU performance:

```css
#root::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -2;
  background: 
    radial-gradient(ellipse at 20% 30%, hsl(280 95% 82% / 0.35), transparent 50%),
    radial-gradient(ellipse at 80% 20%, hsl(180 100% 70% / 0.3), transparent 45%),
    radial-gradient(ellipse at 40% 70%, hsl(320 95% 85% / 0.35), transparent 50%),
    radial-gradient(ellipse at 70% 80%, hsl(150 85% 75% / 0.3), transparent 48%),
    radial-gradient(ellipse at 50% 50%, hsl(210 100% 78% / 0.25), transparent 55%),
    linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #0a0a12 100%);
  filter: blur(80px) saturate(1.3);
  will-change: transform;
  animation: bg-drift 30s ease-in-out infinite alternate;
}

/* Light mode background */
.light #root::before {
  background:
    radial-gradient(ellipse at 20% 30%, hsl(280 60% 85% / 0.4), transparent 50%),
    radial-gradient(ellipse at 80% 20%, hsl(180 50% 80% / 0.35), transparent 45%),
    radial-gradient(ellipse at 40% 70%, hsl(320 55% 88% / 0.35), transparent 50%),
    radial-gradient(ellipse at 70% 80%, hsl(150 45% 82% / 0.3), transparent 48%),
    radial-gradient(ellipse at 50% 50%, hsl(210 55% 85% / 0.3), transparent 55%),
    linear-gradient(135deg, #f8f9fc 0%, #f0f2f8 50%, #f5f7fc 100%);
  filter: blur(60px) saturate(1.1);
}

@keyframes bg-drift {
  0% { transform: scale(1) translate(0, 0); }
  100% { transform: scale(1.05) translate(2%, 2%); }
}
```

### 4.2 Subtle Noise Texture Overlay (`src/index.css`)

```css
#root::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E");
  opacity: 0.4;
  pointer-events: none;
}
```

---

## Phase 5: Header Refinement

### 5.1 Compact Header with Better Heuristics (`src/components/Header.tsx`)

```tsx
<header className="sticky top-0 z-50 liquid-glass-header">
  <div className="px-6 py-3 flex items-center justify-between">
    {/* Brand - San Francisco inspired */}
    <h1 className="font-sf text-2xl font-semibold tracking-tight text-white/90">
      WhispererDeck
    </h1>
    
    {/* Tagline - minimal */}
    <p className="hidden md:block text-xs text-white/50 font-light tracking-widest uppercase">
      Advanced LLM Prompts
    </p>
    
    {/* Actions */}
    <div className="flex gap-2">
      {/* Hide Settings button for now */}
      <ThemeToggle />
    </div>
  </div>
</header>
```

### 5.2 Header Glass Styling

```css
.liquid-glass-header {
  background: linear-gradient(
    180deg,
    rgba(10, 10, 15, 0.7) 0%,
    rgba(10, 10, 15, 0.5) 100%
  );
  backdrop-filter: blur(40px) saturate(150%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.light .liquid-glass-header {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.85) 0%,
    rgba(255, 255, 255, 0.7) 100%
  );
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
```

---

## Phase 6: Interactive Tags & Category Menu

### 6.1 Hoverable Tags with Glow (`src/components/PromptCard.tsx`)

```tsx
<Badge 
  className={`
    cursor-pointer
    bg-${categoryColor}/10 
    border-${categoryColor}/20 
    text-${categoryColor}
    transition-all duration-200
    hover:bg-${categoryColor}/20
    hover:border-${categoryColor}/50
    hover:shadow-[0_0_12px_hsl(var(--${categoryColor})/0.3)]
  `}
  onClick={(e) => {
    e.stopPropagation();
    onCategoryFilter?.(prompt.category);
  }}
>
  {prompt.category}
</Badge>
```

### 6.2 Color-Coded Category Menu (`src/components/CategoryFilter.tsx`)
Match menu buttons to their category tag colors:

```tsx
{categories.map((category) => {
  const colorVar = categoryColorMap[category];
  return (
    <button
      className={`
        liquid-glass-button
        border-${colorVar}/30
        hover:border-${colorVar}/60
        hover:bg-${colorVar}/15
        ${isSelected ? `bg-${colorVar}/25 border-${colorVar}/70` : ''}
      `}
    >
      {category}
    </button>
  );
})}
```

### 6.3 Preserve Static Prompt Numbers
Ensure prompt `index` is computed from original dataset position, not filtered position:

```tsx
// In PromptGrid.tsx
{prompts.map((prompt) => {
  // Use the prompt's original ID for rank, not filtered index
  const originalIndex = hackPrompts.findIndex(p => p.id === prompt.id);
  return (
    <PromptCard 
      prompt={prompt} 
      index={originalIndex}  // Static rank based on original position
    />
  );
})}
```

---

## Phase 7: Architect Mode - Daily Reset

### 7.1 Update ArchitectContext (`src/contexts/ArchitectContext.tsx`)
Make architect session expire daily:

```tsx
const STORAGE_KEY = "whisperdeck_architect";
const SESSION_DATE_KEY = "whisperdeck_architect_date";

const [isArchitect, setIsArchitect] = useState(() => {
  const storedValue = localStorage.getItem(STORAGE_KEY);
  const storedDate = localStorage.getItem(SESSION_DATE_KEY);
  const today = new Date().toDateString();
  
  // Expire architect session if it's a new day
  if (storedDate !== today) {
    localStorage.removeItem(STORAGE_KEY);
    return false;
  }
  return storedValue === 'true';
});

// When setting architect mode, also store the date
const checkPassword = (input: string): boolean => {
  if (input.toLowerCase().trim() === ARCHITECT_PASSWORD) {
    setIsArchitect(true);
    localStorage.setItem(STORAGE_KEY, 'true');
    localStorage.setItem(SESSION_DATE_KEY, new Date().toDateString());
    return true;
  }
  return false;
};
```

---

## Phase 8: Typography Refinement

### 8.1 San Francisco Font Stack for H1/H2 (`src/index.css`)

```css
h1, h2 {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 
               'Helvetica Neue', 'Inter', sans-serif;
  font-weight: 600;
  letter-spacing: -0.02em;
}

h1 {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  line-height: 1.1;
}

h2 {
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  line-height: 1.2;
}
```

---

## Files Modified Summary

| File | Changes |
|------|---------|
| `src/index.css` | Light mode variables, liquid glass classes, iridescent effects, background optimization, noise texture, header glass, typography |
| `src/App.tsx` | Add ThemeProvider wrapper |
| `src/components/Header.tsx` | Connect useTheme, compact layout, hide Settings |
| `src/components/PromptCard.tsx` | Liquid glass styling, hoverable tags with click |
| `src/components/PromptGrid.tsx` | Static prompt numbering from original dataset |
| `src/components/CategoryFilter.tsx` | Color-coded buttons matching tags |
| `src/components/CustomCursor.tsx` | Iridescent glow near cards |
| `src/contexts/ArchitectContext.tsx` | Daily session expiry |

---

## Technical Considerations

### GPU Performance
- Use `will-change: transform` sparingly
- Limit blur radius to 40-80px
- Use CSS transforms instead of position changes
- Reduce animation complexity on mobile with `@media (prefers-reduced-motion)`

### Accessibility
- Maintain WCAG contrast ratios in both themes
- Respect `prefers-reduced-motion` for all animations
- Ensure focus states remain visible

### Browser Compatibility
- Fallback for `backdrop-filter` on unsupported browsers
- CSS custom properties with fallback values
- `-webkit-backdrop-filter` prefix for Safari
