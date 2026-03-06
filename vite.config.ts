import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/ts-js-react-test-gpt54/',
  plugins: [react()],
})
