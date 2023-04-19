import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, 'src')
      }
    ]
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'https://mock.mengxuegu.com/mock/6412860cfe77f949bc0d7106/myTest',//easyMock
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }

  }
})
