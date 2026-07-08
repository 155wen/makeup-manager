import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/makeup-manager/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "Makeup Manager",
        short_name: "Makeup",
        description: "化妝師工作流程管理工具",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/makeup-manager/",
        scope: "/makeup-manager/",
        icons: [
          {
            src: "/makeup-manager/icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/makeup-manager/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
});