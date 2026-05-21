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
        primary: {
          DEFAULT: "#7C3AED",
          50: "#F5F3FF",
          100: "#EDE9FE",
          500: "#7C3AED",
          600: "#6D28D9",
          700: "#5B21B6",
        },
        secondary: {
          DEFAULT: "#EC4899",
          500: "#EC4899",
          600: "#DB2777",
        },
        accent: {
          DEFAULT: "#F59E0B",
          500: "#F59E0B",
        },
        muted: {
          DEFAULT: "#6B7280",
          100: "#F3F4F6",
        },
        background: "#0F0F0F",
      },
    },
  },
  plugins: [],
};
export default config;
