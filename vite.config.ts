import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  server: {
    host: "0.0.0.0",
    open: true,
    proxy: {
      "/api": {
        // target: "http://121.37.180.58:3000",
        target: "http://192.168.0.104:3000", // 本地
        // target: "http://10.1.5.66:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [
    react(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons")],
      symbolId: "[name]",
    }),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      {
        find: "components",
        replacement: path.resolve(__dirname, "src/components"),
      },
    ],
  },
});
