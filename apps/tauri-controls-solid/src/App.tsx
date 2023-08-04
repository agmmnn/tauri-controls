import "./style.css"
import { For } from "solid-js"
import { WindowControls } from "./tauri-controls/window-controls"
import { WindowTitlebar } from "./tauri-controls/window-titlebar"

function App() {
  return (
    <div>
      <div class="flex w-[960px] flex-col gap-3 px-14 py-6">
        <ThemeSwitch />
        <span class="w-fit rounded bg-violet-200/20 px-2 font-mono">
          @tauri-controls/solid
        </span>
        <span class="w-fit border-b border-slate-400 pb-1 pr-10 text-lg font-semibold dark:border-slate-600">
          WindowControls
        </span>
        {/* OnlyControls */}
        <div class="flex w-fit gap-3 rounded-xl border border-dashed border-slate-400 p-3  shadow dark:border-slate-600">
          <For each={platforms}>{(x) => <OnlyControls platform={x} />}</For>
        </div>
        justify=true:
        <div class="flex border" data-tauri-drag-region>
          <WindowControls platform="windows" justify={true} />
        </div>
        <div class="flex border" data-tauri-drag-region>
          <WindowControls platform="macos" justify={true} />
        </div>
        <span class="w-fit border-b border-slate-400 pb-1 pr-10 text-lg font-semibold dark:border-slate-600">
          WindowTitlebar
        </span>
        <WindowTitlebar class="border">content</WindowTitlebar>
        {/* Icon+Title Controls */}
        <For each={platforms}>{(x) => <IMC platform={x} />}</For>
        {/* Icon Menu Title Controls */}
        <For each={platforms}>{(x) => <IMTC platform={x} />}</For>
        <WindowTitlebar
          controlsOrder="right"
          windowControlsProps={{
            platform: "macos",
            class: "bg-rose-700 rounded-full p-2",
          }}
        >
          <div class="flex items-center justify-center rounded-full bg-sky-500 px-2">
            titlebar content without w-full (macos but on the right side)
          </div>
        </WindowTitlebar>
        <WindowTitlebar
          controlsOrder="left"
          windowControlsProps={{
            platform: "windows",
            class: "bg-rose-700 rounded-full overflow-hidden",
          }}
        >
          <div class="flex items-center justify-center rounded-full bg-sky-500 px-2">
            titlebar content without w-full (windows but on the left side)
          </div>
        </WindowTitlebar>
      </div>
    </div>
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
      class="h-10 rounded-t-lg border border-dashed border-slate-400  bg-white shadow dark:border-slate-600 dark:bg-slate-800"
      windowControlsProps={{ platform: platform, class: "" }}
    >
      <div
        class="flex h-full w-full items-center justify-center"
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
      class="h-10 rounded-t-lg  bg-white shadow dark:bg-slate-800"
      windowControlsProps={{
        platform: platform,
      }}
      data-tauri-drag-region
    >
      <div class="ml-3 flex items-center" data-tauri-drag-region>
        <LogoSvg />
        <Menu />
      </div>

      <div
        class="flex w-full items-center justify-center"
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
    <div class="flex flex-row gap-2 whitespace-nowrap rounded-md px-2 py-1 shadow">
      <For each={items}>{(x) => <span>{x}</span>}</For>
    </div>
  )
}

const ThemeSwitch = () => {
  function toggle() {
    document.documentElement.classList.toggle("dark")
  }

  return (
    <button
      class="fixed right-1 top-1 rounded-xl bg-slate-300 p-2 font-mono font-semibold shadow dark:bg-slate-950/50"
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
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-sailboat mr-2 text-sky-600/70 dark:text-sky-300/70"
  >
    <path d="M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z" />
    <path d="M21 14 10 2 3 14h18Z" />
    <path d="M10 2v16" />
  </svg>
)

export default App
