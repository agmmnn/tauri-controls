import { Match, mergeProps, onMount, splitProps, Switch } from "solid-js"
import { twMerge } from "tailwind-merge"
import { Gnome, MacOS, Windows } from "./controls"
import { getOsType } from "./libs/plugin-os"
import type { WindowControlsProps } from "./types"

export function WindowControls(props: WindowControlsProps) {
  const [rawLocal, otherProps] = splitProps(props, [
    "class",
    "hideMethod",
    "hide",
    "platform",
    "justify",
  ])

  const local = mergeProps(
    {
      justify: false,
      hide: false,
      hideMethod: "display",
    },
    rawLocal
  )

  onMount(() => {
    getOsType().then((type) => {
      if (!local.platform) {
        switch (type) {
          case "macos":
            local.platform = "macos"
            break
          case "linux":
            local.platform = "gnome"
            break
          default:
            local.platform = "windows"
        }
      }
    })
  })

  const customClass = twMerge(
    "flex",
    local.class,
    local.hide && (local.hideMethod === "display" ? "hidden" : "invisible")
  )

  // Determine the default platform based on the operating system if not specified
  return (
    <Switch
      fallback={
        <Windows
          class={twMerge(customClass, local.justify && "ml-auto")}
          {...otherProps}
        />
      }
    >
      <Match when={local.platform === "windows"}>
        <Windows
          class={twMerge(customClass, local.justify && "ml-auto")}
          {...otherProps}
        />
      </Match>
      <Match when={local.platform === "macos"}>
        <MacOS
          class={twMerge(customClass, local.justify && "ml-0")}
          {...otherProps}
        />
      </Match>
      <Match when={local.platform === "gnome"}>
        <Gnome
          class={twMerge(customClass, local.justify && "ml-auto")}
          {...otherProps}
        />
      </Match>
    </Switch>
  )
}
