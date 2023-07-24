import React, { useCallback, useEffect, useState } from "react"

import { appWindow } from "@tauri-apps/plugin-window"
import { Icons } from "./icons"
import { Button } from "./ui/Button"
import { cn } from "../lib/utils"

export function Windows({ className, ...props }: any) {
  const [isWindowMaximized, setIsWindowMaximized] = useState(false)

  const updateIsWindowMaximized = useCallback(async () => {
    const resolvedPromise = await appWindow.isMaximized()
    setIsWindowMaximized(resolvedPromise)
  }, [])

  useEffect(() => {
    updateIsWindowMaximized()
    let unlisten: () => void = () => {}
    const listen = async () => {
      unlisten = await appWindow.onResized(() => {
        updateIsWindowMaximized()
      })
    }
    listen()
    return () => unlisten && unlisten()
  }, [updateIsWindowMaximized])

  const minimizeWindow = async () => await appWindow.minimize()
  const maximizeWindow = async () => {
    await appWindow.toggleMaximize()
  }
  const closeWindow = async () => await appWindow.close()

  return (
    <div className={cn("inline-flex", className)} {...props}>
      <Button
        onClick={minimizeWindow}
        className="h-[32px] w-[46px] cursor-default rounded-none bg-transparent text-black/90 hover:bg-black/[.05] active:bg-black/[.03]  dark:text-white dark:hover:bg-white/[.06] dark:active:bg-white/[.04] "
      >
        <Icons.minimizeWin />
      </Button>
      <Button
        onClick={maximizeWindow}
        className="h-[32px] w-[46px] cursor-default rounded-none bg-transparent text-black/90 hover:bg-black/[.05] active:bg-black/[.03]  dark:text-white dark:hover:bg-white/[.06] dark:active:bg-white/[.04]"
      >
        {!isWindowMaximized ? <Icons.maximizeWin /> : <Icons.maximizeRestoreWin />}
      </Button>
      <Button
        onClick={closeWindow}
        className="h-[32px] w-[46px] cursor-default rounded-none bg-transparent text-black/90 hover:bg-[#c42b1c] hover:text-white active:bg-[#c42b1c]/90 dark:text-white"
      >
        <Icons.closeWin />
      </Button>
    </div>
  )
}

export function MacOS({ className, ...props }) {
  const [isWindowMaximized, setIsWindowMaximized] = useState(false)
  const [isAltKeyPressed, setIsAltKeyPressed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const last = isAltKeyPressed ? <Icons.plusMac /> : <Icons.fullMac />
  const handleMouseEnter = () => {
    setIsHovering(true)
  }
  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const handleAltKeyDown = (e) => {
    if (e.key === "Alt") {
      setIsAltKeyPressed(true)
    }
  }
  const handleAltKeyUp = (e) => {
    if (e.key === "Alt") {
      setIsAltKeyPressed(false)
    }
  }
  useEffect(() => {
    // Attach event listeners when the component mounts
    window.addEventListener("keydown", handleAltKeyDown)
    window.addEventListener("keyup", handleAltKeyUp)
  }, [])

  const updateIsWindowMaximized = useCallback(async () => {
    const resolvedPromise = await appWindow.isMaximized()
    setIsWindowMaximized(resolvedPromise)
  }, [])

  useEffect(() => {
    updateIsWindowMaximized()
    let unlisten: () => void = () => {}
    const listen = async () => {
      unlisten = await appWindow.onResized(() => {
        updateIsWindowMaximized()
      })
    }
    listen()
    return () => unlisten && unlisten()
  }, [updateIsWindowMaximized])

  const minimizeWindow = async () => await appWindow.minimize()
  const maximizeWindow = async () => await appWindow.toggleMaximize()
  const fullscreenWindow = async () => {
    const fullscreen = await appWindow.isFullscreen()
    if (fullscreen) {
      await appWindow.setFullscreen(false)
    } else {
      await appWindow.setFullscreen(true)
    }
  }
  const closeWindow = async () => await appWindow.close()

  return (
    <div
      className={cn("inline-flex gap-2 px-4", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <Button
        onClick={closeWindow}
        className="m-0 aspect-square h-3 cursor-default content-center items-center justify-center self-center rounded-full border border-black/[.12] bg-[#ff544d] p-0 text-center text-[#800d01] hover:bg-[#ff544d] active:bg-[#bf403a] active:text-[#590600] dark:border-none"
      >
        {isHovering && <Icons.closeMac />}
      </Button>
      <Button
        onClick={minimizeWindow}
        className="m-0 aspect-square h-3 cursor-default content-center items-center justify-center self-center rounded-full  border border-black/[.12]  bg-[#ffbd2e] p-0 text-center text-[#995700] hover:bg-[#ffbd2e] active:bg-[#bf9122] active:text-[#592800] dark:border-none"
      >
        {isHovering && <Icons.minMac />}
      </Button>
      <Button
        onKeyDown={handleAltKeyDown}
        onKeyUp={handleAltKeyUp}
        onClick={isAltKeyPressed ? maximizeWindow : fullscreenWindow}
        className="m-0 aspect-square h-3 cursor-default content-center items-center justify-center self-center rounded-full border border-black/[.12] bg-[#28c93f] p-0 text-center text-[#006500] hover:bg-[#28c93f] active:bg-[#1e9930] active:text-[#003000] dark:border-none"
      >
        {isHovering && last}
      </Button>
    </div>
  )
}

export function Gnome({ className, ...props }) {
  const [isWindowMaximized, setIsWindowMaximized] = useState(false)

  const updateIsWindowMaximized = useCallback(async () => {
    const resolvedPromise = await appWindow.isMaximized()
    setIsWindowMaximized(resolvedPromise)
  }, [])

  useEffect(() => {
    updateIsWindowMaximized()
    let unlisten: () => void = () => {}
    const listen = async () => {
      unlisten = await appWindow.onResized(() => {
        updateIsWindowMaximized()
      })
    }
    listen()
    return () => unlisten && unlisten()
  }, [updateIsWindowMaximized])

  const minimizeWindow = async () => await appWindow.minimize()
  const maximizeWindow = async () => {
    await appWindow.toggleMaximize()
  }
  const closeWindow = async () => await appWindow.close()

  return (
    <div className={cn("inline-flex gap-4 items-center justify-center px-2", className)} {...props}>
      <Button
        onClick={minimizeWindow}
        className="m-0 aspect-square h-[24px] cursor-default rounded-full bg-[#dadada] p-0 text-[#3d3d3d] hover:bg-[#d1d1d1] active:bg-[#bfbfbf] dark:bg-[#373737] dark:text-white dark:hover:bg-[#424242] dark:active:bg-[#565656]"
      >
        <Icons.minimizeWin className="w-[9px]" />
      </Button>
      <Button
        onClick={maximizeWindow}
        className="m-0 aspect-square h-[24px] cursor-default rounded-full bg-[#dadada] p-0 text-[#3d3d3d] hover:bg-[#d1d1d1] active:bg-[#bfbfbf] dark:bg-[#373737] dark:text-white dark:hover:bg-[#424242] dark:active:bg-[#565656]"
      >
        {!isWindowMaximized ? (
          <Icons.maximizeWin className="h-2 w-2" />
        ) : (
          <Icons.maximizeRestoreWin className="h-[9px] w-[9px]" />
        )}
      </Button>
      <Button
        onClick={closeWindow}
        className="m-0 aspect-square h-[24px] cursor-default rounded-full bg-[#dadada] p-0 text-[#3d3d3d] hover:bg-[#d1d1d1] active:bg-[#bfbfbf] dark:bg-[#373737] dark:text-white dark:hover:bg-[#424242] dark:active:bg-[#565656]"
      >
        <Icons.closeWin className="h-2 w-2" />
      </Button>
    </div>
  )
}
