import React, { useEffect, useState } from "react"
import { type } from "@tauri-apps/plugin-os"
import { appWindow } from "@tauri-apps/plugin-window"
import { cn } from "../lib/utils"
import { MacOS, Gnome, Windows } from "./controls"

export interface IWindowControls {
  platform?: "windows" | "macos" | "gnome"
  className?: string
}

export const WindowControls = ({ platform, className, ...props }: IWindowControls) => {
  const [osType, setOsType] = useState("")

  const windows = <Windows className={className} {...props} />
  const macos = <MacOS className={className} {...props} />
  const gnome = <Gnome className={className} {...props} />

  useEffect(() => {
    async function fetchOsType() {
      const typeResult = await type()
      setOsType(typeResult)
      console.log(typeResult)
    }
    fetchOsType()
  }, [platform])

  // Check the platform and render the appropriate controls
  switch (platform) {
    case "windows":
      return windows
    case "macos":
      return macos
    case "gnome":
      return gnome
    default:
      switch (osType) {
        case "Windows_NT" && "Linux_NT":
          return windows
        case "Darwin":
          return macos
        case "Linux":
          return gnome
        default:
          return windows
      }
  }
}
