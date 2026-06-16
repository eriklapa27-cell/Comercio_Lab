"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-5">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[15%] top-[20%] h-[500px] w-[500px] rounded-full bg-[rgba(123,47,255,0.07)] blur-[100px]" />
        <div className="absolute right-[10%] bottom-[20%] h-[350px] w-[350px] rounded-full bg-[rgba(0,245,255,0.05)] blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[480px] rounded-[12px] border border-[rgba(0,245,255,0.12)] bg-[#0f1423] p-10"
      >
        <div className="mb-7 text-center font-display text-[28px] font-black tracking-[3px] text-[#00f5ff] [text-shadow:0_0_20px_#00f5ff]">
          X-DROPS
        </div>

        <h1 className="mb-1 font-display text-[26px] font-bold">Crear Cuenta</h1>
        <p className="mb-7 font-ui text-[13px] text-[#8892aa]">
          Únete a la élite digital y accede a drops exclusivos.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Nombre" placeholder="Neo" required />
            <Input label="Apellido" placeholder="Anderson" required />
          </div>
          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="operativo@vault.com"
            required
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="Mínimo 8 caracteres"
            required
          />
          <Input
            label="Confirmar Contraseña"
            type="password"
            placeholder="Repite tu contraseña"
            required
          />

          <label className="flex cursor-pointer items-center gap-2.5 font-ui text-[13px] text-[#8892aa]">
            <input type="checkbox" required className="accent-[#00f5ff]" />
            Acepto los{" "}
            <Link href="#" className="text-[#00f5ff] hover:underline">
              Términos de Servicio
            </Link>{" "}
            y{" "}
            <Link href="#" className="text-[#00f5ff] hover:underline">
              Privacidad
            </Link>
          </label>

          <Button type="submit" size="lg" fullWidth loading={loading} className="mt-1">
            INICIALIZAR PROTOCOLO
          </Button>
        </form>

        <p className="mt-5 text-center font-ui text-[13px] text-[#8892aa]">
          ¿Ya eres operativo?{" "}
          <Link href="/login" className="font-bold text-[#00f5ff] hover:underline">
            Iniciar Sesión
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
