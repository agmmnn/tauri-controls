<script setup lang="ts">
import { onKeyStroke, useMouseInElement } from "@vueuse/core"
import { twMerge } from "tailwind-merge"
import { ref } from "vue"
import Button from "../components/Button.vue"
import Icons from "../components/Icons.vue"
import {
  closeWindow,
  fullscreenWindow,
  maximizeWindow,
  minimizeWindow,
} from "../utils/window"

const winBtns = ref(null)
const { isOutside } = useMouseInElement(winBtns)

const isAltKeyPressed = ref(false)
onKeyStroke(
  "Alt",
  () => {
    isAltKeyPressed.value = true
  },
  { eventName: "keydown" }
)
onKeyStroke(
  "Alt",
  () => {
    isAltKeyPressed.value = false
  },
  { eventName: "keyup" }
)
</script>

<template>
  <div
    ref="winBtns"
    :class="
      twMerge(
        'space-x-2 px-3 text-black active:text-black dark:text-black',
        $attrs.class as string
      )
    "
  >
    <Button
      @click="closeWindow"
      class="aspect-square h-3 w-3 content-center items-center justify-center self-center rounded-full border border-black/[.12] bg-[#ff544d] text-center text-black/60 hover:bg-[#ff544d] active:bg-[#bf403a] active:text-black/60 dark:border-none"
    >
      <Icons icon="closeMac" v-if="!isOutside" />
    </Button>
    <Button
      @click="minimizeWindow"
      class="aspect-square h-3 w-3 content-center items-center justify-center self-center rounded-full border border-black/[.12] bg-[#ffbd2e] text-center text-black/60 hover:bg-[#ffbd2e] active:bg-[#bf9122] active:text-black/60 dark:border-none"
    >
      <Icons icon="minMac" v-if="!isOutside" />
    </Button>
    <Button
      @click="isAltKeyPressed ? maximizeWindow() : fullscreenWindow()"
      class="aspect-square h-3 w-3 content-center items-center justify-center self-center rounded-full border border-black/[.12] bg-[#28c93f] text-center text-black/60 hover:bg-[#28c93f] active:bg-[#1e9930] active:text-black/60 dark:border-none"
    >
      <template v-if="!isOutside">
        <Icons icon="plusMac" v-if="isAltKeyPressed" />
        <Icons icon="fullMac" v-else />
      </template>
    </Button>
  </div>
</template>
