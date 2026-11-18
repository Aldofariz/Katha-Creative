# Animation and Emoji Spec

## Library

Use **Motion** (`motion/react`). No GSAP. All animated components are Client Components (`"use client"`).

## Motion philosophy

- **One orchestrated moment on load:** the hero (emoji pop in, bubbles arrive in sequence). That is the showpiece.
- **Motion that answers an action is welcome:** hover, press, open/close, form success, clicking an emoji.
- **Do not** apply a fade-and-slide-up to every section and a hover lift to every card. Use scroll-triggered reveals only where they help comprehension (see "Scroll reveals").
- Animate only `transform` and `opacity` (and `filter` sparingly). Never animate `width`, `height`, `top`, or `left` for continuous motion. (Accordion height animation on open/close is the one exception.)
- Easing and springs live in `src/lib/motion.ts` and are reused:

```ts
export const springSoft = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.8,
} as const;
export const springSnappy = {
  type: "spring",
  stiffness: 380,
  damping: 26,
} as const;
export const easeOut = [0.22, 1, 0.36, 1] as const;
```

## Reduced motion

There is **no toggle**. Respect the OS setting automatically:

- Wrap the app in `<MotionConfig reducedMotion="user">` in the root layout.
- With reduced motion on: emoji are rendered static (no float, no parallax, no repel), blobs do not drift, scroll storytelling shows all messages at once, hover effects reduce to color changes, the typing indicator is static.
- Provide `useReducedMotionSafe()` in `src/hooks` that wraps Motion's `useReducedMotion` and returns `false` during SSR to avoid hydration mismatch.

## Emoji system

### Assets

Microsoft **Fluent Emoji, 3D style** (MIT). Setup steps are in `architecture.md`. Rendered with `next/image` (`width`/`height` set, `draggable={false}`, `alt=""`).

### Manifest (`src/data/emoji.ts`)

```ts
export type EmojiKey =
  | "rocket"
  | "sparkles"
  | "megaphone"
  | "magnifier"
  | "mobile-phone"
  | "graduation-cap"
  | "laptop"
  | "handshake"
  | "artist-palette"
  | "heart"
  | "fire"
  | "star"
  | "thumbs-up"
  | "party-popper"
  | "light-bulb"
  | "chart-increasing"
  | "money-bag"
  | "eyes"
  | "camera"
  | "speech-balloon"
  | "trophy"
  | "bullseye"
  | "megaphone-2"
  | "crystal-ball";

export const emoji: Record<EmojiKey, { src: string; label: string }> = {
  /* ... */
};
```

Trim or extend the list to what is actually used. Every key maps to `/emoji/<key>.webp`.

### Required emoji set

- **Services (8):** magnifier (Google Ads), megaphone (Meta Ads), mobile-phone (Social Media Management), rocket (Social Media Campaign), graduation-cap (Training), laptop (Web Development), handshake (Affiliate & KOL), artist-palette (Graphic Design)
- **Decoration pool:** sparkles, heart, fire, star, thumbs-up, party-popper, light-bulb, chart-increasing, money-bag, eyes, camera, speech-balloon, trophy, bullseye, crystal-ball

## `EmojiBackdrop` (global floating emoji)

Rendered once in the root layout. A fixed, full-viewport layer (`z-index: 1`, `pointer-events: none`). Each page passes a preset (list of emoji configs) via a small context or by route.

### Per-emoji config

```ts
type FloatingEmojiConfig = {
  key: EmojiKey;
  x: number; // 0–100, % of viewport width
  y: number; // 0–100, % of viewport height
  size: number; // px at desktop, 40–120
  depth: number; // 0.2–1.2; larger = closer = moves more with the cursor
  rotate: number; // initial rotation in degrees, -25 to 25
  floatDuration: number; // 5–11 seconds
  delay: number; // seconds
};
```

### Behaviors

1. **Entrance:** pop in with `springSnappy` from `scale: 0` and `rotate: -20`, staggered 40ms each, once on first load.
2. **Idle float:** each emoji loops `y: [0, -14, 0]` and `rotate: [r, r + 4, r]` with its own `floatDuration`, `ease: "easeInOut"`, `repeat: Infinity`. Offset by `delay` so they never sync.
3. **Cursor parallax:** track pointer position (normalized -0.5 to 0.5) in a single shared `useMotionValue`. Each emoji maps it to `x/y` offsets scaled by `depth` (max about 28px) through `useSpring` (`stiffness: 80, damping: 20`). One pointer listener for the whole layer, never one per emoji.
4. **Repel (hero only):** when the pointer is within 140px of an emoji, push it away (spring) up to 40px. Computed in a `requestAnimationFrame` loop that only runs while the pointer is inside the hero and the hero is in view.
5. **Click burst (hero only):** emoji are individually clickable in the hero (`pointer-events: auto` on those, with a `button` role and `aria-label="Pop <label>"`). Click triggers `ClickBurst`: the emoji squishes (`scale: [1, 0.7, 1.25, 1]`) and spawns 6 to 8 tiny copies that fly outward and fade over 700ms. Also reachable by keyboard (Enter/Space).
6. **Scroll drift:** the backdrop shifts slightly with page scroll (`useScroll` + `useTransform`, max 60px) for depth. Optional if it hurts performance.

### Counts and performance

- **Desktop (≥ 768px):** 16 emoji max. **Mobile:** 8 max, no repel, no parallax (use a gentle idle float only).
- Use `will-change: transform` on emoji. Avoid blur, drop-shadow filters, and `mix-blend-mode` on them.
- Pause idle animation when the tab is hidden (`document.visibilitychange`) and when the backdrop is fully off-screen.
- Preload only the first 6 emoji (hero ones); lazy-load the rest.
- No emoji may overlap body text at a size or opacity that hurts readability: keep decorative emoji near the page edges and in gutters on content-heavy sections, and place them behind glass cards (the blur softens them) where they pass behind content.

### Presets

Define `homePreset`, `servicesPreset`, `aboutPreset`, `contactPreset`, and a `servicePreset(service)` that always includes that service's emoji at large size (about 120px) near the title plus 6 to 8 decoration emoji.

## Hero playground (the one bold moment)

Desktop layout: copy on the left, a cluster on the right with 3 to 4 `ChatBubble`s and 3 to 5 large emoji orbiting them.

Load sequence (about 1.6s total, runs once):

1. Headline and subline fade in (no slide).
2. Emoji pop in, staggered.
3. Bubbles arrive one by one, 350ms apart, with a typing indicator before each received bubble:
   - received: "hey katha, our ads are burning cash 😅"
   - sent: "send us the numbers. we'll find the leak."
   - received: "and then?"
   - sent: "then we make it sing. 🚀"
     (Emoji inside bubble text are Fluent images or plain text; text content is `aria-hidden` here because it is decorative.)
4. After the sequence, bubbles gently float (`y: [0, -6, 0]`, 6s loop).

Mobile: bubbles stack under the copy, emoji reduced to 5 around the edges.

## Glass card interaction

- Pointer move over a `GlassCard`/`WindowCard` sets `--mx`/`--my` (percent) via a lightweight handler to light the sheen. Throttle with `requestAnimationFrame`.
- Optional subtle 3D tilt (max 4 degrees) on service cards only, using `useMotionValue` + `useTransform`. Disabled on touch and reduced motion.
- Press feedback: `whileTap={{ scale: 0.98 }}` on buttons.

## Scroll storytelling (limited to two places)

### 1. How we work (Home)

Sticky stage. The section is about 300vh tall (200vh on mobile) with a sticky inner container (`top: 96px`).

- Use `useScroll({ target: sectionRef, offset: ["start start", "end end"] })`.
- Progress 0 to 1 is split into 4 stages: **Brief, Strategy, Launch, Report**.
- Each stage reveals chat bubbles (a conversation between "client" and "Katha") plus a side "window" that changes its content: a brief form being filled, a strategy board, a launch checklist ticking off, a small report chart rising.
- Active stage indicator (numbered 1 to 4 is appropriate here because this is a true sequence).
- The last stage ends with a "Delivered" label under the final sent bubble and releases the sticky container.
- Reduced motion: render all four stages stacked normally, no sticky behavior.
- Content must remain readable without JS motion (DOM order = reading order).

### 2. Timeline (About)

Vertical timeline where a line draws down as the user scrolls (`pathLength` or `scaleY` tied to scroll progress). Each milestone is a `WindowCard` that settles in from slightly offset when it crosses 30% of the viewport. 5 milestones.

## Scroll reveals (everywhere else)

Keep reveals minimal and varied:

- Use `whileInView` with `viewport={{ once: true, margin: "-80px" }}`.
- Only on: services grid cards (stagger 60ms), testimonials, team cards, FAQ container. Not on every heading and paragraph.
- Reveal = opacity 0 → 1 plus a small `y: 16 → 0`. Duration 0.5s, `easeOut`.

## Microinteractions checklist

- Menu bar clock ticks; Services dropdown opens with a quick scale-from-top (`scale: 0.96 → 1`, 120ms).
- Service card hover: sheen follows cursor; the card's emoji does a small wiggle (`rotate: [0, -8, 8, 0]`).
- Training Program card hover: the graduation cap emoji tips.
- FAQ open: chevron rotates, height animates.
- Contact form: send button shows a short loading state, then the form window swaps to a success state: a sent bubble "Delivered", a confetti burst of 12 emoji, and a reply bubble from Katha. No real network request.
- Optional easter egg (low priority): typing `katha` anywhere on the page triggers a one-time emoji shower. Nice-to-have, do last.
