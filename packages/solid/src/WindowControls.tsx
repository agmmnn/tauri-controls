import {
  createMemo,
  createSignal,
  Match,
  onCleanup,
  onMount,
  splitProps,
  Switch,
  type ComponentProps,
} from "solid-js"
import {
  cn,
  createWindowControls,
  detectPlatform,
  styles,
  type WindowControlsProps,
} from "@tauri-controls/core"
import { Icons } from "./icons"

function Button(props: ComponentProps<"button">) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <button class={cn(styles.baseButton, local.class)} {...rest}>
      {local.children}
    </button>
  )
}

export function WindowControls(props: WindowControlsProps & ComponentProps<"div">) {
  const [local, otherProps] = splitProps(props, [
    "class", "hideMethod", "hide", "platform", "justify",
  ])

  const controls = createWindowControls()
  const [isMaximized, setIsMaximized] = createSignal(false)
  const [isAltKeyPressed, setIsAltKeyPressed] = createSignal(false)
  const [isHovering, setIsHovering] = createSignal(false)

  onMount(async () => {
    const unlisten = await controls.onMaximizedChange(setIsMaximized)
    onCleanup(unlisten)

    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Alt") setIsAltKeyPressed(true) }
    const handleKeyUp = (e: KeyboardEvent) => { if (e.key === "Alt") setIsAltKeyPressed(false) }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    onCleanup(() => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    })
  })

  const platform = createMemo(() => local.platform ?? detectPlatform())
  const hideMethod = () => local.hideMethod ?? "display"
  const className = () =>
    cn(
      "flex",
      local.class,
      local.hide && (hideMethod() === "display" ? "hidden" : "invisible"),
      local.justify && (platform() === "macos" ? "ml-0" : "ml-auto")
    )

  return (
    <Switch>
      <Match when={platform() === "macos"}>
        <div
          class={cn(styles.macos.container, className())}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          {...otherProps}
        >
          <Button onClick={() => controls.close()} class={cn(styles.macos.button, styles.macos.close)}>
            {isHovering() && <Icons.closeMac />}
          </Button>
          <Button onClick={() => controls.minimize()} class={cn(styles.macos.button, styles.macos.minimize)}>
            {isHovering() && <Icons.minMac />}
          </Button>
          <Button
            onClick={() => (isAltKeyPressed() ? controls.maximize() : controls.fullscreen())}
            class={cn(styles.macos.button, styles.macos.fullscreen)}
          >
            {isHovering() && (isAltKeyPressed() ? <Icons.plusMac /> : <Icons.fullMac />)}
          </Button>
        </div>
      </Match>
      <Match when={platform() === "gnome"}>
        <div class={cn(styles.gnome.container, className())} {...otherProps}>
          <Button onClick={() => controls.minimize()} class={styles.gnome.button}>
            <Icons.minimizeWin class="h-[9px] w-[9px]" />
          </Button>
          <Button onClick={() => controls.maximize()} class={styles.gnome.button}>
            {isMaximized() ? <Icons.maximizeRestoreWin class="h-[9px] w-[9px]" /> : <Icons.maximizeWin class="h-2 w-2" />}
          </Button>
          <Button onClick={() => controls.close()} class={styles.gnome.button}>
            <Icons.closeWin class="h-2 w-2" />
          </Button>
        </div>
      </Match>
      <Match when={true}>
        <div class={cn(styles.windows.container, className())} {...otherProps}>
          <Button onClick={() => controls.minimize()} class={styles.windows.button}>
            <Icons.minimizeWin />
          </Button>
          <Button onClick={() => controls.maximize()} class={styles.windows.button}>
            {isMaximized() ? <Icons.maximizeRestoreWin /> : <Icons.maximizeWin />}
          </Button>
          <Button onClick={() => controls.close()} class={styles.windows.closeButton}>
            <Icons.closeWin />
          </Button>
        </div>
      </Match>
    </Switch>
  )
}
