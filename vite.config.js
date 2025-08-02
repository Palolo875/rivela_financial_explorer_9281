import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optimize React refresh for better dev experience
      fastRefresh: true,
      // Include .jsx files in fast refresh
      include: "**/*.{jsx,tsx}"
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "components": path.resolve(__dirname, "./src/components"),
      "pages": path.resolve(__dirname, "./src/pages"),
      "utils": path.resolve(__dirname, "./src/utils"),
      "styles": path.resolve(__dirname, "./src/styles"),
    },
  },
  server: {
    port: 3000,
    open: true,
    host: true,
    // Security headers for development
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    }
  },
  preview: {
    port: 4173,
    host: true,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    }
  },
  build: {
    outDir: 'build',
    sourcemap: true,
    // Enable minification in production
    minify: 'terser',
    // Optimize CSS
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['framer-motion', 'lucide-react', '@radix-ui/react-slot'],
          router: ['react-router-dom', 'react-router-hash-link'],
          charts: ['d3', 'recharts'],
          forms: ['react-hook-form'],
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority', 'date-fns'],
        },
      },
    },
    chunkSizeWarningLimit: 500,
    // Increase performance
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'framer-motion',
      '@radix-ui/react-slot',
      'clsx',
      'tailwind-merge'
    ],
    // Force optimization of these packages
    force: true
  },
  // Environment variables prefix
  envPrefix: ['VITE_', 'RIVELA_'],
})