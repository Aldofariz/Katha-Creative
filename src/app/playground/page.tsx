import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { GlassCard } from "@/components/ui/glass-card";
import { WindowCard } from "@/components/ui/window-card";

const accordionItems = [
  {
    question: "Can I use the glass button?",
    answer: "Yes. It keeps a clear focus ring and a generous touch target.",
  },
  {
    question: "Can more than one answer stay open?",
    answer: "No. Opening a new answer closes the one that was already open.",
  },
  {
    question: "Does this work with a keyboard?",
    answer: "Use Tab to reach a question, then Enter or Space to toggle it.",
  },
];

export default function PlaygroundPage() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
      <header className="mb-12 max-w-2xl">
        <p className="text-small text-ink-soft font-semibold">UI preview</p>
        <h1 className="font-heading text-h1 mt-3">
          Katha component playground
        </h1>
        <p className="text-body-lg text-ink-soft mt-4">
          Try each component with a pointer or keyboard. Tab through the
          controls to check focus states.
        </p>
      </header>

      <div className="space-y-10">
        <section aria-labelledby="buttons-heading">
          <h2 id="buttons-heading" className="font-heading text-h2 mb-4">
            Buttons
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="md">
              Primary medium
            </Button>
            <Button variant="primary" size="lg">
              Primary large
            </Button>
            <Button variant="glass" size="md">
              Glass medium
            </Button>
            <Button variant="glass" size="lg">
              Glass large
            </Button>
            <Button variant="ghost" size="md">
              Ghost medium
            </Button>
            <Button variant="ghost" size="lg">
              Ghost large
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <section aria-labelledby="cards-heading">
          <h2 id="cards-heading" className="font-heading text-h2 mb-4">
            Glass cards
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <GlassCard className="p-6">
              <h3 className="font-heading text-h3">Cursor sheen</h3>
              <p className="text-ink-soft mt-2">
                Move your pointer across the card to follow the light.
              </p>
            </GlassCard>
            <WindowCard title="social-manager.app" accent="pink">
              <h3 className="font-heading text-h3">Window card</h3>
              <p className="text-ink-soft mt-2">
                Accent glow, title bar, and decorative window controls.
              </p>
            </WindowCard>
          </div>
        </section>

        <section aria-labelledby="badges-heading">
          <h2 id="badges-heading" className="font-heading text-h2 mb-4">
            Badges
          </h2>
          <div className="flex flex-wrap gap-3">
            <Badge>Fictional demo</Badge>
            <Badge variant="brand">Advertising</Badge>
          </div>
        </section>

        <section aria-labelledby="chat-heading">
          <h2 id="chat-heading" className="font-heading text-h2 mb-4">
            Chat bubbles
          </h2>
          <div className="glass rounded-window flex max-w-xl flex-col gap-4 p-6">
            <ChatBubble variant="received" reaction="heart">
              Can we make the launch feel more like us?
            </ChatBubble>
            <ChatBubble variant="sent" timestamp="Delivered">
              Absolutely. We&apos;ll start with your story.
            </ChatBubble>
            <ChatBubble variant="typing" />
            <ChatBubble variant="received" decorative>
              Decorative hero bubble
            </ChatBubble>
          </div>
        </section>

        <section aria-labelledby="accordion-heading">
          <h2 id="accordion-heading" className="font-heading text-h2 mb-4">
            Accordion
          </h2>
          <Accordion items={accordionItems} className="max-w-3xl" />
        </section>
      </div>
    </main>
  );
}
