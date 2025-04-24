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
          // React core functionality
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }
          // React hooks and utilities
          if (id.includes('node_modules/react-router') || id.includes('node_modules/react/jsx-runtime')) {
            return 'react-utils';
          }
          // Style libraries
          if (id.includes('node_modules/@emotion') || id.includes('node_modules/styled-components')) {
            return 'vendor-styles';
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
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      },
      mangle: true,
      format: {
        comments: false
      }
    }
  }
});
