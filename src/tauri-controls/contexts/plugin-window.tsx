import type { WebviewWindow } from "@tauri-apps/plugin-window"
import React, { createContext, useCallback, useEffect, useState } from "react"

interface TauriAppWindowContextType {
  appWindow: WebviewWindow | null
  isWindowMaximized: boolean
  minimizeWindow: () => Promise<void>
  maximizeWindow: () => Promise<void>
  fullscreenWindow: () => Promise<void>
  closeWindow: () => Promise<void>
}

const TauriAppWindowContext = createContext<TauriAppWindowContextType>({
  appWindow: null,
  isWindowMaximized: false,
  minimizeWindow: () => Promise.resolve(),
  maximizeWindow: () => Promise.resolve(),
  fullscreenWindow: () => Promise.resolve(),
  closeWindow: () => Promise.resolve(),
})

interface TauriAppWindowProviderProps {
  children: React.ReactNode
}

export const TauriAppWindowProvider: React.FC<TauriAppWindowProviderProps> = ({
  children,
}: any) => {
  const [appWindow, setAppWindow] = useState<WebviewWindow | null>(null)
  const [isWindowMaximized, setIsWindowMaximized] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@tauri-apps/plugin-window").then((module) => {
        setAppWindow(module.appWindow)
      })
    }
  }, [])

  const updateIsWindowMaximized = useCallback(async () => {
    if (appWindow) {
      const resolvedPromise = await appWindow.isMaximized()
      setIsWindowMaximized(resolvedPromise)
    }
  }, [appWindow])

  useEffect(() => {
    updateIsWindowMaximized()
    let unlisten: () => void = () => {}

    const listen = async () => {
      if (appWindow) {
        unlisten = await appWindow.onResized(() => {
          updateIsWindowMaximized()
        })
      }
    }
    listen()

    return () => unlisten && unlisten()
  }, [appWindow, updateIsWindowMaximized])

  const minimizeWindow = async () => {
    if (appWindow) {
      await appWindow.minimize()
    }
  }

  const maximizeWindow = async () => {
    if (appWindow) {
      await appWindow.toggleMaximize()
    }
  }

  const fullscreenWindow = async () => {
    if (appWindow) {
      const fullscreen = await appWindow.isFullscreen()
      if (fullscreen) {
        await appWindow.setFullscreen(false)
      } else {
        await appWindow.setFullscreen(true)
      }
    }
  }

  const closeWindow = async () => {
    if (appWindow) {
      await appWindow.close()
    }
  }

  return (
    <TauriAppWindowContext.Provider
      value={{
        appWindow,
        isWindowMaximized,
        minimizeWindow,
        maximizeWindow,
        fullscreenWindow,
        closeWindow,
      }}
    >
      {children}
    </TauriAppWindowContext.Provider>
  )
}

export default TauriAppWindowContext
