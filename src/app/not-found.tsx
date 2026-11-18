import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { EmojiImage } from "@/components/ui/emoji-image";
import { WindowCard } from "@/components/ui/window-card";
import { buttonClassNames } from "@/lib/button-styles";

export default function NotFound() {
  return (
    <main className="relative z-10 flex flex-1 items-center justify-center px-5 py-20">
      <WindowCard
        title="404.app"
        className="w-full max-w-lg"
        bodyClassName="p-8 text-center sm:p-12"
      >
        <div
          aria-hidden="true"
          className="mb-5 flex items-center justify-center gap-2"
        >
          <EmojiImage emojiKey="eyes" width={72} height={72} />
          <ArrowRight aria-hidden="true" className="text-ink-soft size-5" />
          <EmojiImage emojiKey="sparkles" width={72} height={72} />
        </div>
        <h1 className="font-heading text-h2">This page wandered off.</h1>
        <div className="mt-5 flex justify-center">
          <ChatBubble variant="received">
            this page wandered off. shall we find another one?
          </ChatBubble>
        </div>
        <Link href="/" className={buttonClassNames("primary", "md", "mt-8")}>
          Back to home
        </Link>
      </WindowCard>
    </main>
  );
}
