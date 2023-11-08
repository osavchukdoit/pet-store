/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    // https://github.com/vitest-dev/vitest/issues/821
    setupFiles: [resolve(__dirname, "test/setup/setup.ts")],
  },
  server: {
    port: 9000,
  },
});
