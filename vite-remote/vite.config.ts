import { defineConfig, loadEnv } from 'vite'
import path from 'path';
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

  return defineConfig({
    envPrefix: "VUE",
    plugins: [
      vue(),
      federation({
        name: 'synergy-elka-remote',
        filename: 'remoteEntry.js',
        exposes: {
          './HelloWorld': './src/components/HelloWorld.vue',
        },
        shared: ['vue']
      })
    ],

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
      extensions: ['.vue', '.ts', '.js'],
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
    server: {
      host: process.env.VITE_APP_HOST,
      // @ts-ignore
      port: process.env.VITE_APP_PORT,
    },
  });
}
