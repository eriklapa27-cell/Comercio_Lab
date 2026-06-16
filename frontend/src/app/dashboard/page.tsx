"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge, Rarity, StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { XpBar } from "@/components/ui/XpBar";

const SIDEBAR_ITEMS = [
  { icon: "⬛", label: "Ajustes de Usuario" },
  { icon: "📊", label: "Panel de Control" },
  { icon: "🔐", label: "Seguridad" },
  { icon: "📜", label: "Historial" },
  { icon: "⚙️", label: "Configuración" },
];

const SHIPMENTS = [
  {
    name: "Caja Génesis Neón",
    track: "#X-DRP-8821",
    status: "EN TRÁNSITO",
    statusVariant: "cyan" as const,
    progress: 65,
    stages: ["Despachado", "", "ETA: 2 Días"],
    gradientClass: "from-[#00f5ff] to-[#7b2fff]",
  },
  {
    name: "Digital Alchemy Core",
    track: "#X-DRP-9004",
    status: "PROCESANDO",
    statusVariant: "gold" as const,
    progress: 30,
    stages: ["Verificando Activos", "", "ETA: 5 Días"],
    gradientClass: "from-[#ff2d78] to-[#7b2fff]",
  },
];

const VAULT_ITEMS = [
  { name: "Fragmento de Aetheria", date: "24 OCT", value: 920, rarity: "legendary" as Rarity, emoji: "🏆" },
  { name: "Máscara Void Runner", date: "20 OCT", value: 450, rarity: "epic" as Rarity, emoji: "🎭" },
  { name: "Llave de Cifrado", date: "18 OCT", value: 120, rarity: "rare" as Rarity, emoji: "🗝️" },
  { name: "Pulso Estándar", date: "15 OCT", value: 35, rarity: "common" as Rarity, emoji: "⌚" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="page-container">
      <Navbar cartCount={2} />

      <div className="flex min-h-[calc(100vh-60px)]">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-[220px] border-r border-[rgba(0,245,255,0.12)] bg-[#0f1423] transition-transform duration-300 md:sticky md:top-[60px] md:h-[calc(100vh-60px)] md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-5 pt-8">
            {/* User info */}
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full border-2 border-[#00f5ff] bg-gradient-to-br from-[#7b2fff] to-[#00f5ff] text-[22px] shadow-[0_0_15px_rgba(0,245,255,0.3)]">
                🧑
              </div>
              <div>
                <p className="font-display text-[15px] font-bold">NEO ANDERSON</p>
                <p className="font-mono text-[10px] tracking-[1px] text-[#00f5ff]">
                  OPERATIVO DE ÉLITE
                </p>
              </div>
            </div>

            {/* Menu */}
            <nav className="flex flex-col gap-1">
              {SIDEBAR_ITEMS.map((it, i) => (
                <button
                  key={it.label}
                  onClick={() => { setActiveMenu(i); setSidebarOpen(false); }}
                  className={`flex items-center gap-2.5 rounded-[6px] px-3 py-2.5 text-left font-ui text-[14px] font-semibold tracking-[0.5px] transition-all ${
                    activeMenu === i
                      ? "border border-[rgba(0,245,255,0.15)] bg-[rgba(0,245,255,0.08)] text-[#00f5ff]"
                      : "text-[#8892aa] hover:bg-[#1a2035] hover:text-[#e8eaf0]"
                  }`}
                >
                  <span className="text-[16px]">{it.icon}</span>
                  {it.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Overlay mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main */}
        <main className="flex-1 overflow-x-hidden px-5 py-8 md:px-10">
          {/* Mobile sidebar toggle */}
          <button
            className="mb-5 flex items-center gap-2 font-mono text-[12px] text-[#00f5ff] md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            ☰ MENÚ
          </button>

          {/* Profile header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-[72px] w-[72px] flex-shrink-0 items-center justify-center rounded-full border-[3px] border-[#00f5ff] bg-gradient-to-br from-[#7b2fff] to-[#00f5ff] text-[32px] shadow-[0_0_25px_rgba(0,245,255,0.3)]">
                🧑
              </div>
              <div>
                <h1 className="font-display text-[26px] font-bold">Mi Perfil</h1>
                <p className="font-mono text-[11px] tracking-[1px] text-[#4a5270]">
                  Nivel Nexus:{" "}
                  <span className="text-[#00f5ff]">Operativo de Élite</span>
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              {[
                { val: "14,250", key: "XP ACTUAL" },
                { val: "42", key: "NIVEL", cyan: true },
              ].map((s) => (
                <div key={s.key} className="text-center">
                  <p className={`font-mono text-[24px] font-bold ${"cyan" in s && s.cyan ? "text-[#00f5ff]" : ""}`}>
                    {s.val}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[1.5px] text-[#4a5270]">
                    {s.key}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <XpBar current={14250} max={20000} label="PROGRESO NIVEL 42" className="mb-8" />

          {/* Shipments */}
          <motion.section
            variants={container}
            initial="hidden"
            animate="show"
            className="mb-8"
          >
            <h2 className="mb-4 font-display text-[16px] font-bold">Envíos Activos</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {SHIPMENTS.map((s) => (
                <motion.div
                  key={s.name}
                  variants={item}
                  className="rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928] p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-display text-[14px] font-bold">{s.name}</p>
                    <StatusBadge variant={s.statusVariant} className="text-[9px]">
                      {s.status}
                    </StatusBadge>
                  </div>
                  <p className="mb-3 font-mono text-[10px] tracking-[1px] text-[#4a5270]">
                    Rastreo: {s.track}
                  </p>
                  <div className="mb-1.5 h-[4px] overflow-hidden rounded-[2px] bg-[rgba(255,255,255,0.06)]">
                    <motion.div
                      className={`h-full rounded-[2px] bg-gradient-to-r ${s.gradientClass}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${s.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between font-mono text-[9px] tracking-[0.5px] text-[#4a5270]">
                    {s.stages.map((st, i) => (
                      <span key={i}>{st}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Vault */}
          <motion.section
            variants={container}
            initial="hidden"
            animate="show"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-[16px] font-bold">La Bóveda</h2>
              <button className="font-mono text-[11px] text-[#00f5ff] transition-opacity hover:opacity-70">
                Ver todo el historial
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {VAULT_ITEMS.map((v) => (
                <motion.div
                  key={v.name}
                  variants={item}
                  whileHover={{ y: -2 }}
                  className="cursor-pointer overflow-hidden rounded-[6px] border border-[rgba(0,245,255,0.12)] bg-[#141928] transition-all hover:border-[rgba(0,245,255,0.35)]"
                >
                  <div className="relative flex aspect-square items-center justify-center bg-gradient-to-br from-[#1a0a30] to-[#081525] text-[32px]">
                    {v.emoji}
                    <div className="absolute left-1.5 top-1.5">
                      <Badge rarity={v.rarity} size="sm" />
                    </div>
                  </div>
                  <div className="p-2.5">
                    <p className="font-ui text-[12px] font-bold">{v.name}</p>
                    <p className="font-mono text-[9px] tracking-[0.5px] text-[#4a5270]">
                      DESBLOQUEADO EL {v.date}
                    </p>
                    <p className="font-mono text-[11px] font-bold text-[#00f5ff]">
                      VALOR EST.: S/ {v.value.toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link href="/boxes">
                <Button variant="outline">EXPLORAR MÁS DROPS</Button>
              </Link>
            </div>
          </motion.section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
