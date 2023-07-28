import { appWindow } from "@tauri-apps/plugin-window"
import { useCallback, useEffect, useState, type HTMLProps } from "react"
import { Icons } from "src/tauri-controls/components/icons"
import { cn } from "src/tauri-controls/libs/utils"
import { Button } from "../components/button"

export function MacOS({ className, ...props }: HTMLProps<HTMLDivElement>) {
  const [isWindowMaximized, setIsWindowMaximized] = useState(false)
  const [isAltKeyPressed, setIsAltKeyPressed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const last = isAltKeyPressed ? <Icons.plusMac /> : <Icons.fullMac />
  const key = "Meta"

  if (process.env.NODE_ENV === "production")
    document.addEventListener("contextmenu", (event) => event.preventDefault())

  const handleMouseEnter = () => {
    setIsHovering(true)
  }
  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const handleAltKeyDown = (e: KeyboardEvent) => {
    if (e.key === key) {
      setIsAltKeyPressed(true)
    }
  }
  const handleAltKeyUp = (e: KeyboardEvent) => {
    if (e.key === key) {
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
      className={cn("gap-2 px-4", className)}
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
        // onKeyDown={handleAltKeyDown}
        // onKeyUp={handleAltKeyUp}
        onClick={isAltKeyPressed ? maximizeWindow : fullscreenWindow}
        className="m-0 aspect-square h-3 cursor-default content-center items-center justify-center self-center rounded-full border border-black/[.12] bg-[#28c93f] p-0 text-center text-[#006500] hover:bg-[#28c93f] active:bg-[#1e9930] active:text-[#003000] dark:border-none"
      >
        {isHovering && last}
      </Button>
    </div>
  )
}
