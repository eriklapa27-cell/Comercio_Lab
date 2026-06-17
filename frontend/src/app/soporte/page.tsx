"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

const FAQS = [
  {
    q: "¿Cómo funcionan las cajas misteriosas?",
    a: "Cada caja contiene un ítem aleatorio basado en las probabilidades de drop publicadas. Al comprar, el contrato inteligente selecciona tu recompensa de forma verificable y transparente. El ítem se deposita directamente en tu Bóveda.",
  },
  {
    q: "¿Cómo hago seguimiento a mi pedido?",
    a: "Ingresa a tu Bóveda (Dashboard) → Envíos Activos. Verás el estado en tiempo real de cada pedido con su número de rastreo único #X-DRP.",
  },
  {
    q: "¿Cuánto tiempo tarda el envío?",
    a: "Los envíos estándar tardan 5–7 días hábiles. El servicio Expreso Cuántico llega al siguiente ciclo de arribo (1–2 días). Los tiempos aplican para Lima Metropolitana; regiones pueden variar.",
  },
  {
    q: "¿Puedo devolver un ítem?",
    a: "Los ítems físicos se pueden devolver dentro de los 7 días de recibidos en su estado original. Los ítems digitales no son reembolsables una vez desbloqueados.",
  },
  {
    q: "¿Cómo contacto a un vendedor del Mercado?",
    a: "En el Mercado Secundario, cada listado muestra el nombre del vendedor. Puedes enviarles un mensaje a través de nuestra plataforma de mensajería interna en Discord.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Aceptamos Visa, Mastercard, American Express, Diners, PayPal y Yape. Todos los pagos son procesados de forma segura por MercadoPago (certificación PCI-DSS Nivel 1).",
  },
];

const TOPICS = [
  "Pedidos y Envíos",
  "Pagos y Facturación",
  "Cajas y Drops",
  "Cuenta y Seguridad",
  "Mercado Secundario",
  "Otro",
];

export default function SoportePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [topic, setTopic] = useState(TOPICS[0]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  function handleTicket(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("✓ Ticket #TKT-" + Math.floor(Math.random() * 9000 + 1000) + " creado. Te responderemos en menos de 24h.");
    }, 1500);
  }

  return (
    <div className="page-container">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[rgba(0,245,255,0.1)] bg-gradient-to-br from-[#0a0d1a] via-[#0f1020] to-[#0a0d1a] px-5 py-14 md:px-10 md:py-18">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mx-auto max-w-[1200px]"
        >
          <span className="mb-4 inline-block rounded-[2px] border border-[#00f5ff] px-3 py-1 font-mono text-[11px] tracking-[2px] text-[#00f5ff]">
            ◈ CENTRO DE SOPORTE X-DROPS
          </span>
          <h1 className="mb-3 font-display text-[42px] font-black leading-none md:text-[56px]">
            ¿En qué podemos
            <br />
            <span className="text-[#00f5ff]">ayudarte?</span>
          </h1>
          <p className="font-ui text-[15px] text-[#8892aa]">
            Tiempo de respuesta promedio: <span className="text-[#4ade80]">{"< 24 horas"}</span>
          </p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_420px]">

          {/* FAQs */}
          <div>
            <h2 className="mb-6 font-display text-[26px] font-bold">Preguntas Frecuentes</h2>
            <div className="flex flex-col gap-2">
              {FAQS.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="overflow-hidden rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928]"
                >
                  <button
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-ui text-[14px] font-semibold">{faq.q}</span>
                    <span
                      className="ml-3 flex-shrink-0 font-mono text-[16px] text-[#00f5ff] transition-transform duration-200"
                      style={{ transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-[rgba(0,245,255,0.08)] px-5 py-4 font-ui text-[13px] leading-relaxed text-[#8892aa]">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="mb-6 font-display text-[26px] font-bold">Abrir Ticket</h2>
            <div className="rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[#141928] p-6">
              <form onSubmit={handleTicket} className="flex flex-col gap-4">
                <Input label="Nombre" placeholder="Tu nombre" required />
                <Input label="Correo Electrónico" type="email" placeholder="operativo@vault.com" required />

                <div>
                  <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[1.5px] text-[#8892aa]">
                    Tema
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full cursor-pointer rounded-[4px] border border-[rgba(0,245,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 font-mono text-[12px] text-[#e8eaf0] outline-none focus:border-[#00f5ff]"
                  >
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[1.5px] text-[#8892aa]">
                    Descripción
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe tu problema con el mayor detalle posible..."
                    className="w-full rounded-[4px] border border-[rgba(0,245,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 font-mono text-[12px] text-[#e8eaf0] outline-none placeholder:text-[#4a5270] focus:border-[#00f5ff] resize-none"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                  ENVIAR TICKET
                </Button>
              </form>

              <div className="mt-5 space-y-2.5 border-t border-[rgba(0,245,255,0.1)] pt-5">
                {[
                  { icon: "💬", label: "Discord", val: "discord.gg/xdrops" },
                  { icon: "📧", label: "Email", val: "soporte@xdrops.pe" },
                  { icon: "🕐", label: "Horario", val: "Lun–Vie · 9am–6pm" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-3">
                    <span className="text-[16px]">{c.icon}</span>
                    <span className="font-mono text-[11px] text-[#4a5270]">{c.label}:</span>
                    <span className="font-mono text-[11px] text-[#8892aa]">{c.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
