import "./style.css"
import React, { useState } from "react"
import { WindowControls } from "./tauri-controls/window-controls"
import { WindowTitlebar } from "./tauri-controls/window-titlebar"

function App() {
  return (
    <div>
      <div className="flex w-[960px] flex-col gap-3 px-14 py-6">
        <ThemeSwitch />
        <span className="w-fit rounded bg-violet-200/20 px-2 font-mono">
          tauri-controls
        </span>
        <span className="w-fit border-b border-slate-400 pb-1 pr-10 dark:border-slate-600">
          WindowControls
        </span>
        {/* OnlyControls */}
        <div className="flex w-fit gap-3 rounded-xl border border-dashed border-slate-400 p-3  shadow dark:border-slate-600">
          {platforms.map((x) => (
            <OnlyControls key={x} platform={x} />
          ))}
        </div>
        <WindowTitlebar>content</WindowTitlebar>
        OnlyControls (Justify/Snap):
        <div className="flex border" data-tauri-drag-region>
          <WindowControls platform="windows" justify={true} />
        </div>
        <div className="flex border" data-tauri-drag-region>
          <WindowControls platform="macos" justify={true} />
        </div>
        <span className="w-fit border-b border-slate-400 pb-1 pr-10 dark:border-slate-600">
          WindowTitlebar
        </span>
        {/* Icon+Title Controls */}
        {platforms.map((x) => (
          <IMC key={x} platform={x} />
        ))}
        {/* Icon Menu Title Controls */}
        {platforms.map((x) => (
          <IMTC key={x} platform={x} />
        ))}
        <WindowTitlebar
          controlsOrder="right"
          windowControlsProps={{
            platform: "macos",
            className: "bg-rose-700 rounded-full p-2",
          }}
        >
          <div className="flex items-center justify-center rounded-full bg-sky-500 px-2">
            titlebar content without w-full (macos but on the right side)
          </div>
        </WindowTitlebar>
        <WindowTitlebar
          controlsOrder="left"
          windowControlsProps={{
            platform: "windows",
            className: "bg-rose-700 rounded-full overflow-hidden",
          }}
        >
          <div className="flex items-center justify-center rounded-full bg-sky-500 px-2">
            titlebar content without w-full (windows but on the left side)
          </div>
        </WindowTitlebar>
      </div>
    </div>
  )
}

const Content = () => {
  const Inside = () => (
    <span className="border border-black/[.07]">Content</span>
  )
  return (
    <>
      <div className="flex w-full items-center justify-center bg-yellow-300">
        <Inside />
      </div>
      <div className="flex w-full items-center justify-center bg-rose-300">
        <Inside />
      </div>
      <div className="flex w-[1300px] items-center justify-center bg-sky-300">
        <Inside />
      </div>
    </>
  )
}

const platforms = ["windows", "macos", "gnome"]

const OnlyControls = ({ platform }: any) => {
  return <WindowControls platform={platform} />
}

/* Icon+Title Controls */
const IMC = ({ platform }: any) => {
  return (
    <WindowTitlebar
      controlsOrder="platform"
      className="h-10 rounded-t-lg border border-dashed border-slate-400  bg-white shadow dark:border-slate-600 dark:bg-slate-800"
      windowControlsProps={{ platform: platform, className: "" }}
    >
      <div
        className="flex h-full w-full items-center justify-center"
        data-tauri-drag-region
      >
        <LogoSvg />
        Title
      </div>
    </WindowTitlebar>
  )
}

/* Icon Menu Title Controls */
const IMTC = ({ platform }: any) => {
  return (
    <WindowTitlebar
      controlsOrder="platform"
      className="h-10 rounded-t-lg  bg-white shadow dark:bg-slate-800"
      windowControlsProps={{
        platform: platform,
      }}
      data-tauri-drag-region
    >
      <div className="ml-3 flex items-center" data-tauri-drag-region>
        <LogoSvg />
        <Menu />
      </div>

      <div
        className="flex w-full items-center justify-center"
        data-tauri-drag-region
      >
        Title
      </div>
    </WindowTitlebar>
  )
}

const Menu = () => {
  const items = ["File", "Edit", "View", "Account", "Theme"]

  return (
    <div className="flex flex-row gap-2 whitespace-nowrap rounded-md px-2 py-1 shadow">
      {items.map((x) => (
        <span key={x}>{x}</span>
      ))}
    </div>
  )
}

const ThemeSwitcher = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  const handleToggleTheme = () => {
    setIsDarkTheme((prevState) => !prevState)
  }

  // Add the "dark" class to the <html> element based on the theme selection
  if (isDarkTheme) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }

  return (
    <div className="flex items-center gap-1 pt-6">
      <label htmlFor="theme-toggle">Dark Theme:</label>
      <input
        type="checkbox"
        id="theme-toggle"
        checked={isDarkTheme}
        onChange={handleToggleTheme}
        className="h-4 w-4"
      />
    </div>
  )
}

const ThemeSwitch = () => {
  function toggle() {
    document.documentElement.classList.toggle("dark")
  }

  return (
    <button
      className="fixed right-1 top-1 rounded-xl bg-slate-300 p-2 font-mono font-semibold shadow dark:bg-slate-950/50"
      onClick={toggle}
    >
      Toggle Theme
    </button>
  )
}

const LogoSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-sailboat mr-2 text-sky-600/70 dark:text-sky-300/70"
  >
    <path d="M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z" />
    <path d="M21 14 10 2 3 14h18Z" />
    <path d="M10 2v16" />
  </svg>
)

export default App
