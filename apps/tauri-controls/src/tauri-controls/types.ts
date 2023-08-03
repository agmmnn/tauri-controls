import type { HTMLProps } from "react"

/**
 * Interface for window controls.
 * If the `platform` property is not specified, the library will automatically detect
 * the operating system the app is running on and display the appropriate elements.
 */
export interface WindowControlsProps extends HTMLProps<HTMLDivElement> {
  /**
   * Specifies which platform's window controls to display.
   * It can be one of "windows", "macos", or "gnome".
   * If the `platform` property is not specified, the library will automatically detect
   * the operating system the app is running on and display the appropriate elements.
   */
  platform?: "windows" | "macos" | "gnome"

  /**
   * Indicates whether the window controls should be shown or hidden.
   * @default false
   */
  hide?: boolean

  /**
   * - "display": "display: none;" making them completely invisible and not taking up any space.
   * - "visibility": "visibility: hidden;" making them invisible but still occupying the same space.
   * @default "display"
   */
  hideMethod?: "display" | "visibility"

  /**
   * Justify/Snap WindowControls
   *
   * @default false, (if not defined in WindowTitlebar automatically assigned)
   */
  justify?: boolean

  /**
   * Specifies the Linux desktop environment for which the window controls are intended.
   * This property is applicable only when the platform is set to "linux".
   * @default "gnome"
   */
  // linuxDesktop?: "gnome" | "kde" | "budgie"

  /**
   * Indicates whether to prevent the right-click context menu.
   * When set to true, it will prevent the default right-click behavior.
   * (only in production, default false)
   */
  // preventRightClickMenu?: "always" | "production"

  /** `data-tauri-drag-region` */
  "data-tauri-drag-region"?: boolean
}

/**
 * Interface for titlebar
 */
export interface WindowTitlebarProps extends HTMLProps<HTMLDivElement> {
  /**
   * The `controlsOrder` property is an optional property used in the `WindowControls` interface.
   * It allows you to specify the order in which the window controls should be rendered relative to the children.
   * (default: system)
   *
   * When `controlsOrder` is not specified or set to `system`, the default behavior will be as follows:
   * - For platforms other than macOS, the controls will be on the right side of the children.
   * - For macOS, the controls will be on the left side of the children (similar to "left" option).
   *
   * Possible values for `controlsOrder`:
   * - "right": The window controls will be rendered to the right of the children.
   * - "left": The window controls will be rendered to the left of the children. This order applies only when the platform is macOS (macOS window controls are usually located on the left side of the title bar).
   * - "platform": for OS-based positioning specified in `windowControlsProps`
   * @default "system"
   */
  controlsOrder?: "right" | "left" | "platform" | "system"

  /**
   * `WindowControls` props
   */
  windowControlsProps?: WindowControlsProps
}
