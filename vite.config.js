import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (development/production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // Base public path when served in development or production
    base: env.NODE_ENV === 'production' ? '/tienda-vue/' : '/',

    // Development server configuration
    server: {
      port: 3001, // Changed from 3000 to 3001
      host: '0.0.0.0', // Allow connections from all network interfaces
      open: true, // Automatically open the app in the browser on server start
      strictPort: false, // Try next available port if 3001 is in use
      cors: true, // Enable CORS
      hmr: {
        overlay: true, // Show error overlays in the browser
      },
      proxy: {
        // Proxy API requests in development to avoid CORS issues
        '/api': {
          target: 'http://localhost:5000', // Your backend API URL
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
        },
      },
    },

    // Build configuration
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode !== 'production', // Enable source maps in development
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production', // Remove console.log in production
          drop_debugger: mode === 'production', // Remove debugger in production
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor and app code for better caching
            vue: ['vue', 'vue-router', 'pinia'],
            vendor: ['axios', 'bootstrap', 'bootstrap-icons'],
          },
        },
      },
      chunkSizeWarningLimit: 1000, // Size in KB
    },

    // Resolve configuration
    resolve: {
      alias: {
        // Set up path aliases for cleaner imports
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
        '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
        '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },

    // CSS configuration
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/scss/variables.scss";
            @import "@/assets/scss/mixins.scss";
          `,
        },
      },
    },

    // Plugins
    plugins: [
      vue({
        // Vue-specific options
        reactivityTransform: true, // Enable Reactivity Transform
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith('ion-'), // If using Ionic components
          },
        },
      }),
      
      // PWA support
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'Mi Tienda Online',
          short_name: 'Tienda',
          description: 'Tienda en línea desarrollada con Vue 3',
          theme_color: '#3498db',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          cleanupOutdatedCaches: true,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
      }),
    ],
  };
});
