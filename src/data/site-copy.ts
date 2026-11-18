import type { EmojiKey } from "@/data/emoji";

export const siteCopy = {
  brand: "Katha Creative",
  tagline: "Brands with a story worth sharing.",
  footerNote:
    "Katha Creative is a fictional agency. This site is a demo project.",
  contactEmail: "hello@katha.example",
  location: "Bandung, Indonesia",
  responseTime: "We reply within one business day.",
  home: {
    heroTitle: "Brands with a story worth sharing.",
    heroSubline:
      "Katha Creative runs ads, social, design, and websites for brands that want to be talked about and measured.",
    trustLine: "Trusted by 120+ growing brands.",
    servicesTitle: "Everything your brand needs to get noticed",
    servicesIntro:
      "Eight services, one team. Pick one or let us build the whole plan.",
    howWeWorkTitle: "From first message to first results",
    trainingTitle: "Want to do this yourself? Learn with us.",
    testimonialsTitle: "Kind words from people we've worked with",
    faqTitle: "Questions, answered",
    ctaTitle: "Got a brand with a story? Let's make people talk.",
    ctaLine:
      "Tell us what you're building. We'll reply within one business day.",
    stages: [
      {
        title: "Brief",
        received: "we sell handmade candles. sales are flat.",
        sent: "tell us who buys, what they love, and what you've tried.",
        window: "A short brief form filling itself in (goal, audience, budget)",
      },
      {
        title: "Strategy",
        received: "so what's the plan?",
        sent: "ads where buyers search, content where they scroll, and one clear offer.",
        window: "A simple board with three cards: Search, Social, Offer",
      },
      {
        title: "Launch",
        received: "when do we go live?",
        sent: "tuesday. creatives approved, tracking checked, budget set.",
        window: "A launch checklist ticking itself off",
      },
      {
        title: "Report",
        received: "how did week one go?",
        sent: "sales up 38%. here's what we'll scale next.",
        window:
          'A small bar chart rising, with "Delivered" under the final bubble',
      },
    ],
  },
  about: {
    title: "We tell brand stories.",
    intro:
      "Katha Creative is a team of marketers, designers, and developers who believe good marketing starts with a good story.",
    nameNote:
      '"Katha" means "story" in Sanskrit, and it sounds a lot like "kata", the Indonesian word for "word". Stories made of words: that\'s us.',
    story: [
      "Katha began in a spare room with two laptops and a belief that every brand has a story worth telling. Our first projects taught us that pretty ads alone don't move a business forward.",
      "So we built a team that cares about both the idea and the results. Today, we bring creative, media, and technology together to help brands grow with a story people remember.",
    ],
    values: [
      {
        title: "Story first.",
        description: "Every campaign starts with something worth saying.",
        emoji: "speech-balloon",
      },
      {
        title: "Numbers don't lie.",
        description: "We measure everything and share it honestly.",
        emoji: "chart-increasing",
      },
      {
        title: "Make it fun.",
        description: "If we're not enjoying it, your audience won't either.",
        emoji: "party-popper",
      },
      {
        title: "Say it plainly.",
        description: "No jargon, no mystery, no surprise invoices.",
        emoji: "light-bulb",
      },
    ] satisfies { title: string; description: string; emoji: EmojiKey }[],
  },
  contact: {
    title: "Tell us what you're building.",
    supportLine: "Share a few details and we'll reply within one business day.",
    windowTitle: "New message",
    successReply: "got it! we'll reply within one business day.",
    demoNote: "This is a demo form. Nothing is sent.",
    validation: {
      name: "Enter your name (2 to 80 characters).",
      email: "Enter a valid email address.",
      service: "Choose a service, or pick Not sure yet.",
      message: "Tell us a bit more (at least 20 characters).",
    },
  },
} as const;
