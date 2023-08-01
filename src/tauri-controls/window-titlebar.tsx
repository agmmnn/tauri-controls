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

  /* eslint-disable */
  const { className: windowControlsClassName, ...restProps } =
    windowControlsProps || {}

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
          <WindowControls
            className={cn("ml-0", windowControlsProps?.className)}
            {...restProps}
          />
          {children}
        </>
      ) : (
        <>
          {children}
          <WindowControls
            className={cn("ml-auto", windowControlsProps?.className)}
            {...restProps}
          />
        </>
      )}
    </div>
  )
}
