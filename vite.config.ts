import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@app": path.resolve(__dirname, "src/app"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@src": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 8000,
  },
});
