export type Platform = "windows" | "macos" | "gnome"

export type ControlsOrder = "right" | "left" | "platform" | "system"

export interface WindowControlsProps {
  platform?: Platform
  hide?: boolean
  hideMethod?: "display" | "visibility"
  justify?: boolean
  className?: string
  "data-tauri-drag-region"?: boolean
}

export interface WindowTitlebarProps {
  controlsOrder?: ControlsOrder
  windowControlsProps?: WindowControlsProps
  className?: string
  "data-tauri-drag-region"?: boolean
}
