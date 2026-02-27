<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import {
  cn,
  detectPlatform,
  styles,
  type Platform,
  type WindowTitlebarProps,
} from "@tauri-controls/core"
import WindowControls from "./WindowControls.vue"

const props = withDefaults(defineProps<WindowTitlebarProps & { class?: string }>(), {
  controlsOrder: "system",
})

const platform = ref<Platform>("windows")

onMounted(() => {
  platform.value = detectPlatform()
})

const left = computed(() =>
  props.controlsOrder === "left" ||
  (props.controlsOrder === "platform" && props.windowControlsProps?.platform === "macos") ||
  (props.controlsOrder === "system" && platform.value === "macos")
)

const controlsProps = computed(() => ({
  ...props.windowControlsProps,
  justify: false,
  className: cn(props.windowControlsProps?.className, left.value ? "ml-0" : "ml-auto"),
}))
</script>

<template>
  <div :class="cn(styles.titlebar, props.class)" data-tauri-drag-region>
    <template v-if="left">
      <WindowControls v-bind="controlsProps" />
      <slot />
    </template>
    <template v-else>
      <slot />
      <WindowControls v-bind="controlsProps" />
    </template>
  </div>
</template>
