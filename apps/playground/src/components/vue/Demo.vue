<template>
  <div class="flex flex-col gap-4 p-4">
    <div>
      <h3 class="text-sm text-gray-400 mb-2">WindowTitlebar</h3>
      <WindowTitlebar class="bg-gray-800 rounded">
        <span class="text-white text-sm pl-3">Vue Titlebar</span>
      </WindowTitlebar>
    </div>

    <div>
      <h3 class="text-sm text-gray-400 mb-2">WindowControls</h3>
      <div class="flex gap-4">
        <div>
          <p class="text-xs text-gray-500 mb-1">platform="windows"</p>
          <WindowControls platform="windows" />
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">platform="macos"</p>
          <WindowControls platform="macos" />
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">platform="gnome"</p>
          <WindowControls platform="gnome" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { WindowControls, WindowTitlebar } from "@tauri-controls/vue"
</script>
