// import resolve from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"
import { sveltekit } from "@sveltejs/kit/vite"
// import svelte from "rollup-plugin-svelte"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [sveltekit(), terser()],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"]
  },
  build: {
    rollupOptions: {
      plugins: [
        // svelte({}),
        // resolve({ browser: true }),
        terser()
      ]
    }
  },

  clearScreen: false,
  server: {
    port: 1429,
    strictPort: true
  },
  envPrefix: ["VITE_", "TAURI_"]
})
