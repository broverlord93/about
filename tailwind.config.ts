import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["selector"],
  mode: "jit",
  plugins: [require("tailwindcss-animate")],
  theme: {
    colors: {
      avocado: {
        "50": "#f6f6ef",
        "100": "#eaebdc",
        "200": "#d7d9bd",
        "300": "#bdc096",
        "400": "#a3a873",
        "500": "#90975d",
        "600": "#686e42",
        "700": "#515635",
        "800": "#42462e",
        "900": "#393d2a",
        "950": "#1e2013",
      },
      "breaker-bay": {
        "50": "#effefd",
        "100": "#c7fffb",
        "200": "#90fff6",
        "300": "#51f7f1",
        "400": "#1de4e3",
        "500": "#04c7c8",
        "600": "#00a0a5",
        "700": "#057b80",
        "800": "#0a6065",
        "900": "#0d5154",
        "950": "#002e33",
      },
      current: "currentColor",
      "dark-tan": {
        "50": "#fff1f1",
        "100": "#ffe0e0",
        "200": "#ffc6c6",
        "300": "#ff9e9e",
        "400": "#ff6767",
        "500": "#fc3737",
        "600": "#ea1818",
        "700": "#c51010",
        "800": "#a31111",
        "900": "#6a1111",
        "950": "#490606",
      },
      "granite-green": {
        "50": "#f5f4f1",
        "100": "#e5e4dc",
        "200": "#cdcbbb",
        "300": "#b0ad94",
        "400": "#999376",
        "500": "#91896c",
        "600": "#776d57",
        "700": "#605748",
        "800": "#534b40",
        "900": "#49413a",
        "950": "#29231f",
      },
      "harvest-gold": {
        "50": "#fcf8f0",
        "100": "#f9eedb",
        "200": "#f2dab6",
        "300": "#e6b775",
        "400": "#e09f57",
        "500": "#d88537",
        "600": "#ca6e2c",
        "700": "#a85626",
        "800": "#874525",
        "900": "#6d3a21",
        "950": "#3a1c10",
      },
      "lemon-chiffon": {
        "50": "#fefcec",
        "100": "#fcf8cf",
        "200": "#f8ef8f",
        "300": "#f5e154",
        "400": "#f2d12d",
        "500": "#ebb315",
        "600": "#d08b0f",
        "700": "#ad6510",
        "800": "#8c4e14",
        "900": "#744113",
        "950": "#422206",
      },
      millbrook: {
        "50": "#f8f6ee",
        "100": "#eeead3",
        "200": "#ded4aa",
        "300": "#cbb879",
        "400": "#bb9e54",
        "500": "#ac8b46",
        "600": "#94703a",
        "700": "#775531",
        "800": "#64472f",
        "900": "#513929",
        "950": "#322016",
      },
      "silver-tree": {
        "50": "#effaf5",
        "100": "#d7f4e4",
        "200": "#b3e7cd",
        "300": "#81d4b0",
        "400": "#61c29b",
        "500": "#2a9f74",
        "600": "#1c7f5c",
        "700": "#16664c",
        "800": "#14513e",
        "900": "#114334",
        "950": "#09251e",
      },
      transparent: "transparent",
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
} satisfies Config;
