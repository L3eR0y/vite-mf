import { defineConfig } from 'vite'
import path from 'path';
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'synergy-elka-remote',
      filename: 'remoteEntry.js',
      exposes: {
        './MainPage': './src/pages/Main/index.vue',
      },
      shared: ['vue', 'pinia']
    })
  ],
  base: 'http://localhost:5173',
  build: {
    target: ["chrome89", "edge89", "firefox89", "safari15"],
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        minifyInternalExports: false
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      "@components": path.resolve(__dirname, "./src/components")
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/styles/scss/index.scss";',
      },
    },
  },
})
