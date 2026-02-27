import { getCurrentWindow } from "@tauri-apps/api/window"
import { PhysicalSize } from "@tauri-apps/api/dpi"
import { detectPlatform } from "./platform"

export interface WindowControls {
  minimize: () => Promise<void>
  maximize: () => Promise<void>
  close: () => Promise<void>
  fullscreen: () => Promise<void>
  startDrag: () => Promise<void>
  isMaximized: () => Promise<boolean>
  onMaximizedChange: (
    cb: (maximized: boolean) => void
  ) => Promise<() => void>
}

const noop = async () => {}

function createNoopControls(): WindowControls {
  return {
    minimize: noop,
    maximize: noop,
    close: noop,
    fullscreen: noop,
    startDrag: noop,
    isMaximized: async () => false,
    onMaximizedChange: async () => () => {},
  }
}

// Tauri v2 has no isSimpleFullscreen() getter — track it locally
let simpleFullscreenActive = false

// Shared maximized state — single listener for all WindowControls instances
const subscribers = new Set<(maximized: boolean) => void>()
let currentMaximized: boolean | undefined
let listenerActive = false
let unlistenFocus: (() => void) | undefined

function notifySubscribers(maximized: boolean) {
  if (maximized === currentMaximized) return
  currentMaximized = maximized
  for (const cb of subscribers) {
    cb(maximized)
  }
}

async function ensureListener() {
  if (listenerActive) return
  listenerActive = true

  try {
    const win = getCurrentWindow()
    currentMaximized = await win.isMaximized()

    // Use onFocusChanged instead of onResized to avoid IPC storms during macOS animations.
    // When the window regains focus (after exiting fullscreen/maximize), check state once.
    unlistenFocus = await win.onFocusChanged(async ({ payload: focused }) => {
      if (focused) {
        try {
          const maximized = await win.isMaximized()
          notifySubscribers(maximized)
        } catch {}
      }
    })
  } catch {
    listenerActive = false
  }
}

function teardownListener() {
  if (unlistenFocus) {
    unlistenFocus()
    unlistenFocus = undefined
  }
  listenerActive = false
  currentMaximized = undefined
}

function subscribe(cb: (maximized: boolean) => void): () => void {
  subscribers.add(cb)
  if (currentMaximized !== undefined) {
    cb(currentMaximized)
  }
  ensureListener()

  return () => {
    subscribers.delete(cb)
    if (subscribers.size === 0) {
      teardownListener()
    }
  }
}

export function createWindowControls(): WindowControls {
  try {
    const win = getCurrentWindow()

    return {
      minimize: () => win.minimize(),
      maximize: async () => {
        // Register listener before toggling so we don't miss the first resize event.
        // Debounce on onResized to detect when the macOS zoom animation actually stops,
        // then refocus the webview to restore pointer/hover events.
        let unlisten: (() => void) | undefined
        let debounce: ReturnType<typeof setTimeout> | undefined
        let safety: ReturnType<typeof setTimeout>
        let finished = false

        const finish = async () => {
          if (finished) return
          finished = true
          unlisten?.()
          clearTimeout(debounce)
          clearTimeout(safety)
          try {
            // After zoom animation, WKWebView's NSTrackingArea is registered for the
            // old bounds. A 1px resize triggers setFrame: → updateTrackingAreas,
            // re-registering tracking for the new bounds and restoring hover/mouse events.
            const size = await win.outerSize()
            await win.setSize(new PhysicalSize(size.width + 1, size.height))
            await win.setSize(new PhysicalSize(size.width, size.height))
            const maximized = await win.isMaximized()
            notifySubscribers(maximized)
          } catch {}
        }

        unlisten = await win.onResized(() => {
          clearTimeout(debounce)
          debounce = setTimeout(finish, 50)
        })

        // Safety: if no resize events fire within 600ms, finish anyway
        safety = setTimeout(finish, 600)

        await win.toggleMaximize()
      },
      close: () => win.close(),
      fullscreen: async () => {
        if (detectPlatform() === "macos") {
          // Tauri v2 has no isSimpleFullscreen() — track state locally.
          // isFullscreen() returns false while in simple fullscreen, so we can't use it.
          simpleFullscreenActive = !simpleFullscreenActive
          await win.setSimpleFullscreen(simpleFullscreenActive)
        } else {
          const isFs = await win.isFullscreen()
          await win.setFullscreen(!isFs)
        }
      },
      startDrag: () => win.startDragging(),
      isMaximized: () => win.isMaximized(),
      onMaximizedChange: async (cb) => {
        return subscribe(cb)
      },
    }
  } catch {
    return createNoopControls()
  }
}
