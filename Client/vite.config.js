import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [tailwindcss(), react()],
  build: {
    rollupOptions: {
      output: {
        // Ensure service worker files are not hashed
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'OneSignalSDKWorker.js') {
            return 'OneSignalSDKWorker.js';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  // Ensure public files are copied correctly
  publicDir: 'public',
});
