import rootConfig from "../eslint.config.js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tanstackRouter from "@tanstack/eslint-plugin-router";
import globals from "globals";

/**
 * Frontend-specific ESLint configuration
 * Extends the root config with React/frontend-specific rules
 */
export default [
  ...rootConfig,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@tanstack/router": tanstackRouter,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...tanstackRouter.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];

