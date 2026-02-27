---
"@tauri-controls/core": major
"tauri-controls": major
"@tauri-controls/solid": major
"@tauri-controls/svelte": major
"@tauri-controls/vue": major
---

Refactor to Core + Adapters architecture with Tauri v2 stable support.

- New `@tauri-controls/core` package with shared logic (OS detection, window API, icons, styles, types)
- All framework adapters (React, Solid, Svelte, Vue) rewritten as thin wrappers around core
- Upgraded to Tauri v2 stable (`@tauri-apps/api ^2.0.0`, `@tauri-apps/plugin-os ^2.0.0`)
- Capabilities now require `core:` prefix for window permissions
- `type()` from `@tauri-apps/plugin-os` is now synchronous
- `getCurrentWindow()` from `@tauri-apps/api/window` replaces legacy imports
