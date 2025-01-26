import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer')
      }
    },
    // build:{
    //   outDir:'dist',
    //   assetsDir:'src/assets',
    //   rollupOptions:{
    //     input: resolve(__dirname, 'src/renderer/index.html')
    //   }
    // },
    plugins: [react()]
  }
})
// electron.vite.config.js
