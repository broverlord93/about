import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@layout": path.resolve(__dirname, "src/layout"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@src": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 8000,
  },
});
