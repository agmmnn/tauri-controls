import { resolve } from "node:path"
import terser from "@rollup/plugin-terser"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import * as packageJson from "./package.json"

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    vue(),
    dts({
      include: ["./src/tauri-controls"],
      rollupTypes: true,
    }),
  ],

  build: {
    lib: {
      entry: resolve("src", "tauri-controls/index.ts"),
      name: "TauriControls",
      formats: ["es"], // "umd"
      fileName: () => `tauri-controls.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      plugins: [terser()],
      output: {
        globals: {
          vue: "Vue",
          "@tauri-apps/plugin-os": "pluginOs",
          "tailwind-merge": "tailwindMerge",
          "@tauri-apps/plugin-window": "pluginWindow",
        },
        intro: 'import "./style.css";',
        plugins: [terser()],
      },
    },
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1412,
    strictPort: true,
  },
  // 3. to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
}))
