<script>
  function toggle() {
    document.documentElement.classList.toggle("dark")
  }
</script>

<button
  class="dark:bg-slate-950/50 bg-slate-300 rounded-xl p-2 shadow font-mono font-semibold fixed top-1 right-1"
  on:click={toggle}
>
  Toggle Theme
</button>
