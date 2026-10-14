import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'serve-dev-html',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/' || req.url === '/index.html') {
              req.url = '/index.dev.html';
            }
            next();
          });
        }
      },
      {
        name: 'serve-pdf-headers',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url) {
              const pathname = req.url.split('?')[0];
              if (pathname.endsWith('.pdf')) {
                const filename = path.basename(decodeURIComponent(pathname));
                res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
              }
            }
            next();
          });
        }
      },
      {
        name: 'sync-production-html',
        closeBundle() {
          const distDev = path.resolve(__dirname, 'dist/index.dev.html');
          const distProd = path.resolve(__dirname, 'dist/index.html');
          const rootProd = path.resolve(__dirname, 'index.html');
          if (fs.existsSync(distDev)) {
            fs.copyFileSync(distDev, distProd);
            fs.copyFileSync(distDev, rootProd);
            try { fs.unlinkSync(distDev); } catch (e) {}
          }
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        input: path.resolve(__dirname, 'index.dev.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('three')) return 'vendor-three';
              if (id.includes('lucide-react')) return 'vendor-lucide';
              if (id.includes('motion')) return 'vendor-motion';
              if (id.includes('firebase')) return 'vendor-firebase';
              if (id.includes('react-router') || id.includes('react-dom') || id.includes('react-helmet-async')) return 'vendor-react-ecosystem';
            }
          }
        }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
