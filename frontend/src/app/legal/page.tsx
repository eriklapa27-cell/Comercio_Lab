"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const SECTIONS = [
  {
    id: "tos",
    label: "Términos de Servicio",
    content: [
      {
        title: "1. Aceptación de Términos",
        body: "Al acceder y utilizar la plataforma X-DROPS, aceptas quedar vinculado por estos Términos de Servicio. Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder al servicio. Estos términos se aplican a todos los visitantes, usuarios y cualquier persona que acceda o use el servicio.",
      },
      {
        title: "2. Descripción del Servicio",
        body: "X-DROPS es una plataforma de comercio electrónico especializada en cajas misteriosas de edición limitada que contienen productos físicos y digitales. Los ítems se asignan aleatoriamente según las probabilidades publicadas para cada caja, verificadas mediante contratos inteligentes en blockchain.",
      },
      {
        title: "3. Elegibilidad",
        body: "Para usar X-DROPS debes tener al menos 18 años de edad o la mayoría de edad en tu jurisdicción. Al registrarte, declaras que cumples este requisito. Las cuentas de menores de edad serán suspendidas.",
      },
      {
        title: "4. Compras y Pagos",
        body: "Todos los precios están expresados en Soles Peruanos (S/). Los pagos se procesan mediante MercadoPago con certificación PCI-DSS Nivel 1. Las transacciones son definitivas; no se realizan cargos adicionales ocultos. El IGV está incluido en el precio mostrado.",
      },
      {
        title: "5. Política de Devoluciones",
        body: "Los productos físicos pueden devolverse dentro de los 7 días calendario de recibidos, en su estado original sin uso. Los ítems digitales, una vez desbloqueados y revelados, no son reembolsables. Para iniciar una devolución, contacta a soporte@xdrops.pe con tu número de pedido.",
      },
      {
        title: "6. Conducta del Usuario",
        body: "Te comprometes a no usar la plataforma para actividades ilegales, intentar manipular los sistemas de rareza o sorteo, crear múltiples cuentas para obtener ventajas, o revender ítems a precios abusivos en nuestro mercado secundario.",
      },
      {
        title: "7. Modificaciones",
        body: "X-DROPS se reserva el derecho de modificar estos términos en cualquier momento. Los cambios entran en vigencia al ser publicados. El uso continuado de la plataforma constituye aceptación de los nuevos términos.",
      },
    ],
  },
  {
    id: "refunds",
    label: "Política de Reembolsos",
    content: [
      {
        title: "Ítems Físicos",
        body: "Aceptamos devoluciones de productos físicos dentro de los 7 días de recibidos. El ítem debe estar en su estado original, sin abrir ni usar. El costo de envío de la devolución es asumido por el comprador, salvo que el producto sea defectuoso.",
      },
      {
        title: "Ítems Digitales",
        body: "Los ítems digitales no son elegibles para reembolso una vez que han sido desbloqueados y revelados. Esto incluye NFTs, llaves digitales, accesos exclusivos y contenido descargable.",
      },
      {
        title: "Cajas No Abiertas",
        body: "Si aún no has abierto tu caja (el ítem sigue en estado 'Sellado' en tu bóveda), puedes solicitar un reembolso dentro de las 48 horas de la compra.",
      },
      {
        title: "Proceso de Reembolso",
        body: "El reembolso se procesa al mismo método de pago original dentro de 5–10 días hábiles. Contacta a soporte@xdrops.pe indicando tu número de pedido y motivo de devolución.",
      },
    ],
  },
];

export default function LegalPage() {
  const [activeSection, setActiveSection] = useState(0);
  const active = SECTIONS[activeSection];

  return (
    <div className="page-container">
      <Navbar />

      <div className="border-b border-[rgba(0,245,255,0.08)] bg-[#0a0d1a] px-5 py-10 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-[1200px]"
        >
          <span className="mb-3 inline-block font-mono text-[11px] tracking-[2px] text-[#4a5270]">
            ◈ DOCUMENTOS LEGALES
          </span>
          <h1 className="font-display text-[40px] font-black">Legal</h1>
          <p className="mt-2 font-ui text-[13px] text-[#8892aa]">
            Última actualización: 17 de junio de 2026
          </p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          {/* Sidebar */}
          <nav className="flex flex-row gap-2 lg:flex-col">
            {SECTIONS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(i)}
                className={`rounded-[6px] px-4 py-2.5 text-left font-ui text-[13px] font-semibold transition-all ${
                  activeSection === i
                    ? "border border-[rgba(0,245,255,0.15)] bg-[rgba(0,245,255,0.08)] text-[#00f5ff]"
                    : "text-[#8892aa] hover:bg-[#141928] hover:text-[#e8eaf0]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="mb-6 font-display text-[28px] font-bold">{active.label}</h2>
            <div className="space-y-6">
              {active.content.map((c) => (
                <div key={c.title} className="rounded-[8px] border border-[rgba(0,245,255,0.08)] bg-[#141928] p-6">
                  <h3 className="mb-3 font-display text-[16px] font-bold text-[#00f5ff]">{c.title}</h3>
                  <p className="font-ui text-[14px] leading-[1.7] text-[#8892aa]">{c.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[8px] border border-[rgba(0,245,255,0.1)] bg-[#0f1423] p-5">
              <p className="font-mono text-[11px] leading-relaxed text-[#4a5270]">
                ¿Tienes preguntas sobre estos términos?{" "}
                <a href="/soporte" className="text-[#00f5ff] hover:underline">
                  Contacta a nuestro equipo legal
                </a>
                {" "}o escríbenos a{" "}
                <span className="text-[#8892aa]">legal@xdrops.pe</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
