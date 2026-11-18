import { EmojiImage } from "@/components/ui/emoji-image";
import { emoji, emojiKeys } from "@/data/emoji";

const colorTokens = [
  ["Canvas", "bg-canvas border border-line"],
  ["Ink", "bg-ink"],
  ["Ink soft", "bg-ink-soft"],
  ["Line", "bg-line border border-ink/10"],
  ["Brand", "bg-brand"],
  ["Brand strong", "bg-brand-strong"],
  ["Brand wash", "bg-brand-wash border border-line"],
  ["Pink", "bg-pink"],
  ["Yellow", "bg-yellow"],
  ["Mint", "bg-mint"],
  ["Sky", "bg-sky"],
  ["Coral", "bg-coral"],
  ["Lilac", "bg-lilac"],
  ["Lime", "bg-lime"],
  ["Peach", "bg-peach"],
  ["Close", "bg-dot-close"],
  ["Minimize", "bg-dot-min"],
  ["Zoom", "bg-dot-zoom"],
] as const;

export default function Home() {
  return (
    <main className="bg-canvas text-ink relative isolate min-h-screen overflow-hidden px-5 py-16">
      <div
        aria-hidden="true"
        className="bg-lilac/50 pointer-events-none absolute top-40 right-0 -z-10 size-128 rounded-full blur-3xl"
      />
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <section className="glass rounded-window p-8 shadow-xl sm:p-12">
          <p className="font-body text-small text-ink-soft font-semibold">
            Katha Creative: design system preview
          </p>
          <h1 className="font-heading text-h1 mt-3">A story worth sharing.</h1>
          <p className="text-body-lg text-ink-soft mt-4 max-w-prose">
            The foundation is ready for a little color, a little motion, and a
            lot of good stories.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="bg-brand hover:bg-brand-strong min-h-11 rounded-full px-6 font-semibold text-white transition-colors">
              Brand
            </button>
            <button className="glass text-ink min-h-11 rounded-full px-6 font-semibold">
              Glass
            </button>
          </div>
          <div
            aria-label="Brand color tokens"
            className="mt-10 flex flex-wrap gap-3"
          >
            {colorTokens.map(([name, colorClass]) => (
              <div
                key={name}
                className="text-small flex items-center gap-2 rounded-full bg-white/70 px-3 py-2"
              >
                <span
                  aria-hidden="true"
                  className={`size-4 rounded-full ${colorClass}`}
                />
                {name}
              </div>
            ))}
          </div>
        </section>
        <section
          aria-labelledby="emoji-preview-title"
          className="glass rounded-window p-8 shadow-xl sm:p-12"
        >
          <h2 id="emoji-preview-title" className="font-heading text-h2">
            Fluent Emoji asset preview
          </h2>
          <p className="text-ink-soft mt-3 max-w-prose">
            Every emoji in the project manifest, loaded from its local WebP
            asset.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {emojiKeys.map((key) => (
              <li
                key={key}
                className="rounded-window border-line text-small text-ink-soft flex min-h-32 flex-col items-center justify-center gap-2 border bg-white/70 p-4 text-center"
              >
                <EmojiImage emojiKey={key} width={72} height={72} />
                <span>{emoji[key].label}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
