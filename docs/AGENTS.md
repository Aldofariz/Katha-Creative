# AGENTS.md — Katha Creative

> Entry point for any AI coding agent working on this repository.
> Read this file first, then read the docs in `/docs` in the order listed below.

## What this project is

**Katha Creative** is a fictional digital marketing agency website. It is a **portfolio project** (not a portfolio site) built to showcase frontend craft: playful, highly interactive, macOS-inspired UI. All business content (clients, stats, team, testimonials) is **fictional demo data**.

- Language of all website copy: **English**
- Pages: Home, Services, Service detail (8 dynamic pages), About, Contact
- Backend: **none**. Contact form is UI + validation only.

## Read these docs in order

| Order | File                       | Purpose                                                        |
| ----- | -------------------------- | -------------------------------------------------------------- |
| 1     | `docs/project-overview.md` | Goals, scope, audience, non-goals                              |
| 2     | `docs/architecture.md`     | Stack, dependencies, folder structure                          |
| 3     | `docs/design-system.md`    | Colors, type, glass, window cards, copy rules                  |
| 4     | `docs/animation-spec.md`   | Floating emoji, interactions, scroll storytelling, performance |
| 5     | `docs/pages-spec.md`       | Section-by-section spec for every page                         |
| 6     | `docs/content.md`          | All copy and data (services, FAQs, testimonials, team)         |
| 7     | `docs/coding-standards.md` | Code standards, accessibility, SEO, definition of done         |
| 8     | `docs/roadmap.md`          | Ordered tasks with acceptance criteria                         |

## Ground rules (non-negotiable)

1. **Follow the docs.** If a doc and your instinct disagree, the doc wins. If a doc is ambiguous or contradicts another doc, stop and ask the human instead of guessing.
2. **Work task by task** using `docs/roadmap.md`. Do not start a task before the previous one meets its acceptance criteria.
3. **TypeScript strict. No `any`.** No `// @ts-ignore` without a comment explaining why.
4. **Server Components by default.** Add `"use client"` only for components that need state, effects, or Motion.
5. **Use npm only** (`npm install`, `npm run <script>`). Never use pnpm or yarn, and never commit another lockfile besides `package-lock.json`.
6. **No new dependencies** beyond those listed in `docs/architecture.md` without asking.
7. **Respect `prefers-reduced-motion`** everywhere. There is intentionally no "boring mode" toggle.
8. **Do not bundle Apple emoji.** Use Microsoft Fluent Emoji (MIT) only. See `docs/animation-spec.md`.
9. **Verify before claiming done:** `npm run lint`, `npm run typecheck`, and `npm run build` must all pass.

## Definition of done (every task)

- Meets the task's acceptance criteria in the roadmap
- Responsive at 375px, 768px, 1280px, 1536px
- Keyboard accessible with visible focus
- No console errors or warnings
- Lint, typecheck, and build pass
- Short summary of what changed and any open questions

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
