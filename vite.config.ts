
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // Configuration pour génération statique optimisée
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: true,
    cssMinify: true,
    modulePreload: {
      polyfill: true
    },
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React et librairies core
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // Router séparé (lazy loading)
          if (id.includes('react-router') || id.includes('react-helmet')) {
            return 'router';
          }
          // UI components (lazy load après core)
          if (id.includes('@radix-ui') || id.includes('lucide-react') || id.includes('@/components/ui')) {
            return 'ui-components';
          }
          // Analytics et tracking (non critique)
          if (id.includes('gtag') || id.includes('@/hooks/useAnalytics') || id.includes('@/hooks/useABTesting')) {
            return 'analytics';
          }
          // Form et test logic (lazy load)
          if (id.includes('@/hooks/useTest') || id.includes('@/utils/questions') || id.includes('framer-motion')) {
            return 'test-logic';
          }
          // Autres node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'HypnoKick - Test d\'Hypnotisabilité',
        short_name: 'HypnoKick',
        description: 'Test gratuit de réceptivité à l\'hypnose par hypnothérapeute certifié à Paris',
        theme_color: '#3498db',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
