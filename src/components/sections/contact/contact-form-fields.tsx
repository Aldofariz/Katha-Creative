"use client";

import type {
  ContactErrors,
  ContactField,
  ContactValues,
} from "@/components/sections/contact/contact-types";
import { services } from "@/data/services";

type ContactFormFieldsProps = {
  values: ContactValues;
  errors: ContactErrors;
  isSubmitting: boolean;
  onChange: (field: ContactField, value: string) => void;
};

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="text-small text-coral mt-1">
      {message}
    </p>
  ) : null;
}

export function ContactFormFields({
  values,
  errors,
  isSubmitting,
  onChange,
}: ContactFormFieldsProps) {
  const inputClass =
    "min-h-[52px] w-full rounded-input border border-line bg-white/75 px-4 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";
  const describedBy = (field: ContactField) =>
    errors[field] ? `${field}-error` : undefined;

  return (
    <>
      <div>
        <label htmlFor="name" className="text-small mb-1.5 block font-semibold">
          Name
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={80}
          className={inputClass}
          value={values.name}
          onChange={(event) => onChange("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy("name")}
        />
        <FieldError id="name-error" message={errors.name} />
      </div>
      <div>
        <label
          htmlFor="email"
          className="text-small mb-1.5 block font-semibold"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
          value={values.email}
          onChange={(event) => onChange("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy("email")}
        />
        <FieldError id="email-error" message={errors.email} />
      </div>
      <div>
        <label
          htmlFor="service"
          className="text-small mb-1.5 block font-semibold"
        >
          Service
        </label>
        <select
          id="service"
          name="service"
          required
          className={inputClass}
          value={values.service}
          onChange={(event) => onChange("service", event.target.value)}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={describedBy("service")}
        >
          <option value="Not sure yet">Not sure yet</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.title}
            </option>
          ))}
        </select>
        <FieldError id="service-error" message={errors.service} />
      </div>
      <div>
        <label
          htmlFor="budget"
          className="text-small mb-1.5 block font-semibold"
        >
          Budget range
        </label>
        <select
          id="budget"
          name="budget"
          className={inputClass}
          value={values.budget}
          onChange={(event) => onChange("budget", event.target.value)}
        >
          <option value="">Choose a range</option>
          <option>Under $1k</option>
          <option>$1k to $5k</option>
          <option>$5k to $15k</option>
          <option>$15k+</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="message"
          className="text-small mb-1.5 block font-semibold"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={20}
          maxLength={1000}
          className={`${inputClass} resize-y py-3`}
          value={values.message}
          onChange={(event) => onChange("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>
      <p aria-live="polite" className="text-small text-coral min-h-5">
        {Object.values(errors).filter(Boolean).join(" ")}
      </p>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-brand hover:bg-brand-strong focus-visible:outline-brand min-h-12 w-full rounded-full px-6 font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send your message"}
      </button>
      <p className="text-small text-ink-soft text-center">
        This is a demo form. Nothing is sent.
      </p>
    </>
  );
}
