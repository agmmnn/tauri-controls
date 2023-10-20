import { window } from "@tauri-apps/api"

export let appWindow: window.Window

export const initializeAppWindow = async () => {
  const { window: windowPlugin } = await import("@tauri-apps/api")
  appWindow = windowPlugin.getCurrent()
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
