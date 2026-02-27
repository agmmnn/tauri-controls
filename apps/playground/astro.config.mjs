import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import solid from "@astrojs/solid-js"
import svelte from "@astrojs/svelte"
import vue from "@astrojs/vue"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  integrations: [
    react({
      include: ["**/react/*"],
    }),
    solid({
      include: ["**/solid/*"],
    }),
    svelte(),
    vue(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
