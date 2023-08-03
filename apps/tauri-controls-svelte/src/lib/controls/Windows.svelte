<script>
  import Button from "$lib/components/Button.svelte"
  import Icons from "$lib/components/Icons.svelte"
  import { cn } from "$lib/utils/utils"
  import {
    closeWindow,
    initializeAppWindow,
    maximizeWindow,
    minimizeWindow
  } from "$lib/utils/window"
  import { onMount } from "svelte"

  const isWindowMaximized = 0

  onMount(async () => {
    await initializeAppWindow()
  })
</script>

<div {...$$props} class={cn("h-8 select-none", $$props.class)}>
  <Button
    on:click={() => minimizeWindow()}
    class="max-h-8 w-[46px] cursor-default rounded-none bg-transparent text-black/90 hover:bg-black/[.05] active:bg-black/[.03]  dark:text-white dark:hover:bg-white/[.06] dark:active:bg-white/[.04]"
  >
    <Icons icon="minimizeWin" />
  </Button>
  <Button
    on:click={() => maximizeWindow()}
    class={cn(
      "max-h-8 w-[46px] cursor-default rounded-none bg-transparent",
      "text-black/90 hover:bg-black/[.05] active:bg-black/[.03] dark:text-white dark:hover:bg-white/[.06] dark:active:bg-white/[.04]"
      // !isMaximizable && "text-white/[.36]",
    )}
  >
    {#if isWindowMaximized}
      <Icons icon="maximizeRestoreWin" />
    {:else}
      <Icons icon="maximizeWin" />
    {/if}
  </Button>
  <Button
    on:click={() => closeWindow()}
    class="max-h-8 w-[46px] cursor-default rounded-none bg-transparent text-black/90 hover:bg-[#c42b1c] hover:text-white active:bg-[#c42b1c]/90 dark:text-white"
  >
    <Icons icon="closeWin" />
  </Button>
</div>
