import { z } from "zod";
import { services } from "@/data/services";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  service: z
    .string()
    .refine(
      (value) =>
        value === "Not sure yet" ||
        services.some((service) => service.slug === value),
    ),
  budget: z.string(),
  message: z.string().trim().min(20).max(1000),
});

export type ContactValues = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactValues;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const initialValues = (initialService: string): ContactValues => ({
  name: "",
  email: "",
  service: initialService,
  budget: "",
  message: "",
});
