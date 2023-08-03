/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "none",
  plugins: [
    "prettier-plugin-svelte",
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss"
  ],
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }]
}
