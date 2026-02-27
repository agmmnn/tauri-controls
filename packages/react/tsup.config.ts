import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  treeshake: true,
  minify: true,
  external: ["react", "react-dom", "@tauri-apps/api", "@tauri-apps/plugin-os"],
  esbuildOptions(options) {
    options.jsx = "automatic"
  },
})
