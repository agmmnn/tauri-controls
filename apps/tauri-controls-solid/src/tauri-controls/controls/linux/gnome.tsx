import { splitProps, type ComponentProps } from "solid-js"
import { twMerge } from "tailwind-merge"
import { Button } from "../../components/button"
import { Icons } from "../../components/icons"
import {
  closeWindow,
  isWindowMaximized,
  maximizeWindow,
  minimizeWindow
} from "../../libs/plugin-window"

export function Gnome(props: ComponentProps<"div">) {
  const [local, otherProps] = splitProps(props, ["class"])

  return (
    <div
      class={twMerge("h-auto items-center px-2", local.class)}
      {...otherProps}
    >
      <Button
        onClick={minimizeWindow}
        class="m-0 mr-4 aspect-square h-6 w-6 cursor-default rounded-full bg-[#dadada] p-0 text-[#3d3d3d] hover:bg-[#d1d1d1] active:bg-[#bfbfbf] dark:bg-[#373737] dark:text-white dark:hover:bg-[#424242] dark:active:bg-[#565656]"
      >
        <Icons.minimizeWin class="w-[9px]" />
      </Button>
      <Button
        onClick={maximizeWindow}
        class="m-0 mr-4 aspect-square h-6 w-6 cursor-default rounded-full bg-[#dadada] p-0 text-[#3d3d3d] hover:bg-[#d1d1d1] active:bg-[#bfbfbf] dark:bg-[#373737] dark:text-white dark:hover:bg-[#424242] dark:active:bg-[#565656]"
      >
        {isWindowMaximized() ? (
          <Icons.maximizeRestoreWin class="h-[9px] w-[9px]" />
        ) : (
          <Icons.maximizeWin class="h-2 w-2" />
        )}
      </Button>
      <Button
        onClick={closeWindow}
        class="m-0 aspect-square h-6 w-6 cursor-default rounded-full bg-[#dadada] p-0 text-[#3d3d3d] hover:bg-[#d1d1d1] active:bg-[#bfbfbf] dark:bg-[#373737] dark:text-white dark:hover:bg-[#424242] dark:active:bg-[#565656]"
      >
        <Icons.closeWin class="h-2 w-2" />
      </Button>
    </div>
  )
}
