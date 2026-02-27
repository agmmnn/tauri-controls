import { type as osType } from "@tauri-apps/plugin-os"
import type { Platform } from "./types"

export function detectPlatform(): Platform {
  if (typeof window === "undefined") return "windows"

  try {
    const os = osType()
    if (os === "macos") return "macos"
    if (os === "linux") return "gnome"
    return "windows"
  } catch {
    return "windows"
  }
}

export function getControlsOrder(platform: Platform): "left" | "right" {
  return platform === "macos" ? "left" : "right"
}

export function getControlsJustify(
  platform: Platform,
  justify: boolean
): string {
  if (!justify) return ""
  return platform === "macos" ? "ml-0" : "ml-auto"
}
