import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      // Run `php -S localhost:8000` from the repo root to test the
      // reservation form locally against the real PHP endpoint.
      '/php': 'http://localhost:8000',
    },
  },
});
