import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// GitHub Pages 基础路径。
// 如仓库为 https://github.com/<user>/agripro-dipm，
// 站点将托管于 https://<user>.github.io/agripro-dipm/，
// 因此 base 必须设为 '/agripro-dipm/'。
// 若仓库名称不同，请改下方默认值，或通过环境变量覆盖：
//   BASE=/my-repo-name/ npm run build
const base = process.env.BASE || '/agripro-dipm/';

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'AgriPro DIPM — 榴莲虫害管理',
        short_name: 'AgriPro DIPM',
        description:
          '榴莲园综合虫害管理 — 病虫害数据库、风险模拟器、混配方案。',
        lang: 'zh-CN',
        theme_color: '#059669',
        background_color: '#f0fdf4',
        display: 'standalone',
        orientation: 'portrait',
        scope: base,
        start_url: base,
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
      }
    })
  ]
});
