import type { Metadata } from "next";
import { Folder } from "lucide-react";
import { AboutTimeline } from "@/components/sections/about/about-timeline";
import { TeamGrid } from "@/components/sections/about/team-grid";
import { CtaBanner } from "@/components/sections/cta-banner";
import { WindowCard } from "@/components/ui/window-card";
import { EmojiImage } from "@/components/ui/emoji-image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the fictional Katha Creative team and learn the story behind the agency.",
};

const values = [
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
] as const;

const folders = ["strategy", "creative", "launches", "reports"] as const;

export default function AboutPage() {
  return (
    <main className="relative z-10 flex-1">
      <header className="mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:px-12">
        <h1 className="font-heading text-display">We tell brand stories.</h1>
        <p className="text-body-lg text-ink-soft mt-5 max-w-3xl">
          Katha Creative is a team of marketers, designers, and developers who
          believe good marketing starts with a good story.
        </p>
        <p className="text-small text-ink-soft mt-5 max-w-3xl">
          “Katha” means “story” in Sanskrit, and it sounds a lot like “kata”,
          the Indonesian word for “word”. Stories made of words: that&apos;s us.
        </p>
      </header>

      <section
        aria-labelledby="story-title"
        className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-8 lg:px-12"
      >
        <div>
          <h2 id="story-title" className="font-heading text-h2">
            A small room, a bigger idea
          </h2>
          <p className="text-ink-soft mt-5">
            We started in a spare room, helping good businesses find the words
            and work that would get people to notice them.
          </p>
          <p className="text-ink-soft mt-4">
            We learned that pretty ads are not enough. So we brought creative,
            measurement, and a team that cares about both results and the people
            behind each brand.
          </p>
        </div>
        <WindowCard title="katha-finder.app">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-heading text-h3">Agency desktop</h3>
            <span className="text-small text-ink-soft">4 folders</span>
          </div>
          <ul className="space-y-2">
            {folders.map((folder) => (
              <li
                key={folder}
                className="rounded-input hover:bg-brand-wash flex min-h-12 items-center gap-3 px-3 transition-colors"
              >
                <Folder aria-hidden="true" className="text-brand size-5" />
                <span>{folder}</span>
                <span className="text-small text-ink-soft ml-auto">Folder</span>
              </li>
            ))}
          </ul>
        </WindowCard>
      </section>

      <section
        aria-labelledby="values-title"
        className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:px-12"
      >
        <h2 id="values-title" className="font-heading text-h2 mb-8">
          What we believe
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {values.map((value) => (
            <WindowCard
              key={value.title}
              title={`${value.title.toLowerCase().replaceAll(" ", "-")}.note`}
            >
              <EmojiImage emojiKey={value.emoji} width={48} height={48} />
              <h3 className="font-heading text-h3 mt-4">{value.title}</h3>
              <p className="text-ink-soft mt-2">{value.description}</p>
            </WindowCard>
          ))}
        </div>
      </section>
      <TeamGrid />
      <AboutTimeline />
      <CtaBanner />
    </main>
  );
}
