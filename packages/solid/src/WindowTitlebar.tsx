import { createMemo, mergeProps, splitProps, type ComponentProps } from "solid-js"
import { cn, detectPlatform, styles, type WindowTitlebarProps } from "@tauri-controls/core"
import { WindowControls } from "./WindowControls"

export function WindowTitlebar(props: WindowTitlebarProps & ComponentProps<"div">) {
  const [local, otherProps] = splitProps(props, [
    "children", "controlsOrder", "class", "windowControlsProps",
  ])

  const platform = createMemo(() => detectPlatform())

  const left = createMemo(() => {
    if (local.controlsOrder === "left") return true
    if (local.controlsOrder === "right") return false
    if (local.controlsOrder === "platform") {
      return (local.windowControlsProps?.platform ?? platform()) === "macos"
    }
    return platform() === "macos"
  })

  const windowControlsProps = mergeProps(local.windowControlsProps, {
    justify: false,
    get class() {
      return cn(local.windowControlsProps?.className, left() ? "ml-0" : "ml-auto")
    },
  })

  const controlsEl = <WindowControls {...windowControlsProps} />

  return (
    <div class={cn(styles.titlebar, local.class)} data-tauri-drag-region {...otherProps}>
      {left() ? [controlsEl, local.children] : [local.children, controlsEl]}
    </div>
  )
}
