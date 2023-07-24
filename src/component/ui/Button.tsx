import { cn } from "src/lib/utils"

export function Button({ className, ...props }) {
  return (
    <button
      className={cn("items-center justify-center inline-flex", className)}
      {...props}
    ></button>
  )
}
