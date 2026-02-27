import { defineConfig } from "tsup"
import * as preset from "tsup-preset-solid"

const presetOptions: preset.PresetOptions = {
  entries: {
    entry: "src/index.tsx",
    dev_entry: true,
  },
  drop_console: true,
  cjs: false,
}

export default defineConfig((config) => {
  const watching = !!config.watch
  const parsedOptions = preset.parsePresetOptions(presetOptions, watching)

  if (!watching) {
    const packageFields = preset.generatePackageExports(parsedOptions)
    preset.writePackageJson(packageFields)
  }

  return preset.generateTsupOptions(parsedOptions)
})
