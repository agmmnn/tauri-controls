import type { Snippet } from "svelte";
import { type WindowTitlebarProps } from "@tauri-controls/core";
type $$ComponentProps = {
    controlsOrder?: WindowTitlebarProps["controlsOrder"];
    windowControlsProps?: WindowTitlebarProps["windowControlsProps"];
    class?: string;
    children?: Snippet;
};
declare const WindowTitlebar: import("svelte").Component<$$ComponentProps, {}, "">;
type WindowTitlebar = ReturnType<typeof WindowTitlebar>;
export default WindowTitlebar;
