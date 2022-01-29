import { readdirSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  server: {
      host: true,
      port: 3500,
      https: true
  },
  publicDir: './public',
  build: {
    target: 'es2021',
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: [
        resolve(__dirname, 'index.html'),
        ...readdirSync(
          resolve(__dirname, 'views')
        ).map(file => resolve(__dirname, 'views', file)),
      ]
    },
    assetsDir: 'bundle',
    assetsInlineLimit: 0,
  },
  plugins: [mkcert()]
})