# Content and Data

All content is **fictional**. Implement as typed data in `src/data/*.ts` and `src/types/index.ts`. Copy is English, sentence case. Tweak wording freely if it stays on tone (see `design-system.md`, "Copywriting rules").

## Types (`src/types/index.ts`)

```ts
import type { EmojiKey } from "@/data/emoji";

export type ServiceCategory =
  | "Advertising"
  | "Social"
  | "Creative and build"
  | "Growth and learning";
export type AccentColor =
  | "pink"
  | "yellow"
  | "mint"
  | "sky"
  | "coral"
  | "lilac"
  | "lime"
  | "peach";

export type FaqItem = { question: string; answer: string };
export type IncludedItem = {
  title: string;
  description: string;
  emoji?: EmojiKey;
};
export type ProcessStep = { title: string; description: string };

export type Service = {
  slug: string;
  title: string;
  name: string; // short window name, e.g. "google-ads.app"
  tagline: string;
  summary: string;
  category: ServiceCategory;
  emoji: EmojiKey;
  accent: AccentColor;
  chips: string[]; // 2–3 short feature chips for cards
  included: IncludedItem[]; // 5–6 (training uses `curriculum` instead; see below)
  steps: ProcessStep[]; // exactly 4
  fitFor: string[]; // exactly 3
  faqs: FaqItem[]; // exactly 2
  related: string[]; // 3 slugs
  program?: ProgramDetails; // training only
  curriculum?: { module: string; topics: string }[]; // training only
};

export type ProgramDetails = {
  duration: string;
  format: string;
  level: string;
  classSize: string;
};
export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  accent: AccentColor;
};
export type TeamMember = {
  name: string;
  role: string;
  funFact: string;
  accent: AccentColor;
};
export type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};
export type TimelineItem = { year: string; title: string; description: string };
```

---

## Global copy

- **Brand:** Katha Creative
- **Tagline:** Brands with a story worth sharing.
- **Footer note:** Katha Creative is a fictional agency. This site is a demo project.
- **Fictional contact:** hello@katha.example, Bandung, Indonesia, "We reply within one business day."

## Home copy

- **Hero h1:** Brands with a story worth sharing.
- **Hero subline:** Katha Creative runs ads, social, design, and websites for brands that want to be talked about and measured.
- **Hero trust line:** Trusted by 120+ growing brands.
- **Services section title:** Everything your brand needs to get noticed
- **Services intro:** Eight services, one team. Pick one or let us build the whole plan.
- **How we work title:** From first message to first results
- **Training section title:** Want to do this yourself? Learn with us.
- **Testimonials title:** Kind words from people we've worked with
- **FAQ title:** Questions, answered
- **CTA banner headline:** Got a brand with a story? Let's make people talk.
- **CTA banner line:** Tell us what you're building. We'll reply within one business day.

### Stats (`stats.ts`)

| Label              | Value | Prefix | Suffix | Decimals |
| ------------------ | ----- | ------ | ------ | -------- |
| Campaigns launched | 480   |        | +      | 0        |
| Ad spend managed   | 12    | $      | M+     | 0        |
| Average ROAS       | 4.6   |        | x      | 1        |
| Client retention   | 92    |        | %      | 0        |

### Fictional client wordmarks (text only)

Kopi Senja, Lumio, Terra Wear, Nimbus Pay, Pasar Kita, Orbit Fit

### How we work stages (storytelling content)

| Stage    | Chat (received = client, sent = Katha)                                                                                   | Side window                                                       |
| -------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| Brief    | received: "we sell handmade candles. sales are flat." / sent: "tell us who buys, what they love, and what you've tried." | A short brief form filling itself in (goal, audience, budget)     |
| Strategy | received: "so what's the plan?" / sent: "ads where buyers search, content where they scroll, and one clear offer."       | A simple board with three cards: Search, Social, Offer            |
| Launch   | received: "when do we go live?" / sent: "tuesday. creatives approved, tracking checked, budget set."                     | A launch checklist ticking itself off                             |
| Report   | received: "how did week one go?" / sent: "sales up 38%. here's what we'll scale next."                                   | A small bar chart rising, with "Delivered" under the final bubble |

### Home FAQs (`faqs.ts`)

1. **What does Katha Creative do?** We run paid ads, manage social media, design and build websites, and run influencer programs. We also teach digital marketing.
2. **Do I have to buy a full package?** No. Most clients start with one service, like Google Ads or social media management, and add more when they need them.
3. **How long until I see results?** Paid ads usually show early signals within two to four weeks. Social and brand work builds over two to three months. We agree on milestones before we start.
4. **How do you charge?** Monthly retainers for ongoing work and fixed quotes for projects like websites and campaigns. Ad spend is paid directly to the platforms by you.
5. **Can I run my own ads after working with you?** Yes. We document everything, and our training program teaches your team how to run ads and social on their own.
6. **Which industries do you work with?** Mostly e-commerce, food and beverage, fashion, education, and local services.

---

## Services (`services.ts`)

Related-services rule: `related` lists 3 slugs (exclude self), preferring the same category.

### 1. Google Ads

- **slug:** `google-ads` | **name:** `google-ads.app` | **category:** Advertising | **emoji:** `magnifier` | **accent:** `sky`
- **tagline:** Be the answer when people search.
- **summary:** We build and manage Search, Shopping, and Performance Max campaigns that put your brand in front of people already looking for what you sell.
- **chips:** Search, Shopping, Performance Max
- **included:** Keyword and competitor research / Campaign and ad group setup / Ad copy and extensions / Conversion tracking setup / Weekly bid and budget optimization / Monthly performance report
- **steps:** Audit your account and goals → Build campaigns and tracking → Launch and monitor daily for the first week → Optimize and report every month
- **fitFor:** Businesses with products people already search for / Shops that want more qualified leads / Teams whose ad spend isn't paying back
- **faqs:** _How much should I spend?_ Start with a budget that can produce at least 30 clicks a day in your market; we'll tell you honestly if yours is too low. / _Do you need access to my Google account?_ We'll ask for manager-level access so you always keep ownership.
- **related:** `meta-ads`, `web-development`, `social-media-campaign`

### 2. Meta Ads

- **slug:** `meta-ads` | **name:** `meta-ads.app` | **category:** Advertising | **emoji:** `megaphone` | **accent:** `lilac`
- **tagline:** Find the people who'll love you before they know you.
- **summary:** Facebook and Instagram campaigns built around strong creative, sharp audiences, and honest numbers, from first impression to purchase.
- **chips:** Facebook, Instagram, Retargeting
- **included:** Audience and pixel setup / Creative testing plan / Ad copy and format variations / Retargeting funnels / Weekly optimization / Monthly report with learnings
- **steps:** Define audiences and offer → Produce and test creatives → Scale what works and cut what doesn't → Report on results and next tests
- **fitFor:** Brands with visual products / Shops ready to scale past organic reach / Businesses launching a new offer
- **faqs:** _Do I need to make creatives myself?_ No. Our design team can produce static and video ads, or we can work with yours. / _How soon can ads go live?_ Usually within one week of kickoff.
- **related:** `google-ads`, `graphic-design`, `social-media-campaign`

### 3. Social Media Management

- **slug:** `social-media-management` | **name:** `social-manager.app` | **category:** Social | **emoji:** `mobile-phone` | **accent:** `pink`
- **tagline:** Your brand, posting like it has a personality.
- **summary:** We plan, create, schedule, and manage your social channels so you show up consistently and your community feels heard.
- **chips:** Content calendar, Community, Reporting
- **included:** Monthly content calendar / Post design and caption writing / Scheduling and publishing / Community replies and moderation / Trend and hashtag research / Monthly analytics report
- **steps:** Learn your brand voice → Plan a monthly calendar → Create, approve, and publish → Review analytics and adjust
- **fitFor:** Brands without time for daily posting / Businesses with inconsistent content / Teams that want a clear brand voice
- **faqs:** _Which platforms do you manage?_ Instagram, TikTok, Facebook, X, and LinkedIn. We recommend the ones where your audience actually is. / _Can I approve posts first?_ Yes. You approve the calendar and individual posts before anything goes live.
- **related:** `social-media-campaign`, `graphic-design`, `affiliate-kol`

### 4. Social Media Campaign

- **slug:** `social-media-campaign` | **name:** `campaign.app` | **category:** Social | **emoji:** `rocket` | **accent:** `coral`
- **tagline:** One big idea, everywhere your audience scrolls.
- **summary:** Time-boxed campaigns with a clear concept, a content plan, and a launch moment, built to get people talking and sharing.
- **chips:** Concept, Launch, Content series
- **included:** Campaign concept and message / Content series across formats / Launch plan and timeline / Paid boost plan / Community activation / Wrap-up report
- **steps:** Set the goal and big idea → Plan the content and channels → Launch and engage live → Measure and share what we learned
- **fitFor:** Product launches / Seasonal and event promotions / Brands that need a spike in awareness
- **faqs:** _How long does a campaign run?_ Typically four to eight weeks, plus a planning phase of two weeks. / _Can this include influencers?_ Yes. We pair campaigns with our Affiliate & KOL service.
- **related:** `social-media-management`, `affiliate-kol`, `meta-ads`

### 5. Digital Marketing Training Program

- **slug:** `digital-marketing-training` | **name:** `training.app` | **category:** Growth and learning | **emoji:** `graduation-cap` | **accent:** `yellow`
- **tagline:** Learn digital marketing by doing it.
- **summary:** A hands-on program where you run real campaigns, build a portfolio, and learn the skills to start or grow a digital marketing career.
- **chips:** Hands-on, Mentors, Portfolio
- **program:** duration "8 weeks" / format "Live online sessions, plus weekly assignments" / level "Beginner friendly" / classSize "Up to 20 learners"
- **curriculum:** (6 modules)
  1. Marketing foundations: funnels, audiences, and goals
  2. Google Ads: search campaigns from scratch
  3. Meta Ads: creative, targeting, and testing
  4. Social media: content planning and community
  5. Analytics: reading numbers and reporting
  6. Capstone: run a mini campaign and present results
- **steps:** Join and take a skills check → Learn in live weekly sessions → Practice on real campaign briefs → Present your capstone and get feedback
- **fitFor:** Career switchers / Small business owners who want to do it themselves / Fresh graduates building a portfolio
- **faqs:** _Do I need experience?_ No. The program starts from the basics. / _Will I get a certificate?_ Yes, a certificate of completion after the capstone. (Fictional.)
- **related:** `google-ads`, `meta-ads`, `social-media-management`

### 6. Web Development

- **slug:** `web-development` | **name:** `web-dev.app` | **category:** Creative and build | **emoji:** `laptop` | **accent:** `mint`
- **tagline:** Websites that load fast and convert faster.
- **summary:** Landing pages, company sites, and online stores designed and built to be quick, clear, and ready for your campaigns.
- **chips:** Landing pages, Company sites, Online stores
- **included:** UX and wireframes / Responsive design and build / Speed and SEO basics / Analytics and tracking setup / CMS or content handover / 30 days of post-launch support
- **steps:** Plan the sitemap and goals → Design the look and feel → Build, test, and refine → Launch and support
- **fitFor:** Brands launching a new product / Businesses with an outdated site / Campaigns that need a high-converting landing page
- **faqs:** _How long does a website take?_ A landing page takes about two weeks; a company site four to eight weeks. / _Will I be able to edit it myself?_ Yes. We set up a simple editing workflow and train you.
- **related:** `graphic-design`, `google-ads`, `meta-ads`

### 7. Affiliate & KOL

- **slug:** `affiliate-kol` | **name:** `affiliate-kol.app` | **category:** Growth and learning | **emoji:** `handshake` | **accent:** `peach`
- **tagline:** Let the right voices introduce you.
- **summary:** We find, brief, and manage creators and affiliates who fit your brand, then track what they actually deliver.
- **chips:** Creators, Affiliates, Tracking
- **included:** Creator shortlist and vetting / Outreach and negotiation / Briefs and content guidelines / Affiliate links and code tracking / Campaign management / Results report
- **steps:** Define goals and ideal creators → Shortlist and negotiate → Brief and publish together → Track and pay on performance
- **fitFor:** Brands that rely on trust and word of mouth / Shops adding a new sales channel / Launches that need social proof
- **faqs:** _How do you pick creators?_ By audience fit and engagement quality first, follower count second. / _Can I pay only for results?_ Yes. Affiliate setups can be commission-based.
- **related:** `social-media-campaign`, `social-media-management`, `meta-ads`

### 8. Graphic Design

- **slug:** `graphic-design` | **name:** `design.app` | **category:** Creative and build | **emoji:** `artist-palette` | **accent:** `lime`
- **tagline:** Visuals that stop the scroll and fit your brand.
- **summary:** Logos, brand kits, social graphics, ad creatives, and print materials that look consistent everywhere your brand shows up.
- **chips:** Branding, Social graphics, Ad creatives
- **included:** Logo and brand guidelines / Social media templates / Ad creatives in multiple sizes / Packaging and print layouts / Presentation and pitch decks / Editable source files
- **steps:** Brief and mood board → First concepts → Revisions together → Final files and handover
- **fitFor:** New brands that need an identity / Brands with inconsistent visuals / Campaigns needing fresh creatives fast
- **faqs:** _How many revisions are included?_ Two rounds for most projects. Extra rounds are quoted fairly. / _Do I own the final files?_ Yes. You receive full rights and editable source files.
- **related:** `social-media-management`, `web-development`, `meta-ads`

---

## Testimonials (`testimonials.ts`) — fictional

1. **Maya Putri**, Founder, Kopi Senja (`pink`): "Our Google Ads went from confusing to profitable in six weeks. They explained every number."
2. **Daniel Hartono**, Marketing Lead, Lumio (`sky`): "The Meta creatives were the best we've ever run. Cost per purchase dropped by a third."
3. **Salsabila Rahma**, Owner, Terra Wear (`coral`): "They gave our Instagram a personality. People finally reply and share."
4. **Kevin Santoso**, Head of Growth, Nimbus Pay (`lilac`): "The launch campaign felt effortless. Everyone talked about it for weeks."
5. **Intan Maharani**, Brand Manager, Pasar Kita (`mint`): "Their KOL picks were spot on. Real fans, real sales, no wasted budget."
6. **Rizky Pratama**, Operations, Orbit Fit (`yellow`): "I joined the training program with zero experience and ran my first campaign in week four."

## Team (`team.ts`) — fictional

| Name           | Role                          | Fun fact                               | Accent |
| -------------- | ----------------------------- | -------------------------------------- | ------ |
| Ayu Prameswari | Founder and creative director | Has a collection of 40 vintage cameras | pink   |
| Raka Mahendra  | Head of performance           | Can predict a CPC within cents         | sky    |
| Sinta Larasati | Social media lead             | Replies to comments faster than anyone | coral  |
| Dimas Wiratama | Lead developer                | Writes tests for fun                   | mint   |
| Nadia Kusuma   | Senior designer               | Draws the office cat daily             | lime   |
| Bima Aryasatya | Partnerships and KOL manager  | Knows a creator in every city          | peach  |

## About copy

- **h1:** We tell brand stories.
- **Intro:** Katha Creative is a team of marketers, designers, and developers who believe good marketing starts with a good story.
- **Name note:** "Katha" means "story" in Sanskrit, and it sounds a lot like "kata", the Indonesian word for "word". Stories made of words: that's us.
- **Story paragraphs (2):** Write 2 short paragraphs about starting in a spare room, learning that pretty ads are not enough, and building a team that cares about both creativity and results.

### Values (4)

1. **Story first.** Every campaign starts with something worth saying. (emoji: `speech-balloon`)
2. **Numbers don't lie.** We measure everything and share it honestly. (emoji: `chart-increasing`)
3. **Make it fun.** If we're not enjoying it, your audience won't either. (emoji: `party-popper`)
4. **Say it plainly.** No jargon, no mystery, no surprise invoices. (emoji: `light-bulb`)

### Timeline (`timeline.ts`)

1. **2019** Katha starts: Two founders, two laptops, one spare room.
2. **2020** First 20 clients: Local shops go online and we help them get found.
3. **2022** Social studio opens: Content, community, and design under one roof.
4. **2024** Training program launches: We start teaching what we do.
5. **2026** 480 campaigns and counting: A bigger team, a new studio, same spare-room energy.

## Contact copy

- **h1:** Tell us what you're building.
- **Support line:** Share a few details and we'll reply within one business day.
- **Window title:** New message
- **Success reply (bubble):** got it! we'll reply within one business day.
- **Demo note:** This is a demo form. Nothing is sent.
- **Validation messages:** "Enter your name (2 to 80 characters)." / "Enter a valid email address." / "Choose a service, or pick Not sure yet." / "Tell us a bit more (at least 20 characters)."
