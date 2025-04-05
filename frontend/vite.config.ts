import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
  },
  build: {
    minify: 'terser',
    sourcemap: false, // deactivate sourcemaps for production
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) return 'vendor';
          if (id.includes('UserBurguerMenu')) return 'user-menu';

          if (id.includes('Dashboard')) return 'dashboard';
          if (id.includes('AdminPanel')) return 'admin';
        },
      }
    },
  }
});
