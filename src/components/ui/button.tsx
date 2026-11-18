"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "glass" | "ghost";
export type ButtonSize = "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white shadow-lg shadow-brand/20 hover:bg-brand-strong",
  glass: "glass text-ink hover:bg-white/75",
  ghost: "bg-transparent text-ink underline-offset-4 hover:underline",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "min-h-11 px-6 text-sm",
  lg: "min-h-14 px-8 text-base",
};

export function buttonClassNames(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

type ButtonProps = Omit<
  HTMLMotionProps<"button">,
  "className" | "children" | "type" | "disabled" | "whileHover" | "whileTap"
> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={cn(
        buttonClassNames(variant, size, className),
        "disabled:pointer-events-none disabled:opacity-50",
      )}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
