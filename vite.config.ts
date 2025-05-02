import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginRadar } from 'vite-plugin-radar'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginRadar({
      // Google Analytics tag injection
      analytics: {
        id: 'G-F9PP5QPV9K',
        consentDefaults: {
          analytics_storage: "denied",
          ad_storage: "denied",
        },
      },
    }),
  ],
  base: "/",
})
