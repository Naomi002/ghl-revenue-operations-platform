import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ghl-revenue-operations-platform/', // GitHub Pages base repository path
  server: {
    port: 3000,
    host: true
  }
});
