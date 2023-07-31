import { cn } from "src/tauri-controls/libs/utils"
import { TauriAppWindowProvider } from "./contexts/plugin-window"
import { Gnome, MacOS, Windows } from "./controls"
import { osType } from "./libs/plugin-os"
import type { WindowControlsProps } from "./types"

export function WindowControls({
  platform,
  hide = false,
  hideMethod = "display",
  // linuxDesktop = "gnome",
  className,
  ...props
}: WindowControlsProps) {
  const customClass = cn(
    "flex",
    className,
    hide && (hideMethod === "display" ? "hidden" : "invisible")
  )

  // Determine the default platform based on the operating system if not specified
  if (!platform) {
    switch (osType) {
      case "Darwin":
        platform = "macos"
        break
      case "Linux":
        platform = "gnome"
        break
      default:
        platform = "windows"
    }
  }

  const ControlsComponent = () => {
    switch (platform) {
      case "windows":
        return <Windows className={customClass} {...props} />
      case "macos":
        return <MacOS className={customClass} {...props} />
      case "gnome":
        return <Gnome className={customClass} {...props} />
      default:
        return <Windows className={customClass} {...props} />
    }
  }

  return (
    <TauriAppWindowProvider>
      <ControlsComponent />
    </TauriAppWindowProvider>
  )
}
