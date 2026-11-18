# Project Overview

> **Partially superseded by `docs/style-revision-v2.md`.** Visual direction, tokens, components, and motion described here are replaced where v2 says so. v2 wins on any conflict.

## Summary

Katha Creative is a full-service digital marketing agency website and portfolio project. It presents eight services and guides visitors to a contact form. The project demonstrates polished, interaction-rich frontend work.

## Concept: "Modern macOS, faithful and restrained"

The site uses a clean white and off-white canvas, with personality coming from interaction and careful recreations of familiar Mac patterns:

- A faithful macOS menu bar, window chrome, and Dock
- Finder-style service lists and Messages-style conversations
- Whitespace, typography, and hairline separators instead of decorative cards
- Fluent Emoji only in inline conversation details and the CTA sticker

Tone is friendly, casual, and a little cheeky, while staying clear and professional.

## Reference sites (for feel, not for copying)

- **heyclicky.com** — macOS window chrome, scattered stickers, casual lowercase microcopy, tweet-style testimonial cards
- **oluwatobisalawu.com** — strong personality, small easter eggs, playful micro-interactions
- **gethoy.app** — scroll-driven storytelling, Mac menu bar, iMessage-like cards, floating elements that settle into place

Do not copy layouts, assets, or copy from these sites. Take the _spirit_ only.

## Services (the 8 offerings)

1. Google Ads
2. Meta Ads
3. Social Media Management
4. Social Media Campaign
5. Digital Marketing Training Program
6. Web Development
7. Affiliate & KOL
8. Graphic Design

Full copy per service is in `content.md`.

## Goals

- Clearly explain each service and who it is for
- Funnel every visitor to `/contact` (primary conversion)
- Feel memorable and fun within the first 3 seconds (hero)
- Perform well: smooth 60fps animation on a mid-range laptop, reasonable on mobile

## Non-goals

- No backend, database, CMS, auth, or payments
- No blog, case-study pages, or multi-language support
- No dark mode (white background is a core part of the identity)
- No "boring mode" toggle (reduced motion is handled automatically via the OS setting)

## Audience

Primary: recruiters and potential freelance clients viewing the portfolio. Secondary (in-fiction): small and mid-size businesses looking for marketing help.

## Pages

| Route              | Purpose                                                                                |
| ------------------ | -------------------------------------------------------------------------------------- |
| `/`                | Home: hero, services overview, how we work, training highlight, testimonials, FAQ, CTA |
| `/services`        | Index of all services, grouped by category                                             |
| `/services/[slug]` | Detail page for each of the 8 services (one dynamic template)                          |
| `/about`           | Agency story, values, team, timeline                                                   |
| `/contact`         | iMessage-style contact form                                                            |

## Brand

- **Name:** Katha Creative
- **Name meaning (used in About copy):** "katha" means "story" in Sanskrit, and sounds close to the Indonesian "kata" (word). The agency tells brand stories that people want to share.
- **Tagline (default):** "Brands with a story worth sharing."
