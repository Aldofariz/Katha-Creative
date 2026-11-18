"use client";

import { useState } from "react";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { ClickBurst } from "@/components/effects/click-burst";
import { buttonClassNames } from "@/lib/button-styles";
import type { ContactValues } from "@/components/sections/contact/contact-types";
import { services } from "@/data/services";

export function ContactSuccess({
  values,
  onReset,
}: {
  values: ContactValues;
  onReset: () => void;
}) {
  const [burstId, setBurstId] = useState<number | null>(1);
  const serviceName = services.find((service) => service.slug === values.service)?.title ?? values.service;

  return (
    <div className="relative py-4">
      {burstId !== null ? <ClickBurst key={burstId} emojiKey="sparkles" onComplete={() => setBurstId(null)} /> : null}
      <div aria-live="polite" className="relative z-[1] flex flex-col gap-4">
        <ChatBubble variant="sent">
          Delivered. Thanks, {values.name}. We&apos;ll follow up about {serviceName}.
        </ChatBubble>
        <ChatBubble variant="received">
          got it! we&apos;ll reply within one business day.
        </ChatBubble>
        <button type="button" onClick={onReset} className={buttonClassNames("ghost", "md", "mt-3 self-start px-0")}>
          Send another message
        </button>
      </div>
    </div>
  );
}
