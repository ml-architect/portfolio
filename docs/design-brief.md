# Design Brief: Portfolio Site (ml-architect.github.io/portfolio)

Consolidated design reference extracted from UI/UX video notes and portfolio inspiration research.
Dark theme SSG portfolio with Nuxt 3, GSAP, Tailwind CSS v4.

---

## 1. Key Design Principles

### 1.1. User Intent First
- Every page starts with one question: "Why is the visitor here?" For a portfolio the answer is: see who I am, what I have built, and how to contact me. The hero section must answer the first question immediately; project cards answer the second; a visible contact CTA answers the third.
- Expand complexity only as the user's intent deepens (progressive disclosure). Do not dump everything on the first screen.

### 1.2. Convention Over Invention
- Information flows top-to-bottom, left-to-right.
- Navigation lives at the top.
- CTA buttons are visually prominent and predictable.
- Deviate from patterns only with a deliberate reason, never by accident.

### 1.3. Uniqueness Through Details, Not Layout Gimmicks
- Stand out with micro-interactions, subtle animations, and polish, not by breaking standard layouts.
- Every invisible detail (transition, hover state, loading feedback) compounds into the feeling of a carefully crafted product.

### 1.4. Design as Storytelling
- Treat the portfolio as a narrative, not a gallery. Guide the visitor through a story: who you are, what problems you solve, proof of work, and a call to action.
- Copy should be warm and direct. Replace corporate jargon with natural language (Basecamp style).

### 1.5. Remove Before You Add
- When in doubt, delete. If a removed element is not missed, it was not needed.
- Avoid decorative arrows that lead nowhere, unnecessary borders, redundant labels.
- Fewer visual elements conveying structure = better design.

---

## 2. Micro-Animations to Implement

### 2.1. Button Hover: Text Slide

A masked text swap on hover, no color-picking required.

```css
/* CSS approach */
.btn-slide {
  position: relative;
  overflow: hidden;
  height: 48px;
  line-height: 48px;
}
.btn-slide .btn-text {
  display: block;
  transition: transform 0.35s cubic-bezier(0.65, 0, 0.35, 1);
}
.btn-slide:hover .btn-text {
  transform: translateY(-100%);
}
```

```ts
// GSAP approach (plugins/gsap.client.ts patterns)
gsap.to('.btn-text', {
  yPercent: -100,
  duration: 0.35,
  ease: 'power2.inOut',
  paused: true  // trigger on mouseenter
})
```

**Press effect:** scale down on active state for tactile feedback.

```css
.btn-slide:active {
  transform: scale(0.96);
  transition: transform 0.1s ease;
}
```

### 2.2. Name Tag on Avatar Hover (Team/About Section)

Spring-animated name tooltip that pops up below or beside an avatar.

```ts
// GSAP with custom spring-like ease
gsap.fromTo('.name-tag',
  { y: 8, opacity: 0, rotation: -3 },
  {
    y: 0,
    opacity: 1,
    rotation: 2,          // slight tilt for liveliness
    duration: 0.5,
    ease: 'back.out(1.7)' // mimics spring stiffness 636, damping 24
  }
)
```

### 2.3. Shimmer Stroke (Card Borders)

Animated gradient border that rotates around a card. Best implemented with CSS conic-gradient or GSAP rotation of a pseudo-element behind a masked card.

```css
.shimmer-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
}
.shimmer-card::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: conic-gradient(
    from var(--angle, 0deg),
    transparent 0%,
    var(--accent) 25%,
    transparent 50%
  );
  animation: shimmer-rotate 4s linear infinite;
  z-index: -1;
}
.shimmer-card::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: calc(16px - 2px);
  background: var(--card-bg);
  z-index: -1;
}
@keyframes shimmer-rotate {
  to { --angle: 360deg; }
}
/* Requires @property --angle for animation */
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
```

### 2.4. Toast Notifications (Multi-Stage)

Three-phase chain: slide-in, loading indicator, success with particles.

```ts
const tl = gsap.timeline()
tl.fromTo('.toast', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' })
  .to('.toast-spinner', { opacity: 1, duration: 0.2 }, '+=0.1')
  .to('.toast-spinner', { opacity: 0, duration: 0.2 }, '+=1.5')
  .fromTo('.toast-success', { scale: 0 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' })
  .to('.toast', { y: -60, opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=2')
```

### 2.5. Delayed Tooltips on Icon-Only Elements

Show tooltip only after 1 second of hover to prevent flicker on casual mouse movement.

```ts
let tooltipTimer: ReturnType<typeof setTimeout>

function onMouseEnter(el: HTMLElement) {
  tooltipTimer = setTimeout(() => {
    gsap.fromTo(el.querySelector('.tooltip'),
      { y: 4, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
    )
  }, 1000)
}

function onMouseLeave(el: HTMLElement) {
  clearTimeout(tooltipTimer)
  gsap.to(el.querySelector('.tooltip'), { opacity: 0, duration: 0.15 })
}
```

### 2.6. Text Hover Pop-Out (Project Links)

On hovering a project name, show a tilted preview image.

```ts
gsap.fromTo('.project-preview',
  { opacity: 0, scale: 0.9, rotation: -4 },
  { opacity: 1, scale: 1, rotation: 3, duration: 0.4, ease: 'power3.out' }
)
```

### 2.7. Scroll-Triggered Entry Animations

Each element type gets its own entrance animation matching its character, not uniform fade-in.

```ts
// Headings: slide up + fade
gsap.from('h1, h2', {
  scrollTrigger: { trigger: 'h1, h2', start: 'top 85%' },
  y: 40, opacity: 0, duration: 0.7, ease: 'power3.out'
})

// Cards: staggered scale + fade
gsap.from('.project-card', {
  scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' },
  scale: 0.95, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out'
})

// Decorative elements: rotation + pop-in
gsap.from('.deco-star', {
  scrollTrigger: { trigger: '.deco-star', start: 'top 90%' },
  scale: 0, rotation: 180, duration: 0.6, ease: 'back.out(2)'
})
```

### 2.8. Parallax on Decorative Elements

Elements in margins move at different speeds during scroll to create depth.

```ts
gsap.to('.parallax-slow', {
  scrollTrigger: { trigger: '.parallax-slow', scrub: 1 },
  y: -80
})
gsap.to('.parallax-fast', {
  scrollTrigger: { trigger: '.parallax-fast', scrub: 1 },
  y: -160
})
```

### 2.9. Search Bar Expansion

Compact icon expands into full search field on click.

```ts
const searchTl = gsap.timeline({ paused: true })
searchTl
  .to('.search-icon', { scale: 1.2, opacity: 0, duration: 0.2 })
  .fromTo('.search-bar',
    { width: 48, opacity: 0 },
    { width: 320, opacity: 1, duration: 0.4, ease: 'power3.out' },
    '-=0.1'
  )
  .fromTo('.search-input', { opacity: 0 }, { opacity: 1, duration: 0.2 })
```

### 2.10. Card Swipe / Stack (Notifications or Testimonials)

Top card rotates away while cards behind scale up and shift.

```ts
function dismissTopCard(card: HTMLElement) {
  gsap.to(card, { rotation: 12, x: 200, opacity: 0, duration: 0.4, ease: 'power2.in' })
  gsap.to('.stack-card', { y: '-=16', scale: '+=0.03', duration: 0.4, ease: 'power2.out' })
}
```

### 2.11. Interactive Feedback on All Buttons

Every button must have hover, active, and disabled states. No button should feel "dead."

```css
/* Universal button states */
.btn { transition: all 0.2s ease; }
.btn:hover { filter: brightness(1.15); }
.btn:active { transform: scale(0.96); filter: brightness(0.9); }
.btn:disabled { opacity: 0.4; cursor: not-allowed; filter: saturate(0); }
```

---

## 3. Color Strategy: Dark Theme (60-30-10)

### 3.1. The Rule

| Proportion | Role | Dark Theme Application |
|-----------|------|------------------------|
| **60%** | Dominant / Background | Very dark shade of accent color (NOT pure #000). Tailwind: accent-950 or custom near-black with a hint of brand hue. |
| **30%** | Secondary / Surfaces | Slightly lighter dark shade for cards, panels, code blocks. Each layer: +4-6 Brightness, -10-20 Saturation in HSB. |
| **10%** | Accent / CTA | Brand color at full saturation for primary buttons, active states, key highlights. |

### 3.2. Avoid Pure Black and Pure White

- Background: never #000000. Mix in a subtle tint of the brand color. Example: `hsl(230, 15%, 6%)` for a deep blue-tinted black.
- Text: primary text = light gray (e.g. #E0E0E0 or #D4D4D8), NOT pure white #FFFFFF. Reserve pure white for the most important elements: logo, key numbers, primary CTA text.
- Borders: in dark theme, borders need more contrast than you think. But still use muted grays (e.g. `hsla(0, 0%, 100%, 0.08)`).

### 3.3. Building the Palette via HSB

Starting from a brand accent color:
1. **Lighter shade:** -20 Saturation, +10 Brightness.
2. **Darker shade:** +20 Saturation, -10 Brightness, shift Hue toward blue/purple by ~20 degrees.
3. Repeat to build a full scale of 5-7 shades.

### 3.4. Extending the Palette

- **Analogous colors:** rotate Hue +/- 30 degrees from the accent for supporting colors.
- **Complementary color:** rotate Hue 180 degrees for contrast elements (e.g. special highlights, alerts).

### 3.5. Depth in Dark Theme

Shadows are nearly invisible on dark backgrounds. Create depth through background variation:
- Layer 0 (page): darkest background.
- Layer 1 (card): +5 Brightness.
- Layer 2 (nested element inside card): +5 Brightness again.
- Each layer: slightly less saturated than the previous one.

### 3.6. Semantic Colors

| Color | Usage | Rule |
|-------|-------|------|
| **Red** | Destructive actions (delete, cancel), critical errors | Always red, never brand color. User must instantly read the danger. |
| **Green** | Success confirmations, positive status | Standard semantic green. |
| **Yellow/Amber** | Warnings | Toned down, not neon. |
| **Brand accent** | Primary actions, active navigation, key highlights | Only 10% of the palette. |

### 3.7. Element States via Color

| State | Treatment |
|-------|-----------|
| Default | Base color |
| Hover | Slightly lighter/brighter version (+5-10 Brightness) |
| Active/Pressed | Slightly darker version (-5-10 Brightness) |
| Disabled | Desaturated, reduced opacity (gray-out) |

---

## 4. Typography Rules

### 4.1. Kerning for Large Text

For any text above 70-80px, tighten letter-spacing by -2% to -4%. Auto-kerning works fine for body text but breaks down at display sizes.

```css
.hero-title {
  font-size: clamp(3rem, 8vw, 6rem);
  letter-spacing: -0.03em;  /* -3% */
  line-height: 1.05;
}
```

### 4.2. Letter-Spacing Scale

| Size Category | Recommended letter-spacing |
|--------------|---------------------------|
| Display (80px+) | -0.03em to -0.04em |
| H1 (48-72px) | -0.02em to -0.03em |
| H2 (32-48px) | -0.01em to -0.02em |
| Body (16-20px) | 0 (normal) |
| Small/Caption (12-14px) | +0.01em to +0.02em |
| ALL-CAPS labels | +0.05em to +0.1em |

### 4.3. Font Strategy

For a dark-themed developer portfolio:
- **Headings:** A modern geometric sans-serif with tight kerning capability. Candidates: Inter, Satoshi, General Sans, Cabinet Grotesk.
- **Body:** A highly readable sans-serif at 16-18px. Candidates: Inter, DM Sans, Plus Jakarta Sans.
- **Code/Mono:** JetBrains Mono, Fira Code, or Source Code Pro for code snippets and technical content.

### 4.4. Text Hierarchy in Dark Theme

- Most text should be light gray, not white. Reserve #FFFFFF for the single most important headline or CTA.
- Secondary text: dimmer gray (e.g. `text-zinc-400`).
- Tertiary/metadata text: even dimmer (e.g. `text-zinc-500`).
- This gray-scale hierarchy replaces the need for font-weight variation in many cases.

---

## 5. Spacing and Layout Rules

### 5.1. Base Grid: 4px / 8px

All spacing and sizing should be multiples of 4px or 8px.

| Element | Recommended Values |
|---------|-------------------|
| Component internal padding | 8, 12, 16, 24px |
| Gap between cards | 16, 24, 32px |
| Section vertical padding | 64, 80, 96, 128px |
| Container max-width | 1200 or 1280px |
| Small element sizing | Strict multiples of 4px |
| Large element sizing | Round to nearest 8 or 16 (difference between 120 and 128 is negligible at scale) |

### 5.2. Nested Border-Radius Formula

When a rounded element is inside another rounded element:

```
inner_radius = outer_radius - gap_between_elements
```

Example: outer card has `border-radius: 24px`, inner content area has 12px gap from edge, so inner content gets `border-radius: 12px`.

If the gap exceeds the outer radius, the inner element should have straight corners (`border-radius: 0`).

Pill shapes (fully rounded) are exempt since the distance is uniform.

### 5.3. iOS Corner Smoothing

Use CSS `border-radius` with the non-standard but widely supported smooth corners technique:

```css
.card {
  border-radius: 16px;
  /* For smoother corners (superellipse effect) in supported contexts: */
  /* Tailwind: rounded-2xl with future smooth-corners plugin */
}
```

In Figma, enable "iOS corner smoothing" for export. In CSS, this is not natively supported but can be approximated with SVG clip-paths or the `paint` API for critical elements.

### 5.4. Eliminate Divider Lines

Replace horizontal rules and dividers with adequate spacing. If spacing alone is insufficient, use alternating background shades (zebra striping) instead of lines.

Lines are acceptable only as a deliberate stylistic choice applied consistently across the entire design.

### 5.5. Responsive Spacing

Mobile screens need more vertical breathing room than expected. Increase vertical gaps between sections on mobile even though the viewport is smaller -- the eye needs whitespace to parse content blocks.

---

## 6. UX Patterns to Follow

### 6.1. Progressive Disclosure

Show only what the user needs right now. Reveal more on demand.
- Project list page shows title + image + tags. Full description appears on the detail page.
- Blog list shows title + date + excerpt. Full content on click.
- Navigation collapses into a hamburger/drawer on mobile and animates open.

### 6.2. "Load More" Over Infinite Scroll

If project or blog lists grow long, use a "Load More" button. This gives the user control and lets them reach the footer (where contact info and social links typically live).

### 6.3. States for Every Interactive Element

Design all five states for each interactive component:

| State | Visual Treatment |
|-------|-----------------|
| Default | Base appearance |
| Hover | Lighter/brighter, subtle motion |
| Active/Pressed | Darker, scale down slightly |
| Focused | Visible focus ring for accessibility |
| Disabled | Desaturated, reduced opacity |

### 6.4. Smart Search (Blog/Projects)

When the search bar is activated:
- Show recent searches.
- Show popular/featured content.
- Provide inline suggestions as the user types.
- Never show an empty screen -- the moment of search activation is a moment of intent.

### 6.5. 404 Page as a Creative Opportunity

The 404 page is where personality shines. Options for this portfolio:
- A playful animation with a redirect countdown.
- An interactive mini-experience that matches the portfolio tone.
- Friendly copy with clear navigation back to the main sections.

### 6.6. Navigation Clarity

- Current page/section must be visually highlighted in the nav.
- All icons used as sole navigation (no text label) need delayed tooltips (1s hover delay).
- Standard icons (home, user, bookmark) do not need labels. Non-obvious icons always need them.

### 6.7. Content Structure for Project Cards

- Remove redundant labels. If the design does not speak for itself without labels, it is poorly designed.
- Group related info: (project name + tech stack), (date + category), (links).
- Rank by importance: most significant content is larger and higher.
- Use icons instead of text labels for metadata (date, GitHub link, live demo).

### 6.8. Consistent Components

- All cards of the same type must have identical border-radius, padding, and style. Only content differs.
- Buttons of the same hierarchy level must match in size, radius, and styling.
- Establish design tokens early: one corner radius for small components (8-10px), one for cards (16-24px), one for sections/modals (24-32px).

---

## 7. Mistakes to Avoid

### 7.1. Visual Noise
- **No default shadows.** If you use a shadow, make it very soft: light-gray color, high blur, low opacity. In dark theme, shadows are nearly useless anyway -- use background variation instead.
- **No gratuitous gradients.** If a gradient is needed, use variations of a single hue (lighter to darker), never contrasting colors like blue + green.
- **No decorative borders** unless they serve a clear separation function. If needed, use very low opacity.

### 7.2. Color Mistakes
- Do not use more than one accent color competing for attention on the same screen.
- Do not apply bright colors to backgrounds. Backgrounds stay in the background.
- Do not colorize icons for decoration. Color on icons = status indicator only.
- Do not use pure #000000 or #FFFFFF as backgrounds.

### 7.3. Layout and Spacing
- Do not pack elements too tightly. Beginner designs are almost always too dense.
- Do not use inconsistent corner radii across same-function components.
- Do not ignore the nested border-radius formula. Uniform radius on parent and child looks subtly wrong.

### 7.4. Animation Mistakes
- **No uniform fade-in for everything.** Each element type should have its own entrance style matching its character.
- **No animation without purpose.** Every animation must either clarify a transition, give feedback, or guide attention. "Cool for cool's sake" is bad portfolio design.
- **No scroll-jacking.** Never hijack the user's scroll. Use ScrollTrigger for scroll-linked animations, but preserve natural scrolling behavior.
- **No linear easing.** Always use easing functions (power2, power3, back, elastic) for natural movement. Linear animation looks mechanical.

### 7.5. Content and UX
- Do not skip the user flow planning. Map every screen before designing it.
- Do not forget skip/back options in multi-step flows.
- Do not leave interactive elements without feedback states.
- Do not design only for "happy path" data. Account for long titles (text-overflow: ellipsis), missing images (fallback), and edge cases.

### 7.6. Icons
- All icons on one screen must come from the same library and match in style (fill/stroke, line width).
- Never use "mystery" icons whose meaning cannot be guessed.
- Always use SVG format.

---

## 8. Inspiration from Portfolio Sites: Patterns to Borrow

### 8.1. From Creative Developer Portfolios (Dennis Snellenberg, Quentin Hocde, Rogier de Boeve)

**Pattern: Smooth page transitions with GSAP.**
- Pages do not hard-cut; they flow. A typical pattern is a clip-path or wipe transition between routes, with content elements staggering in on the new page.
- Applicable to this project via Nuxt page transitions + GSAP `onLeave` / `onEnter` hooks.

**Pattern: Magnetic cursor / custom cursor.**
- Links and buttons subtly attract the cursor or show a custom cursor state (e.g., "View" text following the mouse over project thumbnails).
- Lightweight to implement with GSAP and adds a high-end interactive feel.

**Pattern: Horizontal project showcase with scroll.**
- Instead of a vertical grid, projects scroll horizontally (often controlled by vertical scroll mapped to horizontal movement).
- Use sparingly. Good for a "featured projects" section, but keep the rest of the page scrolling naturally.

### 8.2. From Designer Portfolios (Artiom Yakushev, Olha Lazarieva, Nicola Romei)

**Pattern: Full-bleed project images with overlay text.**
- Project cards use large, atmospheric images that fill the entire card. Title and metadata overlay the image with a dark gradient scrim.
- Creates visual impact and lets the work speak for itself.

**Pattern: Asymmetric grid layouts.**
- Not a rigid 3-column grid, but a deliberate mix of large and small cards to create visual rhythm and hierarchy. The most important project gets a full-width card; others get half-width.

**Pattern: Animated text reveals on scroll.**
- Headings and key copy animate in character-by-character or word-by-word as the user scrolls. GSAP SplitText is purpose-built for this.

```ts
// SplitText example
const split = new SplitText('.hero-title', { type: 'chars,words' })
gsap.from(split.chars, {
  scrollTrigger: { trigger: '.hero-title', start: 'top 80%' },
  opacity: 0, y: 30, stagger: 0.03, duration: 0.6, ease: 'power3.out'
})
```

### 8.3. From Studio Portfolios (Lusion, Etienne Studio, Dylan Brouwer)

**Pattern: Case study deep-dives.**
- Project pages are not just screenshots. They tell the story: problem, process, solution, results. Sections are separated by full-bleed images or videos.
- For this portfolio, each Markdown project page should follow this narrative structure.

**Pattern: Video/GIF demonstrations.**
- Static screenshots cannot show interactions. Embed short looping videos or GIFs to demonstrate the live product.

**Pattern: Noise/grain texture overlay.**
- A very subtle noise texture over the dark background adds warmth and analog character. Implemented as a fixed-position pseudo-element with a tiny repeating noise pattern at very low opacity (2-5%).

```css
.noise-overlay::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.03;
  background-image: url('/textures/noise.png');
  background-repeat: repeat;
  background-size: 128px 128px;
}
```

### 8.4. From 3D/WebGL Portfolios (Bruno Simon, Samsy, Patrick Heng)

These are extreme examples. What to borrow without going full 3D:
- **Depth cues:** Subtle parallax layers (already covered above) create a sense of 3D without WebGL.
- **Interactive cursor reactions:** Elements that subtly respond to mouse position (tilt, glow-follow) using simple GSAP or CSS transforms.

```ts
// Card tilt on mouse move
function handleMouseMove(e: MouseEvent, card: HTMLElement) {
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  gsap.to(card, {
    rotationY: x * 8,
    rotationX: y * -8,
    duration: 0.4,
    ease: 'power2.out',
    transformPerspective: 800,
  })
}
```

- **Loading screens as an experience:** A brief branded loading animation before the site reveals, rather than a blank white flash. Keep it under 2 seconds.

### 8.5. Specific Patterns Selected for This Portfolio

Based on the project stack (Nuxt 3 SSG, GSAP, Tailwind, dark theme, i18n), the following patterns are most feasible and impactful:

| Pattern | Priority | Source Inspiration |
|---------|----------|-------------------|
| GSAP page transitions (clip-path wipe) | High | Dennis Snellenberg, Rogier de Boeve |
| SplitText heading reveals on scroll | High | Artiom Yakushev, Olha Lazarieva |
| Staggered card entrance animations | High | Multiple |
| Card tilt on mouse hover | Medium | Lusion, Patrick Heng |
| Shimmer stroke on featured card | Medium | Linear (from micro-animations) |
| Noise texture overlay | Medium | Etienne Studio, Dylan Brouwer |
| Magnetic cursor on CTA buttons | Medium | Quentin Hocde, Dennis Snellenberg |
| Full-bleed project images with gradient scrim | High | Nicola Romei, Artiom Yakushev |
| Asymmetric project grid (mixed card sizes) | High | Olha Lazarieva, Tom Sears |
| Text slide button hover | Low | Linear (from micro-animations) |
| Delayed tooltips on nav icons | Low | Obsidian (from micro-animations) |
| Creative 404 page | Medium | General best practice |

---

## Summary Checklist

Before shipping any page or component, verify:

- [ ] Dark backgrounds are NOT pure black -- they carry a hint of the brand hue
- [ ] Text is NOT pure white except for the single most important element per screen
- [ ] 60-30-10 ratio holds across the page
- [ ] All headings above 48px have negative letter-spacing
- [ ] Nested rounded elements follow `inner_radius = outer_radius - gap`
- [ ] All spacing is on the 4px/8px grid
- [ ] Every button has hover, active, focused, and disabled states
- [ ] Entrance animations are varied by element type, not uniform fade-in
- [ ] No animation exists without a clear purpose (feedback, guidance, or delight)
- [ ] All icons on a screen share the same style family
- [ ] No divider lines -- spacing or background variation handles separation
- [ ] Edge cases handled: long text truncated, fallback images, empty states
- [ ] Copy is warm and direct, not corporate
- [ ] Progressive disclosure applied: detail pages hold the depth, list pages stay scannable
