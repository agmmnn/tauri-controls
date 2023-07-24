import { resolve } from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import EsLint from "vite-plugin-linter"
import tsConfigPaths from "vite-tsconfig-paths"
const { EsLinter, linterPlugin } = EsLint
import * as packageJson from "./package.json"

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    dts({
      include: ["src/component/"],
    }),
    react(),
    tsConfigPaths(),
  ],
  build: {
    lib: {
      entry: resolve("src", "component/index.ts"),
      name: "ReactViteLibrary",
      formats: ["es", "umd"],
      fileName: (format) => `tauri-controls.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
}))
