"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge, Rarity, StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { XpBar } from "@/components/ui/XpBar";
import { useToast } from "@/components/ui/Toast";

const SIDEBAR_ITEMS = [
  { icon: "📊", label: "Panel de Control" },
  { icon: "⬛", label: "Ajustes de Usuario" },
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

const ORDER_HISTORY = [
  { id: "#X-8821", date: "24 Oct 2025", item: "Caja Génesis Neón", amount: 960, status: "ENTREGADO", statusVariant: "green" as const },
  { id: "#X-8004", date: "18 Oct 2025", item: "SÍNTESIS AURA", amount: 465, status: "EN TRÁNSITO", statusVariant: "cyan" as const },
  { id: "#X-7741", date: "10 Oct 2025", item: "RAW CORE x2", amount: 350, status: "ENTREGADO", statusVariant: "green" as const },
  { id: "#X-7103", date: "01 Oct 2025", item: "CAJA DE SEGURIDAD", amount: 715, status: "ENTREGADO", statusVariant: "green" as const },
  { id: "#X-6890", date: "22 Sep 2025", item: "VOID WALKER", amount: 380, status: "CANCELADO", statusVariant: "muted" as const },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const itemAnim = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function SectionPanel() {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {/* Shipments */}
      <motion.section variants={itemAnim} className="mb-8">
        <h2 className="mb-4 font-display text-[16px] font-bold">Envíos Activos</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {SHIPMENTS.map((s) => (
            <motion.div
              key={s.name}
              variants={itemAnim}
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
                {s.stages.map((st, i) => <span key={i}>{st}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Vault */}
      <motion.section variants={itemAnim}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-[16px] font-bold">La Bóveda</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {VAULT_ITEMS.map((v) => (
            <motion.div
              key={v.name}
              variants={itemAnim}
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
    </motion.div>
  );
}

function SectionUserSettings() {
  const { showToast } = useToast();
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <h2 className="mb-6 font-display text-[20px] font-bold">Ajustes de Usuario</h2>
      <div className="max-w-[560px] space-y-4 rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928] p-6">
        {/* Avatar */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-[72px] w-[72px] flex-shrink-0 items-center justify-center rounded-full border-[3px] border-[#00f5ff] bg-gradient-to-br from-[#7b2fff] to-[#00f5ff] text-[32px] shadow-[0_0_25px_rgba(0,245,255,0.3)]">
            🧑
          </div>
          <div>
            <p className="mb-1 font-ui text-[14px] font-bold">NEO ANDERSON</p>
            <button
              onClick={() => showToast("Función disponible próximamente", "info")}
              className="font-mono text-[10px] tracking-[1px] text-[#00f5ff] hover:underline"
            >
              CAMBIAR AVATAR
            </button>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input label="Nombre" defaultValue="Neo" />
          <Input label="Apellido" defaultValue="Anderson" />
        </div>
        <Input label="Correo Electrónico" defaultValue="neo@matrix.net" />
        <Input label="Nombre de Usuario" defaultValue="VOID_RUNNER_42" />
        <div className="pt-2">
          <Button variant="primary" onClick={() => showToast("✓ Perfil actualizado")}>
            GUARDAR CAMBIOS
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function SectionSecurity() {
  const { showToast } = useToast();
  const [twoFa, setTwoFa] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <h2 className="mb-6 font-display text-[20px] font-bold">Seguridad</h2>
      <div className="max-w-[560px] space-y-4">
        {/* Password */}
        <div className="rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928] p-6">
          <h3 className="mb-4 font-display text-[15px] font-bold">Cambiar Contraseña</h3>
          <div className="space-y-3">
            <Input label="Contraseña Actual" />
            <Input label="Nueva Contraseña" />
            <Input label="Confirmar Nueva Contraseña" />
          </div>
          <div className="mt-4">
            <Button variant="primary" onClick={() => showToast("✓ Contraseña actualizada")}>
              ACTUALIZAR CONTRASEÑA
            </Button>
          </div>
        </div>

        {/* 2FA */}
        <div className="rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-[15px] font-bold">Autenticación en 2 Pasos</h3>
              <p className="mt-1 font-ui text-[12px] text-[#8892aa]">
                Añade una capa extra de seguridad a tu cuenta.
              </p>
            </div>
            <button
              onClick={() => { setTwoFa((v) => !v); showToast(twoFa ? "2FA desactivado" : "✓ 2FA activado"); }}
              className={`relative h-6 w-11 rounded-full transition-colors ${twoFa ? "bg-[#00f5ff]" : "bg-[#1a2035]"}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${twoFa ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
        </div>

        {/* Sessions */}
        <div className="rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928] p-6">
          <h3 className="mb-4 font-display text-[15px] font-bold">Sesiones Activas</h3>
          {[
            { device: "Chrome · Windows 11", location: "Lima, PE", current: true },
            { device: "Safari · iPhone 15", location: "Lima, PE", current: false },
          ].map((s) => (
            <div key={s.device} className="mb-3 flex items-center justify-between">
              <div>
                <p className="font-ui text-[13px] font-semibold">{s.device}</p>
                <p className="font-mono text-[10px] text-[#4a5270]">{s.location}</p>
              </div>
              {s.current ? (
                <span className="font-mono text-[10px] tracking-[1px] text-[#4ade80]">ACTUAL</span>
              ) : (
                <button
                  onClick={() => showToast("Sesión cerrada", "error")}
                  className="font-mono text-[10px] tracking-[1px] text-[#ff2d78] hover:underline"
                >
                  CERRAR
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SectionHistory() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <h2 className="mb-6 font-display text-[20px] font-bold">Historial de Pedidos</h2>
      <div className="overflow-hidden rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928]">
        {/* Header */}
        <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 border-b border-[rgba(0,245,255,0.08)] px-5 py-3">
          {["Pedido", "Ítem", "Monto", "Estado"].map((h) => (
            <p key={h} className="font-mono text-[10px] uppercase tracking-[1.5px] text-[#4a5270]">{h}</p>
          ))}
        </div>
        {ORDER_HISTORY.map((o, i) => (
          <motion.div
            key={o.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-4 border-b border-[rgba(0,245,255,0.06)] px-5 py-4 last:border-b-0 hover:bg-[rgba(0,245,255,0.02)]"
          >
            <div>
              <p className="font-mono text-[12px] font-bold text-[#00f5ff]">{o.id}</p>
              <p className="font-mono text-[10px] text-[#4a5270]">{o.date}</p>
            </div>
            <p className="font-ui text-[13px]">{o.item}</p>
            <p className="font-mono text-[13px] font-bold">S/ {o.amount.toFixed(2)}</p>
            <StatusBadge variant={o.statusVariant} className="text-[9px]">
              {o.status}
            </StatusBadge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function SectionConfig() {
  const { showToast } = useToast();
  const [notifs, setNotifs] = useState({ drops: true, envios: true, promos: false, sistema: true });

  const toggleNotif = (key: keyof typeof notifs) => {
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
    showToast("Preferencia actualizada");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <h2 className="mb-6 font-display text-[20px] font-bold">Configuración</h2>
      <div className="max-w-[560px] space-y-4">
        {/* Notifications */}
        <div className="rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928] p-6">
          <h3 className="mb-4 font-display text-[15px] font-bold">Notificaciones</h3>
          {[
            { key: "drops" as const, label: "Nuevos Drops", desc: "Aviso cuando se publique un nuevo drop" },
            { key: "envios" as const, label: "Estado de Envíos", desc: "Actualizaciones de tus pedidos" },
            { key: "promos" as const, label: "Promociones", desc: "Ofertas y descuentos exclusivos" },
            { key: "sistema" as const, label: "Sistema", desc: "Mantenimiento y actualizaciones" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="mb-4 flex items-center justify-between last:mb-0">
              <div>
                <p className="font-ui text-[14px] font-semibold">{label}</p>
                <p className="font-mono text-[10px] text-[#4a5270]">{desc}</p>
              </div>
              <button
                onClick={() => toggleNotif(key)}
                className={`relative h-6 w-11 rounded-full transition-colors ${notifs[key] ? "bg-[#00f5ff]" : "bg-[#1a2035]"}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${notifs[key] ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>

        {/* Danger zone */}
        <div className="rounded-[8px] border border-[rgba(255,45,120,0.2)] bg-[#141928] p-6">
          <h3 className="mb-2 font-display text-[15px] font-bold text-[#ff2d78]">Zona de Peligro</h3>
          <p className="mb-4 font-ui text-[12px] text-[#8892aa]">
            Estas acciones son irreversibles. Procede con cuidado.
          </p>
          <Button variant="danger" onClick={() => showToast("Función no disponible en demo", "error")}>
            ELIMINAR CUENTA
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

const SECTIONS = [SectionPanel, SectionUserSettings, SectionSecurity, SectionHistory, SectionConfig];

export default function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const ActiveSection = SECTIONS[activeMenu];

  return (
    <div className="page-container">
      <Navbar />

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

          {/* Profile header — always visible */}
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
                <h1 className="font-display text-[26px] font-bold">
                  {SIDEBAR_ITEMS[activeMenu].label}
                </h1>
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

          {/* Active section content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ActiveSection />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Footer />
    </div>
  );
}
