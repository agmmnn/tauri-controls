import type { Window } from "@tauri-apps/api/window"
import { createEffect, createSignal, onCleanup } from "solid-js"
import { getOsType } from "./plugin-os"

export const [appWindow, setAppWindow] = createSignal<Window | null>(null)
export const [isWindowMaximized, setIsWindowMaximized] = createSignal(false)

import("@tauri-apps/api").then((module) => {
  setAppWindow(module.window.getCurrent())
})

// Update the isWindowMaximized state when the window is resized
const updateIsWindowMaximized = async () => {
  const window = appWindow()
  if (window) {
    const resolvedPromise = await window.isMaximized()
    setIsWindowMaximized(resolvedPromise)
  }
}

createEffect(async () => {
  const osname = await getOsType()
  // temporary: https://github.com/agmmnn/tauri-controls/issues/10#issuecomment-1675884962
  if (osname !== "macos") {
    updateIsWindowMaximized()
    let unlisten: () => void = () => { }

    const window = appWindow()
    if (window) {
      unlisten = await window.onResized(() => {
        updateIsWindowMaximized()
      })
    }

    // Cleanup the listener when the component unmounts
    unlisten && onCleanup(unlisten)
  }
})

export const minimizeWindow = async () => {
  await appWindow()?.minimize()
}

export const maximizeWindow = async () => {
  await appWindow()?.toggleMaximize()
}

export const fullscreenWindow = async () => {
  const window = appWindow()
  if (window) {
    const fullscreen = await window.isFullscreen()
    await window.setFullscreen(!fullscreen)
  }
}

export const closeWindow = async () => {
  await appWindow()?.close()
}
