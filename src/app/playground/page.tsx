"use client";

import { useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/ui/app-icon";
import { BeachBall } from "@/components/ui/beach-ball";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { Sticker } from "@/components/ui/sticker";
import { WindowCard } from "@/components/ui/window-card";
import { services } from "@/data/services";

const accordionItems = [
  {
    question: "Can I use the secondary button?",
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
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

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
            <Button variant="secondary" size="md">
              Secondary medium
            </Button>
            <Button variant="secondary" size="lg">
              Secondary large
            </Button>
            <Button variant="glass" size="md">
              Glass alias
            </Button>
            <Button variant="ghost" size="md">
              Ghost
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <section aria-labelledby="window-heading">
          <h2 id="window-heading" className="font-heading text-h2 mb-4">
            Window controls
          </h2>
          {isOpen ? (
            <WindowCard
              title="messages.app"
              active={!isMinimized}
              onClose={() => setIsOpen(false)}
              onMinimize={() => setIsMinimized((value) => !value)}
              onZoom={() => setIsZoomed((value) => !value)}
              toolbar={
                isMinimized ? (
                  <button
                    type="button"
                    onClick={() => setIsMinimized(false)}
                    className="text-small text-link focus-visible:outline-accent min-h-8 px-2 underline-offset-4 hover:underline focus-visible:outline-2"
                  >
                    Restore
                  </button>
                ) : (
                  <span className="text-small text-ink-soft px-2">Inbox</span>
                )
              }
              className={`mx-auto w-full transition-[max-width] duration-200 ${isZoomed ? "max-w-5xl" : "max-w-xl"}`}
              bodyClassName={isMinimized ? "hidden" : "p-6"}
            >
              <div className="flex flex-col gap-4">
                <ChatBubble variant="received">
                  Hey Katha, can we talk through the launch?
                </ChatBubble>
                <ChatBubble variant="sent" timestamp="Delivered">
                  Of course. Tell us what you have in mind.
                </ChatBubble>
                <ChatBubble variant="typing" />
              </div>
            </WindowCard>
          ) : (
            <Button variant="secondary" onClick={() => setIsOpen(true)}>
              Reopen window
            </Button>
          )}
        </section>

        <section aria-labelledby="badges-heading">
          <h2 id="badges-heading" className="font-heading text-h2 mb-4">
            Badges
          </h2>
          <div className="flex flex-wrap gap-3">
            <Badge>Advertising</Badge>
            <Badge>Learn with us</Badge>
          </div>
        </section>

        <section aria-labelledby="chat-heading">
          <h2 id="chat-heading" className="font-heading text-h2 mb-4">
            Chat bubbles
          </h2>
          <div className="flex max-w-xl flex-col gap-4">
            <ChatBubble variant="received">
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

        <section aria-labelledby="app-icons-heading">
          <h2 id="app-icons-heading" className="font-heading text-h2 mb-4">
            Service app icons
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.slug}
                className="flex flex-col items-center gap-2 text-center"
              >
                <AppIcon accent={service.accent} emojiKey={service.emoji} />
                <span className="text-small text-ink-soft">
                  {service.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="sticker-heading">
          <h2 id="sticker-heading" className="font-heading text-h2 mb-4">
            Sticker
          </h2>
          <p className="text-small text-ink-soft mb-8">
            Drag the name tag or click it for a small burst.
          </p>
          <div className="flex min-h-44 items-center justify-center">
            <Sticker />
          </div>
        </section>

        <section aria-labelledby="beach-ball-heading">
          <h2 id="beach-ball-heading" className="font-heading text-h2 mb-4">
            BeachBall loading state
          </h2>
          <div className="flex items-center gap-3">
            <BeachBall />
            <span className="text-small text-ink-soft">Sending</span>
          </div>
        </section>
      </div>
    </main>
  );
}
