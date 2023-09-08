import { getCurrent } from "@tauri-apps/plugin-window"
import { ref } from "vue"

export const appWindow = getCurrent()
export const isWindowMaximized = ref(false)

export const minimizeWindow = async () => {
  await appWindow.minimize()
}

export const maximizeWindow = async () => {
  await appWindow.toggleMaximize()
  isWindowMaximized.value = !isWindowMaximized.value
}

export const fullscreenWindow = async () => {
  if (appWindow) {
    const fullscreen = await appWindow.isFullscreen()
    await appWindow.setFullscreen(!fullscreen)
  }
}

export const closeWindow = async () => {
  await appWindow.close()
}
