export interface IWindowControls {
  platform?: "windows" | "macos" | "gnome"
  className?: string
}

export function WindowControls(props: IWindowControls): JSX.Element
