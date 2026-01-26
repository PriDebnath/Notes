import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'
import routerPlugin from '@tanstack/router-plugin/vite'

export default defineConfig(({ mode }) => {
  const isGithub = mode === 'github'

  return {
    // 🔑 BASE URL
    // Android → "./"
    // GitHub Pages → "/Notes/"
    base: isGithub ? '/Notes/' : './',

    plugins: [
      routerPlugin(),

      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),

      tailwindcss(),

      VitePWA({
        registerType: 'autoUpdate',

        includeAssets: [
          'logo/favicon-32x32.png',
          'logo/android-chrome-192x192.png',
          'logo/android-chrome-512x512.png',
        ],

        manifest: {
          name: 'Notes',
          short_name: 'Notes',
          description: 'Personal notes you want to revisit',

          // 🔑 RELATIVE → works everywhere
          start_url: '.',
          scope: '.',

          display: 'standalone',
          theme_color: '#000000',
          background_color: '#ffffff',

          icons: [
            {
              src: 'logo/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'logo/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
