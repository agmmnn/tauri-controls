import { type, type OsType } from "@tauri-apps/plugin-os"

// A helper function to get the OS type
export function getOsType(): OsType {
  return type()
}

export function getPlatform() {
  switch (getOsType()) {
    case "macos":
      return "macos"
    case "linux":
      return "gnome"
    default:
      return "windows"
  }
}
