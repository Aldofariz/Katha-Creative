import type { Metadata } from "next";
import { AboutTimeline } from "@/components/sections/about/about-timeline";
import { TeamGrid } from "@/components/sections/about/team-grid";
import { CtaBanner } from "@/components/sections/cta-banner";
import { WindowCard } from "@/components/ui/window-card";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the Katha Creative team and learn the story behind the agency.",
};

const values = [
  { title: "Story first.", description: "Every campaign starts with something worth saying." },
  { title: "Numbers don't lie.", description: "We measure everything and share it honestly." },
  { title: "Make it fun.", description: "If we're not enjoying it, your audience won't either." },
  { title: "Say it plainly.", description: "No jargon, no mystery, no surprise invoices." },
] as const;

const folders = ["strategy", "creative", "launches", "reports"] as const;

function ClassicFolderIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 32" className="size-8 shrink-0">
      <path d="M2 6a3 3 0 0 1 3-3h10l4 4h16a3 3 0 0 1 3 3v17a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6Z" fill="#1684e8" />
      <path d="M3 11h34l-3 15a3 3 0 0 1-3 2H6a3 3 0 0 1-3-3V11Z" fill="#5bb5ff" />
      <path d="M4 12h32" stroke="#a9dcff" strokeWidth="1.5" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <main className="relative z-10 flex-1">
      <header className="mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:px-12">
        <h1 className="font-sans text-display">We tell brand stories.</h1>
        <p className="text-body-lg text-ink-soft mt-5 max-w-3xl">
          Katha Creative is a team of marketers, designers, and developers who
          believe good marketing starts with a good story.
        </p>
        <p className="text-small text-ink-soft mt-5 max-w-3xl">
          &ldquo;Katha&rdquo; means &ldquo;story&rdquo; in Sanskrit, and it
          sounds a lot like &ldquo;kata&rdquo;, the Indonesian word for
          &ldquo;word&rdquo;. Stories made of words: that&apos;s us.
        </p>
      </header>

      <section aria-labelledby="story-title" className="bg-surface">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-8 lg:px-12">
          <div>
            <h2 id="story-title" className="font-sans text-h2">A small room, a bigger idea</h2>
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
          <WindowCard title="Agency desktop" bodyClassName="p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">Katha Creative</h3>
              <span className="text-small text-ink-soft">4 folders</span>
            </div>
            <ul className="divide-line divide-y">
              {folders.map((folder) => (
                <li key={folder} className="hover:bg-accent-wash flex min-h-14 items-center gap-3 px-2 transition-colors">
                  <ClassicFolderIcon />
                  <span className="font-medium">{folder}</span>
                  <span className="text-small text-ink-soft ml-auto">Folder</span>
                </li>
              ))}
            </ul>
          </WindowCard>
        </div>
      </section>

      <section aria-labelledby="values-title" className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:px-12">
        <h2 id="values-title" className="font-sans text-h2 mb-8">What we believe</h2>
        <dl className="border-line grid border-t sm:grid-cols-2">
          {values.map((value) => (
            <div key={value.title} className="border-line grid gap-1 border-b py-5 sm:grid-cols-[minmax(150px,0.7fr)_1.3fr] sm:gap-5 sm:px-5 sm:first:pl-0">
              <dt className="font-semibold">{value.title}</dt>
              <dd className="text-ink-soft">{value.description}</dd>
            </div>
          ))}
        </dl>
      </section>
      <TeamGrid />
      <AboutTimeline />
      <CtaBanner />
    </main>
  );
}
