import type { Config } from 'tailwindcss'

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  mode: "jit",
  plugins: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
} satisfies Config

