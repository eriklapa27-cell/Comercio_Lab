import { cn } from "@/lib/utils";

export type Rarity = "legendary" | "epic" | "rare" | "common";

const rarityConfig: Record<Rarity, { label: string; className: string }> = {
  legendary: {
    label: "◈ LEGENDARIO",
    className:
      "bg-[rgba(240,192,64,0.15)] text-[#f0c040] border border-[rgba(240,192,64,0.4)]",
  },
  epic: {
    label: "ÉPICO",
    className:
      "bg-[rgba(168,85,247,0.15)] text-[#a855f7] border border-[rgba(168,85,247,0.4)]",
  },
  rare: {
    label: "RARO",
    className:
      "bg-[rgba(59,130,246,0.15)] text-[#60a5fa] border border-[rgba(59,130,246,0.4)]",
  },
  common: {
    label: "COMÚN",
    className:
      "bg-[rgba(107,114,128,0.15)] text-[#9ca3af] border border-[rgba(107,114,128,0.3)]",
  },
};

interface BadgeProps {
  rarity: Rarity;
  label?: string;
  className?: string;
  size?: "sm" | "md";
}

export function Badge({ rarity, label, className, size = "md" }: BadgeProps) {
  const config = rarityConfig[rarity];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[3px] font-mono font-semibold uppercase tracking-[1.5px]",
        size === "sm" ? "px-2 py-0.5 text-[9px]" : "px-2.5 py-[3px] text-[10px]",
        config.className,
        className
      )}
    >
      {label ?? config.label}
    </span>
  );
}

interface StatusBadgeProps {
  children: React.ReactNode;
  variant?: "cyan" | "gold" | "magenta" | "green" | "muted";
  className?: string;
}

export function StatusBadge({ children, variant = "cyan", className }: StatusBadgeProps) {
  const variants = {
    cyan: "bg-[rgba(0,245,255,0.1)] text-[#00f5ff] border border-[rgba(0,245,255,0.3)]",
    gold: "bg-[rgba(240,192,64,0.15)] text-[#f0c040] border border-[rgba(240,192,64,0.4)]",
    magenta: "bg-[rgba(255,45,120,0.15)] text-[#ff2d78] border border-[rgba(255,45,120,0.4)]",
    green: "bg-[rgba(74,222,128,0.15)] text-[#4ade80] border border-[rgba(74,222,128,0.3)]",
    muted: "bg-[rgba(107,114,128,0.1)] text-[#6b7280] border border-[rgba(107,114,128,0.2)]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[3px] px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[1.5px]",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
