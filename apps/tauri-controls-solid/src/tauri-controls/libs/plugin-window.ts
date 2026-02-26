import { getCurrentWindow } from "@tauri-apps/api/window"
import { createSignal } from "solid-js"

const [isWindowMaximized, setIsWindowMaximized] = createSignal(false)
export { isWindowMaximized }

const watchWindowMaximized = () => {
  const window = getCurrentWindow()
  window.isMaximized().then(setIsWindowMaximized)
  window.onResized(() => window.isMaximized().then(setIsWindowMaximized))
}
watchWindowMaximized()

export const minimizeWindow = async () => {
  await getCurrentWindow().minimize()
}

export const maximizeWindow = async () => {
  await getCurrentWindow().toggleMaximize()
}

export const fullscreenWindow = async () => {
  const window = getCurrentWindow()
  const fullscreen = await window.isFullscreen()
  await window.setFullscreen(!fullscreen)
}

export const closeWindow = async () => {
  await getCurrentWindow()?.close()
}
