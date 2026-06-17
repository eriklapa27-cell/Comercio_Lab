"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { XpBar } from "@/components/ui/XpBar";
import { useCart } from "@/context/CartContext";

const STEPS = ["Envío", "Pago", "Revisión"];

const DELIVERY_OPTIONS = [
  {
    name: "Encriptación Estándar",
    sub: "5–7 Ciclos de Negocio",
    price: "GRATIS",
    priceVal: 0,
    fast: false,
  },
  {
    name: "Expreso Cuántico",
    sub: "Siguiente Ciclo de Arribo",
    price: "S/ 25.00",
    priceVal: 25,
    fast: true,
  },
];

export default function CheckoutPage() {
  const [delivery, setDelivery] = useState(0);
  const { items } = useCart();

  const subtotal = items.reduce((a, it) => a + it.price * it.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const shipping = DELIVERY_OPTIONS[delivery].priceVal;
  const total = subtotal + tax + shipping;

  return (
    <div className="page-container">
      <Navbar />

      <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-10 md:px-10 lg:grid-cols-[1fr_380px]">
        {/* Left */}
        <div>
          <h1 className="mb-1 font-display text-[34px] font-black md:text-[40px]">
            Envío y Checkout
          </h1>
          <p className="mb-8 font-ui text-[13px] text-[#8892aa]">
            Completa tu protocolo para asegurar el drop.
          </p>

          {/* Steps */}
          <div className="mb-10 flex items-center">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-[1.5px]`}>
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[12px] font-bold transition-all ${
                      i === 0
                        ? "border-[#00f5ff] bg-[rgba(0,245,255,0.1)] text-[#00f5ff]"
                        : i < 0
                        ? "border-[#00f5ff] bg-[#00f5ff] text-[#050810]"
                        : "border-[rgba(0,245,255,0.2)] text-[#4a5270]"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className={i === 0 ? "text-[#00f5ff]" : "text-[#4a5270]"}>{s}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="mx-3 h-px flex-1 bg-[rgba(0,245,255,0.12)]" style={{ minWidth: 24 }} />
                )}
              </div>
            ))}
          </div>

          {/* Shipping address */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928] p-6"
          >
            <h2 className="mb-5 flex items-center gap-2 font-display text-[16px] font-bold">
              <span>📍</span> Dirección de Envío
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <Input label="Nombre" defaultValue="NEO" />
              <Input label="Apellido" defaultValue="ANDERSON" />
            </div>
            <div className="mt-3">
              <Input label="Dirección" defaultValue="101 Binary Boulevard" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Input label="Ciudad" defaultValue="Zion" />
              <Input label="Código Postal" defaultValue="000101" />
            </div>
            <div className="mt-3">
              <Select label="País / Región">
                <option>Red Unida de Ciudades</option>
                <option>Perú</option>
                <option>Colombia</option>
              </Select>
            </div>
            <label className="mt-4 flex cursor-pointer items-center gap-2 font-ui text-[13px] text-[#8892aa]">
              <input type="checkbox" defaultChecked className="accent-[#00f5ff]" />
              Guardar esta dirección para futuras transmisiones
            </label>
          </motion.div>

          {/* Delivery */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928] p-6"
          >
            <h2 className="mb-4 flex items-center gap-2 font-display text-[16px] font-bold">
              <span>📦</span> Protocolo de Entrega
            </h2>
            <div className="flex flex-col gap-2.5">
              {DELIVERY_OPTIONS.map((opt, i) => (
                <button
                  key={opt.name}
                  onClick={() => setDelivery(i)}
                  className={`flex items-center justify-between rounded-[6px] border px-4 py-3.5 text-left transition-all ${
                    delivery === i
                      ? "border-[#00f5ff] bg-[rgba(0,245,255,0.06)]"
                      : "border-[rgba(0,245,255,0.12)] hover:border-[rgba(0,245,255,0.3)]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`relative flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 ${
                        delivery === i ? "border-[#00f5ff]" : "border-[rgba(0,245,255,0.2)]"
                      }`}
                    >
                      {delivery === i && (
                        <div className="absolute inset-[3px] rounded-full bg-[#00f5ff]" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 font-ui text-[14px] font-bold">
                        {opt.name}
                        {opt.fast && (
                          <span className="rounded-[2px] border border-[#ff2d78] bg-[rgba(255,45,120,0.12)] px-1.5 py-0.5 font-mono text-[9px] tracking-[1px] text-[#ff2d78]">
                            MÁS RÁPIDO
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-[11px] text-[#4a5270]">{opt.sub}</div>
                    </div>
                  </div>
                  <span className="font-mono text-[14px] font-bold text-[#4ade80]">{opt.price}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <div className="mt-6">
            <Link href="/payment">
              <Button variant="primary" size="lg" fullWidth>
                PROCEDER AL PAGO →
              </Button>
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="sticky top-[80px] rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928] p-6">
            <h3 className="mb-5 font-display text-[18px] font-bold">Resumen del Pedido</h3>

            {items.length === 0 && (
              <p className="mb-4 font-mono text-[11px] text-[#4a5270]">Tu bóveda está vacía</p>
            )}
            {items.map((it) => (
              <div key={it.id} className="mb-4 flex items-center gap-3">
                <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-[4px] bg-gradient-to-br from-[#1a0a30] to-[#081525] text-[22px]">
                  {it.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <Badge rarity={it.rarity} size="sm" className="mb-1" />
                  <p className="font-ui text-[13px] font-bold">{it.name}</p>
                  <p className="font-mono text-[10px] text-[#4a5270]">
                    {it.series} &nbsp; CANT: {it.qty}
                  </p>
                  <p className="font-mono text-[14px] text-[#00f5ff]">
                    S/ {it.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-4 border-t border-[rgba(0,245,255,0.12)] pt-4">
              {[
                { label: "Subtotal", val: `S/ ${subtotal.toFixed(2)}` },
                { label: "Impuesto de Red", val: `S/ ${tax.toFixed(2)}` },
                { label: "Envío", val: shipping === 0 ? "GRATIS" : `S/ ${shipping.toFixed(2)}`, green: shipping === 0 },
              ].map((r) => (
                <div key={r.label} className="mb-2.5 flex justify-between font-ui text-[14px]">
                  <span className="text-[#8892aa]">{r.label}</span>
                  <span className={`font-mono text-[13px] ${"green" in r && r.green ? "text-[#4ade80]" : ""}`}>
                    {r.val}
                  </span>
                </div>
              ))}
              <div className="mt-4 flex items-center justify-between border-t border-[rgba(0,245,255,0.12)] pt-4">
                <span className="font-display text-[18px] font-bold">Total</span>
                <span className="font-mono text-[26px] font-bold text-[#00f5ff]">
                  S/ {total.toFixed(2)}
                </span>
              </div>
              <p className="mt-1 text-right font-mono text-[9px] text-[#4a5270]">
                ≈ 0.048 ETH
              </p>
            </div>

            <div className="mt-4 border-t border-[rgba(0,245,255,0.12)] pt-4">
              <XpBar current={4300} max={5000} showBonus="+150 XP" />
              <p className="mt-2 font-mono text-[9px] text-[#4a5270]">
                Completa esta compra para alcanzar el Nivel 14: &quot;El Alquimista&quot;
              </p>
            </div>

            <div className="mt-4 flex items-center justify-center gap-1.5 font-mono text-[10px] tracking-[0.5px] text-[#4a5270]">
              🔐 TRANSMISIÓN ENCRIPTADA ASEGURADA POR X-SHIELD
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
