import { createMemo, mergeProps, splitProps } from "solid-js"
import { twMerge } from "tailwind-merge"
import { getOsType } from "./libs/plugin-os"
import type { WindowTitlebarProps } from "./types"
import { WindowControls } from "./window-controls"

export function WindowTitlebar(props: WindowTitlebarProps) {
  const [local, otherProps] = splitProps(props, [
    "children",
    "controlsOrder",
    "class",
    "windowControlsProps",
  ])

  const left = createMemo(() => {
    if (local.controlsOrder === "left") return true
    if (local.controlsOrder === "right") return false
    if (local.controlsOrder === "platform") {
      return (local.windowControlsProps?.platform ?? getOsType()) === "macos"
    }
    // `local.controlsOrder` defaults to "system"
    return getOsType() === "macos"
  })

  const windowControlsProps = mergeProps(local.windowControlsProps, {
    justify: false,
    get class() {
      const ml = left() ? "ml-0" : "ml-auto"
      return twMerge(local.windowControlsProps?.class, ml)
    },
  })

  const controls = <WindowControls {...windowControlsProps} />

  return (
    <div
      class={twMerge(
        "bg-background flex select-none flex-row overflow-hidden",
        local.class
      )}
      data-tauri-drag-region
      {...otherProps}
    >
      {left() ? [controls, local.children] : [local.children, controls]}
    </div>
  )
}
