import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import { visualizer } from 'rollup-plugin-visualizer';

// https://astro.build/config
export default defineConfig({
  site: 'https://thetalktherapy.vercel.app',
  base: '/',
  trailingSlash: 'ignore',
  
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    compress({
      CSS: true,
      HTML: true,
      Image: false, // Let Vercel handle image optimization
      JavaScript: true,
      SVG: true,
    }),
  ],
  
  vite: {
    plugins: [
      visualizer({
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['react', 'react-dom'], // If using React
            'ui': ['framer-motion', '@headlessui/react'], // If using UI libraries
          },
        },
      },
    },
    
    ssr: {
      noExternal: ['@astrojs/tailwind'],
    },
  },
  
  // Image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  
  // Markdown configuration
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
    remarkPlugins: [],
    rehypePlugins: [],
  },
  
  // Security headers (will be added by Vercel)
  security: {
    checkOrigin: true,
  },
  
  // Development server
  server: {
    host: true,
    port: 4321,
  },
  
  // Build output
  outDir: './dist',
  
  // Public assets
  publicDir: './public',
  
  // i18n (if needed)
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});