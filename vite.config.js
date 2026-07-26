import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/* base — под GitHub Pages, сайт живёт в подкаталоге /<repo>/.
   Все локальные ассеты собираются через import.meta.env.BASE_URL. */
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/giraffe-coffee-concept/' : '/',
  plugins: [react(), tailwindcss()],
})
