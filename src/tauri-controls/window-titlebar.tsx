import { type } from "@tauri-apps/plugin-os"
import { useEffect, useState } from "react"
import { type WindowTitlebar } from "src"
import { cn } from "src/tauri-controls/libs/utils"
import { WindowControls } from "./window-controls"

export function WindowTitlebar({
  children,
  controlsOrder,
  className,
  windowControlsProps,
  ...props
}: WindowTitlebar) {
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
    (controlsOrder === undefined && osType === "Darwin")

  return (
    <div
      className={cn(
        "flex select-none flex-row items-center overflow-clip",
        className
      )}
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
