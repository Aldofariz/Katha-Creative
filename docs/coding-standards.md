# Coding Standards

## TypeScript

- `"strict": true`, `noUncheckedIndexedAccess: true`.
- No `any`. Use `unknown` and narrow, or define a type.
- Prefer `type` over `interface` unless extending.
- Shared types live in `src/types/index.ts`. Component props types live next to the component.
- Use path alias `@/*` → `src/*`.
- Exhaustive handling: when switching on unions (e.g. `AccentColor`), add a `never` check.

## Next.js

- App Router only. No `pages/` directory.
- **Server Components by default.** Add `"use client"` only where needed (Motion, state, effects, event handlers). Keep client boundaries small: a section can be a Server Component that renders a small client child.
- Data comes from `src/data/*`, imported directly. No fetching.
- `generateStaticParams` for `/services/[slug]`; the page must be fully static. Unknown slug → `notFound()`.
- Every page defines metadata (title, description, Open Graph). Title template: `%s | Katha Creative`.
- Use `next/image` for emoji and any images. Use `next/font` for fonts.
- `searchParams` on `/contact` is read on the client (or via the page's `searchParams` prop, whichever the installed Next.js version supports) and validated against known slugs; invalid values are ignored.

## React and components

- Function components, named exports (default export only for `page.tsx`, `layout.tsx`, `not-found.tsx`).
- File names: `kebab-case.tsx`. Component names: `PascalCase`.
- Keep components under about 150 lines; extract subcomponents when larger.
- Props are explicit and typed; no spreading unknown props onto DOM nodes without a typed `ComponentProps`.
- Do not use `useEffect` for derived state. Do not read `window` or `document` during render; guard in effects or use `useSyncExternalStore`.
- **Hydration safety:** the live clock, random values, and anything time-based must render a stable placeholder on the server and update after mount. Emoji positions are deterministic (from config), never `Math.random()` at render.

## Tailwind

- Use design tokens from `@theme` (see `design-system.md`). No hard-coded hex values in components.
- Use `cn()` (`clsx` + `tailwind-merge`) for conditional classes.
- Reusable glass and window styles are utilities/components, not repeated long class strings.
- Mobile-first. Avoid arbitrary values unless there is no token (and comment why).
- Format with `prettier-plugin-tailwindcss` to keep class order consistent.

## Motion

- Import from `motion/react`.
- Reuse variants, springs, and easing from `src/lib/motion.ts`.
- Animate only transform/opacity for continuous motion.
- Clean up listeners and rAF loops in effect cleanups.
- One pointer listener for the emoji layer, not one per emoji.
- All motion must degrade correctly under `prefers-reduced-motion` (`animation-spec.md`).

## Accessibility

- One `<h1>` per page; heading levels in order.
- Interactive elements are real `<button>` or `<a>`. Clickable emoji are buttons with `aria-label`.
- Decorative elements (`EmojiBackdrop`, blobs, fake window dots, status icons) have `aria-hidden="true"`.
- Visible focus ring on everything focusable. Tab order matches visual order.
- Form: every input has a `<label>`; errors linked via `aria-describedby`; status announced via `aria-live="polite"`.
- Nav dropdown: keyboard operable, Esc closes, focus returns to the trigger.
- Contrast AA. Test glass text over blobs and emoji.
- Touch targets at least 44x44px.

## Performance

- Targets (Lighthouse, mobile emulation, production build): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- Hero image/emoji: first 6 emoji get `priority`; others lazy.
- No layout shift: always set emoji `width`/`height`.
- Respect the glass limits in `design-system.md` (max 6 blur elements visible on mobile).
- Avoid large client bundles: don't import all of Lucide (import individual icons).

## SEO

- Semantic HTML, descriptive `<title>` and meta description per page, canonical URLs, Open Graph and Twitter card tags, `sitemap.ts` and `robots.ts`.
- `og.png` 1200x630 in `/public` (simple branded image: logo, tagline, a few emoji).
- Leave pages indexable (no `noindex`) unless the human asks otherwise.

## Git and workflow

- Small commits, conventional messages: `feat: add MenuBarNav`, `fix: clock hydration mismatch`, `chore: configure prettier`.
- One task from the roadmap per branch or PR when practical.
- Do not commit `.env*`, `node_modules`, `.next`.

## Quality gates

Before marking a task done:

```bash
npm run lint
npm run typecheck
npm run build
```

Then manually check in the browser at 375, 768, 1280, and 1536px widths, with keyboard only, and with "Reduce motion" enabled in the OS or DevTools rendering panel.

## When unsure

Ask the human. Do not invent new sections, change copy meaning, add dependencies, or deviate from the design system without confirmation. List open questions at the end of each task summary.
