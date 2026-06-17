"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

const CHANNELS = [
  { icon: "💬", name: "Discord", members: "24,810", desc: "Servidor oficial con canales de drops, trading y soporte.", color: "#7b2fff", href: "#" },
  { icon: "🐦", name: "Twitter / X", members: "18,450", desc: "Anuncios de drops, reveals y noticias del ecosistema.", color: "#00f5ff", href: "#" },
  { icon: "📸", name: "Instagram", members: "9,230", desc: "Contenido visual, unboxings y colaboraciones.", color: "#ff2d78", href: "#" },
  { icon: "▶️", name: "YouTube", members: "6,700", desc: "Reveals en vivo, guías y análisis de rareza.", color: "#f0c040", href: "#" },
];

const EVENTS = [
  { date: "20 JUN", name: "Drop Genesis Reloaded", type: "DROP", typeColor: "#00f5ff" },
  { date: "25 JUN", name: "Torneo de Trading — Ronda 3", type: "EVENTO", typeColor: "#7b2fff" },
  { date: "01 JUL", name: "AMA con el equipo X-DROPS", type: "SESIÓN", typeColor: "#ff2d78" },
  { date: "10 JUL", name: "Reveal Colección Arcana", type: "DROP", typeColor: "#00f5ff" },
];

const LEADERBOARD = [
  { rank: 1, name: "VOID_RUNNER_42", xp: "98,420", badge: "🏆" },
  { rank: 2, name: "NEO_XR91", xp: "87,110", badge: "🥈" },
  { rank: 3, name: "PHANTOM_DELTA", xp: "74,850", badge: "🥉" },
  { rank: 4, name: "AXIOM_ZERO", xp: "61,200", badge: "⚡" },
  { rank: 5, name: "CRYO_MX", xp: "55,780", badge: "⚡" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const itemAnim = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ComunidadPage() {
  return (
    <div className="page-container">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[rgba(0,245,255,0.1)] bg-gradient-to-br from-[#0a0d1a] via-[#0f0820] to-[#0a0d1a] px-5 py-14 md:px-10 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(123,47,255,0.08),transparent_70%)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-[1200px] text-center"
        >
          <span className="mb-4 inline-block rounded-[2px] border border-[#7b2fff] px-3 py-1 font-mono text-[11px] tracking-[2px] text-[#7b2fff]">
            ◈ NEXO OPERATIVO GLOBAL
          </span>
          <h1 className="mb-4 font-display text-[48px] font-black leading-none md:text-[68px]">
            La <span className="text-[#7b2fff]">Comunidad</span>
          </h1>
          <p className="mx-auto mb-8 max-w-[520px] font-ui text-[15px] leading-relaxed text-[#8892aa]">
            Únete a miles de operativos que ya forman parte del ecosistema X-DROPS.
            Comparte, compite y desbloquea recompensas exclusivas.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="primary">UNIRSE AL DISCORD</Button>
            <Button variant="outline">VER EVENTOS</Button>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-10">

        {/* Channels */}
        <motion.div variants={container} initial="hidden" animate="show" className="mb-14">
          <h2 className="mb-6 font-display text-[26px] font-bold">Canales Oficiales</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map((c) => (
              <motion.a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemAnim}
                className="group flex flex-col gap-3 rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928] p-5 transition-all hover:-translate-y-1 hover:border-[rgba(0,245,255,0.3)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[28px]">{c.icon}</span>
                  <span
                    className="font-mono text-[10px] tracking-[1px]"
                    style={{ color: c.color }}
                  >
                    {c.members} MIEMBROS
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-[16px] font-bold">{c.name}</h3>
                  <p className="mt-1 font-ui text-[12px] leading-relaxed text-[#8892aa]">{c.desc}</p>
                </div>
                <span
                  className="font-mono text-[11px] tracking-[1px] opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ color: c.color }}
                >
                  UNIRSE ↗
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Events */}
          <div>
            <h2 className="mb-6 font-display text-[26px] font-bold">Próximos Eventos</h2>
            <div className="flex flex-col gap-3">
              {EVENTS.map((ev, i) => (
                <motion.div
                  key={ev.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  className="flex items-center gap-5 rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928] px-5 py-4 transition-all hover:border-[rgba(0,245,255,0.3)]"
                >
                  <div className="text-center">
                    <p className="font-mono text-[10px] tracking-[1.5px] text-[#4a5270]">
                      {ev.date.split(" ")[1]}
                    </p>
                    <p className="font-mono text-[22px] font-bold text-[#00f5ff]">
                      {ev.date.split(" ")[0]}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="font-ui text-[15px] font-bold">{ev.name}</p>
                  </div>
                  <span
                    className="rounded-[3px] border px-2 py-0.5 font-mono text-[9px] tracking-[1px]"
                    style={{
                      color: ev.typeColor,
                      borderColor: `${ev.typeColor}40`,
                      background: `${ev.typeColor}0f`,
                    }}
                  >
                    {ev.type}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <h2 className="mb-6 font-display text-[26px] font-bold">Top Operativos</h2>
            <div className="overflow-hidden rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928]">
              {LEADERBOARD.map((u, i) => (
                <motion.div
                  key={u.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                  className="flex items-center gap-4 border-b border-[rgba(0,245,255,0.08)] px-5 py-3.5 last:border-0 hover:bg-[rgba(0,245,255,0.02)]"
                >
                  <span className="text-[20px]">{u.badge}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[13px] font-bold truncate">{u.name}</p>
                    <p className="font-mono text-[10px] text-[#4a5270]">{u.xp} XP</p>
                  </div>
                  <span className="font-mono text-[11px] tracking-[1px] text-[#00f5ff]">
                    #{u.rank}
                  </span>
                </motion.div>
              ))}
              <div className="border-t border-[rgba(0,245,255,0.12)] px-5 py-4 text-center">
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    VER MI POSICIÓN
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
