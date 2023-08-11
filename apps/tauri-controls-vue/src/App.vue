<script setup lang="ts">
import ThemeSwitch from './components/ThemeSwitch.vue';
import { WindowControls, WindowTitlebar } from './tauri-controls';
import LogoSvg from './components/LogoSvg.vue';
import Menu from './components/Menu.vue';
type platform = "windows" | "macos" | "gnome"
const platforms: platform[] = ["windows", "macos", "gnome"]
</script>

<template>
  <div class="flex w-[960px] flex-col gap-3 px-14 py-6">
    <ThemeSwitch />
    <span class="w-fit rounded bg-violet-200/20 px-2 font-mono">
      @tauri-controls/vue
    </span>
    <span class="w-fit border-b border-slate-400 pb-1 pr-10 text-lg font-semibold dark:border-slate-600">
      WindowControls
    </span>
    <!-- {/* OnlyControls */} -->
    <div class="flex w-fit gap-3 rounded-xl border border-dashed border-slate-400 p-3  shadow dark:border-slate-600">
      <WindowControls v-for="platform in platforms" :key="platform" :platform="platform" />
    </div>
    justify=true:
    <div class="flex border" data-tauri-drag-region>
      <WindowControls platform="windows" justify />
    </div>
    <div class="flex border" data-tauri-drag-region>
      <WindowControls platform="macos" justify />
    </div>
    <span class="w-fit border-b border-slate-400 pb-1 pr-10 text-lg font-semibold dark:border-slate-600">
      WindowTitlebar
    </span>
    <WindowTitlebar class="border">content</WindowTitlebar>
    <!-- {/* Icon+Title Controls */} -->
    <WindowTitlebar controlsOrder="platform" v-for="platform in platforms" :key="platform"
      :windowControlsProps="{ platform }"
      class="h-10 rounded-t-lg border border-dashed border-slate-400  bg-white shadow dark:border-slate-600 dark:bg-slate-800">
      <div class="flex h-full w-full items-center justify-center" data-tauri-drag-region>
        <LogoSvg />
        Title
      </div>
    </WindowTitlebar>
    <!-- {/* Icon Menu Title Controls */} -->
    <WindowTitlebar v-for="platform in platforms" :key="platform" :windowControlsProps="{ platform }"
      controlsOrder="platform" class="h-10 rounded-t-lg  bg-white shadow dark:bg-slate-800" data-tauri-drag-region>
      <div class="ml-3 flex items-center" data-tauri-drag-region>
        <LogoSvg />
        <Menu />
      </div>
      <div class="flex w-full items-center justify-center" data-tauri-drag-region>
        Title
      </div>
    </WindowTitlebar>
    <WindowTitlebar data-tauri-drag-region controlsOrder="right"
      :windowControlsProps="{ platform: 'macos', className: 'bg-rose-700 rounded-full p-2' }">
      <div class="flex items-center justify-center rounded-full bg-sky-500 px-2">
        titlebar content without w-full (macos but on the right side)
      </div>
    </WindowTitlebar>
    <WindowTitlebar data-tauri-drag-region controlsOrder="left"
      :windowControlsProps="{ platform: 'windows', className: 'bg-rose-700 rounded-full overflow-hidden' }">
      <div class="flex items-center justify-center rounded-full bg-sky-500 px-2">
        titlebar content without w-full (windows but on the left side)
      </div>
    </WindowTitlebar>
  </div>
</template>