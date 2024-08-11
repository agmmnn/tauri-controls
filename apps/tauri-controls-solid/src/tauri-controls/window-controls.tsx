import { createMemo, Match, splitProps, Switch } from "solid-js"
import { twMerge } from "tailwind-merge"
import { Gnome, MacOS, Windows } from "./controls"
import { getPlatform } from "./libs/plugin-os"
import type { WindowControlsProps } from "./types"

export function WindowControls(props: WindowControlsProps) {
  const [local, otherProps] = splitProps(props, [
    "class",
    "hideMethod",
    "hide",
    "platform",
    "justify",
  ])

  // Determine the default platform based on the operating system if not specified
  const platform = createMemo(() => local.platform ?? getPlatform())

  const hideMethod = () => local.hideMethod ?? "display"
  const className = () =>
    twMerge(
      "flex",
      local.class,
      local.hide && (hideMethod() === "display" ? "hidden" : "invisible"),
      local.justify && (platform() === "macos" ? "ml-0" : "ml-auto")
    )

  return (
    <Switch>
      <Match when={platform() === "macos"}>
        <MacOS class={className()} {...otherProps} />
      </Match>
      <Match when={platform() === "gnome"}>
        <Gnome class={className()} {...otherProps} />
      </Match>
      <Match when={true}>
        <Windows class={className()} {...otherProps} />
      </Match>
    </Switch>
  )
}
