# Roadmap

Work top to bottom. Do not start a task until the previous one meets its acceptance criteria (AC). After each task, report: what changed, how to verify, and open questions.

Legend: `[ ]` not started, `[x]` done.

---

## Phase A — Foundation

### T0. Project setup

- [x] Create the Next.js app (TypeScript, App Router, Tailwind, ESLint, `src/` directory, import alias `@/*`) with npm (`npx create-next-app@latest`)
- [x] Install allowed dependencies (`architecture.md`)
- [x] Configure Prettier (with Tailwind plugin), strict TS, scripts
- [x] Copy these docs into `/docs` and `AGENTS.md` into the repo root

**AC:** `npm run dev` runs; `npm run lint`, `npm run typecheck`, `npm run build` pass on the blank app.

### T1. Design tokens, fonts, globals

- [x] `globals.css`: Tailwind import, `@theme` tokens (`design-system.md`), `.glass`, `.glass-strong`, base typography, focus ring, selection color
- [x] `layout.tsx`: Bricolage Grotesque and DM Sans via `next/font`, `<MotionConfig reducedMotion="user">`, base metadata
- [x] `lib/cn.ts`, `lib/motion.ts`

**AC:** A test page shows both fonts, all color tokens, and a glass panel over a colored blob rendering correctly.

### T2. Emoji assets and data layer

- [x] Download the required Fluent Emoji 3D assets, convert to WebP, add license file (`architecture.md`)
- [x] `src/data/emoji.ts` manifest with `EmojiKey`
- [x] `src/types/index.ts`; all data files from `content.md` (`services`, `testimonials`, `team`, `faqs`, `stats`, `timeline`)
- [x] `EmojiImage` component (wraps `next/image`)

**AC:** A temporary page renders every emoji in the manifest with no broken images; data files typecheck.

---

## Phase B — UI primitives

### T3. Core UI components

- [x] `Button` (primary, glass, ghost; md, lg)
- [x] `GlassCard` with cursor sheen (`Spotlight`)
- [x] `WindowCard` (title bar, dots, accent glow)
- [x] `Badge`
- [x] `ChatBubble` (sent, received, typing, reaction, timestamp)
- [x] `Accordion`

**AC:** A temporary `/playground` route shows every variant and state. Keyboard and focus work. Remove or hide `/playground` before the final task.

### T4. Layout shell

- [x] `MenuBarNav` (menu items, Services dropdown, live clock, status icons, CTA, mobile sheet)
- [x] `Footer` (with demo note and emoji attribution)
- [x] Background blobs layer

**AC:** Nav is sticky and glass, dropdown is fully keyboard accessible, clock has no hydration warning, mobile sheet works at 375px.

### T5. Emoji backdrop and effects

- [x] `EmojiBackdrop` with presets, entrance, idle float, cursor parallax (`animation-spec.md`)
- [x] `ClickBurst`
- [x] Mobile and reduced-motion behavior; pause when tab hidden

**AC:** 16 emoji on desktop, 8 on mobile; smooth float and parallax; no layout shift; static under reduced motion.

- [ ] DevTools performance profile shows no long frames while moving the cursor.

---

## Phase C — Pages

### T6. Home: hero

- [ ] Hero copy, buttons, trust line
- [ ] Playground: chat bubbles sequence, large emoji, repel, click burst

**AC:** Load sequence matches `animation-spec.md`; clicking emoji bursts; keyboard can pop emoji; mobile layout stacks correctly.

### T7. Home: stats, services grid

- [ ] Stats strip with count-up and client marquee
- [ ] Services grid with 8 `WindowCard`s (hover sheen, emoji wiggle, optional tilt), Training card distinguished

**AC:** Cards link to `/services/<slug>`; responsive 1/2/4 columns; count-up runs once.

### T8. Home: How we work (scroll storytelling)

- [ ] Sticky stage with 4 scroll-driven stages (`animation-spec.md`, `content.md`)

**AC:** Stages advance smoothly with scroll, no jank; reading order correct; reduced motion shows all stages stacked.

### T9. Home: training highlight, testimonials, FAQ, CTA banner

- [ ] `TrainingHighlight`, `Testimonials` (carousel on mobile), `FaqSection`, `CtaBanner` (reusable)

**AC:** All content from `content.md`; FAQ one-open-at-a-time with correct ARIA; Home page complete and responsive.

### T10. Services index

- [ ] Header, four category groups, "not sure" block, CTA banner

**AC:** All 8 services appear exactly once under the right category.

### T11. Service detail template

- [ ] `generateStaticParams`, metadata, `notFound`
- [ ] Hero, Included (or Curriculum + Program details for training), Process, FitFor, FAQ, Related, CTA
- [ ] Accent-driven blobs and `servicePreset`

**AC:** All 8 pages build statically; each uses its own accent and emoji; Training page shows curriculum and program details; CTA links include `?service=<slug>`.

### T12. About

- [ ] Header with name note, Story with fake Finder window, Values, Team, scroll-driven Timeline

**AC:** Timeline line draws with scroll; team cards reveal with stagger; reduced motion shows static timeline.

### T13. Contact

- [ ] Contact window, form with zod validation (`pages-spec.md`), service preselect from query string, simulated submit, success state with confetti and reply bubble, reset

**AC:** Validation messages match `content.md`; no network calls; success state is announced to screen readers; reset works.

### T14. Not found page

**AC:** `/does-not-exist` shows the custom 404.

---

## Phase D — Polish and ship

### T15. SEO and metadata

- [ ] Per-page metadata, Open Graph image, `sitemap.ts`, `robots.ts`, favicon

### T16. Accessibility and performance pass

- [ ] Keyboard-only walkthrough, contrast check, reduced-motion check, Lighthouse run (targets in `coding-standards.md`)
- [ ] Remove `/playground`; remove unused code and assets

### T17. Easter egg (optional)

- [ ] Typing `katha` triggers a one-time emoji shower (`animation-spec.md`)

### T18. Deploy and README

- [ ] Deploy to Vercel
- [ ] Project `README.md` for the portfolio: concept, stack, key technical decisions (glass, emoji system, scroll storytelling), screenshots, live link, and the fictional-agency note

**Final AC:** Lighthouse targets met; all pages responsive at 375, 768, 1280, 1536px; `npm run lint && npm run typecheck && npm run build` pass; live URL works.
