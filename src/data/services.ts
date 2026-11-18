import type { FaqItem, IncludedItem, ProcessStep, Service } from "@/types";

function includedItems(...titles: string[]): IncludedItem[] {
  return titles.map((title) => ({ title, description: title }));
}

function processSteps(...titles: string[]): ProcessStep[] {
  return titles.map((title) => ({ title, description: title }));
}

function serviceFaqs(
  firstQuestion: string,
  firstAnswer: string,
  secondQuestion: string,
  secondAnswer: string,
): FaqItem[] {
  return [
    { question: firstQuestion, answer: firstAnswer },
    { question: secondQuestion, answer: secondAnswer },
  ];
}

export const services: Service[] = [
  {
    slug: "google-ads",
    title: "Google Ads",
    name: "google-ads.app",
    tagline: "Be the answer when people search.",
    summary:
      "We build and manage Search, Shopping, and Performance Max campaigns that put your brand in front of people already looking for what you sell.",
    category: "Advertising",
    emoji: "magnifier",
    accent: "sky",
    chips: ["Search", "Shopping", "Performance Max"],
    included: includedItems(
      "Keyword and competitor research",
      "Campaign and ad group setup",
      "Ad copy and extensions",
      "Conversion tracking setup",
      "Weekly bid and budget optimization",
      "Monthly performance report",
    ),
    steps: processSteps(
      "Audit your account and goals",
      "Build campaigns and tracking",
      "Launch and monitor daily for the first week",
      "Optimize and report every month",
    ),
    fitFor: [
      "Businesses with products people already search for",
      "Shops that want more qualified leads",
      "Teams whose ad spend isn't paying back",
    ],
    faqs: serviceFaqs(
      "How much should I spend?",
      "Start with a budget that can produce at least 30 clicks a day in your market; we'll tell you honestly if yours is too low.",
      "Do you need access to my Google account?",
      "We'll ask for manager-level access so you always keep ownership.",
    ),
    related: ["meta-ads", "web-development", "social-media-campaign"],
  },
  {
    slug: "meta-ads",
    title: "Meta Ads",
    name: "meta-ads.app",
    tagline: "Find the people who'll love you before they know you.",
    summary:
      "Facebook and Instagram campaigns built around strong creative, sharp audiences, and honest numbers, from first impression to purchase.",
    category: "Advertising",
    emoji: "megaphone",
    accent: "lilac",
    chips: ["Facebook", "Instagram", "Retargeting"],
    included: includedItems(
      "Audience and pixel setup",
      "Creative testing plan",
      "Ad copy and format variations",
      "Retargeting funnels",
      "Weekly optimization",
      "Monthly report with learnings",
    ),
    steps: processSteps(
      "Define audiences and offer",
      "Produce and test creatives",
      "Scale what works and cut what doesn't",
      "Report on results and next tests",
    ),
    fitFor: [
      "Brands with visual products",
      "Shops ready to scale past organic reach",
      "Businesses launching a new offer",
    ],
    faqs: serviceFaqs(
      "Do I need to make creatives myself?",
      "No. Our design team can produce static and video ads, or we can work with yours.",
      "How soon can ads go live?",
      "Usually within one week of kickoff.",
    ),
    related: ["google-ads", "graphic-design", "social-media-campaign"],
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    name: "social-manager.app",
    tagline: "Your brand, posting like it has a personality.",
    summary:
      "We plan, create, schedule, and manage your social channels so you show up consistently and your community feels heard.",
    category: "Social",
    emoji: "mobile-phone",
    accent: "pink",
    chips: ["Content calendar", "Community", "Reporting"],
    included: includedItems(
      "Monthly content calendar",
      "Post design and caption writing",
      "Scheduling and publishing",
      "Community replies and moderation",
      "Trend and hashtag research",
      "Monthly analytics report",
    ),
    steps: processSteps(
      "Learn your brand voice",
      "Plan a monthly calendar",
      "Create, approve, and publish",
      "Review analytics and adjust",
    ),
    fitFor: [
      "Brands without time for daily posting",
      "Businesses with inconsistent content",
      "Teams that want a clear brand voice",
    ],
    faqs: serviceFaqs(
      "Which platforms do you manage?",
      "Instagram, TikTok, Facebook, X, and LinkedIn. We recommend the ones where your audience actually is.",
      "Can I approve posts first?",
      "Yes. You approve the calendar and individual posts before anything goes live.",
    ),
    related: ["social-media-campaign", "graphic-design", "affiliate-kol"],
  },
  {
    slug: "social-media-campaign",
    title: "Social Media Campaign",
    name: "campaign.app",
    tagline: "One big idea, everywhere your audience scrolls.",
    summary:
      "Time-boxed campaigns with a clear concept, a content plan, and a launch moment, built to get people talking and sharing.",
    category: "Social",
    emoji: "rocket",
    accent: "coral",
    chips: ["Concept", "Launch", "Content series"],
    included: includedItems(
      "Campaign concept and message",
      "Content series across formats",
      "Launch plan and timeline",
      "Paid boost plan",
      "Community activation",
      "Wrap-up report",
    ),
    steps: processSteps(
      "Set the goal and big idea",
      "Plan the content and channels",
      "Launch and engage live",
      "Measure and share what we learned",
    ),
    fitFor: [
      "Product launches",
      "Seasonal and event promotions",
      "Brands that need a spike in awareness",
    ],
    faqs: serviceFaqs(
      "How long does a campaign run?",
      "Typically four to eight weeks, plus a planning phase of two weeks.",
      "Can this include influencers?",
      "Yes. We pair campaigns with our Affiliate & KOL service.",
    ),
    related: ["social-media-management", "affiliate-kol", "meta-ads"],
  },
  {
    slug: "digital-marketing-training",
    title: "Digital Marketing Training Program",
    name: "training.app",
    tagline: "Learn digital marketing by doing it.",
    summary:
      "A hands-on program where you run real campaigns, build a portfolio, and learn the skills to start or grow a digital marketing career.",
    category: "Growth and learning",
    emoji: "graduation-cap",
    accent: "yellow",
    chips: ["Hands-on", "Mentors", "Portfolio"],
    included: [],
    program: {
      duration: "8 weeks",
      format: "Live online sessions, plus weekly assignments",
      level: "Beginner friendly",
      classSize: "Up to 20 learners",
    },
    curriculum: [
      {
        module: "Marketing foundations",
        topics: "Funnels, audiences, and goals",
      },
      {
        module: "Google Ads",
        topics: "Search campaigns from scratch",
      },
      {
        module: "Meta Ads",
        topics: "Creative, targeting, and testing",
      },
      {
        module: "Social media",
        topics: "Content planning and community",
      },
      {
        module: "Analytics",
        topics: "Reading numbers and reporting",
      },
      {
        module: "Capstone",
        topics: "Run a mini campaign and present results",
      },
    ],
    steps: processSteps(
      "Join and take a skills check",
      "Learn in live weekly sessions",
      "Practice on real campaign briefs",
      "Present your capstone and get feedback",
    ),
    fitFor: [
      "Career switchers",
      "Small business owners who want to do it themselves",
      "Fresh graduates building a portfolio",
    ],
    faqs: serviceFaqs(
      "Do I need experience?",
      "No. The program starts from the basics.",
      "Will I get a certificate?",
      "Yes, a certificate of completion after the capstone. (Fictional.)",
    ),
    related: ["google-ads", "meta-ads", "social-media-management"],
  },
  {
    slug: "web-development",
    title: "Web Development",
    name: "web-dev.app",
    tagline: "Websites that load fast and convert faster.",
    summary:
      "Landing pages, company sites, and online stores designed and built to be quick, clear, and ready for your campaigns.",
    category: "Creative and build",
    emoji: "laptop",
    accent: "mint",
    chips: ["Landing pages", "Company sites", "Online stores"],
    included: includedItems(
      "UX and wireframes",
      "Responsive design and build",
      "Speed and SEO basics",
      "Analytics and tracking setup",
      "CMS or content handover",
      "30 days of post-launch support",
    ),
    steps: processSteps(
      "Plan the sitemap and goals",
      "Design the look and feel",
      "Build, test, and refine",
      "Launch and support",
    ),
    fitFor: [
      "Brands launching a new product",
      "Businesses with an outdated site",
      "Campaigns that need a high-converting landing page",
    ],
    faqs: serviceFaqs(
      "How long does a website take?",
      "A landing page takes about two weeks; a company site four to eight weeks.",
      "Will I be able to edit it myself?",
      "Yes. We set up a simple editing workflow and train you.",
    ),
    related: ["graphic-design", "google-ads", "meta-ads"],
  },
  {
    slug: "affiliate-kol",
    title: "Affiliate & KOL",
    name: "affiliate-kol.app",
    tagline: "Let the right voices introduce you.",
    summary:
      "We find, brief, and manage creators and affiliates who fit your brand, then track what they actually deliver.",
    category: "Growth and learning",
    emoji: "handshake",
    accent: "peach",
    chips: ["Creators", "Affiliates", "Tracking"],
    included: includedItems(
      "Creator shortlist and vetting",
      "Outreach and negotiation",
      "Briefs and content guidelines",
      "Affiliate links and code tracking",
      "Campaign management",
      "Results report",
    ),
    steps: processSteps(
      "Define goals and ideal creators",
      "Shortlist and negotiate",
      "Brief and publish together",
      "Track and pay on performance",
    ),
    fitFor: [
      "Brands that rely on trust and word of mouth",
      "Shops adding a new sales channel",
      "Launches that need social proof",
    ],
    faqs: serviceFaqs(
      "How do you pick creators?",
      "By audience fit and engagement quality first, follower count second.",
      "Can I pay only for results?",
      "Yes. Affiliate setups can be commission-based.",
    ),
    related: ["social-media-campaign", "social-media-management", "meta-ads"],
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    name: "design.app",
    tagline: "Visuals that stop the scroll and fit your brand.",
    summary:
      "Logos, brand kits, social graphics, ad creatives, and print materials that look consistent everywhere your brand shows up.",
    category: "Creative and build",
    emoji: "artist-palette",
    accent: "lime",
    chips: ["Branding", "Social graphics", "Ad creatives"],
    included: includedItems(
      "Logo and brand guidelines",
      "Social media templates",
      "Ad creatives in multiple sizes",
      "Packaging and print layouts",
      "Presentation and pitch decks",
      "Editable source files",
    ),
    steps: processSteps(
      "Brief and mood board",
      "First concepts",
      "Revisions together",
      "Final files and handover",
    ),
    fitFor: [
      "New brands that need an identity",
      "Brands with inconsistent visuals",
      "Campaigns needing fresh creatives fast",
    ],
    faqs: serviceFaqs(
      "How many revisions are included?",
      "Two rounds for most projects. Extra rounds are quoted fairly.",
      "Do I own the final files?",
      "Yes. You receive full rights and editable source files.",
    ),
    related: ["social-media-management", "web-development", "meta-ads"],
  },
];
