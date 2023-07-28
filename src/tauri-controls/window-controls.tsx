import { type } from "@tauri-apps/plugin-os"
import { useEffect, useState } from "react"
import { type WindowControls } from "src"
import { cn } from "src/tauri-controls/libs/utils"
import { Gnome, MacOS, Windows } from "./controls"

export function WindowControls({
  platform,
  hide = false,
  hideMethod = "display",
  // linuxDesktop = "gnome",
  className,
  ...props
}: WindowControls) {
  const [osType, setOsType] = useState("")

  useEffect(() => {
    async function fetchOsType() {
      const typeResult = await type()
      setOsType(typeResult)
    }
    fetchOsType()
  }, [platform])

  const customClass = cn(
    "flex",
    className,
    hide && (hideMethod === "display" ? "hidden" : "invisible")
  )

  const windowsControls = <Windows className={customClass} {...props} />
  const macosControls = <MacOS className={customClass} {...props} />
  const gnomeControls = <Gnome className={customClass} {...props} />

  // Check the platform and render the appropriate controls
  switch (platform) {
    case "windows":
      return windowsControls
    case "macos":
      return macosControls
    case "gnome":
      return gnomeControls
    default:
      // If platform is not specified or not recognized, use osType to determine the default
      switch (osType) {
        case "Windows_NT":
          return windowsControls
        case "Darwin":
          return macosControls
        default:
          return windowsControls
      }
  }
}
