import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/scientific-calculator/',
  build: {
    outDir: 'dist',
  },
})