"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const ARTICLES = [
  {
    icon: "🗂",
    title: "Datos que Recopilamos",
    body: "Recopilamos los datos que nos proporcionas al registrarte (nombre, correo electrónico, contraseña cifrada), los datos de transacciones (ítems comprados, montos, fechas), tu dirección de envío para órdenes físicas, y datos técnicos como dirección IP, tipo de navegador y páginas visitadas para mejorar la plataforma.",
  },
  {
    icon: "🎯",
    title: "Uso de tus Datos",
    body: "Utilizamos tu información exclusivamente para: procesar y gestionar tus pedidos, personalizar tu experiencia y recomendaciones de drops, enviarte notificaciones sobre el estado de tus envíos y nuevos drops (si lo autorizas), y para detectar y prevenir fraudes en la plataforma.",
  },
  {
    icon: "🔐",
    title: "Seguridad de los Datos",
    body: "Todos los datos se almacenan cifrados con AES-256. Las contraseñas nunca se almacenan en texto plano (usamos bcrypt con salt). Las comunicaciones están protegidas con TLS 1.3. Realizamos auditorías de seguridad trimestrales y seguimos los estándares ISO 27001.",
  },
  {
    icon: "🤝",
    title: "Compartir con Terceros",
    body: "Compartimos datos únicamente con: MercadoPago (procesador de pagos, certificado PCI-DSS), empresas de logística para ejecutar envíos físicos, y proveedores de servicios técnicos bajo acuerdos de confidencialidad. Nunca vendemos tus datos a terceros.",
  },
  {
    icon: "🍪",
    title: "Cookies y Tecnologías de Seguimiento",
    body: "Usamos cookies esenciales para el funcionamiento de la sesión y cookies analíticas (opt-in) para entender el comportamiento de los usuarios. Puedes gestionar tus preferencias de cookies en cualquier momento desde la Configuración de tu cuenta.",
  },
  {
    icon: "✅",
    title: "Tus Derechos (RGPD / LPDP)",
    body: "Tienes derecho a: acceder a tus datos personales, corregir datos incorrectos, solicitar la eliminación de tu cuenta y datos asociados, portabilidad de datos en formato JSON, y oponerte al uso de tus datos para marketing. Ejercita estos derechos escribiendo a privacidad@xdrops.pe.",
  },
  {
    icon: "🧒",
    title: "Menores de Edad",
    body: "X-DROPS no está dirigida a personas menores de 18 años. No recopilamos conscientemente datos de menores. Si detectamos que un usuario es menor, su cuenta será suspendida y los datos eliminados. Los padres pueden reportar cuentas de menores a privacidad@xdrops.pe.",
  },
  {
    icon: "🔄",
    title: "Cambios a esta Política",
    body: "Podemos actualizar esta política para reflejar cambios en nuestras prácticas o por requisitos legales. Te notificaremos por correo electrónico y mediante un aviso en la plataforma al menos 15 días antes de que los cambios entren en vigencia.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemAnim = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function PrivacidadPage() {
  return (
    <div className="page-container">
      <Navbar />

      <div className="border-b border-[rgba(0,245,255,0.08)] bg-[#0a0d1a] px-5 py-10 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-[900px]"
        >
          <span className="mb-3 inline-block font-mono text-[11px] tracking-[2px] text-[#4a5270]">
            ◈ POLÍTICA DE PRIVACIDAD
          </span>
          <h1 className="font-display text-[40px] font-black">
            Privacidad y{" "}
            <span className="text-[#00f5ff]">Protección de Datos</span>
          </h1>
          <p className="mt-3 font-ui text-[14px] leading-relaxed text-[#8892aa]">
            En X-DROPS tomamos muy en serio la protección de tu información personal.
            Esta política explica qué datos recopilamos, cómo los usamos y cómo los protegemos.
          </p>
          <p className="mt-2 font-mono text-[11px] text-[#4a5270]">
            Última actualización: 17 de junio de 2026
          </p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-[900px] px-5 py-12 md:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-5 sm:grid-cols-2"
        >
          {ARTICLES.map((a) => (
            <motion.div
              key={a.title}
              variants={itemAnim}
              className="rounded-[8px] border border-[rgba(0,245,255,0.1)] bg-[#141928] p-5"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="text-[22px]">{a.icon}</span>
                <h2 className="font-display text-[15px] font-bold text-[#00f5ff]">{a.title}</h2>
              </div>
              <p className="font-ui text-[13px] leading-[1.7] text-[#8892aa]">{a.body}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-8 rounded-[8px] border border-[rgba(0,245,255,0.12)] bg-[rgba(0,245,255,0.03)] p-6"
        >
          <h3 className="mb-2 font-display text-[16px] font-bold">Contacto de Privacidad</h3>
          <p className="font-ui text-[13px] leading-relaxed text-[#8892aa]">
            Para cualquier consulta relacionada con la privacidad de tus datos, el Delegado de Protección de Datos de X-DROPS está disponible en{" "}
            <span className="font-bold text-[#00f5ff]">privacidad@xdrops.pe</span>
            {" "}o mediante el formulario de soporte. Respondemos todas las solicitudes en un plazo máximo de 30 días.
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
