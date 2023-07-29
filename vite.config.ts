import { resolve } from "node:path"
import terser from "@rollup/plugin-terser"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import EsLint from "vite-plugin-linter"
import tsConfigPaths from "vite-tsconfig-paths"
import * as packageJson from "./package.json"

const { EsLinter, linterPlugin } = EsLint

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    dts({
      include: ["src/tauri-controls/"],
      rollupTypes: true,
    }),
    react(),
    tsConfigPaths(),
    linterPlugin({
      include: ["./src/tauri-controls/**/*.{ts,tsx}"],
      linters: [new EsLinter({ configEnv })],
    }),
  ],
  build: {
    lib: {
      entry: resolve("src", "tauri-controls/index.ts"),
      name: "TauriControls",
      formats: ["es", "umd"],
      fileName: (format) => `tauri-controls.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      plugins: [terser()],
    },
  },

  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
  },
  envPrefix: ["VITE_", "TAURI_"],
}))
