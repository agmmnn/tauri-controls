import { appWindow } from "@tauri-apps/plugin-window"
import { useCallback, useEffect, useState, type HTMLProps } from "react"
import { Icons } from "src/tauri-controls/components/icons"
import { cn } from "src/tauri-controls/libs/utils"
import { Button } from "../components/button"

export function Windows({ className, ...props }: HTMLProps<HTMLDivElement>) {
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
    <div className={cn("ml-auto h-full", className)} {...props}>
      <Button
        onClick={minimizeWindow}
        className="h-[32px] w-[46px] cursor-default rounded-none bg-transparent text-black/90 hover:bg-black/[.05] active:bg-black/[.03]  dark:text-white dark:hover:bg-white/[.06] dark:active:bg-white/[.04]"
      >
        <Icons.minimizeWin />
      </Button>
      <Button
        onClick={maximizeWindow}
        className={cn(
          "h-[32px] w-[46px] cursor-default rounded-none bg-transparent ",
          "text-black/90 hover:bg-black/[.05] active:bg-black/[.03]  dark:text-white dark:hover:bg-white/[.06] dark:active:bg-white/[.04]"
          // !isMaximizable && "text-white/[.36]",
        )}
      >
        {!isWindowMaximized ? (
          <Icons.maximizeWin />
        ) : (
          <Icons.maximizeRestoreWin />
        )}
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
