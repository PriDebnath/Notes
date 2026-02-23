import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import routerPlugin from '@tanstack/router-plugin/vite'
import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa'

const vitePWAOptions: Partial<VitePWAOptions> = {
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
}

export default defineConfig(({ mode }) => {
  const isGithub = mode === 'github'

  return {
    // 🔑 BASE URL
    // Android → "./"
    // GitHub Pages → "/Notes/"
    base: isGithub ? '/Notes/' : './',
    test: {
      globals: true, // Setting globals: true exposes the describe and it functions on the global object, so you don't need to import them in every test file. 
      environment: 'jsdom',
        //  reporters: ["default", "html"]

      // setupFiles: './test-setup.ts',
    },
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
      tailwindcss(),
      routerPlugin(),
      VitePWA(vitePWAOptions),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
