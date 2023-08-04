import {
  createSignal,
  onCleanup,
  onMount,
  splitProps,
  type ComponentProps
} from "solid-js"
import { twMerge } from "tailwind-merge"
import { Button } from "../components/button"
import { Icons } from "../components/icons"
import {
  closeWindow,
  fullscreenWindow,
  maximizeWindow,
  minimizeWindow
} from "../libs/plugin-window"

export function MacOS(props: ComponentProps<"div">) {
  const [local, otherProps] = splitProps(props, ["class"])

  const [isAltKeyPressed, setIsAltKeyPressed] = createSignal(false)
  const [isHovering, setIsHovering] = createSignal(false)

  const last = isAltKeyPressed() ? <Icons.plusMac /> : <Icons.fullMac />
  const key = "Alt"

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
  onMount(() => {
    // Attach event listeners when the component mounts
    window.addEventListener("keydown", handleAltKeyDown)
    window.addEventListener("keyup", handleAltKeyUp)
  })

  onCleanup(() => {
    // Remove event listeners when the component unmounts
    window.removeEventListener("keydown", handleAltKeyDown)
    window.removeEventListener("keyup", handleAltKeyUp)
  })

  return (
    <div
      class={twMerge(
        "px-2 text-black active:text-black dark:text-black",
        local.class
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...otherProps}
    >
      <Button
        onClick={closeWindow}
        class="mr-2 aspect-square h-3 w-3 cursor-default content-center items-center justify-center self-center rounded-full border border-black/[.12] bg-[#ff544d] text-center text-black/60 hover:bg-[#ff544d] active:bg-[#bf403a] active:text-black/60 dark:border-none"
      >
        {isHovering() && <Icons.closeMac />}
      </Button>
      <Button
        onClick={minimizeWindow}
        class="mr-2 aspect-square h-3 w-3 cursor-default content-center items-center justify-center self-center rounded-full border border-black/[.12]  bg-[#ffbd2e] text-center text-black/60 hover:bg-[#ffbd2e] active:bg-[#bf9122] active:text-black/60 dark:border-none"
      >
        {isHovering() && <Icons.minMac />}
      </Button>
      <Button
        // onKeyDown={handleAltKeyDown}
        // onKeyUp={handleAltKeyUp}
        onClick={isAltKeyPressed() ? maximizeWindow : fullscreenWindow}
        class="aspect-square h-3 w-3 cursor-default content-center items-center justify-center self-center rounded-full border border-black/[.12] bg-[#28c93f] text-center text-black/60 hover:bg-[#28c93f] active:bg-[#1e9930] active:text-black/60 dark:border-none"
      >
        {isHovering() && last}
      </Button>
    </div>
  )
}
