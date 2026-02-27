<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"
import {
  cn,
  createWindowControls,
  detectPlatform,
  icons,
  styles,
  type Platform,
  type WindowControlsProps,
  type WindowControls,
} from "@tauri-controls/core"

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<WindowControlsProps>(), {
  justify: false,
  hide: false,
  hideMethod: "display",
  className: "",
})

const resolvedPlatform = ref<Platform>("windows")
const isMaximized = ref(false)
const isAltKeyPressed = ref(false)
const isHovering = ref(false)
const controls = ref<WindowControls | null>(null)
let unlisten: (() => void) | undefined

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Alt") isAltKeyPressed.value = true
}
const handleKeyUp = (e: KeyboardEvent) => {
  if (e.key === "Alt") isAltKeyPressed.value = false
}

onMounted(async () => {
  resolvedPlatform.value = props.platform ?? detectPlatform()
  const ctrl = createWindowControls()
  controls.value = ctrl
  unlisten = await ctrl.onMaximizedChange((v) => {
    isMaximized.value = v
  })
  window.addEventListener("keydown", handleKeyDown)
  window.addEventListener("keyup", handleKeyUp)
})

onUnmounted(() => {
  unlisten?.()
  window.removeEventListener("keydown", handleKeyDown)
  window.removeEventListener("keyup", handleKeyUp)
})

const customClass = () =>
  cn(
    "flex",
    props.className,
    props.hide && (props.hideMethod === "display" ? "hidden" : "invisible"),
    props.justify && (resolvedPlatform.value === "macos" ? "ml-0" : "ml-auto")
  )
</script>

<template>
  <!-- macOS -->
  <div
    v-if="resolvedPlatform === 'macos'"
    :class="cn(styles.macos.container, customClass())"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <button
      @click="controls?.close()"
      :class="cn(styles.baseButton, styles.macos.button, styles.macos.close)"
    >
      <svg v-if="isHovering" width="6" height="6" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :d="icons.macos.close.path" fill="currentColor" />
      </svg>
    </button>
    <button
      @click="controls?.minimize()"
      :class="cn(styles.baseButton, styles.macos.button, styles.macos.minimize)"
    >
      <svg v-if="isHovering" width="8" height="8" viewBox="0 0 17 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_20_2051)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.47211 1.18042H15.4197C15.8052 1.18042 16.1179 1.50551 16.1179 1.90769V3.73242C16.1179 4.13387 15.8052 4.80006 15.4197 4.80006H1.47211C1.08665 4.80006 0.773926 4.47497 0.773926 4.07278V1.90769C0.773926 1.50551 1.08665 1.18042 1.47211 1.18042Z" fill="currentColor" />
        </g>
      </svg>
    </button>
    <button
      @click="isAltKeyPressed ? controls?.maximize() : controls?.fullscreen()"
      :class="cn(styles.baseButton, styles.macos.button, styles.macos.fullscreen)"
    >
      <template v-if="isHovering">
        <svg v-if="isAltKeyPressed" width="8" height="8" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_20_2053)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5308 9.80147H10.3199V15.0095C10.3199 15.3949 9.9941 15.7076 9.59265 15.7076H7.51555C7.11337 15.7076 6.78828 15.3949 6.78828 15.0095V9.80147H1.58319C1.19774 9.80147 0.88501 9.47638 0.88501 9.07419V6.90619C0.88501 6.50401 1.19774 6.17892 1.58319 6.17892H6.78828V1.06183C6.78828 0.676375 7.11337 0.363647 7.51555 0.363647H9.59265C9.9941 0.363647 10.3199 0.676375 10.3199 1.06183V6.17892H15.5308C15.9163 6.17892 16.229 6.50401 16.229 6.90619V9.07419C16.229 9.47638 15.9163 9.80147 15.5308 9.80147Z" fill="currentColor" />
          </g>
        </svg>
        <svg v-else width="6" height="6" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_20_2057)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.53068 0.433838L15.0933 12.0409C15.0933 12.0409 15.0658 5.35028 15.0658 4.01784C15.0658 1.32095 14.1813 0.433838 11.5378 0.433838C10.6462 0.433838 3.53068 0.433838 3.53068 0.433838ZM12.4409 15.5378L0.87735 3.93073C0.87735 3.93073 0.905794 10.6214 0.905794 11.9538C0.905794 14.6507 1.79024 15.5378 4.43291 15.5378C5.32535 15.5378 12.4409 15.5378 12.4409 15.5378Z" fill="currentColor" />
          </g>
        </svg>
      </template>
    </button>
  </div>

  <!-- Gnome -->
  <div
    v-else-if="resolvedPlatform === 'gnome'"
    :class="cn(styles.gnome.container, customClass())"
  >
    <button @click="controls?.minimize()" :class="cn(styles.baseButton, styles.gnome.button)">
      <svg class="h-[9px] w-[9px]" width="10" height="1" viewBox="0 0 10 1" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :d="icons.windows.minimize.path" fill="currentColor" fill-opacity="0.8956" />
      </svg>
    </button>
    <button @click="controls?.maximize()" :class="cn(styles.baseButton, styles.gnome.button)">
      <svg v-if="isMaximized" class="h-[9px] w-[9px]" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :d="icons.windows.maximizeRestore.path" fill="currentColor" fill-opacity="0.8956" />
      </svg>
      <svg v-else class="h-2 w-2" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :d="icons.windows.maximize.path" fill="currentColor" fill-opacity="0.8956" />
      </svg>
    </button>
    <button @click="controls?.close()" :class="cn(styles.baseButton, styles.gnome.button)">
      <svg class="h-2 w-2" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :d="icons.windows.close.path" fill="currentColor" fill-opacity="0.8956" />
      </svg>
    </button>
  </div>

  <!-- Windows (default) -->
  <div v-else :class="cn(styles.windows.container, customClass())">
    <button @click="controls?.minimize()" :class="cn(styles.baseButton, styles.windows.button)">
      <svg width="10" height="1" viewBox="0 0 10 1" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :d="icons.windows.minimize.path" fill="currentColor" fill-opacity="0.8956" />
      </svg>
    </button>
    <button @click="controls?.maximize()" :class="cn(styles.baseButton, styles.windows.button)">
      <svg v-if="isMaximized" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :d="icons.windows.maximizeRestore.path" fill="currentColor" fill-opacity="0.8956" />
      </svg>
      <svg v-else width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :d="icons.windows.maximize.path" fill="currentColor" fill-opacity="0.8956" />
      </svg>
    </button>
    <button @click="controls?.close()" :class="cn(styles.baseButton, styles.windows.closeButton)">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :d="icons.windows.close.path" fill="currentColor" fill-opacity="0.8956" />
      </svg>
    </button>
  </div>
</template>
