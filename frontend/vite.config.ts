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
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Critical chunks (react + route)
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          // Style libraries
          if (id.includes('node_modules/@emotion') || id.includes('node_modules/styled-components')) {
            return 'vendor-styles';
          }
          // React Router
          if (id.includes('node_modules/react-router-dom')) {
            return 'vendor-router';
          }
          // Specific chunks
          if (id.includes('UserBurguerMenu')) return 'user-menu';
          if (id.includes('AdminPanel') || id.includes('Dashboard')) {
            return 'lazy-components';
          }
          // CSS chunks by feature
          if (id.includes('UserMainPanel.css')) {
            return 'layout-styles';
          }
          if (id.includes('userSettingsViews.css')) {
            return 'settings-styles';
          }
          if (id.includes('authViews.css')) {
            return 'auth-styles';
          }
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          if (name.endsWith('.css')) {
            // Group CSS files by feature
            if (name.includes('UserMainPanel')) {
              return 'assets/css/layout/[name]-[hash][extname]';
            }
            if (name.includes('userSettingsViews')) {
              return 'assets/css/settings/[name]-[hash][extname]';
            }
            if (name.includes('authViews')) {
              return 'assets/css/auth/[name]-[hash][extname]';
            }
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    cssMinify: true,
  }
});
