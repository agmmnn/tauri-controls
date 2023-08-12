<script setup lang="ts">
import { twMerge } from "tailwind-merge"
</script>
<template>
  <button
    :class="
      twMerge(
        'inline-flex cursor-default items-center justify-center',
        $attrs.class as string
      )
    "
  >
    <slot />
  </button>
</template>
