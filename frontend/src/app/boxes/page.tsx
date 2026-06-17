"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge, Rarity } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { XpBar } from "@/components/ui/XpBar";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";

const FILTERS = ["Todas las Colecciones", "Electrónica", "Ropa", "Artefactos"];
const FILTER_KEYS = ["all", "electronica", "ropa", "artefactos"] as const;

const SORTS = [
  "Rareza: Alta — Baja",
  "Precio: Alto — Bajo",
  "Precio: Bajo — Alto",
  "Más Reciente",
];

const RARITY_WEIGHT: Record<string, number> = {
  legendary: 4,
  epic: 3,
  rare: 2,
  common: 1,
};

const PRODUCTS = [
  {
    id: "1",
    name: "CAJA NEÓN APEX",
    desc: "Periféricos mecánicos de alto rendimiento y equipo háptico de edición limitada.",
    price: 960,
    rarity: "legendary" as Rarity,
    category: "electronica",
    emoji: "🎁",
    prob: "90% PROBABILIDAD DE RARA+",
    glow: "rgba(240,192,64,0.15)",
    cta: "STAKE PARA DESBLOQUEAR",
    ctaVariant: "outline" as const,
  },
  {
    id: "2",
    name: "CAJA DE SEGURIDAD",
    desc: "Hardware de sitio de última generación, unidades de almacenamiento modular y herramientas dev encriptadas.",
    price: 715,
    rarity: "epic" as Rarity,
    category: "electronica",
    emoji: "📦",
    prob: "75% PROBABILIDAD DE RARA+",
    glow: "rgba(168,85,247,0.15)",
    cta: "COMPRAR DROP",
    ctaVariant: "primary" as const,
  },
  {
    id: "3",
    name: "SÍNTESIS AURA",
    desc: "Tecnología de cuidado cyber-chic, pigmentos bioluminiscentes y wearables digitales.",
    price: 465,
    rarity: "epic" as Rarity,
    category: "ropa",
    emoji: "✨",
    prob: "88% PROBABILIDAD DE RARA+",
    glow: "rgba(0,245,255,0.12)",
    cta: "COMPRAR DROP",
    ctaVariant: "primary" as const,
  },
  {
    id: "4",
    name: "VOID WALKER",
    desc: "Equipo de tecnología digital y accesorios urbanos fantasma.",
    price: 380,
    rarity: "common" as Rarity,
    category: "artefactos",
    emoji: "👻",
    prob: "",
    glow: "transparent",
    cta: "AGOTADO",
    ctaVariant: "ghost" as const,
    soldOut: true,
  },
  {
    id: "5",
    name: "RAW CORE",
    desc: "Componentes esenciales y herramientas de utilidad digital de nivel de entrada.",
    price: 175,
    rarity: "common" as Rarity,
    category: "electronica",
    emoji: "🔧",
    prob: "MÁS DE BASE",
    glow: "rgba(240,192,64,0.08)",
    cta: "COMPRAR DROP",
    ctaVariant: "primary" as const,
  },
];

const HERO_PRODUCT = {
  id: "hero-1",
  name: "PROTOCOLO OBSIDIAN PULSE",
  series: "Drop Destacado // Vanguardia Virtual",
  price: 960,
  rarity: "legendary" as Rarity,
  emoji: "🎁",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function BoxesPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#050810]"><span className="font-mono text-[13px] tracking-[2px] text-[#4a5270]">CARGANDO...</span></div>}>
      <BoxesContent />
    </Suspense>
  );
}

function BoxesContent() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [activeSort, setActiveSort] = useState(0);
  const { addItem } = useCart();
  const { showToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("sort") === "trending") {
      setActiveSort(3);
    }
  }, [searchParams]);

  const filteredProducts = PRODUCTS
    .filter((p) => {
      const key = FILTER_KEYS[activeFilter];
      return key === "all" || p.category === key;
    })
    .sort((a, b) => {
      if (activeSort === 0) return RARITY_WEIGHT[b.rarity] - RARITY_WEIGHT[a.rarity];
      if (activeSort === 1) return b.price - a.price;
      if (activeSort === 2) return a.price - b.price;
      return Number(a.id) - Number(b.id);
    });

  const handleAddHero = () => {
    addItem(HERO_PRODUCT);
    showToast("✓ PROTOCOLO OBSIDIAN PULSE añadido a la bóveda");
  };

  return (
    <div className="page-container">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[rgba(0,245,255,0.1)] bg-gradient-to-br from-[#0a0d1a] via-[#0f0820] to-[#0a0d1a] px-5 py-14 md:px-10 md:py-20">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[rgba(123,47,255,0.12)] to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-[1200px] mx-auto"
        >
          <span className="mb-4 inline-block rounded-[2px] border border-[#00f5ff] px-3 py-1 font-mono text-[11px] tracking-[2px] text-[#00f5ff]">
            ◈ DROP DESTACADO: VANGUARDIA VIRTUAL
          </span>
          <h1 className="mb-3 font-display text-[42px] font-black leading-none [text-shadow:0_0_40px_rgba(0,245,255,0.3)] md:text-[64px]">
            Protocolo Obsidian
            <br />
            Pulse
          </h1>
          <p className="mb-7 max-w-[480px] font-ui text-[15px] leading-relaxed text-[#8892aa]">
            Desbloquea la primera oleada de activos de hardware descentralizados.
            Diseñados para el rendimiento, creados para la élite. Solo quedan 500 cajas.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/boxes/1">
              <Button variant="outline">REVELAR CONTENIDO</Button>
            </Link>
            <Button variant="primary" onClick={handleAddHero}>
              AÑADIR A LA BOLSA
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="mx-auto max-w-[1200px] px-5 py-5 md:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-[26px] font-bold">Catálogo de Cajas</h2>
            <div className="mt-2.5 flex flex-wrap gap-1">
              {FILTERS.map((f, i) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(i)}
                  className={`rounded-[3px] border px-4 py-1.5 font-mono text-[11px] tracking-[1px] transition-all ${
                    activeFilter === i
                      ? "border-[#00f5ff] bg-[rgba(0,245,255,0.1)] text-[#00f5ff]"
                      : "border-transparent text-[#8892aa] hover:border-[rgba(0,245,255,0.3)] hover:text-[#00f5ff]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(Number(e.target.value))}
            className="cursor-pointer rounded-[4px] border border-[rgba(0,245,255,0.12)] bg-[#0f1423] px-3.5 py-2 font-mono text-[11px] text-[#8892aa] outline-none"
          >
            {SORTS.map((s, i) => (
              <option key={s} value={i}>
                Ordenar por: {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-5 pb-16 sm:grid-cols-2 md:px-10 lg:grid-cols-3"
      >
        {filteredProducts.length === 0 && (
          <motion.div variants={item} className="col-span-full py-16 text-center">
            <p className="font-display text-[18px] font-bold text-[#4a5270]">
              No hay drops en esta categoría
            </p>
          </motion.div>
        )}
        {filteredProducts.map((p) => (
          <motion.div key={p.id} variants={item}>
            <ProductCard
              product={p}
              onAdd={() => {
                addItem({ id: p.id, name: p.name, series: p.desc, price: p.price, rarity: p.rarity, emoji: p.emoji });
                showToast(`✓ ${p.name} añadido a la bóveda`);
                router.push("/cart");
              }}
            />
          </motion.div>
        ))}

        {/* Upsell card */}
        <motion.div variants={item}>
          <div className="flex flex-col gap-3 rounded-[8px] border border-[rgba(123,47,255,0.3)] bg-gradient-to-br from-[#141928] to-[rgba(123,47,255,0.08)] p-6">
            <div className="text-center text-[32px]">🔐</div>
            <h3 className="text-center font-display text-[18px] font-bold uppercase tracking-[1px]">
              SUBE DE NIVEL TUS
              <br />
              DROPS
            </h3>
            <p className="text-center font-ui text-[12px] leading-relaxed text-[#8892aa]">
              Únete al programa de la Bóveda para aumentar tu tasa de obtención de
              ítems raros en un 35%.
            </p>
            <XpBar current={4080} max={5000} />
            <Link href="/dashboard">
              <Button variant="primary" fullWidth>
                ENTRAR EN LA BÓVEDA
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Subscribe banner */}
      <div className="border-y border-[rgba(0,245,255,0.1)] bg-gradient-to-r from-[#141928] via-[rgba(123,47,255,0.06)] to-[#141928]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row md:px-10">
          <div>
            <h2 className="font-display text-[28px] font-black uppercase leading-tight md:text-[34px]">
              NUNCA TE PIERDAS UN
              <br />
              <span className="text-[#00f5ff]">REVEAL.</span>
            </h2>
            <p className="mt-2 font-ui text-[13px] text-[#8892aa]">
              Asegura tu lugar en la whitelist para el próximo drop GENESIS. Solo quedan 100 espacios.
            </p>
          </div>
          <div className="flex w-full max-w-[400px] gap-2">
            <input
              className="flex-1 rounded-[4px] border border-[rgba(0,245,255,0.12)] bg-[#0f1423] px-4 py-3 font-ui text-[13px] text-[#e8eaf0] outline-none placeholder:text-[#4a5270] focus:border-[#00f5ff]"
              placeholder="Introduce tu correo encriptado..."
            />
            <Button variant="primary">UNIRSE</Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function ProductCard({
  product,
  onAdd,
}: {
  product: (typeof PRODUCTS)[0];
  onAdd: () => void;
}) {
  const showCta = product.cta === "COMPRAR DROP";

  return (
    <Link
      href={product.soldOut ? "#" : `/boxes/${product.id}`}
      className={`group block rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928] overflow-hidden transition-all duration-300 ${
        product.soldOut
          ? "cursor-not-allowed opacity-50"
          : "hover:-translate-y-1 hover:border-[rgba(0,245,255,0.4)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(0,245,255,0.08)]"
      }`}
    >
      {/* Image */}
      <div
        className="relative flex aspect-square items-center justify-center text-[48px]"
        style={{
          background: `linear-gradient(135deg, #1a1030, #0a1a2a)`,
        }}
      >
        {product.soldOut && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[rgba(5,8,16,0.6)] font-mono text-[14px] tracking-[2px] text-[#4a5270]">
            AGOTADO
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 50%, ${product.glow}, transparent 70%)` }}
        />
        <span className="relative z-10">{product.emoji}</span>
        <div className="absolute left-2.5 top-2.5 z-20">
          <Badge rarity={product.rarity} />
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="mb-1 font-display text-[15px] font-bold tracking-[0.5px]">
          {product.name}
        </h3>
        <p className="mb-3 font-ui text-[12px] leading-relaxed text-[#8892aa]">
          {product.desc}
        </p>
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[16px] font-bold text-[#00f5ff]">
            S/ {product.price.toFixed(2)}
          </span>
          {product.prob && (
            <span className="font-mono text-[10px] text-[#4a5270]">{product.prob}</span>
          )}
        </div>
        <Button
          variant={product.ctaVariant}
          fullWidth
          disabled={product.soldOut}
          onClick={
            showCta
              ? (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onAdd();
                }
              : undefined
          }
        >
          {product.cta}
        </Button>
      </div>
    </Link>
  );
}
