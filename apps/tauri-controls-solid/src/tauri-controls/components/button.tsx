import { splitProps, type ComponentProps } from "solid-js"
import { twMerge } from "tailwind-merge"

export function Button(props: ComponentProps<"button">) {
  const [local, otherProps] = splitProps(props, ["class", "children"])
  return (
    <button
      class={twMerge(
        "inline-flex cursor-default items-center justify-center",
        local.class
      )}
      {...otherProps}
    >
      {local.children}
    </button>
  )
}
