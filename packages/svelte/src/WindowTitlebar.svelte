<script lang="ts">
  import { onMount } from "svelte"
  import type { Snippet } from "svelte"
  import {
    cn,
    detectPlatform,
    styles,
    type Platform,
    type WindowTitlebarProps,
  } from "@tauri-controls/core"
  import WindowControls from "./WindowControls.svelte"

  let {
    controlsOrder = "system",
    windowControlsProps = undefined,
    class: className = "",
    children,
  }: {
    controlsOrder?: WindowTitlebarProps["controlsOrder"]
    windowControlsProps?: WindowTitlebarProps["windowControlsProps"]
    class?: string
    children?: Snippet
  } = $props()

  let platform: Platform = $state("windows")

  onMount(() => {
    platform = detectPlatform()
  })

  let left = $derived(
    controlsOrder === "left" ||
    (controlsOrder === "platform" && windowControlsProps?.platform === "macos") ||
    (controlsOrder === "system" && platform === "macos")
  )

  let controlsClass = $derived(cn(windowControlsProps?.className, left ? "ml-0" : "ml-auto"))
</script>

<div class={cn(styles.titlebar, className)} data-tauri-drag-region>
  {#if left}
    <WindowControls {...windowControlsProps} justify={false} class={controlsClass} />
    {#if children}{@render children()}{/if}
  {:else}
    {#if children}{@render children()}{/if}
    <WindowControls {...windowControlsProps} justify={false} class={controlsClass} />
  {/if}
</div>
