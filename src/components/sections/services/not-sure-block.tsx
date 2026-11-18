import Link from "next/link";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { buttonClassNames } from "@/lib/button-styles";

export function NotSureBlock() {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-7 px-5 py-10 md:grid-cols-[1fr_auto] md:items-center md:px-8 lg:px-12">
      <div>
        <h2 className="font-heading text-h3 mb-5">Not sure what you need?</h2>
        <div className="flex max-w-2xl flex-col gap-3">
          <ChatBubble variant="received">
            we have a few ideas, but we&apos;re not sure where to start.
          </ChatBubble>
          <ChatBubble variant="sent">
            tell us what you&apos;re building. we&apos;ll figure out the right
            first step together.
          </ChatBubble>
        </div>
      </div>
      <Link href="/contact" className={buttonClassNames("primary", "md")}>
        Talk it through
      </Link>
    </section>
  );
}
