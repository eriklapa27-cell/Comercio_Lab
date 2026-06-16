"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-5">
      {/* Background radials */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[20%] top-[30%] h-[400px] w-[400px] rounded-full bg-[rgba(123,47,255,0.08)] blur-[80px]" />
        <div className="absolute right-[15%] top-[10%] h-[300px] w-[300px] rounded-full bg-[rgba(0,245,255,0.06)] blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[440px] rounded-[12px] border border-[rgba(0,245,255,0.12)] bg-[#0f1423] p-10"
      >
        {/* Logo */}
        <div className="mb-7 text-center font-display text-[28px] font-black tracking-[3px] text-[#00f5ff] [text-shadow:0_0_20px_#00f5ff]">
          X-DROPS
        </div>

        <h1 className="mb-1 font-display text-[26px] font-bold">Acceso / Login</h1>
        <p className="mb-7 font-ui text-[13px] text-[#8892aa]">
          Entra en la bóveda digital para reclamar tus drops exclusivos.
        </p>

        {/* OAuth */}
        <div className="flex flex-col gap-2.5">
          <button className="flex w-full items-center justify-center gap-2.5 rounded-[4px] border border-[rgba(0,245,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 font-ui text-[13px] font-semibold text-[#e8eaf0] transition-all hover:border-[rgba(0,245,255,0.35)] hover:bg-[#1a2035]">
            <GoogleIcon />
            Continuar con Google
          </button>
          <button className="flex w-full items-center justify-center gap-2.5 rounded-[4px] border border-[rgba(0,245,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 font-ui text-[13px] font-semibold text-[#e8eaf0] transition-all hover:border-[rgba(0,245,255,0.35)] hover:bg-[#1a2035]">
            <AppleIcon />
            Continuar con Apple
          </button>
        </div>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3 text-[#4a5270]">
          <div className="h-px flex-1 bg-[rgba(0,245,255,0.12)]" />
          <span className="font-mono text-[12px]">O</span>
          <div className="h-px flex-1 bg-[rgba(0,245,255,0.12)]" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="nombre@vault.com"
            required
          />
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[1.5px] text-[#8892aa]">
                Contraseña
              </span>
              <button
                type="button"
                className="font-mono text-[11px] uppercase tracking-[1px] text-[#00f5ff] transition-opacity hover:opacity-70"
              >
                ¿Olvidaste?
              </button>
            </div>
            <Input type="password" placeholder="••••••••" required />
          </div>

          <Link href="/boxes">
            <Button
              type="submit"
              size="lg"
              fullWidth
              loading={loading}
              className="mt-1"
            >
              INICIALIZAR SESIÓN
            </Button>
          </Link>
        </form>

        <p className="mt-5 text-center font-ui text-[13px] text-[#8892aa]">
          ¿Nuevo operativo?{" "}
          <Link
            href="/register"
            className="font-bold text-[#00f5ff] hover:underline"
          >
            Crear Cuenta
          </Link>
        </p>

        <div className="mt-5 flex justify-center gap-5 border-t border-[rgba(0,245,255,0.1)] pt-4">
          {["PRIVACIDAD", "TÉRMINOS"].map((t) => (
            <Link
              key={t}
              href="#"
              className="font-mono text-[10px] tracking-[1px] text-[#4a5270] hover:text-[#8892aa]"
            >
              {t}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#e8eaf0">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}
