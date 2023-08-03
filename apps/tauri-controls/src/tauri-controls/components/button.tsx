import type { ButtonHTMLAttributes } from "react"
import { cn } from "src/tauri-controls/libs/utils"

export function Button({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex cursor-default items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
