import { type } from "@tauri-apps/plugin-os"
import { useEffect, useState } from "react"
import { cn } from "src/tauri-controls/libs/utils"
import { type WindowTitlebarProps } from "./types"
import { WindowControls } from "./window-controls"

export function WindowTitlebar({
  children,
  controlsOrder = "system",
  className,
  windowControlsProps,
  ...props
}: WindowTitlebarProps) {
  const [osType, setOsType] = useState("")

  useEffect(() => {
    async function fetchOsType() {
      const typeResult = await type()
      setOsType(typeResult)
    }
    fetchOsType()
  }, [controlsOrder])

  const left =
    controlsOrder === "left" ||
    (controlsOrder === "platform" &&
      windowControlsProps?.platform === "macos") ||
    (controlsOrder === "system" && osType === "Darwin")

  return (
    <div
      className={cn("flex select-none flex-row overflow-clip", className)}
      data-tauri-drag-region
      {...props}
    >
      {left ? (
        <>
          <WindowControls {...windowControlsProps} />
          {children}
        </>
      ) : (
        <>
          {children}
          <WindowControls {...windowControlsProps} />
        </>
      )}
    </div>
  )
}
