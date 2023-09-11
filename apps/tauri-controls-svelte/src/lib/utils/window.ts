import type { Window } from "@tauri-apps/plugin-window"

export let appWindow: Window

export const initializeAppWindow = async () => {
  const { getCurrent: windowPlugin } = await import("@tauri-apps/plugin-window")
  appWindow = windowPlugin()
}

export const minimizeWindow = () => {
  appWindow?.minimize()
}

export const maximizeWindow = async () => {
  await appWindow.toggleMaximize()
}

export const closeWindow = () => {
  appWindow.close()
}

export const fullscreenWindow = async () => {
  const fullscreen = await appWindow?.isFullscreen()

  if (fullscreen) {
    await appWindow.setFullscreen(false)
  } else {
    await appWindow.setFullscreen(true)
  }
}
