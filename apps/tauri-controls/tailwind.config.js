/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/core/src/**/*.ts",
    "../../packages/react/src/**/*.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
