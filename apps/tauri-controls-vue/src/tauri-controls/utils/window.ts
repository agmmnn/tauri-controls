import type { window } from "@tauri-apps/api"
import { ref } from "vue"

export const appWindow = ref<window.Window | null>(null)
export const isWindowMaximized = ref(false)

import("@tauri-apps/api").then((module) => {
  appWindow.value = module.window.getCurrent()
})

export const minimizeWindow = async () => {
  await appWindow.value?.minimize()
}

export const maximizeWindow = async () => {
  await appWindow.value?.toggleMaximize()
  isWindowMaximized.value = !isWindowMaximized.value
}

export const fullscreenWindow = async () => {
  if (appWindow) {
    const fullscreen = await appWindow.value?.isFullscreen()
    await appWindow.value?.setFullscreen(!fullscreen)
  }
}

export const closeWindow = async () => {
  await appWindow.value?.close()
}
