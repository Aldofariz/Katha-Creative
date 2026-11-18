import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "glass" | "ghost";
export type ButtonSize = "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover active:bg-accent-strong",
  secondary: "border border-line-strong bg-white text-ink shadow-sm hover:bg-surface",
  glass: "border border-line-strong bg-white text-ink shadow-sm hover:bg-surface",
  ghost: "bg-transparent text-link underline-offset-4 hover:underline",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-14 px-7 text-base",
};

export function buttonClassNames(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-input font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}
