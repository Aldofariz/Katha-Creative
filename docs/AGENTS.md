# AGENTS.md — Katha Creative

> Entry point for any AI coding agent working on this repository.
> Read this file first, then read the docs in `/docs` in the order listed below.

## What this project is

**Katha Creative** is a digital marketing agency website, built as a **portfolio project** (not a portfolio site) to showcase frontend craft: a modern, faithful macOS-inspired UI with playful interaction. Business content (clients, stats, team, testimonials) is placeholder data.

> **Internal note for agents only:** the agency is fictional. **Never** say so anywhere visitors can see it (UI, metadata, README shown publicly). The site presents itself as a real, serious agency.

- Language of all website copy: **English**
- Pages: Home, Services, Service detail (8 dynamic pages), About, Contact
- Backend: **none**. Contact form is UI + validation only.

## Read these docs in order

| Order | File | Purpose |
|---|------|---------|
| 1 | `docs/project-overview.md` | Goals, scope, audience, non-goals |
| 2 | `docs/architecture.md` | Stack, dependencies, folder structure |
| 3 | `docs/design-system.md` | Colors, type, glass, window cards, copy rules |
| 4 | `docs/animation-spec.md` | Floating emoji, interactions, scroll storytelling, performance |
| 5 | `docs/pages-spec.md` | Section-by-section spec for every page |
| 6 | `docs/content.md` | All copy and data (services, FAQs, testimonials, team) |
| 7 | `docs/coding-standards.md` | Code standards, accessibility, SEO, definition of done |
| 8 | `docs/roadmap.md` | Ordered tasks with acceptance criteria (v1) |
| 9 | `docs/style-revision-v2.md` | **Active styling revision. Overrides v1 visual direction. Current work follows its tasks (V2-1 to V2-13).** |

## Ground rules (non-negotiable)

0. **Precedence:** `docs/style-revision-v2.md` overrides the visual direction in docs 3, 4, 5, and parts of 1 and 6. v1 is already built, so **restyle and reuse existing components; do not rebuild from scratch.**
1. **Follow the docs.** If a doc and your instinct disagree, the doc wins. If a doc is ambiguous or contradicts another doc, stop and ask the human instead of guessing.
2. **Work task by task** using `docs/roadmap.md`. Do not start a task before the previous one meets its acceptance criteria.
3. **TypeScript strict. No `any`.** No `// @ts-ignore` without a comment explaining why.
4. **Server Components by default.** Add `"use client"` only for components that need state, effects, or Motion.
5. **Use npm only** (`npm install`, `npm run <script>`). Never use pnpm or yarn, and never commit another lockfile besides `package-lock.json`.
6. **No new dependencies** beyond those listed in `docs/architecture.md` without asking.
7. **Respect `prefers-reduced-motion`** everywhere. There is intentionally no "boring mode" toggle.
7b. **No floating background emoji, no pastel gradients, no glass on content.** See v2.
8. **Do not bundle Apple emoji.** Use Microsoft Fluent Emoji (MIT) only. See `docs/style-revision-v2.md` for where emoji are allowed.
9. **No deployment work.** Do not add deploy config, CI/CD, hosting instructions, or deploy steps to tasks or the README. The owner deploys the site personally.
10. **Verify before claiming done:** `npm run lint`, `npm run typecheck`, and `npm run build` must all pass.

## Definition of done (every task)

- Meets the task's acceptance criteria in the roadmap
- Responsive at 375px, 768px, 1280px, 1536px
- Keyboard accessible with visible focus
- No console errors or warnings
- Lint, typecheck, and build pass
- Short summary of what changed and any open questions
