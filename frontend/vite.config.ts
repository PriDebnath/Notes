import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type PluginOption } from 'vite'
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa'
import routerPlugin, { tanstackRouter } from '@tanstack/router-plugin/vite'

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

const visualizerTyped = () => {
  return visualizer({
    emitFile: true,
    filename: "stats.html",
    open: true,
    gzipSize: true,
    brotliSize: true
  }) as PluginOption
}

export default defineConfig((config) => {
  const { mode } = config
  const isGithub = mode === 'github'

  return {
    // 🔑 BASE URL
    // Android → "./"
    // GitHub Pages → "/Notes/"
    base: isGithub ? '/Notes/' : './',
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
      tailwindcss(),
      routerPlugin(),
      // tanstackRouter({
      //   // Configure for test environment
      //   routesDirectory: './src/routes',
      //   generatedRouteTree: './src/routeTree.gen.ts',
      //   // disableLogging: true,
      // }),
      VitePWA(vitePWAOptions),
      visualizerTyped(),
    ],
    // envDir: "../",
    test: {
      globals: true, // Setting globals: true exposes the describe and it functions on the global object, so you don't need to import them in every test file. 
      environment: 'jsdom',
      //  reporters: ["default", "html"]
      typecheck: { enabled: true },
      watch: isGithub ? false : true,
      // Ensure route tree is generated before tests
      setupFiles: ['./src/test/test-utils.ts'],
      testTimeout: 12000,
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
