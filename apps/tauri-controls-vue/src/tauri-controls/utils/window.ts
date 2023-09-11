import type { Window } from "@tauri-apps/plugin-window"
import { ref } from "vue"

export const appWindow = ref<Window | null>(null)
export const isWindowMaximized = ref(false)

import("@tauri-apps/plugin-window").then((module) => {
  appWindow.value = module.getCurrent()
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
