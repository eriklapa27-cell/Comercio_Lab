"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { useCart } from "@/context/CartContext";

type UIState = "idle" | "loading" | "redirecting";

const PAYMENT_METHODS = [
  { id: "card", label: "Tarjeta de Crédito / Débito", icon: "💳" },
  { id: "paypal", label: "PayPal", icon: "🅿️" },
];

const CARD_BRANDS = ["VISA", "MC", "AMEX", "DINERS"];

const SEC_BADGES = [
  { icon: "🛡️", label: "CUMPLIMIENTO PCI-DSS" },
  { icon: "🔒", label: "ENCRIPTACIÓN AES-256" },
  { icon: "🚫", label: "PROTECCIÓN ANTIFRAUDE" },
];

const ACCEPTED_METHODS = [
  { icon: "📱", label: "Yape" },
  { icon: "💳", label: "Visa" },
  { icon: "💳", label: "Mastercard" },
  { icon: "💳", label: "Amex" },
  { icon: "🅿️", label: "PayPal" },
];

export default function PaymentPage() {
  const [method, setMethod] = useState("card");
  const [uiState, setUiState] = useState<UIState>("idle");
  const [cardNumber, setCardNumber] = useState("");
  const { showToast } = useToast();
  const { items, total, clearCart } = useCart();

  const formatCard = (val: string) =>
    val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const isLoading = uiState === "loading" || uiState === "redirecting";

  async function handleConfirm() {
    setUiState("loading");
    const mpItems = items.length > 0
      ? items.map((it) => ({
          title: it.name,
          quantity: it.qty,
          unit_price: it.price,
          currency_id: "PEN",
        }))
      : [{ title: "PAQUETE X-DROPS", quantity: 1, unit_price: 9250, currency_id: "PEN" }];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments/preference`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: mpItems,
            payer: { email: "cliente@example.com", name: "ALEX MERCER" },
            orderId: `order-${Date.now()}`,
          }),
        }
      );

      if (!res.ok) throw new Error("Response not OK");

      const data = await res.json();
      setUiState("redirecting");
      clearCart();
      window.location.href = data.sandbox_init_point;
    } catch {
      setUiState("idle");
      showToast("ERROR AL CONECTAR CON MERCADOPAGO", "error");
    }
  }

  return (
    <div className="page-container">
      <Navbar />

      <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-10 md:px-10 lg:grid-cols-[1fr_380px]">
        {/* Left */}
        <div>
          <div className="mb-2 flex items-center gap-2.5">
            <h1 className="font-display text-[34px] font-black md:text-[38px]">
              Pago y Confirmación
            </h1>
            <span className="font-mono text-[11px] tracking-[1px] text-[#4a5270]">
              🔒 PAGO SEGURO
            </span>
          </div>
          <p className="mb-8 font-ui text-[13px] text-[#8892aa]">
            Completa tu transacción para desbloquear la bóveda digital.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928] p-6"
          >
            <h2 className="mb-4 font-display text-[16px] font-bold">Método de Pago</h2>

            {/* Payment method tabs */}
            <div className="mb-5 flex gap-2">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-[6px] border-2 px-3 py-3 font-ui text-[13px] font-semibold transition-all ${
                    method === m.id
                      ? "border-[#00f5ff] bg-[rgba(0,245,255,0.08)] text-[#00f5ff]"
                      : "border-[rgba(0,245,255,0.12)] text-[#8892aa] hover:border-[rgba(0,245,255,0.3)]"
                  }`}
                >
                  <span className="text-[18px]">{m.icon}</span>
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              ))}
            </div>

            {method === "card" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                {/* Card brand icons */}
                <div className="mb-4 flex justify-end gap-2">
                  {CARD_BRANDS.map((b) => (
                    <div
                      key={b}
                      className="rounded-[4px] border border-[rgba(0,245,255,0.12)] bg-[#1a2035] px-2.5 py-1 font-mono text-[9px] tracking-[1px] text-[#4a5270]"
                    >
                      {b}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  <Input label="Nombre del Titular" defaultValue="ALEX MERCER" />

                  <div>
                    <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[1.5px] text-[#8892aa]">
                      Número de Tarjeta
                    </label>
                    <div className="relative">
                      <input
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCard(e.target.value))}
                        placeholder="0000 0000 0000 0000"
                        className="w-full rounded-[4px] border border-[rgba(0,245,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 pr-12 font-mono text-[14px] tracking-[2px] text-[#e8eaf0] outline-none placeholder:text-[#4a5270] focus:border-[#00f5ff] focus:shadow-[0_0_0_3px_rgba(0,245,255,0.08)]"
                      />
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[20px]">
                        💳
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Fecha de Expiración" placeholder="MM / AA" />
                    <div>
                      <label className="mb-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[1.5px] text-[#8892aa]">
                        CVV / CVC
                        <span className="cursor-help text-[12px] text-[#4a5270]" title="3-4 dígitos en el reverso">
                          ⓘ
                        </span>
                      </label>
                      <input
                        maxLength={4}
                        placeholder="•••"
                        className="w-full rounded-[4px] border border-[rgba(0,245,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 font-mono text-[14px] tracking-[4px] text-[#e8eaf0] outline-none placeholder:text-[#4a5270] focus:border-[#00f5ff] focus:shadow-[0_0_0_3px_rgba(0,245,255,0.08)]"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {method === "paypal" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center gap-3 py-8"
              >
                <div className="text-[48px]">🅿️</div>
                <p className="font-ui text-[14px] text-[#8892aa]">
                  Serás redirigido a PayPal para completar el pago.
                </p>
              </motion.div>
            )}

            {/* Security badges */}
            <div className="mt-5 flex flex-wrap gap-4 border-t border-[rgba(0,245,255,0.1)] pt-4">
              {SEC_BADGES.map((b) => (
                <div key={b.label} className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.5px] text-[#4a5270]">
                  <span>{b.icon}</span>
                  {b.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Accepted Methods */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-5 rounded-[8px] border border-[rgba(0,245,255,0.08)] bg-[#0f1423] p-5"
          >
            <div className="mb-3 flex items-center gap-2">
              <h3 className="font-mono text-[11px] uppercase tracking-[2px] text-[#4a5270]">
                MÉTODOS ACEPTADOS
              </h3>
              <div className="h-px flex-1 bg-[rgba(0,245,255,0.06)]" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {ACCEPTED_METHODS.map((m) => (
                <div
                  key={m.label}
                  className="flex items-center gap-1.5 rounded-[4px] border border-[rgba(0,245,255,0.1)] bg-[#141928] px-3 py-1.5"
                >
                  <span className="text-[14px]">{m.icon}</span>
                  <span className="font-mono text-[10px] tracking-[0.5px] text-[#8892aa]">
                    {m.label}
                  </span>
                </div>
              ))}
              {/* MercadoPago logo chip */}
              <div className="flex items-center gap-1.5 rounded-[4px] border border-[rgba(0,245,255,0.18)] bg-[rgba(0,110,245,0.12)] px-3 py-1.5">
                <span className="text-[14px]">🏦</span>
                <span className="font-mono text-[10px] tracking-[0.5px] text-[#3399ff]">
                  MercadoPago
                </span>
              </div>
            </div>
            <p className="mt-3 font-mono text-[9px] tracking-[0.5px] text-[#4a5270]">
              PROCESADO MEDIANTE MERCADOPAGO · PLATAFORMA CERTIFICADA PCI-DSS NIVEL 1
            </p>
          </motion.div>
        </div>

        {/* Summary */}
        <div>
          <div className="sticky top-[80px] rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928] p-6">
            {/* Items */}
            <div className="mb-4">
              {items.length === 0 ? (
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-[4px] bg-gradient-to-br from-[#1a0a30] to-[#081525] text-[22px]">
                    🎁
                  </div>
                  <div>
                    <Badge rarity="legendary" size="sm" className="mb-1" />
                    <p className="font-ui text-[14px] font-bold">PAQUETE X-DROPS</p>
                    <p className="font-mono text-[16px] text-[#00f5ff]">S/. 9,250.00</p>
                  </div>
                </div>
              ) : (
                items.map((it) => (
                  <div key={it.id} className="mb-3 flex items-center gap-3">
                    <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-[4px] bg-gradient-to-br from-[#1a0a30] to-[#081525] text-[22px]">
                      {it.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <Badge rarity={it.rarity} size="sm" className="mb-1" />
                      <p className="font-ui text-[13px] font-bold leading-tight">{it.name}</p>
                      <p className="font-mono text-[10px] text-[#4a5270]">x{it.qty}</p>
                      <p className="font-mono text-[13px] text-[#00f5ff]">
                        S/ {(it.price * it.qty).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-[rgba(0,245,255,0.12)] pt-4">
              {[
                { label: "Subtotal", val: `S/ ${(items.length > 0 ? total : 9250).toFixed(2)}` },
                { label: "Tarifa de Gas de Red", val: "S/ 7.50" },
                { label: "Tarifa de Plataforma", val: "S/ 0.00" },
              ].map((r) => (
                <div key={r.label} className="mb-2.5 flex justify-between font-ui text-[14px]">
                  <span className="text-[#8892aa]">{r.label}</span>
                  <span className="font-mono text-[13px]">{r.val}</span>
                </div>
              ))}
              <div className="mt-4 flex items-center justify-between border-t border-[rgba(0,245,255,0.12)] pt-4">
                <span className="font-display text-[18px] font-bold">Total</span>
                <span className="font-mono text-[24px] font-bold text-[#00f5ff]">
                  S/ {(items.length > 0 ? total + 7.5 : 9257.5).toFixed(2)}
                </span>
              </div>
            </div>

            {/* MercadoPago CTA */}
            <div className="mt-5">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                loading={isLoading}
                onClick={handleConfirm}
              >
                {uiState === "redirecting"
                  ? "REDIRIGIENDO..."
                  : "CONFIRMAR Y COMPLETAR DROP"}
              </Button>
              <div className="mt-2 flex items-center justify-center gap-1.5">
                <span className="text-[12px]">🏦</span>
                <span className="font-mono text-[9px] tracking-[0.5px] text-[#3399ff]">
                  POWERED BY MERCADOPAGO
                </span>
              </div>
            </div>

            <p className="mt-3 text-center font-mono text-[9px] tracking-[0.5px] text-[#4a5270]">
              AL HACER CLIC, ACEPTAS LOS TÉRMINOS DE SERVICIO DE X-DROPS.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
