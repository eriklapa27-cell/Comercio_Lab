"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

function PendingContent() {
  const searchParams = useSearchParams();
  const payment_id = searchParams.get("payment_id") ?? "";

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050810] px-5 py-16"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(240,192,64,0.05) 0%, #050810 70%)",
      }}
    >
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(240,192,64,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(240,192,64,0.4) 1px, transparent 1px)",
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
          {/* Animated icon — slow spin */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="text-[80px] drop-shadow-[0_0_32px_rgba(240,192,64,0.4)]"
          >
            ⏳
          </motion.div>

          {/* Glow ring */}
          <div className="absolute left-1/2 top-[60px] -translate-x-1/2">
            <motion.div
              animate={{ scale: [1, 1.18, 1], opacity: [0.2, 0.45, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="h-[120px] w-[120px] rounded-full bg-[rgba(240,192,64,0.12)] blur-[22px]"
            />
          </div>

          {/* Title */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="font-display text-[40px] font-black leading-none tracking-tight md:text-[52px]"
              style={{ color: "#f0c040" }}
            >
              PAGO EN PROCESO
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mt-3 font-ui text-[15px] leading-relaxed text-[#8892aa]"
            >
              Tu pago está siendo procesado.
              <br />
              Te notificaremos cuando se confirme.
            </motion.p>
          </div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.35 }}
            className="flex items-center gap-2 rounded-full border border-[rgba(240,192,64,0.3)] bg-[rgba(240,192,64,0.08)] px-4 py-2"
          >
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-[#f0c040]"
            />
            <span className="font-mono text-[11px] tracking-[2px] text-[#f0c040]">
              PENDIENTE
            </span>
          </motion.div>

          {/* Details card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.4 }}
            className="w-full rounded-[8px] border border-[rgba(240,192,64,0.15)] bg-[#0f1423] p-5"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[1.5px] text-[#4a5270]">
                  ID de Pago
                </span>
                <span className="font-mono text-[12px] text-[#e8eaf0]">{payment_id || "—"}</span>
              </div>
              <div className="h-px bg-[rgba(240,192,64,0.08)]" />
              <div className="flex items-start gap-2 rounded-[4px] bg-[rgba(240,192,64,0.05)] p-3">
                <span className="mt-[1px] text-[14px]">ℹ️</span>
                <p className="font-ui text-[13px] leading-relaxed text-[#8892aa]">
                  Esto puede tardar unos minutos. No cierres esta ventana hasta
                  recibir confirmación.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Progress bar animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="w-full"
          >
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-[rgba(240,192,64,0.1)]">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-[#f0c040] to-transparent"
              />
            </div>
            <p className="mt-2 text-center font-mono text-[9px] tracking-[1px] text-[#4a5270]">
              PROCESANDO TRANSACCIÓN...
            </p>
          </motion.div>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="w-full"
          >
            <Link href="/dashboard">
              <Button variant="outline" size="lg" fullWidth>
                IR AL DASHBOARD
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

export default function PaymentPendingPage() {
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
      <PendingContent />
    </Suspense>
  );
}
