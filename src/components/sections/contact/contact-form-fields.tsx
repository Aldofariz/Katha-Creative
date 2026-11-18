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
  return message ? <p id={id} className="text-small text-red-700 mt-1">{message}</p> : null;
}

export function ContactFormFields({ values, errors, isSubmitting, onChange }: ContactFormFieldsProps) {
  const inputClass = "min-h-11 w-full border-b border-line-strong bg-transparent px-2 text-ink outline-none transition placeholder:text-ink-soft focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60";
  const describedBy = (field: ContactField) => errors[field] ? `${field}-error` : undefined;

  return (
    <div className="divide-line divide-y">
      <div className="grid gap-1 py-3 sm:grid-cols-[112px_1fr] sm:items-center sm:gap-5">
        <label htmlFor="name" className="text-small text-ink-soft">Name</label>
        <div><input id="name" name="name" autoComplete="name" required minLength={2} maxLength={80} className={inputClass} value={values.name} onChange={(event) => onChange("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name")} disabled={isSubmitting} />
          <FieldError id="name-error" message={errors.name} /></div>
      </div>
      <div className="grid gap-1 py-3 sm:grid-cols-[112px_1fr] sm:items-center sm:gap-5">
        <label htmlFor="email" className="text-small text-ink-soft">Email</label>
        <div><input id="email" name="email" type="email" autoComplete="email" required className={inputClass} value={values.email} onChange={(event) => onChange("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} disabled={isSubmitting} />
          <FieldError id="email-error" message={errors.email} /></div>
      </div>
      <div className="grid gap-1 py-3 sm:grid-cols-[112px_1fr] sm:items-center sm:gap-5">
        <label htmlFor="service" className="text-small text-ink-soft">Service</label>
        <div><select id="service" name="service" required className={inputClass} value={values.service} onChange={(event) => onChange("service", event.target.value)} aria-invalid={Boolean(errors.service)} aria-describedby={describedBy("service")} disabled={isSubmitting}>
          <option value="Not sure yet">Not sure yet</option>
          {services.map((service) => <option key={service.slug} value={service.slug}>{service.title}</option>)}
        </select><FieldError id="service-error" message={errors.service} /></div>
      </div>
      <div className="grid gap-1 py-3 sm:grid-cols-[112px_1fr] sm:items-center sm:gap-5">
        <label htmlFor="budget" className="text-small text-ink-soft">Budget</label>
        <select id="budget" name="budget" className={inputClass} value={values.budget} onChange={(event) => onChange("budget", event.target.value)} disabled={isSubmitting}>
          <option value="">Choose a range</option><option>Under $1k</option><option>$1k to $5k</option><option>$5k to $15k</option><option>$15k+</option>
        </select>
      </div>
      <div className="py-4">
        <label htmlFor="message" className="text-small text-ink-soft mb-2 block">Message</label>
        <textarea id="message" name="message" rows={5} required minLength={20} maxLength={1000} className={`${inputClass} resize-y py-3`} value={values.message} onChange={(event) => onChange("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={describedBy("message")} disabled={isSubmitting} />
        <FieldError id="message-error" message={errors.message} />
      </div>
      <p aria-live="polite" className="text-small text-red-700 min-h-5 pt-2">
        {Object.values(errors).filter(Boolean).join(" ")}
      </p>
    </div>
  );
}
