"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const COMMON_REASONS = [
  "Fondos insuficientes en la tarjeta",
  "Datos de tarjeta incorrectos o expirada",
  "Límite de transacción diario alcanzado",
];

function FailureContent() {
  const searchParams = useSearchParams();
  const payment_id = searchParams.get("payment_id") ?? "";

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050810] px-5 py-16"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,45,120,0.06) 0%, #050810 70%)",
      }}
    >
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,45,120,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,120,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-[520px] text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6"
        >
          {/* Animated icon */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="text-[80px] drop-shadow-[0_0_32px_rgba(255,45,120,0.5)]"
          >
            ⚠️
          </motion.div>

          {/* Glow ring */}
          <div className="absolute left-1/2 top-[60px] -translate-x-1/2">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="h-[120px] w-[120px] rounded-full bg-[rgba(255,45,120,0.15)] blur-[24px]"
            />
          </div>

          {/* Title */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="font-display text-[40px] font-black leading-none tracking-tight md:text-[52px]"
              style={{ color: "#ff2d78" }}
            >
              PAGO RECHAZADO
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mt-3 font-ui text-[15px] leading-relaxed text-[#8892aa]"
            >
              No pudimos procesar tu pago.
              <br />
              No se realizó ningún cargo.
            </motion.p>
          </div>

          {/* Details card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="w-full rounded-[8px] border border-[rgba(255,45,120,0.18)] bg-[#0f1423] p-5"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[1.5px] text-[#4a5270]">
                  ID de Intento
                </span>
                <span className="font-mono text-[12px] text-[#e8eaf0]">{payment_id || "—"}</span>
              </div>
              <div className="h-px bg-[rgba(255,45,120,0.08)]" />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[1.5px] text-[#4a5270]">
                  Estado
                </span>
                <div className="flex items-center gap-1.5 rounded-[4px] border border-[rgba(255,45,120,0.3)] bg-[rgba(255,45,120,0.1)] px-2.5 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff2d78]" />
                  <span className="font-mono text-[10px] tracking-[1px] text-[#ff2d78]">
                    RECHAZADO
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reasons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="w-full rounded-[8px] border border-[rgba(255,45,120,0.1)] bg-[#0f1423] p-5 text-left"
          >
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[1.5px] text-[#4a5270]">
              Razones comunes
            </p>
            <ul className="flex flex-col gap-2">
              {COMMON_REASONS.map((reason) => (
                <li key={reason} className="flex items-start gap-2">
                  <span className="mt-[2px] text-[10px] text-[#ff2d78]">▸</span>
                  <span className="font-ui text-[13px] text-[#8892aa]">{reason}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex w-full flex-col gap-3 sm:flex-row"
          >
            <Link href="/payment" className="flex-1">
              <Button variant="magenta" size="lg" fullWidth>
                INTENTAR DE NUEVO
              </Button>
            </Link>
            <Link href="/cart" className="flex-1">
              <Button variant="ghost" size="lg" fullWidth>
                VOLVER AL CARRITO
              </Button>
            </Link>
          </motion.div>

          <p className="font-mono text-[9px] tracking-[0.5px] text-[#4a5270]">
            TRANSACCIÓN PROCESADA MEDIANTE MERCADOPAGO · X-DROPS
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function PaymentFailurePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#050810]">
          <span className="font-mono text-[13px] tracking-[2px] text-[#4a5270]">
            CARGANDO...
          </span>
        </div>
      }
    >
      <FailureContent />
    </Suspense>
  );
}
