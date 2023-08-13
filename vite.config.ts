import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import react from '@vitejs/plugin-react'
import VitePluginHtmlEnv from 'vite-plugin-html-env'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		react(),
		Pages(),
    VitePluginHtmlEnv(),
    VitePluginHtmlEnv({
      compiler: true
    })
	],
	server: {
		port: 3000,
    proxy: {
      '/api': 'http://localhost:8001',
    },
  },
})
