import type { OsType } from "@tauri-apps/plugin-os"
import { useEffect, useState } from "react"
import { cn } from "src/tauri-controls/libs/utils"
import { getOsType } from "./libs/plugin-os"
import type { WindowTitlebarProps } from "./types"
import { WindowControls } from "./window-controls"

export function WindowTitlebar({
  children,
  controlsOrder = "system",
  className,
  windowControlsProps,
  ...props
}: WindowTitlebarProps) {
  const [osType, setOsType] = useState<OsType | undefined>(undefined)

  useEffect(() => {
    getOsType().then((type) => {
      setOsType(type)
    })
  }, [])

  const left =
    controlsOrder === "left" ||
    (controlsOrder === "platform" &&
      windowControlsProps?.platform === "macos") ||
    (controlsOrder === "system" && osType === "Darwin")

  const customProps = (ml: string) => {
    if (windowControlsProps?.justify !== undefined) return windowControlsProps

    const {
      justify: windowControlsJustify,
      className: windowControlsClassName,
      ...restProps
    } = windowControlsProps || {}
    return {
      justify: false,
      className: cn(windowControlsClassName, ml),
      ...restProps,
    }
  }

  return (
    <div
      className={cn(
        "bg-background flex select-none flex-row overflow-hidden",
        className
      )}
      data-tauri-drag-region
      {...props}
    >
      {left ? (
        <>
          <WindowControls {...customProps("ml-0")} />
          {children}
        </>
      ) : (
        <>
          {children}
          <WindowControls {...customProps("ml-auto")} />
        </>
      )}
    </div>
  )
}
