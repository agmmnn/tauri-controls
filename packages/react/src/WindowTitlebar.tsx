import { useEffect, useState, type HTMLProps } from "react"
import {
  cn,
  detectPlatform,
  styles,
  type WindowTitlebarProps,
  type Platform,
} from "@tauri-controls/core"
import { WindowControls } from "./WindowControls"

export function WindowTitlebar({
  children,
  controlsOrder = "system",
  className,
  windowControlsProps,
  ...props
}: WindowTitlebarProps & Omit<HTMLProps<HTMLDivElement>, keyof WindowTitlebarProps>) {
  const [platform, setPlatform] = useState<Platform>("windows")

  useEffect(() => {
    setPlatform(detectPlatform())
  }, [])

  const left =
    controlsOrder === "left" ||
    (controlsOrder === "platform" &&
      windowControlsProps?.platform === "macos") ||
    (controlsOrder === "system" && platform === "macos")

  const controlsProps = {
    ...windowControlsProps,
    justify: false,
    className: cn(windowControlsProps?.className, left ? "ml-0" : "ml-auto"),
  }

  return (
    <div
      className={cn(styles.titlebar, className)}
      data-tauri-drag-region
      {...props}
    >
      {left ? (
        <>
          <WindowControls {...controlsProps} />
          {children}
        </>
      ) : (
        <>
          {children}
          <WindowControls {...controlsProps} />
        </>
      )}
    </div>
  )
}
