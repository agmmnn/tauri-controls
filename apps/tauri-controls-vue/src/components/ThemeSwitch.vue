<script setup lang="ts">
const toggle = () => {
  document.documentElement.classList.toggle("dark")
}
</script>

<template>
  <button
    class="fixed right-1 top-1 rounded-xl bg-slate-300 p-2 font-mono font-semibold shadow dark:bg-slate-950/50"
    @click="toggle"
  >
    Toggle Theme
  </button>
</template>
