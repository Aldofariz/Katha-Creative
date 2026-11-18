# Architecture: Tech Stack and Structure

## Stack

| Concern         | Choice                                            | Notes                                                                                                                             |
| --------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Framework       | **Next.js** (latest stable, App Router)           | Use `create-next-app`. Verify the current stable version before installing.                                                       |
| Language        | **TypeScript** (`strict: true`)                   |                                                                                                                                   |
| Styling         | **Tailwind CSS v4**                               | CSS-first config via `@theme` in `globals.css`. If `create-next-app` installs a different major, adapt but keep tokens identical. |
| Animation       | **Motion** (formerly Framer Motion)               | Package `motion`. Import from `motion/react`.                                                                                     |
| Forms           | `react-hook-form` + `zod` + `@hookform/resolvers` | Contact form only                                                                                                                 |
| Utilities       | `clsx`, `tailwind-merge`                          | Wrapped in `cn()` helper                                                                                                          |
| UI icons        | `lucide-react`                                    | Small UI icons only (arrows, checks). Emoji decoration uses Fluent assets.                                                        |
| Fonts           | `next/font/google`                                | **Inter** only (v2). `Caveat` only for the sticker handwriting.                                                                   |
| Package manager | **npm**                                           | Commit `package-lock.json`. Do not use pnpm or yarn, and do not create `pnpm-lock.yaml` or `yarn.lock`.                           |

**GSAP is not used.** Scroll storytelling is done with Motion's `useScroll`, `useTransform`, and `useMotionValueEvent`. Do not add GSAP unless the human asks.

## Dependencies — allowed list

```
dependencies:    next react react-dom motion react-hook-form zod @hookform/resolvers clsx tailwind-merge lucide-react
devDependencies: typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss eslint eslint-config-next prettier prettier-plugin-tailwindcss
```

Anything else requires approval.

### Install commands (npm)

```bash
npx create-next-app@latest katha-creative --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
cd katha-creative
npm install motion react-hook-form zod @hookform/resolvers clsx tailwind-merge lucide-react
npm install -D prettier prettier-plugin-tailwindcss
```

Run scripts with `npm run <script>` (for example `npm run dev`, `npm run lint`, `npm run typecheck`, `npm run build`). Flags of `create-next-app` can change between versions; check `npx create-next-app@latest --help` if one is rejected.

## Folder structure

```
katha-creative/
├─ AGENTS.md
├─ docs/                      # these documentation files
├─ public/
│  ├─ emoji/                  # Fluent Emoji 3D assets (WebP, ~256px)
│  ├─ og.png                  # Open Graph image (1200x630)
│  └─ favicon.ico
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx           # fonts, metadata, MenuBarNav, Footer, EmojiBackdrop
│  │  ├─ globals.css          # Tailwind import, @theme tokens, glass utilities
│  │  ├─ page.tsx             # Home
│  │  ├─ not-found.tsx
│  │  ├─ services/
│  │  │  ├─ page.tsx          # Services index
│  │  │  └─ [slug]/page.tsx   # Service detail (generateStaticParams)
│  │  ├─ about/page.tsx
│  │  └─ contact/page.tsx
│  ├─ components/
│  │  ├─ layout/              # MenuBarNav, Footer, PageShell
│  │  ├─ ui/                  # Button, GlassCard, WindowCard, Badge, Accordion, ChatBubble
│  │  ├─ effects/             # FloatingEmoji, EmojiBackdrop, Spotlight, ClickBurst
│  │  ├─ sections/
│  │  │  ├─ home/             # Hero, StatsStrip, ServicesGrid, HowWeWork, TrainingHighlight, Testimonials, FaqSection, CtaBanner
│  │  │  ├─ services/         # ServicesIndexList
│  │  │  ├─ service-detail/   # DetailHero, Includes, Process, FitFor, RelatedServices
│  │  │  ├─ about/            # Story, Values, Team, Timeline
│  │  │  └─ contact/          # ContactWindow, ContactForm
│  ├─ data/
│  │  ├─ services.ts          # typed Service[] (see content.md)
│  │  ├─ emoji.ts             # emoji manifest: key -> file path + alt
│  │  ├─ testimonials.ts
│  │  ├─ team.ts
│  │  ├─ faqs.ts
│  │  ├─ stats.ts
│  │  └─ timeline.ts
│  ├─ lib/
│  │  ├─ cn.ts
│  │  ├─ motion.ts            # shared variants, spring presets, easing
│  │  └─ schemas.ts           # zod schemas
│  ├─ hooks/
│  │  ├─ use-mouse-position.ts
│  │  ├─ use-is-mobile.ts
│  │  └─ use-reduced-motion-safe.ts
│  └─ types/
│     └─ index.ts             # Service, Testimonial, TeamMember, etc.
├─ .prettierrc
├─ eslint.config.mjs
├─ next.config.ts
├─ tsconfig.json
└─ package.json
```

## Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit"
}
```

(If the installed Next.js version no longer ships `next lint`, switch to the `eslint` CLI and keep the script name `lint`.)

## Fluent Emoji assets

Source: the `microsoft/fluentui-emoji` repository on GitHub (MIT license). Use the **3D** style PNGs.

1. Download only the emoji listed in `animation-spec.md` (do not copy the whole repo).
2. Convert to WebP at about 256px wide to keep the bundle light.
3. Save to `public/emoji/<key>.webp` with simple kebab-case keys (`rocket.webp`, `sparkles.webp`).
4. Register each in `src/data/emoji.ts` with an `alt` of `""` (decorative) unless it conveys meaning.
5. Add the MIT license text and attribution to `public/emoji/LICENSE-fluentui-emoji.txt` (keep the license file in the repo; footer credit is not required).
6. Folder and file names in the upstream repo can differ from what you expect (some include skin-tone subfolders or different casing). Verify paths in the repo before scripting the download.

## Environment

No environment variables are required. Do not add API keys or analytics.
