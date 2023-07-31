import { cn } from "src/tauri-controls/libs/utils"
import { osType } from "./libs/plugin-os"
import type { WindowTitlebarProps } from "./types"
import { WindowControls } from "./window-controls"

export function WindowTitlebar({
  children,
  controlsOrder = "system",
  className,
  windowControlsProps,
  ...props
}: WindowTitlebarProps) {
  const isMacOS =
    windowControlsProps?.platform === "macos" || osType === "Darwin"
  const left =
    controlsOrder === "left" || (controlsOrder === "platform" && isMacOS)

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
