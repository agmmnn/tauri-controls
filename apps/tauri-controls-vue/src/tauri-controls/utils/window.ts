import type { WebviewWindow } from "@tauri-apps/plugin-window"
import { ref } from "vue"

export const appWindow = ref<WebviewWindow | null>(null)
export const isWindowMaximized = ref(false)

import("@tauri-apps/plugin-window").then((module) => {
  appWindow.value = module.appWindow
})

export const minimizeWindow = async () => {
  await appWindow.value?.minimize()
}

export const maximizeWindow = async () => {
  await appWindow.value?.toggleMaximize()
  isWindowMaximized.value = !isWindowMaximized.value
}

export const fullscreenWindow = async () => {
  const window = appWindow.value
  if (window) {
    const fullscreen = await window.isFullscreen()
    await window.setFullscreen(!fullscreen)
  }
}

export const closeWindow = async () => {
  await appWindow.value?.close()
}
