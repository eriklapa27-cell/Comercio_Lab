"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";

const REWARDS = [
  { name: "Catalizador Neón", rarity: "epic" as const, drop: "0.5%", emoji: "🌀" },
  { name: "Módulo Lógico", rarity: "rare" as const, drop: "12%", emoji: "🔩" },
  { name: "El Núcleo", rarity: "legendary" as const, drop: "0.1%", emoji: "⚡" },
  { name: "Polvo de Éter", rarity: "common" as const, drop: "86.9%", emoji: "🌊" },
];

const PROBS = [
  { label: "Legendario", pct: "0.12%", color: "#f0c040" },
  { label: "Épico", pct: "4.88%", color: "#a855f7" },
  { label: "Raro", pct: "15.00%", color: "#3b82f6" },
  { label: "Poco Común / Común", pct: "80.00%", color: "#6b7280" },
];

const TECH = [
  { icon: "⚙️", key: "Contrato Inteligente", val: "0x8a1c...F92b" },
  { icon: "🔗", key: "Red", val: "Ethereum Layer 2 (Base)" },
  { icon: "📄", key: "Metadatos", val: "IPFS Frozen (Inmutable)" },
  { icon: "©️", key: "Licencia", val: "CC BY-NC 4.0" },
];

const THUMBS = ["🎁", "🔮", "⚡", "+12"];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function BoxDetailPage(_props: { params: { id: string } }) {
  const [activeThumb, setActiveThumb] = useState(0);
  const [time, setTime] = useState({ h: 4, m: 12, s: 55 });
  const { addItem } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const handleMint = () => {
    addItem({
      id: "box-alquimista",
      name: "LA BÓVEDA DEL ALQUIMISTA",
      series: "Edición Legendaria // Contrato 0x8a1c...F92b",
      price: 25000,
      rarity: "legendary",
      emoji: "🎁",
    });
    showToast("✓ LA BÓVEDA DEL ALQUIMISTA añadida a la bóveda");
    router.push("/checkout");
  };

  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 0, m: 0, s: 0 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="page-container">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-[rgba(0,245,255,0.08)] px-5 py-4 md:px-10">
        <p className="font-mono text-[11px] tracking-[1px] text-[#4a5270]">
          <Link href="/boxes" className="hover:text-[#8892aa] transition-colors">MERCADO</Link>
          {" > "}RAREZA LEGENDARIA {" > "}
          <span className="text-[#00f5ff]">DETALLE DE CAJA</span>
        </p>
      </div>

      <div className="mx-auto max-w-[1200px] px-5 py-6 md:px-10">
        <h1 className="mb-8 font-display text-[36px] font-black md:text-[44px]">
          La Bóveda del Alquimista
        </h1>

        {/* Main grid */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Images */}
          <div>
            <motion.div
              key={activeThumb}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[8px] border border-[rgba(0,245,255,0.12)] text-[80px]"
              style={{ background: "linear-gradient(135deg, #1a0a30, #081525, #200a1a)" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(0,245,255,0.08),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(123,47,255,0.08),transparent_50%)]" />
              <span className="relative z-10">
                {activeThumb < 3 ? THUMBS[activeThumb] : "🎁"}
              </span>
              <div className="absolute bottom-3 right-3">
                <Badge rarity="legendary" />
              </div>
            </motion.div>

            <div className="mt-3 flex gap-2">
              {THUMBS.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className={`flex h-[70px] w-[70px] items-center justify-center rounded-[4px] border text-xl transition-all ${
                    activeThumb === i
                      ? "border-[#00f5ff] bg-[rgba(0,245,255,0.08)]"
                      : "border-[rgba(0,245,255,0.12)] bg-[#141928] hover:border-[rgba(0,245,255,0.3)]"
                  }`}
                >
                  {i === 3 ? (
                    <span className="font-mono text-[11px] text-[#4a5270]">{t}</span>
                  ) : (
                    t
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="mb-5 rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928] p-5">
              <p className="mb-2 font-mono text-[10px] tracking-[2px] text-[#4a5270]">
                SERIE 04: PROTOCOLOS ARCANOS
              </p>
              <p className="mb-1 text-[14px] text-[#f0c040]">★★★★☆</p>
              <p className="mb-4 font-ui text-[13px] leading-relaxed text-[#8892aa]">
                Libera las secuencias ocultas de la forja digital. La Bóveda del Alquimista
                contiene raros artefactos generativos y paquetes de datos visuales
                multi-cadena encriptados dentro de un chasis forjado en vidrio.
              </p>

              <div className="mb-2 flex items-end justify-between">
                <div>
                  <p className="mb-1 font-mono text-[10px] tracking-[2px] text-[#4a5270]">
                    VALORACIÓN ACTUAL
                  </p>
                  <p className="font-display text-[36px] font-black text-[#00f5ff]">
                    S/ 25,000.00
                  </p>
                </div>
                <div className="text-right">
                  <p className="mb-1 font-mono text-[10px] tracking-[2px] text-[#4a5270]">
                    CIERRA EN
                  </p>
                  <p className="font-mono text-[28px] text-[#e8eaf0]">
                    {pad(time.h)}
                    <span className="animate-blink">:</span>
                    {pad(time.m)}
                    <span className="animate-blink">:</span>
                    {pad(time.s)}
                  </p>
                </div>
              </div>

              <p className="mb-4 font-mono text-[10px] text-[#4a5270]">
                762 / 1000 MINTEADOS &nbsp;&nbsp; 60% ASEGURADO
              </p>

              <div className="mb-4 grid grid-cols-2 gap-2.5">
                <Button variant="primary" fullWidth onClick={handleMint}>⚡ MINTEAR AHORA</Button>
                <Button variant="outline">🔖 HACER OFERTA</Button>
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-mono text-[10px] uppercase tracking-[1.5px] text-[#4a5270]">
                  GARANTÍAS DE LA BÓVEDA
                </p>
                {[
                  { icon: "🔵", text: "Prueba de Autenticidad en Capa 2" },
                  { icon: "🟢", text: "Acceso de utilidad al Discord de \"La Forja\"" },
                  { icon: "✨", text: "15% de probabilidad de Variación Animada" },
                ].map((g) => (
                  <div key={g.text} className="flex items-center gap-2.5 font-ui text-[13px] text-[#8892aa]">
                    <span>{g.icon}</span>
                    {g.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rewards */}
        <div className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-[22px] font-bold">Recompensas Potenciales</h2>
            <a href="#" className="font-mono text-[13px] text-[#00f5ff] hover:underline">
              VER SERIE COMPLETA ↗
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {REWARDS.map((r) => (
              <div key={r.name} className="overflow-hidden rounded-[6px] border border-[rgba(0,245,255,0.12)] bg-[#141928]">
                <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-[#1a0a30] to-[#081525] text-[36px]">
                  {r.emoji}
                </div>
                <div className="p-2.5">
                  <div className="mb-1 flex items-center justify-between">
                    <Badge rarity={r.rarity} size="sm" />
                    <span className="font-mono text-[9px] text-[#4a5270]">{r.drop} DROP</span>
                  </div>
                  <p className="font-ui text-[13px] font-semibold">{r.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prob + Tech */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928]">
            <div className="border-b border-[rgba(0,245,255,0.12)] px-5 py-3.5">
              <h3 className="font-display text-[16px] font-bold">Probabilidades de Drop</h3>
            </div>
            {PROBS.map((p) => (
              <div key={p.label} className="flex items-center justify-between border-b border-[rgba(0,245,255,0.08)] px-5 py-3 last:border-0">
                <div className="flex items-center gap-2.5 font-ui text-[14px]">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: p.color }} />
                  {p.label}
                </div>
                <span className="font-mono text-[13px] text-[#00f5ff]">{p.pct}</span>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928]">
            <div className="border-b border-[rgba(0,245,255,0.12)] px-5 py-3.5">
              <h3 className="font-display text-[16px] font-bold">Especificaciones Técnicas</h3>
            </div>
            {TECH.map((t) => (
              <div key={t.key} className="flex items-center justify-between border-b border-[rgba(0,245,255,0.08)] px-5 py-3 last:border-0">
                <div className="flex items-center gap-2.5 font-ui text-[13px] text-[#8892aa]">
                  <span>{t.icon}</span>
                  {t.key}
                </div>
                <span className="font-mono text-[11px] text-[#e8eaf0]">{t.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
