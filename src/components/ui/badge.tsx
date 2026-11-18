import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  variant?: "glass" | "brand";
  className?: string;
};

const variants = {
  glass: "glass text-ink",
  brand: "bg-brand-wash text-ink",
} as const;

export function Badge({ children, variant = "glass", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "text-small inline-flex min-h-8 items-center rounded-full px-3 py-1 font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
