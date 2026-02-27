<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/agmmnn/tauri-controls/assets/16024979/8ac8cae0-9cde-4b27-af8b-02d949ede7a2">
  <img alt="Shows an illustrated sun in light color mode and a moon with stars in dark color mode." src="https://github.com/agmmnn/tauri-controls/assets/16024979/12f46aa7-72de-4c44-aa4a-0580c73fc73a">
</picture>

![](https://img.shields.io/bundlephobia/min/tauri-controls)
![](https://img.shields.io/bundlephobia/minzip/tauri-controls)
[![](https://img.shields.io/npm/dt/tauri-controls)](https://npmjs.com/package/tauri-controls)

**Tauri Controls** is a library that provides native-looking **window controls** for [Tauri](https://github.com/tauri-apps/tauri) 2 applications. You can enhance the user experience of your Tauri 2 applications with window controls that mimic the identical native controls on the current system.

`tauri-controls` uses Tauri's [js/ts APIs](https://tauri.app/reference/javascript/) to handle window events and provides native-looking (designed according to official system design prototypes) HTML elements — not native, _it does not rely on the system's native APIs_.

Supports **React**, **Solid**, **Svelte**, and **Vue**.

The following designs are taken as reference:

- [Windows UI 3](https://www.figma.com/community/file/1159947337437047524) @microsoft
- [Apple Design Resources - macOS](https://www.figma.com/community/file/1251588934545918753) @apple

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| `tauri-controls` | 1.0.0 | React adapter |
| `@tauri-controls/solid` | 1.0.0 | Solid.js adapter |
| `@tauri-controls/svelte` | 1.0.0 | Svelte adapter |
| `@tauri-controls/vue` | 1.0.0 | Vue adapter |
| `@tauri-controls/core` | 1.0.0 | Shared core (auto-installed) |

## Installation

### React

```bash
npm install tauri-controls
```

### Solid

```bash
npm install @tauri-controls/solid
```

### Svelte

```bash
npm install @tauri-controls/svelte
```

### Vue

```bash
npm install @tauri-controls/vue
```

### Tauri Plugins

Make sure to include the required Tauri plugins in your `src-tauri` directory:

```bash
cargo add tauri-plugin-os
```

Register the plugin in your main function:

```rust
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

Add required permissions to your `src-tauri/capabilities/main.json`:

```json
{
  "identifier": "main-capability",
  "windows": ["main"],
  "permissions": [
    "core:default",
    "core:window:allow-close",
    "core:window:allow-minimize",
    "core:window:allow-maximize",
    "core:window:allow-start-dragging",
    "core:window:allow-toggle-maximize",
    "core:window:allow-set-fullscreen",
    "os:default"
  ]
}
```

## Usage

### WindowControls

Simply add the `WindowControls` component to your code:

```tsx
// React
import { WindowControls } from "tauri-controls"

// Solid
import { WindowControls } from "@tauri-controls/solid"

// Svelte
import { WindowControls } from "@tauri-controls/svelte"

// Vue
import { WindowControls } from "@tauri-controls/vue"
```

```tsx
function MyTitlebar() {
  return <WindowControls />
}
```

![](https://github.com/agmmnn/tauri-controls/assets/16024979/7be3dde4-7953-4188-af12-abd4445c0bf9)

When no platform is specified, the current system will be detected and the matching element will be returned. Great for cross-platform releases.

### WindowTitlebar

`WindowTitlebar` handles the window controls and dynamically adjusts the control buttons and titlebar content order based on the current operating system.

```tsx
import { WindowTitlebar } from "tauri-controls"

function MyTitlebar() {
  return (
    <WindowTitlebar>{/* Place your titlebar content here */}</WindowTitlebar>
  )
}
```

![](https://github.com/agmmnn/tauri-controls/assets/16024979/214677d4-dd70-4e6b-96c3-b9d1a1356f05)

### Props

```ts
// WindowTitlebar:
controlsOrder?: "right" | "left" | "platform" | "system"
windowControlsProps?: WindowControlsProps

// WindowControls:
platform?: "windows" | "macos" | "gnome"
hide?: boolean
hideMethod?: "display" | "visibility"
justify?: boolean
className?: string
```

You can also pass additional props to elements like `data-tauri-drag-region` for further enhancements.

### Examples

```tsx
<WindowControls platform="macos" className="my-4" />
```

![](https://i.imgur.com/OAO22HC.png)

```tsx
<WindowControls platform="windows" className="w-full justify-end" />
```

![](https://i.imgur.com/hq389kn.png)

## Architecture

This project uses a **Core + Adapters** architecture:

```
packages/
├── core/       # @tauri-controls/core — shared logic, styles, icons, types
├── react/      # tauri-controls — React adapter
├── solid/      # @tauri-controls/solid — Solid.js adapter
├── svelte/     # @tauri-controls/svelte — Svelte adapter
└── vue/        # @tauri-controls/vue — Vue adapter
```

The core package contains all framework-agnostic logic (OS detection, Tauri window API, icon SVGs, Tailwind style tokens, shared types). Each framework adapter is a thin wrapper (~50-80 lines) that maps core functionality to framework-specific reactivity.

## Figma

Check out the design implementation on Figma for a visual reference. [Desktop Native Window Controls - Figma](https://www.figma.com/file/ms2vbZx5lEGxHqHR8fAfQm/Desktop-Native-Window-Controls?type=design&node-id=4%3A6020&mode=design&t=PIbVTsr8zWmIFsNr-1).

## Dev

```bash
# Install dependencies
bun install

# Build all packages
bun turbo run build --filter='./packages/*'

# Run a demo app
bun turbo run tauri:dev --filter=tauri-controls-demo-react
```

```
.
├── /packages
│   ├── /core         # @tauri-controls/core
│   ├── /react        # tauri-controls
│   ├── /solid        # @tauri-controls/solid
│   ├── /svelte       # @tauri-controls/svelte
│   └── /vue          # @tauri-controls/vue
├── /apps
│   ├── /tauri-controls           # React demo
│   ├── /tauri-controls-solid     # Solid demo
│   ├── /tauri-controls-svelte    # Svelte demo
│   └── /tauri-controls-vue       # Vue demo
├── package.json
└── turbo.json
```

## Further Reading

- [Feature request: Add setting for titlebar style with native window controls support - tauri-apps/tauri#2663](https://github.com/tauri-apps/tauri/issues/2663)
- [Window Controls Overlay for Installed Desktop Web Apps - WICG](https://github.com/WICG/window-controls-overlay/blob/main/explainer.md)
- [Window Controls Overlay - Electron](https://www.electronjs.org/docs/latest/tutorial/window-customization#window-controls-overlay-macos-windows)
- [Window Controls Overlay API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window_Controls_Overlay_API)

## License

MIT
