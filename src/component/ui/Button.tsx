import { cn } from "src/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn("items-center justify-center inline-flex", className)}
      {...props}
    ></button>
  )
}
