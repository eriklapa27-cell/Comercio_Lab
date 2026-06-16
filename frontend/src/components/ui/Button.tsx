"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "magenta" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#00f5ff] text-[#050810] shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:bg-white hover:shadow-[0_0_30px_rgba(0,245,255,0.7)]",
  outline:
    "bg-transparent text-[#00f5ff] border border-[#00f5ff] hover:bg-[rgba(0,245,255,0.08)] hover:shadow-[0_0_15px_rgba(0,245,255,0.2)]",
  ghost:
    "bg-[rgba(255,255,255,0.06)] text-[#e8eaf0] border border-[rgba(0,245,255,0.12)] hover:border-[rgba(0,245,255,0.35)]",
  magenta:
    "bg-[#ff2d78] text-white shadow-[0_0_20px_rgba(255,45,120,0.4)] hover:shadow-[0_0_30px_rgba(255,45,120,0.6)]",
  danger:
    "bg-transparent text-[#ff2d78] border border-[rgba(255,45,120,0.4)] hover:bg-[rgba(255,45,120,0.1)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[11px] tracking-[1.5px]",
  md: "px-6 py-2.5 text-[13px] tracking-[2px]",
  lg: "px-9 py-3.5 text-[14px] tracking-[2px]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.1 }}
        disabled={disabled || loading}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[4px]",
          "font-display font-bold uppercase transition-all duration-200",
          "disabled:cursor-not-allowed disabled:opacity-40",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
            PROCESANDO...
          </span>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
