import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, SelectHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="font-mono text-[11px] uppercase tracking-[1.5px] text-[#8892aa]">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              "w-full rounded-[4px] border border-[rgba(0,245,255,0.12)] bg-[rgba(255,255,255,0.04)]",
              "px-4 py-3 font-ui text-sm text-[#e8eaf0] outline-none transition-all duration-200",
              "placeholder:text-[#4a5270]",
              "focus:border-[#00f5ff] focus:shadow-[0_0_0_3px_rgba(0,245,255,0.08)]",
              icon && "pr-12",
              error && "border-[rgba(255,45,120,0.5)] focus:border-[#ff2d78] focus:shadow-[0_0_0_3px_rgba(255,45,120,0.1)]",
              className
            )}
            {...props}
          />
          {icon && (
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#4a5270]">
              {icon}
            </span>
          )}
        </div>
        {error && (
          <p className="font-mono text-[10px] uppercase tracking-[1px] text-[#ff2d78]">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, className, children, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="font-mono text-[11px] uppercase tracking-[1.5px] text-[#8892aa]">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            "w-full cursor-pointer appearance-none rounded-[4px] border border-[rgba(0,245,255,0.12)]",
            "bg-[rgba(255,255,255,0.04)] px-4 py-3 font-ui text-sm text-[#e8eaf0]",
            "outline-none transition-all duration-200",
            "focus:border-[#00f5ff] focus:shadow-[0_0_0_3px_rgba(0,245,255,0.08)]",
            className
          )}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";
