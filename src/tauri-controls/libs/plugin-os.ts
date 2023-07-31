import type { OsType } from "@tauri-apps/plugin-os"

export let osType: OsType

if (typeof window !== "undefined") {
  import("@tauri-apps/plugin-os").then((module) => {
    module.type().then((x) => (osType = x))
  })
}
