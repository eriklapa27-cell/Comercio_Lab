"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge, Rarity } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";

const CATEGORIES = ["Todo", "Legendarios", "Épicos", "Raros", "Comunes"];
const CAT_KEYS = ["all", "legendary", "epic", "rare", "common"] as const;

const SORTS = ["Precio: Alto — Bajo", "Precio: Bajo — Alto", "Más Reciente", "Más Vendidos"];

const LISTINGS = [
  {
    id: "m1",
    name: "FRAGMENTO DE AETHERIA",
    seller: "VOID_RUNNER_42",
    price: 920,
    original: 1200,
    rarity: "legendary" as Rarity,
    emoji: "🏆",
    glow: "rgba(240,192,64,0.18)",
    stock: 1,
    ends: "2h 14m",
  },
  {
    id: "m2",
    name: "MÁSCARA VOID RUNNER",
    seller: "NEO_XR91",
    price: 450,
    original: 580,
    rarity: "epic" as Rarity,
    emoji: "🎭",
    glow: "rgba(168,85,247,0.15)",
    stock: 3,
    ends: "5h 03m",
  },
  {
    id: "m3",
    name: "LLAVE DE CIFRADO",
    seller: "PHANTOM_DELTA",
    price: 120,
    original: 175,
    rarity: "rare" as Rarity,
    emoji: "🗝️",
    glow: "rgba(59,130,246,0.15)",
    stock: 7,
    ends: "12h 50m",
  },
  {
    id: "m4",
    name: "PULSO CUÁNTICO",
    seller: "AXIOM_ZERO",
    price: 310,
    original: 380,
    rarity: "epic" as Rarity,
    emoji: "⚡",
    glow: "rgba(168,85,247,0.15)",
    stock: 2,
    ends: "8h 22m",
  },
  {
    id: "m5",
    name: "ESENCIA NEÓN",
    seller: "CRYO_MX",
    price: 55,
    original: 80,
    rarity: "common" as Rarity,
    emoji: "🌊",
    glow: "transparent",
    stock: 15,
    ends: "24h 00m",
  },
  {
    id: "m6",
    name: "NÚCLEO OBSIDIAN",
    seller: "VOID_RUNNER_42",
    price: 780,
    original: 960,
    rarity: "legendary" as Rarity,
    emoji: "🌑",
    glow: "rgba(240,192,64,0.18)",
    stock: 1,
    ends: "1h 05m",
  },
];

const STATS = [
  { val: "S/ 2.4M+", label: "VOLUMEN TOTAL" },
  { val: "14,820", label: "TRANSACCIONES" },
  { val: "3,210", label: "VENDEDORES ACTIVOS" },
  { val: "98.7%", label: "TASA DE ÉXITO" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function MercadoPage() {
  const [activeCat, setActiveCat] = useState(0);
  const [activeSort, setActiveSort] = useState(0);
  const { addItem } = useCart();
  const { showToast } = useToast();

  const filtered = LISTINGS
    .filter((l) => {
      const key = CAT_KEYS[activeCat];
      return key === "all" || l.rarity === key;
    })
    .sort((a, b) => {
      if (activeSort === 0) return b.price - a.price;
      if (activeSort === 1) return a.price - b.price;
      return 0;
    });

  return (
    <div className="page-container">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[rgba(0,245,255,0.1)] bg-gradient-to-br from-[#0a0d1a] via-[#100820] to-[#0a0d1a] px-5 py-14 md:px-10 md:py-20">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[rgba(255,45,120,0.06)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[rgba(123,47,255,0.10)] to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-[1200px]"
        >
          <span className="mb-4 inline-block rounded-[2px] border border-[#ff2d78] px-3 py-1 font-mono text-[11px] tracking-[2px] text-[#ff2d78]">
            ◈ MERCADO SECUNDARIO — PEER TO PEER
          </span>
          <h1 className="mb-3 font-display text-[42px] font-black leading-none [text-shadow:0_0_40px_rgba(255,45,120,0.25)] md:text-[60px]">
            Mercado
            <br />
            <span className="text-[#ff2d78]">X-DROPS</span>
          </h1>
          <p className="mb-8 max-w-[480px] font-ui text-[15px] leading-relaxed text-[#8892aa]">
            Compra y vende activos desbloqueados de la bóveda de otros operativos.
            Precios en tiempo real, contratos inteligentes, cero intermediarios.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-mono text-[22px] font-bold text-[#ff2d78]">{s.val}</p>
                <p className="font-mono text-[10px] tracking-[1.5px] text-[#4a5270]">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="mx-auto max-w-[1200px] px-5 py-5 md:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1">
            {CATEGORIES.map((c, i) => (
              <button
                key={c}
                onClick={() => setActiveCat(i)}
                className={`rounded-[3px] border px-4 py-1.5 font-mono text-[11px] tracking-[1px] transition-all ${
                  activeCat === i
                    ? "border-[#ff2d78] bg-[rgba(255,45,120,0.1)] text-[#ff2d78]"
                    : "border-transparent text-[#8892aa] hover:border-[rgba(255,45,120,0.3)] hover:text-[#ff2d78]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(Number(e.target.value))}
              className="cursor-pointer rounded-[4px] border border-[rgba(0,245,255,0.12)] bg-[#0f1423] px-3.5 py-2 font-mono text-[11px] text-[#8892aa] outline-none"
            >
              {SORTS.map((s, i) => (
                <option key={s} value={i}>
                  {s}
                </option>
              ))}
            </select>
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                + LISTAR ACTIVO
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-5 pb-16 sm:grid-cols-2 md:px-10 lg:grid-cols-3"
      >
        {filtered.length === 0 && (
          <motion.div variants={itemAnim} className="col-span-full py-16 text-center">
            <p className="font-display text-[18px] font-bold text-[#4a5270]">
              No hay listados en esta categoría
            </p>
          </motion.div>
        )}

        {filtered.map((l) => (
          <motion.div key={l.id} variants={itemAnim}>
            <ListingCard
              listing={l}
              onBuy={() => {
                addItem({ id: l.id, name: l.name, series: `Vendido por ${l.seller}`, price: l.price, rarity: l.rarity, emoji: l.emoji });
                showToast(`✓ ${l.name} añadido a la bóveda`);
              }}
            />
          </motion.div>
        ))}

        {/* Sell CTA */}
        <motion.div variants={itemAnim}>
          <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-4 rounded-[8px] border border-dashed border-[rgba(255,45,120,0.25)] bg-[rgba(255,45,120,0.03)] p-6 text-center">
            <div className="text-[36px]">💎</div>
            <h3 className="font-display text-[18px] font-bold uppercase tracking-[1px]">
              ¿TIENES ACTIVOS
              <br />
              QUE VENDER?
            </h3>
            <p className="font-ui text-[12px] leading-relaxed text-[#8892aa]">
              Lista tus ítems de la bóveda en el mercado y gana créditos para el siguiente drop.
            </p>
            <Link href="/dashboard">
              <Button variant="magenta" size="sm" fullWidth>
                IR A MI BÓVEDA
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
}

function ListingCard({
  listing,
  onBuy,
}: {
  listing: (typeof LISTINGS)[0];
  onBuy: () => void;
}) {
  const discount = Math.round(((listing.original - listing.price) / listing.original) * 100);

  return (
    <div className="group flex flex-col overflow-hidden rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(255,45,120,0.4)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(255,45,120,0.06)]">
      {/* Image */}
      <div
        className="relative flex aspect-square items-center justify-center text-[48px]"
        style={{ background: "linear-gradient(135deg, #1a0a30, #0a1a2a)" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 50%, ${listing.glow}, transparent 70%)` }}
        />
        <span className="relative z-10">{listing.emoji}</span>
        <div className="absolute left-2.5 top-2.5 z-20">
          <Badge rarity={listing.rarity} />
        </div>
        {discount > 0 && (
          <div className="absolute right-2.5 top-2.5 z-20 rounded-[3px] border border-[rgba(74,222,128,0.4)] bg-[rgba(74,222,128,0.12)] px-2 py-0.5 font-mono text-[10px] tracking-[1px] text-[#4ade80]">
            −{discount}%
          </div>
        )}
        {/* Timer */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 rounded-[3px] border border-[rgba(255,45,120,0.2)] bg-[rgba(5,8,16,0.8)] px-2.5 py-1 font-mono text-[9px] tracking-[1px] text-[#ff2d78]">
          ⏱ {listing.ends}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 font-display text-[15px] font-bold tracking-[0.5px]">{listing.name}</h3>
        <p className="mb-3 font-mono text-[10px] tracking-[1px] text-[#4a5270]">
          VENDIDO POR: {listing.seller} &nbsp;·&nbsp; STOCK: {listing.stock}
        </p>

        <div className="mb-3 flex items-center gap-2">
          <span className="font-mono text-[18px] font-bold text-[#00f5ff]">
            S/ {listing.price.toFixed(2)}
          </span>
          <span className="font-mono text-[12px] text-[#4a5270] line-through">
            S/ {listing.original.toFixed(2)}
          </span>
        </div>

        <div className="mt-auto">
          <Button variant="primary" fullWidth onClick={onBuy}>
            COMPRAR AHORA
          </Button>
        </div>
      </div>
    </div>
  );
}
