import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://couponflow.onrender.com/api',  
  //       changeOrigin: true,               
  //       secure: true,                    
  //       rewrite: (path) => path.replace(/^\/api/, ''),  
  //     },
  //   },
  // },
  plugins: [
    react(),
    tailwindcss(),
  ],
});
