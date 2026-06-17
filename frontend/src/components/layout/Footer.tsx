import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(0,245,255,0.12)] bg-[#0f1423] px-5 py-6 md:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="font-display text-lg font-black tracking-[3px] text-[#00f5ff]">
          X-DROPS
        </span>

        <div className="flex flex-wrap justify-center gap-5">
          {[
            { label: "Comunidad", href: "/comunidad" },
            { label: "Soporte", href: "/soporte" },
            { label: "Legal", href: "/legal" },
            { label: "Privacidad", href: "/privacidad" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-ui text-[13px] text-[#4a5270] transition-colors hover:text-[#e8eaf0]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <p className="font-mono text-[10px] tracking-[0.5px] text-[#4a5270] sm:text-right">
          © 2024 X-DROPS. ALQUIMIA DIGITAL DESATADA.
          <br className="hidden sm:block" />
          TODOS LOS DERECHOS RESERVADOS.
        </p>
      </div>
    </footer>
  );
}
