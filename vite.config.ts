import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative asset paths for universal hosting compatibility (GitHub Pages, Vercel, Netlify)
  server: {
    port: 3000,
    host: true
  }
});
