import type { Metadata } from "next";
import { Exo_2, Rajdhani, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { CartProvider } from "@/context/CartContext";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-exo2",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "X-DROPS — Alquimia Digital Desatada",
    template: "%s | X-DROPS",
  },
  description:
    "Desbloquea cajas misteriosas de edición limitada. Hardware, arte digital y artefactos de rareza extrema.",
  keywords: ["mystery boxes", "drops", "coleccionables", "peru", "x-drops"],
  openGraph: {
    title: "X-DROPS — Alquimia Digital Desatada",
    description: "Desbloquea cajas misteriosas de edición limitada.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${exo2.variable} ${rajdhani.variable} ${shareTechMono.variable}`}
    >
      <body>
        <CartProvider>
          <ToastProvider>{children}</ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
