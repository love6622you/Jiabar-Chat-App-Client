import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const viteEnv = {};
Object.keys(process.env).forEach((key) => {
  if (key.startsWith("VITE_")) {
    viteEnv[`import.meta.env.${key}`] = process.env[key];
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]"
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src") // 設置 '@' 指向 'src' 目錄
    }
  },
  define: viteEnv,
  server: {
    port: 8010,
    open: false,
    cors: true
    // proxy: {
    //   '/api': {
    //     target: 'http://xxx.xxx.xxx.xxx:8000',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace('/api/', '/')
    //   }
    // }
  }
});
