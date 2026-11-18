"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/cn";
import {
  buttonClassNames,
  type ButtonSize,
  type ButtonVariant,
} from "@/lib/button-styles";

export { buttonClassNames } from "@/lib/button-styles";
export type { ButtonSize, ButtonVariant } from "@/lib/button-styles";

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
      whileTap={disabled ? undefined : { scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
