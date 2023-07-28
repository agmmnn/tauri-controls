import { resolve } from "node:path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import EsLint from "vite-plugin-linter"
import tsConfigPaths from "vite-tsconfig-paths"
import * as packageJson from "./package.json"

const { EsLinter, linterPlugin } = EsLint

// import typescript from "@rollup/plugin-typescript"

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    dts({
      include: ["src/tauri-controls/"],
      rollupTypes: true,
      insertTypesEntry: true,
    }),
    react(),
    tsConfigPaths(),
    linterPlugin({
      include: ["./src}/**/*.{ts,tsx}"],
      linters: [new EsLinter({ configEnv })],
    }),
  ],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
  },
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    lib: {
      entry: resolve("src", "tauri-controls/index.ts"),
      name: "TauriControls",
      formats: ["es", "umd"],
      fileName: (format) => `tauri-controls.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      // plugins: [typescript({ tsconfig: "./tsconfig.json" })],
    },
  },
}))
