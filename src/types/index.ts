import type { EmojiKey } from "@/data/emoji";

export type ServiceCategory =
  "Advertising" | "Social" | "Creative and build" | "Growth and learning";

export type AccentColor =
  "pink" | "yellow" | "mint" | "sky" | "coral" | "lilac" | "lime" | "peach";

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
  name: string;
  tagline: string;
  summary: string;
  category: ServiceCategory;
  emoji: EmojiKey;
  accent: AccentColor;
  chips: string[];
  included: IncludedItem[];
  steps: ProcessStep[];
  fitFor: string[];
  faqs: FaqItem[];
  related: string[];
  program?: ProgramDetails;
  curriculum?: { module: string; topics: string }[];
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

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};
