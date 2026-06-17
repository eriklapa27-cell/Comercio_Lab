"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useCart } from "@/context/CartContext";

const UPCOMING = [
  { name: "RELIQUIA DEL VACÍO #09", emoji: "🌑", locked: false },
  { name: "CIBER-PÉTALO VII", emoji: "💫", locked: false },
  { name: "ACTIVO NO REVELADO", emoji: "🔒", locked: true },
  { name: "ACTIVO NO REVELADO", emoji: "🔒", locked: true },
];

export default function CartPage() {
  const { items, removeItem: ctxRemove, updateQty: ctxUpdateQty } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const { showToast } = useToast();

  const updateQty = (id: string, delta: number) => {
    ctxUpdateQty(id, delta);
    showToast("CANTIDAD ACTUALIZADA");
  };

  const removeItem = (id: string) => {
    ctxRemove(id);
    showToast("ITEM REMOVIDO DE LA BÓVEDA", "error");
  };

  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);
  const gas = 80;
  const discount = 200;
  const total = subtotal + gas - discount;

  return (
    <div className="page-container">
      <Navbar />

      <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-10 md:px-10 lg:grid-cols-[1fr_380px]">
        {/* Left */}
        <div>
          <h1 className="mb-1 font-display text-[38px] font-black md:text-[44px]">Tu Bóveda</h1>
          <p className="mb-8 font-ui text-[13px] text-[#8892aa]">
            Revisa tus drops asegurados antes de la extracción final.
          </p>

          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.25 }}
                className="mb-3 flex items-center gap-5 rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928] p-5"
              >
                {/* Image */}
                <div className="flex h-[80px] w-[80px] flex-shrink-0 items-center justify-center rounded-[6px] border border-[rgba(0,245,255,0.12)] bg-gradient-to-br from-[#1a0a30] to-[#081525] text-[28px]">
                  {item.emoji}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <Badge rarity={item.rarity} size="sm" />
                  </div>
                  <h3 className="font-display text-[15px] font-bold tracking-[0.5px]">
                    {item.name}
                  </h3>
                  <p className="font-mono text-[10px] tracking-[1px] text-[#4a5270]">
                    {item.series}
                  </p>
                  <div className="mt-2.5 flex items-center gap-2.5">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="flex h-7 w-7 items-center justify-center rounded-[3px] border border-[rgba(0,245,255,0.12)] bg-[#1a2035] text-[16px] transition-all hover:border-[#00f5ff] hover:text-[#00f5ff]"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-mono text-[14px]">
                      {String(item.qty).padStart(2, "0")}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-[3px] border border-[rgba(0,245,255,0.12)] bg-[#1a2035] text-[16px] transition-all hover:border-[#00f5ff] hover:text-[#00f5ff]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price + Delete */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[18px] text-[#4a5270] transition-colors hover:text-[#ff2d78]"
                  >
                    🗑
                  </button>
                  <span className="font-mono text-[17px] font-bold text-[#00f5ff]">
                    S/ {(item.price * item.qty).toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {items.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <div className="mb-4 text-[48px]">🗂</div>
              <p className="font-display text-[18px] font-bold text-[#4a5270]">
                Tu bóveda está vacía
              </p>
              <Link href="/boxes" className="mt-4 inline-block">
                <Button variant="outline" className="mt-4">EXPLORAR DROPS</Button>
              </Link>
            </motion.div>
          )}

          {/* Upcoming */}
          <div className="mt-10">
            <h2 className="mb-4 font-display text-[20px] font-bold">
              No te pierdas estos próximos drops
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {UPCOMING.map((u, i) => (
                <div key={i} className="overflow-hidden rounded-[6px] border border-[rgba(0,245,255,0.12)] bg-[#141928]">
                  <div className={`flex aspect-square items-center justify-center text-[32px] bg-gradient-to-br from-[#1a0a30] to-[#081525] ${u.locked ? "opacity-50 grayscale-[0.8]" : ""}`}>
                    {u.emoji}
                  </div>
                  <div className="p-2.5">
                    <p className={`font-mono text-[9px] uppercase tracking-[1.5px] ${u.locked ? "text-[#4a5270]" : "text-[#00f5ff]"}`}>
                      {u.locked ? "CLASIFICADO" : "PRÓXIMAMENTE"}
                    </p>
                    <p className={`font-ui text-[11px] font-bold tracking-[0.5px] ${u.locked ? "text-[#4a5270]" : ""}`}>
                      {u.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div>
          <div className="sticky top-[80px] rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928] p-6">
            <h3 className="mb-5 font-display text-[20px] font-bold">Resumen del Pedido</h3>

            {[
              { label: "Subtotal", val: `S/ ${subtotal.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`, accent: false },
              { label: "Tarifa de Red (Gas)", val: `S/ ${gas.toFixed(2)}`, accent: false },
              { label: "Tarifa de Plataforma", val: `−S/ ${discount.toFixed(2)}`, accent: true },
            ].map((row) => (
              <div key={row.label} className="mb-3 flex items-center justify-between font-ui text-[14px]">
                <span className="text-[#8892aa]">{row.label}</span>
                <span className={`font-mono text-[13px] ${row.accent ? "text-[#4ade80]" : ""}`}>
                  {row.val}
                </span>
              </div>
            ))}

            <div className="mb-5 mt-4 border-t border-[rgba(0,245,255,0.12)] pt-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-mono text-[10px] tracking-[1px] text-[#4a5270]">
                    COSTO TOTAL DE EXTRACCIÓN
                  </p>
                  <p className="mt-1 font-display text-[16px] font-bold">S/</p>
                </div>
                <span className="font-mono text-[28px] font-bold text-[#00f5ff]">
                  {total.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Promo */}
            <p className="mb-2 font-mono text-[10px] tracking-[1px] text-[#4a5270]">
              CÓDIGO PROMO
            </p>
            <div className="mb-4 flex gap-2">
              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="INGRESAR CÓDIGO"
                className="flex-1 rounded-[4px] border border-[rgba(0,245,255,0.12)] bg-[rgba(255,255,255,0.04)] px-3 py-2.5 font-mono text-[12px] text-[#e8eaf0] outline-none placeholder:text-[#4a5270] focus:border-[#00f5ff]"
              />
              <Button variant="outline" size="sm" onClick={() => showToast("CÓDIGO INVÁLIDO", "error")}>
                APPLY
              </Button>
            </div>

            <Link href="/checkout">
              <Button variant="primary" size="lg" fullWidth>
                PROCEDER AL CHECKOUT
              </Button>
            </Link>

            <div className="mt-3 flex items-center justify-center gap-1.5 font-mono text-[10px] tracking-[1px] text-[#4a5270]">
              🔒 TRANSACCIÓN ENCRIPTADA SEGURA
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
