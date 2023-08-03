import { resolve } from "node:path"
import terser from "@rollup/plugin-terser"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import EsLint from "vite-plugin-linter"
import tsConfigPaths from "vite-tsconfig-paths"
import * as packageJson from "./package.json"

const { EsLinter, linterPlugin } = EsLint

export default defineConfig((configEnv) => ({
  plugins: [
    dts({
      include: ["./src/tauri-controls"],
      rollupTypes: true,
    }),
    react(),
    tsConfigPaths(),
    // linterPlugin({
    //   include: ["./src/tauri-controls/**/*.{ts,tsx}"],
    //   linters: [new EsLinter({ configEnv })],
    // }),
  ],
  build: {
    lib: {
      entry: resolve("src", "tauri-controls/index.ts"),
      name: "TauriControls",
      formats: ["es"], //"umd"
      fileName: () => `tauri-controls.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      plugins: [terser()],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@tauri-apps/plugin-os": "pluginOs",
          clsx: "clsx",
          "tailwind-merge": "tailwindMerge",
          "@tauri-apps/plugin-window": "pluginWindow",
        },
        intro: 'import "./style.css";',
        plugins: [terser()],
      },
    },
  },

  clearScreen: false,
  server: {
    port: 1421,
    strictPort: true,
  },
  envPrefix: ["VITE_", "TAURI_"],
}))
