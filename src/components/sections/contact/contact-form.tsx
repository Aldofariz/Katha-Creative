"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { ContactFormFields } from "@/components/sections/contact/contact-form-fields";
import { ContactSuccess } from "@/components/sections/contact/contact-success";
import { BeachBall } from "@/components/ui/beach-ball";
import { WindowCard } from "@/components/ui/window-card";
import { buttonClassNames } from "@/lib/button-styles";
import {
  contactSchema,
  initialValues,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from "@/components/sections/contact/contact-types";

export function ContactForm({ initialService }: { initialService: string }) {
  const [values, setValues] = useState<ContactValues>(() => initialValues(initialService));
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<ContactValues | null>(null);

  const update = (field: ContactField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const reset = () => {
    setValues(initialValues(initialService));
    setErrors({});
    setSubmittedValues(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const nextErrors: ContactErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (field === "name") nextErrors.name = "Enter your name (2 to 80 characters).";
        if (field === "email") nextErrors.email = "Enter a valid email address.";
        if (field === "service") nextErrors.service = "Choose a service, or pick Not sure yet.";
        if (field === "message") nextErrors.message = "Tell us a bit more (at least 20 characters).";
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    await new Promise<void>((resolve) => window.setTimeout(resolve, 1200));
    setSubmittedValues(result.data);
    setIsSubmitting(false);
  };

  const toolbar = submittedValues ? undefined : (
    <button type="submit" form="contact-form" disabled={isSubmitting} className={buttonClassNames("primary", "md", "mr-1 min-h-9 gap-1.5 px-3 py-1 text-xs disabled:opacity-60")}>
      {isSubmitting ? <><BeachBall /><span>Sending</span></> : <><Send aria-hidden="true" className="size-3.5" /><span>Send</span></>}
    </button>
  );

  return (
    <WindowCard title="New Message" toolbar={toolbar} bodyClassName="p-5 sm:p-8">
      {submittedValues ? (
        <ContactSuccess values={submittedValues} onReset={reset} />
      ) : (
        <form id="contact-form" onSubmit={(event) => void handleSubmit(event)} noValidate>
          <ContactFormFields values={values} errors={errors} isSubmitting={isSubmitting} onChange={update} />
        </form>
      )}
    </WindowCard>
  );
}
