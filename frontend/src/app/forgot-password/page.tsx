"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-5">
      {/* Background radials */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[20%] top-[30%] h-[400px] w-[400px] rounded-full bg-[rgba(123,47,255,0.08)] blur-[80px]" />
        <div className="absolute right-[15%] top-[10%] h-[300px] w-[300px] rounded-full bg-[rgba(0,245,255,0.05)] blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[440px] rounded-[12px] border border-[rgba(0,245,255,0.12)] bg-[#0f1423] p-10"
      >
        {/* Logo */}
        <Link href="/login">
          <div className="mb-7 text-center font-display text-[28px] font-black tracking-[3px] text-[#00f5ff] [text-shadow:0_0_20px_#00f5ff]">
            X-DROPS
          </div>
        </Link>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="mb-1 font-display text-[24px] font-bold">Restablecer Acceso</h1>
              <p className="mb-7 font-ui text-[13px] leading-relaxed text-[#8892aa]">
                Ingresa tu correo y te enviaremos un enlace para recuperar tu bóveda digital.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label="Correo Electrónico"
                  type="email"
                  placeholder="operativo@vault.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" size="lg" fullWidth loading={loading} className="mt-1">
                  ENVIAR ENLACE DE RECUPERACIÓN
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-5 py-4 text-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-[56px] drop-shadow-[0_0_20px_rgba(0,245,255,0.4)]"
              >
                📬
              </motion.div>
              <h2 className="font-display text-[22px] font-bold text-[#00f5ff]">
                ¡Enlace Enviado!
              </h2>
              <p className="font-ui text-[13px] leading-relaxed text-[#8892aa]">
                Revisa tu correo{" "}
                <span className="font-bold text-[#e8eaf0]">{email}</span>
                {" "}y sigue las instrucciones para restablecer tu contraseña.
              </p>
              <div className="mt-2 w-full rounded-[6px] border border-[rgba(0,245,255,0.12)] bg-[rgba(0,245,255,0.04)] p-4">
                <p className="font-mono text-[10px] tracking-[1px] text-[#4a5270]">
                  El enlace expira en <span className="text-[#00f5ff]">15 minutos</span>.
                  Si no ves el correo, revisa tu carpeta de spam.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-center gap-4 border-t border-[rgba(0,245,255,0.1)] pt-5">
          <Link
            href="/login"
            className="font-mono text-[11px] tracking-[1px] text-[#4a5270] transition-colors hover:text-[#00f5ff]"
          >
            ← VOLVER AL LOGIN
          </Link>
          <span className="text-[#4a5270]">·</span>
          <Link
            href="/register"
            className="font-mono text-[11px] tracking-[1px] text-[#4a5270] transition-colors hover:text-[#00f5ff]"
          >
            CREAR CUENTA
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
