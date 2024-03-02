import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import sassDts from "vite-plugin-sass-dts";
import * as paths from "./paths.json";

const computedPaths: object = () => {
  const computed: { [index: string]: string } = {};
  for (const key in paths) {
    const alias = `@${key}`;
    computed[alias] = path.resolve(__dirname, paths[key]);
  }
  return computed;
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sassDts({
      enabledMode: ["development", "production"],
      global: {
        generate: true,
        outputFilePath: path.resolve(__dirname, "./src/@types/style.d.ts"),
      },
    }),
  ],
  resolve: {
    alias: {
      ...computedPaths,
    },
  },
  server: {
    port: 8000,
  },
});
