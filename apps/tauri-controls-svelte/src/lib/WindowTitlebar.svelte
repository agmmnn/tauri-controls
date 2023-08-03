<script lang="ts">
  import { osType } from "$lib/utils/os"
  import { cn } from "$lib/utils/utils"
  import type { WindowControlsProps } from "./types"
  import WindowControls from "./WindowControls.svelte"

  export let controlsOrder = "system"
  export let windowControlsProps: WindowControlsProps = {}

  const left =
    controlsOrder === "left" ||
    (controlsOrder === "platform" &&
      windowControlsProps?.platform === "macos") ||
    (controlsOrder === "system" && osType === "Darwin")

  const props = (ml: string) => {
    if (windowControlsProps?.justify !== undefined) return windowControlsProps

    const {
      justify: windowControlsJustify,
      class: windowControlsClass,
      ...restProps
    } = windowControlsProps
    return {
      justify: false,
      class: cn(windowControlsClass, ml),
      ...restProps
    }
  }
</script>

<div
  {...$$props}
  class={cn(
    "bg-background flex select-none flex-row overflow-hidden",
    $$props.class
  )}
  data-tauri-drag-region
>
  {#if left}
    <WindowControls {...props("ml-0")} />
    <slot />
  {:else}
    <slot />
    <WindowControls {...props("ml-auto")} />
  {/if}
</div>
