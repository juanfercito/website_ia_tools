import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import removeConsole from 'vite-plugin-remove-console';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), removeConsole()],
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
          if (id.includes('node_modules/react')) return 'vendor-react';
          if (id.includes('node_modules/react-router-dom')) return 'vendor-react-router-dom';
          if (id.includes('styled-components')) return 'vendor-styled-components';

          if (id.includes('UserBurguerMenu')) return 'user-menu';
          if (id.includes('Dashboard')) return 'dashboard';
          if (id.includes('AdminPanel')) return 'admin';
        },
      }
    },
  }
});
