import { splitProps, type ComponentProps } from "solid-js"
import { twMerge } from "tailwind-merge"
import { Button } from "../components/button"
import { Icons } from "../components/icons"
import {
  closeWindow,
  isWindowMaximized,
  maximizeWindow,
  minimizeWindow,
} from "../libs/plugin-window"

export function Windows(props: ComponentProps<"div">) {
  const [local, otherProps] = splitProps(props, ["class"])

  return (
    <div class={twMerge("h-8", local.class)} {...otherProps}>
      <Button
        onClick={minimizeWindow}
        class="max-h-8 w-[46px] cursor-default rounded-none bg-transparent text-black/90 hover:bg-black/[.05] active:bg-black/[.03]  dark:text-white dark:hover:bg-white/[.06] dark:active:bg-white/[.04]"
      >
        <Icons.minimizeWin />
      </Button>
      <Button
        onClick={maximizeWindow}
        class={twMerge(
          "max-h-8 w-[46px] cursor-default rounded-none bg-transparent",
          "text-black/90 hover:bg-black/[.05] active:bg-black/[.03] dark:text-white dark:hover:bg-white/[.06] dark:active:bg-white/[.04]"
          // !isMaximizable && "text-white/[.36]",
        )}
      >
        {isWindowMaximized() ? (
          <Icons.maximizeRestoreWin />
        ) : (
          <Icons.maximizeWin />
        )}
      </Button>
      <Button
        onClick={closeWindow}
        class="max-h-8 w-[46px] cursor-default rounded-none bg-transparent text-black/90 hover:bg-[#c42b1c] hover:text-white active:bg-[#c42b1c]/90 dark:text-white"
      >
        <Icons.closeWin />
      </Button>
    </div>
  )
}
