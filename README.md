# Katha Creative

A digital marketing agency website built around a restrained, macOS-inspired interface. It brings together service discovery, scroll-led storytelling, and familiar desktop patterns such as Finder lists, Messages conversations, and app windows.

## Features

- Home page with animated Messages-style hero, service Dock, statistics, and scroll-driven work stages
- Finder-style service directory with category filters and eight service detail pages
- Interactive Reminders-style training checklist
- About page with a folder window, selectable team directory, and scroll-linked timeline
- Contact form with client-side validation and a simulated success state
- Responsive layouts and reduced-motion support

The contact form does not send or store submissions. No backend or environment variables are required.

## Tech stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Motion for React
- Lucide icons
- Zod for form validation
- Inter, with Caveat used for the name-tag sticker

## Getting started

### Requirements

- Node.js 20.9 or later
- npm

### Install and run

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Start the local development server |
| `npm run build`     | Create a production build          |
| `npm run start`     | Serve the production build locally |
| `npm run lint`      | Run ESLint                         |
| `npm run typecheck` | Check TypeScript types             |

Run `npm run build` before `npm run start`.

## Pages

- `/` - Home
- `/services` - Service directory
- `/services/[slug]` - Service details
- `/about` - Agency story, team, and timeline
- `/contact` - Contact form and studio details

## Project structure

```text
src/
|-- app/           # Routes, layouts, metadata, and global styles
|-- components/    # Layout, UI, effects, and page sections
|-- data/          # Service, team, testimonial, FAQ, and site content
|-- hooks/         # Shared React hooks
|-- lib/           # Helpers and shared motion settings
`-- types/         # Shared TypeScript types
public/
`-- emoji/         # Fluent Emoji assets used by the interface
```

The Fluent Emoji assets include their license at [`public/emoji/LICENSE-fluentui-emoji.txt`](public/emoji/LICENSE-fluentui-emoji.txt).

## Configuration

Site name, tagline, contact details, and response-time copy are kept in [`src/data/site.ts`](src/data/site.ts). Update those values before publishing the site. The repository does not require API keys or other secrets to run.
