import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import svgr from 'vite-plugin-svgr';
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true, routesDirectory: "./src/app/routes" }),
    react(),
    tailwindcss(),
    svgr(),
  ],

  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },

  server: {
    host: true,
    port: 3000,
    watch: { usePolling: true },
  },
})
