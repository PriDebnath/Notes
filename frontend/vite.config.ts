import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'
import routerPlugin from '@tanstack/router-plugin/vite'

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
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'Notes/logo/favicon-32x32.png',
        'Notes/logo/android-chrome-192x192.png',
        'Notes/logo/android-chrome-512x512.png'
      ]
      ,
      manifest: {
        name: 'Notes',
        short_name: 'Notes',
        description: 'Personal notes you want to revisit',
        start_url: '/Notes/',
        scope: '/Notes/',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#ffffff',
        icons: [
          {
            src: '/Notes/logo/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/Notes/logo/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]

      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
