import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Get API key from .env.local file
    const apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || 'AIzaSyDq85XaNHDWtRnZtNfJ9AOw5Fv3F_XAXhU';
    
    console.log('API Key loaded:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT FOUND');
    
    return {
      base: './',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // Define process.env.API_KEY (as used in your working code)
        'process.env.API_KEY': JSON.stringify(apiKey),
        'process.env.GEMINI_API_KEY': JSON.stringify(apiKey),
        // Define import.meta.env for Vite
        'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(apiKey),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        target: 'es2015', // <--- This is the fix. We are targeting older JS versions.
      }
    };
});
