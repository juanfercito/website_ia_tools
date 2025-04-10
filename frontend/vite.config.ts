import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import removeConsole from 'vite-plugin-remove-console';

export default defineConfig({
  plugins: [react(), removeConsole()],
  server: {
    port: 4000,
  },
  build: {
    minify: 'terser',
    cssCodeSplit: false, // deactivate cssCodeSplit for production
    sourcemap: false, // deactivate sourcemaps for production
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Critical chunks (react + route)
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          // 2) Librerías de estilos separadas
          if (id.includes('node_modules/@emotion') || id.includes('node_modules/styled-components')) {
            return 'vendor-styles';
          }
          // 3) React Router
          if (id.includes('node_modules/react-router-dom')) {
            return 'vendor-router';
          }
          // Specific chunks
          if (id.includes('UserBurguerMenu')) return 'user-menu';
          if (id.includes('AdminPanel') || id.includes('Dashboard')) {
            return 'lazy-components';
          }
        },
      }
    },
  }
});
