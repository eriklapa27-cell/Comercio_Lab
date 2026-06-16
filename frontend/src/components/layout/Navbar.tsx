"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Drops", href: "/boxes" },
  { label: "Tendencias", href: "/boxes?sort=trending" },
  { label: "Mercado", href: "/boxes" },
  { label: "Bóveda", href: "/dashboard" },
];

interface NavbarProps {
  cartCount?: number;
}

export function Navbar({ cartCount = 0 }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[100] flex h-[60px] items-center justify-between border-b border-[rgba(0,245,255,0.12)] bg-[rgba(5,8,16,0.92)] px-5 backdrop-blur-xl md:px-10">
      {/* Logo */}
      <Link
        href="/boxes"
        className="font-display text-xl font-black tracking-[3px] text-[#00f5ff] [text-shadow:0_0_20px_#00f5ff] md:text-2xl"
      >
        X-DROPS
      </Link>

      {/* Desktop nav links */}
      <div className="hidden items-center gap-7 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "font-ui text-[13px] font-semibold uppercase tracking-[1.5px] transition-colors duration-200",
              pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href.split("?")[0]))
                ? "text-[#00f5ff]"
                : "text-[#8892aa] hover:text-[#00f5ff]"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Search — desktop only */}
        <div className="hidden items-center gap-2 rounded-[4px] border border-[rgba(0,245,255,0.12)] bg-[#0f1423] px-3 py-1.5 md:flex">
          <span className="text-[13px] text-[#4a5270]">🔍</span>
          <input
            className="w-[130px] bg-transparent font-ui text-[12px] text-[#e8eaf0] outline-none placeholder:text-[#4a5270]"
            placeholder="Buscar..."
          />
        </div>

        {/* Cart */}
        <Link
          href="/cart"
          className="relative flex h-9 w-9 items-center justify-center rounded-[6px] border border-[rgba(0,245,255,0.12)] bg-[#0f1423] text-[15px] text-[#8892aa] transition-all hover:border-[rgba(0,245,255,0.4)] hover:text-[#00f5ff]"
        >
          🛒
          {cartCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff2d78] font-mono text-[9px] text-white">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Profile */}
        <Link
          href="/dashboard"
          className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-[rgba(0,245,255,0.12)] bg-[#0f1423] text-[15px] text-[#8892aa] transition-all hover:border-[rgba(0,245,255,0.4)] hover:text-[#00f5ff]"
        >
          👤
        </Link>

        {/* Mobile hamburger */}
        <button
          className="ml-1 flex h-9 w-9 items-center justify-center rounded-[6px] border border-[rgba(0,245,255,0.12)] bg-[#0f1423] text-[#8892aa] md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menú"
        >
          <span className="text-[14px]">{mobileOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-[60px] z-50 overflow-hidden border-b border-[rgba(0,245,255,0.12)] bg-[rgba(5,8,16,0.97)] backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-[4px] px-4 py-3 font-ui text-[14px] font-semibold uppercase tracking-[1.5px] text-[#8892aa] transition-colors hover:bg-[rgba(0,245,255,0.06)] hover:text-[#00f5ff]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-[rgba(0,245,255,0.12)] pt-2">
                <input
                  className="w-full rounded-[4px] border border-[rgba(0,245,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 font-ui text-sm text-[#e8eaf0] outline-none placeholder:text-[#4a5270] focus:border-[#00f5ff]"
                  placeholder="Buscar en el catálogo..."
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
