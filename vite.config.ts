import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@src": path.resolve(__dirname, "src"),
      "@types": path.resolve(__dirname, "src/types"),
    },
  },
  server: {
    port: 8000,
  },
});
