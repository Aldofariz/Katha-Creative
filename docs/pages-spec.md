# Pages Spec

> **Partially superseded by `docs/style-revision-v2.md`.** Visual direction, tokens, components, and motion described here are replaced where v2 says so. v2 wins on any conflict.

All copy is in `content.md`. Visual rules are in `design-system.md`. Motion rules are in `animation-spec.md`.

Every page uses the shared shell: `MenuBarNav` (top), `<main>`, and `Footer`. There is no global emoji backdrop or blob layer. Each page exports metadata via `generateMetadata` or `metadata` (title, description, Open Graph).

---

## Global: `MenuBarNav`

See component spec in `design-system.md`. Links: Services (dropdown with 8 services), About, Contact. CTA: "Start a project" → `/contact`.

## Global: `Footer`

Use the plain footer described in `style-revision-v2.md`, section 9: wordmark and tagline, Services and Company columns, contact line, and copyright, separated by a hairline. No glass panel or decorative emoji.

---

## Home (`/`)

### 1. Hero

- Left: `h1` (display size), subline, two buttons: primary "Start a project" → `/contact`, glass "See our services" → `/services`.
- Right: hero playground (bubbles plus large emoji). See `animation-spec.md`.
- Small trust line beneath the buttons, e.g. "Trusted by 120+ growing brands".
- Full viewport height minus nav on desktop (`min-h-[calc(100svh-48px)]`).

### 2. Stats strip

- 4 stats in a single glass bar: campaigns launched, ad spend managed, average ROAS, client retention. Numbers count up once when they enter the viewport. Values from `content.md`.
- A row of 6 client "logos" as simple wordmarks in `ink-soft` (text only, no real brands), as a gentle horizontal marquee. The marquee pauses on hover and is static under reduced motion.

### 3. Services grid

- Section title and intro.
- 8 `WindowCard`s in a grid: 1 column (mobile), 2 (md), 4 (xl) or a 3-2-3 masonry-like arrangement on xl for visual variety.
- Each card: service emoji in a tinted bubble, title, one-line description, 2 to 3 tiny feature chips, "Learn more" link to `/services/[slug]`.
- Card window title bar shows the service slug-style name, e.g. `google-ads.app`.
- Hover: sheen, emoji wiggle, optional tilt.
- The **Training Program card** is visually distinguished (a "Learn with us" badge, brand-wash tint) because it is a different kind of offer.

### 4. How we work (scroll storytelling)

- Spec in `animation-spec.md`. Four stages: Brief, Strategy, Launch, Report.
- Section title sits above the sticky stage.

### 5. Training highlight

- Split layout: left has copy about the Digital Marketing Training Program (who it is for, what you will learn, format), right has a large glass "curriculum window" listing 6 modules with checkmarks, plus the graduation-cap emoji overlapping the window corner.
- CTA: "Explore the training program" → `/services/digital-marketing-training`.

### 6. Testimonials

- 6 testimonials as cards that look like iMessage or tweet cards (avatar bubble with initials, name, role, company, quote). Two-row layout; on mobile a horizontal scroll-snap carousel.
- Avatars: colored circles with initials (no real photos).

### 7. FAQ

- `Accordion` with 6 questions (from `content.md`), one open at a time. Layout: title on the left, accordion on the right (desktop).

### 8. CTA banner

- Large glass container (radius 32px) with a short headline, one line of copy, and the primary button "Start a project". Several emoji cluster at the corners. The only centered-text section on the page.

---

## Services index (`/services`)

1. **Page header:** `h1`, intro paragraph, a few floating emoji.
2. **Grouped lists:** four category groups, each with a small heading and its service cards (reuse `WindowCard` in a wider, horizontal layout with more detail than the Home grid):
   - **Advertising:** Google Ads, Meta Ads
   - **Social:** Social Media Management, Social Media Campaign
   - **Creative and build:** Web Development, Graphic Design
   - **Growth and learning:** Affiliate & KOL, Digital Marketing Training Program
3. **Mini "not sure what you need?" block:** a chat bubble exchange ending in a button to `/contact`.
4. **CTA banner** (same component as Home).

---

## Service detail (`/services/[slug]`)

- Uses `generateStaticParams` over `services` data. Unknown slug → `notFound()`.
- `generateMetadata` uses the service's title and summary.
- Accent color from the service data drives blobs, icon bubble glow, and highlights.

Sections:

1. **Detail hero:** breadcrumb ("Services / Google Ads"), `h1` (service title), tagline, summary, large service emoji (about 120px) floating beside the title, primary button "Start a project" → `/contact?service=<slug>`.
2. **What's included:** grid of 5 to 6 items, each a small glass card with a Fluent emoji or Lucide check and a short description.
3. **How it works:** a real sequence of 4 steps (numbered markers are appropriate), laid out as a vertical list of `ChatBubble`s or a horizontal stepper in a `WindowCard`.
4. **Who it is for:** 3 short persona lines in a glass block.
5. **FAQ:** 2 service-specific questions using `Accordion`.
6. **Related services:** 3 `WindowCard`s (the other services in the same category plus one more). Exclude the current service.
7. **CTA banner:** headline mentions the service name.

Training Program page has the same structure but replaces "What's included" with a **curriculum** (modules) and adds a "Program details" block (duration, format, level, class size, fictional).

---

## About (`/about`)

1. **Header:** `h1` "We tell brand stories", short intro, and the name-meaning note ("katha" = story).
2. **Story:** two-column text plus a glass window showing a stylized "agency desktop" (a fake finder window listing folders: `strategy`, `creative`, `launches`, `reports`).
3. **Values:** 4 values, each a small glass card with an emoji.
4. **Team:** 6 team members as `WindowCard`s (initial-avatar, name, role, fun fact line). Reveal with stagger.
5. **Timeline (scroll storytelling):** 5 milestones. See `animation-spec.md`.
6. **CTA banner.**

---

## Contact (`/contact`)

Follow `style-revision-v2.md`, section 8: Mail-style compose window with a toolbar Send action, hairline field rows, and a plain contact definition list. Preserve the existing Zod validation and simulated 1.2-second submit behavior; this form does not send a network request.

---

## Not found (`not-found.tsx`)

Use the `404` WindowCard, kaomoji, one line of copy ("This page wandered off."), and a primary button to Home, as specified in `style-revision-v2.md`.
