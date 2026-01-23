import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import routerPlugin  from '@tanstack/router-plugin/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: "/Notes/", // 👈 EXACT repo name (for github pages)
  plugins: [
    routerPlugin(), // Generate the router code
    react(
      {
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }
    ),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
