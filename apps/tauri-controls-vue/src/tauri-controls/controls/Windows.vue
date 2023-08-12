<script setup lang="ts">
import { twMerge } from "tailwind-merge"
import Button from "../components/Button.vue"
import Icons from "../components/Icons.vue"
import {
  closeWindow,
  isWindowMaximized,
  maximizeWindow,
  minimizeWindow,
} from "../utils/window"
</script>

<template>
  <div :class="twMerge('h-8', $attrs.class as string)">
    <Button
      @click="minimizeWindow"
      class="max-h-8 w-[46px] cursor-default rounded-none bg-transparent text-black/90 hover:bg-black/[.05] active:bg-black/[.03] dark:text-white dark:hover:bg-white/[.06] dark:active:bg-white/[.04]"
    >
      <Icons icon="minimizeWin" />
    </Button>
    <Button
      @click="maximizeWindow"
      :class="
        twMerge(
          'max-h-8 w-[46px] cursor-default rounded-none bg-transparent',
          'text-black/90 hover:bg-black/[.05] active:bg-black/[.03] dark:text-white dark:hover:bg-white/[.06] dark:active:bg-white/[.04]'
        )
      "
    >
      <Icons icon="maximizeRestoreWin" v-if="isWindowMaximized" />
      <Icons icon="maximizeWin" v-else />
    </Button>
    <Button
      @click="closeWindow"
      class="max-h-8 w-[46px] cursor-default rounded-none bg-transparent text-black/90 hover:bg-[#c42b1c] hover:text-white active:bg-[#c42b1c]/90 dark:text-white"
    >
      <Icons icon="closeWin" />
    </Button>
  </div>
</template>
