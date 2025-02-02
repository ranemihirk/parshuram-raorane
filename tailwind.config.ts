import type { Config } from "tailwindcss";
import colors from 'tailwindcss/colors';

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem", // Default padding
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        red: colors.red[600],
        green: colors.emerald[900],
        light: colors.neutral[50],
				dark: colors.zinc[900],
        gray: colors.gray[400],
        main: "#FCF6F4",
      },
    },
  },
  plugins: [],
  important: true,
} satisfies Config;
