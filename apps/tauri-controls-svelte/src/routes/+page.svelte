<script lang="ts">
  import "../style.css"
  import { WindowControls, WindowTitlebar } from "$lib"
  import ThemeSwitch from "./theme-switch.svelte"

  const platforms = ["windows", "macos", "gnome"]
  const menuItems = ["File", "Edit", "View", "Account", "Theme"]
</script>

<svelte:head>
  <title>Demo-Svelte</title>
</svelte:head>

<div>
  <div
    class="flex flex-col w-[960px] gap-3 py-6 px-14 text-black dark:text-white"
  >
    <ThemeSwitch />
    <span class="w-fit rounded bg-orange-200/20 px-2 font-mono"
      >@tauri-controls/svelte</span
    >
    <span
      class="w-fit border-b border-slate-400 pb-1 pr-10 dark:border-slate-600 text-lg font-semibold"
    >
      WindowControls
    </span>
    <!-- OnlyControls  -->
    <div
      class="flex w-fit gap-3 rounded-xl border border-dashed border-slate-400 p-3 shadow dark:border-slate-600"
    >
      {#each platforms as platform}
        <WindowControls {platform} />
      {/each}
    </div>

    <!-- OnlyControls Snap  -->
    justify=true:
    <div class="flex border" data-tauri-drag-region>
      <WindowControls platform="windows" justify={true} />
    </div>
    <div class="flex border" data-tauri-drag-region>
      <WindowControls platform="macos" justify={true} />
    </div>

    <span
      class="w-fit border-b border-slate-400 pb-1 pr-10 dark:border-slate-600 text-lg font-semibold"
    >
      WindowTitlebar
    </span>

    <WindowTitlebar>content</WindowTitlebar>

    <!-- Icon+Title+Controls  -->
    {#each platforms as platform}
      <WindowTitlebar
        controlsOrder="platform"
        class="h-10 rounded-t-lg border border-dashed border-slate-400  bg-white shadow dark:border-slate-600 dark:bg-slate-800"
        windowControlsProps={{ platform: platform, class: "" }}
      >
        <div
          class="flex h-full w-full items-center justify-center"
          data-tauri-drag-region
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-sailboat mr-2 text-sky-600/70 dark:text-sky-300/70"
          >
            <path d="M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z" />
            <path d="M21 14 10 2 3 14h18Z" />
            <path d="M10 2v16" />
          </svg>
          Title
        </div>
      </WindowTitlebar>
    {/each}

    <!--  Icon+Menu+Title+Controls  -->
    {#each platforms as platform}
      <WindowTitlebar
        controlsOrder="platform"
        class="h-10 rounded-t-lg  bg-white shadow dark:bg-slate-800"
        windowControlsProps={{
          platform: platform
        }}
        data-tauri-drag-region
      >
        <div class="ml-3 flex items-center" data-tauri-drag-region>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-sailboat mr-2 text-sky-600/70 dark:text-sky-300/70"
          >
            <path d="M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z" />
            <path d="M21 14 10 2 3 14h18Z" />
            <path d="M10 2v16" />
          </svg>
          <div
            class="flex flex-row gap-2 whitespace-nowrap rounded-md px-2 py-1 shadow"
          >
            {#each menuItems as x (x)}
              <span>{x}</span>
            {/each}
          </div>
        </div>

        <div
          class="flex w-full items-center justify-center"
          data-tauri-drag-region
        >
          Title
        </div>
      </WindowTitlebar>
    {/each}

    <WindowTitlebar
      controlsOrder="right"
      windowControlsProps={{
        platform: "macos",
        class: "bg-rose-700 rounded-full p-2"
      }}
    >
      <div
        class="flex items-center justify-center rounded-full bg-sky-500 px-2"
      >
        titlebar content without w-full (macos but on the right side)
      </div>
    </WindowTitlebar>
    <WindowTitlebar
      controlsOrder="left"
      windowControlsProps={{
        platform: "windows",
        class: "bg-rose-700 rounded-full overflow-hidden"
      }}
    >
      <div
        class="flex items-center justify-center rounded-full bg-sky-500 px-2"
      >
        titlebar content without w-full (windows but on the left side)
      </div>
    </WindowTitlebar>
  </div>
</div>

<style lang="postcss">
  :global(html.dark) {
    background-color: theme(colors.sky.950);
  }
  :global(html) {
    background-color: theme(colors.slate.50);
  }
</style>
