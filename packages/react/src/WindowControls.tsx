import { useEffect, useState, type HTMLProps, type ButtonHTMLAttributes } from "react"
import {
  cn,
  createWindowControls,
  detectPlatform,
  styles,
  type Platform,
  type WindowControls as WindowControlsAPI,
  type WindowControlsProps,
} from "@tauri-controls/core"
import { Icons } from "./icons"

function Button({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(styles.baseButton, className)} {...props}>
      {children}
    </button>
  )
}

interface PlatformControlsProps {
  windowApi: WindowControlsAPI
  isMaximized: boolean
  className?: string
}

function WindowsControls({ windowApi, isMaximized, className }: PlatformControlsProps) {
  return (
    <div className={cn(styles.windows.container, className)}>
      <Button onClick={() => windowApi.minimize()} className={styles.windows.button}>
        <Icons.minimizeWin />
      </Button>
      <Button onClick={() => windowApi.maximize()} className={styles.windows.button}>
        {isMaximized ? <Icons.maximizeRestoreWin /> : <Icons.maximizeWin />}
      </Button>
      <Button onClick={() => windowApi.close()} className={styles.windows.closeButton}>
        <Icons.closeWin />
      </Button>
    </div>
  )
}

function MacOSControls({ windowApi, className }: Omit<PlatformControlsProps, "isMaximized">) {
  const [isAltKeyPressed, setIsAltKeyPressed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isFocused, setIsFocused] = useState(() => document.hasFocus())

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Alt") setIsAltKeyPressed(true) }
    const handleKeyUp = (e: KeyboardEvent) => { if (e.key === "Alt") setIsAltKeyPressed(false) }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  useEffect(() => {
    const onFocus = () => setIsFocused(true)
    const onBlur = () => setIsFocused(false)
    window.addEventListener("focus", onFocus)
    window.addEventListener("blur", onBlur)
    return () => {
      window.removeEventListener("focus", onFocus)
      window.removeEventListener("blur", onBlur)
    }
  }, [])

  const dot = (active: string) => isFocused ? active : styles.macos.inactive

  return (
    <div
      className={cn(styles.macos.container, className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Button onClick={() => windowApi.close()} className={cn(styles.macos.button, dot(styles.macos.close))}>
        {isHovering && <Icons.closeMac />}
      </Button>
      <Button onClick={() => windowApi.minimize()} className={cn(styles.macos.button, dot(styles.macos.minimize))}>
        {isHovering && <Icons.minMac />}
      </Button>
      <Button
        onClick={() => (isAltKeyPressed ? windowApi.maximize() : windowApi.fullscreen())}
        className={cn(styles.macos.button, dot(styles.macos.fullscreen))}
      >
        {isHovering && (isAltKeyPressed ? <Icons.plusMac /> : <Icons.fullMac />)}
      </Button>
    </div>
  )
}

function GnomeControls({ windowApi, isMaximized, className }: PlatformControlsProps) {
  return (
    <div className={cn(styles.gnome.container, className)}>
      <Button onClick={() => windowApi.minimize()} className={styles.gnome.button}>
        <Icons.minimizeWin className="h-[9px] w-[9px]" />
      </Button>
      <Button onClick={() => windowApi.maximize()} className={styles.gnome.button}>
        {isMaximized ? <Icons.maximizeRestoreWin className="h-[9px] w-[9px]" /> : <Icons.maximizeWin className="h-2 w-2" />}
      </Button>
      <Button onClick={() => windowApi.close()} className={styles.gnome.button}>
        <Icons.closeWin className="h-2 w-2" />
      </Button>
    </div>
  )
}

export function WindowControls({
  platform: platformOverride,
  justify = false,
  hide = false,
  hideMethod = "display",
  className,
  ...props
}: WindowControlsProps & Omit<HTMLProps<HTMLDivElement>, keyof WindowControlsProps>) {
  const [platform, setPlatform] = useState<Platform>("windows")
  const [isMaximized, setIsMaximized] = useState(false)
  const [windowApi, setWindowApi] = useState<WindowControlsAPI | null>(null)

  useEffect(() => {
    setPlatform(platformOverride ?? detectPlatform())
    const ctrl = createWindowControls()
    setWindowApi(ctrl)
    let cleanup: (() => void) | undefined
    ctrl.onMaximizedChange((maximized) => {
      setIsMaximized(maximized)
    }).then((unlisten) => {
      cleanup = unlisten
    })
    return () => cleanup?.()
  }, [platformOverride])

  if (!windowApi) return null

  const customClass = cn(
    "flex",
    className,
    hide && (hideMethod === "display" ? "hidden" : "invisible"),
    justify && (platform === "macos" ? "ml-0" : "ml-auto")
  )

  switch (platform) {
    case "macos":
      return <MacOSControls windowApi={windowApi} className={customClass} />
    case "gnome":
      return <GnomeControls windowApi={windowApi} isMaximized={isMaximized} className={customClass} />
    default:
      return <WindowsControls windowApi={windowApi} isMaximized={isMaximized} className={customClass} />
  }
}
