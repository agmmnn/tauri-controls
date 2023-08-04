import type { OsType } from "@tauri-apps/plugin-os"
import { createSignal, mergeProps, onMount, splitProps } from "solid-js"
import { twMerge } from "tailwind-merge"
import { getOsType } from "./libs/plugin-os"
import type { WindowTitlebarProps } from "./types"
import { WindowControls } from "./window-controls"

export function WindowTitlebar(props: WindowTitlebarProps) {
  const [osType, setOsType] = createSignal<OsType | undefined>(undefined)

  const [rawLocal, otherProps] = splitProps(props, [
    "children",
    "controlsOrder",
    "class",
    "windowControlsProps"
  ])

  const local = mergeProps(
    {
      controlsOrder: "system"
    },
    rawLocal
  )

  onMount(() => {
    getOsType().then((type) => {
      setOsType(type)
    })
  })

  const left = () =>
    local.controlsOrder === "left" ||
    (local.controlsOrder === "platform" &&
      local.windowControlsProps?.platform === "macos") ||
    (local.controlsOrder === "system" && osType() === "Darwin")

  const customProps = (ml: string) => {
    if (local.windowControlsProps?.justify !== undefined)
      return local.windowControlsProps

    const {
      justify: windowControlsJustify,
      class: windowControlsClassName,
      ...restProps
    } = local.windowControlsProps || {}
    return {
      justify: false,
      class: twMerge(windowControlsClassName, ml),
      ...restProps
    }
  }

  return (
    <div
      class={twMerge(
        "bg-background flex select-none flex-row overflow-hidden",
        local.class
      )}
      data-tauri-drag-region
      {...otherProps}
    >
      {left() ? (
        <>
          <WindowControls {...customProps("ml-0")} />
          {local.children}
        </>
      ) : (
        <>
          {local.children}
          <WindowControls {...customProps("ml-auto")} />
        </>
      )}
    </div>
  )
}
