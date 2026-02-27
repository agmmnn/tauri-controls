import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  treeshake: true,
  minify: true,
  external: ["@tauri-apps/api", "@tauri-apps/plugin-os"],
})
