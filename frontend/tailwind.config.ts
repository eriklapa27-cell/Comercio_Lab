import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-void": "#050810",
        "bg-deep": "#0a0d1a",
        "bg-panel": "#0f1423",
        "bg-card": "#141928",
        "bg-hover": "#1a2035",
        cyan: {
          DEFAULT: "#00f5ff",
          dim: "#00c4cc",
        },
        magenta: {
          DEFAULT: "#ff2d78",
        },
        purple: {
          DEFAULT: "#7b2fff",
        },
        gold: {
          DEFAULT: "#f0c040",
        },
        legendary: "#f0c040",
        epic: "#a855f7",
        rare: "#3b82f6",
        common: "#6b7280",
      },
      fontFamily: {
        display: ["'Exo 2'", "sans-serif"],
        ui: ["Rajdhani", "sans-serif"],
        mono: ["'Share Tech Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,245,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.015) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      animation: {
        "pulse-cyan": "pulse-cyan 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        fadeinup: "fadeInUp 0.5s ease forwards",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        "pulse-cyan": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,245,255,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0,245,255,0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      boxShadow: {
        cyan: "0 0 20px rgba(0,245,255,0.4)",
        "cyan-lg": "0 0 40px rgba(0,245,255,0.6)",
        magenta: "0 0 20px rgba(255,45,120,0.4)",
        card: "0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(0,245,255,0.08)",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;
