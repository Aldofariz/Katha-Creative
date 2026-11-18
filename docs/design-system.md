# Design System

## Design principles

1. **White canvas, glass on top.** The page background is white. Frosted glass only reads when something colorful sits behind it, so every page has soft blurred color blobs and floating emoji behind the content.
2. **Spend boldness in one place.** The memorable thing is the **hero emoji playground** (floating emoji reacting to the cursor plus chat bubbles). Everything else stays calm, spacious, and disciplined. Do not add a new flashy effect to every section.
3. **Structure carries meaning.** Numbers appear only for real sequences (How we work, timeline). Borders, badges, and labels must encode information, not decorate.
4. **Playful, not messy.** Fun lives in motion and microcopy. Layout, spacing, and type stay orderly.
5. **Accessible by default.** Visible focus, AA contrast for text, reduced motion respected.

## Color tokens

Defined in `globals.css` with Tailwind v4 `@theme`.

```css
@theme {
  /* Core */
  --color-canvas: #ffffff;
  --color-ink: #1b1535; /* primary text: deep violet-black */
  --color-ink-soft: #5b5675; /* secondary text */
  --color-line: rgb(27 21 53 / 0.08);

  /* Brand */
  --color-brand: #6d4aff; /* primary accent; white text on it passes AA (about 5.1:1) */
  --color-brand-strong: #5a38ea; /* hover/pressed */
  --color-brand-wash: #efeaff; /* tinted backgrounds */

  /* Pastel palette (blobs, service accents; NOT for body text) */
  --color-pink: #ff7ab6;
  --color-yellow: #ffd166;
  --color-mint: #5eead4;
  --color-sky: #60a5fa;
  --color-coral: #ff8a65;
  --color-lilac: #b79cff;
  --color-lime: #a3e635;
  --color-peach: #fdba74;

  /* Mac window dots */
  --color-dot-close: #ff5f57;
  --color-dot-min: #febc2e;
  --color-dot-zoom: #28c840;
}
```

**Rules**

- Text is `ink` or `ink-soft` on white or glass. Never put pastel colors behind small text without checking contrast.
- Brand violet is for primary buttons, links, focus rings, and key highlights.
- Each service has one accent color from the pastel palette (see `content.md`). It tints that service's card glow, icon bubble, and detail-page blobs.

## Typography

| Role        | Font                    | Weights       | Notes                                                               |
| ----------- | ----------------------- | ------------- | ------------------------------------------------------------------- |
| Headings    | **Bricolage Grotesque** | 600, 700, 800 | Expressive grotesque; use tight tracking (`-0.02em`) on large sizes |
| Body and UI | **DM Sans**             | 400, 500, 600 |                                                                     |

Load both with `next/font/google` and expose as CSS variables `--font-heading` and `--font-body`.

**Scale (fluid with `clamp`)**

| Token     | Size                                    | Use                     |
| --------- | --------------------------------------- | ----------------------- |
| `display` | `clamp(2.75rem, 6vw + 1rem, 5.5rem)`    | Home hero headline only |
| `h1`      | `clamp(2.25rem, 4vw + 1rem, 3.75rem)`   | Page titles             |
| `h2`      | `clamp(1.75rem, 2.5vw + 1rem, 2.75rem)` | Section titles          |
| `h3`      | `1.25rem` to `1.5rem`                   | Card titles             |
| `body-lg` | `1.125rem`                              | Intro paragraphs        |
| `body`    | `1rem`                                  | Default                 |
| `small`   | `0.875rem`                              | Captions, meta          |

**Rules**

- Line length under 65 characters for paragraphs (`max-w-prose` or `max-w-[60ch]`).
- Headings use **sentence case**. No ALL CAPS labels, no tracked-out uppercase eyebrows.
- Do not highlight a single word in a headline with a different color or italic as a default trick. If a headline needs emphasis, use the emoji or a glass highlight chip behind a short phrase, and use it at most once per page.

## Radius hierarchy

Do not use one radius for everything.

| Element                       | Radius                                      |
| ----------------------------- | ------------------------------------------- |
| Buttons, chips, badges        | `9999px` (pill)                             |
| Window cards                  | `20px`                                      |
| Chat bubbles                  | `22px` (with a 6px corner on the tail side) |
| Inputs, textareas             | `14px`                                      |
| Large containers (CTA banner) | `32px`                                      |

## Glass recipe

Add as utilities in `globals.css`.

```css
.glass {
  background: rgb(255 255 255 / 0.55);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgb(255 255 255 / 0.7);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.9),
    0 0 0 1px rgb(27 21 53 / 0.04),
    0 10px 32px -8px rgb(27 21 53 / 0.12);
}

@supports not (
  (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))
) {
  .glass {
    background: rgb(255 255 255 / 0.92);
  }
}

.glass-strong {
  /* nav, modals: more opaque for legibility */
  background: rgb(255 255 255 / 0.72);
}
```

**Cursor spotlight (glass sheen).** Glass cards expose CSS variables `--mx` and `--my` (set by the `Spotlight` effect on `pointermove`). Inside the card, a pseudo-element renders:

```css
background: radial-gradient(
  320px circle at var(--mx, 50%) var(--my, 0%),
  rgb(255 255 255 / 0.9),
  transparent 60%
);
opacity: 0 → 1 on hover;
```

**Limits**

- Maximum **6 glass elements with `backdrop-filter` visible at once** on mobile. For long grids on mobile, use a solid `bg-white/90` with the same border and shadow instead of blur.
- Never nest a `backdrop-filter` element inside another.

## Components

### `Button`

Variants:

- `primary`: brand violet fill, white text, pill, soft violet shadow. Hover: slight lift (`-1px`), `brand-strong`. Active: scale `0.98`.
- `glass`: `.glass` pill, ink text. Hover: sheen.
- `ghost`: transparent, ink text, underline on hover.

Sizes: `md` (h-11, px-6), `lg` (h-14, px-8). Min touch target 44px. Focus ring: 2px `brand` with 2px white offset.

Button labels are specific verbs ("Start a project", "See our services"). **Do not append arrows or symbols to labels.** If an icon is needed, use a small Lucide icon as a separate child.

### `WindowCard`

App-window look used for service cards, team cards, the contact form, and testimonials.

- `.glass`, radius 20px
- Title bar (height 40px): three 12px dots on the left (`dot-close`, `dot-min`, `dot-zoom`), centered small title text in `ink-soft`, hairline `line` divider below
- Body padding 24px
- Optional `accent` prop (a pastel token) adds a soft radial glow in the top corner and tints the icon bubble
- Dots are decorative (`aria-hidden`), not interactive. Exception: on the contact window the dots may react on hover (close dot shows `×`, min shows `−`, zoom shows `+`), visual only.

### `MenuBarNav`

macOS menu-bar-inspired navbar, sticky at top, `.glass-strong`, height 48px.

- Left: Katha logo (sparkle emoji asset plus "Katha" wordmark in heading font)
- Center/left menu items: Services, About, Contact. Hover shows a rounded-rect highlight (`brand-wash`), like a Mac menu item. Active route has `aria-current="page"` and the same highlight.
- Right: status items (decorative, `aria-hidden`): Wi-Fi icon, battery icon, **live clock** in the format `Wed 9:41 AM` (client component, updates each minute, hydration-safe). Then the `primary` button "Start a project".
- **Services** opens a dropdown of the 8 services on hover or focus (desktop). Keyboard operable (Enter/Space opens, Esc closes, arrow keys move).
- Mobile (below 768px): menu button opens a full-width glass sheet styled like a Mac dropdown, with the 8 services listed under Services.

### `ChatBubble`

iMessage-style.

- `received`: `#ECEAF5`-ish neutral (`rgb(27 21 53 / 0.06)` on glass), ink text, tail on the left
- `sent`: `brand` fill, white text, tail on the right
- `typing`: three dots bouncing in sequence
- Optional emoji reaction badge at the corner (a small Fluent emoji overlapping the bubble edge)
- Optional timestamp or "Delivered" label under sent bubbles (`small`, `ink-soft`)
- Decorative bubbles in the hero are `aria-hidden`. Bubbles carrying real content (How we work) must be readable text in DOM order.

### `Badge`

Pill, `small`, glass or `brand-wash` fill. Used for service categories and "Fictional demo" notes. Sentence case.

### `Accordion` (FAQ)

Glass rows; a chevron rotates on open; content animates height with Motion. Uses `<button>` with `aria-expanded` and `aria-controls`. Only one item open at a time.

### Inputs

Height 52px, radius 14px, `.glass`-lite (white/70, border `line`), label above (not placeholder-only). Focus: brand ring. Error: coral border plus message text below, linked with `aria-describedby`.

## Backgrounds and layering

Z-index order (low to high):

| Layer                   | z-index | Content                                                                                                            |
| ----------------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| Blobs                   | 0       | 3 to 4 blurred circles (`blur-3xl`, opacity 0.35 to 0.5), `position: fixed`, slow drift animation (transform only) |
| Emoji backdrop          | 1       | `EmojiBackdrop`, `pointer-events: none` (see `animation-spec.md`)                                                  |
| Page content            | 10      |                                                                                                                    |
| Nav                     | 50      |                                                                                                                    |
| Dropdowns, mobile sheet | 60      |                                                                                                                    |

Blob colors: Home uses pink, sky, lilac, yellow. Service detail pages replace two blobs with the service's accent color.

## Layout

- Max content width `1200px`, horizontal padding `20px` (mobile), `32px` (md), `48px` (lg).
- Section vertical rhythm: `96px` (mobile) to `144px` (desktop). Do not make every section identical in structure; vary layout (split, centered, grid, offset).
- Alignment: hero is left-aligned on desktop with the playground on the right; section titles are left-aligned by default; centered text only for short statements (CTA banner).
- Breakpoints: Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`). Mobile-first.

## Copywriting rules

- English, sentence case, conversational, plain verbs, active voice.
- Playful lowercase is allowed in **chat bubbles and small microcopy** ("hey, got a minute?"), not in headings or buttons.
- Be specific. Say what the service does for the client, not buzzwords.
- Avoid template tells: no middle-dot strings ("A · B · C"), no "WORD — fragment" labels, no arrows appended to links, no numbered markers unless the content is truly sequential.
- Errors state what happened and how to fix it. No apologies, no vague messages.
- Keep each element to one job: a headline says the idea, the subline adds the detail, the button says the action.

## Accessibility

- Text contrast AA minimum (4.5:1 normal, 3:1 large).
- Visible focus on all interactive elements.
- Decorative emoji and blobs are `aria-hidden` and non-interactive for assistive tech.
- Respect `prefers-reduced-motion` (see `animation-spec.md`).
- Semantic landmarks: one `<h1>` per page, `<nav>`, `<main>`, `<footer>`.
