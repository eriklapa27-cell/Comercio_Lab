"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface XpBarProps {
  current: number;
  max: number;
  label?: string;
  className?: string;
  showBonus?: string;
}

export function XpBar({ current, max, label, className, showBonus }: XpBarProps) {
  const pct = Math.min(100, (current / max) * 100);
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between font-mono text-[10px] text-[#4a5270]">
        <span>{label ?? "PROGRESO DE XP"}</span>
        <span className="text-[#00f5ff]">
          {current.toLocaleString()} / {max.toLocaleString()}
          {showBonus && <span className="ml-2 text-[#4ade80]">{showBonus}</span>}
        </span>
      </div>
      <div className="h-[4px] overflow-hidden rounded-[2px] bg-[rgba(255,255,255,0.06)]">
        <motion.div
          className="h-full rounded-[2px] bg-gradient-to-r from-[#00f5ff] to-[#7b2fff]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}
