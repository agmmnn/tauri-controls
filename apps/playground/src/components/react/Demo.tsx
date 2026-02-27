import { WindowControls, WindowTitlebar } from "tauri-controls"

export default function ReactDemo() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h3 className="text-sm text-gray-400 mb-2">WindowTitlebar</h3>
        <WindowTitlebar className="bg-gray-800 rounded">
          <span className="text-white text-sm pl-3">React Titlebar</span>
        </WindowTitlebar>
      </div>

      <div>
        <h3 className="text-sm text-gray-400 mb-2">WindowControls</h3>
        <div className="flex gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">platform="windows"</p>
            <WindowControls platform="windows" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">platform="macos"</p>
            <WindowControls platform="macos" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">platform="gnome"</p>
            <WindowControls platform="gnome" />
          </div>
        </div>
      </div>
    </div>
  )
}
