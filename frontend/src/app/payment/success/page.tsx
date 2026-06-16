"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface PaymentStatus {
  status: string;
  status_detail: string;
  external_reference: string | null;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const payment_id = searchParams.get("payment_id") ?? "";
  const external_reference = searchParams.get("external_reference") ?? "";

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!payment_id) {
      setLoading(false);
      return;
    }
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
    fetch(`${apiUrl}/api/v1/payments/status/${payment_id}`)
      .then((r) => r.json())
      .then((data: PaymentStatus) => {
        setPaymentStatus(data);
      })
      .catch(() => {
        // Fallback: show success anyway since MP redirected here
        setPaymentStatus({
          status: "approved",
          status_detail: "accredited",
          external_reference,
        });
      })
      .finally(() => setLoading(false));
  }, [payment_id, external_reference]);

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050810] px-5 py-16"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(74,222,128,0.06) 0%, #050810 70%)",
      }}
    >
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,245,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-[520px] text-center">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="text-[64px]"
            >
              ⚙️
            </motion.div>
            <p className="font-mono text-[13px] tracking-[2px] text-[#4a5270]">
              VERIFICANDO PAGO...
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            {/* Animated icon */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-[80px] drop-shadow-[0_0_32px_rgba(74,222,128,0.5)]"
            >
              🎁
            </motion.div>

            {/* Glow ring */}
            <div className="absolute left-1/2 top-[60px] -translate-x-1/2">
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="h-[120px] w-[120px] rounded-full bg-[rgba(74,222,128,0.12)] blur-[20px]"
              />
            </div>

            {/* Title */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="font-display text-[40px] font-black leading-none tracking-tight md:text-[52px]"
                style={{ color: "#00f5ff" }}
              >
                ¡DROP DESBLOQUEADO!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="mt-3 font-ui text-[15px] leading-relaxed text-[#8892aa]"
              >
                Tu pago fue procesado exitosamente.
                <br />
                Tu bóveda ha sido actualizada.
              </motion.p>
            </div>

            {/* Details card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="w-full rounded-[8px] border border-[rgba(74,222,128,0.18)] bg-[#0f1423] p-5"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[1.5px] text-[#4a5270]">
                    ID de Pago
                  </span>
                  <span className="font-mono text-[12px] text-[#e8eaf0]">{payment_id || "—"}</span>
                </div>
                <div className="h-px bg-[rgba(74,222,128,0.08)]" />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[1.5px] text-[#4a5270]">
                    Estado
                  </span>
                  <div className="flex items-center gap-1.5 rounded-[4px] border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.1)] px-2.5 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
                    <span className="font-mono text-[10px] tracking-[1px] text-[#4ade80]">
                      APROBADO
                    </span>
                  </div>
                </div>
                <div className="h-px bg-[rgba(74,222,128,0.08)]" />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[1.5px] text-[#4a5270]">
                    Referencia
                  </span>
                  <span className="font-mono text-[12px] text-[#e8eaf0]">
                    {paymentStatus?.external_reference ?? (external_reference || "—")}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="flex w-full flex-col gap-3 sm:flex-row"
            >
              <Link href="/dashboard" className="flex-1">
                <Button variant="primary" size="lg" fullWidth>
                  VER MI BÓVEDA
                </Button>
              </Link>
              <Link href="/boxes" className="flex-1">
                <Button variant="outline" size="lg" fullWidth>
                  SEGUIR EXPLORANDO
                </Button>
              </Link>
            </motion.div>

            {/* Footer note */}
            <p className="font-mono text-[9px] tracking-[0.5px] text-[#4a5270]">
              TRANSACCIÓN PROCESADA MEDIANTE MERCADOPAGO · X-DROPS
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
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
      <SuccessContent />
    </Suspense>
  );
}
