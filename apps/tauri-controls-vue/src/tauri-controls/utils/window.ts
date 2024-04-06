import type { window } from "@tauri-apps/api"
import { ref } from "vue"

export const appWindow = ref<window.Window | null>(null)
export const isWindowMaximized = ref(false)

import("@tauri-apps/api").then((module) => {
  appWindow.value = module.window.getCurrent()
  appWindow.value.onResized(async () => {
    const isMaximized = await appWindow.value?.isMaximized()
    if (isMaximized) {
      isWindowMaximized.value = true
    }
  })
})

export const minimizeWindow = async () => {
  await appWindow.value?.minimize()
}

export const maximizeWindow = async () => {
  await appWindow.value?.toggleMaximize()
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
