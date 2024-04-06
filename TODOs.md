# TODOs / Known Issues:

> Ticked items have been implemented or fixed.

### tauri-controls (General):

- [x] Auto-determine controls position if no platform is specified (e.g., MacOS left, others right).
- [x] Next.js/SSR support.
- [x] Svelte/SvelteKit implementation.
- [ ] Detect disabled window controls and disable the buttons accordingly. [#7](https://github.com/agmmnn/tauri-controls/issues/7)
- [ ] \[macOS] Adjust max icon behavior when window is fullscreen. [📷](https://i.imgur.com/7FmMOZN.png)
- [ ] Extend support to other Linux DEs' default themes, Budgie/KDE.
- [ ] \[macOS] Option to hide controls -like `hide` but- only if the window is fullscreen and on macOS.

### tauri-controls (React):

- [ ] \[macOS] IsWindowMaximized not work on macOS (react, solid). [#10](https://github.com/agmmnn/tauri-controls/issues/10)

### @tauri-controls/svelte:

- [ ] Maximize icon does not change to "Unmaximize" when the window is maximized.

### @tauri-controls/solid:

- [ ] \[macOS] IsWindowMaximized not work on macOS (react, solid). [#10](https://github.com/agmmnn/tauri-controls/issues/10)

### @tauri-controls/vue:

- [x] Maximize icon does not change when the window is maximized by double clicking on the titlebar (data-tauri-drag-region).
