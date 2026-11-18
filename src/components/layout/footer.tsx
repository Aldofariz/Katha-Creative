import { siteCopy } from "@/data/site-copy";

export function Footer() {
  return (
    <footer className="border-line text-small text-ink-soft border-t bg-white/65 px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>{siteCopy.footerNote}</p>
        <p>
          Emoji artwork by{" "}
          <a
            className="text-ink decoration-brand/40 hover:decoration-brand focus-visible:outline-brand font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
            href="https://github.com/microsoft/fluentui-emoji"
            target="_blank"
            rel="noreferrer"
          >
            Microsoft Fluent Emoji
          </a>
          .{" "}
          <a
            className="text-ink decoration-brand/40 hover:decoration-brand focus-visible:outline-brand font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
            href="/emoji/LICENSE-fluentui-emoji.txt"
          >
            MIT license
          </a>
        </p>
      </div>
    </footer>
  );
}
