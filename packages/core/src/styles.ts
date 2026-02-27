export const styles = {
  windows: {
    container: "h-8",
    button:
      "max-h-8 w-[46px] cursor-default rounded-none bg-transparent text-black/90 hover:bg-black/[.05] active:bg-black/[.03] dark:text-white dark:hover:bg-white/[.06] dark:active:bg-white/[.04]",
    closeButton:
      "max-h-8 w-[46px] cursor-default rounded-none bg-transparent text-black/90 hover:bg-[#c42b1c] hover:text-white active:bg-[#c42b1c]/90 dark:text-white",
  },
  macos: {
    container:
      "space-x-2 px-3 text-black active:text-black dark:text-black",
    button:
      "aspect-square h-3 w-3 cursor-default content-center items-center justify-center self-center rounded-full border border-black/[.12] text-center text-black/60 active:text-black/60 dark:border-none",
    close: "bg-[#ff544d] hover:bg-[#ff544d] active:bg-[#bf403a]",
    minimize: "bg-[#ffbd2e] hover:bg-[#ffbd2e] active:bg-[#bf9122]",
    fullscreen: "bg-[#28c93f] hover:bg-[#28c93f] active:bg-[#1e9930]",
    inactive: "bg-neutral-300 dark:bg-stone-600",
  },
  gnome: {
    container: "mr-[10px] h-auto items-center space-x-[13px]",
    button:
      "m-0 aspect-square h-6 w-6 cursor-default rounded-full bg-[#dadada] p-0 text-[#3d3d3d] hover:bg-[#d1d1d1] active:bg-[#bfbfbf] dark:bg-[#373737] dark:text-white dark:hover:bg-[#424242] dark:active:bg-[#565656]",
  },
  titlebar: "bg-background flex select-none flex-row overflow-hidden",
  baseButton: "inline-flex cursor-default items-center justify-center",
} as const
