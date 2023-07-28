import { appWindow } from "@tauri-apps/plugin-window"
import { useCallback, useEffect, useState, type HTMLProps } from "react"
import { Button } from "src/tauri-controls/components/button"
import { Icons } from "src/tauri-controls/components/icons"
import { cn } from "src/tauri-controls/libs/utils"

export function Gnome({ className, ...props }: HTMLProps<HTMLDivElement>) {
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
    <div
      className={cn("ml-auto h-full items-center gap-4 px-2", className)}
      {...props}
    >
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
